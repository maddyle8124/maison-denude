# Page Spec — Landing `/`

> Single source of truth for building the landing page. Detailed visual/copy reference: `../landing-page.md`. Design tokens/components: `../design-system.md`. This file maps that design to the **architecture** (section union + ImageKeys) so it's buildable as-is.

- **Route:** `/` → `src/pages/index.astro`
- **Rendering:** `export const prerender = true` (static, Lighthouse>90, max SEO) — D-ARCH-01 invariant 4
- **Layout:** wraps in `Base.astro` (injects tracking + global styles + Nav)
- **Background:** `#000000` throughout; text `#FFFFFF`. No accent color (design-system.md).

---

## Structure: data-driven sections (D-ARCH-01 invariant 1, 5)

`index.astro` maps over `landingSections` (from `src/content/landing.ts`) through `SectionRenderer.astro`. **No copy, image path, or label is hardcoded in markup** — all live in the content config. Section `id` doubles as the scroll-anchor for the nav.

### Section type union (`src/content/types.ts`)
| `type` | Component | Shape (key fields) |
|--------|-----------|--------------------|
| `hero` | `sections/Hero.astro` | `image: ImageKey`, `frameInset?: boolean` |
| `photoRow` | `sections/PhotoRow.astro` | `columns: 2\|3`, `images: ImageKey[]`, `label?: {line1, line2?}` |
| `featureCollection` | `sections/FeatureCollection.astro` | `label:{line1,line2}`, `feature: ImageKey`, `grid: ImageKey[]` |
| `video` | `sections/VideoSection.astro` | `label: string`, `poster: ImageKey`, `videoUrl?: string`, `orientation:'full'\|'portrait'` |
| `footer` | `sections/Footer.astro` | `background?: ImageKey`, `taglineTitle`, `taglineBody`, `socials:[{label,href,icon}]` |

Adding a new section type later = 1 interface + 1 component + 1 registry line in `SectionRenderer.astro`; existing sections untouched (TS exhaustiveness enforces it).

---

## The 8 sections (confirmed order — D-row "Landing page sections")

| # | id | type | content (ImageKeys → see `src/lib/assets.ts`, mapped from `../asset-rename-list.md`) |
|---|----|------|------|
| 1 | `introduction` | hero | `heroEmbroideredGown`; `frameInset: true` (16px framed-print border) |
| 2 | `featuring` | photoRow (3) | `[kolRedWall, kolRooftop, kolSequinFloral]`; logo SVG bleeds in above (white) |
| 3 | `collection` | featureCollection | label `YOUR TRULY, MAISON DENUDE / COLLECTION`; feature `runwayGroup6`; grid `[runwayTrioCityview, runwayAodaiDetail]` |
| 4 | `runway-video` | video (full) | label `RUNWAY VIDEO`; poster `runwayGroup6`; `videoUrl` PENDING (FQ-04) → poster + play stub |
| 5 | `renaissance` | featureCollection | label `RENAISSANCE / COLLECTION`; feature `renaissanceGoldMotion`; grid `[renaissanceBrocadeReclining, renaissanceRedTulle]` |
| 6 | `video-renaissance` | video (full) | label `VIDEO RENAISSANCE`; poster `renaissanceBlackSequin`; `videoUrl` PENDING |
| 7 | `sable-orchids` | photoRow (3) | label `SABLE ORCHIDS / COLLECTION`; `[sableDuoJacquard, sableBlackLaceBow, sableTealAodai]` (cols 2,3 are placeholders until PT-01) |
| 8a | `video-garden` | video (portrait) | label `VIDEO GARDEN`; poster `footerAtelier`; `videoUrl` PENDING |
| 8b | `footer` | footer | tagline `Shade of Living` + brand body; socials Zalo/Facebook/Instagram; standard editable bar below (D-row: standard footer, not botanical concept) |

---

## Nav (`src/content/nav.ts` — single source; D-ARCH-01 invariant 1)
Right-rail vertical on desktop (fixed right 32px, vert-centered, hairline rule above), hamburger full-screen overlay on mobile (<768px). Items + targets:
`INTRODUCTION→#introduction`, `COLLECTION→#collection`, `SOCIAL CLUB→#featuring`, `FEATURING→#featuring`, `BLOG→/blog`, `BOOKING→/booking`.
Meanings of INTRODUCTION/SOCIAL CLUB/FEATURING unresolved (FQ-01..03) — **these are data edits in nav.ts, never code edits.** Hover = opacity 0.6; active state TBD (PQ-L-05).

---

## Component specs
Use the ready specs in `../design-system.md`: Vertical Nav Rail, Hamburger, Collection Label Block, Video Section, 3-Col / 2-Col grids. All values via `var(--token)` from `tokens.css` (invariant 2). Images via `<SmartImage src={ImageKey} />` → `astro:assets` optimized (invariant 3).

## Build acceptance (pm gate)
- [ ] `index.astro` renders all 8 sections by mapping `landingSections` (no inline content).
- [ ] All design values are `var(--token)`; no hardcoded hex/px-token/font-name in `<style>`.
- [ ] All images via `ImageKey` → `SmartImage`; no raw paths.
- [ ] `export const prerender = true` present.
- [ ] Video sections show poster + play stub (no real URLs yet).
- [ ] Nav right-rail (desktop) + hamburger (mobile); items from `nav.ts`.
- [ ] Lighthouse > 90 on local preview build.
- [ ] Visual match to `../landing-page.md` section-by-section.

## Open items affecting this page (non-blocking — config swaps)
FQ-01..03 (nav meanings), FQ-04 (video URLs), FQ-05 (nav active state), PT-01/03 (clean KOL/Sable images), FQ-I-01 (ABChanel font; Cormorant fallback until then).
