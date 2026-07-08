/**
 * Supabase-backed `BookingStore` — the ONLY place raw booking queries live for
 * the self-serve booking feature (invariant 6: all clients built via
 * `supabaseAdmin`). The flow (`booking-flow.ts`) stays DB-agnostic and is
 * unit-tested with an in-memory fake; this adapter is the real seam.
 *
 * Concurrency (D-4.2 / plan): `claimSlot` INSERTs status='confirmed'; the partial
 * unique index on `slot_start WHERE status IN ('confirmed','pending')` makes the
 * 2nd racing insert fail with Postgres code `23505` → mapped to
 * `reason:'slot_taken'`. Any other error → `reason:'error'`.
 *
 * `cancel_token` is high-entropy (`crypto.randomUUID`) and never logged.
 */
import type { SupabaseClient } from '@supabase/supabase-js';
import type { BookingStore, ClaimInput } from './booking-flow';

const TABLE = 'bookings';

/** Build the Supabase-backed store from a service-role client. */
export function createBookingStore(db: SupabaseClient): BookingStore {
  return {
    async claimSlot(input: ClaimInput) {
      const cancelToken = crypto.randomUUID();
      const { data, error } = await db
        .from(TABLE)
        .insert({
          name: input.name,
          phone: input.phone,
          email: input.email,
          slot_start: input.slotStartIso,
          slot_end: input.slotEndIso,
          consultation_type: input.consultationType,
          notes: input.notes ?? null,
          status: 'confirmed',
          cancel_token: cancelToken,
        })
        .select('id, cancel_token')
        .single();

      if (error) {
        // 23505 = unique_violation → the slot was claimed by a concurrent request.
        if (error.code === '23505') return { ok: false as const, reason: 'slot_taken' as const };
        return { ok: false as const, reason: 'error' as const };
      }

      return { ok: true as const, id: data.id as string, cancelToken: data.cancel_token as string };
    },

    async findLiveBySlotAndEmail(slotStartIso: string, email: string) {
      const { data, error } = await db
        .from(TABLE)
        .select('id, cancel_token')
        .eq('slot_start', slotStartIso)
        .eq('email', email)
        .in('status', ['confirmed', 'pending'])
        .limit(1)
        .maybeSingle();

      if (error || !data) return null;
      return { id: data.id as string, cancelToken: data.cancel_token as string };
    },

    async markPending(id: string) {
      await db.from(TABLE).update({ status: 'pending' }).eq('id', id);
    },

    async storeEventId(id: string, eventId: string) {
      const { error } = await db.from(TABLE).update({ calendar_event_id: eventId }).eq('id', id);
      // The flow treats a throw here as "event is live, row not updated" → logs +
      // still returns success. Surface the failure as a throw so it takes that path.
      if (error) throw new Error(error.message);
    },

    async releaseClaim(id: string) {
      await db.from(TABLE).delete().eq('id', id);
    },

    async takenStarts(fromIso: string, toIso: string) {
      const { data, error } = await db
        .from(TABLE)
        .select('slot_start')
        .in('status', ['confirmed', 'pending'])
        .gte('slot_start', fromIso)
        .lte('slot_start', toIso);

      if (error || !data) return [];
      return data
        .map((r) => r.slot_start as string | null)
        .filter((s): s is string => Boolean(s));
    },

    async findByCancelToken(token: string) {
      const { data, error } = await db
        .from(TABLE)
        .select('id, calendar_event_id, status')
        .eq('cancel_token', token)
        .limit(1)
        .maybeSingle();

      if (error || !data) return null;
      return {
        id: data.id as string,
        eventId: (data.calendar_event_id as string | null) ?? null,
        status: data.status as 'confirmed' | 'pending' | 'cancelled',
      };
    },

    async markCancelled(id: string) {
      await db.from(TABLE).update({ status: 'cancelled' }).eq('id', id);
    },
  };
}
