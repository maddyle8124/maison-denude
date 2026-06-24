# CONTINUITY — Maison Dénudé Frontend (Preview + Booking)

> **Read this first after any compaction or new session.** This is the resume anchor — current state only, not history (see `status_log.md` beside this file) and not decisions (see `../frontend/decisions.md` for frontend D-rows, `../decision.md` for master MD-rows).
>
> **Doc map:** `context/management/` = plan.md, open_questions.md, CONTINUITY.md, status_log.md (project-wide). `context/frontend/` = frontend specs + decisions.md (D-rows). `context/decision.md` = master legal decisions (MD-rows).

_Last refreshed: 2026-06-24 (Phase 5 COMPLETE pm-PASSED; live booking insert verified end-to-end)_

---

## Now-line
Building a **deployed landing-page preview** for Maison Dénudé whose headline purpose is to **validate GTM/GA4/Clarity tracking on real traffic**, matching the brand's editorial design, plus an insert-only booking form. Multi-session, spec-driven. Approved plan: `C:\Users\Thieu\.claude\plans\dynamic-snacking-pond.md`.

## Source-of-truth paths (for worker spawns)
- **Legal truth:** `context/frontend/decisions.md` (if anything disagrees, decisions win)
- **Per-page specs:** `context/frontend/sitemap/{_index,landing,booking}.md`
- **Conventions:** `context/frontend/design-system.md`, `context/frontend/tracking-setup.md`
- **Architecture:** in the approved plan file + `decisions.md` D-ARCH-01
- **App root:** `C:\maison\thieu\main-dev\` (Astro v7 + @astrojs/cloudflare, Workers)
- **Assets (raw):** `context/reference/maison_denude_assets/landing_page/` + `asset-rename-list.md`
- **Logos:** `context/reference/maison_denude_assets/{logo_black,logo_white}.svg` (white already exists)

## Phase status (live tracker = the harness Task list / TaskList tool)
| Phase | What | Owner | State |
|---|---|---|---|
| 0 | Doc reorg → harness layout | orchestrator | ✅ done (pm-PASSED) |
| 1 | Asset pipeline (HEIC→JPG, rename) | bull | ✅ done (pm-PASSED) |
| 2 | Foundation (config, tokens, Base, tracking) | general | ✅ done (pm-PASSED) |
| 3 | Content layer + sections | general | ✅ done (pm-PASSED) |
| 4 | Deploy (thieuxmaison acct) + verify tracking | orchestrator | ✅ done (GTM confirmed live) |
| 5 | Booking (insert-only) | general | ✅ done (pm-PASSED) |

## Last pm-PASSED state
**Phase 5 — COMPLETE (2026-06-24).** Live booking insert verified end-to-end: FormData POST to `/_actions/createBooking` → `{"success":1}`; row confirmed in Supabase via MCP; test row deleted. Key lessons: (1) Phase 4 lesson — PUBLIC_* vars must be in .env + wrangler.jsonc [vars] for prerendered pages (Worker secrets are runtime-only, invisible at build time). (2) Phase 5 lesson — `Astro.locals.runtime.env` was removed in Astro v6+; canonical env-access for Astro 7 / @astrojs/cloudflare adapter v14 is `import { env } from 'cloudflare:workers'` in server-side modules.

## Next 1–3 actions
1. **GA4 + Clarity IDs (PT-02/PT-03):** When IDs are ready, add PUBLIC_GA4_ID + PUBLIC_CLARITY_ID to .env + wrangler.jsonc [vars], rebuild + redeploy (same build-time-var pattern as GTM fix).
2. **Booking email mini-phase:** Wire `lib/email.ts` sendBookingNotification (currently no-op stub) when email provider is chosen — seam is in place per D-BOOK-01 deferred half.
3. **Cleanup:** Delete stray `main-dev` Worker in `nguyenthaithieu@gmail.com` CF account via Cloudflare dashboard (wrangler CLI cannot cross-account delete).
- Non-blocking content task: 4 landing ImageKeys still resolve to `_placeholder` — content-config keys not pointing at real files; swap in via config when assets are ready.

## Active blockers / watch-items
- **D-DEPLOY-03:** Worker currently targets the WRONG CF account. At Phase 4: `wrangler whoami` → pin thieuxmaison `account_id` in `wrangler.jsonc` → deploy → delete stray Worker. Same login, switch account.
- Non-blocking open deps: video URLs (FQ-04), clean KOL/Sable images (PT-01/03), nav-item meanings (FQ-01..03). All swap in via config — never block the build.

## Change-tolerance invariants (every pm gate checks these)
1. No hardcoded content in markup — all from `content/*`.
2. No hardcoded design literals in `<style>` — all `var(--token)`.
3. No raw asset paths in components — all via `ImageKey`.
4. Every `src/pages/**` declares prerender intent.
5. New section type = union + component + registry line; zero edits to existing sections.
6. Supabase access only through `lib/supabase.ts`.
