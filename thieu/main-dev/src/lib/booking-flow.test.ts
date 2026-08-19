/**
 * Tests for the booking-flow orchestrator (the crux — D-11 TDD, failure contract
 * from the approved plan `vivid-percolating-karp.md`).
 *
 * Written FIRST. The flow is fully unit-testable via an injected `BookingStore`
 * (in-memory fake here — NO real Supabase) + injected google/calendar fns (stubs
 * here — NO real network). Mirrors email.test.ts / calendar.test.ts: discriminated
 * results, never-throw across I/O, assertions on fake-dep call records, no `vi.mock`.
 *
 * Failure contract exercised branch-by-branch:
 *  - happy success (Online → meetUrl; Instore → no Meet)
 *  - slot re-validation fails (freebusy busy) → slot_taken, no claim
 *  - idempotency short-circuit (same slot+email live) → success, insertEvent NOT called
 *  - claim unique-violation → slot_taken, insertEvent NOT called
 *  - getAccessToken fails → releaseClaim called, error
 *  - insertEvent definite 4xx (403) → releaseClaim called, error
 *  - insertEvent 5xx/indeterminate → markPending called, 'pending', releaseClaim NOT called
 *  - storeEventId throws but event created → still success (event NOT deleted)
 *  - cancel: valid token → deleteEvent + markCancelled; unknown token → no-op; double cancel → no-op
 */
import { describe, it, expect, vi } from 'vitest';
import {
  bookSlot,
  cancelBooking,
  type BookingStore,
  type BookingFlowDeps,
  type BookSlotInput,
  type ClaimInput,
} from './booking-flow';
import { buildEventPayload } from './calendar';
import type { BusyInterval } from './availability';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const SLOT_START = '2026-08-15T10:00:00+07:00';
const SLOT_END = '2026-08-15T11:00:00+07:00';

const baseInput: BookSlotInput = {
  name: 'Nguyễn Thị Ánh',
  phone: '+84 905 123 456',
  email: 'client@example.com',
  slotStartIso: SLOT_START,
  slotEndIso: SLOT_END,
  consultationType: 'Online',
  notes: 'Tư vấn áo dài cưới',
};

const TEAM = [
  '311chiadriana@gmail.com',
  'Mitodaseo@gmail.com',
  'hamynganlh@gmail.com',
];
const OWNER = 'owner@gmail.com';

/**
 * In-memory BookingStore fake with call records. `claimResult` lets a test force
 * a unique-violation ('slot_taken') or generic 'error' from claimSlot.
 */
interface FakeRow {
  id: string;
  slotStart: string;
  email: string;
  cancelToken: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  eventId: string | null;
}

function makeStore(opts: {
  claimResult?: { ok: false; reason: 'slot_taken' | 'error' };
  liveRow?: { id: string; cancelToken: string } | null;
  storeEventIdThrows?: boolean;
  seedRows?: FakeRow[];
} = {}) {
  const rows = new Map<string, FakeRow>(
    (opts.seedRows ?? []).map((r) => [r.id, r]),
  );
  let seq = 0;

  const calls = {
    claimSlot: [] as ClaimInput[],
    findLiveBySlotAndEmail: [] as Array<[string, string]>,
    markPending: [] as string[],
    storeEventId: [] as Array<[string, string]>,
    releaseClaim: [] as string[],
    takenStarts: [] as Array<[string, string]>,
    findByCancelToken: [] as string[],
    markCancelled: [] as string[],
  };

  const store: BookingStore = {
    async claimSlot(input: ClaimInput) {
      calls.claimSlot.push(input);
      if (opts.claimResult) return opts.claimResult;
      const id = `row-${++seq}`;
      const cancelToken = `tok-${id}`;
      rows.set(id, {
        id,
        slotStart: input.slotStartIso,
        email: input.email,
        cancelToken,
        status: 'confirmed',
        eventId: null,
      });
      return { ok: true as const, id, cancelToken };
    },
    async findLiveBySlotAndEmail(slotStartIso, email) {
      calls.findLiveBySlotAndEmail.push([slotStartIso, email]);
      return opts.liveRow ?? null;
    },
    async markPending(id) {
      calls.markPending.push(id);
      const r = rows.get(id);
      if (r) r.status = 'pending';
    },
    async storeEventId(id, eventId) {
      calls.storeEventId.push([id, eventId]);
      if (opts.storeEventIdThrows) throw new Error('db write failed');
      const r = rows.get(id);
      if (r) r.eventId = eventId;
    },
    async releaseClaim(id) {
      calls.releaseClaim.push(id);
      rows.delete(id);
    },
    async takenStarts(fromIso, toIso) {
      calls.takenStarts.push([fromIso, toIso]);
      return [...rows.values()]
        .filter((r) => r.status === 'confirmed' || r.status === 'pending')
        .map((r) => r.slotStart);
    },
    async findByCancelToken(token) {
      calls.findByCancelToken.push(token);
      const r = [...rows.values()].find((x) => x.cancelToken === token);
      if (!r) return null;
      return { id: r.id, eventId: r.eventId, status: r.status };
    },
    async markCancelled(id) {
      calls.markCancelled.push(id);
      const r = rows.get(id);
      if (r) r.status = 'cancelled';
    },
  };

  return { store, calls, rows };
}

/** Build BookingFlowDeps with stub google/calendar fns and per-test overrides. */
function makeDeps(
  store: BookingStore,
  overrides: Partial<BookingFlowDeps> = {},
): BookingFlowDeps {
  const getAccessToken = vi.fn(async () => ({ ok: true as const, accessToken: 'tok-abc' }));
  const queryFreeBusy = vi.fn(
    async (): Promise<{ ok: true; busy: BusyInterval[] } | { ok: false; error: string }> => ({
      ok: true,
      busy: [],
    }),
  );
  const insertEvent = vi.fn(
    async (): Promise<
      { ok: true; eventId: string; meetUrl?: string } | { ok: false; status: number; error: string }
    > => ({ ok: true, eventId: 'evt_1', meetUrl: 'https://meet.google.com/abc-defg-hij' }),
  );
  const deleteEvent = vi.fn(async () => ({ ok: true as const }));

  return {
    store,
    getAccessToken,
    queryFreeBusy,
    insertEvent,
    deleteEvent,
    buildEventPayload,
    cancelBaseUrl: 'https://maisondenude.com/booking/cancel',
    sendUpdates: 'none',
    teamInvitees: TEAM,
    ownerEmail: OWNER,
    atelierAddress: '194 Lê Thánh Tôn, 2nd Floor, District 1',
    // Keep the booking window deterministic as the real calendar advances.
    now: new Date('2026-07-01T00:00:00Z'),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// bookSlot — happy paths
// ---------------------------------------------------------------------------

describe('bookSlot — success', () => {
  it('Online: claims, inserts event, stores id, returns success with meetUrl + cancelUrl', async () => {
    const { store, calls, rows } = makeStore();
    const deps = makeDeps(store);

    const result = await bookSlot(baseInput, deps);

    expect(result.status).toBe('success');
    if (result.status === 'success') {
      expect(result.meetUrl).toBe('https://meet.google.com/abc-defg-hij');
      expect(result.cancelUrl).toContain('token=');
      expect(result.bookingId).toBeTruthy();
    }

    // claim happened, event inserted, id stored, nothing released.
    expect(calls.claimSlot).toHaveLength(1);
    expect(deps.insertEvent).toHaveBeenCalledTimes(1);
    expect(calls.storeEventId).toHaveLength(1);
    expect(calls.releaseClaim).toHaveLength(0);
    expect(calls.markPending).toHaveLength(0);

    // Row persisted with event id.
    const row = [...rows.values()][0];
    expect(row.eventId).toBe('evt_1');
    expect(row.status).toBe('confirmed');
  });

  it('Instore: no Meet requested; payload has location, no conferenceData; success w/o meetUrl', async () => {
    const { store } = makeStore();
    const insertEvent = vi.fn(async () => ({ ok: true as const, eventId: 'evt_2' })); // no meetUrl
    const deps = makeDeps(store, { insertEvent });

    const result = await bookSlot({ ...baseInput, consultationType: 'Instore' }, deps);

    expect(result.status).toBe('success');
    if (result.status === 'success') {
      expect(result.meetUrl).toBeUndefined();
    }

    // The payload built for insertEvent is Instore-shaped.
    const insertCalls = insertEvent.mock.calls as unknown as Array<
      [string, Record<string, unknown>, 'all' | 'none']
    >;
    const payload = insertCalls[0][1];
    expect(payload.location).toBe('194 Lê Thánh Tôn, 2nd Floor, District 1');
    expect(payload.conferenceData).toBeUndefined();
  });

  it('passes sendUpdates through to insertEvent', async () => {
    const { store } = makeStore();
    const insertEvent = vi.fn(async () => ({ ok: true as const, eventId: 'e' }));
    const deps = makeDeps(store, { insertEvent, sendUpdates: 'all' });

    await bookSlot(baseInput, deps);
    const insertCalls = insertEvent.mock.calls as unknown as Array<
      [string, Record<string, unknown>, 'all' | 'none']
    >;
    expect(insertCalls[0][2]).toBe('all');
  });
});

// ---------------------------------------------------------------------------
// bookSlot — slot re-validation
// ---------------------------------------------------------------------------

describe('bookSlot — server-side re-validation', () => {
  it('freebusy shows the slot busy → slot_taken, NO claim, NO event', async () => {
    const { store, calls } = makeStore();
    const queryFreeBusy = vi.fn(async () => ({
      ok: true as const,
      busy: [{ startIso: '2026-08-15T03:00:00Z', endIso: '2026-08-15T04:00:00Z' }], // 10:00–11:00 +07
    }));
    const deps = makeDeps(store, { queryFreeBusy });

    const result = await bookSlot(baseInput, deps);

    expect(result.status).toBe('slot_taken');
    expect(calls.claimSlot).toHaveLength(0);
    expect(deps.insertEvent).not.toHaveBeenCalled();
  });

  it('slot outside the bookable window (past lead time) → slot_taken, no claim', async () => {
    const { store, calls } = makeStore();
    // now well AFTER the slot start → not bookable.
    const deps = makeDeps(store, { now: new Date('2027-01-01T00:00:00Z') });

    const result = await bookSlot(baseInput, deps);

    expect(result.status).toBe('slot_taken');
    expect(calls.claimSlot).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// bookSlot — idempotency short-circuit
// ---------------------------------------------------------------------------

describe('bookSlot — idempotency', () => {
  it('same slot+email already live → success with that row, insertEvent NOT called', async () => {
    const { store, calls } = makeStore({
      liveRow: { id: 'existing-1', cancelToken: 'tok-existing' },
    });
    const deps = makeDeps(store);

    const result = await bookSlot(baseInput, deps);

    expect(result.status).toBe('success');
    if (result.status === 'success') {
      expect(result.bookingId).toBe('existing-1');
      expect(result.cancelUrl).toContain('tok-existing');
    }
    // No second event, no second claim.
    expect(deps.insertEvent).not.toHaveBeenCalled();
    expect(calls.claimSlot).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// bookSlot — atomic claim loser
// ---------------------------------------------------------------------------

describe('bookSlot — claim', () => {
  it('unique-violation (slot_taken) → slot_taken, insertEvent NOT called, nothing compensated', async () => {
    const { store, calls } = makeStore({ claimResult: { ok: false, reason: 'slot_taken' } });
    const deps = makeDeps(store);

    const result = await bookSlot(baseInput, deps);

    expect(result.status).toBe('slot_taken');
    expect(calls.claimSlot).toHaveLength(1);
    expect(deps.insertEvent).not.toHaveBeenCalled();
    expect(calls.releaseClaim).toHaveLength(0);
  });

  it('generic claim error → error, insertEvent NOT called', async () => {
    const { store, calls } = makeStore({ claimResult: { ok: false, reason: 'error' } });
    const deps = makeDeps(store);

    const result = await bookSlot(baseInput, deps);

    expect(result.status).toBe('error');
    expect(deps.insertEvent).not.toHaveBeenCalled();
    expect(calls.releaseClaim).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// bookSlot — access token failure (compensate)
// ---------------------------------------------------------------------------

describe('bookSlot — access token failure', () => {
  it('getAccessToken fails → error, no orphan claim, insertEvent not called', async () => {
    // The token is fetched BEFORE the claim (it is needed for the free/busy
    // re-check in step 1), so a token failure means no claim was ever made —
    // strictly safer than claim-then-compensate: there is no row to release.
    const { store, calls } = makeStore();
    const getAccessToken = vi.fn(async () => ({ ok: false as const, error: 'invalid_grant' }));
    const deps = makeDeps(store, { getAccessToken });

    const result = await bookSlot(baseInput, deps);

    expect(result.status).toBe('error');
    expect(calls.claimSlot).toHaveLength(0); // never claimed → nothing to compensate
    expect(calls.releaseClaim).toHaveLength(0);
    expect(deps.insertEvent).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// bookSlot — insertEvent failure branches
// ---------------------------------------------------------------------------

describe('bookSlot — insertEvent failures', () => {
  it('definite 4xx (403) → releaseClaim called (compensation), error, NOT pending', async () => {
    const { store, calls } = makeStore();
    const insertEvent = vi.fn(async () => ({ ok: false as const, status: 403, error: 'forbidden' }));
    const deps = makeDeps(store, { insertEvent });

    const result = await bookSlot(baseInput, deps);

    expect(result.status).toBe('error');
    expect(calls.releaseClaim).toHaveLength(1);
    expect(calls.markPending).toHaveLength(0);
  });

  it('5xx (500) indeterminate → markPending called, pending, releaseClaim NOT called', async () => {
    const { store, calls } = makeStore();
    const insertEvent = vi.fn(async () => ({ ok: false as const, status: 500, error: 'server' }));
    const deps = makeDeps(store, { insertEvent });

    const result = await bookSlot(baseInput, deps);

    expect(result.status).toBe('pending');
    if (result.status === 'pending') {
      expect(result.cancelUrl).toContain('token=');
      expect(result.bookingId).toBeTruthy();
    }
    expect(calls.markPending).toHaveLength(1);
    expect(calls.releaseClaim).toHaveLength(0); // NEVER delete — event may exist
  });

  it('network/timeout (status 0) indeterminate → markPending, pending', async () => {
    const { store, calls } = makeStore();
    const insertEvent = vi.fn(async () => ({ ok: false as const, status: 0, error: 'network down' }));
    const deps = makeDeps(store, { insertEvent });

    const result = await bookSlot(baseInput, deps);

    expect(result.status).toBe('pending');
    expect(calls.markPending).toHaveLength(1);
    expect(calls.releaseClaim).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// bookSlot — storeEventId failure (never delete a live event)
// ---------------------------------------------------------------------------

describe('bookSlot — storeEventId failure', () => {
  it('storeEventId throws but event was created → still success, event NOT deleted', async () => {
    const { store, calls } = makeStore({ storeEventIdThrows: true });
    const deps = makeDeps(store);
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await bookSlot(baseInput, deps);

    expect(result.status).toBe('success');
    if (result.status === 'success') {
      expect(result.meetUrl).toBe('https://meet.google.com/abc-defg-hij');
    }
    // The live event is NEVER deleted / released.
    expect(deps.deleteEvent).not.toHaveBeenCalled();
    expect(calls.releaseClaim).toHaveLength(0);
    // Logged loudly.
    expect(errSpy).toHaveBeenCalled();

    errSpy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// bookSlot — never throws
// ---------------------------------------------------------------------------

describe('bookSlot — never throws', () => {
  it('claimSlot throwing unexpectedly resolves error (never throws out)', async () => {
    const { store } = makeStore();
    store.claimSlot = vi.fn(async () => {
      throw new Error('boom');
    });
    const deps = makeDeps(store);

    await expect(bookSlot(baseInput, deps)).resolves.toMatchObject({ status: 'error' });
  });
});

// ---------------------------------------------------------------------------
// cancelBooking
// ---------------------------------------------------------------------------

describe('cancelBooking', () => {
  it('valid token → deleteEvent called (with eventId) + markCancelled, success', async () => {
    const { store, calls } = makeStore({
      seedRows: [
        {
          id: 'row-1',
          slotStart: SLOT_START,
          email: 'client@example.com',
          cancelToken: 'the-token',
          status: 'confirmed',
          eventId: 'evt_99',
        },
      ],
    });
    const deps = makeDeps(store);

    const result = await cancelBooking('the-token', deps);

    expect(result.status).toBe('success');
    expect(deps.deleteEvent).toHaveBeenCalledTimes(1);
    expect((deps.deleteEvent as ReturnType<typeof vi.fn>).mock.calls[0][1]).toBe('evt_99');
    expect(calls.markCancelled).toEqual(['row-1']);
  });

  it('unknown token → friendly no-op success, no deleteEvent, no markCancelled', async () => {
    const { store, calls } = makeStore();
    const deps = makeDeps(store);

    const result = await cancelBooking('nope', deps);

    expect(result.status).toBe('success');
    expect(deps.deleteEvent).not.toHaveBeenCalled();
    expect(calls.markCancelled).toHaveLength(0);
  });

  it('already-cancelled row (double cancel) → friendly no-op success, no delete', async () => {
    const { store, calls } = makeStore({
      seedRows: [
        {
          id: 'row-1',
          slotStart: SLOT_START,
          email: 'client@example.com',
          cancelToken: 'the-token',
          status: 'cancelled',
          eventId: 'evt_99',
        },
      ],
    });
    const deps = makeDeps(store);

    const result = await cancelBooking('the-token', deps);

    expect(result.status).toBe('success');
    expect(deps.deleteEvent).not.toHaveBeenCalled();
    expect(calls.markCancelled).toHaveLength(0);
  });

  it('row with no eventId (never got created) → still markCancelled, no deleteEvent, success', async () => {
    const { store, calls } = makeStore({
      seedRows: [
        {
          id: 'row-1',
          slotStart: SLOT_START,
          email: 'client@example.com',
          cancelToken: 'the-token',
          status: 'pending',
          eventId: null,
        },
      ],
    });
    const deps = makeDeps(store);

    const result = await cancelBooking('the-token', deps);

    expect(result.status).toBe('success');
    expect(deps.deleteEvent).not.toHaveBeenCalled();
    expect(calls.markCancelled).toEqual(['row-1']);
  });

  it('never throws — a store failure still resolves success (friendly)', async () => {
    const { store } = makeStore();
    store.findByCancelToken = vi.fn(async () => {
      throw new Error('db down');
    });
    const deps = makeDeps(store);

    await expect(cancelBooking('x', deps)).resolves.toMatchObject({ status: 'success' });
  });
});
