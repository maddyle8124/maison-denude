# Maison Dénudé — Backend Architecture

## Stack Overview

| Layer | Technology | Role |
|-------|-----------|------|
| Database | Supabase Postgres (free tier) | All structured data — bookings, wishlist, design catalog |
| Server functions | Supabase Edge Functions (Deno) | API endpoints called by frontend |
| DB automation | Supabase Database Webhooks | Fires n8n workflows on row events |
| Media storage | Google Cloud Storage | Images/videos — Supabase stores URLs only |
| Automation & cron | n8n (self-hosted on VPS) | Reporting, notifications, keep-alive, backups, SEO snapshots |
| Transactional email | Resend API (via Edge Function) | Booking confirmation emails to team |

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

-- wishlist_submissions (Add-on B — +1,000,000 VND)
CREATE TABLE wishlist_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id uuid REFERENCES bookings(id),
  item_id text NOT NULL,
  item_name text,
  item_image_url text,               -- GCS public URL
  created_at timestamptz DEFAULT now()
);

-- design_items (Add-on B dependency — design catalog)
-- Astro fetches this at build time via PostgREST to render wishlist items
CREATE TABLE design_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  category text,                     -- ao dai | occasion | swimwear | other
  image_url text NOT NULL,           -- GCS public URL
  description text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
```

### Row Level Security (RLS)

All tables have RLS enabled. Public (unauthenticated) access is locked down to the minimum needed:

| Table | Public INSERT | Public SELECT | Notes |
|-------|--------------|--------------|-------|
| `bookings` | ✅ Yes | ❌ No | Frontend can submit; team reads via Supabase dashboard |
| `wishlist_submissions` | ✅ Yes | ❌ No | Submitted with booking payload |
| `design_items` | ❌ No | ✅ Yes (active only) | Astro reads at build time for wishlist catalog |

```sql
-- bookings: allow insert only
CREATE POLICY "allow public insert" ON bookings FOR INSERT TO anon WITH CHECK (true);

-- wishlist_submissions: allow insert only
CREATE POLICY "allow public insert" ON wishlist_submissions FOR INSERT TO anon WITH CHECK (true);

-- design_items: allow public read of active items only
CREATE POLICY "allow public read active" ON design_items FOR SELECT TO anon USING (is_active = true);
```

### Edge Functions

| Function | HTTP method | Caller | What it does |
|----------|------------|--------|-------------|
| `submit-booking` | POST | Astro `/booking` SSR page | Validates form → inserts to `bookings` → (if Add-on B) inserts to `wishlist_submissions` → calls Resend API to email team |
| `submit-booking` (Add-on A branch) | POST | same | Also calls Google Calendar API after saving booking |
| `get-design-items` | GET | Astro build (SSG) | Returns active `design_items` — used to render wishlist catalog at build time |

Functions are invoked via `https://<project-ref>.supabase.co/functions/v1/<name>`.

Secrets stored in Supabase (never in code or repo):
- `RESEND_API_KEY`
- `TEAM_EMAIL` (OQ-001)
- `GCS_SERVICE_ACCOUNT_JSON` (stringified service account key)
- `GOOGLE_CALENDAR_OAUTH_REFRESH_TOKEN` (Add-on A only)
- `GOOGLE_CALENDAR_CLIENT_ID` (Add-on A only)
- `GOOGLE_CALENDAR_CLIENT_SECRET` (Add-on A only)

### Database Webhooks → n8n

Supabase can fire an HTTP POST to a webhook URL on row INSERT/UPDATE/DELETE. This is used to trigger n8n workflows without polling.

| Webhook | Table | Event | Fires n8n workflow |
|---------|-------|-------|-------------------|
| `on-new-booking` | `bookings` | INSERT | `new-booking-notify` |

---

## Google Cloud Storage

All media files live in GCS. Supabase only stores the public URLs.

| Detail | Value |
|--------|-------|
| GCP Project ID | `tanhung-492410` |
| Service account | `maison@tanhung-492410.iam.gserviceaccount.com` |
| Key file (local only, never commit) | `c:\maison\thieu_main-dev\tanhung-492410-ddb430cd19ef.json` |
| Key in production | Stored as `GCS_SERVICE_ACCOUNT_JSON` Supabase secret |
| Bucket (to create) | `maison-denude-media` |
| URL pattern | `https://storage.googleapis.com/maison-denude-media/<path>` |

**Upload workflow:**
1. Thiệu uploads image/video to `maison-denude-media` bucket via gcloud CLI or GCS console
2. Sets object ACL to public-read
3. Copies the public URL
4. Inserts/updates the URL in the relevant Supabase table (`design_items.image_url`, etc.)
5. Trigger Astro rebuild (push to GitHub → Cloudflare Pages auto-deploys)

---

## n8n Automation (VPS)

n8n is self-hosted on Thiệu's VPS. It handles all scheduled and event-driven tasks that Supabase cannot do natively (no built-in cron on free tier).

### Workflows

#### 1. `keep-supabase-alive`
**Why:** Supabase free projects pause after 7 days of inactivity. This prevents that.
**Trigger:** Cron — every 5 days (`0 9 */5 * *`)
**Action:** HTTP GET to `https://<project-ref>.supabase.co/rest/v1/design_items?limit=1` with anon key header
**Expected:** 200 response — project stays active

---

#### 2. `new-booking-notify`
**Why:** Instant team notification when a booking comes in, as a backup to the email sent by Edge Function.
**Trigger:** Webhook — fired by Supabase Database Webhook `on-new-booking`
**Action:** Formats booking data → sends notification (email or Telegram/Zalo webhook — TBD based on team preference)
**Payload received:** booking row JSON (name, contact, preferred_date, consultation_type, notes, created_at)

---

#### 3. `monthly-booking-report`
**Why:** Give Maison Dénudé a monthly summary of consultation inquiries without manual export.
**Trigger:** Cron — 1st of each month at 08:00 (`0 8 1 * *`)
**Action:**
1. HTTP GET to Supabase REST API → fetch all bookings from previous month
2. Format as CSV or table
3. Send email to team with report attached

---

#### 4. `monthly-wishlist-report` *(Add-on B only)*
**Why:** Automates the manual Supabase export that was originally in the maintenance scope.
**Trigger:** Cron — 1st of each month at 08:05 (`5 8 1 * *`)
**Action:**
1. HTTP GET → fetch `wishlist_submissions` joined with booking data from previous month
2. Aggregate: count per item_id, sort by frequency
3. Format as report (top-liked items, conversion rate)
4. Email to Maison Dénudé team + Thiệu

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
1. HTTP GET to Supabase REST API → fetch all rows from `bookings` and `wishlist_submissions`
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
- From address: a verified sender domain (to be configured in Resend — can use a subdomain of Maison Dénudé's domain once OQ-002 is resolved)

---

## Secrets Reference

| Secret | Where stored | Used by |
|--------|-------------|---------|
| `RESEND_API_KEY` | Supabase secrets | `submit-booking` Edge Function |
| `TEAM_EMAIL` | Supabase secrets | `submit-booking` Edge Function |
| `GCS_SERVICE_ACCOUNT_JSON` | Supabase secrets | Any Edge Function uploading to GCS |
| `GOOGLE_CALENDAR_OAUTH_REFRESH_TOKEN` | Supabase secrets | `submit-booking` (Add-on A branch) |
| `GOOGLE_CALENDAR_CLIENT_ID` | Supabase secrets | `submit-booking` (Add-on A branch) |
| `GOOGLE_CALENDAR_CLIENT_SECRET` | Supabase secrets | `submit-booking` (Add-on A branch) |
| Supabase service role key | n8n credentials | All n8n → Supabase calls |
| GSC OAuth token | n8n credentials | `weekly-seo-snapshot` |
| Google Drive OAuth token | n8n credentials | `supabase-weekly-backup` |
| GCS key file (local) | `c:\maison\thieu_main-dev\tanhung-492410-ddb430cd19ef.json` | Local uploads only — never committed |
