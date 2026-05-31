# Main Hub — Tasks

_Last updated: 2026-04-19_

Task IDs use prefix WD-T. Phases from `plan/phases.md`. WBS codes from `plan/wbs.md`.

## Active Tasks

| ID | Task | Type | Status | Priority | Phase | WBS | Assignee | Notes |
|----|------|------|--------|----------|-------|-----|----------|-------|
| WD-T005 | Answer open vision questions in plan/vision.md | Decision | Open | P0 | 0 | 1.1 | Thieu | First person vs. brand voice? Homepage hero statement? |
| WD-T006 | Define brand color palette and typography in Stitch | Design | ✓ Done | P0 | 0 | 1.2.1 | Thieu | ✓ Ngũ Sắc + Fraunces/Inter in global.css |
| WD-T007 | Build component library in Stitch | Design | ✓ Done | P0 | 0 | 1.2.2 | Thieu | ✓ All components built in Astro |
| WD-T008 | Design all 12 pages in Stitch | Design | ✓ Done | P0 | 0 | 1.2.3 | Thieu | ✓ All 17 page shells created |
| WD-T009 | Scaffold Astro project | Dev | ✓ Done | P0 | 0 | 1.3.1 | Thieu | ✓ Astro 6.1.9 running, Cloudflare adapter |
| WD-T010 | Create GitHub repo and connect to Vercel | Dev | ✓ Done | P0 | 0 | 1.3.2–1.3.3 | Thieu | ✓ GitHub repo created (withdanang-web) |
| WD-T011 | Define Zod schemas in src/content/config.ts | Dev | ✓ Done | P0 | 0 | 1.4.1.3 | Thieu | ✓ Blog schema defined |
| WD-T012 | Build BaseLayout.astro with full SEO meta slots | Dev | ✓ Done | P0 | 0 | 1.4.1.1 | Thieu | ✓ Complete with meta, OG, JSON-LD, analytics |
| WD-T013 | Create Supabase people + room_inquiries tables | Dev | Open | P0 | 0 | 1.4.3.1–2 | Thieu | Schema defined; tables not yet created |
| WD-T014 | Seed 4 people profiles in Supabase | Content | Open | P0 | 0 | 1.6.1.1 | Thieu | Blocked by Supabase table creation |
| WD-T015 | Convert Stitch Navbar + Footer HTML to Astro | Dev | ✓ Done | P0 | 0 | 1.4.2 | Thieu | ✓ Navbar + Footer built, mobile hamburger working |
| WD-T016 | Point withdanang.com DNS to Cloudflare Pages | Infra | Open | P0 | 0 | 1.3.4 | Thieu | Cloudflare Pages project created, DNS pending |
| WD-T017 | Write Homepage copy | Content | ✓ Done | P0 | 1 | 1.6.2.1 | Thieu | ✓ Homepage built with real content |
| WD-T018 | Write /people opening statement | Content | Open | P0 | 1 | 1.5.2.1 | Thieu | **BLOCKING** — copy decision (WD-OQ-007) |
| WD-T019 | Build Homepage (all 5 sections) | Dev | ✓ Done | P1 | 1 | 1.5.1 | Thieu | ✓ Homepage complete with all sections |
| WD-T020 | Build /people page | Dev | Open | P1 | 1 | 1.5.2 | Thieu | Blocked by WD-OQ-007 + Supabase tables |
| WD-T021 | Wire BaseLayout SEO plumbing and verify | Dev | ✓ Done | P1 | 1 | 1.7.1 | Thieu | ✓ All meta, OG, JSON-LD wired |
| WD-T022 | Write /neighborhoods copy (5 zones) | Content | Open | P1 | 2 | 1.6.2.2 | Thieu | Real prices, real street names, honest vibe descriptions |
| WD-T023 | Write /cost-of-living copy (2026 prices) | Content | Open | P1 | 2 | 1.6.2.3 | Thieu | Real numbers — review every 6 months |
| WD-T024 | Write /where-to-stay zone copy + how-it-works | Content | Open | P1 | 2 | 1.6.2.4 | Thieu | ✓ Shell ready, form component complete |
| WD-T025 | Write /work copy (co-working + internet + visa) | Content | Open | P1 | 2 | 1.6.2.5 | Thieu | |
| WD-T026 | Document 5+ Da Nang community groups for /communities | Content | Open | P1 | 2 | 1.6.2.6 | Thieu | Start with Thieu's personal network |
| WD-T027 | Build /neighborhoods page | Dev | ✓ Partial | P2 | 2 | 1.5.3 | Thieu | ✓ Shell + Supabase query wired; body sections pending |
| WD-T028 | Build /cost-of-living page | Dev | ✓ Partial | P2 | 2 | 1.5.4 | Thieu | ✓ Shell ready; content pending |
| WD-T029 | Build /where-to-stay page + inquiry form | Dev | ✓ Done | P2 | 2 | 1.5.5 | Thieu | ✓ Form complete with validation + Supabase submit |
| WD-T030 | Set up Supabase inquiry notification to Thieu | Dev | Open | P2 | 2 | 1.5.5.7 | Thieu | Webhook or Supabase email alert (after table created) |
| WD-T031 | Build /work page | Dev | ✓ Partial | P2 | 2 | 1.5.6 | Thieu | ✓ Shell ready; content pending |
| WD-T032 | Build /communities page | Dev | ✓ Partial | P2 | 2 | 1.5.7 | Thieu | ✓ Shell + Supabase query wired; card sections pending |
| WD-T033 | Write /food copy (dishes + guide + markets) | Content | Open | P2 | 3 | 1.6.2.7 | Thieu | |
| WD-T034 | Write /about copy | Content | Open | P2 | 3 | 1.5.11 | Thieu | Brand story, founder credentials, affiliate disclosure |
| WD-T035 | Draft 5 seed blog posts (AI-assisted) | Content | Open | P2 | 3 | 1.6.3 | Thieu | Thieu reviews and approves all 5 before publishing |
| WD-T036 | Build /food page | Dev | ✓ Partial | P3 | 3 | 1.5.8 | Thieu | ✓ Shell + Supabase query wired; card sections pending |
| WD-T037 | Build /events skeleton page | Dev | ✓ Partial | P3 | 3 | 1.5.9 | Thieu | ✓ Shell + Supabase query wired; seed events pending |
| WD-T038 | Build /blog index + post layout | Dev | ✓ Done | P3 | 3 | 1.5.10 | Thieu | ✓ Blog layout + index page ready, 1 seed post |
| WD-T039 | Publish 5 seed blog posts | Content | ✓ Partial | P3 | 3 | 1.6.3 | Thieu | ✓ 1 post published; 4 more needed |
| WD-T040 | Build /about page | Dev | ✓ Partial | P3 | 3 | 1.5.11 | Thieu | ✓ Shell ready; content pending |
| WD-T041 | Run Screaming Frog crawl, fix all issues | SEO | Open | P1 | 4 | 1.7.3.1 | Thieu | |
| WD-T042 | PageSpeed Insights — all key pages 90+ mobile | SEO | Open | P1 | 4 | 1.7.2.1 | Thieu | |
| WD-T043 | Schema.org validator — zero errors all page types | SEO | Open | P1 | 4 | 1.7.3.2 | Thieu | |
| WD-T044 | Submit sitemap in Google Search Console | SEO | Open | P1 | 4 | 1.7.4.2 | Thieu | |
| WD-T045 | Thieu personal review of all pages | Review | Open | P0 | 4 | 1.7.3.4 | Thieu | Hard gate before launch |
| WD-T046 | Soft launch — post in expat Facebook groups + Reddit | Launch | Open | P0 | 4 | 1.7.4.4 | Thieu | Da Nang Expats FB group + r/digitalnomad |

## Completed Tasks

| ID | Task | Completed | Notes |
|----|------|-----------|-------|
| WD-T001 | Resolve subdomain vs. merged site architecture (OQ-001) | 2026-04-19 | Resolved: path-based. See WD-004. |
| WD-T002 | Define content categories for main hub | 2026-04-19 | All sections defined in plan/_overview.md |
| WD-T003 | Name the food product subdomain/section | 2026-04-19 | Resolved: /food inside main site. See WD-005. |
| WD-T004 | Document team member 2 and 3 in team.md | 2026-04-19 | 4 people confirmed at launch. Seed in Supabase (WD-T014). |
| WD-T006–T012, T015, T017, T019, T021 | Phase 0 design + dev | 2026-04-29 | All foundation work complete; Supabase tables still pending |
| WD-T029 | Build /where-to-stay page + inquiry form | 2026-04-29 | ✓ DONE — form with validation + Supabase submission |
| WD-T038 | Build /blog index + post layout | 2026-04-29 | ✓ DONE — Article schema + author bio block |

## Blocked Tasks

_None currently._
