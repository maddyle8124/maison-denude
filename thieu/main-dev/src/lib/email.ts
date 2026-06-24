/**
 * Booking notification email — DEFERRED SEAM (D-BOOK-01, email half).
 *
 * This effort ships the insert-only half of booking; the email half is sequenced
 * to a later mini-phase (Resend/SMTP → TEAM_EMAIL = thieu.dachill@gmail.com until
 * OQ-001 resolves). This stub exists so the call site can be wired later WITHOUT
 * touching the action's control flow.
 *
 * It is NOT called this round.
 */

/** Shape of a booking notification payload (mirrors the createBooking input). */
export interface BookingNotification {
  name: string;
  phone: string;
  date: string;
  consultationType: 'atelier' | 'virtual' | 'event';
  notes?: string | null;
}

/**
 * No-op stub. Wire transport here in the later email mini-phase; the action will
 * then `await sendBookingNotification(...)` after a successful insert.
 */
export async function sendBookingNotification(
  booking: BookingNotification,
): Promise<void> {
  // Deferred (D-BOOK-01 email half). Intentionally does nothing this round.
  console.info('[email] sendBookingNotification stub (deferred)', booking.name);
}
