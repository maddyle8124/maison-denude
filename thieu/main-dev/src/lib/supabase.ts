import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * The Workers runtime env (from `Astro.locals.runtime.env`). Typed loosely on
 * purpose — only the three Supabase secrets are needed here.
 */
export interface SupabaseEnv {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE: string;
  SUPABASE_ANON: string;
}

/**
 * Service-role client — SERVER-ONLY. Bypasses RLS; never expose to the browser.
 * Used for trusted writes (e.g. booking inserts on the Worker).
 *
 * Invariant 6: this module is the ONLY place a Supabase client is constructed.
 * Always pass `Astro.locals.runtime.env` (NOT process.env / import.meta.env).
 */
export function supabaseAdmin(env: SupabaseEnv): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE, {
    auth: { persistSession: false },
  });
}

/**
 * Anon (public) client — for future read paths (e.g. collections render).
 * Subject to RLS. Not used this round but part of the reusable factory seam.
 */
export function supabasePublic(env: SupabaseEnv): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON, {
    auth: { persistSession: false },
  });
}
