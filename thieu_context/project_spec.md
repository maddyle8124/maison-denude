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
- `/booking` — Booking consultation page
- Booking modal (all pages, auto-triggers at 30s — OQ-004)
- Booking → email notification (Supabase Edge Function → team email — OQ-001)
- Cloudflare Pages deployment (free tier)
- GA4 + GTM + Search Console installed on new Astro site

### Handover Documentation
- How to add blog posts (MDX workflow)
- How to view Supabase bookings dashboard
- Baseline keyword rankings report (all 7 keywords)

## Add-on A — Google Calendar (+500,000 VND)

Optional — pending Maison Dénudé confirmation.

When booking submitted: Supabase Edge Function creates Google Calendar event in sales manager's personal calendar. Event contains: client name, contact, preferred date/time, consultation type, notes. No manual data entry from team.

## Add-on B — Wishlist (+1,000,000 VND)

Optional — pending Maison Dénudé confirmation.

Users save design items to anonymous wishlist (localStorage, no login). When booking submitted, wishlist auto-included. Team receives booking email + wishlist → no screenshots needed from client. Supabase stores all wishlist data → Thiệu exports monthly report (included in maintenance).

## Annual Maintenance (1,000,000 VND/year)

- Cloudflare Pages configuration maintenance
- Supabase health check (free tier limits, schema, edge functions)
- Booking form bug fixes
- Monthly uptime check
- Monthly wishlist/booking data export + report to Maison team (if Add-on B purchased)
- SSL monitoring (auto-managed by Cloudflare, flagged if issues)
- Minor content updates (count TBD)

## KPIs

- 4/4 tracking tools live and collecting data (GTM, GA4, GSC, Business Profile)
- All Maison Dénudé blog content published + structured for target keywords
- Baseline keyword rankings documented for all 7 keywords
- 3/3 website pages live on Cloudflare Pages
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
- CMS for client self-editing
- Multi-language site ZH/KO (deferred — OQ-005)
- Social media management
- Managing ad spend
- KOL outreach & negotiation
- Custom admin dashboard

## Open Questions

See `open_questions.md` — that is the single source of truth for all OQs, their status, and resolution log.
