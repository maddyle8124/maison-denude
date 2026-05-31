# Main Hub — Decisions

_Append-only. Reversed decisions move to the Reversed section below. Last updated: 2026-04-24._

## ⚠️ CRITICAL: Unresolved Open Questions Blocking Phase 1

**These must be decided before Phase 1 can launch (WD-OQ-004, 005, 007 in open-questions.md):**
1. **Voice/tone decision** — first person ("I've lived here 23 years") or brand voice ("WithDaNang recommends")? 
2. **Hero statement** — one-liner for homepage (currently placeholder "Enjoy life withdanang")
3. **/people opening statement** — intro copy for team page

**Action:** 30-min call with Thieu to resolve. Once decided, log 3 new rows below.

---

## Active Decisions

| # | Date | Decision | Rationale | Alternatives Rejected | Confidence |
|---|------|----------|-----------|----------------------|------------|
| WD-001 | 2026-04-13 | Launch withdanang.com main hub as the MVP before any subdomain products | Main hub builds SEO domain authority that all subdomains inherit; generates first traffic proof before investing in niche products | Launch stay.withdanang.com first (highest affiliate revenue); launch all simultaneously | High |
| WD-002 | 2026-04-13 | Target expats and long-stay visitors (1+ month), not short-term tourists | Long-stay users have higher intent, higher LTV for affiliates, and need deeper content — tourist content is already over-supplied | Target all tourists; target Vietnamese locals | High |
| WD-003 | 2026-04-13 | Revenue model: affiliate commissions first, ad placement second | Affiliate is lower friction to start (no minimum traffic requirements); ads layered on once traffic justifies | Ads-only; paid subscriptions; sponsored content | High |
| WD-004 | 2026-04-19 | Path-based URL routing — no subdomains at MVP | New domain has zero authority. Every page on withdanang.com/[section] contributes to one domain score. Subdomains are treated as separate sites by Google — splitting authority on a new domain is the worst possible SEO move. Migrate to subdomains only after authority is established. | stay.withdanang.com, escape.withdanang.com, food.withdanang.com as separate subdomains | High |
| WD-005 | 2026-04-19 | Food product lives at /food inside main site — no separate domain | Keeps SEO authority consolidated on withdanang.com. Food section seeds content for a potential future food product without sacrificing domain authority. | food.withdanang.com; eat.withdanang.com; taste.withdanang.com | High |
| WD-006 | 2026-04-19 | Where to Stay model: concierge — user fills inquiry form, Thieu emails curated room list manually | Zero technical complexity at MVP. No booking UI, no inventory management. Thieu earns commission from landlords on successful placements. Can be automated post-MVP. | Direct booking UI on site; Airbnb/Booking affiliate links only; no accommodation feature at MVP | High |
| WD-007 | 2026-04-19 | Database: Supabase for dynamic data only (people table, room_inquiries table) | Already in .env. All static content (blog, guides, neighborhoods) stays as MDX files — no DB round-trips for static content. | Full CMS (Contentful, Sanity); all-MDX; custom database | High |
| WD-008 | 2026-04-19 | Framework: Astro with content collections and Zod schemas | Static-first output for Core Web Vitals. Built-in content collections with type-safe schemas allow AI agents to write MDX with automatic validation. Framework-agnostic for future component needs. | Next.js; plain HTML; WordPress | High |
| WD-009 | 2026-04-19 | Deployment: Vercel + GitHub | Zero-config for Astro. Preview deployments on every PR. Free tier covers MVP traffic. | Netlify; self-hosted; Cloudflare Pages | High |
| WD-010 | 2026-04-19 | /people and /communities are separate pages with distinct purposes | /people = the withdanang.com team and affiliates (internal trust signal). /communities = Da Nang interest groups that expats can join (external resource). Different audiences, different content, different SEO targets. | Single "Community" page combining both; /about page covering the team | High |
| WD-011 | 2026-04-19 | Events: skeleton at launch, manual MDX curation — no scraping pipeline at MVP | Scraping pipeline adds complexity and maintenance burden. Manual curation is good enough for MVP and keeps events accurate. Automated pipeline is a post-MVP improvement. | Automated scraping from Vietnamese event sources; no events section at launch | High |
| WD-012 | 2026-04-19 | Blog: starting from scratch — no existing content to migrate | No existing content exists. First 5 posts are defined in content-strategy.md and target the highest-value cornerstone keywords. | Migrate Vietnamese content; buy existing blog | High |
| WD-013 | 2026-04-19 | Frontend design workflow: Google Stitch → HTML export → convert to Astro components | Stitch produces clean HTML that translates directly to .astro files. Allows rapid visual iteration before any code is written. | Design in Figma then hand-code; Tailwind-first development; shadcn/ui component library | Medium |
| WD-014 | 2026-04-21 | Room finder operates in informal landlord market only — no OTA competition | Landlords already on Airbnb/Booking are captured and won't yield better deals. Informal landlords (want 2-6 month stable tenants, avoid OTA fees and tourist turnover) are completely uncontested and only accessible through local trust. Thieu's personal landlord relationships are the moat. Year 1: nurture relationships. Year 2: formalize as a service. | OTA affiliate model; building a listing platform; Airbnb arbitrage | High |
| WD-015 | 2026-04-21 | Primary affiliate targets: co-working referrals + nomad services (SafetyWing, Wise, VPN, SIM) | Co-working spaces have no OTA equivalent dominating the space and actively need nomad clients — direct referral deals are viable. Nomad services are universal week-one purchases that embed naturally into /work and /cost-of-living without interrupting the editorial voice. | Room-based OTA affiliate; Google AdSense as primary; brand sponsorships | High |
| WD-016 | 2026-04-21 | B2B business listings: build traffic first, pitch local businesses end of 2026 | No traffic = no leverage in a B2B pitch. Approach local businesses targeting expats once withdanang.com can show real visitor numbers. No listing infrastructure needed at MVP — this is a sales motion, not a product feature at this stage. | Pre-launch pitches; building a self-serve listing portal at MVP | High |
| WD-017 | 2026-04-21 | Deprioritize community membership, digital products (PDF/calls), and relocation concierge from revenue model | Each requires separate infrastructure or Thieu's personal time that doesn't scale at MVP volume. Effort-to-revenue ratio is poor compared to passive affiliate + B2B listings. Revisit if traction validates demand. | Paid Discord community; downloadable city guide PDF; paid consultation bookings | High |
| WD-018 | 2026-04-30 | Adopted soft shape token system as foundational UI change | Sharp square-cornered UI reads as "tech dashboard" — misaligns with the boutique concierge brand positioning. Rounded shapes signal warmth and hospitality without changing any color or typography. | Keeping sharp corners; redesigning entire visual identity; using hardcoded border-radius values | High |

## Reversed Decisions

_None yet._
