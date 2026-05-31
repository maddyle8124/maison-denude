# withdanang.com — Work Breakdown Structure

_Last updated: 2026-04-19_

A WBS decomposes the total project scope into deliverables. Every node is something that gets **produced**, not just done. Tasks are in `phases.md` and `products/main/tasks.md`.

---

## WBS Dictionary

| Code | Level | Description |
|---|---|---|
| 1.0 | Project | withdanang.com MVP |
| 1.X | Phase | Major project phase |
| 1.X.X | Deliverable Group | Category of deliverables within a phase |
| 1.X.X.X | Deliverable | Specific, tangible output |
| 1.X.X.X.X | Work Package | Atomic unit of work producing the deliverable |

---

## 1.0 withdanang.com MVP

```
1.0 withdanang.com MVP
│
├── 1.1 Vision & Strategy
│   ├── 1.1.1 Product vision document
│   ├── 1.1.2 Site architecture decision (path-based URLs) ✓ DONE
│   ├── 1.1.3 Site map and navigation structure ✓ DONE
│   ├── 1.1.4 Content strategy per page ✓ DONE
│   └── 1.1.5 SEO keyword map ✓ DONE (positioned in decisions.md)
│
├── 1.2 Design System
│   ├── 1.2.1 Brand Identity ✓ DONE
│   │   ├── 1.2.1.1 Color palette ✓ DONE (Ngũ Sắc in global.css)
│   │   ├── 1.2.1.2 Typography (heading + body fonts) ✓ DONE (Fraunces + Inter)
│   │   └── 1.2.1.3 Spacing and layout grid ✓ DONE (6-step scale)
│   ├── 1.2.2 Component Library (in Astro)
│   │   ├── 1.2.2.1 Navbar + mobile hamburger ✓ DONE
│   │   ├── 1.2.2.2 Footer ✓ DONE
│   │   ├── 1.2.2.3 Content cards (blog, gateway, event) ✓ DONE
│   │   ├── 1.2.2.4 Profile cards (/people, carousel) ✓ DONE (PersonCard.astro)
│   │   ├── 1.2.2.5 Community group cards ✓ DONE (reuse GatewayCard)
│   │   ├── 1.2.2.6 Form components (inputs, select, textarea, submit) — NOT STARTED
│   │   └── 1.2.2.7 Buttons, CTAs, badges ✓ DONE (Button, Badge, Tag)
│   └── 1.2.3 Page Designs (Astro components)
│       ├── 1.2.3.1  Homepage ✓ DONE (built + live)
│       ├── 1.2.3.2  /neighborhoods — SHELL MISSING
│       ├── 1.2.3.3  /cost-of-living — SHELL MISSING
│       ├── 1.2.3.4  /where-to-stay — SHELL MISSING
│       ├── 1.2.3.5  /work — SHELL MISSING
│       ├── 1.2.3.6  /communities — SHELL MISSING
│       ├── 1.2.3.7  /people ✓ DESIGN READY (blocked: Supabase + WD-OQ-007)
│       ├── 1.2.3.8  /food — SHELL MISSING
│       ├── 1.2.3.9  /events ✓ SCHEMA READY (skeleton page missing)
│       ├── 1.2.3.10 /blog index ✓ SCHEMA READY (index page missing)
│       ├── 1.2.3.11 /blog post (single) ✓ DONE (BlogPostLayout.astro)
│       └── 1.2.3.12 /about — SHELL MISSING
│
├── 1.3 Development Environment
│   ├── 1.3.1 Astro project created and running locally ✓ DONE (Astro 6.1.9 in main-dev/)`
│   ├── 1.3.2 GitHub repository (withdanang-web) ✓ DONE
│   ├── 1.3.3 Cloudflare project connected to GitHub ✓ DONE (deployed as page, connected with domain withdanang.com)
│   ├── 1.3.4 withdanang.com DNS pointed to Cloudflare — DONE
│   └── 1.3.5 .env configured (SUPABASE_URL, SUPABASE_ANON_KEY) — BLOCKED (Supabase not set up)
│
├── 1.4 Core Technical Infrastructure
│   ├── 1.4.1 Astro Base ✓ DONE
│   │   ├── 1.4.1.1 BaseLayout.astro (head, SEO meta slots, schema, analytics) ✓ DONE
│   │   ├── 1.4.1.2 PageLayout.astro (Navbar + Footer + slot) ✓ DONE
│   │   ├── 1.4.1.3 src/content/config.ts (Zod schemas: blog, events, neighborhoods) ✓ DONE
│   │   ├── 1.4.1.4 public/robots.txt ✓ DONE
│   │   ├── 1.4.1.5 src/pages/404.astro — PENDING
│   │   └── 1.4.1.6 @astrojs/sitemap configured ✓ DONE
│   ├── 1.4.2 Navigation ✓ DONE
│   │   ├── 1.4.2.1 Navbar.astro — desktop layout ✓ DONE
│   │   ├── 1.4.2.2 Navbar.astro — mobile hamburger ✓ DONE
│   │   └── 1.4.2.3 Footer.astro — links, affiliate disclosure ✓ DONE
│   └── 1.4.3 Supabase Integration — BLOCKED
│       ├── 1.4.3.1 people table created with schema — NOT STARTED
│       ├── 1.4.3.2 room_inquiries table created with schema — NOT STARTED
│       └── 1.4.3.3 Supabase JS client configured in Astro — NOT STARTED
│
├── 1.5 Pages & Features
│   ├── 1.5.1 Homepage ✓ DONE
│   │   ├── 1.5.1.1 Hero section (copy + layout) ✓ DONE (video parallax + persona cycler)
│   │   ├── 1.5.1.2 Content gateway (section cards with links) ✓ DONE (6 gateway cards)
│   │   ├── 1.5.1.3 "Meet the team" carousel ✓ READY (blocked: Supabase)
│   │   ├── 1.5.1.4 Latest blog posts preview ✓ READY (1 seed post exists)
│   │   └── 1.5.1.5 "Find a Room" CTA strip ✓ DONE
│   ├── 1.5.2 /people ✓ DESIGN READY (blocked: Supabase + WD-OQ-007)
│   │   ├── 1.5.2.1 Opening statement copy — BLOCKED (WD-OQ-007 unresolved)
│   │   ├── 1.5.2.2 Profile cards (Supabase fetch) ✓ COMPONENT READY
│   │   └── 1.5.2.3 Services section ✓ COMPONENT READY
│   ├── 1.5.3 /neighborhoods — SHELL MISSING (content ready)
│   │   ├── 1.5.3.1 Intro section
│   │   ├── 1.5.3.2 Zone sections × 5 (MDX content)
│   │   ├── 1.5.3.3 Recommendation matrix
│   │   └── 1.5.3.4 "Find a Room in this zone" CTA
│   ├── 1.5.4 /cost-of-living — SHELL MISSING
│   │   ├── 1.5.4.1 Budget summary table
│   │   ├── 1.5.4.2 Category breakdowns × 7
│   │   └── 1.5.4.3 City comparison callout
│   ├── 1.5.5 /where-to-stay — SHELL MISSING
│   │   ├── 1.5.5.1 Intro (why not Airbnb/Booking for long-term)
│   │   ├── 1.5.5.2 Zone cards with accommodation context
│   │   ├── 1.5.5.3 "How it works" 3-step section
│   │   ├── 1.5.5.4 Inquiry form UI ✓ COMPONENT READY
│   │   ├── 1.5.5.5 Form → Supabase insert — BLOCKED (Supabase)
│   │   ├── 1.5.5.6 Form success state ✓ DESIGN READY
│   │   └── 1.5.5.7 Thieu email notification — BLOCKED (Supabase webhook)
│   ├── 1.5.6 /work — SHELL MISSING
│   │   ├── 1.5.6.1 Internet + connectivity section
│   │   ├── 1.5.6.2 Co-working spaces list
│   │   └── 1.5.6.3 Visa basics section
│   ├── 1.5.7 /communities — SHELL MISSING
│   │   ├── 1.5.7.1 Intro section
│   │   ├── 1.5.7.2 Interest group cards × 5+ ✓ COMPONENT (GatewayCard reuse)
│   │   └── 1.5.7.3 Online communities section
│   ├── 1.5.8 /food — SHELL MISSING
│   │   ├── 1.5.8.1 Da Nang food culture intro
│   │   ├── 1.5.8.2 Must-eat dishes section
│   │   ├── 1.5.8.3 Neighborhood food guide
│   │   └── 1.5.8.4 Market guide
│   ├── 1.5.9 /events — SKELETON MISSING
│   │   ├── 1.5.9.1 Events index page ✓ SCHEMA READY
│   │   └── 1.5.9.2 3 seed events as MDX files
│   ├── 1.5.10 /blog — SKELETON MISSING
│   │   ├── 1.5.10.1 Blog index page ✓ SCHEMA READY
│   │   ├── 1.5.10.2 Post layout ✓ DONE (BlogPostLayout.astro)
│   │   └── 1.5.10.3 5 seed blog posts — 1 DONE, 4 PENDING
│   └── 1.5.11 /about — SHELL MISSING
│       ├── 1.5.11.1 Brand story + mission copy
│       ├── 1.5.11.2 Founder section with photo
│       └── 1.5.11.3 Affiliate disclosure statement
│
├── 1.6 Content Production
│   ├── 1.6.1 People profiles — BLOCKED (Supabase)
│   │   └── 1.6.1.1 4 profiles written and seeded in Supabase
│   ├── 1.6.2 Static page copy (all pages written + Thieu-reviewed)
│   │   ├── 1.6.2.1 Homepage hero + intro ✓ READY (in code)
│   │   ├── 1.6.2.2 /neighborhoods — 5 zones
│   │   ├── 1.6.2.3 /cost-of-living — full breakdown
│   │   ├── 1.6.2.4 /where-to-stay — zones + how it works
│   │   ├── 1.6.2.5 /work — co-working + internet + visa
│   │   ├── 1.6.2.6 /communities — 5+ group entries
│   │   ├── 1.6.2.7 /food — dishes + guide + markets
│   │   └── 1.6.2.8 /about — brand story + disclosure
│   └── 1.6.3 Blog posts
│       ├── 1.6.3.1 Post 1: Da Nang Expat Guide 2026 ✓ 1 SEED (why-da-nang-became...)
│       ├── 1.6.3.2 Post 2: Cost of Living 2026 (Real Numbers)
│       ├── 1.6.3.3 Post 3: Best Neighborhoods for Expats
│       ├── 1.6.3.4 Post 4: How to Find a Long-Term Apartment
│       └── 1.6.3.5 Post 5: Da Nang for Digital Nomads — Honest Review
│
└── 1.7 SEO, QA & Launch
    ├── 1.7.1 Technical SEO ✓ INFRASTRUCTURE READY
    │   ├── 1.7.1.1 Unique title + description on every page ✓ TEMPLATE READY (BaseLayout)
    │   ├── 1.7.1.2 Canonical tags on every page ✓ DONE (BaseLayout)
    │   ├── 1.7.1.3 Schema.org on all page types ✓ JSON-LD SLOT READY
    │   ├── 1.7.1.4 sitemap.xml live and correct ✓ CONFIGURED (@astrojs/sitemap)
    │   └── 1.7.1.5 robots.txt correct ✓ DONE
    ├── 1.7.2 Performance
    │   ├── 1.7.2.1 PageSpeed 90+ (mobile) — TESTING PENDING
    │   ├── 1.7.2.2 Core Web Vitals: LCP, CLS, INP — TESTING PENDING
    │   └── 1.7.2.3 All images WebP, alt text — PENDING
    ├── 1.7.3 Audit & QA
    │   ├── 1.7.3.1 Screaming Frog crawl — zero broken links — PENDING
    │   ├── 1.7.3.2 Schema.org validator — zero errors — PENDING
    │   ├── 1.7.3.3 Room inquiry form tested end-to-end — BLOCKED (Supabase)
    │   └── 1.7.3.4 Manual page-by-page review by Thieu — PENDING
    └── 1.7.4 Launch
        ├── 1.7.4.1 Google Search Console property verified — PENDING
        ├── 1.7.4.2 Sitemap submitted in Search Console — PENDING
        ├── 1.7.4.3 GA4 configured — PENDING
        └── 1.7.4.4 Soft launch (Da Nang expat Facebook groups + Reddit) — PENDING
```

---

## Current Completion Status (as of 2026-04-29)

**Phase 0 — Foundation:** ~95% complete
- ✅ Design system fully codified (Ngũ Sắc colors, Fraunces/Inter typography, 6-step spacing in global.css)
- ✅ Astro foundation + BaseLayout + PageLayout complete (Astro 6.1.9)
- ✅ 9+ core UI components built (Button, Badge, Card variants, RoomRequestModal, etc.)
- ✅ Cloudflare adapter installed, `output: 'server'` configured, GCS image domain allowlisted
- ✅ `src/lib/supabase.ts` factory created and tested, `@supabase/supabase-js` installed
- ✅ Blog content collection configured (MDX schema defined and working)
- ✅ All 17 page shells created (build passes with zero errors)
- ✅ All page Supabase queries wired and ready (8 entity tables)
- ⚠️ Supabase tables NOT created yet (9 tables pending creation)
- ⚠️ GCS bucket NOT created yet
- ⚠️ Cloudflare Pages project NOT connected; DNS not pointed

**Phase 1 — Core Shell:** ~95% complete (ready to launch pending decisions + Supabase tables)
- ✅ Homepage fully built and production-ready (hero + sections + CTAs)
- ✅ /find-a-room page complete (form + validation + Supabase submission)
- ✅ RoomRequestModal + form validation script fully implemented (321 lines)
- ✅ /escape coming-soon placeholder built
- ✅ 404 page implemented
- ✅ All navbar (4 dropdowns) + footer + SEO infrastructure done
- ✅ All page shells created and building successfully with Supabase queries
- ⚠️ Copy decisions (WD-OQ-004, 005, 007) still unresolved
- ⚠️ /people blocked on Supabase tables + WD-OQ-007 (opening statement)

---

## WBS Summary Table (with Completion Status)

| Code | Deliverable Group | Count | Phase | Status |
|---|---|---|---|---|
| 1.1 | Vision & Strategy | 5 deliverables | Pre-Phase 0 | ✓ 5/5 DONE |
| 1.2 | Design System | 27 deliverables | Phase 0 | ✓ 27/27 DONE (all components built) |
| 1.3 | Dev Environment | 5 deliverables | Phase 0 | ✓ 3/5 (Cloudflare Pages + DNS pending) |
| 1.4 | Core Infrastructure | 17 deliverables | Phase 0–1 | ✓ 12/17 (Supabase client ✓, tables pending; GCS bucket pending) |
| 1.5 | Pages & Features | 51 deliverables | Phase 1–3 | ✓ 28/51 (all shells + queries wired ✓; body content pending) |
| 1.6 | Content Production | 18 deliverables | Phase 2–3 | ✓ 1/18 (1 blog post ✓; 4 more + all page copy pending) |
| 1.7 | SEO, QA & Launch | 14 deliverables | Phase 4 | ✓ 5/14 (infrastructure ✓; testing pending) |
| **Total** | | **132 deliverables** | | **✓ 81/132 (~60% complete)** |

**Key Blockers:** 
1. **Copy decisions** (WD-OQ-004, 005, 007) — 30 min decision call needed
2. **Supabase table creation** (9 tables) — 2–3 hours setup
3. **Cloudflare Pages connection + DNS** — infrastructure only
4. **Content writing** (Thieu) — /neighborhoods, /cost-of-living, /work, /food, /about, /blog posts, etc.

---

## Critical Path

The longest chain of dependencies that determines the earliest possible launch date:

```
Brand identity (1.2.1)
  → Component library in Stitch (1.2.2)
    → Page designs in Stitch (1.2.3)
      → Design tokens extracted to Astro (1.4.1)
        → Navbar + Footer (1.4.2)
          → Homepage shell (1.5.1)
            → All pages shell complete
              → Content written + reviewed (1.6)
                → SEO audit (1.7.3)
                  → Launch (1.7.4)
```

**Bottleneck:** Content review by Thieu. Every page must be fact-checked by someone with local knowledge. This is the only step that cannot be delegated to an AI agent. Plan for this time explicitly.

**Parallel workstreams** (can happen simultaneously):
- Stitch design work ↔ Supabase table setup
- Content writing (blog posts) ↔ page development
- SEO meta writing ↔ page component development
