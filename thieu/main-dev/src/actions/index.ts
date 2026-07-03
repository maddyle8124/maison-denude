import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
// Astro v6+ removed `Astro.locals.runtime.env`; the Cloudflare adapter exposes the
// Worker env (secrets + vars) via the `cloudflare:workers` virtual module instead.
import { env } from 'cloudflare:workers';
import { supabaseAdmin, type SupabaseEnv } from '../lib/supabase';
import { resolveEmailConfig, sendBookingNotification, type EmailEnv } from '../lib/email';

export const server = {
  createBooking: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(1),
      phone: z.string().min(6),
      // HTML date input yields 'YYYY-MM-DD'; the `date` column accepts the string.
      date: z.string().min(1),
      consultationType: z.enum(['atelier', 'virtual', 'event']),
      notes: z.string().optional(),
    }),
    handler: async (input) => {
      const { error } = await supabaseAdmin(env as unknown as SupabaseEnv).from('bookings').insert({
        name: input.name,
        phone: input.phone,
        date: input.date,
        consultation_type: input.consultationType,
        notes: input.notes ?? null,
      });

      if (error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not save your booking. Please try again.',
        });
      }

      // Email notification (D-BOOK-02): best-effort AFTER the successful insert.
      // An email failure must never fail the booking — log and return success.
      const emailResult = await sendBookingNotification(
        input,
        resolveEmailConfig(env as unknown as EmailEnv),
      );
      if (!emailResult.ok) {
        console.error('[email] booking notification failed:', emailResult.error);
      }

      return { success: true };
    },
  }),
};
