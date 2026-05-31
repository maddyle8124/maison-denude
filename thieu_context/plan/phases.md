# Maison Dénudé — 7-Week Phase Execution Plan

_Last updated: 2026-05-31_

---

## Phase 0 — Setup (Week 1)

**Goal:** Everything is wired up and ready to build.

- [ ] Get admin access to Maison Dénudé's domain registrar (or confirm OQ-002)
- [ ] Get booking destination email (OQ-001)
- [ ] Create GitHub repo: `maison-denude`
- [ ] Scaffold Astro project with Cloudflare adapter
- [ ] Connect to Cloudflare Pages (auto-deploy from `main`)
- [ ] Create Supabase project, seed `bookings` table
- [ ] Set up GTM container, GA4 property, Search Console
- [ ] Confirm booking popup trigger timing with client (OQ-004)
- [ ] Confirm Add-on A and/or B selection with client

**Exit criteria:** Astro deploys to Cloudflare Pages with a placeholder page. Supabase connected.

---

## Phase 1 — SEO Foundation (Week 1–2)

**Goal:** Tracking live, keywords mapped, design direction locked.

- [ ] GTM installed on site with GA4 and Search Console firing
- [ ] Google Business Profile updated/claimed
- [ ] Keyword map finalized (7 target keywords + long-tail)
- [ ] Homepage design wireframe approved by Maison Dénudé
- [ ] Entity claiming started (link external mentions to domain)

**Exit criteria:** GA4 showing live data. Keyword baseline document shared with Maison Dénudé.

---

## Phase 2 — Core Build (Week 2–3)

**Goal:** All three pages live in production.

- [ ] Home / Landing page built and deployed (`/`)
- [ ] `/booking` page built with booking form
- [ ] Booking form → Supabase Edge Function → email working (test submission sent)
- [ ] Booking modal built: appears on all pages, auto-triggers at 30s
- [ ] Mobile responsive check on all pages

**Exit criteria:** All 3 pages live. Test booking email received. Modal triggers correctly.

---

## Phase 3 — Blog + Content (Week 3–4)

**Goal:** SEO content live, backlink seeding started.

- [ ] `/blog` listing page live
- [ ] First 2–3 blog posts published (content from Maison Dénudé)
- [ ] Blog posts structured for target keywords
- [ ] Initial backlink outreach (fashion directories, mentions that exist)
- [ ] Entity claiming batch 1 completed

**Exit criteria:** /blog live with at least 2 posts. Blog posts indexed in Search Console.

---

## Phase 4 — Review #1 (Week 4)

**Goal:** Client aligned on all delivered work so far.

- [ ] Scheduled call: Thứ 7, 15:00 (Saturday)
- [ ] Present: site live demo, GA4 dashboard, keyword baseline
- [ ] Collect feedback → action list
- [ ] Incorporate feedback within 48h of call

**Exit criteria:** Feedback document signed off. Action list scoped.

---

## Phase 5 — Add-ons + Polish (Week 5–6)

**Goal:** Add-ons built (if chosen), full QA pass.

**If Add-on A chosen:**
- [ ] Google Cloud project set up, Calendar API enabled
- [ ] OAuth2 credentials for sales manager's account
- [ ] Edge Function updated to create Calendar event on booking
- [ ] Test: submit booking → verify Calendar event created

**If Add-on B chosen:**
- [ ] Wishlist button component built (heart/bookmark)
- [ ] LocalStorage wishlist logic
- [ ] Wishlist pre-populated in booking form
- [ ] `wishlist_submissions` table in Supabase
- [ ] Edge Function updated to save wishlist with booking
- [ ] Test: save items → submit booking → verify in Supabase

**General polish:**
- [ ] Cross-browser QA (Chrome, Safari, Firefox, mobile)
- [ ] Performance check (Cloudflare analytics, Lighthouse)
- [ ] Booking flow end-to-end test

**Exit criteria:** All chosen add-ons tested. Lighthouse performance > 90.

---

## Phase 6 — SEO Audit + Go-Live (Week 7)

**Goal:** Everything passed. Site live. Handover complete.

- [ ] Full technical SEO audit (crawl, meta tags, OG, schema, sitemap, robots.txt)
- [ ] Sitemap submitted to Search Console
- [ ] All target keyword pages indexed
- [ ] GTM firing correctly (GA4 events, conversions)
- [ ] Backlink report: batch 1 confirmed
- [ ] Final review meeting: Thứ 7, 15:00
- [ ] Handover doc: how to add blog posts, how to view Supabase bookings
- [ ] Baseline rankings documented (all 7 target keywords)

**Exit criteria:** Site live on Maison Dénudé's domain. All tracking firing. Handover doc delivered.
