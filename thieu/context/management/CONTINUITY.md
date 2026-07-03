# CONTINUITY — Maison Dénudé Frontend (Preview + Booking)

> **Read this first after any compaction or new session.** This is the resume anchor — current state only, not history (see `status_log.md` beside this file) and not decisions (see `../frontend/decisions.md` for frontend D-rows, `../decision.md` for master MD-rows).
>
> **Doc map:** `context/management/` = plan.md, open_questions.md, CONTINUITY.md, status_log.md (project-wide). `context/frontend/` = frontend specs + decisions.md (D-rows). `context/decision.md` = master legal decisions (MD-rows).

_Last refreshed: 2026-07-03 (session complete: P0–P6, booking redesign D-BOOK-03, nav fix + /about D-NAV-02, critical booking-loss bug fix, and the static-first architecture + favicon + hero-logo block (D-ARCH-02/D-HERO-01/D-BRAND-02) all done, deployed `360c16fb`, live-verified, pm-PASSED)_

---

## Now-line
Site **live on maisondenude.com** with traffic, all tracking verified. Latest deployed version **`360c16fb-6234-457d-8633-0d82e6a05d48`** on Worker `maisondenude-web`, pm-PASSED 2026-07-03. This block fixed the real root cause of "slow media": `astro.config.mjs` had a manual `image.service.entrypoint` pointing at a module that doesn't exist in Astro 7, so images silently shipped unoptimized (one 18MB JPEG live). Fixed via `adapter: cloudflare({ imageService: 'compile' })` (D-ARCH-02); confirmed that specific 18MB source now emits webp variants down to ~336kB max. All 5 pages declare `prerender = true` (booking flipped back to `true`; its form now submits client-side via `astro:actions` to the always-server-rendered `/_actions/*` endpoint, never a raw page POST). Favicon set replaced from the client-supplied mark (D-BRAND-02); hero logo resized to 70% width on desktop (D-HERO-01). Tests 23/23 green, build clean, live booking flow re-verified end to end (Playwright submit → THANK YOU → Supabase row → deleted; email fired). **Prior state (still true):** P6 final QA/deploy, the D-BOOK-03 booking redesign, D-NAV-02 nav/`/about` rebuild, and the earlier critical booking-submission-loss bug fix are all done and were live-verified in previous blocks (see status_log for each). Everything in the working tree is deployed but **NOT yet committed to git** — committing/pushing remains the user's call (next action #1).

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
3. **OQ-001** — swap `BOOKING_NOTIFY_EMAIL` to a real team inbox once Maison Dénudé confirms one (currently defaults to `thieuxmaison@gmail.com`; no code change needed, just the Worker secret/var).
4. **Review the Cloudflare zone-level "content signals" robots.txt toggle** — CF prepends a managed block disallowing GPTBot/ClaudeBot/CCBot/etc. (`ai-train=no`) ahead of our own `robots.txt`; our `Allow: /` + `Sitemap:` line is still intact below it. Revisit if AI-engine discovery matters for the entity strategy.
5. **Roadmap items from plan.md, not yet started:** booking modal (auto-trigger at 30s, MD-009) and the blog (`/blog` + `/blog/[slug]` MDX, first 2–3 SEO-targeted posts).
6. **Non-blocking loose end:** wire `icon-192.png`/`icon-512.png` into a `manifest.json` or head links if/when a PWA-style icon set is wanted; currently unused static files (no decisions.md requirement forces this).
- Non-blocking: 4 landing ImageKeys still `_placeholder` (PT-01). Video files/URLs from Maison still pending (PT-06, FQ-04).

## Active blockers / watch-items
- **OQ-001 (booking email recipient):** Maison Dénudé hasn't confirmed the team inbox; recipient is `thieuxmaison@gmail.com` (default, D-BOOK-02) until answered — swap via `BOOKING_NOTIFY_EMAIL` env, no code change needed.
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
