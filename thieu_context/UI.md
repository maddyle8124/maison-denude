# Maison Dénudé — UI & Technical Architecture

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
| Database + Backend | Supabase (free tier) | Postgres, Edge Functions, API — stores data and media URLs only |
| Media Storage | Google Cloud Storage | Actual image/video files; Supabase stores the GCS URLs |
| Email | Supabase Edge Function + Resend (or SMTP) | Booking form → email notification |
| Analytics | GA4 + GTM + Google Search Console | Tracking + SEO monitoring |
| Domain | Purchased by Maison Dénudé | Not in contract — OQ-002 |

## Rendering Strategy

| Page | Rendering | Reason |
|------|-----------|--------|
| `/` | Static (prerendered) | No dynamic data, max SEO |
| `/blog` | Static (prerendered) | SEO listing, no auth |
| `/blog/[slug]` | Static (prerendered) | Full SEO per post |
| `/booking` | SSR | Form submission requires server |
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

## Media Storage — Google Cloud Storage

All media files (images, videos) are stored in GCS. Supabase never stores binary files — only the public GCS URLs are saved to the database.

| Detail | Value |
|--------|-------|
| GCS Project ID | `tanhung-492410` |
| Service account | `maison@tanhung-492410.iam.gserviceaccount.com` |
| Key file (local, DO NOT commit) | `c:\maison\thieu_main-dev\tanhung-492410-ddb430cd19ef.json` |
| Credentials in production | Stored as Supabase secrets (never in code or repo) |

**Upload flow:**
1. Thiệu uploads media (images/videos) to a GCS bucket via gcloud CLI or GCS console
2. GCS returns a public URL (e.g. `https://storage.googleapis.com/[bucket]/[file]`)
3. That URL is saved to the relevant Supabase table column (e.g. `items.image_url`)
4. Astro fetches the URL from Supabase at build time → renders `<img src="...gcs-url">` in static HTML

**Add-on B wishlist items** reference GCS URLs for design images — the wishlist stores `item_id` and `item_name`; the image is resolved at render time from the GCS URL stored in the item record.

**Bucket naming (to be created):** `maison-denude-media` (suggested — confirm before creation)

---

## Supabase Schema

```sql
-- Base: bookings table (included in 8M VND)
CREATE TABLE bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  contact text NOT NULL,          -- phone / Zalo / WhatsApp
  preferred_date text,
  consultation_type text,         -- ao dai | occasion | swimwear | other
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Add-on B: wishlist submissions (+1,000,000 VND)
CREATE TABLE wishlist_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id uuid REFERENCES bookings(id),
  item_id text NOT NULL,
  item_name text,
  item_image_url text,              -- GCS public URL, e.g. https://storage.googleapis.com/maison-denude-media/...
  created_at timestamptz DEFAULT now()
);
```

## Supabase Edge Functions

| Function | Trigger | Action |
|----------|---------|--------|
| `send-booking-email` | POST from booking form | Saves booking to `bookings` table; sends email to team (OQ-001) |
| `create-calendar-event` | After booking saved (Add-on A only) | Calls Google Calendar API; creates event in sales manager's calendar |

## Booking Flow — Base (included in 8M VND)

1. User visits any page
2. Booking modal auto-appears after 30s (OQ-004 — reconfirm timing with client)
   OR user clicks "Book a Consultation" CTA → goes to `/booking`
3. User fills form:
   - Name
   - Phone / WhatsApp / Zalo
   - Preferred date & time
   - Consultation type: áo dài / occasion wear / swimwear / other
   - Message / notes (optional)
4. Submit → Supabase Edge Function fires
5. Email sent to Maison Dénudé team (OQ-001: email TBD)
6. User sees confirmation: "We'll reach out within 24h"
7. Sales manager contacts client via Zalo/WhatsApp to confirm or reschedule

## Add-on A — Google Calendar Integration (+500,000 VND)

Optional upsell — pending Maison Dénudé confirmation.

When booking form is submitted, Edge Function additionally:
1. Calls Google Calendar API
2. Creates event in sales manager's personal Google Calendar
3. Event contains: client name, contact, preferred date/time, consultation type, notes

Setup required:
- Google Cloud project with Calendar API enabled
- OAuth2 credentials for sales manager's Google account
- Credentials stored as Supabase secrets

## Add-on B — Wishlist Feature (+1,000,000 VND)

Optional upsell — pending Maison Dénudé confirmation.

**User experience:**
1. User browses Home page (or future collection pages)
2. Each design item has heart/bookmark icon
3. Click → item saved to wishlist (anonymous, localStorage, no login)
4. Wishlist icon in nav shows saved count
5. When user opens booking form, saved wishlist items auto-pre-loaded
6. Wishlist items submitted together with booking form

**Data flow:**
- User saves items → localStorage
- User submits booking form → payload includes form fields + wishlist item IDs
- Edge Function: saves booking to `bookings`, saves items to `wishlist_submissions` (linked by booking_id), sends email to team (includes wishlist summary)

**Analytics reporting:**
- Thiệu manually exports `wishlist_submissions` from Supabase once/month
- Report: top-liked items, booking conversion rate by item
- Included in annual maintenance (1M VND/year) — no custom dashboard needed

## Deployment

| Setting | Value |
|---------|-------|
| Repository | GitHub — `maison-denude` (to be created) |
| Remote | https://github.com/maddyle8124/maison-denude |
| CI/CD | Cloudflare Pages auto-deploys on push to `main` |
| Build command | `npm run build` |
| Output directory | `dist` |
