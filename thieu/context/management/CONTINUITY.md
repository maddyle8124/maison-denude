# CONTINUITY — Maison Denude Frontend (Preview + Booking)

> **Read this first after any compaction or new session.** This is the resume anchor — current state only, not history (see `status_log.md` beside this file) and not decisions (see `../frontend/decisions.md` for frontend D-rows, `../decision.md` for master MD-rows).
>
> **Doc map:** `context/management/` = plan.md, open_questions.md, CONTINUITY.md, status_log.md (project-wide). `context/frontend/` = frontend specs + decisions.md (D-rows). `context/decision.md` = master legal decisions (MD-rows).

_Last refreshed: 2026-07-03 (session complete: P0–P6, booking redesign D-BOOK-03, nav fix + /about D-NAV-02, critical booking-loss bug fix, and the static-first architecture + favicon + hero-logo block (D-ARCH-02/D-HERO-01/D-BRAND-02) all done, deployed `360c16fb`, live-verified, pm-PASSED)_

---

## Now-line
**ACTIVE: Google Calendar self-serve booking FEATURE-COMPLETE + booking-page UI REDESIGNED (full English, month-calendar picker) — all pm-PASSED (2026-07-08). Everything sits UNCOMMITTED in the working tree. Remaining before "done": commit + deploy, set prod Worker secrets, promote spec → D-BOOK-04.** The calendar feature turns `/booking` from date-only-request into instant self-serve slot booking → confirmed Google Calendar event + Meet link (Online) + invites team & client. Docs: spec `context/frontend/sitemap/booking-calendar.md` (decisions D-1…D-12 + D-BOOK-UI-01/02, still headed DRAFT — promote to **D-BOOK-04** at finish); plan `~/.claude/plans/vivid-percolating-karp.md`; OQ-CAL-* in open_questions.md; per-phase history in status_log.md.

**⚠ ROOT-CAUSE BUG FOUND (2026-07-08) — Astro scoped styles never applied to the JS-created picker elements.** The calendar day cells (`.booking__cal-cell`) and time slots (`.booking__time`) are built via `document.createElement` in the client `<script>`, so they NEVER receive Astro's `data-astro-cid-*` scoping attribute. Every scoped rule `.booking__time[data-astro-cid-…]` matched ZERO elements — the buttons rendered as unstyled browser-default (solid grey/white) boxes. This is why every visual edit "did nothing" for the user for many iterations while the served CSS always looked correct. FIX: wrap the dynamic-element selectors in `:global()` (or move them to global.css) so they apply regardless of the scoping attribute. Applies to cal-cell, cal-dow (also templated but shares), time, and any JS-created node.

**Booking-page UI redesign DONE + pm-PASSED (2026-07-08):**
- **D-BOOK-UI-01** — booking PAGE UI is now **full English** (VN/EN bilingual pairs removed; superseded D-9 for the page only — the Google *invite* body in calendar.ts stays bilingual). **D-BOOK-UI-02** — slot picker is now a **month-calendar grid** ("Approach B"): 7-col Mon-first, availability days clickable w/ a monochrome dot, empty days dimmed+disabled, `‹ ›` month nav across the 60-day horizon, times revealed in a side column on date-select. Two-pane layout kept. Mockups: `main-dev/booking-mockups.html` (A/B/C; user picked B).
- Files changed: `src/content/booking.ts` (flat English), `src/components/ui/BookingForm.astro` (month calendar), `src/pages/booking/cancel.astro` (English). astro check 0/0, 135/135 tests, build Complete, live e2e passed. pm gate: FAILed once on a fictional `--color-gold` token → fixed monochrome (design-system.md:68 forbids accent colours) → **PASS**.

**Phase 5 live test RESOLVED (2026-07-08):**
- ✅ **Invitation emails DO arrive** (they were just delayed by a few minutes). `sendUpdates=all` works; Google emails all attendees. NOTE: the organizer/owner (`thieuxmaison`) never gets an invite email for its own event — expected, not a bug. The one earlier "not arriving" symptom was purely `GCAL_SEND_UPDATES=none` (the safe compaction default) suppressing sends.
- ✅ **The `Ch? �nh` typo was NOT an app bug** — proven: it was Git-Bash-on-Windows curl mangling the Vietnamese CLI arg (Windows argv = cp1252) BEFORE it reached the Worker. Re-booked the same name via Node FormData (UTF-8-clean, the SAME path the real browser form uses) → Google stored & returned `Chị Ánh` perfectly (88 UTF-8 bytes, em-dash intact). **The app is foundationally correct on encoding; real users typing Vietnamese are fine.** Lesson: never use Git Bash curl for non-ASCII test data — use Node FormData.
- ✅ **Branded-email question RESOLVED: user declined** — the Google invite's outer chrome (date block, Join button, RSVP) is Google's template, unstylable by any API; only the description body is ours (already on-brand bilingual HTML). User decided the familiar Google invite is sufficient; **NO separate Resend branded email will be built.**
- ✅ **All test events cleaned off the thieuxmaison calendar** (4 events deleted via Calendar API, 204). `.dev.vars GCAL_SEND_UPDATES` reset to `none` (safe default). wrangler dev / workerd killed.

**DEPLOYED TO PRODUCTION (2026-07-08):** committed (`18e1594`) + pushed to main, then deployed to the **thieuxmaison** Cloudflare account (version `72649d91`). **D-BOOK-INFRA-01:** `wrangler.jsonc account_id` was wrong (`ecb2e6bb…`=nguyenthaithieu) — corrected to `73fb68b2979b1b17abbafc4eccdbc354`=thieuxmaison (where the domain maisondenude.com is managed). All 11 secrets set on the thieuxmaison worker via `wrangler secret put` (SUPABASE_*/RESEND_*/GOOGLE_*/GCAL_OWNER_EMAIL/GCAL_CALENDAR_ID + **GCAL_SEND_UPDATES=all** for prod). Live-verified: maisondenude.com/booking serves the new month-calendar full-English page; getAvailability returns 399 slots (real Google free/busy); full prod e2e booking → real Meet link → cancel → slot freed; calendar clean.

**STILL REMAINING (deferred):** (1) promote spec DRAFT → **D-BOOK-04** + OAuth re-mint runbook + residual double-book risk note; (2) ⚠ SECURITY: rotate the pasted OAuth client secret + re-mint post-launch. Earlier open Qs pending client: OQ-CAL-01 durations, OQ-CAL-07 keep-Resend-team-email.

**Built & pm-passed (all 5 lib modules + store + actions + UI + cancel page):** `src/lib/{slots,availability,google-auth,calendar,booking-flow,booking-store}.ts` (+ `.test.ts` for all but store), rewritten `src/actions/index.ts` (getAvailability / createBooking / cancelBooking), `src/components/ui/BookingForm.astro` (live slot-picker), `src/content/booking.ts` (bilingual VN+EN copy), new `src/pages/booking/cancel.astro` (`/booking/cancel`). DB migration `booking_calendar_slots` ALREADY APPLIED to prod Supabase (atomic partial unique index `bookings_slot_start_live_uidx` on (slot_start) WHERE status IN ('confirmed','pending'); status/consultation_type CHECKs; 3 legacy rows mapped). **135/135 tests green, astro check 0/0, build Complete.** `@astrojs/check` added as devDep.

**Phase 5 status — OAuth DONE, full integration PASSED, email UI just improved:**
- OAuth minted under **thieuxmaison@gmail.com** (D-12: canonical project account; nguyenthaithieu = personal/test-invitee only). Google Cloud project `maison-denude`. Web-client cred file (git-ignored) `main-dev/env/maison-denude-booking.json`. Secrets live in git-ignored `.env` + `.dev.vars`: GOOGLE_CLIENT_ID/SECRET/REFRESH_TOKEN, GOOGLE_CALENDAR_ID=GCAL_OWNER_EMAIL=**thieuxmaison@gmail.com** (authorized-as → owns events), **GCAL_SEND_UPDATES=none** (safe default; flip to `all` only for a real send-test). Refresh token verified exchanging (scope calendar, no error).
- **Full-app integration via `wrangler dev` on the BUILT worker (loads .dev.vars) ALL PASSED:** getAvailability→405 slots (freeBusy live, first slot +24h, last 17:00 @60d); createBooking Online→success+real Meet link+cancelUrl; booked slot removed (405→404); double-book→CONFLICT 409 (atomic index live); cancel via token→event deleted+slot freed; double-cancel→friendly no-op. ⚠ `astro dev` does NOT load .dev.vars — MUST use `wrangler dev` on built output (`npm run build` first; wrangler dev does NOT auto-rebuild).
- **Email/invite body improved (2026-07-08):** `calendar.ts buildEventPayload` description was a plain-text debug dump; rewritten to on-brand bilingual HTML (Google renders `<b>`/`<a>`/`<br>` subset): greeting + bold brand + bold type + client/phone/notes (notes line omitted if empty) + Meet-or-address line + cancel hyperlink. `escapeHtml` added for injection safety. calendar.test.ts updated + strengthened (asserts `<a href>`, `<b>Maison Denude</b>`, no empty notes line). 135/135 still green.
- **A LIVE TEST EVENT IS CURRENTLY ON the thieuxmaison calendar** (left intentionally for the user to inspect): 2026-07-09 13:00 Online, "Chị Ánh", Meet `meet.google.com/euv-pwon-sus`, invited all 3 team addrs, sendUpdates=all so invitation emailed. User is verifying the invite lands + the new body looks OK.

**REMAINING in Phase 5 (next session):** (1) user confirms invite email arrived + new body acceptable (else refine — note: we only control the event *description*, NOT Google's outer chrome/date-block/Join button; a fully-branded email would be a *separate* Resend send alongside the invite — offer if wanted); (2) clean up the 2026-07-09 test event when done inspecting (delete by id via Calendar API w/ the refresh token, or the /booking/cancel link — its cancel token is in the event body); (3) decide prod rollout (set the GOOGLE_*/GCAL_* as real Worker secrets via `wrangler secret put` on the thieuxmaison CF account + GCAL_SEND_UPDATES=all for prod); (4) promote spec DRAFT → **D-BOOK-04** + document OAuth re-mint runbook (token expires if consent screen ever leaves "In production") + the residual free/busy-vs-Google-direct-booking double-book risk; (5) commit + deploy. Earlier open Qs still pending client: OQ-CAL-01 durations, OQ-CAL-07 keep-Resend-team-email.

⚠ **SECURITY:** the OAuth client_secret + refresh_token were pasted in this chat transcript — consider rotating the client secret (Google Cloud → Credentials → reset) + re-minting post-launch.

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
