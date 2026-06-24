# Maison Dénudé — Project Specification

## Contract Summary

| | |
|--|--|
| **Phase 1 total** | 8,000,000 VND |
| **Duration** | 7 weeks (kickoff: 2026-05-31) |
| **Dev lead** | Thiệu (Matthew) |
| **Client** | Maison Dénudé |
| **Domain** | NOT included — Maison Dénudé purchases their own (OQ-002) |

## Pricing

| Item | Price |
|------|-------|
| Phase 1 — SEO + Website build | 8,000,000 VND |
| Add-on A — Google Calendar integration | +500,000 VND (optional) |
| Add-on B — Wishlist feature | +1,000,000 VND (optional) |
| Annual maintenance | 1,000,000 VND/year |

## Phase 1 Scope — Thiệu Deliverables

### SEO & Digital Infrastructure
- Google Tag Manager setup (centralized tag management)
- Google Analytics 4 setup (traffic analytics)
- Google Search Console setup (keyword tracking, crawl health)
- Google Business Profile optimization (maps, local search)
- Backlink building — initial batch (fashion sites, directories, existing mentions)
- Entity claiming — link all external mentions to official site
- Keyword map + baseline rankings (7 target keywords documented)
- SEO blog posts — published & optimized (Maison Dénudé provides content; Thiệu structures & publishes)

### Website Build
- `/` — Home / Landing page (full brand landing page UI)
- `/blog` — Blog listing + individual posts at `/blog/[slug]`
- `/collections` — data-driven catalog from Supabase (MD-032), hybrid-rendered
- `/booking` — Booking consultation page
- `/admin` — minimal client-editable CMS: collections CRUD (MD-031)
- Booking modal (all pages, auto-triggers at 30s — OQ-004)
- Booking → email notification (Supabase Edge Function → team email — OQ-001)
- Cloudflare Pages deployment (free tier); media on Cloudflare R2 (MD-038)
- GA4 + GTM + Search Console installed on new Astro site

> **Architecture update (2026-06-21, MD-031–038):** scope grew from a 3-page brochure to a small catalog app. Supabase is now the single backend for collections + server-stored wishlist + interaction metrics; render model is hybrid; a minimal collections CMS was added on ownership principle. **No price increase** (MD-037). See `backend.md` / `frontend/UI.md`.

### Handover Documentation
- How to add blog posts (MDX workflow)
- How to view Supabase bookings dashboard
- Baseline keyword rankings report (all 7 keywords)

## Add-on A — Google Calendar (+500,000 VND)

Optional — pending Maison Dénudé confirmation.

When a booking is submitted, a calendar event is automatically created in the sales manager's personal Google Calendar with all booking details. No manual data entry needed. Implementation details → `backend.md`.

## Add-on B — Wishlist (+1,000,000 VND)

Optional — pending Maison Dénudé confirmation.

Users browse designs and save items to an anonymous wishlist (no login). The wishlist is now **server-stored** (anon cookie id, MD-033) so it persists across cache clears and feeds interaction metrics. When they submit a booking, the wishlist is included automatically — the team sees exactly what the client is interested in without needing screenshots. Monthly behaviour-metrics report (views, wishlists, conversion) is prepared by Thiệu and included in maintenance (MD-034/MD-016). Implementation details → `backend.md`.

## Annual Maintenance (1,000,000 VND/year)

- Cloudflare Pages configuration maintenance
- Backend health monitoring (automated via n8n — see `backend.md`)
- Booking form bug fixes
- Monthly booking report to Maison Dénudé team
- Monthly wishlist analytics report (if Add-on B purchased) — automated via n8n
- SSL monitoring
- Minor content updates (count TBD)

## KPIs

- 4/4 tracking tools live and collecting data (GTM, GA4, GSC, Business Profile)
- All Maison Dénudé blog content published + structured for target keywords
- Baseline keyword rankings documented for all 7 keywords
- All website pages live on Cloudflare Pages (`/`, `/blog`, `/collections`, `/booking`, `/admin`)
- Booking form → email flow functional (test submission confirmed)
- Lighthouse performance score > 90 (mobile)
- 3 months post-launch: Top 10 ranking for at least 3 target keywords

## Requirements from Maison Dénudé

- [ ] Domain name — for Cloudflare Pages config (OQ-002)
- [ ] Booking email address — where submissions go (OQ-001)
- [ ] Blog content drafts or briefs (language: OQ-003)
- [ ] Brand assets: lookbook, campaign photos, raw videos
- [ ] Social media analytics access (IG/FB)
- [ ] Confirm booking popup timing — 30s default (OQ-004)
- [ ] Confirm Add-on A and/or B selection
- [ ] Attendance at Saturday 15:00 weekly meetings (all except Week 2)

## Out of Scope

- Domain purchase or registration
- Custom email domain
- Writing blog content (Maison Dénudé provides; Thiệu structures & publishes)
- CMS for **blog/page** self-editing (the `/admin` CMS is collections-only, MD-031; blog stays MDX managed by Thiệu)
- Multi-language site ZH/KO (deferred — OQ-005)
- Social media management
- Managing ad spend
- KOL outreach & negotiation
- Team-facing metrics dashboard/login (metrics delivered as a report Thiệu prepares — MD-034)

## Open Questions

See `open_questions.md` — that is the single source of truth for all OQs, their status, and resolution log.
