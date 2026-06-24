# Design System
_Extracted from WEB_LANDSCAPE + WEB_MOBILE design reference._
_Last updated: 2026-06-24. Status: PENDING APPROVAL_

---

## Logo

- **File:** `C:\maison\thieu\context\reference\maison_denude_assets\logo_black.svg`
- **SVG dimensions:** 893.24 × 95px viewBox — very wide, horizontal wordmark
- **Style:** Custom-drawn high-contrast serif — NOT a standard typeface. Do not try to replicate with a font.
- **On dark background:** Fill must be inverted to white. Create `logo_white.svg` by replacing all `fill` / path colors with `#FFFFFF`.
- **Usage on site:** White version everywhere (all pages have black bg)
- **Sizing:** Scale proportionally. Desktop hero: ~40–50vw wide. Nav/footer: ~200–280px wide.

---

## Typography

### Font family

**Primary:** `ABChanel Corpo`
- Used for ALL text on the site — labels, nav, body, video titles, footer
- License: proprietary (Chanel brand font). Confirm files are available before coding.
- **Fallback stack:** `"Cormorant Garamond", "Playfair Display", Georgia, serif`

### Weights used (from design)

| Weight name | CSS weight | Usage |
|-------------|-----------|-------|
| Extra Light | `200` | Nav items, collection labels, footer body |
| Light | `300` | Secondary labels |
| Regular | `400` | Video section titles, footer tagline title |

No bold, no medium — the brand aesthetic is deliberately light and refined.

### Type scale

| Role | Size (desktop) | Size (mobile) | Weight | Transform |
|------|---------------|--------------|--------|-----------|
| Video section label | `clamp(48px, 8vw, 100px)` | `clamp(32px, 10vw, 56px)` | 400 | uppercase |
| Collection name (label line 1) | `13px` | `12px` | 200 | uppercase |
| "COLLECTION" subtitle | `10px` | `10px` | 200 | uppercase, +0.2em spacing |
| Nav item | `11px` | — | 200 | uppercase, +0.15em spacing |
| Footer tagline title | `18px` | `16px` | 200–400 | sentence case |
| Footer body | `13px` | `12px` | 200 | sentence case |
| Standard footer bar | `11px` | `11px` | 200 | sentence case |

### Letter spacing

Collection labels and nav use wide tracking. Suggested values:
- Nav: `letter-spacing: 0.15em`
- "COLLECTION" subtitle: `letter-spacing: 0.25em`
- Video labels: `letter-spacing: 0.05em` (large size already reads wide)

---

## Color palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#000000` | Page background, section gaps, nav bg |
| `--color-text` | `#FFFFFF` | All text, icons, logo |
| `--color-rule` | `rgba(255,255,255,0.2)` | Hairline rules (nav separator) |
| `--color-overlay` | `rgba(0,0,0,0.35)` | Over video stills for text legibility |
| `--color-overlay-footer` | `rgba(0,0,0,0.5)` | Footer botanical photo overlay |

**No accent color.** The photography provides all color. Never add colored UI elements — buttons, borders, highlights — without explicit approval from Chi.

---

## Spacing & layout

### Grid

- **Max content width:** None specified — design is full-bleed
- **Image gutters:** `8px` (2-col) / `8px` (3-col)
- **Section gap (black space):** `80px` desktop, `48px` mobile
- **Hero border inset:** `16px` on all sides (the "framed print" effect)
- **Nav right offset:** `32px`
- **Nav top offset:** `50%` (vertically centered on viewport)

### Breakpoints

| Name | Width | Notes |
|------|-------|-------|
| Mobile | `< 768px` | Single column, hamburger nav |
| Tablet | `768px – 1024px` | 2-col grids, hamburger nav |
| Desktop | `> 1024px` | Full layout, vertical right nav |

---

## Image treatment

- **All images are full-bleed** — no rounded corners, no shadows, no borders (except hero frame)
- **Aspect ratios:** Not fixed — images fill their grid cell; `object-fit: cover`
- **Portrait images:** used in KOL row, collection detail grids
- **Landscape images:** used for full-width feature shots (group shots, motion shots)
- **Video stills:** desaturated/blurred by design — apply `filter: blur(4px) brightness(0.8)` or use a poster frame

---

## Interactive states

Minimal by design — this is a editorial/portfolio site, not a product app.

| Element | Default | Hover | Active |
|---------|---------|-------|--------|
| Nav item | White, Extra Light | Opacity 0.6 | TBD (PQ-L-05) |
| Social icons | White | Opacity 0.7 | — |
| Video sections | Static poster | Cursor changes to play | Play video |
| Images | Static | No change (or subtle scale 1.02, confirm) | — |

---

## Components

### Vertical Nav Rail
```
Position: fixed, right: 32px, top: 50%, transform: translateY(-50%)
Items: stacked vertically, 24px gap
Hairline rule: above first item, width: 32px, right-aligned
Font: ABChanel Corpo Extra Light, 11px, uppercase, 0.15em tracking
Color: white
Mobile: hidden (replaced by hamburger)
```

### Hamburger Menu (mobile)
```
Position: fixed, top: 24px, right: 24px
Icon: 3 lines → X on open
Opens full-screen overlay, black bg
Nav items centered, large (24px)
```

### Collection Label Block
```
Container: black bg, padding-bottom: 24px
Line 1: collection name — 13px, Extra Light, uppercase, 0.15em tracking
Line 2: "COLLECTION" — 10px, Extra Light, uppercase, 0.25em tracking
Position: bottom-left of the gap block, padding-left: 32px
```

### Video Section
```
Height: 60–70vh
Background: blurred poster image (filter: blur(8px) brightness(0.7))
Overlay: rgba(0,0,0,0.35)
Label: centered, large (clamp(48px, 8vw, 100px)), uppercase, white
Cursor: pointer → triggers video play
```

### 3-Column Photo Row
```
Display: grid, grid-template-columns: repeat(3, 1fr), gap: 8px
Images: aspect-ratio: 3/4 (portrait), object-fit: cover
No captions
```

### 2-Column Photo Grid
```
Display: grid, grid-template-columns: repeat(2, 1fr), gap: 8px
Images: aspect-ratio: 3/4, object-fit: cover
```
