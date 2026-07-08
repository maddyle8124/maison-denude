/**
 * Google Calendar payload builder + injectable REST I/O (D-3, D-9, D-10).
 *
 * Design constraints (test-driven, see calendar.test.ts; mirrors email.ts):
 * - `buildEventPayload` / `meetRequestId` are PURE — no env, no I/O, no clock.
 *   `meetRequestId` is deterministic from the slot start so an insert RETRY
 *   reuses the same conference requestId → Google won't mint a second Meet.
 * - The three I/O functions take a Bearer access token + an injectable
 *   `fetchImpl` and NEVER throw across the boundary — every failure resolves a
 *   discriminated result. Transport is plain `fetch` (Workers-native, no SDK).
 * - ZERO import-time env access — `resolveCalendarEnv(env)` reads env; the
 *   caller injects the result.
 *
 * D-3: `Online` → Google Meet link (conferenceData); `Instore` → atelier
 * `location`, no Meet. D-5: team invitees added as attendees. D-9: bilingual
 * VN+EN summary/description. The calendar OWNER is the organizer and MUST NOT
 * appear as a plain attendee.
 */
import type { Slot } from './slots';
import type { BusyInterval } from './availability';

/** Everything the pure builder needs to render one calendar event. */
export interface EventInput {
  type: 'Online' | 'Instore';
  slot: Slot;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string | null;
  /** D-5 team invitees (added as attendees, minus the owner). */
  teamInvitees: string[];
  /** Calendar owner — organizer, NOT a plain attendee. */
  ownerEmail: string;
  /** Instore location. */
  atelierAddress: string;
  /** Tokened cancel link, surfaced in the bilingual description. */
  cancelUrl: string;
}

/** Env the calendar feature reads (resolved by the caller, never at import time). */
export interface CalendarEnv {
  GOOGLE_CALENDAR_ID: string;
}

const TIME_ZONE = 'Asia/Ho_Chi_Minh';
const CALENDAR_BASE = 'https://www.googleapis.com/calendar/v3';

/** Resolve calendar config from the Worker env. Pure passthrough. */
export function resolveCalendarEnv(env: CalendarEnv): CalendarEnv {
  return { GOOGLE_CALENDAR_ID: env.GOOGLE_CALENDAR_ID };
}

/**
 * Deterministic Meet conference requestId derived from the slot start.
 * No Math.random / Date.now — a retry of the same insert reuses this id so
 * Google returns the same Meet instead of creating a duplicate.
 */
export function meetRequestId(slot: Slot): string {
  return `md-${slot.startIso}`;
}

/** Strip angle brackets so user values can't inject markup into the description. */
function sanitize(value: string): string {
  return value.replace(/[<>]/g, '');
}

/**
 * Escape user-supplied values for the HTML-subset Google renders in the event
 * description. Mirrors email.ts's escaper (injection safety).
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Build the attendee list: team invitees + client, deduped case-insensitively,
 * with the owner removed (owner is the organizer). Preserves first-seen casing.
 */
function buildAttendees(input: EventInput): Array<{ email: string }> {
  const owner = input.ownerEmail.trim().toLowerCase();
  const seen = new Set<string>();
  const attendees: Array<{ email: string }> = [];

  for (const raw of [...input.teamInvitees, input.clientEmail]) {
    const email = raw.trim();
    const key = email.toLowerCase();
    if (!email || key === owner || seen.has(key)) continue;
    seen.add(key);
    attendees.push({ email });
  }

  return attendees;
}

/**
 * Pure builder: booking input → Google Calendar event resource. No env, no I/O.
 * Bilingual (VN + EN) summary/description; plain text (no unescaped HTML).
 */
export function buildEventPayload(input: EventInput): Record<string, unknown> {
  // Plain (angle-stripped) values for the summary; HTML-escaped for the body.
  const namePlain = sanitize(input.clientName);
  const name = escapeHtml(namePlain);
  const phone = escapeHtml(sanitize(input.clientPhone));
  const hasNotes = Boolean(input.notes?.trim());
  const notes = hasNotes ? escapeHtml(sanitize(input.notes!.trim())) : '';

  const typeLabelVn = input.type === 'Online' ? 'Tư vấn trực tuyến' : 'Tư vấn tại xưởng';
  const typeLabelEn = input.type === 'Online' ? 'Online consultation' : 'In-store atelier visit';
  // D-BOOK-EMAIL-01: the calendar-invite SUBJECT (Google shows `summary` as the
  // email title) is an elegant English line — brand + type, no client name, no
  // VN/EN cram. The client name + bilingual detail live in the event body below.
  const subjectType = input.type === 'Online' ? 'Online' : 'In Person';
  const cancelUrl = escapeHtml(input.cancelUrl);
  const placeVn = input.type === 'Online'
    ? 'Buổi tư vấn diễn ra qua Google Meet (liên kết ở trên).'
    : `Địa điểm: ${escapeHtml(input.atelierAddress)}`;
  const placeEn = input.type === 'Online'
    ? 'This consultation takes place over Google Meet (link above).'
    : `Location: ${escapeHtml(input.atelierAddress)}`;

  // D-BOOK-EMAIL-01 — elegant English subject: "Private Consultation — Maison
  // Denude (Online|In Person)". (Supersedes the old bilingual+name summary for
  // the title only; the body below stays bilingual per D-9.)
  const summary = `Private Consultation — Maison Denude (${subjectType})`;

  // D-9 — bilingual description. Google renders a limited HTML subset in the
  // event body; use it for a clean, on-brand layout instead of a raw field dump.
  const notesLineVn = hasNotes ? `<br>Ghi chú: ${notes}` : '';
  const notesLineEn = hasNotes ? `<br>Notes: ${notes}` : '';
  const description = [
    'Cảm ơn bạn đã đặt lịch với <b>Maison Denude</b>.',
    `<br><br><b>${typeLabelVn}</b>`,
    `<br>Khách hàng: ${name}`,
    `<br>Điện thoại: ${phone}`,
    notesLineVn,
    `<br>${placeVn}`,
    `<br>Cần thay đổi? <a href="${cancelUrl}">Huỷ lịch hẹn tại đây</a>.`,
    '<br><br>———<br><br>',
    'Thank you for booking with <b>Maison Denude</b>.',
    `<br><br><b>${typeLabelEn}</b>`,
    `<br>Client: ${name}`,
    `<br>Phone: ${phone}`,
    notesLineEn,
    `<br>${placeEn}`,
    `<br>Need to change? <a href="${cancelUrl}">Cancel this booking here</a>.`,
  ].join('');

  const payload: Record<string, unknown> = {
    summary,
    description,
    start: { dateTime: input.slot.startIso, timeZone: TIME_ZONE },
    end: { dateTime: input.slot.endIso, timeZone: TIME_ZONE },
    attendees: buildAttendees(input),
  };

  if (input.type === 'Online') {
    payload.conferenceData = {
      createRequest: {
        requestId: meetRequestId(input.slot),
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    };
  } else {
    payload.location = input.atelierAddress;
  }

  return payload;
}

/**
 * Query Google free/busy for a calendar over a window. Never throws.
 * Parses `calendars[calendarId].busy` into `BusyInterval[]`; a missing key or
 * busy array is treated defensively as no busy intervals.
 */
export async function queryFreeBusy(
  accessToken: string,
  calendarId: string,
  timeMinIso: string,
  timeMaxIso: string,
  fetchImpl: typeof fetch = fetch,
): Promise<{ ok: true; busy: BusyInterval[] } | { ok: false; error: string }> {
  try {
    const response = await fetchImpl(`${CALENDAR_BASE}/freeBusy`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timeMin: timeMinIso,
        timeMax: timeMaxIso,
        items: [{ id: calendarId }],
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      return { ok: false, error: `freeBusy responded ${response.status}: ${detail}` };
    }

    const data = (await response.json().catch(() => ({}))) as {
      calendars?: Record<string, { busy?: Array<{ start?: string; end?: string }> }>;
    };

    const rawBusy = data.calendars?.[calendarId]?.busy ?? [];
    const busy: BusyInterval[] = rawBusy
      .filter((b): b is { start: string; end: string } => Boolean(b?.start && b?.end))
      .map((b) => ({ startIso: b.start, endIso: b.end }));

    return { ok: true, busy };
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    return { ok: false, error: `freeBusy query failed: ${message}` };
  }
}

/**
 * Insert a calendar event. `conferenceDataVersion=1` is required for Meet
 * creation (D-10); `sendUpdates` gates whether Google emails invites
 * (`none` in dev, `all` for live). Never throws.
 *
 * Extracts `eventId` (json.id) and a best-effort `meetUrl` (hangoutLink, else
 * the video entryPoint). `meetUrl` may be undefined — the caller handles that.
 */
export async function insertEvent(
  accessToken: string,
  calendarId: string,
  body: Record<string, unknown>,
  opts: { sendUpdates: 'all' | 'none' },
  fetchImpl: typeof fetch = fetch,
): Promise<{ ok: true; eventId: string; meetUrl?: string } | { ok: false; status: number; error: string }> {
  const url =
    `${CALENDAR_BASE}/calendars/${encodeURIComponent(calendarId)}/events` +
    `?conferenceDataVersion=1&sendUpdates=${encodeURIComponent(opts.sendUpdates)}`;

  try {
    const response = await fetchImpl(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      return {
        ok: false,
        status: response.status,
        error: `insertEvent responded ${response.status}: ${detail}`,
      };
    }

    const data = (await response.json().catch(() => ({}))) as {
      id?: string;
      hangoutLink?: string;
      conferenceData?: {
        entryPoints?: Array<{ entryPointType?: string; uri?: string }>;
      };
    };

    const meetUrl =
      data.hangoutLink ??
      data.conferenceData?.entryPoints?.find((e) => e.entryPointType === 'video')?.uri;

    return { ok: true, eventId: data.id ?? '', meetUrl };
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    return { ok: false, status: 0, error: `insertEvent failed: ${message}` };
  }
}

/**
 * Delete a calendar event. Idempotent: 2xx OR 404 OR 410 (already gone) all
 * count as success. Never throws.
 */
export async function deleteEvent(
  accessToken: string,
  calendarId: string,
  eventId: string,
  opts: { sendUpdates: 'all' | 'none' },
  fetchImpl: typeof fetch = fetch,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const url =
    `${CALENDAR_BASE}/calendars/${encodeURIComponent(calendarId)}/events/${encodeURIComponent(eventId)}` +
    `?sendUpdates=${encodeURIComponent(opts.sendUpdates)}`;

  try {
    const response = await fetchImpl(url, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });

    // Idempotent: already-gone (404/410) is success.
    if (response.ok || response.status === 404 || response.status === 410) {
      return { ok: true };
    }

    const detail = await response.text().catch(() => '');
    return { ok: false, error: `deleteEvent responded ${response.status}: ${detail}` };
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    return { ok: false, error: `deleteEvent failed: ${message}` };
  }
}
