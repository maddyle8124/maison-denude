/**
 * Google OAuth 2.0 refresh-token → access-token exchange (D-10).
 *
 * Design constraints (test-driven, see google-auth.test.ts; mirrors email.ts):
 * - ZERO import-time env access — config is resolved by the caller via
 *   `resolveGoogleAuth(env)` and injected, so the module is testable off-Workers
 *   and no test can ever touch the real refresh token.
 * - Transport = a plain form-urlencoded POST via `fetch` (Workers-native, no
 *   SDK — no `googleapis`/`google-auth-library`/`jose`).
 * - `getAccessToken` NEVER throws across the I/O boundary: every failure
 *   (missing config, non-2xx, network reject) resolves a discriminated
 *   `{ ok:false, error }`.
 *
 * Per D-10 the calendar OWNER completed a one-time OAuth consent; we hold their
 * refresh token as a Worker secret and exchange it for a short-lived access
 * token per request. A 400 `invalid_grant` here means the refresh token was
 * revoked or expired — the important, loud failure mode.
 */

/** The three OAuth values the exchange needs (resolved by the caller). */
export interface GoogleAuthEnv {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_REFRESH_TOKEN: string;
}

export type TokenResult =
  | { ok: true; accessToken: string; expiresIn: number }
  | { ok: false; error: string };

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';

/**
 * Resolve OAuth config from the Worker env. Pure passthrough — call it with
 * `env`, never import env here.
 */
export function resolveGoogleAuth(env: GoogleAuthEnv): GoogleAuthEnv {
  return {
    GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: env.GOOGLE_REFRESH_TOKEN,
  };
}

/**
 * Exchange the owner's refresh token for a short-lived access token.
 *
 * Never throws: missing config short-circuits (fetch is NOT called); non-2xx
 * and network rejects resolve `{ ok:false, error }` with the status included.
 */
export async function getAccessToken(
  cfg: GoogleAuthEnv,
  fetchImpl: typeof fetch = fetch,
): Promise<TokenResult> {
  const clientId = cfg?.GOOGLE_CLIENT_ID;
  const clientSecret = cfg?.GOOGLE_CLIENT_SECRET;
  const refreshToken = cfg?.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return {
      ok: false,
      error: 'Google OAuth config is incomplete; token exchange skipped.',
    };
  }

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  });

  try {
    const response = await fetchImpl(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      return {
        ok: false,
        error: `Google token endpoint responded ${response.status}: ${detail}`,
      };
    }

    const data = (await response.json().catch(() => ({}))) as {
      access_token?: string;
      expires_in?: number;
    };

    if (!data.access_token) {
      return {
        ok: false,
        error: `Google token endpoint returned no access_token (status ${response.status}).`,
      };
    }

    return {
      ok: true,
      accessToken: data.access_token,
      expiresIn: typeof data.expires_in === 'number' ? data.expires_in : 0,
    };
  } catch (cause) {
    const message = cause instanceof Error ? cause.message : String(cause);
    return { ok: false, error: `Google token exchange failed: ${message}` };
  }
}
