# CONTINUITY — Maison Dénudé Frontend (Preview + Booking)

> **Read this first after any compaction or new session.** This is the resume anchor — current state only, not history (see `status_log.md` beside this file) and not decisions (see `../frontend/decisions.md` for frontend D-rows, `../decision.md` for master MD-rows).
>
> **Doc map:** `context/management/` = plan.md, open_questions.md, CONTINUITY.md, status_log.md (project-wide). `context/frontend/` = frontend specs + decisions.md (D-rows). `context/decision.md` = master legal decisions (MD-rows).

_Last refreshed: 2026-06-26 (tracking fully live; domain maisondenude.com on prod; preview+booking phases complete)_

---

## Now-line
Landing page + booking form **live on maisondenude.com** (Cloudflare Workers, thieuxmaison account). All tracking verified: GTM, GA4, Microsoft Clarity, Google Search Console. Site is in production. Next work follows **plan.md Phase 2 → 3 → 6** roadmap: complete booking email, booking modal, then blog + SEO audit.

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

## Next 1–3 actions (plan.md Phase 2 completion → Phase 3)
1. **Booking email (plan.md Phase 2):** Wire `lib/email.ts` sendBookingNotification (currently no-op stub) — choose email provider (Resend recommended), get API key, wire to D-BOOK-01 seam. Unblocks OQ-001 (need team email from Maison Dénudé).
2. **Booking modal (plan.md Phase 2):** Auto-trigger modal at 30s on all pages (MD-009). Seam not yet built — new component + JS trigger needed.
3. **Blog (plan.md Phase 3):** `/blog` listing + `/blog/[slug]` MDX pages. Content from Maison Dénudé; Thiệu structures for SEO. First 2–3 posts targeting priority keywords (see plan.md SEO Blog Strategy).
- Non-blocking: 4 landing ImageKeys still `_placeholder` — swap content-config keys when clean images ready (PT-01). Video files/URLs from Maison still pending (PT-06).

## Active blockers / watch-items
- **OQ-001 (booking email):** Maison Dénudé hasn't confirmed the team inbox. `lib/email.ts` stub is in place; unblocks when email provider chosen + OQ-001 answered.
- **Non-blocking open deps:** video URLs (FQ-04), clean KOL/Sable images (PT-01), nav-item meanings (FQ-01..03), blog language (OQ-003). All swap in via config — never block the build.
- **D-DEPLOY-03:** ✅ Resolved 2026-06-26 — stray Worker deleted.

## Change-tolerance invariants (every pm gate checks these)
1. No hardcoded content in markup — all from `content/*`.
2. No hardcoded design literals in `<style>` — all `var(--token)`.
3. No raw asset paths in components — all via `ImageKey`.
4. Every `src/pages/**` declares prerender intent.
5. New section type = union + component + registry line; zero edits to existing sections.
6. Supabase access only through `lib/supabase.ts`.
