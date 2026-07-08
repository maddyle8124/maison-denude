import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
// Astro v6+ removed `Astro.locals.runtime.env`; the Cloudflare adapter exposes the
// Worker env (secrets + vars) via the `cloudflare:workers` virtual module instead.
import { env } from 'cloudflare:workers';
import { supabaseAdmin, type SupabaseEnv } from '../lib/supabase';
import { resolveEmailConfig, sendBookingNotification, type EmailEnv } from '../lib/email';
import {
  getAccessToken,
  resolveGoogleAuth,
  type GoogleAuthEnv,
} from '../lib/google-auth';
import {
  queryFreeBusy,
  insertEvent,
  deleteEvent,
  buildEventPayload,
  resolveCalendarEnv,
  type CalendarEnv,
} from '../lib/calendar';
import {
  generateSlots,
  type WeeklyRules,
  type Slot,
} from '../lib/slots';
import { computeAvailability, type BusyInterval } from '../lib/availability';
import { createBookingStore } from '../lib/booking-store';
import {
  bookSlot,
  cancelBooking as cancelBookingFlow,
  MIN_LEAD_HOURS,
  MAX_HORIZON_DAYS,
  type BookingFlowDeps,
} from '../lib/booking-flow';

// ---------------------------------------------------------------------------
// Config (D-5, D-6, D-7) + env
// ---------------------------------------------------------------------------

/** D-6 working hours: Mon–Sat 10:00–18:00, 60-min slots, Asia/Ho_Chi_Minh (+07). */
const WEEKLY_RULES: WeeklyRules = {
  openHour: 10,
  closeHour: 18,
  slotMinutes: 60,
  openDays: [1, 2, 3, 4, 5, 6], // Mon–Sat (0=Sun excluded)
  tzOffsetMinutes: 420, // +07:00
};

const SLOT_MINUTES = WEEKLY_RULES.slotMinutes;

/** D-5 — team invitees added to every event (in addition to the client). */
const TEAM_INVITEES = [
  'nhokieunhan@gmail.com',
  'nguyenthaithieu@gmail.com',
  'nhokieunhan3@gmail.com',
];

const DEFAULT_CANCEL_BASE_URL = 'https://maisondenude.com/booking/cancel';
const ATELIER_ADDRESS = '194 Lê Thánh Tôn, 2nd Floor, District 1';

/** Env this feature reads (resolved at the call site, cast from the Worker env). */
interface BookingEnv
  extends GoogleAuthEnv,
    CalendarEnv,
    SupabaseEnv,
    EmailEnv {
  GCAL_OWNER_EMAIL: string;
  GCAL_SEND_UPDATES?: string;
  PUBLIC_SITE_URL?: string;
}

/** Read the whole booking env once (never at import time). */
function bookingEnv(): BookingEnv {
  return env as unknown as BookingEnv;
}

/** sendUpdates gate — 'all' only when explicitly enabled, else 'none' (dev-safe). */
function resolveSendUpdates(e: BookingEnv): 'all' | 'none' {
  return e.GCAL_SEND_UPDATES === 'all' ? 'all' : 'none';
}

function resolveCancelBaseUrl(e: BookingEnv): string {
  const site = e.PUBLIC_SITE_URL?.replace(/\/+$/, '');
  return site ? `${site}/booking/cancel` : DEFAULT_CANCEL_BASE_URL;
}

/**
 * Wire the real `BookingFlowDeps` from the Worker env: Supabase-backed store +
 * google-auth/calendar fns with the calendar-id bound. `now` defaults to real
 * time inside the flow. Reused by createBooking + cancelBooking.
 */
function buildFlowDeps(e: BookingEnv): BookingFlowDeps {
  const db = supabaseAdmin(e);
  const store = createBookingStore(db);

  const authCfg = resolveGoogleAuth(e);
  const { GOOGLE_CALENDAR_ID } = resolveCalendarEnv(e);
  const sendUpdates = resolveSendUpdates(e);

  return {
    store,
    getAccessToken: (fetchImpl) => getAccessToken(authCfg, fetchImpl),
    queryFreeBusy: (token, timeMinIso, timeMaxIso) =>
      queryFreeBusy(token, GOOGLE_CALENDAR_ID, timeMinIso, timeMaxIso),
    insertEvent: (token, body, sendUpdatesArg) =>
      insertEvent(token, GOOGLE_CALENDAR_ID, body, { sendUpdates: sendUpdatesArg }),
    deleteEvent: (token, eventId, sendUpdatesArg) =>
      deleteEvent(token, GOOGLE_CALENDAR_ID, eventId, { sendUpdates: sendUpdatesArg }),
    buildEventPayload,
    cancelBaseUrl: resolveCancelBaseUrl(e),
    sendUpdates,
    teamInvitees: TEAM_INVITEES,
    ownerEmail: e.GCAL_OWNER_EMAIL,
    atelierAddress: ATELIER_ADDRESS,
  };
}

/** Derive the slot end ISO (+SLOT_MINUTES) preserving the +07 offset string. */
function deriveSlotEndIso(slotStartIso: string): string {
  const endMs = new Date(slotStartIso).getTime() + SLOT_MINUTES * 60 * 1000;
  // Re-serialize in +07 wall-clock so start/end share the same textual offset
  // the pure slot layer emits (calendar.ts stamps timeZone anyway).
  const local = new Date(endMs + WEEKLY_RULES.tzOffsetMinutes * 60 * 1000);
  const y = local.getUTCFullYear();
  const mo = String(local.getUTCMonth() + 1).padStart(2, '0');
  const d = String(local.getUTCDate()).padStart(2, '0');
  const h = String(local.getUTCHours()).padStart(2, '0');
  const mi = String(local.getUTCMinutes()).padStart(2, '0');
  return `${y}-${mo}-${d}T${h}:${mi}:00+07:00`;
}

/** Human-readable slot label for the (best-effort) team notification email. */
function slotLabel(slotStartIso: string): string {
  const d = new Date(slotStartIso);
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${fmt.format(d)} (Saigon time)`;
}

export const server = {
  // -------------------------------------------------------------------------
  // getAvailability — QUERY action (JSON, no `accept:'form'`).
  // -------------------------------------------------------------------------
  getAvailability: defineAction({
    input: z
      .object({
        // Optional client hint; the server always recomputes from `now`.
        fromIso: z.string().optional(),
      })
      .optional(),
    handler: async (): Promise<{ slots: Slot[]; freeBusyUnavailable: boolean }> => {
      const e = bookingEnv();
      const now = new Date();

      // Candidate slots from the fixed weekly rules (D-6) + guardrails (D-7).
      const candidates = generateSlots(WEEKLY_RULES, now, MIN_LEAD_HOURS, MAX_HORIZON_DAYS);
      if (candidates.length === 0) {
        return { slots: [], freeBusyUnavailable: false };
      }

      const timeMinIso = candidates[0].startIso;
      const timeMaxIso = candidates[candidates.length - 1].endIso;

      // DB-taken (confirmed+pending) — server-only via service-role.
      const store = createBookingStore(supabaseAdmin(e));
      const takenStarts = await store.takenStarts(timeMinIso, timeMaxIso);

      // Live Google free/busy over the horizon. On ANY Google failure, degrade
      // gracefully: still show slots minus DB-taken so the page isn't dead, and
      // flag that free/busy was unavailable.
      let busy: BusyInterval[] = [];
      let freeBusyUnavailable = false;

      const token = await getAccessToken(resolveGoogleAuth(e));
      if (token.ok) {
        const { GOOGLE_CALENDAR_ID } = resolveCalendarEnv(e);
        const fb = await queryFreeBusy(token.accessToken, GOOGLE_CALENDAR_ID, timeMinIso, timeMaxIso);
        if (fb.ok) {
          busy = fb.busy;
        } else {
          freeBusyUnavailable = true;
        }
      } else {
        freeBusyUnavailable = true;
      }

      const slots = computeAvailability(candidates, busy, takenStarts);
      return { slots, freeBusyUnavailable };
    },
  }),

  // -------------------------------------------------------------------------
  // createBooking — the write path (keeps `accept:'form'`).
  // -------------------------------------------------------------------------
  createBooking: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(1),
      phone: z.string().min(6),
      email: z.string().email(),
      // RFC-3339 slot start with the +07 offset the availability layer emits.
      slotStart: z.string().min(1),
      consultationType: z.enum(['Online', 'Instore']),
      notes: z.string().optional(),
    }),
    handler: async (input) => {
      const e = bookingEnv();
      const deps = buildFlowDeps(e);
      const slotEnd = deriveSlotEndIso(input.slotStart);

      const result = await bookSlot(
        {
          name: input.name,
          phone: input.phone,
          email: input.email,
          slotStartIso: input.slotStart,
          slotEndIso: slotEnd,
          consultationType: input.consultationType,
          notes: input.notes ?? null,
        },
        deps,
      );

      // A hard failure — surface a clean error.
      if (result.status === 'error') {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not complete your booking. Please try again.',
        });
      }

      // The slot was already taken by someone else — a distinct, retryable state.
      if (result.status === 'slot_taken') {
        throw new ActionError({
          code: 'CONFLICT',
          message: 'That time was just booked. Please pick another slot.',
        });
      }

      // success | pending: best-effort team notification (D-BOOK-02 seam kept).
      // Email failure must never fail the booking — log and continue.
      const emailResult = await sendBookingNotification(
        {
          name: input.name,
          phone: input.phone,
          date: slotLabel(input.slotStart),
          consultationType: input.consultationType,
          notes: input.notes ?? null,
        },
        resolveEmailConfig(e),
      );
      if (!emailResult.ok) {
        console.error('[email] booking notification failed:', emailResult.error);
      }

      if (result.status === 'pending') {
        return { success: true, pending: true, cancelUrl: result.cancelUrl };
      }

      return {
        success: true,
        meetUrl: result.meetUrl,
        cancelUrl: result.cancelUrl,
      };
    },
  }),

  // -------------------------------------------------------------------------
  // cancelBooking — client cancel via tokened link (D-8). Always friendly.
  // -------------------------------------------------------------------------
  cancelBooking: defineAction({
    input: z.object({
      token: z.string().min(1),
    }),
    handler: async (input) => {
      const deps = buildFlowDeps(bookingEnv());
      await cancelBookingFlow(input.token, deps);
      // Idempotent + friendly: the client always sees a confirmation.
      return { success: true };
    },
  }),
};
