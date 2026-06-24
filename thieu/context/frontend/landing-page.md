# Landing Page — Design Spec
_Source: WEB_LANDSCAPE copy.pdf + WEB_MOBILE copy.pdf + assets analysis_
_Last updated: 2026-06-24. Status: PENDING APPROVAL_
_Approve by reviewing each section and replying with changes or "approved"._

---

## Quick reference

| | |
|--|--|
| **Background** | Pure black `#000000` throughout |
| **Text color** | White `#FFFFFF` |
| **Primary font** | ABChanel Corpo (body, labels, nav) |
| **Font weights used** | Extra Light for labels/subtitles; Regular for body |
| **Logo** | SVG — `logo_black.svg` inverted to white on dark bg (`logo_white.svg` needed — see pending tasks) |
| **Page structure** | Single long-scroll, 8 sections top→bottom |
| **Nav style** | Vertical, right-aligned, overlaid on hero |

---

## Section map (top → bottom)

| # | Name in design | What it is |
|---|----------------|-----------|
| 1 | Hero | Full-screen editorial image + vertical nav overlay |
| 2 | KOL Featuring | 3-column photo row — KOL/social proof images |
| 3 | YOUR TRULY, MAISON DENUDE Collection | Full-width runway group shot + 2-up detail grid below |
| 4 | Runway Video | Full-bleed blurred video frame with "RUNWAY VIDEO" label |
| 5 | RENAISSANCE Collection | Black gap + full-width editorial image + 2-up portrait grid |
| 6 | Video Renaissance | Full-bleed blurred video frame with "VIDEO RENAISSANCE" label |
| 7 | SABLE ORCHIDS Collection | Black gap + 3-column photo row |
| 8 | Video Garden + Footer | Centered portrait video frame + "VIDEO GARDEN" label → "Shade of Living" copy on B&W botanical bg + social icons |

---

## Section 1 — Hero

**Desktop layout:**
- Full viewport height (`100vh`), full width
- Single editorial image fills the frame — use `1.set_mood/181225_MD_ 440 copy.jpg` (woman in embroidered off-shoulder gown, back to camera, warm interior)
- **No headline text, no CTA button**
- Logo SVG is NOT in the hero — it appears mid-scroll on the hero image (section 2 bleed)

**Navigation — vertical right rail:**
- Position: fixed right edge, vertically centered on the viewport
- Items (top → bottom, all caps, Extra Light weight, small tracking):
  - `INTRODUCTION`
  - `COLLECTION`
  - `SOCIAL CLUB`
  - `FEATURING`
- A short horizontal rule sits above the nav items (hairline, white)
- Nav text color: white
- Active state: TBD — log as question (see pending questions)
- On mobile: hamburger menu top-right, nav items hidden

**Design details:**
- Thin black border/frame inset on all 4 sides (~16–20px) — gives the editorial "framed print" feel
- Image is NOT edge-to-edge; the black border is always visible

**Image assignment:** `hero-mood-embroidered-gown-back.jpg` (rename task — see asset rename list)

---

## Section 2 — KOL Featuring

**Desktop layout:**
- Pure black background
- MAISON DENUDE logo (white SVG, large, ~40–50% viewport width) centered/overlaid — this is where the logo first appears, bleeding over the bottom of the hero image and the top of this section
- Below the logo: 3 equal-width columns, images flush edge-to-edge with small gaps
- Each column holds 1 portrait-oriented photo
- No captions, no names, no text — images only

**Images (current 3, from `2.KOL_featuring/`):**
- Col 1: `1.jpg` — KOL in white lace dress with red floral appliqué, against red installation wall
- Col 2: `IMG_9753.JPG` — KOL in black sequin áo dài, rooftop Saigon nightscape
- Col 3: `5.jpg` — KOL close-up, black sequin with pink floral, Saigon skyline night

**Note:** Some current KOL images are Instagram screenshot crops. These are placeholders — you will manually replace with clean downloads from their Instagram. Log as pending task.

**Mobile layout:** Stack vertically, 1 image per row, full width.

---

## Section 3 — YOUR TRULY, MAISON DENUDE Collection

**Desktop layout:**
- Black gap above (~80–120px) containing label text bottom-left:
  - Line 1: `YOUR TRULY, MAISON DENUDE` — Extra Light, all caps, ~14px
  - Line 2: `COLLECTION` — Extra Light, all caps, ~10px, wider letter-spacing
- Full-width wide landscape image: group of 6 models in studio, white curtain background, variety of garments from the collection (`3.Runway/181225_MD_ 414 copy.jpg`)
- Below: 2-column grid of 2 portrait images (showing runway detail shots)
  - Left: `3.Runway/181225_MD_ 120 copy.jpg` — 3 models, city-view window interior
  - Right: runway detail — áo dài close-up (from same shoot)

**Label position:** Bottom-left of the black gap section, NOT overlaid on the image.

**Mobile:** Label top, then full-width images stacked.

---

## Section 4 — Runway Video

**Desktop layout:**
- Full-bleed section, roughly 60–70vh tall
- Background: a blurred/desaturated still frame from the runway video (light warm tones — `3.Runway/` shots)
- Text overlay centered: `RUNWAY VIDEO` — all caps, white, Extra Light, very large (~80–100px)
- This is a **video embed placeholder** — clicking plays the runway show video
- Video URL: **PENDING** (log as open question — need YouTube/Vimeo URL from Maison)
- Implementation: `<video>` autoplay muted loop for background, or YouTube embed on click

---

## Section 5 — RENAISSANCE Collection

**Desktop layout:**
- Large black gap with label bottom-left:
  - Line 1: `RENAISSANCE` — Extra Light, all caps
  - Line 2: `COLLECTION` — Extra Light, all caps, wider tracking
- Full-width landscape image: single model in ivory/gold swirling fabric (`4.RENAISSANCE/MD BRIDAL1801 3 2 copy.jpg`) — very cinematic, motion blur
- 2-column portrait grid below:
  - Left: `4.RENAISSANCE/MD BRIDAL2463 1 .jpg` — model reclining, ivory brocade coat
  - Right: `4.RENAISSANCE/MD BRIDAL3625_(3).jpg` — detail shot with red floral accents on lace

**Same label pattern as Section 3 — consistent throughout all collection sections.**

---

## Section 6 — Video Renaissance

**Desktop layout:**
- Same pattern as Section 4 (Runway Video)
- Background still: warm taupe/brown, model in black sequin dress
- Text overlay: `VIDEO RENAISSANCE` — all caps, white, Extra Light, large
- Video URL: **PENDING** (same open question)

---

## Section 7 — SABLE ORCHIDS Collection

**Desktop layout:**
- Large black gap with label bottom-left:
  - Line 1: `SABLE ORCHIDS` — Extra Light, all caps
  - Line 2: `COLLECTION` — Extra Light, all caps, wider tracking
- 3-column photo grid (equal width, portrait orientation):
  - Col 1: `5.SABLE_ORCHID/IMG_6589.jpg` — 2 models in silver/grey jacquard áo dài, moody bar interior
  - Col 2: `5.SABLE_ORCHID/IMG_6591.jpg` — model in black lace gown with dramatic silk bow, from Instagram (needs clean crop)
  - Col 3: `5.SABLE_ORCHID/IMG_6592.jpg` — model in teal áo dài, city-view hotel interior

**Note:** Col 2 and 3 are Instagram screenshot crops — replace with clean versions. Log as pending task.

---

## Section 8 — Video Garden + Footer

**Desktop layout, two subsections:**

**8a — Video Garden:**
- Pure black background
- Centered portrait-format video frame (roughly 40% viewport width, ~70vh tall)
- Text overlay on the video: `VIDEO GARDEN` — all caps, white, Extra Light/Regular, very large
- Video URL: **PENDING**

**8b — Footer:**
- Full-bleed background: botanical/garden B&W photograph (desaturated, moody — image not in assets folder, needs sourcing OR use a dark overlay on a garden image)
- Logo SVG centered, top of footer section, white
- Tagline / brand statement (two lines, centered, white):
  - `Shade of Living`
  - `Beyond the fleeting form, each individual embodies the totality of their experiences and emotions. Maison Denude walks alongside you in the art of being, where every shade, every movement, every version of the self is honored and celebrated.`
- Social icons row (centered, white, horizontally spaced):
  - Zalo
  - Facebook
  - Instagram
- **No address, phone, or nav links visible in this design** — standard footer info should be added beneath as a minimal text row (editable)

**Recommended standard footer additions (below the hero footer image):**
```
© 2025 Maison Dénudé  ·  194 Lê Thánh Tôn, Q.1, TP.HCM  ·  Blog  ·  Booking
```

---

## Typography system

| Usage | Font | Weight | Case | Size (desktop) |
|-------|------|--------|------|----------------|
| Collection label line 1 | ABChanel Corpo | Extra Light | ALL CAPS | ~13–14px |
| Collection label line 2 "COLLECTION" | ABChanel Corpo | Extra Light | ALL CAPS | ~10px, +0.2em letter-spacing |
| Video section label | ABChanel Corpo | Regular or Light | ALL CAPS | ~80–100px |
| Nav items | ABChanel Corpo | Extra Light | ALL CAPS | ~11px, +0.15em |
| Footer tagline title | ABChanel Corpo | Extra Light or Regular | Sentence case | ~18–20px |
| Footer body text | ABChanel Corpo | Extra Light | Sentence case | ~13–14px |

**Font loading:** ABChanel Corpo is a licensed font — confirm you have the font files. If not available, closest fallback is `"Cormorant Garamond"` (free, Google Fonts) as a placeholder until the real files are added.

---

## Color palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#000000` | Page background, all gaps |
| `--color-text` | `#FFFFFF` | All text, nav, labels, icons |
| `--color-border` | `rgba(255,255,255,0.15)` | Hairline rules (nav separator, footer divider) |
| `--color-overlay` | `rgba(0,0,0,0.35)` | Over video frames to ensure text legibility |

No accent color defined yet — the images provide all color richness.

---

## Spacing system (desktop)

| Token | Value | Usage |
|-------|------|-------|
| `--gap-section` | `80–120px` | Black gap between sections (the label lives here) |
| `--gap-grid` | `8–12px` | Gap between images in 2-col / 3-col grids |
| `--frame-inset` | `16px` | Border inset on the hero image frame |
| `--nav-right` | `32px` | Right offset of the vertical nav |

---

## Pending questions (need Chi / Maison to confirm)

| ID | Question |
|----|----------|
| PQ-L-01 | What is "INTRODUCTION" in the nav — is it an About page? What content goes there? |
| PQ-L-02 | What is "SOCIAL CLUB" in the nav — is this the KOL/Featuring section or a separate page? |
| PQ-L-03 | What is "FEATURING" in the nav — separate from Social Club? |
| PQ-L-04 | Do you have the Runway video, Video Renaissance, and Video Garden URLs/files? |
| PQ-L-05 | Nav active/hover state — underline, color change, or nothing? |
| PQ-L-06 | The footer botanical image — is there a specific photo to use, or should we source one? |
| PQ-L-07 | Do you want Blog and Booking in the footer bottom bar, or is the social icons row the only footer CTA? |

---

## Pending tasks (Thiệu to action)

| ID | Task |
|----|------|
| PT-L-01 | Create `logo_white.svg` — invert the existing `logo_black.svg` fill to `#FFFFFF` |
| PT-L-02 | Download clean KOL images from Instagram (Section 2 — replace screenshot crops) |
| PT-L-03 | Download clean Sable Orchids images from Instagram (Section 7 col 2 & 3) |
| PT-L-04 | Rename all asset images to semantic names (see `asset-rename-list.md`) |
| PT-L-05 | Source/confirm botanical background image for footer |
| PT-L-06 | Get video URLs/files from Maison for 3 video sections |
| PT-L-07 | Confirm ABChanel Corpo font files are available; if not, use Cormorant Garamond as placeholder |
