/**
 * Pure availability reducer for the self-serve booking calendar (D-2, D-11).
 *
 * Availability = candidate slots − Google free/busy − DB-taken starts.
 *
 * Design constraints (test-driven, see availability.test.ts):
 * - ZERO import-time env, ZERO I/O. Pure functions only.
 * - Overlap is EPOCH-based: the +07 slot strings and Google's `Z` strings are
 *   both parsed to ms before comparing, so a slot and a busy interval for the
 *   same wall time match regardless of textual offset representation.
 * - ADJACENCY IS NOT OVERLAP: a slot overlaps a busy interval iff
 *   `slotStart < busyEnd && slotEnd > busyStart` (strict). Busy 10:00–11:00
 *   removes the 10:00 slot but NOT the adjacent 11:00 slot.
 */
import type { Slot } from './slots';

/** A Google free/busy interval. Instants (Google returns UTC 'Z'). */
export interface BusyInterval {
  startIso: string;
  endIso: string;
}

/** Parse an RFC-3339 instant to epoch ms. */
function ms(iso: string): number {
  return new Date(iso).getTime();
}

/**
 * Remove any slot that overlaps a busy interval. Overlap is strict
 * (`slotStart < busyEnd && slotEnd > busyStart`), so adjacency is preserved.
 */
export function subtractBusy(slots: Slot[], busy: BusyInterval[]): Slot[] {
  if (busy.length === 0) return slots.slice();
  const intervals = busy.map((b) => ({ start: ms(b.startIso), end: ms(b.endIso) }));

  return slots.filter((slot) => {
    const slotStart = ms(slot.startIso);
    const slotEnd = ms(slot.endIso);
    const collides = intervals.some(
      (iv) => slotStart < iv.end && slotEnd > iv.start,
    );
    return !collides;
  });
}

/**
 * Remove any slot whose start refers to the same INSTANT as any taken start.
 * Compared by epoch ms — a +07 slot string and a `Z` taken string for the same
 * instant match even though they differ textually.
 */
export function subtractTaken(slots: Slot[], takenStarts: string[]): Slot[] {
  if (takenStarts.length === 0) return slots.slice();
  const takenMs = new Set(takenStarts.map(ms));
  return slots.filter((slot) => !takenMs.has(ms(slot.startIso)));
}

/**
 * Full D-2 pipeline: candidate slots − free/busy − DB-taken starts.
 * `computeAvailability = subtractTaken(subtractBusy(slots, busy), takenStarts)`.
 */
export function computeAvailability(
  slots: Slot[],
  busy: BusyInterval[],
  takenStarts: string[],
): Slot[] {
  return subtractTaken(subtractBusy(slots, busy), takenStarts);
}
