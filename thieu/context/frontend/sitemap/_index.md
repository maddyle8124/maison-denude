# Sitemap — Per-Page Specs

> Spec-driven development: each page below has a dedicated spec file that is the **single source of truth** for building that page. Build from the spec; if reality forces a change, update the spec (or log a decision) — never silently diverge.

## This effort (Preview + Booking) — D-SCOPE-01

| Page | Path | prerender | Spec | Status |
|------|------|-----------|------|--------|
| Landing | `/` | `true` (static) | [`landing.md`](./landing.md) | spec ready |
| Booking | `/booking` | `true` shell; action on Worker | [`booking.md`](./booking.md) | spec ready |

## Deferred (next effort) — D-SCOPE-02, specs to be written then

| Page | Path | prerender | Notes |
|------|------|-----------|-------|
| Collections | `/collections` | `false` (live Supabase read) | seed demo data → render grid; reuse `lib/supabase.ts` `supabasePublic` |
| Admin CMS | `/admin` | `false` (auth-gated client app) | collections CRUD; reuse `supabaseAdmin` |
| Blog listing | `/blog` | `true` | Astro content collection (MDX) — collections pattern fits here |
| Blog post | `/blog/[slug]` | `true` + `getStaticPaths` | per-post SEO |

## Conventions every page spec assumes
- **Design:** `../design-system.md` (tokens, type scale, components)
- **Tracking:** `../tracking-setup.md` (injected once in `Base.astro`)
- **Decisions (legal):** `../decisions.md` (frontend D-rows), `../../decision.md` (master MD-rows)
- **Architecture & invariants:** approved plan `C:\Users\Thieu\.claude\plans\dynamic-snacking-pond.md` + D-ARCH-01
