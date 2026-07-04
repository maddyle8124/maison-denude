/**
 * Tests for the booking notification email module (D-BOOK-02).
 *
 * Written FIRST (test-driven). The module under test must be pure/injectable:
 * no import-time env access, transport via injected fetch — so these tests run
 * off-Workers and NEVER touch the real Resend API or the real API key.
 */
import { describe, it, expect, vi } from 'vitest';
import {
  buildBookingEmail,
  sendBookingNotification,
  resolveEmailConfig,
  BOOKING_SENDER,
  DEFAULT_NOTIFY_EMAIL,
  type BookingNotification,
} from './email';

const baseBooking: BookingNotification = {
  name: 'Nguyễn Thị Ánh',
  phone: '+84 905 123 456',
  date: '2026-07-15',
  consultationType: 'atelier',
  notes: 'Tư vấn áo dài cưới — cần gấp, cảm ơn ạ!',
};

// ---------------------------------------------------------------------------
// buildBookingEmail
// ---------------------------------------------------------------------------

describe('buildBookingEmail', () => {
  it('returns { from, to, subject, html, text } with the verified sender and configured recipient', () => {
    const email = buildBookingEmail(baseBooking, 'team@example.com');

    expect(email.from).toBe('Maison Denude <contact@maisondenude.com>');
    expect(email.from).toBe(BOOKING_SENDER);
    expect(email.to).toBe('team@example.com');
    expect(typeof email.subject).toBe('string');
    expect(typeof email.html).toBe('string');
    expect(typeof email.text).toBe('string');
  });

  it('defaults the recipient when none is passed', () => {
    const email = buildBookingEmail(baseBooking);
    expect(email.to).toBe(DEFAULT_NOTIFY_EMAIL);
    expect(email.to).toBe('thieuxmaison@gmail.com');
  });

  it('puts the customer name in the subject', () => {
    const email = buildBookingEmail(baseBooking);
    expect(email.subject).toContain('Nguyễn Thị Ánh');
  });

  it('includes name, phone, date, consultation type and notes in both html and text bodies', () => {
    const email = buildBookingEmail(baseBooking);

    for (const body of [email.html, email.text]) {
      expect(body).toContain('Nguyễn Thị Ánh');
      expect(body).toContain('+84 905 123 456');
      expect(body).toContain('2026-07-15');
      expect(body.toLowerCase()).toContain('atelier');
      expect(body).toContain('Tư vấn áo dài cưới — cần gấp, cảm ơn ạ!');
    }
  });

  it('preserves Vietnamese diacritics intact in subject, html and text', () => {
    const booking: BookingNotification = {
      ...baseBooking,
      name: 'Đặng Hoàng Yến Nhi',
      notes: 'Buổi hẹn tại xưởng, ưu tiên buổi chiều thứ Bảy',
    };
    const email = buildBookingEmail(booking);

    expect(email.subject).toContain('Đặng Hoàng Yến Nhi');
    expect(email.html).toContain('Đặng Hoàng Yến Nhi');
    expect(email.text).toContain('Đặng Hoàng Yến Nhi');
    expect(email.html).toContain('Buổi hẹn tại xưởng, ưu tiên buổi chiều thứ Bảy');
    expect(email.text).toContain('Buổi hẹn tại xưởng, ưu tiên buổi chiều thứ Bảy');
  });

  it.each([undefined, null, ''] as const)(
    'renders sensibly when notes is %s (no "undefined"/"null" leaking into bodies)',
    (notes) => {
      const email = buildBookingEmail({ ...baseBooking, notes });
      for (const body of [email.html, email.text]) {
        expect(body).not.toContain('undefined');
        expect(body).not.toContain('null');
        // The other fields still render.
        expect(body).toContain('Nguyễn Thị Ánh');
      }
    },
  );

  it.each(['atelier', 'virtual', 'event'] as const)(
    'renders consultation type "%s" in both bodies',
    (consultationType) => {
      const email = buildBookingEmail({ ...baseBooking, consultationType });
      expect(email.html.toLowerCase()).toContain(consultationType);
      expect(email.text.toLowerCase()).toContain(consultationType);
    },
  );

  it('HTML-escapes user-supplied values in the html body (injection safety)', () => {
    const booking: BookingNotification = {
      ...baseBooking,
      name: '<script>alert("xss")</script>',
      notes: 'Fish & Chips <b>bold</b>',
    };
    const email = buildBookingEmail(booking);

    expect(email.html).not.toContain('<script>');
    expect(email.html).toContain('&lt;script&gt;');
    expect(email.html).not.toContain('<b>bold</b>');
    // & escaped as &amp; in html…
    expect(email.html).toContain('Fish &amp; Chips');
    // …but the text body stays raw.
    expect(email.text).toContain('Fish & Chips');
    expect(email.text).toContain('<script>alert("xss")</script>');
  });

  it('never uses banned brand language ("high end" / "tailor")', () => {
    const email = buildBookingEmail(baseBooking);
    const all = `${email.subject} ${email.html} ${email.text}`.toLowerCase();
    expect(all).not.toContain('high end');
    expect(all).not.toContain('high-end');
    expect(all).not.toContain('tailor');
  });
});

// ---------------------------------------------------------------------------
// resolveEmailConfig
// ---------------------------------------------------------------------------

describe('resolveEmailConfig', () => {
  it('reads RESEND_API_KEY and BOOKING_NOTIFY_EMAIL from the given env', () => {
    const config = resolveEmailConfig({
      RESEND_API_KEY: 're_test_123',
      BOOKING_NOTIFY_EMAIL: 'chi@example.com',
    });
    expect(config).toEqual({ apiKey: 're_test_123', recipient: 'chi@example.com' });
  });

  it('defaults recipient to thieuxmaison@gmail.com when BOOKING_NOTIFY_EMAIL is unset', () => {
    const config = resolveEmailConfig({ RESEND_API_KEY: 're_test_123' });
    expect(config.recipient).toBe('thieuxmaison@gmail.com');
  });
});

// ---------------------------------------------------------------------------
// sendBookingNotification
// ---------------------------------------------------------------------------

function mockFetchResponse(status: number, body: unknown): typeof fetch {
  return vi.fn(async () =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    }),
  ) as unknown as typeof fetch;
}

describe('sendBookingNotification', () => {
  const deps = { apiKey: 're_test_key', recipient: 'team@example.com' };

  it('POSTs the built email to Resend with a Bearer token and resolves { ok: true, id } on 200', async () => {
    const fetchImpl = mockFetchResponse(200, { id: 'email_abc123' });
    const result = await sendBookingNotification(baseBooking, { ...deps, fetchImpl });

    expect(result).toEqual({ ok: true, id: 'email_abc123' });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = (fetchImpl as ReturnType<typeof vi.fn>).mock.calls[0] as [
      string,
      RequestInit,
    ];
    expect(url).toBe('https://api.resend.com/emails');
    expect(init.method).toBe('POST');

    const headers = init.headers as Record<string, string>;
    expect(headers['Authorization']).toBe('Bearer re_test_key');
    expect(headers['Content-Type']).toBe('application/json');

    // Body matches buildBookingEmail output exactly.
    const expected = buildBookingEmail(baseBooking, 'team@example.com');
    expect(JSON.parse(init.body as string)).toEqual({
      from: expected.from,
      to: expected.to,
      subject: expected.subject,
      html: expected.html,
      text: expected.text,
    });
  });

  it.each([400, 401, 422, 500, 503])(
    'resolves { ok: false, error } WITHOUT throwing on Resend HTTP %d',
    async (status) => {
      const fetchImpl = mockFetchResponse(status, { message: 'nope' });
      const result = await sendBookingNotification(baseBooking, { ...deps, fetchImpl });

      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBeTruthy();
        expect(result.error).toContain(String(status));
      }
    },
  );

  it('resolves { ok: false } without throwing when fetch rejects (network error)', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError('network down');
    }) as unknown as typeof fetch;

    await expect(
      sendBookingNotification(baseBooking, { ...deps, fetchImpl }),
    ).resolves.toMatchObject({ ok: false });
  });

  it('resolves { ok: false } and never calls fetch when the API key is missing', async () => {
    const fetchImpl = vi.fn() as unknown as typeof fetch;

    const missing = await sendBookingNotification(baseBooking, {
      apiKey: undefined,
      recipient: 'team@example.com',
      fetchImpl,
    });
    expect(missing.ok).toBe(false);

    const empty = await sendBookingNotification(baseBooking, {
      apiKey: '',
      recipient: 'team@example.com',
      fetchImpl,
    });
    expect(empty.ok).toBe(false);

    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
