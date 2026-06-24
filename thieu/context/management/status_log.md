# Status Log — Maison Dénudé Frontend

> Newest on top. History of what happened. Current state lives in `CONTINUITY.md`; decisions in `../frontend/decisions.md` (D-rows) + `../decision.md` (MD-rows).

---

## 2026-06-24 — Phase 5 COMPLETE — pm PASSED (live booking insert verified)

- **Code built + pm-verified PASS:** `src/lib/supabase.ts` (supabaseAdmin + supabasePublic factories — invariant 6 held, createClient only here), `src/lib/email.ts` (sendBookingNotification no-op stub, NOT called — D-BOOK-01 email half deferred), `src/actions/index.ts` (createBooking action: accept:'form', astro:schema zod input, supabaseAdmin insert, camelCase→snake_case field mapping, ActionError INTERNAL_SERVER_ERROR on failure), `src/components/ui/BookingForm.astro` (PE form, no-JS, actions.createBooking, success/error states), `src/pages/booking.astro` (prerender=true, Base + Nav). 9 form tokens added to tokens.css.
- **Supabase `bookings` table:** created via Supabase MCP `apply_migration` (NOT the pooler — pooler returned "tenant not found"; MCP apply_migration worked). Schema per sitemap/booking.md spec; RLS on.
- **Worker secrets:** SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY set + bound — verified via `wrangler secret list`.
- **Deployed to:** https://main-dev.thieuxmaison.workers.dev.
- **BUG FOUND + FIXED during live gate:** action used `Astro.locals.runtime.env` which was removed in Astro v6+ (project is Astro 7 / adapter v14) → 500 "Astro.locals.runtime.env has been removed". Fix: read Worker env via `import { env } from 'cloudflare:workers'` in `src/actions/index.ts` (handler simplified to `(input)` signature with no second arg). This is the canonical env-access pattern for this adapter — reusable lesson alongside the Phase 4 build-time-vs-runtime lesson.
- **LIVE GATE PASSED:** same-origin FormData POST to `/_actions/createBooking` → `{"success":1}`; row confirmed in Supabase via MCP (all fields correct, created_at auto-set); test row deleted (table back to 0 rows).
- **Browser note:** page is served at `/booking/` (trailing slash; `/booking` 307-redirects). Astro CSRF (checkOrigin) blocks cross-origin curl without an Origin header — real browser submits are fine.

## 2026-06-24 — Phase 5 (booking, insert-only) BUILT — awaiting pm verify
- Built per sitemap/booking.md: `src/lib/supabase.ts` (supabaseAdmin + supabasePublic factories — invariant 6, the only place createClient lives), `src/lib/email.ts` (sendBookingNotification no-op stub, NOT called — D-BOOK-01 email half deferred), `src/actions/index.ts` (createBooking action: accept:'form', astro:schema zod input, supabaseAdmin insert, camelCase consultationType → snake_case consultation_type, ActionError INTERNAL_SERVER_ERROR on failure), `src/components/ui/BookingForm.astro` (PE form, no-JS, actions.createBooking, getActionResult success/error states), `src/pages/booking.astro` (prerender=true, Base + Nav).
- Astro 7.0.2 auto-enables actions via src/actions/index.ts `server` export — NO config flag added (verified).
- env read from `context.locals.runtime.env` (Workers), not process.env.
- Build: `npm run build` exit 0; both /booking and / prerendered. Invariant 6 grep: createClient only in lib/supabase.ts. No hardcoded design literals in new .astro <style> blocks.
- Tokens ADDED to tokens.css (form fields): --form-max-width, --form-field-gap, --form-label-gap, --field-padding-y, --field-border, --field-border-focus, --text-field, --text-label, --ls-label.
- Deviation note: BookingForm has one UA-pseudo-element rule `::-webkit-calendar-picker-indicator { filter: invert(1) }` to make the native date picker icon visible on black bg — a browser-control normalization, not a brand design value (no token applies).
- NOT done (orchestrator-owned): deploy, Worker secrets, live-submit insert gate.
- Next: orchestrator routes through @pm verify, then deploy + live submit.

## 2026-06-24 — Layout/typography foundational fix — pm PASSED
- (a) **Font (FQ-I-01 RESOLVED):** ABChanel Corpo woff2 files located in `context/reference/`; wired via `@font-face` in `global.css` (Light→200/300, Regular→400, `font-display:swap`); preload link added in `Base.astro`; files copied to `public/fonts/`. Font served HTTP 200 and preload confirmed live at https://main-dev.thieuxmaison.workers.dev.
- (b) **Image-distortion fix:** Root cause identified as astro:assets injecting intrinsic `width`/`height` attributes conflicting with `CSS width:100%` + no height reset. Fixed foundationally in `SmartImage.astro` via a `fit: cover|contain` contract. Grid cell containers use `aspect-ratio:3/4`; feature-strip container uses `contain`. Each container owns its box; no global override.
- Build clean (exit 0), deployed successfully.
- Note: 4 images still render `_placeholder` — content-config keys not pointing at real files; non-blocking, intended fallback behavior.

## 2026-06-24 — Phase 4 COMPLETE — pm PASSED (tracking confirmed live)
- D-DEPLOY-03 fixed: account_id `73fb68b2979b1b17abbafc4eccdbc354` (Thieuxmaison) pinned in wrangler.jsonc.
- Deployed to https://main-dev.thieuxmaison.workers.dev — exit 0.
- GTM fix: PUBLIC_GTM_ID must be a build-time var (prerendered page), not a Worker secret. Added to .env + wrangler.jsonc [vars]. Rebuilt + redeployed. GTM confirmed working by user.
- Clarity auto-connects via GTM (no separate snippet needed).
- GA4 + Clarity IDs pending PT-02/PT-03 — add to .env + wrangler.jsonc vars when ready, rebuild + redeploy.
- Stray Worker in nguyenthaithieu account: delete manually via CF dashboard (wrangler CLI can't cross-account delete).
- Next: Phase 5 — booking (insert-only).

## 2026-06-24 — Phase 3 COMPLETE — pm PASSED
- Content layer + sections in place: types.ts (Section union), landing.ts (9 rows — 8 sections + footer), nav.ts, SectionRenderer.astro, Hero/PhotoRow/FeatureCollection/VideoSection/Footer, Nav/Logo/SocialIcons, index.astro (prerender=true).
- npm build: exit 0. All 6 change-tolerance invariants PASS.
- Acceptable deviations: 24px overlay nav font-size (no token, spec names it explicitly), 64px play button (structural), 80px footer inner padding (mirrors --gap-section, no alias token yet).
- Next: Phase 4 — deploy to thieuxmaison CF account, fix D-DEPLOY-03, verify GTM/GA4/Clarity live.

## 2026-06-24 — Phase 2 COMPLETE — pm PASSED
- Foundation layer in place: astro.config.mjs (output server + imageService compile), tokens.css, global.css, Base.astro (GTM+Clarity conditional injection, CSS via frontmatter import), lib/assets.ts (ImageKey registry + placeholder fallback), SmartImage.astro.
- @supabase/supabase-js installed (^2.108.2).
- npm build: exit 0. Fix-loop: FAIL (broken CSS link) → fixed (frontmatter import) → PASS.
- Next: Phase 3 — Content layer + section components (general agent).

## 2026-06-24 — Phase 1 COMPLETE — pm PASSED
- Asset pipeline done: 30 files in `main-dev/src/assets/landing/`, logos in `public/`.
- 3 HEIC files converted to JPG via magick (kol-placeholder-1/2/3.jpg).
- 1 duplicate skipped per spec (Section 2 hero duplicate).
- Next: Phase 2 — Foundation (general agent).

## 2026-06-24 — Phase 0 COMPLETE — pm PASSED
- pm gate: first pass FAIL (3 items) → fixed → re-verify PASS.
- Fixes: created `management/task.md` (phase tracker); clarified `sitemap/booking.md` email note as a phase-deferral (not a D-BOOK-01 override); updated `CONTINUITY.md` to Phase 0 done + refreshed "Last pm-PASSED state".
- Harness now in place: `frontend/decisions.md` (legal), `frontend/sitemap/{_index,landing,booking}.md` (buildable specs), `management/{CONTINUITY,status_log,task}.md`.
- Used existing `context/management/` (not a new frontend/management) per user correction.
- **Next:** user is compacting. On resume → read `management/CONTINUITY.md` + `sitemap/landing.md` + `sitemap/booking.md` + `frontend/decisions.md`, then spawn bull for Phase 1.

## 2026-06-24 — Phase 0 started: doc reorganization
- Brainstorm + plan session completed. Plan approved: `C:\Users\Thieu\.claude\plans\dynamic-snacking-pond.md`.
- Logged binding decisions D-DEPLOY-01/02/03, D-SCOPE-01/02, D-DOMAIN-01, D-DOC-01, D-ASSET-01, D-BOOK-01, D-ARCH-01 in `decisions.md`.
- Renamed `decisions-log.md` → `decisions.md` (legal source of truth).
- Created `management/{CONTINUITY,status_log,task}.md` and `sitemap/{_index,landing,booking}.md`.
- Discovered: `logo_white.svg` already exists; CF adapter defaults to SSR (landing must opt into prerender); 3 HEIC + 18 spaced + 2 paren filenames need cleanup.
