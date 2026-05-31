# Maison Dénudé — Architecture

_Last updated: 2026-05-31_

---

## Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend | Astro | SSG/SSR hybrid, great for SEO, fast |
| Hosting | Cloudflare Pages (free) | Fast CDN, free tier, auto-deploy from Git |
| Backend / DB | Supabase (free tier) | Postgres, Edge Functions, easy API |
| Email | Supabase Edge Function + Resend (or SMTP) | Booking form notification |
| Domain | Purchased by Maison Dénudé | Unknown — OQ-002 |
| Analytics | GA4 + GTM + Google Search Console | Tracking + SEO monitoring |

## Astro Project Structure

```
maison-denude/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Home / Landing page
│   │   ├── blog/
│   │   │   ├── index.astro      # Blog listing
│   │   │   └── [slug].astro     # Individual blog post (prerendered)
│   │   └── booking.astro        # Booking page (SSR)
│   ├── components/
│   │   ├── BookingModal.astro   # Persistent modal, all pages
│   │   ├── BookingForm.astro    # Reusable booking form
│   │   ├── WishlistButton.astro # Add-on B: heart/save button
│   │   └── Nav.astro
│   ├── layouts/
│   │   └── Base.astro           # Injects modal, GTM, nav, footer
│   └── content/
│       └── blog/                # MDX blog posts
├── public/
├── astro.config.mjs
└── package.json
```

## Supabase Schema

```sql
-- Base: bookings
CREATE TABLE bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  contact text NOT NULL,          -- phone / Zalo / WhatsApp
  preferred_date text,
  consultation_type text,         -- ao dai | occasion | swimwear | other
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Add-on B: wishlist submissions
CREATE TABLE wishlist_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id uuid REFERENCES bookings(id),
  item_id text NOT NULL,
  item_name text,
  created_at timestamptz DEFAULT now()
);
```

## Supabase Edge Functions

| Function | Trigger | Action |
|----------|---------|--------|
| `send-booking-email` | POST /booking form | Saves booking to DB, sends email to team |
| `create-calendar-event` | After booking saved (Add-on A) | Calls Google Calendar API, creates event in sales manager's calendar |

## Rendering Strategy

| Page | Rendering | Reason |
|------|-----------|--------|
| `/` | Static (prerendered) | No dynamic data, max SEO |
| `/blog` | Static (prerendered) | SEO pages, no auth |
| `/blog/[slug]` | Static (prerendered) | Full SEO per post |
| `/booking` | SSR | Form submission requires server |
| Booking modal | Client-side JS | Triggered by scroll/timer |

## Deployment

- **Repository:** GitHub (to be created)
- **Cloudflare Pages:** Connect to GitHub repo, auto-deploy on push to `main`
- **Build command:** `npm run build`
- **Output directory:** `dist`

## Key Decisions

| ID | Decision |
|----|---------|
| MD-006 | Astro + Cloudflare Pages chosen for free hosting + SEO perf |
| MD-007 | Supabase free tier — stay within limits (500MB DB, 500k Edge invocations/month) |
| MD-008 | No auth system — wishlist anonymous via localStorage |
| MD-009 | English as default language; multi-language deferred (OQ-005) |
| MD-010 | Blog content via MDX files — Thiệu publishes, Maison Dénudé provides copy |
