/**
 * Pure slot generation for the self-serve booking calendar (D-6, D-7, D-11).
 *
 * Design constraints (test-driven, see slots.test.ts):
 * - ZERO import-time env, ZERO I/O. `now` is always injected — no `new Date()`
 *   with no args in any logic path — so every result is deterministic.
 * - Timezone is the trap (D-6: Asia/Ho_Chi_Minh = fixed UTC+7, NO DST). Slot
 *   IDENTITY (which local day/hour) is computed in local +07 wall-clock and
 *   serialized as RFC-3339 with a LITERAL `+07:00` offset. Instant comparisons
 *   (lead/horizon) go through epoch ms via `new Date(iso).getTime()`, which
 *   correctly accounts for the offset — we never add UTC ms across the offset.
 */

/** Fixed weekly working-hours rules (D-6). */
export interface WeeklyRules {
  openHour: number; // 10  (first slot starts here)
  closeHour: number; // 18  (last slot ENDS by here; last start = closeHour - slotMinutes/60)
  slotMinutes: number; // 60
  openDays: number[]; // [1,2,3,4,5,6]  (0=Sun..6=Sat; Sun excluded => closed)
  tzOffsetMinutes: number; // 420 for +07:00
}

/** A candidate slot. Both ends are RFC-3339 WITH the literal +07:00 offset. */
export interface Slot {
  startIso: string;
  endIso: string;
}

/** Zero-pad a non-negative integer to 2 digits. */
function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * Build an RFC-3339 string like `2026-07-15T10:00:00+07:00` for the given local
 * wall-clock fields and offset. `mo` is 1-12, `d` is 1-31; all fields zero-padded.
 * The offset sign and HH:MM are formatted correctly (e.g. 420 -> +07:00,
 * 330 -> +05:30, -300 -> -05:00).
 */
export function toLocalIso(
  y: number,
  mo: number,
  d: number,
  h: number,
  min: number,
  offsetMinutes: number,
): string {
  const sign = offsetMinutes < 0 ? '-' : '+';
  const abs = Math.abs(offsetMinutes);
  const offH = Math.floor(abs / 60);
  const offM = abs % 60;
  const date = `${y}-${pad2(mo)}-${pad2(d)}`;
  const time = `${pad2(h)}:${pad2(min)}:00`;
  return `${date}T${time}${sign}${pad2(offH)}:${pad2(offM)}`;
}

/**
 * True iff the slot's start INSTANT is within the bookable window:
 * `now + minLeadHours <= start <= now + maxHorizonDays` (both ends inclusive).
 * Comparison is epoch-based, so the slot's +07 offset is honoured correctly.
 */
export function isBookable(
  slot: Slot,
  now: Date,
  minLeadHours: number,
  maxHorizonDays: number,
): boolean {
  const startMs = new Date(slot.startIso).getTime();
  const earliestMs = now.getTime() + minLeadHours * 60 * 60 * 1000;
  const latestMs = now.getTime() + maxHorizonDays * 24 * 60 * 60 * 1000;
  return startMs >= earliestMs && startMs <= latestMs;
}

/**
 * Generate every bookable slot from `now` (local) through the horizon.
 *
 * For each calendar day from today (in local +07) through the horizon: if the
 * local weekday is in `openDays`, emit a slot at each start hour from `openHour`
 * up to `closeHour - slotMinutes/60` inclusive. Each slot failing `isBookable`
 * (lead/horizon) is excluded.
 */
export function generateSlots(
  rules: WeeklyRules,
  now: Date,
  minLeadHours: number,
  maxHorizonDays: number,
): Slot[] {
  const { openHour, closeHour, slotMinutes, openDays, tzOffsetMinutes } = rules;
  const offsetMs = tzOffsetMinutes * 60 * 1000;
  const slotHours = slotMinutes / 60;
  const lastStartHour = closeHour - slotHours;

  // "Local now" = shift the instant into the target offset, then read UTC
  // getters to obtain the local wall-clock fields. We iterate calendar days
  // starting from local today; horizon spans +maxHorizonDays, and (relative to
  // an early-morning now) any slot within can be at most maxHorizonDays+1 local
  // days out — iterate one extra day and let isBookable trim precisely.
  const localNow = new Date(now.getTime() + offsetMs);
  const startY = localNow.getUTCFullYear();
  const startMo = localNow.getUTCMonth(); // 0-based
  const startD = localNow.getUTCDate();

  const slots: Slot[] = [];

  for (let dayOffset = 0; dayOffset <= maxHorizonDays + 1; dayOffset++) {
    // Compose the local calendar date `dayOffset` days after local today.
    // Use a UTC anchor purely for calendar arithmetic (month/day/leap rollover),
    // then read its fields back — no offset is applied to this anchor, so its
    // UTC fields ARE the intended local wall-clock date.
    const dayAnchor = new Date(Date.UTC(startY, startMo, startD + dayOffset));
    const y = dayAnchor.getUTCFullYear();
    const mo = dayAnchor.getUTCMonth() + 1; // back to 1-based
    const d = dayAnchor.getUTCDate();
    const weekday = dayAnchor.getUTCDay(); // 0=Sun..6=Sat, in local terms

    if (!openDays.includes(weekday)) continue;

    for (let hour = openHour; hour <= lastStartHour; hour++) {
      const startIso = toLocalIso(y, mo, d, hour, 0, tzOffsetMinutes);
      const endIso = toLocalIso(y, mo, d, hour + slotHours, 0, tzOffsetMinutes);
      const slot: Slot = { startIso, endIso };
      if (isBookable(slot, now, minLeadHours, maxHorizonDays)) {
        slots.push(slot);
      }
    }
  }

  return slots;
}
