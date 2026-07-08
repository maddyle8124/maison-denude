/**
 * Tests for the pure availability reducer (D-2, D-11).
 *
 * Written FIRST (test-driven). Availability = candidate slots − Google
 * free/busy − DB-taken starts. Overlap is EPOCH-based: +07 slot strings and
 * Google 'Z' strings are parsed to ms before comparing. Adjacency is NOT
 * overlap (busy 10–11 must not remove the 11:00 slot). No env, no I/O.
 */
import { describe, it, expect } from 'vitest';
import {
  subtractBusy,
  subtractTaken,
  computeAvailability,
  type BusyInterval,
} from './availability';
import { type Slot } from './slots';

// A morning of 60-min +07 slots: 10:00, 11:00, 12:00 on 2026-07-15.
const slot = (startHour: number): Slot => ({
  startIso: `2026-07-15T${String(startHour).padStart(2, '0')}:00:00+07:00`,
  endIso: `2026-07-15T${String(startHour + 1).padStart(2, '0')}:00:00+07:00`,
});

const SLOTS: Slot[] = [slot(10), slot(11), slot(12)];

const startsOf = (slots: Slot[]): string[] => slots.map((s) => s.startIso);

// ---------------------------------------------------------------------------
// subtractBusy
// ---------------------------------------------------------------------------

describe('subtractBusy', () => {
  it('removes a slot fully covered by a busy interval', () => {
    const busy: BusyInterval[] = [
      { startIso: '2026-07-15T10:00:00+07:00', endIso: '2026-07-15T11:00:00+07:00' },
    ];
    expect(startsOf(subtractBusy(SLOTS, busy))).toEqual([
      '2026-07-15T11:00:00+07:00',
      '2026-07-15T12:00:00+07:00',
    ]);
  });

  it('ADJACENCY IS NOT OVERLAP: busy 10:00–11:00 removes the 10:00 slot but KEEPS 11:00', () => {
    const busy: BusyInterval[] = [
      { startIso: '2026-07-15T10:00:00+07:00', endIso: '2026-07-15T11:00:00+07:00' },
    ];
    const remaining = startsOf(subtractBusy(SLOTS, busy));
    expect(remaining).toContain('2026-07-15T11:00:00+07:00'); // adjacent, kept
    expect(remaining).not.toContain('2026-07-15T10:00:00+07:00'); // covered, removed
  });

  it('removes a slot on PARTIAL overlap (busy 10:30–11:30 kills both 10:00 and 11:00)', () => {
    const busy: BusyInterval[] = [
      { startIso: '2026-07-15T10:30:00+07:00', endIso: '2026-07-15T11:30:00+07:00' },
    ];
    const remaining = startsOf(subtractBusy(SLOTS, busy));
    expect(remaining).toEqual(['2026-07-15T12:00:00+07:00']);
  });

  it('matches a busy interval given in UTC "Z" against a +07 slot for the same wall time', () => {
    // 03:00–04:00 Z == 10:00–11:00 +07 → removes the 10:00 slot.
    const busy: BusyInterval[] = [
      { startIso: '2026-07-15T03:00:00Z', endIso: '2026-07-15T04:00:00Z' },
    ];
    const remaining = startsOf(subtractBusy(SLOTS, busy));
    expect(remaining).not.toContain('2026-07-15T10:00:00+07:00');
    expect(remaining).toContain('2026-07-15T11:00:00+07:00');
  });

  it('returns all slots unchanged when busy is empty', () => {
    expect(subtractBusy(SLOTS, [])).toEqual(SLOTS);
  });

  it('handles multiple busy intervals', () => {
    const busy: BusyInterval[] = [
      { startIso: '2026-07-15T10:00:00+07:00', endIso: '2026-07-15T11:00:00+07:00' },
      { startIso: '2026-07-15T12:00:00+07:00', endIso: '2026-07-15T13:00:00+07:00' },
    ];
    expect(startsOf(subtractBusy(SLOTS, busy))).toEqual(['2026-07-15T11:00:00+07:00']);
  });

  it('does not remove a slot when a busy interval sits entirely in a gap between slots', () => {
    // No such gap in a contiguous grid, but a zero-length / far interval must be a no-op.
    const busy: BusyInterval[] = [
      { startIso: '2026-07-20T10:00:00+07:00', endIso: '2026-07-20T11:00:00+07:00' },
    ];
    expect(subtractBusy(SLOTS, busy)).toEqual(SLOTS);
  });
});

// ---------------------------------------------------------------------------
// subtractTaken
// ---------------------------------------------------------------------------

describe('subtractTaken', () => {
  it('removes a slot whose start matches a taken start (same +07 string)', () => {
    const taken = ['2026-07-15T11:00:00+07:00'];
    expect(startsOf(subtractTaken(SLOTS, taken))).toEqual([
      '2026-07-15T10:00:00+07:00',
      '2026-07-15T12:00:00+07:00',
    ]);
  });

  it('matches by INSTANT, not string: a "Z" taken start removes the matching +07 slot', () => {
    // 03:00Z == 10:00+07 → removes the 10:00 slot even though the strings differ.
    const taken = ['2026-07-15T03:00:00Z'];
    const remaining = startsOf(subtractTaken(SLOTS, taken));
    expect(remaining).not.toContain('2026-07-15T10:00:00+07:00');
    expect(remaining).toHaveLength(2);
  });

  it('returns all slots unchanged when taken is empty', () => {
    expect(subtractTaken(SLOTS, [])).toEqual(SLOTS);
  });

  it('ignores taken starts that match no slot', () => {
    const taken = ['2026-07-15T09:00:00+07:00', '2026-07-16T10:00:00+07:00'];
    expect(subtractTaken(SLOTS, taken)).toEqual(SLOTS);
  });
});

// ---------------------------------------------------------------------------
// computeAvailability
// ---------------------------------------------------------------------------

describe('computeAvailability', () => {
  it('subtracts busy then taken (D-2 pipeline)', () => {
    const busy: BusyInterval[] = [
      { startIso: '2026-07-15T10:00:00+07:00', endIso: '2026-07-15T11:00:00+07:00' },
    ];
    const taken = ['2026-07-15T12:00:00+07:00'];
    expect(startsOf(computeAvailability(SLOTS, busy, taken))).toEqual([
      '2026-07-15T11:00:00+07:00',
    ]);
  });

  it('removes a slot that is BOTH busy AND taken exactly once (no crash, no dupes)', () => {
    const busy: BusyInterval[] = [
      { startIso: '2026-07-15T10:00:00+07:00', endIso: '2026-07-15T11:00:00+07:00' },
    ];
    const taken = ['2026-07-15T10:00:00+07:00']; // same slot flagged twice
    const remaining = startsOf(computeAvailability(SLOTS, busy, taken));
    expect(remaining).toEqual(['2026-07-15T11:00:00+07:00', '2026-07-15T12:00:00+07:00']);
    // exactly two remaining, the 10:00 removed once
    expect(remaining).toHaveLength(2);
  });

  it('returns all slots when both busy and taken are empty', () => {
    expect(computeAvailability(SLOTS, [], [])).toEqual(SLOTS);
  });

  it('handles a busy given in Z and a taken given in Z together', () => {
    const busy: BusyInterval[] = [
      { startIso: '2026-07-15T03:00:00Z', endIso: '2026-07-15T04:00:00Z' }, // kills 10:00
    ];
    const taken = ['2026-07-15T04:00:00Z']; // == 11:00+07 → kills 11:00
    expect(startsOf(computeAvailability(SLOTS, busy, taken))).toEqual([
      '2026-07-15T12:00:00+07:00',
    ]);
  });

  it('does not mutate the input slots array', () => {
    const input = [...SLOTS];
    computeAvailability(input, [{ startIso: '2026-07-15T10:00:00+07:00', endIso: '2026-07-15T11:00:00+07:00' }], []);
    expect(input).toEqual(SLOTS);
  });
});
