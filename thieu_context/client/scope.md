# Maison Dénudé — Contracted Scope & Pricing

_Last updated: 2026-05-31_

---

## Contract Summary

| Item | Value |
|------|-------|
| **Total Phase 1** | 8,000,000 VND |
| **Duration** | 7 weeks |
| **Team** | Thiệu (= Matthew) — website dev + SEO lead |
| **Phase 2** | Maddy automation (separate, 2–3M VND/month) |
| **Annual maintenance** | 1,000,000 VND/year |
| **Domain** | NOT included — Maison Dénudé purchases their own |

---

## Phase 1 — Base Package (8,000,000 VND)

### SEO & Infrastructure (from original Proposal v7)

| Deliverable | Notes |
|------------|-------|
| Google Tag Manager setup | Centralized tag management |
| Google Analytics 4 setup | Traffic analytics |
| Google Search Console setup | Keyword tracking, crawl health |
| Google Business Profile optimization | Maps and local search |
| Backlink building (initial batch) | Fashion sites, directories, existing mentions |
| Entity claiming | Link all external mentions to official site |
| Keyword map + baseline rankings | All target keywords documented |
| SEO blog posts — published & optimized | Content provided by Maison Dénudé; Thiệu structures and publishes |

**Target keywords:** `bespoke saigon` · `bespoke ho chi minh` · `artisanal bespoke fashion` · `occasional wear vietnam` · `heritage inspired dress` · `asian inspired dress` · `bespoke ao dai`

### Website Build (new scope — added this meeting)

| Deliverable | Notes |
|------------|-------|
| `/` — Home / Landing page | Full brand landing page UI |
| `/blog` — Blog page | SEO-optimized blog listing + individual posts |
| `/booking` — Booking page | Booking form UI + confirmation UX |
| Booking modal | Always available on all pages; auto-triggers (default: 30s — see OQ-004) |
| Booking → email notification | Supabase Edge Function sends form data to team email (see OQ-001) |
| Cloudflare Pages deployment | Free tier |
| GA4 + GTM + Search Console | Installed on the new Astro site |

**NOT included in base:**
- Domain purchase or registration
- Custom email domain
- CMS for client self-editing (not needed)
- Multi-language versions (see OQ-005)
- Google Calendar integration (Add-on A)
- Wishlist feature (Add-on B)

---

## Add-ons (Upsells — Maison Dénudé Chooses)

### Add-on A — Google Calendar Integration (+500,000 VND)

When a user submits a booking form:
- Supabase Edge Function fires → creates a Google Calendar event in the **sales manager's personal Google Calendar**
- Event contains: client name, contact info, preferred date/time, notes
- Sales manager gets a calendar notification automatically
- No manual data entry needed from the team

**Status:** Upsell — pending Maison Dénudé confirmation.

### Add-on B — Wishlist Feature (+1,000,000 VND)

- Users browse the site and "like/save" design items to a personal wishlist
- Wishlist is **anonymous** — no login required, stored in browser local storage
- When a user submits a booking, their saved wishlist items are **automatically included** in the booking submission
- Maison team receives booking email/notification + wishlist → no screenshot screenshots from client needed
- All wishlist data stored in Supabase → enables analytics on most-liked items

**Analytics reporting:** Thiệu manually exports Supabase data once per month and reports to Maison Dénudé team. Included in maintenance, no extra charge.

**Status:** Upsell — pending Maison Dénudé confirmation.

---

## Annual Maintenance (1,000,000 VND/year)

> [!NOTE]
> Full scope to be defined as a separate task. Candidates below:

- Cloudflare Pages configuration maintenance
- Supabase health check (free tier limits, schema, edge functions)
- Booking form bug fixes
- Monthly uptime check
- Monthly wishlist/booking data export + report to Maison team (if Add-on B purchased)
- SSL monitoring (auto-managed by Cloudflare, but flagged if issues arise)
- Minor content updates (TBD — number of items per month)

---

## Out of Scope

| Item | Notes |
|------|-------|
| Writing blog content | Maison Dénudé provides content; Thiệu structures + publishes |
| Managing ad spend | Strategy only — Thiệu/Maddy do not handle client money |
| Social media management | Not in contract |
| KOL outreach & negotiation | Strategy proposed only |
| Multi-language site | Open question — big architectural decision (OQ-005) |
| CMS build | Not requested |
| Phase 2 automation | Separate contract (Maddy + Matthew) |

---

## Open Questions (Scope-Impacting)

| ID | Question | Action |
|----|---------|--------|
| OQ-001 | Which email address receives booking submissions? | Ask Maison Dénudé |
| OQ-002 | What is Maison Dénudé's domain? Do they have one? | Ask Maison Dénudé |
| OQ-003 | Blog content language: Vietnamese only, or also English? | Ask Maison Dénudé |
| OQ-004 | Booking popup trigger: 30s default — reconfirm with client | Ask Maison Dénudé |
| OQ-005 | Multi-language (EN default confirmed; ZH/KO timeline?) | Major architectural decision |
