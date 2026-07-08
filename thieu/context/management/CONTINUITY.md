# CONTINUITY — Maison Denude Frontend (Preview + Booking)

> **Read this first after any compaction or new session.** This is the resume anchor — current state only, not history (see `status_log.md` beside this file) and not decisions (see `../frontend/decisions.md` for frontend D-rows, `../decision.md` for master MD-rows).
>
> **Doc map:** `context/management/` = plan.md, open_questions.md, CONTINUITY.md, status_log.md (project-wide). `context/frontend/` = frontend specs + decisions.md (D-rows). `context/decision.md` = master legal decisions (MD-rows).

_Last refreshed: 2026-07-08 (Google Calendar self-serve booking SHIPPED + live; then FIXED the "Confirm does nothing" dead-click — slot selection is now required-and-visible. Commit `9995e6c`, deploy `55a3d5da`, live-verified via Playwright on prod. Working tree clean, git == prod. Compaction-safe.)_

---

## Now-line
**DONE & LIVE (2026-07-08): Google Calendar self-serve booking + full-English month-calendar UI shipped to prod AND the "Confirm booking does nothing" dead-click is fixed.** `/booking` is instant self-serve slot booking → atomic claim → confirmed Google Calendar event + Meet link (Online) + invites → tokened cancel. Nothing in flight; working tree clean, git == prod. Only two OPTIONAL deferred items remain (see below).

**Dead-click fix (commit `9995e6c`, deploy `55a3d5da`):** ROOT CAUSE — the backend always worked (Playwright proved a real booking + Meet link), but the Confirm button sits at the bottom of a long form while the "Please choose a time above." validation error rendered only in the top-of-form banner, off-screen. A user who filled the fields but never picked a time slot clicked Confirm, saw the click animation, and nothing visible happened → "the button is broken." FIX in `BookingForm.astro`: (1) submit button is **disabled until a slot is chosen**, labelled "Choose a time to confirm" → "Confirm booking" — a dead click is now structurally impossible; (2) a **selected-slot summary** ("Selected — Fri 10 July, 12:00 (Saigon time)") renders right above the button; (3) validation/errors now also render **inline above the button + scrollIntoView** so a blocked submit is never off-screen. Verified end-to-end on prod. **Lesson: a bottom-of-form submit must never surface its validation error only at the top.**

**Current shipped state (all committed + deployed):**
- **Latest commit:** `262fb8c` on `main` (pushed to github.com/maddyle8124/maison-denude). Working tree clean, `main` in sync with origin (0/0).
- **Prod deploy:** worker `maisondenude-web` on the **thieuxmaison** Cloudflare account (`73fb68b2979b1b17abbafc4eccdbc354`) — version `f3e78b7c`, serving `booking.Cekk6dm2.css` (matches local build). Live domain maisondenude.com is on the thieuxmaison account (**D-BOOK-INFRA-01** — `wrangler.jsonc account_id` fixed from the wrong nguyenthaithieu id `ecb2e6bb…`).
- **Prod secrets:** all 11 set on the thieuxmaison worker via `wrangler secret put` (SUPABASE_*/RESEND_*/GOOGLE_CLIENT_ID/SECRET/REFRESH_TOKEN/GOOGLE_CALENDAR_ID/GCAL_OWNER_EMAIL + **GCAL_SEND_UPDATES=all** for prod so invites actually email). Local `.dev.vars` keeps `GCAL_SEND_UPDATES=none` (safe default).
- **Live-verified on maisondenude.com:** new month-calendar full-English page renders; getAvailability returns real slots (live Google free/busy); full prod e2e booking → real Meet link → cancel → slot freed; calendar clean.

**Key decisions locked this session (in `context/frontend/sitemap/booking-calendar.md`):**
- **D-BOOK-UI-01** — booking PAGE UI is full ENGLISH (superseded the bilingual D-9 for the page only; the Google *invite* body in calendar.ts may stay bilingual).
- **D-BOOK-UI-02** — slot picker = month-calendar grid ("Approach B"): 7-col Mon-first, available days = hairline ring + clickable, empty days dimmed+disabled, `‹ ›` month nav over the 60-day horizon, times revealed in a side column on date-select. Monochrome only (design-system.md:68 forbids accent colours). Selected = solid fill (disc for days, filled box + ✓ for times).
- **D-BOOK-INFRA-01** — worker + domain live on thieuxmaison (not nguyenthaithieu).

**⚠ CRITICAL LESSON — Astro scoped styles + JS-created elements.** The calendar cells (`.booking__cal-cell`) and time slots (`.booking__time`) are built in the client `<script>` via `document.createElement`, so they NEVER get Astro's `data-astro-cid-*` scoping attribute. A plain scoped rule `.booking__time[data-astro-cid-…]` matches ZERO of them → they render as unstyled default boxes. This caused ~an hour of "your edits do nothing" while the served CSS always looked correct. FIX (commit `262fb8c`): wrap dynamic-element selectors in `.booking :global(.booking__time)` so the scope sits on the templated parent and the child selector is unqualified. **Any future JS-injected element needs the same `:global()` treatment.**

**Resolved earlier this session (context, no action needed):** invites DO arrive (delay only; the owner never gets an invite to its own event — expected); the `Ch? �nh` typo was Git-Bash curl mangling non-ASCII args, NOT an app bug (real browser form is UTF-8-clean — never use Git Bash curl for non-ASCII test data); branded Resend email DECLINED by user (Google invite is enough); all test events cleaned off the calendar.

**REMAINING — both OPTIONAL, deferred, not blocking:**
1. Promote spec DRAFT → formal **D-BOOK-04** in decisions.md + document the OAuth re-mint runbook (refresh token expires if the consent screen ever leaves "In production") + the residual free/busy-vs-Google-direct-booking double-book risk.
2. ⚠ **SECURITY:** the OAuth client_secret (`GOCSPX-…`) + refresh_token were pasted in the chat transcript — rotate the client secret (Google Cloud → Credentials → reset) + re-mint the refresh token, then update the Worker secret. Recommended post-launch.
- Earlier open Qs still pending client: OQ-CAL-01 (durations), OQ-CAL-07 (keep Resend team email).

**Test/build gotchas to remember:** `astro dev` / `npm run dev` does NOT load `.dev.vars` (→ credentialed fetches fail with `fetch failed`); for a working local server do `npm run build` then `npx wrangler dev` (wrangler dev does NOT auto-rebuild). Astro form-actions enforce an Origin CSRF check; action responses are devalue-serialized (index-map array). Cloudflare edge caches the booking HTML briefly (`CF-Cache-Status: HIT`) — bust with a query string when verifying a fresh deploy.

**Feature internals (all committed, 135/135 tests green, astro check 0/0):** `src/lib/{slots,availability,google-auth,calendar,booking-flow,booking-store}.ts` (+ `.test.ts` for all but store), `src/actions/index.ts` (getAvailability / createBooking / cancelBooking), `src/components/ui/BookingForm.astro` (month-calendar picker, English), `src/content/booking.ts` (flat English copy), `src/pages/booking/cancel.astro`. DB migration `booking_calendar_slots` applied to prod Supabase (atomic partial unique index `bookings_slot_start_live_uidx` on (slot_start) WHERE status IN ('confirmed','pending')). OAuth minted under thieuxmaison@gmail.com; Google Cloud project `maison-denude`; cred file (git-ignored) `main-dev/env/maison-denude-booking.json`.

**Uncommitted working tree = the ENTIRE feature** (all new libs + tests, actions, form, content, cancel page, email.ts/test enum migration, package.json +@astrojs/check, .gitignore /env, all context docs). Migration is already on prod DB but NO CODE is committed or deployed — live site still shows the OLD booking form. Task tracker = harness TaskList #1–5 (1–4 completed, 5 in_progress).

---

_Prior state (still true) below._

Site **live on maisondenude.com** with traffic, all tracking verified. Latest deployed version **`360c16fb-6234-457d-8633-0d82e6a05d48`** on Worker `maisondenude-web`, pm-PASSED 2026-07-03. This block fixed the real root cause of "slow media": `astro.config.mjs` had a manual `image.service.entrypoint` pointing at a module that doesn't exist in Astro 7, so images silently shipped unoptimized (one 18MB JPEG live). Fixed via `adapter: cloudflare({ imageService: 'compile' })` (D-ARCH-02); confirmed that specific 18MB source now emits webp variants down to ~336kB max. All 5 pages declare `prerender = true` (booking flipped back to `true`; its form now submits client-side via `astro:actions` to the always-server-rendered `/_actions/*` endpoint, never a raw page POST). Favicon set replaced from the client-supplied mark (D-BRAND-02); hero logo resized to 70% width on desktop (D-HERO-01). Tests 23/23 green, build clean, live booking flow re-verified end to end (Playwright submit → THANK YOU → Supabase row → deleted; email fired). **Prior state (still true):** P6 final QA/deploy, the D-BOOK-03 booking redesign, D-NAV-02 nav/`/about` rebuild, and the earlier critical booking-submission-loss bug fix are all done and were live-verified in previous blocks (see status_log for each). **Committed + pushed 2026-07-03:** all session work is in git as `d5be141` on `main` (pushed to github.com/maddyle8124/maison-denude) — working tree clean except this doc refresh. Git and production are in sync at deploy `360c16fb`.

## Source-of-truth paths (for worker spawns)
- **Legal truth:** `context/frontend/decisions.md` (if anything disagrees, decisions win)
- **Per-page specs:** `context/frontend/sitemap/{_index,landing,booking,collections}.md`
- **Conventions:** `context/frontend/design-system.md`, `context/frontend/tracking-setup.md`
- **Architecture:** in the approved plan file + `decisions.md` D-ARCH-01
- **App root:** `C:\maison\thieu\main-dev\` (Astro v7 + @astrojs/cloudflare, Workers; live Worker name = `maisondenude-web`)
- **Assets (raw):** `context/reference/maison_denude_assets/landing_page/` + `asset-rename-list.md`
- **Logos:** `context/reference/maison_denude_assets/{logo_black,logo_white}.svg` (white already exists)
- **SEO:** `context/SEO/03_entity_mentions.md` (entity-claiming research feeding JSON-LD)

## Phase status (live tracker = the harness Task list / TaskList tool)
| Phase | What | Owner | State |
|---|---|---|---|
| 0 | Doc reorg → harness layout | orchestrator | done (pm-PASSED) |
| 1 | Asset pipeline (HEIC→JPG, rename) | bull | done (pm-PASSED) |
| 2 | Foundation (config, tokens, Base, tracking) | general | done (pm-PASSED) |
| 3 | Content layer + sections | general | done (pm-PASSED) |
| 4 | Deploy (thieuxmaison acct) + verify tracking | orchestrator | done (GTM confirmed live) |
| 5 | Booking (insert-only) | general | done (pm-PASSED) |
| 6 | Booking email via Resend (D-BOOK-02, TDD) | general | done (pm-PASSED 2026-07-03) |
| 7 | `/collections` static page from IG export (D-SCOPE-03) | general | done (pm-PASSED 2026-07-03) |
| 8 | SEO foundation + entity-claiming JSON-LD (D-SEO-01) | general | done (pm-PASSED 2026-07-03) |
| 9 | P6 — final QA + production deploy + live smoke test | orchestrator | **done** — deployed + live-verified 2026-07-03 |
| 10 | Booking page UX/UI redesign (D-BOOK-03) | orchestrator | ✅ done (deployed + live-verified 2026-07-03) |
| 11 | Static-first architecture fix + favicon + hero logo (D-ARCH-02/D-HERO-01/D-BRAND-02) | orchestrator | ✅ done (pm-PASSED, deployed `360c16fb` 2026-07-03) |

## Last pm-PASSED state
**Static-first architecture + favicon + hero logo (2026-07-03), pm-VERIFIED PASS (artifacts re-inspected, tests + build re-run by pm).** Root cause fixed: bogus `image.service.entrypoint` in `astro.config.mjs` (nonexistent module in Astro 7 → silent passthrough → unoptimized originals shipped, incl. an 18MB JPEG) replaced by `adapter: cloudflare({ imageService: 'compile' })`; confirmed that exact source file now emits webp variants down to ~336kB max. All 5 pages declare `prerender = true`; `/booking` submits client-side via `astro:actions` to the server-rendered `/_actions/*` endpoint. Favicon set regenerated from client-supplied mark (D-BRAND-02), old placeholder svg removed. Hero logo now 70% width desktop (D-HERO-01). `npm run test` 23/23 green, `npm run build` exit 0, deployed version `360c16fb-6234-457d-8633-0d82e6a05d48` on Worker `maisondenude-web`; live browser booking flow re-verified (Playwright submit → THANK YOU → Supabase row → deleted, email fired). Minor non-blocking loose end: `icon-192.png`/`icon-512.png` exist in `public/` but aren't yet referenced by any head link/manifest.

## Next 1–3 actions
1. **Commit + push this session's work** — user decision, not yet made. A large set of tracked-file changes plus new untracked files (SEO module, collections page, robots/sitemap, test infra, this architecture/favicon/hero-logo block) are sitting uncommitted; confirm with the user before committing/pushing. This is now the #1 open action.
2. **Claim the Google Business Profile / Knowledge Graph entity** (client-owned action, place_id `ChIJR-cAGAAvdTERBu4E3UwrRlE`) — flagged in `context/SEO/03_entity_mentions.md` as the single highest-leverage entity action, still open.
3. **OQ-001** — swap `BOOKING_NOTIFY_EMAIL` to a real team inbox once Maison Denude confirms one (currently defaults to `thieuxmaison@gmail.com`; no code change needed, just the Worker secret/var).
4. **Review the Cloudflare zone-level "content signals" robots.txt toggle** — CF prepends a managed block disallowing GPTBot/ClaudeBot/CCBot/etc. (`ai-train=no`) ahead of our own `robots.txt`; our `Allow: /` + `Sitemap:` line is still intact below it. Revisit if AI-engine discovery matters for the entity strategy.
5. **Roadmap items from plan.md, not yet started:** booking modal (auto-trigger at 30s, MD-009) and the blog (`/blog` + `/blog/[slug]` MDX, first 2–3 SEO-targeted posts).
6. **Non-blocking loose end:** wire `icon-192.png`/`icon-512.png` into a `manifest.json` or head links if/when a PWA-style icon set is wanted; currently unused static files (no decisions.md requirement forces this).
- Non-blocking: 4 landing ImageKeys still `_placeholder` (PT-01). Video files/URLs from Maison still pending (PT-06, FQ-04).

## Active blockers / watch-items
- **OQ-001 (booking email recipient):** Maison Denude hasn't confirmed the team inbox; recipient is `thieuxmaison@gmail.com` (default, D-BOOK-02) until answered — swap via `BOOKING_NOTIFY_EMAIL` env, no code change needed.
- **Cloudflare content-signals robots.txt block:** zone-level managed block prepended ahead of our `robots.txt` (disallows AI crawlers). Not yet reviewed/decided — see Next Actions item 5.
- **Non-blocking open deps:** video URLs (FQ-04), clean KOL/Sable images (PT-01), nav-item meanings (FQ-01..03), blog language (OQ-003), Zalo URL not yet provided (social icon removed from footer until confirmed). All swap in via config — never block the build.
- **D-DEPLOY-03:** resolved 2026-06-26 — stray Worker deleted.

## Change-tolerance invariants (every pm gate checks these)
1. No hardcoded content in markup — all from `content/*`.
2. No hardcoded design literals in `<style>` — all `var(--token)`.
3. No raw asset paths in components — all via `ImageKey`.
4. Every `src/pages/**` declares prerender intent.
5. New section type = union + component + registry line; zero edits to existing sections.
6. Supabase access only through `lib/supabase.ts`.
