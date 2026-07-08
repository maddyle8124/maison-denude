/**
 * Tests for the pure slot-generation module (D-6, D-7, D-11).
 *
 * Written FIRST (test-driven). The module under test is pure: no import-time
 * env, no I/O, no `new Date()` without args in logic paths — `now` is always
 * injected, so every test is deterministic.
 *
 * Timezone is the trap (D-6: Asia/Ho_Chi_Minh = fixed UTC+7, NO DST). Slot
 * identity is local +07 wall-clock; instant comparisons go through epoch ms.
 */
import { describe, it, expect } from 'vitest';
import {
  toLocalIso,
  generateSlots,
  isBookable,
  type WeeklyRules,
  type Slot,
} from './slots';

// D-6 working hours as WeeklyRules.
const RULES: WeeklyRules = {
  openHour: 10,
  closeHour: 18,
  slotMinutes: 60,
  openDays: [1, 2, 3, 4, 5, 6], // Mon–Sat; Sun (0) closed
  tzOffsetMinutes: 420, // +07:00
};

const MIN_LEAD = 24; // D-7: ≥24h lead
const MAX_HORIZON = 60; // D-7: 60-day horizon

// ---------------------------------------------------------------------------
// toLocalIso
// ---------------------------------------------------------------------------

describe('toLocalIso', () => {
  it('formats a +07:00 RFC-3339 string with zero-padding on every field', () => {
    expect(toLocalIso(2026, 7, 15, 10, 0, 420)).toBe('2026-07-15T10:00:00+07:00');
  });

  it('zero-pads single-digit month, day, hour and minute', () => {
    expect(toLocalIso(2026, 1, 5, 9, 5, 420)).toBe('2026-01-05T09:05:00+07:00');
  });

  it('formats the offset sign and HH:MM correctly for other offsets', () => {
    expect(toLocalIso(2026, 7, 15, 10, 0, 0)).toBe('2026-07-15T10:00:00+00:00');
    expect(toLocalIso(2026, 7, 15, 10, 0, 330)).toBe('2026-07-15T10:00:00+05:30');
    expect(toLocalIso(2026, 7, 15, 10, 0, -300)).toBe('2026-07-15T10:00:00-05:00');
  });

  it('handles month/day boundary values (does not roll over — caller supplies valid fields)', () => {
    expect(toLocalIso(2026, 12, 31, 17, 0, 420)).toBe('2026-12-31T17:00:00+07:00');
  });

  it('produces a string a 10:00+07 slot maps to the same instant as 03:00Z', () => {
    const iso = toLocalIso(2026, 7, 15, 10, 0, 420);
    expect(new Date(iso).getTime()).toBe(new Date('2026-07-15T03:00:00Z').getTime());
  });
});

// ---------------------------------------------------------------------------
// isBookable
// ---------------------------------------------------------------------------

describe('isBookable', () => {
  // Fixed injected now: Tuesday 2026-07-14 00:00 local +07.
  const now = new Date('2026-07-14T00:00:00+07:00');

  const slotAt = (iso: string): Slot => ({
    startIso: iso,
    endIso: iso, // endIso is irrelevant to isBookable (start-instant only)
  });

  it('EXCLUDES a slot at now+23h (below the 24h lead)', () => {
    // 2026-07-14 00:00 +07 + 23h = 2026-07-14 23:00 +07
    const slot = slotAt('2026-07-14T23:00:00+07:00');
    expect(isBookable(slot, now, MIN_LEAD, MAX_HORIZON)).toBe(false);
  });

  it('INCLUDES a slot exactly at now+24h (lead is inclusive, >=)', () => {
    const slot = slotAt('2026-07-15T00:00:00+07:00');
    expect(isBookable(slot, now, MIN_LEAD, MAX_HORIZON)).toBe(true);
  });

  it('INCLUDES a slot at now+25h (above the 24h lead)', () => {
    const slot = slotAt('2026-07-15T01:00:00+07:00');
    expect(isBookable(slot, now, MIN_LEAD, MAX_HORIZON)).toBe(true);
  });

  it('INCLUDES a slot at exactly the 60-day horizon (inclusive, <=)', () => {
    // now + 60 days = 2026-09-12 00:00 +07
    const slot = slotAt('2026-09-12T00:00:00+07:00');
    expect(isBookable(slot, now, MIN_LEAD, MAX_HORIZON)).toBe(true);
  });

  it('EXCLUDES a slot one day past the horizon (day 61)', () => {
    const slot = slotAt('2026-09-13T00:00:00+07:00');
    expect(isBookable(slot, now, MIN_LEAD, MAX_HORIZON)).toBe(false);
  });

  it.each([
    ['2026-07-14T23:00:00+07:00', false], // now+23h
    ['2026-07-15T00:00:00+07:00', true], // now+24h boundary
    ['2026-07-15T01:00:00+07:00', true], // now+25h
    ['2026-09-12T00:00:00+07:00', true], // horizon boundary
    ['2026-09-13T00:00:00+07:00', false], // past horizon
  ] as const)('boundary table: slot %s -> bookable %s', (iso, expected) => {
    expect(isBookable(slotAt(iso), now, MIN_LEAD, MAX_HORIZON)).toBe(expected);
  });

  it('matches instants regardless of the string offset representation (07:00+07 == 00:00Z)', () => {
    // now+24h expressed as a Z string is the same instant → still bookable.
    const asZ = slotAt('2026-07-14T17:00:00Z'); // == 2026-07-15T00:00+07
    expect(isBookable(asZ, now, MIN_LEAD, MAX_HORIZON)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// generateSlots
// ---------------------------------------------------------------------------

describe('generateSlots', () => {
  it('never emits a slot before 10:00 or an 18:00 start (first 10:00, last 17:00)', () => {
    const now = new Date('2026-07-14T00:00:00+07:00');
    const slots = generateSlots(RULES, now, MIN_LEAD, MAX_HORIZON);

    const localHours = slots.map((s) => new Date(s.startIso).getUTCHours());
    // In +07, a 10:00 local start is 03:00 UTC; a 17:00 local start is 10:00 UTC.
    // Assert on the ISO string hour segment instead for clarity.
    const startHours = slots.map((s) => Number(s.startIso.slice(11, 13)));
    expect(Math.min(...startHours)).toBe(10);
    expect(Math.max(...startHours)).toBe(17);
    expect(startHours).not.toContain(18);
    expect(startHours).not.toContain(9);
    // silence unused
    void localHours;
  });

  it('emits exactly 8 start hours per open day (10..17 inclusive)', () => {
    const now = new Date('2026-07-14T00:00:00+07:00');
    const slots = generateSlots(RULES, now, MIN_LEAD, MAX_HORIZON);

    // Group by local date, pick one fully-open future day and count its slots.
    const byDate = new Map<string, Slot[]>();
    for (const s of slots) {
      const date = s.startIso.slice(0, 10);
      byDate.set(date, [...(byDate.get(date) ?? []), s]);
    }
    // 2026-07-16 is a Thursday, well past the 24h lead and inside horizon → full 8 slots.
    const thursday = byDate.get('2026-07-16');
    expect(thursday).toBeDefined();
    expect(thursday).toHaveLength(8);
    const hours = thursday!.map((s) => Number(s.startIso.slice(11, 13))).sort((a, b) => a - b);
    expect(hours).toEqual([10, 11, 12, 13, 14, 15, 16, 17]);
  });

  it('produces 60-minute slots (end = start + 60min) with a +07:00 offset on both', () => {
    const now = new Date('2026-07-14T00:00:00+07:00');
    const [slot] = generateSlots(RULES, now, MIN_LEAD, MAX_HORIZON);
    expect(slot.startIso).toMatch(/\+07:00$/);
    expect(slot.endIso).toMatch(/\+07:00$/);
    const diff = new Date(slot.endIso).getTime() - new Date(slot.startIso).getTime();
    expect(diff).toBe(60 * 60 * 1000);
  });

  it('is CLOSED on Sunday — no slot ever falls on a Sunday', () => {
    const now = new Date('2026-07-14T00:00:00+07:00');
    const slots = generateSlots(RULES, now, MIN_LEAD, MAX_HORIZON);

    for (const s of slots) {
      // Read the local weekday by shifting the instant into +07 and reading UTC day.
      const localMs = new Date(s.startIso).getTime() + 420 * 60 * 1000;
      const weekday = new Date(localMs).getUTCDay(); // 0 = Sunday
      expect(weekday).not.toBe(0);
    }
    // Sanity: 2026-07-19 is a Sunday and must be absent.
    expect(slots.some((s) => s.startIso.startsWith('2026-07-19'))).toBe(false);
  });

  it('excludes slots inside the 24h lead window (nothing on the same local day as a midnight now)', () => {
    // now = 2026-07-14 00:00 +07. Lead 24h means the earliest bookable is
    // 2026-07-15 00:00 +07, so NO 2026-07-14 slot (all are < now+24h) survives.
    const now = new Date('2026-07-14T00:00:00+07:00');
    const slots = generateSlots(RULES, now, MIN_LEAD, MAX_HORIZON);
    expect(slots.some((s) => s.startIso.startsWith('2026-07-14'))).toBe(false);
    // But 2026-07-15 (Wed) slots from 10:00 are all > now+24h → present.
    expect(slots.some((s) => s.startIso === '2026-07-15T10:00:00+07:00')).toBe(true);
  });

  it('respects the horizon: no slot beyond now+60 days', () => {
    const now = new Date('2026-07-14T00:00:00+07:00');
    const slots = generateSlots(RULES, now, MIN_LEAD, MAX_HORIZON);
    const horizonMs = now.getTime() + MAX_HORIZON * 24 * 60 * 60 * 1000;
    for (const s of slots) {
      expect(new Date(s.startIso).getTime()).toBeLessThanOrEqual(horizonMs);
    }
  });

  it('every emitted slot individually passes isBookable', () => {
    const now = new Date('2026-07-14T00:00:00+07:00');
    const slots = generateSlots(RULES, now, MIN_LEAD, MAX_HORIZON);
    for (const s of slots) {
      expect(isBookable(s, now, MIN_LEAD, MAX_HORIZON)).toBe(true);
    }
  });

  it('is deterministic for a fixed now (same input → identical output)', () => {
    const now = new Date('2026-07-14T00:00:00+07:00');
    const a = generateSlots(RULES, now, MIN_LEAD, MAX_HORIZON);
    const b = generateSlots(RULES, now, MIN_LEAD, MAX_HORIZON);
    expect(a).toEqual(b);
  });
});
