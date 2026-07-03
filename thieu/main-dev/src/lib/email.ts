/**
 * Booking notification email — Resend transport (D-BOOK-02, completes the
 * email half of D-BOOK-01).
 *
 * Design constraints (test-driven, see email.test.ts):
 * - ZERO import-time env access — config is resolved by the caller via
 *   `resolveEmailConfig(env)` and injected, so the module is testable
 *   off-Workers and no test can ever touch the real API key.
 * - Transport = Resend REST API via `fetch` (Workers-native, no SDK).
 * - `sendBookingNotification` NEVER throws: booking insert is the primary
 *   operation; email is best-effort (insert first, email best-effort).
 */

/** Shape of a booking notification payload (mirrors the createBooking input). */
export interface BookingNotification {
  name: string;
  phone: string;
  date: string;
  consultationType: 'atelier' | 'virtual' | 'event';
  notes?: string | null;
}

/** A fully-built email, ready to POST to Resend. */
export interface BookingEmail {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
}

/** Env the email feature reads (resolved by the caller, never at import time). */
export interface EmailEnv {
  RESEND_API_KEY?: string;
  BOOKING_NOTIFY_EMAIL?: string;
}

/** Injectable deps for the sender — makes the transport fully testable. */
export interface SendDeps {
  apiKey: string | undefined;
  recipient: string;
  fetchImpl?: typeof fetch;
}

export type SendResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

/** Sender identity — apex domain maisondenude.com is the one verified in Resend
 * (checked via GET /domains 2026-07-03; a contact. subdomain is NOT registered there). */
export const BOOKING_SENDER = 'Maison Dénudé <contact@maisondenude.com>';

/** Fallback recipient until OQ-001 (team inbox) is answered. */
export const DEFAULT_NOTIFY_EMAIL = 'thieuxmaison@gmail.com';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/** Human labels for the consultation type enum (content, not schema). */
const CONSULTATION_LABELS: Record<BookingNotification['consultationType'], string> = {
  atelier: 'Atelier visit',
  virtual: 'Virtual consultation',
  event: 'Event consultation',
};

/** Resolve email config from the Worker env. Pure — call it with `env`, never import env here. */
export function resolveEmailConfig(env: EmailEnv): {
  apiKey: string | undefined;
  recipient: string;
} {
  return {
    apiKey: env.RESEND_API_KEY,
    recipient: env.BOOKING_NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL,
  };
}

/** Minimal HTML-escaping for user-supplied values (injection safety). */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Pure builder: booking → complete email payload. No env, no I/O.
 * On-brand but simple: plain readable HTML, booking details table, no external assets.
 */
export function buildBookingEmail(
  booking: BookingNotification,
  recipient: string = DEFAULT_NOTIFY_EMAIL,
): BookingEmail {
  const consultation = CONSULTATION_LABELS[booking.consultationType];
  const notes = booking.notes?.trim() ? booking.notes.trim() : '—';

  const rows: Array<[label: string, value: string]> = [
    ['Name', booking.name],
    ['Phone / Zalo / WhatsApp', booking.phone],
    ['Preferred date', booking.date],
    ['Consultation', consultation],
    ['Notes', notes],
  ];

  const subject = `New booking request — ${booking.name}`;

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#777777;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #e5e5e5;color:#111111;font-size:14px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join('');

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f7f7f7;font-family:Georgia,'Times New Roman',serif;">
    <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
      <div style="background-color:#000000;color:#ffffff;text-align:center;padding:24px 16px;letter-spacing:0.35em;font-size:16px;">
        MAISON D&Eacute;NUD&Eacute;
      </div>
      <div style="background-color:#ffffff;padding:24px 0;">
        <p style="margin:0 16px 16px;color:#111111;font-size:14px;">
          A new booking request has arrived via maisondenude.com.
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
          ${htmlRows}
        </table>
      </div>
      <p style="text-align:center;color:#999999;font-size:11px;letter-spacing:0.08em;margin-top:16px;">
        Maison D&eacute;nud&eacute; — booking notification
      </p>
    </div>
  </body>
</html>`;

  const text = [
    'MAISON DÉNUDÉ — new booking request',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Sent automatically from maisondenude.com.',
  ].join('\n');

  return { from: BOOKING_SENDER, to: recipient, subject, html, text };
}

/**
 * Send the booking notification via Resend's REST API.
 *
 * D-BOOK-01 seam: the action calls this after a successful insert. It NEVER
 * throws — any failure resolves `{ ok: false, error }` so the booking flow
 * cannot be broken by email problems.
 */
export async function sendBookingNotification(
  booking: BookingNotification,
  deps: SendDeps,
): Promise<SendResult> {
  const { apiKey, recipient, fetchImpl = fetch } = deps;

  if (!apiKey) {
    return { ok: false, error: 'RESEND_API_KEY is not configured; email skipped.' };
  }

  const email = buildBookingEmail(booking, recipient);

  try {
    const response = await fetchImpl(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      return { ok: false, error: `Resend responded ${response.status}: ${detail}` };
    }

    const data = (await response.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id };
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    return { ok: false, error: `Email send failed: ${message}` };
  }
}
