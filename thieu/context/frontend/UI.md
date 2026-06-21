# Maison Dénudé — UI & Frontend Architecture

> Backend architecture (Supabase, GCS, n8n, Edge Functions, schema) → see `backend.md`

## Site Map

| Page | Path | Purpose |
|------|------|---------|
| Home / Landing | `/` | Brand showcase, primary CTA → booking |
| Blog listing | `/blog` | SEO hub; links to individual posts |
| Blog post | `/blog/[slug]` | Individual SEO-optimized post |
| Booking | `/booking` | Full booking consultation form |
| Booking modal | all pages | Auto-triggers at 30s (reconfirm OQ-004); persistent across site |

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Astro | SSG/SSR hybrid — max SEO, fast output |
| Hosting | Cloudflare Pages (free tier) | Global CDN, auto-deploy from GitHub |
| Analytics | GA4 + GTM + Google Search Console | Tracking + SEO monitoring |
| Domain | Purchased by Maison Dénudé | Not in contract — OQ-002 |
| Backend | Supabase + GCS + n8n | See `backend.md` |

## Rendering Strategy

| Page | Rendering | Reason |
|------|-----------|--------|
| `/` | Static (prerendered) | No dynamic data, max SEO |
| `/blog` | Static (prerendered) | SEO listing, no auth |
| `/blog/[slug]` | Static (prerendered) | Full SEO per post |
| `/booking` | SSR | Form submission requires server-side Edge Function call |
| Booking modal | Client-side JS | Triggered by scroll/timer |

## Astro Project Structure

```
maison-denude/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Home / Landing page
│   │   ├── blog/
│   │   │   ├── index.astro          # Blog listing
│   │   │   └── [slug].astro         # Individual blog post (prerendered)
│   │   └── booking.astro            # Booking page (SSR)
│   ├── components/
│   │   ├── BookingModal.astro        # Persistent modal, all pages
│   │   ├── BookingForm.astro         # Reusable booking form
│   │   ├── WishlistButton.astro      # Add-on B: heart/save button
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

## Add-on B — Wishlist UX (+1,000,000 VND)

1. User browses Home page (or future collection pages)
2. Each design item has a heart/bookmark icon
3. Click → item saved to wishlist (anonymous, no login required)
4. Wishlist icon in nav shows saved count
5. When user opens the booking form, saved wishlist items are auto-pre-loaded
6. Wishlist items are submitted together with the booking form

## Deployment

| Setting | Value |
|---------|-------|
| Repository | GitHub — `maison-denude` (to be created) |
| Remote | https://github.com/maddyle8124/maison-denude |
| CI/CD | Cloudflare Pages auto-deploys on push to `main` |
| Build command | `npm run build` |
| Output directory | `dist` |
