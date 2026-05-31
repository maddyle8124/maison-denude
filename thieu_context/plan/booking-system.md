# Maison Dénudé — Booking System Spec

_Last updated: 2026-05-31_

---

## Base Booking Flow (Included in 8,000,000 VND)

```
User visits any page
    ↓
Booking modal auto-appears (30s timer OR scroll trigger — OQ-004)
    OR
User clicks "Book a Consultation" CTA → /booking page
    ↓
User fills form:
  - Name
  - Phone / WhatsApp / Zalo
  - Preferred date & time
  - Type of consultation (áo dài, occasion wear, swimwear, other)
  - Message / notes (optional)
    ↓
Supabase Edge Function fires
    ↓
Email sent to Maison Dénudé team (OQ-001: email address TBD)
    ↓
User sees confirmation screen: "We'll reach out within 24h"
    ↓
Sales manager contacts client via Zalo/WhatsApp to confirm/reschedule
```

## Add-on A — Google Calendar Integration (+500,000 VND)

**Upsell — Maison Dénudé must choose to activate.**

When booking form is submitted, in addition to the email, the Supabase Edge Function also:
1. Calls Google Calendar API
2. Creates a calendar event in the **sales manager's personal Google Calendar**
3. Event includes: client name, contact, preferred date/time, consultation type, notes

**Setup required:**
- Google Cloud project with Calendar API enabled
- OAuth2 credentials for the sales manager's Google account
- Credentials stored as Supabase secrets

## Add-on B — Wishlist Feature (+1,000,000 VND)

**Upsell — Maison Dénudé must choose to activate.**

### User Experience

1. User browses the Home page (or future collection pages)
2. Each item/design has a heart/bookmark icon
3. Click = item saved to wishlist (anonymous, stored in `localStorage`)
4. Wishlist icon in nav shows count
5. When user opens booking form, their saved wishlist is automatically pre-loaded
6. Wishlist items are submitted with the booking form

### Data Flow

```
User saves items → localStorage
    ↓
User submits booking form
    ↓
Booking payload includes: form fields + wishlist item IDs
    ↓
Supabase Edge Function:
  - Saves booking to `bookings` table
  - Saves wishlist items to `wishlist_submissions` table (linked to booking)
  - Sends email to team (includes wishlist summary)
```

### Analytics Reporting

- Raw data: stored in Supabase `wishlist_submissions` table
- Thiệu manually exports once per month → sends report to Maison Dénudé team
- Report shows: top-liked items, booking conversion rate by item
- **No custom admin dashboard built** — this is part of maintenance (included in 1M/year)

### Supabase Schema (Add-on B)

```sql
-- bookings table (base)
CREATE TABLE bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  contact text NOT NULL,
  preferred_date text,
  consultation_type text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- wishlist_submissions table (Add-on B)
CREATE TABLE wishlist_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id uuid REFERENCES bookings(id),
  item_id text NOT NULL,
  item_name text,
  created_at timestamptz DEFAULT now()
);
```

## Open Questions

| ID | Question |
|----|---------|
| OQ-001 | Which email receives booking submissions? |
| OQ-004 | Booking popup: 30s default — reconfirm with Maison Dénudé |
