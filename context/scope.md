# Maison Dénudé — Scope

_Phase 1 contract scope. Last updated: 2026-06-21. Source of truth for "is this in scope?"._

## Contract summary

| | |
|--|--|
| **Phase 1 total** | 8,000,000 VND (Net) |
| **Duration** | 7 weeks (kickoff 2026-05-31) |
| **Client** | Maison Dénudé (Bên A) |
| **Contractor** | Nguyễn Thái Thiệu / Matthew (Bên B) |
| **Contract no.** | 01/2026/HĐCTV-MD |
| **Payment** | Đợt 1 (cọc) 2,000,000 on signing · Đợt 2 (còn lại) 7,500,000 on acceptance end of Week 7 |
| **Domain** | NOT included — Maison Dénudé buys their own (OQ-002) |

## Pricing

| Item | Price (Net) |
|------|-------------|
| Phase 1 — SEO + Website build + Playbook | 8,000,000 VND |
| Add-on A — Google Calendar booking integration | +500,000 VND (optional) |
| Add-on B — Wishlist feature | +1,000,000 VND (optional) |
| Annual maintenance (free first 12 months, then) | 1,000,000 VND/year |

## In scope — deliverables

### SEO & digital infrastructure
- Google Tag Manager, Google Analytics 4, Google Search Console setup.
- Google Business Profile optimization (maps, local search).
- Backlink building — initial batch (fashion sites, directories, existing mentions).
- Entity claiming — link all external mentions to official site.
- Keyword map + baseline rankings (7 target keywords).
- SEO blog posts published & optimized (Maison provides content; Thiệu structures & publishes).

### Website build (Astro → Cloudflare Pages → Supabase)
- `/` — Home / landing page.
- `/blog` — listing + `/blog/[slug]` posts.
- `/booking` — booking consultation page.
- Booking modal on all pages (auto-triggers ~30s — OQ-004).
- Booking → email notification (Supabase Edge Function → team email — OQ-001).
- GA4 + GTM + Search Console installed on the new site.

### Market research & Playbook
- Digital Marketing Playbook for **3 target markets** (selected 5 → 3).
- See `markets/_pointer.md`.

### Handover documentation (Vietnamese)
- How to add blog posts (MDX workflow).
- How to view the Supabase bookings dashboard.
- Baseline keyword rankings report (all 7 keywords).

## Add-ons (optional, client chooses)

- **Add-on A — Google Calendar** (+500k): booking auto-creates an event in the sales manager's personal Google Calendar.
- **Add-on B — Wishlist** (+1M): anonymous (no login) wishlist; items attach to the booking submission. Monthly most-liked report in maintenance.

## Annual maintenance (free year 1, then 1M/year)

Backup monthly · source/tech updates · 404 monitoring · 24/7 uptime · booking bug fixes · monthly booking report · (Add-on B) monthly wishlist report · SSL monitoring.

## Out of scope

Domain purchase · custom email domain · writing blog content (Maison provides) · CMS for client self-editing · multi-language ZH/KO (deferred, OQ-005) · social media management · ad spend management · KOL outreach/negotiation · custom admin dashboard.

## KPIs

- 4/4 tracking tools live (GTM, GA4, GSC, GBP).
- All Maison blog content published + structured for target keywords.
- Baseline rankings documented for all 7 keywords.
- 3/3 pages live on Cloudflare Pages.
- Booking → email functional (test confirmed).
- Lighthouse > 90 (mobile).
- 3 months post-launch: Top 10 for ≥3 target keywords.

## Requirements owed by Maison Dénudé

- [ ] Booking email address (OQ-001)
- [ ] Domain (OQ-002)
- [ ] Blog content drafts/briefs (language OQ-003)
- [ ] Brand assets: lookbook, campaign photos, raw videos
- [ ] Social media analytics access (IG/FB)
- [ ] Confirm booking popup timing (OQ-004)
- [ ] Confirm Add-on A / B selection
- [ ] Attendance at Saturday 15:00 weekly meetings

## Contract safety nets (from signed contract)

- **Net pricing** — Bên A covers any incidental fees so Bên B receives the full amount.
- **48h feedback rule** — Maison must respond to deliverables within 48 working hours; silence = auto-accepted.
- **Buffer** — if delays come from Maison (late resources/feedback), up to +2 weeks buffer at no extra Phase-1 cost; hard backstop 30/7.
- **IP & access** — all Playbook, SEO docs, source code, and technical accounts (domain, Cloudflare, GA4, GTM, GSC, GBP) belong to Maison; admin access handed over within 24h of each account setup.
