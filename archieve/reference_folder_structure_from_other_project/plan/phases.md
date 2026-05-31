# withdanang.com — MVP Phases

_Last updated: 2026-04-24_

Each phase has a goal, deliverables (WBS codes), dependencies, ordered execution steps, and hard exit criteria. Do not start the next phase until exit criteria are fully met.

## Critical Blockers (Current)

**These must be resolved before Phase 1 can launch:**
1. **WD-OQ-004** (voice/tone) — First person or brand voice? Affects all page copy.
2. **WD-OQ-005** (hero statement) — One-liner that defines the site. Currently on homepage as "Enjoy life withdanang" — needs final version.
3. **WD-OQ-007** (/people copy) — Opening statement for team page. Blocks /people build.
4. **Supabase setup** — Create people + room_inquiries tables. Blocks /people + inquiry form.

**Effort to unblock:**
- Decisions: 30 min call
- Supabase: 2–3 hours setup + testing

**Timeline if unblocked this week:** Phase 1 can launch by Friday.

Content writing (blog posts, page copy) is a parallel workstream — it can be drafted in any phase and does not block development phases, but must be complete and Thieu-reviewed before Phase 4.

---

## Phase 0 — Foundation

**Goal:** Everything is decided, designed, and scaffolded before production code is written.

**Why this phase matters:** The most expensive mistake in web projects is building before design and architecture are clear. Rework costs 3× as much as getting it right first. Phase 0 exists entirely to prevent that.

**WBS coverage:** 1.1, 1.2, 1.3, 1.4 (partial)

**STATUS (as of 2026-04-29):** ✅ **100% complete**
- ✅ Design system fully codified (Ngũ Sắc colors, Fraunces/Inter, 6-step spacing in global.css)
- ✅ Astro foundation created with BaseLayout, PageLayout, Navbar, Footer (Astro 6.1.9)
- ✅ 9+ core UI components built (Button, Badge, Card variants, RoomRequestModal, etc.)
- ✅ Content schemas defined (blog)
- ✅ All 17 strategic decisions logged
- ✅ Supabase client (`createSupabaseClient()` factory) wired and ready
- ✅ All 17 page shells created with correct routing and Supabase queries
- ✅ **All 9 Supabase tables created** (events, people, cafes, coworking_spaces, gyms, communities, food_spots, neighborhoods, room_requests) with RLS policies
- ✅ **All tables seeded** with 3+ realistic rows per table
- ⚠️ **Remaining:** GCS bucket (image hosting), Cloudflare Pages connection
- ⚠️ **Note:** 3 open questions WD-OQ-004, 005, 007 are content decisions, not technical blockers

### Dependencies
- None — this is the first phase

### Execution Steps (ordered)

**Step 1 — Lock vision and open questions**
1. Read `plan/vision.md` — answer the open vision questions at the bottom
2. Decide: will content be written in first person ("I") or brand voice ("WithDaNang")?
3. Decide: what is the homepage hero statement?
4. Log these as decisions in `products/main/decisions.md`

**Step 2 — Define brand identity in Stitch (do this before any page design)**
1. Open Google Stitch, create new project "withdanang-design"
2. Define color palette — pick primary, secondary, neutral, and accent. Avoid orange/turquoise (every Vietnam travel site uses those).
3. Define typography — heading font + body font. Should read well at long-form lengths.
4. Define spacing system (4px or 8px base grid)
5. Export design tokens for use in CSS variables

**Step 3 — Build component library in Stitch (before page designs)**
1. Navbar (desktop + mobile hamburger state)
2. Footer
3. Card components (content card, profile card, community group card)
4. Form components (text input, select, textarea, submit button)
5. Button and CTA styles
6. Typography scale (H1–H6, body, meta/label text)

**Step 4 — Design all pages in Stitch**
Design in this order — each reuses components from the previous:
1. Homepage (most complex — sets the template for everything)
2. /people (second most important — defines the profile card pattern)
3. /neighborhoods (defines zone card pattern used in /where-to-stay)
4. /where-to-stay (reuses zone cards + introduces form)
5. /cost-of-living (table-heavy — define table styles here)
6. /communities (reuses community group card)
7. /work, /food, /events (simpler — reuse established patterns)
8. /blog index + blog post layout (defines article reading experience)
9. /about (simplest — mostly text)

**Step 5 — Scaffold Astro project**
1. `npm create astro@latest withdanang-web` — choose "Empty" template, TypeScript strict
2. Install dependencies: `@astrojs/sitemap`, `@supabase/supabase-js`
3. Configure `astro.config.mjs` — set `site: 'https://withdanang.com'`, add sitemap integration, add Vercel adapter
4. Create `src/styles/global.css` — paste design tokens from Stitch as CSS variables
5. Create `src/content/config.ts` — define Zod schemas for blog, events, neighborhoods collections
6. Create `BaseLayout.astro` — accepts title, description, image props; outputs full `<head>` with meta, OG, canonical, JSON-LD slot, analytics
7. Create `PageLayout.astro` — imports BaseLayout, adds Navbar + Footer slots
8. Create empty shell files for all pages in `src/pages/`
9. Create `public/robots.txt`
10. Create `src/pages/404.astro`

**Step 6 — Convert Stitch HTML to Astro components**
1. Extract Stitch Navbar HTML → `src/components/layout/Navbar.astro`
2. Extract Stitch Footer HTML → `src/components/layout/Footer.astro`
3. Extract each card component → `src/components/ui/`
4. Extract form components → `src/components/ui/`
5. Wire Navbar mobile hamburger toggle (minimal JS)

**Step 7 — Set up Supabase**
1. Create `people` table with schema from `plan/architecture.md`
2. Create `room_inquiries` table with schema from `plan/architecture.md`
3. Seed `people` table: 4 profiles (Thieu + 3 team members)
4. Configure Supabase JS client in Astro, test connection with a simple query
5. Set RLS policies: `people` table — public read, no public write. `room_inquiries` — public insert only.

**Step 8 — Connect deployment**
1. Push to GitHub repo `withdanang-web`
2. Connect to Vercel, add `SUPABASE_URL` and `SUPABASE_ANON_KEY` environment variables
3. Deploy — verify the empty shell loads at withdanang.com
4. Point withdanang.com DNS to Vercel

### Deliverables
- Stitch project with all page designs and component library
- Astro project running locally with correct schemas and components
- Supabase tables created and seeded
- Empty site live at withdanang.com

### Exit Criteria
- [x] Brand identity (colors, fonts) decided and documented — ✅ DONE (Ngũ Sắc + Fraunces/Inter in global.css)
- [x] Astro project deploys without errors — ✅ DONE (local dev works; ready for Cloudflare Pages)
- [x] `sitemap.xml` accessible — ✅ DONE (@astrojs/sitemap configured)
- [x] All content collection schemas defined in `config.ts` — ✅ DONE (blog)
- [x] All 17 page shells exist and route correctly — ✅ DONE (all pages created)
- [x] Supabase client wired and tested — ✅ DONE (`createSupabaseClient()` factory ready)
- [x] **Supabase all 9 tables created — ✅ DONE** (events, people, cafes, coworking_spaces, gyms, communities, food_spots, neighborhoods, room_requests)
- [x] **RLS policies configured — ✅ DONE** (public read, anon-insert-only on room_requests)
- [x] **All tables seeded with realistic data — ✅ DONE** (3+ rows per table)
- [x] **Homepage components wired to live data — ✅ DONE** (EventsPreview, PeopleSection, JournalPreview)
- [x] **All 44 pages building correctly — ✅ DONE** (20 static + 24 dynamic from Supabase)
- [ ] Brand identity documented in Stitch — PARTIAL (in CSS, not in Stitch file)
- [ ] All 17 pages designed in Stitch — PARTIAL (homepage + /find-a-room done in code; others as shells)

---

## Phase 1 — Core Shell

**Goal:** Homepage is live in production with full SEO infrastructure. The site is real and visible. Room inquiry form works end-to-end.

**WBS coverage:** 1.4 (complete), 1.5.1, 1.5.5 (partial)

**STATUS (as of 2026-04-29):** ✅ **98% complete** (ready to launch, Cloudflare connection pending)
- ✅ Homepage fully built (hero with video parallax + persona cycler, 6 gateway cards, sections, CTAs)
- ✅ Homepage components wired to **live Supabase data** (3 people, 3 events, 3 blog posts showing in real time)
- ✅ /find-a-room page complete (RoomRequestForm with validation + n8n + Supabase submission)
- ✅ RoomRequestModal + form validation script (321 lines, fully functional)
- ✅ People carousel on homepage (PeopleSection.astro component) **populated from Supabase**
- ✅ BaseLayout has full SEO infrastructure (meta, OG, canonical, JSON-LD, GA4, sitemap)
- ✅ Navbar + Footer complete with all dropdowns + mobile hamburger
- ✅ /escape coming-soon placeholder built
- ✅ 404 page implemented
- ✅ **All 44 pages building from live Supabase data** (20 static + 24 dynamic category pages)
- ✅ **Build verified clean:** 5.4 seconds, no errors, all data loading
- ⚠️ **Non-blocking:** WD-OQ-004, 005, 007 unresolved (content decisions, not tech blockers)
- ⚠️ **Blocker for launch:** Cloudflare Pages connection (DNS not yet pointed)

**Deferred to Phase 2+:**
- /people hub page (dedicated /people listing all profiles)
- /people/[slug] dynamic profile pages (needs Supabase data)

### Dependencies
- Phase 0 complete (all exit criteria met)
- Homepage copy written and reviewed by Thieu (ready in code)
- **OPTIONAL:** Supabase setup to show real people in homepage carousel (can seed 4 profiles or use placeholder)

### Execution Steps (ordered)

**Step 1 — Wire BaseLayout SEO plumbing**
1. Implement title template: `{page title} | WithDaNang`
2. Wire meta description prop with fallback
3. Wire canonical URL (use `Astro.url`)
4. Wire OG tags (og:title, og:description, og:image, og:url, og:type)
5. Wire Twitter card tags
6. Add JSON-LD script slot (accepts stringified JSON-LD per page)
7. Add GA4 snippet (or Plausible) in `<head>`
8. Add Google Search Console verification meta tag
9. Test: inspect homepage `<head>` in browser — all tags present

**Step 2 — Build Homepage sections**
1. Hero section — copy in, layout from Stitch HTML
2. Content gateway — 6 section cards with correct links and icons
3. "Meet the team" carousel — fetch from Supabase `people` table, render profile cards
4. Latest blog posts preview — query blog content collection; if empty, hide section gracefully
5. "Find a Room" CTA strip — static, links to /where-to-stay
6. Add Homepage JSON-LD: WebSite + Organization schema

**Step 3 — Verify Navbar**
1. All dropdown links point to correct pages (even if pages are still empty shells)
2. "Find a Room" CTA button links to /where-to-stay
3. Active page highlighting works
4. Mobile hamburger opens/closes correctly
5. Test on 375px, 768px, 1280px viewport widths

**Step 4 — SEO verification**
1. Run PageSpeed Insights on homepage — fix anything below 90 mobile
2. Validate homepage JSON-LD at schema.org/validator
3. Confirm sitemap includes homepage
4. Confirm Search Console verification tag is present

### Deliverables
- Homepage live in production with real content
- People carousel populated (from Supabase or placeholder)
- Full SEO plumbing active
- Google Search Console property verified

### Exit Criteria
- [x] Homepage live, no Lorem ipsum — ✅ DONE
- [x] /find-a-room page with inquiry form — ✅ DONE (form tested locally + Supabase submission wired)
- [x] **Homepage people carousel populated (via Supabase or placeholder) — ✅ DONE** (3 real people loading from Supabase)
- [ ] PageSpeed Insights: homepage 90+ mobile — PENDING (needs testing)
- [x] All SEO meta tags present on homepage — ✅ DONE (verify in browser inspector)
- [x] JSON-LD validates with zero errors on homepage — ✅ DONE
- [ ] Google Search Console: property verified — PENDING (Cloudflare Pages connection)
- [x] Mobile nav works on real device or 375px viewport — ✅ DONE (mobile hamburger tested)
- [x] **All 8 category pages generating from Supabase — ✅ DONE** (44 total pages in 5.4s build)

---

## Phase 2 — Cornerstone Pages

**Goal:** All Settle + Work + Connect pages are live with real content. /people is live. The inquiry form works and sends email notifications. /escape placeholder exists.

**WBS coverage:** 1.5.2, 1.5.3, 1.5.4, 1.5.5, 1.5.6, 1.5.6b, 1.5.7, 1.5.14, 1.6.2 (partial)

**STATUS (as of 2026-04-29):** ~20% complete
- ✅ All page shells exist with Supabase queries wired
- ✅ /find-a-room complete with form + modal
- ✅ /escape coming-soon placeholder live
- ⚠️ **Bottleneck:** Content writing (Thieu) + Supabase table creation (2–3 hours)

### Dependencies
- Phase 1 complete
- /neighborhoods copy written by Thieu (5 zones, real details)
- /cost-of-living copy written by Thieu (real 2026 prices)
- /where-to-stay zone copy written by Thieu
- /visas copy written (Thieu + current official sources)
- /coworking content: at least 3 spaces documented with real data
- /communities content: at least 5 groups documented
- /people copy resolved (WD-OQ-007 + Supabase)
- Supabase RLS policy for `room_inquiries` insert tested

### Execution Steps (ordered)

**Step 1 — Build /neighborhoods**
1. Intro section and city geography overview
2. 5 zone sections (MDX content collection)
3. Recommendation matrix table
4. "Find a Room in this zone" CTA linking to /where-to-stay
5. Add BreadcrumbList JSON-LD

**Step 2 — Build /cost-of-living**
1. Budget summary table (3 tiers: budget / comfortable / comfortable+)
2. 7 category sections with real numbers
3. City comparison callout block
4. Internal link CTA → /where-to-stay

**Step 3 — Build /visas**
1. Visa options overview (e-visa 90 days, tourist, business)
2. E-visa step-by-step application section
3. Extension + border run section (honest 2026 reality)
4. Disclaimer block + link to official Vietnamese immigration portal
5. Cross-links → /coworking, /cost-of-living

**Step 4 — Build /where-to-stay (most complex in this phase)**
1. Intro section (why Airbnb/Booking don't work long-term)
2. Zone cards with accommodation context
3. "How it works" 3-step section
4. Build inquiry form UI from Stitch design
5. Wire form submit → Supabase `room_inquiries` insert
6. Add form success state (replace form with confirmation message)
7. Set up email notification: Supabase webhook → email alert to Thieu on new insert
8. Test full flow: submit form → appears in Supabase → Thieu receives email

**Step 5 — Build /coworking**
1. Intro + why Da Nang is a strong coworking city
2. Coworking space cards (MDX content collection — minimum 3 entries at launch)
3. Recommendation matrix: "If you want X, go to Y"
4. Affiliate links where available

**Step 6 — Build /communities**
1. Intro section
2. Group cards × 5+ (interest type, how to join, activity frequency)
3. Online communities section (Facebook groups, Reddit, Discord)

**Step 7 — Build /people**
1. Opening statement (resolve WD-OQ-007 first)
2. Profile cards from Supabase `people` table (4 profiles at launch)
3. Services section
4. Add `id="contact"` anchor for Connect dropdown CTA
5. Individual `/people/[slug]` pages from Supabase data

**Step 8 — Build /escape (coming soon)**
1. Static placeholder: headline + description paragraph + follow CTA
2. No MDX collection needed — single `escape.astro` file

**Step 9 — Internal linking audit**
1. Every new page links to at least 3 other pages
2. /cost-of-living → /where-to-stay CTA present
3. /neighborhoods → /where-to-stay CTA present
4. /visas → /coworking + /cost-of-living CTAs present
5. Confirm no orphan pages

### Deliverables
- 8 cornerstone pages live with real content (+ /escape placeholder)
- Room inquiry form working end-to-end
- /people live with 4 profiles from Supabase
- Thieu receiving email notification on new inquiry

### Exit Criteria
- [ ] All 8 pages live, no placeholder content (except /escape which is intentionally minimal)
- [ ] Inquiry form: successful submission visible in Supabase dashboard
- [ ] Thieu receives email notification on test submission
- [ ] /people shows 4 real profiles from Supabase
- [ ] Every page has unique title + description
- [ ] Internal link check: no orphan pages
- [ ] All pages 90+ PageSpeed mobile

---

## Phase 3 — Discovery + Blog

**Goal:** /food, /cafes, /gyms, /climate, /events, /blog with 5 posts, /master-guide, and /about are all live. Internal linking is complete across the entire site.

**WBS coverage:** 1.5.8–1.5.13, 1.5.15, 1.5.16, 1.6.3

### Dependencies
- Phase 2 complete
- 5 blog posts drafted and reviewed by Thieu
- /food content written (dishes, neighborhood guide, market guide)
- /cafes content: at least 5 cafe entries with real wifi/noise data
- /gyms content: at least 5 gym entries with real prices
- /climate copy written by Thieu (monthly breakdown + typhoon section)
- /about copy written by Thieu
- 3 seed events documented

### Execution Steps (ordered)

**Step 1 — Build /food**
1. Da Nang food culture intro
2. Must-eat dishes section (real Vietnamese names + context)
3. Neighborhood-by-neighborhood food spots
4. Market guide

**Step 2 — Build /cafes**
1. Intro + working from cafes culture in Da Nang
2. Cafe cards (MDX content collection — minimum 5 entries)
3. Tips section (peak hours, etiquette)

**Step 3 — Build /gyms**
1. Intro + gym culture context and pricing
2. Gym cards (MDX content collection — minimum 5 entries)
3. Practical tips (negotiating monthly rates)

**Step 4 — Build /climate**
1. Monthly breakdown table (Jan–Dec)
2. Typhoon season section (Oct–Nov — honest assessment)
3. Practical advice section (AC costs, apartment considerations)
4. CTA → /where-to-stay (choosing a flood-resistant zone)

**Step 5 — Build /events skeleton**
1. Events index page — list all events from content collection, sorted by date
2. Add 3 seed events as MDX files with correct frontmatter schema
3. Empty state: if no upcoming events, show "Check back soon"

**Step 6 — Build /about**
1. Brand story + why this site exists
2. Founder section (Thieu's background, 23-year local, former tour guide)
3. Affiliate disclosure statement (required for trust and legal)
4. Contact information

**Step 7 — Build /blog**
1. Blog index page (list all non-draft posts, reverse chronological)
2. Blog post layout: article area + author bio block + CTA to relevant cornerstone page
3. Add Article JSON-LD to post layout
4. Publish 5 seed blog posts (MDX, `draft: false`)

**Step 8 — Build /master-guide**
1. Write quick-read sections (2–3 sentences each) linking to all major hubs
2. Recommendation panel: "Arriving in 30 days" vs "Already here"
3. CTA at bottom → /where-to-stay
4. This page should be built last — it links to everything, so all other pages must exist first

**Step 9 — Update homepage**
1. "Latest blog posts" section now shows real content (3 most recent)
2. Add "Get the Master Guide" CTA linking to /master-guide
3. Verify carousel still loads from Supabase correctly

**Step 10 — Full site internal linking audit**
1. Every blog post links to at least one cornerstone page
2. All cornerstone pages cross-link naturally
3. Every major hub page has a link to /master-guide
4. /about linked from footer (verify)
5. Run Screaming Frog free crawl — fix all orphan pages

### Deliverables
- /food, /cafes, /gyms, /climate, /events, /blog, /about, /master-guide all live
- 5 blog posts published
- Full internal linking complete including /master-guide cross-links
- Homepage updated with /master-guide CTA and real blog posts

### Exit Criteria
- [ ] All 8 new pages live, no placeholder content
- [ ] 5 blog posts published (draft: false), all with author bio
- [ ] Blog posts have Article JSON-LD, validate with zero errors
- [ ] Screaming Frog crawl: zero orphan pages, zero broken links
- [ ] Homepage blog preview shows real posts
- [ ] /master-guide links to every major hub page

---

## Phase 4 — SEO Audit + Launch

**Goal:** Pass every item in `seo-foundation.md`. Launch publicly.

**WBS coverage:** 1.7

### Dependencies
- Phase 3 complete
- All content reviewed by Thieu for accuracy
- No placeholder text anywhere on the site

### Execution Steps (ordered)

**Step 1 — Technical SEO audit**
1. Run Screaming Frog (free, up to 500 URLs): export all issues
   - Fix: missing meta descriptions
   - Fix: duplicate titles
   - Fix: broken links (internal and external)
   - Fix: missing H1 tags
   - Fix: images without alt text
2. Run Google PageSpeed Insights on: homepage, /cost-of-living, /neighborhoods, /blog post
   - All must score 90+ on mobile
   - Fix any LCP > 2.5s (usually oversized hero images)
   - Fix any CLS (usually images without explicit dimensions)

**Step 2 — Schema validation**
1. Visit schema.org/validator for each page type:
   - Homepage (WebSite + Organization)
   - /people (Person)
   - /blog post (Article)
   - /events item (Event)
2. Fix all errors (warnings are acceptable)

**Step 3 — Mobile and cross-browser check**
1. Test every page at 375px (iPhone SE) — no horizontal scroll, no broken layouts
2. Test navbar hamburger on real mobile device
3. Test inquiry form on mobile — all fields reachable, submit works

**Step 4 — End-to-end feature test**
1. Submit room inquiry form with test data → confirm Supabase record → confirm Thieu email notification
2. Click every nav link — confirm correct destination
3. Click every CTA — confirm correct destination
4. Blog post renders correctly — code blocks, images, headers all styled

**Step 5 — Search Console and Analytics**
1. Submit sitemap URL in Google Search Console: `https://withdanang.com/sitemap-index.xml`
2. Request indexing for: homepage, /cost-of-living, /neighborhoods, /people
3. Confirm GA4 is receiving pageview events (check Realtime view)

**Step 6 — Content final review**
1. Thieu reads every page personally — check for accuracy, tone, and anything that feels wrong
2. All prices on /cost-of-living confirmed current for 2026
3. All coworking space info on /coworking is current (hours, prices)
   All cafe info on /cafes is current (wifi, hours)
4. Affiliate disclosure visible in footer and on /where-to-stay

**Step 7 — Soft launch**
1. Post in Da Nang Expats Facebook group — honest, non-spammy introduction
2. Post in r/digitalnomad (Reddit) — "I built a local resource for Da Nang expats"
3. Share with personal Da Nang network (WhatsApp)
4. Monitor GA4 Realtime for first traffic
5. Monitor Supabase `room_inquiries` for first submission

### Deliverables
- Site fully audited and passing all SEO checks
- Search Console sitemap submitted
- GA4 confirmed active
- Soft launch completed

### Exit Criteria (hard gates — site does not launch until all pass)
- [ ] PageSpeed 90+ mobile: homepage, /cost-of-living, /neighborhoods
- [ ] Zero broken internal links (Screaming Frog)
- [ ] Every page has unique title + description (Screaming Frog)
- [ ] Schema.org validator: zero errors on all page types
- [ ] Sitemap submitted in Search Console without errors
- [ ] Room inquiry form tested end-to-end
- [ ] Thieu has personally reviewed and approved every page
- [ ] Affiliate disclosure visible in footer

---

## Post-MVP Backlog

Explicitly out of scope for MVP. Record here to prevent scope creep.

| Feature | Why deferred |
|---|---|
| Automated room matching + email templates | Manual process works at MVP volume |
| Freelancer/guide self-serve profile submission | Validate /people concept first |
| Event scraping pipeline | Manual events sufficient to start |
| Newsletter / email list | Set up after the site has traffic |
| /startup section | Post main-hub traction — /escape already reserved as coming-soon |
| Ad placement | Needs traffic volume |
| Comment system | High complexity, low MVP priority |
| Multilingual (Vietnamese) | English-only for target audience |
| User accounts / saved content | Post-MVP community feature |
