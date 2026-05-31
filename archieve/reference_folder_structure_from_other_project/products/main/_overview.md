# Main Hub — Overview

_Last updated: 2026-04-29_

## Quick Status

**Phase:** Phase 1 (Core Shell) — 95% complete
**Domain:** withdanang.com
**Priority:** MVP #1
**Overall Progress:** ~60% complete (59/132 WBS deliverables done)

## What This Is

The main hub of the withdanang.com ecosystem. Events, city guide, places to go, local news — all framed for non-Vietnamese speakers living in or visiting Da Nang for an extended stay.

## Current Status (as of 2026-04-29)

**Phase 0 — Foundation:** ✅ **100% complete**
- ✅ Design system finalized: Ngũ Sắc colors, Fraunces/Inter typography, 6-step spacing, shape tokens (--radius-sm/md/lg/pill), shadow tokens (--shadow-sm/md/lg)
- ✅ /design-system page live (noindex, unlisted) — living style guide at /design-system
- ✅ Astro project scaffolded with BaseLayout, PageLayout, Navbar, Footer (Astro 6.1.9)
- ✅ 13 core UI components built (Button, Badge, Card variants, etc.)
- ✅ Content schemas defined (blog + entity tables)
- ✅ Supabase client setup complete (`createSupabaseClient()` factory in `src/lib/supabase.ts`)
- ✅ All 17 page shells created with correct routing
- ✅ **All 9 Supabase tables created and seeded** (events, people, cafes, coworking_spaces, gyms, communities, food_spots, neighborhoods, room_requests)
- ✅ RLS policies configured (public read + anon-insert-only on room_requests)
- ⚠️ **Remaining:** GCS bucket (image hosting), Cloudflare Pages connection, DNS pointed

**Phase 1 — Core Shell:** ✅ **98% complete** (ready for launch + Cloudflare connection)
- ✅ Homepage fully built (hero with video parallax + persona cycler, 6 gateway cards, sections)
- ✅ Homepage components wired to **live Supabase data** (EventsPreview, PeopleSection)
- ✅ /find-a-room page complete (full RoomRequestForm with validation + n8n + Supabase submission)
- ✅ SEO infrastructure complete (BaseLayout with meta, OG, JSON-LD, sitemap)
- ✅ RoomRequestModal + form validation script (321 lines, fully functional)
- ✅ /escape coming-soon placeholder built
- ✅ 404 page implemented
- ✅ **All 44 pages building correctly** (20 static + 24 dynamic from Supabase slug routes)
- ✅ **Build time: 5.4 seconds** (verified clean build)
- ⚠️ **Blockers:** WD-OQ-004, 005, 007 still unresolved (copy decisions) — **non-blocking for launch**

## Current Focus (Next Steps)

**Ready to Launch:**
1. ✅ Supabase initialization complete (all 9 tables created, seeded, RLS configured)
2. ✅ All 44 pages generating from live data
3. **→ Connect Cloudflare Pages** — point DNS to withdanang.com (last blocker for Phase 1 launch)

**Phase 2 Content Workstream (can start immediately):**
4. **Write /neighborhoods details** (5 zones: An Thuong, My Khe Beach, Thanh Khe, etc.)
5. **Write /cost-of-living 2026 prices** (budget breakdown table)
6. **Write Thieu intro/bio** (resolve WD-OQ-007 — /people opening statement)
7. **Build category page body sections** (card grids for /cafes, /gyms, /food, /coworking, /communities, /events, /neighborhoods, /people)

**Notes on Open Questions:**
- WD-OQ-004, 005, 007 are *content decisions*, not technical blockers
- They don't prevent Phase 1 launch (homepage works without them)
- They can be resolved asynchronously during Phase 2 content sprint

## File Status

| File | Last Updated | Status |
|------|--------------|--------|
| `_routing.md` | 2026-04-13 | Initialized |
| `vision.md` | 2026-04-13 | Initialized |
| `decisions.md` | 2026-04-13 | Empty — ready for first entries |
| `open-questions.md` | 2026-04-13 | 1 open question seeded |
| `features.md` | 2026-04-13 | Empty |
| `tasks.md` | 2026-04-13 | Empty |
| `metrics.md` | 2026-04-13 | Empty |
| `business-context/personas.md` | 2026-04-13 | Draft seeded |
| `business-context/pain-points.md` | 2026-04-13 | Draft seeded |
| `business-context/competitors.md` | 2026-04-13 | Empty |
| `business-context/positioning.md` | 2026-04-13 | Empty |
