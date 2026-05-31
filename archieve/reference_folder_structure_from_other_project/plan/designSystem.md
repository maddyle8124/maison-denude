# The WithDaNang Design System: Story & Architecture

## 1. The Vision: Boutique Editorial & High-Trust Concierge
When conceptualizing the visual identity for **withdanang.com**, we made a deliberate choice to step away from the generic "travel blog" aesthetic—which often relies on oversaturated tropical stock photos, chaotic layouts, and standard bright colors.

Our target audience consists of expats, digital nomads, and serious travelers who need a *navigation layer* for the city, not a tourist brochure. They are looking for honesty, practical guides, and authentic local knowledge.

To build immediate trust, the design system adopts a **"Boutique Editorial / Concierge"** vibe. It feels like a premium handbook or a well-curated magazine. It prioritizes readability, structure, and sophisticated aesthetics that command authority while remaining warm and inviting.

---

## 2. The Color Story: Modernizing "Ngũ Sắc Việt Nam"
To ground the brand in local authenticity without feeling cliché, we turned to the traditional Vietnamese **Ngũ Sắc** (Five Colors based on the Five Elements / Ngũ Hành). 

Traditional Ngũ Sắc uses pure, highly saturated primary colors (often seen in festival flags and temple decorations). To adapt this for a premium digital UI, we desaturated, deepened, and refined these hues into a highly sophisticated palette:

* **Mộc (Wood/Green) — Faded Jade (`#295441`)**
  * *The Anchor:* Rooted in the deep green canopy of the Sơn Trà peninsula. Mộc serves as our primary brand identifier. It is rare in the travel space (which usually leans heavily on blues or reds), making the brand instantly recognizable and deeply connected to Da Nang's nature.
* **Thủy (Water/Blue) — Deep Mekong Indigo (`#1B2A41`)**
  * *The Foundation:* Used primarily for text and dark backgrounds. It reads as highly authoritative, premium, and trustworthy (a softer, richer alternative to harsh black).
* **Hỏa (Fire/Red) — Temple Lacquer Red (`#B23A2B`)**
  * *The Action:* Used for primary actions and accents. It pairs perfectly with Mộc (Green), recalling the classic aesthetic of red temple doors against jungle backdrops.
* **Thổ (Earth/Yellow) — Antique Gold (`#D4A336`)**
  * *The Polish:* A warm, muted gold used for subtle highlights, active states, and premium touches.
* **Kim (Metal/White) — Rice Paper Cream (`#F7F4EB`)**
  * *The Canvas:* Instead of pure, clinical white, we use off-white cream tones that evoke rice paper or old book pages, reducing eye strain and reinforcing the "editorial" feel.

*(Strategic Note: While Mộc is the soul of the brand identity, Thủy handles the heavy lifting for readability in typography.)*

---

## 3. Typography: Expressive Meets Utilitarian
The typography pairs two highly contrasting typefaces to achieve our aesthetic goals:

* **Headings & Display:** `Fraunces`
  * An award-winning, "old style soft-serif." It is highly expressive, slightly quirky, yet deeply elegant. It gives the site its boutique, artisan voice.
* **Body & UI:** `Inter`
  * A stark, highly legible, utilitarian sans-serif. Because the site relies heavily on long-form guides and practical information, Inter ensures that the reading experience remains effortless and modern.

---

## 4. Engineering Architecture: CSS Variables & Atomic Design
The visual layer is backed by a rigorous, academic software engineering structure ensuring scalability and maintainability as the project moves into the Astro framework.

### The Two-Tier Token System
We avoid hardcoding colors. Instead, we use a two-tier CSS variable approach:
1. **Tier 1 (Primitives):** Raw hex values defined by their Ngũ Sắc identity (e.g., `--color-moc-500`, `--color-thuy-900`).
2. **Tier 2 (Semantic Tokens):** Functional aliases that UI components actually use (e.g., `--bg-primary`, `--text-brand`, `--action-primary-default`). 

This means if we ever want to launch a "dark mode," we only swap the Tier 2 aliases; the component code remains untouched.

### Consistent Scales
* **Spacing:** A fixed, rem-based spacing scale (`--space-1` through `--space-6`) enforces consistent rhythm across all layouts.
* **Components:** UI elements are built atomically. Buttons, tags, input fields, and dividers are designed as isolated components that stack predictably to form complex molecules (like Content Cards).

---

## 4b: Shape Language — The Soft Boutique System

After extended visual exploration (documented in `design-system-demo.html`, `design-system-final.html`, `design-system-v2.astro`), the codebase adopted a **soft border-radius system** as a foundational architectural change in April 2026.

**Why shape matters for this brand:**
Sharp, square-cornered UI reads as "tech dashboard" or "corporate SaaS." The WithDaNang brand is a boutique concierge — it should feel warm, editorial, and approachable. Rounded corners are not a trend choice; they are a trust signal that aligns with the brand's hospitality positioning.

**The Shape Token Scale** (implemented in `global.css`):

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 8px | Form inputs, nav triggers, channel buttons |
| `--radius-md` | 14px | Cards (EventCard, BlogCard, PersonCard, GatewayCard), modals |
| `--radius-lg` | 24px | Modal dialog on desktop |
| `--radius-xl` | 32px | Reserved for large overlay containers |
| `--radius-pill` | 100px | Buttons, Tags, Badges, chips, form pills |

**The Shadow Token Scale** (implemented in `global.css`):

| Token | Value | Use |
|-------|-------|-----|
| `--shadow-sm` | `0 2px 4px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.03)` | Cards on light backgrounds |
| `--shadow-md` | `0 4px 12px rgba(27,42,65,0.05), 0 1px 4px rgba(27,42,65,0.02)` | Bento tiles, GatewayCard |
| `--shadow-lg` | `0 12px 32px rgba(27,42,65,0.08), 0 4px 8px rgba(27,42,65,0.04)` | Dropdown panels, modals |

**Application across components:**
- All interactive card components: `--radius-md` + `overflow: hidden` + appropriate shadow
- All button/tag/badge elements: `--radius-pill`
- All form inputs and chips: `--radius-sm`
- Navigation dropdown panels: `--radius-md` + `--shadow-lg`

---

## 4c: Bento Layout Philosophy — Warm Surface Contrast

The design system page uses a "bento grid" layout for showcasing atomic tokens. The key architectural insight:

**The three-tier warm contrast system:**
- Page background: `--bg-primary` (cream-100, `#F7F4EB`)
- Bento section background: `--color-cream-200` (`#EDE9DE`) — the "warm joint"
- Tile background: white (`#FFFFFF`)

This creates visual depth without resorting to dark backgrounds. The `--color-cream-200` acts as the grout between tiles — warm, intentional, not a dark void. This is documented in the file as `--bg-bento` concept.

**The principle:** dark backgrounds between tiles create "black crack" — visual fatigue that reads as cold and technical. Warm cream-200 joints make the grid feel like a boutique mood board, not a dashboard.

---

## 5. Logo Strategy
The logo explorations combine the Ngũ Sắc palette with the brand's editorial goals. 
We explored two main tracks (assets saved in `/assets/logo_concepts/`):
1. **Form & Mascot:** Utilizing highly local elements like the Red-shanked Douc Langur (Voọc chà vá chân nâu) to immediately signal deep local knowledge.
2. **5-Color Typography:** Integrating all 5 Ngũ Sắc elements directly into the `withdanang` wordmark through gradients, geometric accents, or calligraphic swashes to create a purely typographic, high-end mark. 

---

**Current Status (as of 2026-04-30):** ✅ COMPLETE + EXTENDED
- ✅ All design tokens implemented in `main-dev/src/styles/global.css` (Tier 1 primitives + Tier 2 semantic tokens)
- ✅ **Shape token scale added:** `--radius-sm/md/lg/xl/pill` (April 2026)
- ✅ **Shadow token scale added:** `--shadow-sm/md/lg` (April 2026)
- ✅ 6 typography classes defined (display, h1, h2, overline, body, caption)
- ✅ 6-step spacing scale implemented
- ✅ 13 UI components built and production-ready
- ✅ All components use semantic tokens (no hardcoded hex values)
- ✅ All components updated to use shape tokens (no hardcoded border-radius)
- ✅ `/design-system` page live at withdanang.com/design-system (noindex, unlisted)
- ✅ Bento layout with warm cream-200 background established as the design system reference

**Source of truth for tokens:** `main-dev/src/styles/global.css`
**Design system reference page:** `main-dev/src/pages/design-system.astro`
