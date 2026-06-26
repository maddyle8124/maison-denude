# Frontend Decisions Log
_Your confirmed answers and decisions from the 2026-06-24 planning session._
_Use this as the approval record before implementation starts._

---

## Site structure & navigation

| Decision | Detail |
|----------|--------|
| Nav items (confirmed) | `INTRODUCTION`, `COLLECTION`, `SOCIAL CLUB`, `FEATURING`, `BLOG`, `BOOKING` — all in nav |
| Nav style | Vertical right rail on desktop, hamburger on mobile |
| Nav transparency | Not confirmed — implement as easy-to-change (CSS variable / Tailwind class swap) |
| Mobile nav | Hamburger menu |

---

## Landing page sections (confirmed order, top → bottom)

| # | Section | Status |
|---|---------|--------|
| 1 | Hero — full-screen single image, logo SVG only, no headline, no CTA | ✅ Confirmed |
| 2 | KOL Featuring — row of 3 images, no captions | ✅ Confirmed |
| 3 | YOUR TRULY, MAISON DENUDE Collection — label + full-width group shot + 2-up grid | ✅ Confirmed |
| 4 | Runway Video — full-bleed video section | ✅ Confirmed |
| 5 | RENAISSANCE Collection — label + full-width editorial + 2-up portrait grid | ✅ Confirmed |
| 6 | Video Renaissance — full-bleed video section | ✅ Confirmed |
| 7 | SABLE ORCHIDS Collection — label + 3-column photo row | ✅ Confirmed |
| 8 | Video Garden + Footer | ✅ Confirmed |

---

## Design decisions

| Topic | Decision |
|-------|----------|
| Background color | Pure black `#000000` |
| Text color | White `#FFFFFF` |
| Primary font | ABChanel Corpo (Extra Light as base weight) |
| Logo | Custom SVG — use as-is, do not replicate with a font |
| Color palette | Black + white only; images provide all color. Not fully confirmed by client yet. |
| Collection sections text | Minimal — collection name + word "COLLECTION" only. No description body copy. |
| Footer | Standard editable footer (not the botanical-image concept from design) — easy to change later |
| KOL images | Crop all clean (no Instagram UI). You will manually download clean versions from Instagram. |
| KOL section layout | Row of 3 images (desktop), stacked on mobile |

---

## Pages confirmed in scope

| Page | Path | Notes |
|------|------|-------|
| Home / Landing | `/` | Full design spec in `landing-page.md` |
| Collections | `/collections` | Data-driven from Supabase; wishlist hearts |
| Blog | `/blog` + `/blog/[slug]` | MDX posts |
| Booking | `/booking` | Dedicated full page + booking modal on all pages |
| Admin CMS | `/admin` | Auth-gated, Supabase |

---

## Pages that are open questions (need Chi to confirm)

| Nav item | Status | Question logged |
|----------|--------|----------------|
| INTRODUCTION | ❓ Unknown — possibly About page | FQ-01 |
| SOCIAL CLUB | ❓ Unknown — KOL section or separate concept? | FQ-02 |
| FEATURING | ❓ Unknown — separate from Social Club? | FQ-03 |

---

## Tracking

| Tool | Status | Detail |
|------|--------|--------|
| GTM | ✅ Live | Container ID `GTM-PKQ647S4` — confirmed firing on maisondenude.com |
| GA4 | ✅ Live | Property created, Measurement ID wired, confirmed receiving data |
| Microsoft Clarity | ✅ Live | Project created, confirmed live via GTM |
| Google Search Console | ✅ Live | Domain property verified, maisondenude.com |

---

## Backend / email

| Item | Decision |
|------|----------|
| Test booking email | `thieu.dachill@gmail.com` — temporary until Chi provides real email (OQ-001) |
| Email swap method | Change `TEAM_EMAIL` in Supabase secrets only — no code change needed |
| Supabase project | Created; keys in `C:\maison\thieu\main-dev\.env` |
| R2 storage | Keys in `.env` — bucket setup pending |

---

## Pending tasks you own (Thiệu)

| ID | Task |
|----|------|
| PT-01 | Manually download clean KOL images from Instagram (Section 2 + Section 7 col 2 & 3) |
| PT-02 | ✅ Done | Clarity project created and live |
| PT-03 | ✅ Done | GA4 property created, Measurement ID wired and live |
| PT-04 | ✅ Done | `logo_white.svg` exists |
| PT-05 | ✅ Done | ABChanel Corpo woff2 files wired and serving |
| PT-06 | Get video URLs/files from Maison (3 video sections) |
| PT-07 | Source botanical/garden B&W photo for footer (or confirm not needed with standard footer) |

---

## Brainstorm session 2026-06-24 — deployment & scope (BINDING)

| ID | Decision | Detail |
|----|----------|--------|
| D-DEPLOY-01 | **Hosting = Cloudflare Workers, not Pages** | `main-dev/` is already scaffolded with `@astrojs/cloudflare` + `wrangler deploy` + `ASSETS` binding (Workers Static Assets model). Keep as-is — no Pages migration. Static assets are unmetered on free tier; the 100k/day free limit applies only to Worker invocations (SSR/API), which is ample for preview + launch. Cloudflare steers new projects to Workers; Pages is maintenance-mode. |
| D-DEPLOY-02 | **CF account** | Account `thieuxmaison@gmail.com`; login via `nguyenthaithieu@gmail.com`. Worker name `main-dev` (rename later if desired). |
| D-DEPLOY-03 | **Worker must deploy to the thieuxmaison account, NOT the default** ✅ RESOLVED | account_id pinned in wrangler.jsonc; stray Worker in nguyenthaithieu account deleted 2026-06-26. |
| D-SCOPE-01 | **This effort = Preview + Booking** | Deliver: (1) landing page demo matching old Maison Dénudé design, (2) GTM/GA4/Clarity firing & verified on the live URL (GSC deferred to real-domain phase), (3) a working booking form (Supabase + email). **Deferred:** collections, admin CMS, wishlist, blog. |
| D-SCOPE-02 | **Collections + admin = NEXT effort, not this one** | User's roadmap "seed demo collections in Supabase → render /collections → build admin" is confirmed correct but belongs to the FULL-site follow-up. The preview landing + booking need ZERO collection data: landing imagery is hardcoded editorial photos (not DB rows); base booking form has no collections dependency (wishlist pre-load is deferred Add-on B). Do not seed collections or build /collections or /admin this round. |
| D-DOC-01 | **Doc structure = full harness layout** | Reorganize `context/frontend/` into: `decisions.md` (legal truth, rename from decisions-log.md), `design-system.md` + `tracking-setup.md` (conventions), `sitemap/` (per-page specs: `_index.md`, `landing.md`, `booking.md`), `management/` (CONTINUITY.md, status_log.md, task.md). Spec-driven: each page's spec is the single source of truth for its build. |
| D-ASSET-01 | **Assets = placeholder-driven, config-swappable** | Demo is never blocked on manual asset tasks (PT-01..07). An agent converts HEIC→JPG, renames per asset-rename-list.md, wires clean assets where they exist + tasteful placeholders for gaps (video→static poster+play stub; footer botanical→dark fallback; logo_white→invert logo_black). All image/video paths config-driven so real files swap in with no code change. |
| D-DOMAIN-01 | ~~**Domain = workers.dev first**~~ → **SUPERSEDED 2026-06-26** | maisondenude.com is now connected to the thieuxmaison CF Worker and is the live prod domain. workers.dev URL still works as fallback but prod is maisondenude.com. |
| D-ARCH-01 | **Code quality bar = editability without breakage (first-principles)** | The roadmap will change a LOT (collections, admin, wishlist, blog all incoming). High-quality code here means *change-tolerant*: single source of truth for every value (content/config/design tokens never hardcoded in markup), clear separation of concerns (content vs presentation vs behavior), small composable components with explicit typed props, no duplication (DRY), config-driven asset/tracking paths, and additive extension points so new pages/sections drop in without touching existing ones. Every phase's pm gate must check this, not just "does it render." |
| D-BOOK-01 | **Booking backend = Supabase insert + email** | Booking POST → Astro Worker route (`/api/booking` or SSR action) → insert into Supabase `bookings` table + send notification email to `TEAM_EMAIL` (= thieu.dachill@gmail.com until OQ-001 resolved). Env names in `main-dev/.env`: `SUPABASE_URL`, `SUPABASE_ANON`, `SUPABASE_SERVICE_ROLE`. Email transport TBD (Resend/SMTP) — log as open question if not yet chosen. |

---

## Still open from client (Chi / Michelle)

| ID | Question |
|----|----------|
| OQ-001 | Booking destination email address |
| OQ-004 | Confirm 30s booking modal trigger timing |
| FQ-01 | What is INTRODUCTION page? |
| FQ-02 | What is SOCIAL CLUB? |
| FQ-03 | What is FEATURING? |
| FQ-04 | Video files/URLs for Runway, Renaissance, Garden |
| FQ-07 | Blog + Booking in footer? |
