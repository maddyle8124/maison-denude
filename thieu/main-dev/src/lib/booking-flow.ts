/**
 * Booking-flow orchestrator — the crux (D-1, D-8, D-11; failure contract from
 * the approved plan `vivid-percolating-karp.md` §"Failure contract").
 *
 * Design constraints (test-driven, see booking-flow.test.ts; mirrors email.ts):
 * - ZERO import-time env, ZERO direct I/O. The flow depends on an injected
 *   `BookingStore` (all DB ops behind it) + injected google/calendar fns, so the
 *   whole thing is unit-testable with fakes — no real Supabase, no real network.
 * - NEVER throws across the boundary: `bookSlot` / `cancelBooking` always resolve
 *   a discriminated result. A confirmed booking with no calendar event is a real
 *   problem (D-BOOK-02 priority inverts), so we compensate/surface rather than
 *   silently swallow.
 *
 * Ordering (the DB unique index is the only atomic mutual-exclusion primitive,
 * so it is the gate): re-validate slot → atomic DB claim → Google create →
 * store event id. See the numbered contract on `bookSlot`.
 */
import { isBookable, type Slot } from './slots';
import { subtractBusy } from './availability';
import type { BusyInterval } from './availability';
import type { buildEventPayload as BuildEventPayload } from './calendar';

/** D-7 guardrails — the flow re-validates against these server-side. */
export const MIN_LEAD_HOURS = 24;
export const MAX_HORIZON_DAYS = 60;

/** Input to the atomic DB claim (INSERT status='confirmed'). */
export interface ClaimInput {
  name: string;
  phone: string;
  email: string;
  slotStartIso: string;
  slotEndIso: string;
  consultationType: 'Online' | 'Instore';
  notes?: string | null;
}

/**
 * DB seam — the ONLY place raw booking queries live for this feature. The flow
 * is DB-agnostic; the real implementation is backed by `supabaseAdmin(env)` in
 * the action, tests use an in-memory fake.
 */
export interface BookingStore {
  /**
   * Atomic claim: INSERT status='confirmed'. A unique-index violation (two
   * clients racing the same slot) MUST surface as `reason:'slot_taken'`; any
   * other DB failure as `reason:'error'`.
   */
  claimSlot(
    input: ClaimInput,
  ): Promise<
    | { ok: true; id: string; cancelToken: string }
    | { ok: false; reason: 'slot_taken' | 'error' }
  >;
  /** Idempotency short-circuit: a live (confirmed|pending) row for this slot+email. */
  findLiveBySlotAndEmail(
    slotStartIso: string,
    email: string,
  ): Promise<{ id: string; cancelToken: string } | null>;
  /** Flip a claimed row to 'pending' (Google create was indeterminate). */
  markPending(id: string): Promise<void>;
  /** Persist the Google event id back onto the row. */
  storeEventId(id: string, eventId: string): Promise<void>;
  /** Compensation: delete the claim row (no live Google event exists). */
  releaseClaim(id: string): Promise<void>;
  /** Confirmed+pending slot_starts in a window (for availability). */
  takenStarts(fromIso: string, toIso: string): Promise<string[]>;
  /** Cancel-by-token lookup (D-8). */
  findByCancelToken(
    token: string,
  ): Promise<
    { id: string; eventId: string | null; status: 'confirmed' | 'pending' | 'cancelled' } | null
  >;
  /** Flip a row to 'cancelled' (frees the slot — outside the unique-index predicate). */
  markCancelled(id: string): Promise<void>;
}

/** Injected google/calendar fns + config. Calendar-id is bound at the call site. */
export interface BookingFlowDeps {
  store: BookingStore;
  getAccessToken: (
    fetchImpl?: typeof fetch,
  ) => Promise<{ ok: true; accessToken: string } | { ok: false; error: string }>;
  queryFreeBusy: (
    token: string,
    timeMinIso: string,
    timeMaxIso: string,
  ) => Promise<{ ok: true; busy: BusyInterval[] } | { ok: false; error: string }>;
  insertEvent: (
    token: string,
    body: Record<string, unknown>,
    sendUpdates: 'all' | 'none',
  ) => Promise<
    { ok: true; eventId: string; meetUrl?: string } | { ok: false; status: number; error: string }
  >;
  deleteEvent: (
    token: string,
    eventId: string,
    sendUpdates: 'all' | 'none',
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  buildEventPayload: typeof BuildEventPayload;
  cancelBaseUrl: string;
  sendUpdates: 'all' | 'none';
  teamInvitees: string[];
  ownerEmail: string;
  atelierAddress: string;
  /** Injected clock for the lead/horizon re-check (defaults to now at the call site). */
  now?: Date;
}

/** The public booking input (slotEnd derived by the caller as slotStart+duration). */
export interface BookSlotInput {
  name: string;
  phone: string;
  email: string;
  slotStartIso: string;
  slotEndIso: string;
  consultationType: 'Online' | 'Instore';
  notes?: string | null;
}

export type BookBRResult =
  | { status: 'success'; bookingId: string; meetUrl?: string; cancelUrl: string }
  | { status: 'slot_taken' }
  | { status: 'pending'; bookingId: string; cancelUrl: string }
  | { status: 'error'; error: string };

/** Build the tokened cancel URL (D-8). */
function cancelUrlFor(baseUrl: string, cancelToken: string): string {
  const sep = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${sep}token=${encodeURIComponent(cancelToken)}`;
}

/**
 * Orchestrate one booking. NEVER throws. Failure contract (from the plan):
 *
 *  1. Re-validate the single slot server-side: `isBookable` (lead/horizon in +07)
 *     AND re-query free/busy for just this slot; either fails → `slot_taken`.
 *  2. Idempotency short-circuit: a live row for this slot+email → return that
 *     row's `success` (no second event).
 *  3. Atomic claim. unique-violation → `slot_taken` (loser, nothing created);
 *     generic DB error → `error`.
 *  4. Get access token. Fail → compensate `releaseClaim` → `error`.
 *  5. Build payload + insertEvent:
 *     - ok → `storeEventId`; if that throws, LOG loudly + still return `success`
 *       (never delete a live event).
 *     - definite 4xx (400/401/403/409/…) → compensate `releaseClaim` → `error`.
 *     - indeterminate (status>=500 OR status===0 network/timeout — event MAY
 *       exist) → `markPending` + return `pending` (do NOT delete).
 *  6. `success` with meetUrl (may be undefined) + cancelUrl.
 */
export async function bookSlot(input: BookSlotInput, deps: BookingFlowDeps): Promise<BookBRResult> {
  const now = deps.now ?? new Date();

  try {
    const slot: Slot = { startIso: input.slotStartIso, endIso: input.slotEndIso };

    // (1a) Lead/horizon re-check — never trust the client.
    if (!isBookable(slot, now, MIN_LEAD_HOURS, MAX_HORIZON_DAYS)) {
      return { status: 'slot_taken' };
    }

    // Get an access token up-front (needed for the free/busy re-check).
    const token = await deps.getAccessToken();
    if (!token.ok) {
      // No claim yet — nothing to compensate.
      return { status: 'error', error: token.error };
    }

    // (1b) Re-query free/busy for JUST this slot; a collision means it's gone.
    const fb = await deps.queryFreeBusy(token.accessToken, input.slotStartIso, input.slotEndIso);
    if (fb.ok) {
      const stillOpen = subtractBusy([slot], fb.busy);
      if (stillOpen.length === 0) {
        return { status: 'slot_taken' };
      }
    }
    // If free/busy itself failed (fb.ok === false) we proceed — the DB unique
    // index remains the authoritative concurrency gate (residual double-book
    // risk is documented in the plan). We do NOT block a booking on a flaky
    // Google free/busy read.

    // (2) Idempotency short-circuit — the user's own double-submit.
    const live = await deps.store.findLiveBySlotAndEmail(input.slotStartIso, input.email);
    if (live) {
      return {
        status: 'success',
        bookingId: live.id,
        cancelUrl: cancelUrlFor(deps.cancelBaseUrl, live.cancelToken),
      };
    }

    // (3) Atomic claim (DB unique index is the gate).
    const claim = await deps.store.claimSlot({
      name: input.name,
      phone: input.phone,
      email: input.email,
      slotStartIso: input.slotStartIso,
      slotEndIso: input.slotEndIso,
      consultationType: input.consultationType,
      notes: input.notes ?? null,
    });
    if (!claim.ok) {
      if (claim.reason === 'slot_taken') return { status: 'slot_taken' }; // loser — created nothing
      return { status: 'error', error: 'Could not claim the slot.' };
    }

    const { id, cancelToken } = claim;
    const cancelUrl = cancelUrlFor(deps.cancelBaseUrl, cancelToken);

    // Access token was already fetched above and is still valid for the insert.

    // (5) Build the event payload + insert.
    const payload = deps.buildEventPayload({
      type: input.consultationType,
      slot,
      clientName: input.name,
      clientEmail: input.email,
      clientPhone: input.phone,
      notes: input.notes ?? null,
      teamInvitees: deps.teamInvitees,
      ownerEmail: deps.ownerEmail,
      atelierAddress: deps.atelierAddress,
      cancelUrl,
    });

    const inserted = await deps.insertEvent(token.accessToken, payload, deps.sendUpdates);

    if (inserted.ok) {
      // (5a) Store the event id. If THIS fails, the event is live and the client
      // is invited — never delete it; log loudly and still return success.
      try {
        await deps.store.storeEventId(id, inserted.eventId);
      } catch (cause) {
        const message = cause instanceof Error ? cause.message : String(cause);
        console.error(
          `[booking-flow] storeEventId FAILED for booking ${id} / event ${inserted.eventId} — ` +
            `event is LIVE and client invited; row not updated. Reconcile manually. Cause: ${message}`,
        );
      }
      return { status: 'success', bookingId: id, meetUrl: inserted.meetUrl, cancelUrl };
    }

    // (5b) Insert failed. Distinguish definite vs indeterminate.
    // Indeterminate = the event MIGHT exist: server error (>=500) or a transport
    // failure (status 0 from calendar.ts's catch). Deterministic requestId makes
    // a later retry safe, so we do NOT delete — mark pending.
    const indeterminate = inserted.status >= 500 || inserted.status === 0;
    if (indeterminate) {
      await deps.store.markPending(id);
      return { status: 'pending', bookingId: id, cancelUrl };
    }

    // Definite 4xx (bad payload / forbidden / quota) — no event was created.
    // Compensate: release the claim so the slot re-opens.
    await deps.store.releaseClaim(id);
    return { status: 'error', error: `Calendar rejected the event (status ${inserted.status}).` };
  } catch (cause) {
    // Belt-and-braces: the flow must never throw out.
    const message = cause instanceof Error ? cause.message : String(cause);
    return { status: 'error', error: `Booking failed: ${message}` };
  }
}

export type CancelResult = { status: 'success' } | { status: 'error'; error: string };

/**
 * Cancel a booking by its tokened link (D-8). Idempotent + friendly:
 *  - unknown token / already-cancelled row → no-op success (never leak which).
 *  - live row → `deleteEvent` (idempotent; skipped if no eventId) then
 *    `markCancelled` (frees the slot — 'cancelled' is outside the unique-index
 *    predicate). A best-effort delete failure does NOT block the cancel.
 *  - NEVER throws — a store failure still resolves success (the client only ever
 *    sees a friendly confirmation).
 */
export async function cancelBooking(
  cancelToken: string,
  deps: BookingFlowDeps,
): Promise<CancelResult> {
  try {
    const row = await deps.store.findByCancelToken(cancelToken);

    // Unknown token or already cancelled → friendly no-op.
    if (!row || row.status === 'cancelled') {
      return { status: 'success' };
    }

    // Delete the Google event first (idempotent: 404/410 already ok). Best-effort
    // — a delete failure is logged but does not block freeing the DB slot.
    if (row.eventId) {
      const token = await deps.getAccessToken();
      if (token.ok) {
        const del = await deps.deleteEvent(token.accessToken, row.eventId, deps.sendUpdates);
        if (!del.ok) {
          console.error(`[booking-flow] deleteEvent failed during cancel of ${row.id}: ${del.error}`);
        }
      } else {
        console.error(
          `[booking-flow] cancel of ${row.id}: could not get access token to delete event ${row.eventId}: ${token.error}`,
        );
      }
    }

    await deps.store.markCancelled(row.id);
    return { status: 'success' };
  } catch (cause) {
    // Cancel is client-friendly and idempotent — never surface an error.
    const message = cause instanceof Error ? cause.message : String(cause);
    console.error(`[booking-flow] cancelBooking swallowed error: ${message}`);
    return { status: 'success' };
  }
}
