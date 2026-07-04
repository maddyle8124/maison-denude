# Maison Denude — UI & Frontend Architecture

> Backend architecture (Supabase, Cloudflare R2, n8n, Edge Functions, schema) → see `backend.md`

## Site Map

| Page | Path | Purpose |
|------|------|---------|
| Home / Landing | `/` | Brand showcase, primary CTA → booking |
| Blog listing | `/blog` | SEO hub; links to individual posts |
| Blog post | `/blog/[slug]` | Individual SEO-optimized post |
| Collections | `/collections` | Data-driven catalog from Supabase; wishlist hearts (MD-032) |
| Booking | `/booking` | Full booking consultation form |
| Admin (CMS) | `/admin` | Login-protected collections CRUD for Maison staff (MD-031) |
| Booking modal | all pages | Auto-triggers at 30s (reconfirm OQ-004); persistent across site |

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Astro | SSG/SSR hybrid — max SEO, fast output |
| Hosting | Cloudflare Pages (free tier) | Global CDN, auto-deploy from GitHub |
| Analytics | GA4 + GTM + Google Search Console | Tracking + SEO monitoring |
| Domain | Purchased by Maison Denude | Not in contract — OQ-002 |
| Backend | Supabase + Cloudflare R2 + n8n | Single DB backend; media on R2 (MD-038). See `backend.md` |

## Rendering Strategy — Hybrid (MD-035)

`/` + `/blog` stay fully static so SEO/Lighthouse>90 is never at risk; only `/collections`, the wishlist, and `/admin` touch the DB.

| Page | Rendering | Reason |
|------|-----------|--------|
| `/` | Static (prerendered) | No dynamic data, max SEO |
| `/blog` | Static (prerendered) | SEO listing, no auth |
| `/blog/[slug]` | Static (prerendered) | Full SEO per post |
| `/collections` | **Static shell + live DB read** | Prerendered shell/meta for SEO; items fetched live from Supabase (Pages Function or client island) so admin edits appear without a rebuild. Must keep Lighthouse>90 — see SEO note below |
| `/booking` | SSR | Form submission requires server-side Edge Function call |
| `/admin` | Client-side app (auth-gated) | Not indexed (`noindex`); collections CRUD against Supabase via authenticated Edge Functions |
| Wishlist | Client-side island + Supabase | Anonymous server-stored (anon_id cookie); heart toggles call the `wishlist` function |
| Booking modal | Client-side JS | Triggered by scroll/timer |

> **SEO on dynamic `/collections`:** prerender the page shell + meta tags at build; render the first paint of items server-side or from a cached Pages Function (avoid blank-then-hydrate). Confirm crawlability + Lighthouse>90 — tracked as an open question.

## Astro Project Structure

```
maison-denude/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Home / Landing page
│   │   ├── blog/
│   │   │   ├── index.astro          # Blog listing
│   │   │   └── [slug].astro         # Individual blog post (prerendered)
│   │   ├── collections.astro        # Collections — static shell + live DB read
│   │   ├── booking.astro            # Booking page (SSR)
│   │   └── admin/
│   │       └── index.astro          # CMS — auth-gated collections CRUD (noindex)
│   ├── components/
│   │   ├── BookingModal.astro        # Persistent modal, all pages
│   │   ├── BookingForm.astro         # Reusable booking form
│   │   ├── CollectionGrid.astro      # Renders design_items from Supabase
│   │   ├── WishlistButton.astro      # Add-on B: heart/save (server-stored)
│   │   ├── admin/                    # CMS UI: item form, list, image upload (→ R2)
│   │   └── Nav.astro
│   ├── layouts/
│   │   └── Base.astro               # Injects modal, GTM, nav, footer
│   └── content/
│       └── blog/                    # MDX blog posts
├── public/
├── astro.config.mjs
└── package.json
```

## Booking Flow — UX (Base)

1. User visits any page
2. Booking modal auto-appears after 30s (OQ-004 — reconfirm timing with client)
   OR user clicks "Book a Consultation" CTA → goes to `/booking`
3. User fills form:
   - Name
   - Phone / WhatsApp / Zalo
   - Preferred date & time
   - Consultation type: áo dài / occasion wear / swimwear / other
   - Message / notes (optional)
4. Submit → confirmation message shown: "We'll reach out within 24h"
5. Sales manager contacts client via Zalo/WhatsApp to confirm or reschedule

## Add-on A — Google Calendar UX (+500,000 VND)

No change to the user-facing booking flow. After submission, an event automatically appears in the sales manager's Google Calendar. The user experience is identical to base — the difference is on the backend.

## Collections UX (MD-032)

1. `/collections` renders `design_items` from Supabase, grouped by `collection`, ordered by `sort_order`
2. Each item shows its R2-hosted image, name, description, and a wishlist heart
3. Viewing an item logs an `item_viewed` event (metrics, MD-034)

## Admin / CMS UX (MD-031)

1. Maison staff open `/admin` and log in (Supabase Auth — method TBD, see open questions)
2. Simple list of collection items with Add / Edit / Deactivate
3. Edit form: name, collection, category, description, sort order, image (upload → R2, URL saved to Supabase)
4. Save writes live to Supabase — `/collections` reflects it immediately (no rebuild)
5. Intentionally minimal: collections CRUD only. No blog editing, no metrics dashboard, no settings.

## Add-on B — Wishlist UX (+1,000,000 VND) — anonymous, server-stored (MD-033)

1. User browses `/collections` (or any page with design items)
2. Each item has a heart/bookmark icon
3. Click → item saved to a **server-stored** wishlist keyed by an anonymous cookie id (no login); survives cache clears. Logs `item_wishlisted`
4. Wishlist icon in nav shows saved count (read from Supabase by anon_id)
5. Opening the booking form auto-pre-loads the saved items
6. On submit, items are written to `booking_wishlist` and an `attached_to_booking` event is logged

## Deployment

| Setting | Value |
|---------|-------|
| Repository | GitHub — `maison-denude` (to be created) |
| Remote | https://github.com/maddyle8124/maison-denude |
| CI/CD | Cloudflare Pages auto-deploys on push to `main` |
| Build command | `npm run build` |
| Output directory | `dist` |
