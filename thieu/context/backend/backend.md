# Maison Denude — Backend Architecture

## Stack Overview

| Layer | Technology | Role |
|-------|-----------|------|
| Database | Supabase Postgres (free tier) | **Single backend** — bookings, wishlist, interaction metrics, collections catalog (MD-036) |
| Server functions | Supabase Edge Functions (Deno) | API endpoints called by frontend |
| Admin (CMS) | Custom `/admin` (in the Astro app) on Supabase Auth | Non-technical Maison staff CRUD collections (MD-031) |
| DB automation | Supabase Database Webhooks | Fires n8n workflows on row events |
| Media storage | **Cloudflare R2** (MD-038, supersedes GCS) | Images/videos — Supabase stores the URL only |
| Automation & cron | n8n (self-hosted on VPS) | Reporting, notifications, keep-alive, backups, SEO snapshots |
| Transactional email | Resend API (via Edge Function) | Booking confirmation emails to team |

> **Render model (MD-035, hybrid):** `/` + `/blog` static (SEO-perfect); `/collections` static shell + live Supabase read; wishlist client-side + Supabase. See `../frontend/UI.md`.
> **Note:** Google Cloud Storage (GCS) is **superseded** by Cloudflare R2 as of MD-038. The old GCS project/service-account references below are retained only as migration history.

---

## Supabase — Full Free Tier Utilization

**Free tier limits:**
- 500MB database storage
- 500K Edge Function invocations/month
- 5GB bandwidth
- Projects **pause after 7 days of inactivity** → solved by n8n keep-alive ping
- 2 free projects

### Database Schema

```sql
-- bookings (base scope — 8M VND)
CREATE TABLE bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  contact text NOT NULL,             -- phone / Zalo / WhatsApp
  preferred_date text,
  consultation_type text,            -- ao dai | occasion | swimwear | other
  notes text,
  created_at timestamptz DEFAULT now()
);

-- design_items (collections catalog — managed via /admin CMS, MD-031/032)
-- Read live by /collections (hybrid render) and the wishlist
CREATE TABLE design_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  collection text,                   -- groups items into a collection
  category text,                     -- ao dai | occasion | swimwear | other
  image_url text NOT NULL,           -- Cloudflare R2 public URL (MD-038)
  description text,
  sort_order int DEFAULT 0,          -- admin-controlled ordering
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- wishlists (Add-on B — anonymous, SERVER-STORED, MD-033)
-- Keyed by an anonymous client id stored in a cookie/localStorage; no auth
CREATE TABLE wishlists (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  anon_id text NOT NULL,             -- anonymous client identifier (cookie); no auth
  created_at timestamptz DEFAULT now()
);

-- wishlist_items (items saved into a server-stored wishlist)
CREATE TABLE wishlist_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  wishlist_id uuid REFERENCES wishlists(id) ON DELETE CASCADE,
  item_id uuid REFERENCES design_items(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE (wishlist_id, item_id)
);

-- booking_wishlist (which items rode along to a booking — replaces old wishlist_submissions)
CREATE TABLE booking_wishlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id uuid REFERENCES bookings(id),
  item_id uuid REFERENCES design_items(id),
  created_at timestamptz DEFAULT now()
);

-- interaction_events (behaviour metrics, MD-034) — team reads via Thiệu's report
CREATE TABLE interaction_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  anon_id text,                      -- anonymous client id (nullable)
  event_type text NOT NULL,          -- item_viewed | item_wishlisted | item_unwishlisted | attached_to_booking
  item_id uuid REFERENCES design_items(id),
  created_at timestamptz DEFAULT now()
);
```

> **Wishlist persistence:** anonymous, no login (MD-015 spirit preserved) but now **server-stored** (MD-033) — `anon_id` from a cookie keys the wishlist so it survives cache clears and is queryable for metrics. The old `wishlist_submissions` table is replaced by `wishlists` + `wishlist_items` + `booking_wishlist`.
> **Metrics access:** `interaction_events` is the raw behaviour stream. Maison consumes it via a monthly report Thiệu prepares (MD-034 / MD-016) — **no team-facing dashboard or login is built.**

### Row Level Security (RLS)

All tables have RLS enabled. Public (unauthenticated) access is locked down to the minimum needed:

| Table | Public (anon) | Notes |
|-------|--------------|-------|
| `bookings` | INSERT only | Frontend submits; team reads via Supabase dashboard / report |
| `design_items` | SELECT (active only) | Read live by `/collections` + wishlist; **writes only via authenticated admin** (MD-031) |
| `wishlists` / `wishlist_items` | INSERT + SELECT/DELETE by own `anon_id` | Anonymous server-stored wishlist; scoped to the caller's anon id |
| `booking_wishlist` | INSERT only | Items attached to a booking submission |
| `interaction_events` | INSERT only | Append-only behaviour stream; never publicly readable |

```sql
-- bookings: allow insert only
CREATE POLICY "allow public insert" ON bookings FOR INSERT TO anon WITH CHECK (true);

-- design_items: public reads active items; writes restricted to authenticated admin
CREATE POLICY "allow public read active" ON design_items FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "admin full access" ON design_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- interaction_events + booking_wishlist: append-only, no public reads
CREATE POLICY "allow public insert" ON interaction_events FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "allow public insert" ON booking_wishlist FOR INSERT TO anon WITH CHECK (true);

-- wishlists / wishlist_items: scoped to the caller's anon id (passed via request)
-- (anon_id matching enforced in the Edge Function / RLS using a request header claim)
```

> **Admin auth (OQ — see open_questions):** the `/admin` CMS authenticates against **Supabase Auth**; only `authenticated` role can write `design_items`. Exact login method (shared account vs. magic-link to Maison's email) is open.

### Edge Functions

| Function | HTTP method | Caller | What it does |
|----------|------------|--------|-------------|
| `submit-booking` | POST | Astro `/booking` page | Validates form → inserts to `bookings` → (if Add-on B) inserts attached items to `booking_wishlist` + logs `attached_to_booking` events → calls Resend API to email team |
| `submit-booking` (Add-on A branch) | POST | same | Also calls Google Calendar API after saving booking |
| `get-collections` | GET | `/collections` (live read) | Returns active `design_items` (grouped by `collection`, ordered by `sort_order`) for the hybrid-rendered collections page |
| `wishlist` | GET/POST/DELETE | client island | Reads/saves/removes items for the caller's `anon_id`; logs `item_wishlisted` / `item_unwishlisted` events |
| `track-event` | POST | client island | Appends to `interaction_events` (e.g. `item_viewed`) |
| `admin-*` (collections CRUD) | POST | `/admin` (authenticated) | Create/update/deactivate `design_items`; image URL points at Cloudflare R2 (MD-038) |

Functions are invoked via `https://<project-ref>.supabase.co/functions/v1/<name>`.

Secrets stored in Supabase (never in code or repo):
- `RESEND_API_KEY`
- `TEAM_EMAIL` (OQ-001)
- `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` / `R2_BUCKET` / `R2_PUBLIC_BASE_URL` (Cloudflare R2 — MD-038)
- `GOOGLE_CALENDAR_OAUTH_REFRESH_TOKEN` (Add-on A only)
- `GOOGLE_CALENDAR_CLIENT_ID` (Add-on A only)
- `GOOGLE_CALENDAR_CLIENT_SECRET` (Add-on A only)

### Database Webhooks → n8n

Supabase can fire an HTTP POST to a webhook URL on row INSERT/UPDATE/DELETE. This is used to trigger n8n workflows without polling.

| Webhook | Table | Event | Fires n8n workflow |
|---------|-------|-------|-------------------|
| `on-new-booking` | `bookings` | INSERT | `new-booking-notify` |

---

## Cloudflare R2 — Media Storage (MD-038, supersedes GCS)

All media files live in **Cloudflare R2**. Supabase stores only the public URL. Same vendor as Pages, **no egress fees**, one-vendor media path.

| Detail | Value |
|--------|-------|
| Bucket (to create) | `maison-denude-media` |
| Public access | via R2 public bucket URL or a custom domain (e.g. `media.maisondenude.com`) — TBD |
| URL pattern | `https://<r2-public-base>/<path>` (stored in `R2_PUBLIC_BASE_URL`) |
| Credentials | R2 API token → `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` (Supabase secrets) |
| Ownership | Under Maison's Cloudflare account (same as Pages); Thiệu has access |

**Upload workflow (two options):**
- **Via `/admin` (preferred):** Maison/Thiệu uploads an image in the collections admin → Edge Function (`admin-*`) puts the object to R2 (S3-compatible API) → returns the public URL → stored in `design_items.image_url`. No rebuild needed (collections read live).
- **Manual:** upload to the R2 bucket via Cloudflare dashboard / S3 CLI → copy public URL → set on the `design_items` row.

> **Migration note (history):** media was originally planned on Google Cloud Storage (project `tanhung-492410`, bucket `maison-denude-media`, key at `c:\maison\thieu_main-dev\tanhung-492410-ddb430cd19ef.json`). Superseded by R2 per MD-038. Decommission the GCS bucket/service account once R2 is live.

---

## n8n Automation (VPS)

n8n is self-hosted on Thiệu's VPS. It handles all scheduled and event-driven tasks that Supabase cannot do natively (no built-in cron on free tier).

### Workflows

#### 1. `keep-supabase-alive` — ⚠️ LOAD-BEARING
**Why:** Supabase free projects pause after 7 days of inactivity. Since `/collections` and the wishlist now read Supabase **at request time** (hybrid render, MD-035), a paused project = a **broken live site**, not just a stale buffer. This ping is now critical-path, not a nicety.
**Trigger:** Cron — every 5 days (`0 9 */5 * *`)
**Action:** HTTP GET to `https://<project-ref>.supabase.co/rest/v1/design_items?limit=1` with anon key header
**Expected:** 200 response — project stays active
**Robustness (OQ):** single n8n cron is a single point of failure. Plan a redundant pinger (e.g. a second Cloudflare Worker cron) + an alert if the ping fails, so the site can't silently go dark. See `management/open_questions.md`.

---

#### 2. `new-booking-notify`
**Why:** Instant team notification when a booking comes in, as a backup to the email sent by Edge Function.
**Trigger:** Webhook — fired by Supabase Database Webhook `on-new-booking`
**Action:** Formats booking data → sends notification (email or Telegram/Zalo webhook — TBD based on team preference)
**Payload received:** booking row JSON (name, contact, preferred_date, consultation_type, notes, created_at)

---

#### 3. `monthly-booking-report`
**Why:** Give Maison Denude a monthly summary of consultation inquiries without manual export.
**Trigger:** Cron — 1st of each month at 08:00 (`0 8 1 * *`)
**Action:**
1. HTTP GET to Supabase REST API → fetch all bookings from previous month
2. Format as CSV or table
3. Send email to team with report attached

---

#### 4. `monthly-wishlist-report` *(Add-on B only)* — fulfills MD-034/MD-016
**Why:** Gives Maison the "full statistics of user behaviour with items/wishlists" they asked for, as a prepared report (no team-facing dashboard built).
**Trigger:** Cron — 1st of each month at 08:05 (`5 8 1 * *`)
**Action:**
1. HTTP GET → aggregate `interaction_events` for previous month: views / wishlists / unwishlists per item
2. HTTP GET → `wishlist_items` (most-saved items) and `booking_wishlist` (which items convert to bookings)
3. Compute: top-viewed, top-wishlisted, view→wishlist rate, wishlist→booking rate
4. Format as report → email to Maison Denude team + Thiệu

---

#### 5. `weekly-uptime-check`
**Why:** Know immediately if the site goes down, not from a client complaint.
**Trigger:** Cron — every Monday at 08:00 (`0 8 * * 1`)
**Action:** HTTP GET to site root URL → if status ≠ 200, send alert to Thiệu (email or Telegram)

---

#### 6. `weekly-seo-snapshot` *(post go-live)*
**Why:** Track keyword ranking progress without manual Search Console checks.
**Trigger:** Cron — every Monday at 08:10 (`10 8 * * 1`)
**Action:**
1. Google Search Console API → fetch impressions + avg position for 7 target keywords
2. Format as weekly table
3. Email to Thiệu

Target keywords to track: `bespoke saigon`, `bespoke ho chi minh`, `artisanal bespoke fashion`, `occasional wear vietnam`, `heritage inspired dress`, `asian inspired dress`, `bespoke ao dai`

---

#### 7. `supabase-weekly-backup`
**Why:** Free tier has no point-in-time recovery. Manual safety net.
**Trigger:** Cron — every Sunday at 02:00 (`0 2 * * 0`)
**Action:**
1. HTTP GET to Supabase REST API → fetch all rows from `bookings`, `wishlists`, `wishlist_items`, `booking_wishlist`, `design_items`, `interaction_events`
2. Format as JSON
3. Save to Google Drive (or email as attachment to Thiệu)

---

### n8n Credentials Required

| Credential | Used by |
|-----------|---------|
| Supabase URL + service role key | All Supabase queries from n8n |
| Resend API key (or SMTP) | Monthly reports email |
| Google OAuth (GSC API) | `weekly-seo-snapshot` |
| Google Drive OAuth | `supabase-weekly-backup` |
| Site URL | `weekly-uptime-check` |

---

## Transactional Email — Resend

- Called from inside `submit-booking` Edge Function
- Sends booking details to team email (OQ-001)
- If Add-on B: email includes wishlist summary
- API key stored as Supabase secret `RESEND_API_KEY`
- From address: a verified sender domain (to be configured in Resend — can use a subdomain of Maison Denude's domain once OQ-002 is resolved)

---

## Secrets Reference

| Secret | Where stored | Used by |
|--------|-------------|---------|
| `RESEND_API_KEY` | Supabase secrets | `submit-booking` Edge Function |
| `TEAM_EMAIL` | Supabase secrets | `submit-booking` Edge Function |
| `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` | Supabase secrets | Edge Functions uploading media to R2 (MD-038) |
| `R2_BUCKET` / `R2_PUBLIC_BASE_URL` | Supabase secrets | R2 target bucket + public URL base |
| `GOOGLE_CALENDAR_OAUTH_REFRESH_TOKEN` | Supabase secrets | `submit-booking` (Add-on A branch) |
| `GOOGLE_CALENDAR_CLIENT_ID` | Supabase secrets | `submit-booking` (Add-on A branch) |
| `GOOGLE_CALENDAR_CLIENT_SECRET` | Supabase secrets | `submit-booking` (Add-on A branch) |
| Supabase service role key | n8n credentials | All n8n → Supabase calls |
| GSC OAuth token | n8n credentials | `weekly-seo-snapshot` |
| Google Drive OAuth token | n8n credentials | `supabase-weekly-backup` |
