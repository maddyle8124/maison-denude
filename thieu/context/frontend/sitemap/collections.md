# /collections — page spec (D-SCOPE-03, session 2026-07-03)

**Status:** buildable spec. Curation locked by orchestrator after visual review of the IG export.
**Nature:** config-driven STATIC page (prerendered). NOT Supabase-backed yet — that remains deferred (D-SCOPE-02). This page is deliberately disposable-by-design: when the client's real design arrives, only the presentation components change; the content module stays.

## Source material

Instagram export: `C:\maison\ig_maisondenude.official_profile_download_all_2026-07-03T10-07-02-644Z\`
- 20 post folders `ig_maisondenude.official_<NNN>_<shortcode>/`, media `..._<slot>_image.jpg`, metadata in per-folder `caption.txt`.
- All content is one line: **« RENAISSANCE » — Spring Summer 2026**, shown 18.12.2025 at Social Club, Hôtel des Arts Saigon.

## Curation (locked — do not substitute without orchestrator sign-off)

Use ONLY the branded editorial cards (white-framed images with the MAISON DENUDE lockup in the artwork). EXCLUDE: posts 004–008 (candid/phone-shot atmosphere — visible hands, mirror selfies), post 016 (video), post 017 (text carousel/founder feature).

| Role | Post | File (slot) | Note |
|---|---|---|---|
| Page hero | 018 | `_001` | White jacquard áo dài, wood-panel backdrop, SS26 lockup |
| Runway | 019 | `_001` | Runway series |
| Runway | 020 | `_001` | Runway series |
| Muse — Gigi Hương Giang | 009 | `_001` | Sequin floral, stage |
| Muse — Gigi Hương Giang | 010 | `_001` | "Pink constellation" |
| Muse — Tú Anh | 011 | `_004` | Blushy lace (largest slide) |
| Muse — Alita | 012 | `_001` | |
| Muse — "Eastern Forest" | 013 | `_002` | Dreamscape (largest slide) |
| Muse — Thu Anh | 014 | `_001` | Embroidered Poppy black sequin mandarin set |
| Manifesto imagery | 001 | `_001` | Pinned brand statement |
| Manifesto imagery | 002 | `_001` | Optional pairing with 001 |

Builder MUST visually open each chosen file (Read tool) and confirm it is a branded white-frame editorial card before wiring it; if one is not, pick the next slide in the same post that is, and note the deviation.

## Page structure (top → bottom)

1. **Nav** (existing component) + minimal page header: `« RENAISSANCE »` + `SPRING SUMMER 2026` sub-line + one-line show credit (`Social Club, Hôtel des Arts Saigon — 18.12.2025`). Uppercase, wide tracking, existing type tokens.
2. **Hero** — post 018 image, large centered editorial placement (NOT full-bleed cover; these cards carry their own white frame — let them float on black with generous margin).
3. **Manifesto strip** — short excerpt (2–3 lines max) from post 001/002 caption text (builder reads `caption.txt`, picks the strongest ENGLISH lines; no body-copy walls — collection sections are minimal per design law). Optionally pair with 001_001 image.
4. **Runway** — section label `RUNWAY`; 019 + 020 as a 2-up grid (desktop), stacked mobile.
5. **Muses** — section label `MUSES`; 6 cards (009–014 picks) in an asymmetric editorial rhythm: alternate 2-up and 3-up rows or a staggered grid — NOT a uniform Instagram-clone 3×N grid. Small caption under each: muse name only (uppercase, small, tracked). Names: GIGI HƯƠNG GIANG, GIGI HƯƠNG GIANG, TÚ ANH, ALITA, EASTERN FOREST, THU ANH.
6. **Closing CTA** — single centered line linking to `/booking`: `BOOK A PRIVATE CONSULTATION` (house style, thin rule above).
7. **Footer** (existing component).

## Anti-slop rules (binding)

- Black `#000` page, white text, existing tokens ONLY — zero new colors, zero gradients, zero card shadows, zero rounded corners, zero hover-zoom gimmicks. A subtle opacity/fade on hover is acceptable at most.
- No hero overlay text on images, no badges, no "View collection →" buttons, no emoji.
- Typography: ABChanel Corpo via existing stack; uppercase + `var(--ls-*)` tracking tokens; sizes from the existing type scale.
- Whitespace is the design: section spacing ≥ existing landing section rhythm (reuse spacing tokens).
- Copy: brand-language law — never "high end", never "tailor"; minimal text everywhere.

## Architecture (change-tolerance invariants apply)

- `src/content/collections.ts` — typed content module: collection { slug, title, season, showCredit, manifesto: string[], sections: { label, layout, items: { imageKey, caption?, alt }[] } }. ALL copy and image references live here.
- Selected JPGs copied to `src/assets/collections/renaissance/` with clean kebab names (e.g. `runway-white-jacquard.jpg`, `muse-gigi-01.jpg`); registered as ImageKeys in `src/lib/assets.ts`; rendered via existing `SmartImage`.
- New page `src/pages/collections.astro`, `export const prerender = true`, uses `Base.astro`.
- New presentation components additive under `src/components/collections/` (do not modify existing sections). Keep them thin: layout + tokens only.
- Nav: flip `COLLECTION` href from `#collection` → `/collections` in `nav.ts` as part of THIS phase.
- Page `<title>`/`description` props: `Renaissance — Spring Summer 2026 | Maison Dénudé` / one-sentence description using bespoke/artisanal vocabulary (final SEO pass comes in a later phase; don't add meta beyond Base props).
- Alt text: descriptive, garment-focused, English.

## Out of scope

Supabase collections data, wishlist, admin, video embeds, per-look detail pages, IG API embeds.
