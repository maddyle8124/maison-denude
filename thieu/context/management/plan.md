# Maison Denude — Implementation Plan

## Project Goal

Ship a production-grade website that:
1. Passes full technical SEO audit before go-live
2. Has booking system live and tested end-to-end
3. Has cornerstone SEO content earning organic traffic from day one
4. Converts visitors into booking inquiries

## Locked Constraints

| Constraint | Decision |
|-----------|---------|
| Tech stack | Astro + Cloudflare adapter, **hybrid render** (MD-035) |
| Hosting | Cloudflare Pages (free tier) |
| Database | Supabase (free tier) — **single backend** (MD-036) |
| Media | **Cloudflare R2**, URL stored in Supabase (MD-038) |
| Booking | Supabase Edge Function → email |
| Domain | maisondenude.com (Mắt Bão), Thiệu = technical manager (MD-025) |
| Language default | English |
| Multi-language | Deferred (OQ-005) |
| CMS | **Minimal collections CMS** at `/admin` (MD-031) — blog still Thiệu/MDX |
| Wishlist | Anonymous, **server-stored** (anon cookie id, MD-033) — not localStorage |
| Metrics | `interaction_events` in Supabase → monthly report by Thiệu (MD-034) |
| Analytics | GA4 + GTM + Search Console |

> **Note (2026-06-21):** foundation rethink logged MD-031–038. New build items: `/collections` page, `/admin` CMS, server-stored wishlist, metrics pipeline, R2 media. No price increase. Full implementation planning deferred (user instruction).

---

## Phase 0 — Setup (Week 1)

**Goal:** Everything wired up and ready to build.

- [ ] Get booking destination email from Maison Denude (OQ-001)
- [ ] Get domain from Maison Denude or confirm status (OQ-002)
- [ ] Create GitHub repo: `maison-denude`
- [ ] Scaffold Astro project with Cloudflare adapter
- [ ] Connect repo to Cloudflare Pages (auto-deploy from `main`)
- [ ] Create Supabase project; seed `bookings` table
- [ ] Set up GTM container, GA4 property, Search Console property
- [ ] Confirm booking popup trigger timing with client (OQ-004)
- [ ] Confirm Add-on A and/or B selection with client

**Exit criteria:** Astro site deploys to Cloudflare Pages with placeholder page. Supabase connected. GTM/GA4 created.

---

## Phase 1 — SEO Foundation (Week 1–2)

**Goal:** Tracking live, keywords mapped, design direction locked.

- [ ] GTM installed on site, GA4 and Search Console firing
- [ ] Google Business Profile updated/claimed (address, hours, photos)
- [ ] Keyword map finalized (7 target keywords + long-tail variants)
- [ ] Homepage design wireframe approved by Maison Denude
- [ ] Entity claiming started (audit all external mentions)

**Exit criteria:** GA4 showing live data. Keyword baseline document shared with Maison Denude.

---

## Phase 2 — Core Build (Week 2–3)

**Goal:** All three pages live in production.

- [ ] Home / Landing page built and deployed (`/`)
- [ ] `/booking` page built with booking form
- [ ] Booking form → Supabase Edge Function → email working (send test submission)
- [ ] Booking modal built: auto-triggers at 30s on all pages
- [ ] Mobile responsive check on all pages

**Exit criteria:** All 3 pages live. Test booking email received by team. Modal triggers correctly.

---

## Phase 3 — Blog + Content (Week 3–4)

**Goal:** SEO content live, backlink seeding started.

- [ ] `/blog` listing page live
- [ ] `/blog/[slug]` individual post pages working
- [ ] First 2–3 blog posts published (content from Maison Denude, structured by Thiệu)
- [ ] Blog posts targeting priority keywords (see SEO Blog Strategy below)
- [ ] Initial backlink outreach started (fashion directories, existing mentions)
- [ ] Entity claiming batch 1 completed

**Exit criteria:** `/blog` live with at least 2 posts. Posts indexed in Search Console.

---

## Phase 4 — Review #1 (Week 4)

**Goal:** Client aligned on all delivered work.

- [ ] Schedule Saturday 15:00 call
- [ ] Present: live site demo, GA4 dashboard, keyword baseline doc
- [ ] Collect feedback → create action list
- [ ] Incorporate feedback within 48h of call

**Exit criteria:** Action list scoped and signed off.

---

## Phase 5 — Tính năng thêm + Polish (Week 5–6)

**Goal:** Tính năng thêm built (if chosen), full QA pass.

**If Add-on A chosen:**
- [ ] Google Cloud project set up, Calendar API enabled
- [ ] OAuth2 credentials for sales manager's Google account (stored as Supabase secrets)
- [ ] Edge Function updated: booking → Calendar event created
- [ ] Test: submit booking → verify Calendar event appears

**If Add-on B chosen (server-stored wishlist + collections + metrics — MD-031/032/033/034):**
- [ ] `/collections` page — static shell + live Supabase read (hybrid)
- [ ] `/admin` CMS — Supabase Auth login + collections CRUD; image upload → R2 (OQ-008)
- [ ] `design_items`, `wishlists`, `wishlist_items`, `booking_wishlist`, `interaction_events` tables (see backend.md)
- [ ] WishlistButton component — server-stored via anon cookie id (calls `wishlist` fn)
- [ ] Wishlist pre-populated in booking form on open
- [ ] Edge Function saves attached items to `booking_wishlist` + logs `attached_to_booking`
- [ ] `track-event` wired (item_viewed / wishlisted) → `interaction_events`
- [ ] Confirm `/collections` keeps Lighthouse>90 + is indexable (OQ-011)
- [ ] Redundant Supabase keep-alive + failure alert (load-bearing now — OQ-012)
- [ ] Test: save items → submit booking → verify in Supabase; admin edit → live on /collections

**General polish:**
- [ ] Cross-browser QA: Chrome, Safari, Firefox, mobile
- [ ] Performance check (Cloudflare analytics + Lighthouse)
- [ ] Booking flow end-to-end test (full user journey)
- [ ] All images: WebP format, compressed, descriptive alt text

**Exit criteria:** All chosen Tính năng thêm tested. Lighthouse performance > 90 (mobile).

---

## Phase 6 — SEO Audit + Go-Live (Week 7)

**Goal:** Everything passed. Site live. Handover complete.

**Technical SEO audit:**
- [ ] `<title>` tags: unique, keyword-relevant, max 60 chars — all pages
- [ ] Meta descriptions: compelling, max 155 chars — all pages
- [ ] Single `<h1>` per page
- [ ] Open Graph tags (og:title, og:description, og:image) — all pages
- [ ] Twitter Card meta — all pages
- [ ] Canonical tags on all pages
- [ ] robots.txt created and correct
- [ ] XML sitemap generated
- [ ] Sitemap submitted to Search Console
- [ ] Schema markup: Organization + LocalBusiness on homepage
- [ ] Schema markup: BlogPosting on each blog post
- [ ] 404 page styled
- [ ] No broken links
- [ ] Favicon set
- [ ] Images lazy-loaded
- [ ] Fonts preloaded
- [ ] No render-blocking resources

**Tracking verification:**
- [ ] GTM firing on all pages
- [ ] GA4 events: form submit (booking), modal open, blog post view
- [ ] Search Console: domain property verified, sitemap submitted
- [ ] Google Business Profile: address, hours, photos confirmed

**Performance:**
- [ ] Lighthouse performance score > 90 (mobile)
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1

**Backlinks & entity:**
- [ ] Backlink report batch 1 confirmed
- [ ] Entity claiming: Facebook, Instagram, L'Officiel, ELLE, Miss Universe updated

**Handover:**
- [ ] Final review meeting: Saturday 15:00
- [ ] Handover doc: how to add blog posts (MDX workflow)
- [ ] Handover doc: how to view Supabase bookings
- [ ] Baseline rankings documented (all 7 target keywords)

**Exit criteria:** Site live on Maison Denude's domain. All tracking firing. Handover doc delivered.

---

## SEO Blog Strategy

Maison Denude provides content (raw copy, brief, or draft). Thiệu structures for SEO and publishes.

| Priority | Topic | Target Keyword |
|---------|-------|----------------|
| 1 | The story behind a bespoke áo dài — process & craftsmanship | `bespoke ao dai` |
| 2 | Maison Denude at [major event] — the outfit story | `bespoke saigon` |
| 3 | How to choose occasion wear for the modern Vietnamese woman | `occasional wear vietnam` |
| 4 | Vietnamese fashion on the world map | `artisanal bespoke fashion` |
| 5 | Bespoke vs. ready-to-wear — why the difference matters | `heritage inspired dress` |

Blog content language: OQ-003 (Vietnamese only or also English?)

Each blog post must:
- Target one primary keyword in title, H1, and first paragraph
- Link to at least 2 other site pages (internal linking)
- Have BlogPosting schema markup
- Have OG tags for social sharing

---

## Backlink Targets (Initial Batch)

- L'Officiel Vietnam — request link update to new domain
- ELLE Vietnam — request link update to new domain
- Marie Claire Vietnam — request link update
- Miss Universe Vietnam — confirm link exists
- The Planners (wedding planner) — featured Maison Denude bridal
- TIE Men (bridal) — featured Maison Denude
- KOL posts that tag brand — ensure website URL in link chain
- Google Business Profile (self-owned, high authority)

---

## Entity Claiming Checklist

- [ ] Facebook page: update website URL to new domain
- [ ] Instagram bio: update website URL to new domain
- [ ] L'Officiel Vietnam coverage: request backlink update
- [ ] ELLE Vietnam coverage: request backlink update
- [ ] Marie Claire Vietnam coverage: request backlink update
- [ ] Miss Universe Vietnam: confirm link exists
- [ ] Google Business Profile: ensure website URL set
