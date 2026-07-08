/**
 * Tests for the Google OAuth refresh-token exchange (D-10).
 *
 * Written FIRST (test-driven, D-11). Mirrors email.test.ts: the module is
 * pure/injectable — no import-time env access, transport via injected fetch —
 * so these tests run off-Workers and NEVER touch a real Google endpoint or a
 * real refresh token. No `vi.mock`; we inject `fetchImpl` and assert on
 * `.mock.calls`.
 */
import { describe, it, expect, vi } from 'vitest';
import {
  resolveGoogleAuth,
  getAccessToken,
  type GoogleAuthEnv,
} from './google-auth';

const baseCfg: GoogleAuthEnv = {
  GOOGLE_CLIENT_ID: 'client-id-123.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'secret-abc',
  GOOGLE_REFRESH_TOKEN: '1//refresh-token-xyz',
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
// resolveGoogleAuth
// ---------------------------------------------------------------------------

describe('resolveGoogleAuth', () => {
  it('passes the three OAuth env values straight through', () => {
    const cfg = resolveGoogleAuth({
      GOOGLE_CLIENT_ID: 'a',
      GOOGLE_CLIENT_SECRET: 'b',
      GOOGLE_REFRESH_TOKEN: 'c',
    });
    expect(cfg).toEqual({
      GOOGLE_CLIENT_ID: 'a',
      GOOGLE_CLIENT_SECRET: 'b',
      GOOGLE_REFRESH_TOKEN: 'c',
    });
  });
});

// ---------------------------------------------------------------------------
// getAccessToken
// ---------------------------------------------------------------------------

describe('getAccessToken', () => {
  it('POSTs form-urlencoded to the Google token endpoint with the refresh-token grant', async () => {
    const fetchImpl = mockFetchResponse(200, {
      access_token: 'ya29.access-token',
      expires_in: 3599,
      token_type: 'Bearer',
    });

    const result = await getAccessToken(baseCfg, fetchImpl);
    expect(result).toEqual({
      ok: true,
      accessToken: 'ya29.access-token',
      expiresIn: 3599,
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = (fetchImpl as ReturnType<typeof vi.fn>).mock.calls[0] as [
      string,
      RequestInit,
    ];
    expect(url).toBe('https://oauth2.googleapis.com/token');
    expect(init.method).toBe('POST');

    const headers = init.headers as Record<string, string>;
    expect(headers['Content-Type']).toBe('application/x-www-form-urlencoded');

    // Body is form-encoded, NOT JSON.
    const body = init.body as string;
    expect(typeof body).toBe('string');
    const params = new URLSearchParams(body);
    expect(params.get('grant_type')).toBe('refresh_token');
    expect(params.get('client_id')).toBe(baseCfg.GOOGLE_CLIENT_ID);
    expect(params.get('client_secret')).toBe(baseCfg.GOOGLE_CLIENT_SECRET);
    expect(params.get('refresh_token')).toBe(baseCfg.GOOGLE_REFRESH_TOKEN);
    // Definitely not JSON.
    expect(body).not.toContain('{');
  });

  it('resolves { ok:false } WITHOUT throwing on 400 invalid_grant (revoked/expired refresh token)', async () => {
    const fetchImpl = mockFetchResponse(400, {
      error: 'invalid_grant',
      error_description: 'Token has been expired or revoked.',
    });

    const result = await getAccessToken(baseCfg, fetchImpl);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeTruthy();
      expect(result.error).toContain('400');
      expect(result.error).toContain('invalid_grant');
    }
  });

  it.each([401, 403, 429, 500, 503])(
    'resolves { ok:false } WITHOUT throwing on non-2xx HTTP %d',
    async (status) => {
      const fetchImpl = mockFetchResponse(status, { error: 'nope' });
      const result = await getAccessToken(baseCfg, fetchImpl);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.error).toBeTruthy();
        expect(result.error).toContain(String(status));
      }
    },
  );

  it('resolves { ok:false } without throwing when fetch rejects (network error)', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError('network down');
    }) as unknown as typeof fetch;

    await expect(getAccessToken(baseCfg, fetchImpl)).resolves.toMatchObject({
      ok: false,
    });
  });

  it.each([
    { GOOGLE_CLIENT_ID: '', GOOGLE_CLIENT_SECRET: 'b', GOOGLE_REFRESH_TOKEN: 'c' },
    { GOOGLE_CLIENT_ID: 'a', GOOGLE_CLIENT_SECRET: '', GOOGLE_REFRESH_TOKEN: 'c' },
    { GOOGLE_CLIENT_ID: 'a', GOOGLE_CLIENT_SECRET: 'b', GOOGLE_REFRESH_TOKEN: '' },
  ])(
    'resolves { ok:false } and never calls fetch when a config value is missing (%o)',
    async (cfg) => {
      const fetchImpl = vi.fn() as unknown as typeof fetch;
      const result = await getAccessToken(cfg as GoogleAuthEnv, fetchImpl);
      expect(result.ok).toBe(false);
      expect(fetchImpl).not.toHaveBeenCalled();
    },
  );

  it('handles undefined config values as missing (never calls fetch)', async () => {
    const fetchImpl = vi.fn() as unknown as typeof fetch;
    const result = await getAccessToken(
      {} as unknown as GoogleAuthEnv,
      fetchImpl,
    );
    expect(result.ok).toBe(false);
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
