# withdanang.com — MVP Plan Overview

_Last updated: 2026-04-24_

## Goal

Ship a **production-grade** withdanang.com that:
- Passes a full technical SEO audit before going live
- Has enough cornerstone content to earn organic traffic from day one
- Converts room inquiries and affiliate clicks
- Can be operated and scaled primarily by AI agents with human curation

This is not a prototype. It goes live once and goes live right.

---

## Locked Constraints

| Constraint | Decision |
|---|---|
| Tech stack | Astro 6 + `@astrojs/cloudflare` adapter |
| Rendering | `output: 'server'` — entity pages SSR, blog + guide pages `prerender = true` |
| Deployment | Cloudflare Pages (build cmd: `npm run build`, output: `dist`) |
| Entity data | Supabase (9 tables) — no MDX collections for entity types |
| Images | Google Cloud Storage — public URLs stored as `text` in Supabase `image_url` |
| Content collections | `blog` only — events, neighborhoods, gyms, etc. removed from Astro collections |
| Frontend design | Google Stitch → HTML export → converted to Astro components |
| Content ops | Entity data entered via Supabase dashboard; blog posts written as MDX |
| URL architecture | Path-based on withdanang.com — no subdomains at MVP |
| URL-UI decoupling | Nav dropdowns are ghost categories with no URL. Entity hubs are flat (`/gyms`, `/coworking`). Breadcrumbs follow entity hub, not dropdown label. |
| Where to stay model | Concierge — user fills form, Thieu emails room list manually |
| Food product | Lives at `/food` inside main site, not a separate domain |
| Blog | Starting from scratch — no existing content |
| Events | Skeleton at launch, manual curation, no scraping yet |
| Design | Starting from zero in Stitch — not designed yet |

---

## Site Map

| Page | Rendering | Data source | Nav location |
|---|---|---|---|
| Homepage | SSR | Supabase `people` | Logo |
| /master-guide | Prerendered | MDX | Homepage CTA + cross-site links |
| /neighborhoods | SSR | Supabase `neighborhoods` | Settle |
| /cost-of-living | Prerendered | MDX | Settle |
| /visas | Prerendered | MDX | Settle |
| /where-to-stay | SSR | Form → Supabase `room_inquiries` | Settle CTA |
| /food | SSR | Supabase `food_spots` | Daily Life |
| /gyms | SSR | Supabase `gyms` | Daily Life |
| /climate | Prerendered | MDX | Daily Life |
| /escape | Prerendered | None (coming-soon) | Daily Life CTA |
| /coworking | SSR | Supabase `coworking_spaces` | Work |
| /cafes | SSR | Supabase `cafes` | Work |
| /communities | SSR | Supabase `communities` | Connect |
| /events | SSR | Supabase `events` | Connect |
| /people | SSR | Supabase `people` | Connect |
| /blog | SSR index + prerendered posts | MDX content collection | Blog (top nav) |
| /about | Prerendered | MDX | Footer only |

## Navigation Structure

```
[Logo]   Settle ▾   Daily Life ▾   Work ▾   Connect ▾   Blog   [Find a Room →]
```

Dropdown labels are **ghost categories** — they have no URL of their own. Breadcrumbs follow the entity hub, not the dropdown label (e.g., `Home > Coworking > Enouvo Space`, never `Home > Work > Coworking > Enouvo Space`).

- **Settle** (no URL) → /cost-of-living, /neighborhoods, /visas, [CTA] /where-to-stay
- **Daily Life** (no URL) → /food, /gyms, /climate, [CTA] /escape (coming soon)
- **Work** (no URL) → /coworking, /cafes, [CTA] external builder community link
- **Connect** (no URL) → /communities, /events, /people, [CTA] /people#contact
- **Blog** → /blog
- **"Find a Room"** → CTA button, links to /where-to-stay
- `/master-guide` → linked from homepage CTA and in-page cross-links, not in main nav
- `/about` → footer only

---

## Phase Map

| Phase | Name | Key Deliverable | Status |
|---|---|---|---|
| 0 | Foundation | Stitch designs done, Astro scaffolded, schemas defined, Supabase wired | NOT STARTED |
| 1 | Core Shell | Homepage + nav/footer + all SEO plumbing live in production | NOT STARTED |
| 2 | Cornerstone Pages | All Settle + Work + Connect pages live, /people live, inquiry form working | NOT STARTED |
| 3 | Discovery + Blog | /food, /cafes, /gyms, /climate, /events, /blog with 5 posts, /master-guide, internal linking complete | NOT STARTED |
| 4 | SEO Audit + Launch | Full audit passed, Search Console verified, sitemap submitted, soft launch | NOT STARTED |

See `phases.md` for full milestone breakdown and exit criteria per phase.

---

## Plan Files

| File | What it answers |
|---|---|
| `vision.md` | Product vision, brand voice, design direction, open vision questions |
| `wbs.md` | Work Breakdown Structure — 107 deliverables, critical path |
| `phases.md` | Phase execution steps (ordered) with hard exit criteria per phase |
| `architecture.md` | Astro project structure, Supabase schema, AI agent file conventions |
| `seo-foundation.md` | Complete production-grade SEO checklist |
| `content-strategy.md` | Page-by-page keyword targets, content priorities, blog strategy |

## Context Files Updated by This Plan

| File | What was added |
|---|---|
| `products/main/decisions.md` | WD-004 through WD-013 — all architectural decisions from planning session |
| `products/main/vision.md` | Full product vision with brand voice and 12-month success milestones |
| `products/main/features.md` | WD-F001 through WD-F021 — all MVP and post-MVP features |
| `products/main/tasks.md` | WD-T005 through WD-T046 — all tasks with phase + WBS references |
| `products/main/open-questions.md` | OQ-001 and OQ-002 closed; OQ-004 through OQ-007 opened |
