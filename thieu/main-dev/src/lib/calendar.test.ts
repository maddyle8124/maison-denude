/**
 * Tests for the Google Calendar payload builder + injectable REST I/O (D-3, D-9, D-10).
 *
 * Written FIRST (test-driven, D-11). Mirrors email.test.ts: pure builder +
 * injected `fetchImpl`, no import-time env, no `vi.mock`; assertions on
 * `.mock.calls`. Deterministic — no Date.now / Math.random anywhere.
 *
 * `Slot` / `BusyInterval` are structural ({startIso,endIso}); calendar.ts
 * imports them as types (erased at runtime) from ./slots and ./availability.
 */
import { describe, it, expect, vi } from 'vitest';
import {
  meetRequestId,
  buildEventPayload,
  resolveCalendarEnv,
  queryFreeBusy,
  insertEvent,
  deleteEvent,
  type EventInput,
} from './calendar';

// A fixed sample slot — deterministic, +07 wall clock.
const SLOT = {
  startIso: '2026-07-15T10:00:00+07:00',
  endIso: '2026-07-15T11:00:00+07:00',
};

const OWNER = 'nguyenthaithieu@gmail.com';
const TEAM = [
  'nhokieunhan@gmail.com',
  'nguyenthaithieu@gmail.com', // == OWNER — must be filtered out of attendees
  'nhokieunhan3@gmail.com',
];

const baseInput: EventInput = {
  type: 'Online',
  slot: SLOT,
  clientName: 'Nguyễn Thị Ánh',
  clientEmail: 'client@example.com',
  clientPhone: '+84 905 123 456',
  notes: 'Tư vấn áo dài cưới',
  teamInvitees: TEAM,
  ownerEmail: OWNER,
  atelierAddress: '194 Lê Thánh Tôn, 2nd Floor, District 1',
  cancelUrl: 'https://maisondenude.com/booking/cancel?token=abc123',
};

/** Vitest fetch double that returns a JSON Response with the given status. */
function mockFetchResponse(status: number, body: unknown): typeof fetch {
  return vi.fn(async () =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    }),
  ) as unknown as typeof fetch;
}

// ---------------------------------------------------------------------------
// meetRequestId
// ---------------------------------------------------------------------------

describe('meetRequestId', () => {
  it('is deterministic — same slot yields the same id (safe for insert retries)', () => {
    const a = meetRequestId(SLOT);
    const b = meetRequestId(SLOT);
    expect(a).toBe(b);
    expect(a).toContain(SLOT.startIso);
  });

  it('differs for a different slot start', () => {
    const other = { startIso: '2026-07-16T10:00:00+07:00', endIso: '2026-07-16T11:00:00+07:00' };
    expect(meetRequestId(SLOT)).not.toBe(meetRequestId(other));
  });
});

// ---------------------------------------------------------------------------
// buildEventPayload
// ---------------------------------------------------------------------------

describe('buildEventPayload', () => {
  it('sets start/end with the Asia/Ho_Chi_Minh timezone', () => {
    const p = buildEventPayload(baseInput) as {
      start: { dateTime: string; timeZone: string };
      end: { dateTime: string; timeZone: string };
    };
    expect(p.start).toEqual({ dateTime: SLOT.startIso, timeZone: 'Asia/Ho_Chi_Minh' });
    expect(p.end).toEqual({ dateTime: SLOT.endIso, timeZone: 'Asia/Ho_Chi_Minh' });
  });

  it('Online: adds conferenceData.createRequest with hangoutsMeet and a deterministic requestId', () => {
    const p = buildEventPayload({ ...baseInput, type: 'Online' }) as {
      conferenceData?: {
        createRequest?: {
          requestId?: string;
          conferenceSolutionKey?: { type?: string };
        };
      };
      location?: string;
    };
    expect(p.conferenceData?.createRequest?.conferenceSolutionKey?.type).toBe('hangoutsMeet');
    expect(p.conferenceData?.createRequest?.requestId).toBe(meetRequestId(SLOT));
    expect(p.location).toBeUndefined();
  });

  it('Instore: has NO conferenceData and sets location to the atelier address', () => {
    const p = buildEventPayload({ ...baseInput, type: 'Instore' }) as {
      conferenceData?: unknown;
      location?: string;
    };
    expect(p.conferenceData).toBeUndefined();
    expect(p.location).toBe(baseInput.atelierAddress);
  });

  it('attendees = team + client, deduped, with the owner filtered out (owner is organizer)', () => {
    const p = buildEventPayload(baseInput) as { attendees: Array<{ email: string }> };
    const emails = p.attendees.map((a) => a.email.toLowerCase());

    // Client present.
    expect(emails).toContain('client@example.com');
    // Non-owner team members present.
    expect(emails).toContain('nhokieunhan@gmail.com');
    expect(emails).toContain('nhokieunhan3@gmail.com');
    // Owner filtered out even though present in teamInvitees.
    expect(emails).not.toContain(OWNER.toLowerCase());
    // No duplicates.
    expect(new Set(emails).size).toBe(emails.length);
  });

  it('filters the owner out case-insensitively', () => {
    const p = buildEventPayload({
      ...baseInput,
      teamInvitees: ['NguyenThaiThieu@Gmail.com', 'nhokieunhan@gmail.com'],
    }) as { attendees: Array<{ email: string }> };
    const emails = p.attendees.map((a) => a.email.toLowerCase());
    expect(emails).not.toContain(OWNER.toLowerCase());
  });

  it('dedupes when the client email equals a team email (case-insensitive, no duplicate attendee)', () => {
    const p = buildEventPayload({
      ...baseInput,
      clientEmail: 'NhoKieuNhan@gmail.com', // same as a team member, different case
    }) as { attendees: Array<{ email: string }> };
    const emails = p.attendees.map((a) => a.email.toLowerCase());
    const count = emails.filter((e) => e === 'nhokieunhan@gmail.com').length;
    expect(count).toBe(1);
  });

  it('description is bilingual (VN + EN) and contains client name, phone, notes and the cancel URL', () => {
    const p = buildEventPayload(baseInput) as { summary: string; description: string };
    const desc = p.description;

    // Client details.
    expect(desc).toContain(baseInput.clientName);
    expect(desc).toContain(baseInput.clientPhone);
    expect(desc).toContain('Tư vấn áo dài cưới');
    expect(desc).toContain(baseInput.cancelUrl);

    // Bilingual markers — VN diacritics + an EN word.
    const hasVietnamese = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(
      desc,
    );
    expect(hasVietnamese).toBe(true);
    expect(desc.toLowerCase()).toContain('cancel');

    // On-brand formatted body (not a raw field dump): the cancel URL is a real
    // link and the brand name is emphasised via the HTML subset Google renders.
    expect(desc).toContain(`<a href="${baseInput.cancelUrl}">`);
    expect(desc).toContain('<b>Maison Denude</b>');
  });

  it('summary is present and bilingual-ready (non-empty string)', () => {
    const p = buildEventPayload(baseInput) as { summary: string };
    expect(typeof p.summary).toBe('string');
    expect(p.summary.length).toBeGreaterThan(0);
    expect(p.summary).toContain(baseInput.clientName);
  });

  it('does not inject unescaped HTML tags from user values into the description', () => {
    const p = buildEventPayload({
      ...baseInput,
      clientName: '<script>alert(1)</script>',
    }) as { description: string };
    expect(p.description).not.toContain('<script>');
  });

  it('renders sensibly when notes is null/undefined (no "null"/"undefined" leaking, no empty notes line)', () => {
    for (const notes of [null, undefined, '', '   ']) {
      const p = buildEventPayload({ ...baseInput, notes }) as { description: string };
      expect(p.description).not.toContain('undefined');
      expect(p.description).not.toContain('null');
      expect(p.description).toContain(baseInput.clientName);
      // The notes line is omitted entirely when there are no notes.
      expect(p.description).not.toContain('Ghi chú:');
      expect(p.description).not.toContain('Notes:');
    }
  });
});

// ---------------------------------------------------------------------------
// resolveCalendarEnv
// ---------------------------------------------------------------------------

describe('resolveCalendarEnv', () => {
  it('passes GOOGLE_CALENDAR_ID through', () => {
    const cfg = resolveCalendarEnv({ GOOGLE_CALENDAR_ID: 'owner@gmail.com' });
    expect(cfg).toEqual({ GOOGLE_CALENDAR_ID: 'owner@gmail.com' });
  });
});

// ---------------------------------------------------------------------------
// queryFreeBusy
// ---------------------------------------------------------------------------

describe('queryFreeBusy', () => {
  const CAL = 'owner@gmail.com';
  const TIME_MIN = '2026-07-15T00:00:00+07:00';
  const TIME_MAX = '2026-07-16T00:00:00+07:00';

  it('POSTs the freeBusy request with a Bearer token and parses busy intervals', async () => {
    const fetchImpl = mockFetchResponse(200, {
      calendars: {
        [CAL]: {
          busy: [
            { start: '2026-07-15T03:00:00Z', end: '2026-07-15T04:00:00Z' },
            { start: '2026-07-15T06:00:00Z', end: '2026-07-15T07:00:00Z' },
          ],
        },
      },
    });

    const result = await queryFreeBusy('tok-123', CAL, TIME_MIN, TIME_MAX, fetchImpl);
    expect(result).toEqual({
      ok: true,
      busy: [
        { startIso: '2026-07-15T03:00:00Z', endIso: '2026-07-15T04:00:00Z' },
        { startIso: '2026-07-15T06:00:00Z', endIso: '2026-07-15T07:00:00Z' },
      ],
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = (fetchImpl as ReturnType<typeof vi.fn>).mock.calls[0] as [
      string,
      RequestInit,
    ];
    expect(url).toBe('https://www.googleapis.com/calendar/v3/freeBusy');
    expect(init.method).toBe('POST');
    const headers = init.headers as Record<string, string>;
    expect(headers['Authorization']).toBe('Bearer tok-123');
    expect(headers['Content-Type']).toBe('application/json');

    const body = JSON.parse(init.body as string);
    expect(body.timeMin).toBe(TIME_MIN);
    expect(body.timeMax).toBe(TIME_MAX);
    expect(body.items).toEqual([{ id: CAL }]);
  });

  it('returns an empty busy array when the calendar reports none', async () => {
    const fetchImpl = mockFetchResponse(200, {
      calendars: { [CAL]: { busy: [] } },
    });
    const result = await queryFreeBusy('tok', CAL, TIME_MIN, TIME_MAX, fetchImpl);
    expect(result).toEqual({ ok: true, busy: [] });
  });

  it('is defensive when the calendar key/busy is absent (returns ok with empty busy)', async () => {
    const fetchImpl = mockFetchResponse(200, { calendars: {} });
    const result = await queryFreeBusy('tok', CAL, TIME_MIN, TIME_MAX, fetchImpl);
    expect(result).toEqual({ ok: true, busy: [] });
  });

  it.each([400, 401, 403, 429, 500])(
    'resolves { ok:false } WITHOUT throwing on HTTP %d',
    async (status) => {
      const fetchImpl = mockFetchResponse(status, { error: 'nope' });
      const result = await queryFreeBusy('tok', CAL, TIME_MIN, TIME_MAX, fetchImpl);
      expect(result.ok).toBe(false);
    },
  );

  it('resolves { ok:false } without throwing when fetch rejects', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError('network down');
    }) as unknown as typeof fetch;
    await expect(
      queryFreeBusy('tok', CAL, TIME_MIN, TIME_MAX, fetchImpl),
    ).resolves.toMatchObject({ ok: false });
  });
});

// ---------------------------------------------------------------------------
// insertEvent
// ---------------------------------------------------------------------------

describe('insertEvent', () => {
  const CAL = 'owner@gmail.com';
  const payload = { summary: 'test' };

  it('POSTs to the events endpoint with conferenceDataVersion=1 + sendUpdates, Bearer token, and returns eventId + meetUrl from hangoutLink', async () => {
    const fetchImpl = mockFetchResponse(200, {
      id: 'evt_123',
      hangoutLink: 'https://meet.google.com/abc-defg-hij',
    });

    const result = await insertEvent('tok-9', CAL, payload, { sendUpdates: 'all' }, fetchImpl);
    expect(result).toEqual({
      ok: true,
      eventId: 'evt_123',
      meetUrl: 'https://meet.google.com/abc-defg-hij',
    });

    const [url, init] = (fetchImpl as ReturnType<typeof vi.fn>).mock.calls[0] as [
      string,
      RequestInit,
    ];
    expect(url).toContain('https://www.googleapis.com/calendar/v3/calendars/');
    expect(url).toContain(encodeURIComponent(CAL));
    expect(url).toContain('conferenceDataVersion=1');
    expect(url).toContain('sendUpdates=all');
    expect(init.method).toBe('POST');
    const headers = init.headers as Record<string, string>;
    expect(headers['Authorization']).toBe('Bearer tok-9');
    expect(headers['Content-Type']).toBe('application/json');
    expect(JSON.parse(init.body as string)).toEqual(payload);
  });

  it('extracts meetUrl from conferenceData entryPoints when hangoutLink is absent', async () => {
    const fetchImpl = mockFetchResponse(200, {
      id: 'evt_456',
      conferenceData: {
        entryPoints: [
          { entryPointType: 'more', uri: 'https://meet.google.com/settings' },
          { entryPointType: 'video', uri: 'https://meet.google.com/xyz-1234-abc' },
        ],
      },
    });
    const result = await insertEvent('tok', CAL, payload, { sendUpdates: 'none' }, fetchImpl);
    expect(result).toEqual({
      ok: true,
      eventId: 'evt_456',
      meetUrl: 'https://meet.google.com/xyz-1234-abc',
    });
  });

  it('handles a missing Meet link gracefully (meetUrl undefined, still ok)', async () => {
    const fetchImpl = mockFetchResponse(200, { id: 'evt_789' });
    const result = await insertEvent('tok', CAL, payload, { sendUpdates: 'none' }, fetchImpl);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.eventId).toBe('evt_789');
      expect(result.meetUrl).toBeUndefined();
    }
  });

  it('URL-encodes sendUpdates=none in the request URL', async () => {
    const fetchImpl = mockFetchResponse(200, { id: 'e' });
    await insertEvent('tok', CAL, payload, { sendUpdates: 'none' }, fetchImpl);
    const [url] = (fetchImpl as ReturnType<typeof vi.fn>).mock.calls[0] as [string];
    expect(url).toContain('sendUpdates=none');
  });

  it.each([400, 401, 403, 409, 429, 500])(
    'resolves { ok:false, status } WITHOUT throwing on HTTP %d',
    async (status) => {
      const fetchImpl = mockFetchResponse(status, { error: { message: 'nope' } });
      const result = await insertEvent('tok', CAL, payload, { sendUpdates: 'all' }, fetchImpl);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.status).toBe(status);
        expect(result.error).toBeTruthy();
      }
    },
  );

  it('resolves { ok:false } without throwing when fetch rejects', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError('network down');
    }) as unknown as typeof fetch;
    await expect(
      insertEvent('tok', CAL, payload, { sendUpdates: 'all' }, fetchImpl),
    ).resolves.toMatchObject({ ok: false });
  });
});

// ---------------------------------------------------------------------------
// deleteEvent
// ---------------------------------------------------------------------------

describe('deleteEvent', () => {
  const CAL = 'owner@gmail.com';

  it('DELETEs the event with the Bearer token and sendUpdates, returns ok on 2xx', async () => {
    // Google returns 204 No Content on a successful delete (null body).
    const fetchImpl = vi.fn(
      async () => new Response(null, { status: 204 }),
    ) as unknown as typeof fetch;
    const result = await deleteEvent('tok', CAL, 'evt_1', { sendUpdates: 'all' }, fetchImpl);
    expect(result).toEqual({ ok: true });

    const [url, init] = (fetchImpl as ReturnType<typeof vi.fn>).mock.calls[0] as [
      string,
      RequestInit,
    ];
    expect(url).toContain(encodeURIComponent(CAL));
    expect(url).toContain('evt_1');
    expect(url).toContain('sendUpdates=all');
    expect(init.method).toBe('DELETE');
    const headers = init.headers as Record<string, string>;
    expect(headers['Authorization']).toBe('Bearer tok');
  });

  it.each([404, 410])(
    'is idempotent — treats HTTP %d (already gone) as success',
    async (status) => {
      const fetchImpl = mockFetchResponse(status, { error: 'gone' });
      const result = await deleteEvent('tok', CAL, 'evt_1', { sendUpdates: 'none' }, fetchImpl);
      expect(result).toEqual({ ok: true });
    },
  );

  it.each([400, 401, 403, 500])(
    'resolves { ok:false } WITHOUT throwing on other non-2xx HTTP %d',
    async (status) => {
      const fetchImpl = mockFetchResponse(status, { error: 'nope' });
      const result = await deleteEvent('tok', CAL, 'evt_1', { sendUpdates: 'all' }, fetchImpl);
      expect(result.ok).toBe(false);
    },
  );

  it('resolves { ok:false } without throwing when fetch rejects', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError('network down');
    }) as unknown as typeof fetch;
    await expect(
      deleteEvent('tok', CAL, 'evt_1', { sendUpdates: 'all' }, fetchImpl),
    ).resolves.toMatchObject({ ok: false });
  });
});
