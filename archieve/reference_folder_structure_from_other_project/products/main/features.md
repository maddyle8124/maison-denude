# Main Hub — Features

_Status lifecycle: Shaping → Approved → In Dev → Testing → Live → Deprecated | Rejected_
_Last updated: 2026-04-19_

## Live

| ID | Feature | Notes |
|----|---------|-------|
| WD-F001 | Homepage | ✓ LIVE (hero, sections, team carousel template, blog preview, CTA strip) |
| WD-F012 | Room inquiry form | ✓ LIVE (full form on /find-a-room, validation + Supabase submission) |
| WD-F013 | SEO infrastructure | ✓ LIVE (sitemap, robots.txt, meta, OG, JSON-LD, GA4) |
| WD-F014 | Global navigation | ✓ LIVE (Navbar with dropdowns, mobile hamburger, footer) |

## In Development

| ID | Feature | Status |
|----|---------|--------|
| WD-F002 | /people | Supabase queries wired; blocked by WD-OQ-007 (opening statement) |
| WD-F003–F008 | /neighborhoods, /cost-of-living, /where-to-stay, /work, /communities, /food | Shell pages + Supabase queries wired; body content + card grids pending |
| WD-F009–F010 | /events, /blog | Shells ready, 1 blog post live; 4 more posts + seed events needed |
| WD-F011 | /about | Shell ready; copy pending |

## Approved (MVP Scope)

| ID | Feature | Description | WBS | Phase | Owner | Notes |
|----|---------|-------------|-----|-------|-------|-------|
| WD-F001 | Homepage | Content gateway with hero, section cards, team carousel, latest posts, CTA strip | 1.5.1 | 1 | Thieu | Team carousel fetches from Supabase people table |
| WD-F002 | /people | Team + affiliate profile directory with services; fetches from Supabase | 1.5.2 | 1 | Thieu | 4 profiles at launch. Post-MVP: self-serve submission |
| WD-F003 | /neighborhoods | 5 Da Nang zones with vibe, rent range, expat density, recommendation matrix | 1.5.3 | 2 | Thieu | Content from Thieu's local knowledge |
| WD-F004 | /cost-of-living | Monthly budget breakdown by category with real 2026 prices, city comparison | 1.5.4 | 2 | Thieu | Review every 6 months — prices change |
| WD-F005 | /where-to-stay | Zone descriptions + inquiry form (concierge model) | 1.5.5 | 2 | Thieu | Form → Supabase room_inquiries → email notification to Thieu |
| WD-F006 | /work | Co-working spaces, internet quality, visa basics | 1.5.6 | 2 | Thieu | Keep co-working list current (hours, prices change) |
| WD-F007 | /communities | Curated directory of Da Nang interest groups (volleyball, coding, hiking, surfing, etc.) | 1.5.7 | 2 | Thieu | Online + offline groups. Start with Thieu's network. |
| WD-F008 | /food | Da Nang food culture, must-eat dishes, neighborhood food guide, market guide | 1.5.8 | 3 | Thieu | No affiliate at launch. Content-first. |
| WD-F009 | /events skeleton | Manual MDX event list, no scraping, no RSVP | 1.5.9 | 3 | Thieu | Post-MVP: automated scraping pipeline |
| WD-F010 | /blog | MDX content collections with author bio, Article schema, 5 seed posts at launch | 1.5.10 | 3 | Thieu | AI drafts, Thieu reviews and approves |
| WD-F011 | /about | Brand story, founder background, affiliate disclosure | 1.5.11 | 3 | Thieu | Footer-only navigation. E-E-A-T critical page. |
| WD-F012 | Room inquiry form | Form on /where-to-stay → Supabase insert → email notification → Thieu manually responds | 1.5.5.4–7 | 2 | Thieu | Fields: name, email, budget, zones, move-in, duration, room type, notes |
| WD-F013 | SEO infrastructure | sitemap.xml, robots.txt, BaseLayout meta tags, JSON-LD schema per page type, GA4 | 1.7.1 | 0–1 | Thieu | Must be complete before Phase 1 exits |
| WD-F014 | Global navigation | Responsive navbar with dropdowns, mobile hamburger, "Find a Room" CTA button | 1.4.2 | 0 | Thieu | Structure defined in plan/_overview.md |

## Shaping (Post-MVP)

| ID | Feature | Description | Trigger to build |
|----|---------|-------------|-----------------|
| WD-F015 | Automated room matching | AI matches inquiry form inputs to available rooms, sends email template | When room inquiry volume > 5/week |
| WD-F016 | Local guide self-serve profiles | Vietnamese freelancers/tour guides submit their own profiles to /people | When /people concept validated with first 4 profiles |
| WD-F017 | Event scraping pipeline | Automated Vietnamese source → translate → filter → publish events | When manual event curation takes > 2hr/week |
| WD-F018 | /escape section | Hidden places, off-tourist-path Da Nang | When main hub reaches 1,000 monthly organic visitors |
| WD-F019 | /startup section | Builder community, meetups, legal setup info | When main hub reaches 1,000 monthly organic visitors |
| WD-F020 | Newsletter | Email list with weekly Da Nang updates | After the site has consistent returning traffic |
| WD-F021 | Ad placement | Contextual display advertising | When organic traffic justifies (minimum 5,000/month) |

## Rejected

_None yet._
