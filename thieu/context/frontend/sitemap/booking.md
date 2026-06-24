# Page Spec — Booking `/booking`

> Single source of truth for the booking flow. **D-BOOK-01 defines booking as: Supabase insert + email notification.** This effort intentionally ships **only the insert half** (a phase deferral, NOT a decision override): no email is wired this round — check the `bookings` table manually; `lib/email.ts` stays stubbed and gets wired in a later mini-phase. Both halves remain in the decision; we're sequencing them.

- **Route:** `/booking` → `src/pages/booking.astro`
- **Rendering:** `export const prerender = true` (static shell). The submission is an **Astro action** that runs on the Worker (the only dynamic piece this effort).
- **Layout:** `Base.astro` (tracking + global styles). Black bg, white text, tokens only.

---

## Form (`src/components/ui/BookingForm.astro`)
Reusable — used on `/booking` and later in the persistent booking modal. Fields:

| Field | Name | Type | Required | Notes |
|-------|------|------|----------|-------|
| Name | `name` | text | ✅ | min 1 |
| Phone / Zalo / WhatsApp | `phone` | tel | ✅ | min 6 |
| Preferred date | `date` | date | ✅ | |
| Consultation type | `consultationType` | select | ✅ | enum: `atelier` \| `virtual` \| `event` (reconcile labels with client; áo dài / occasion / swim wording is content, not schema) |
| Message / notes | `notes` | textarea | optional | |

On success: show "We'll reach out within 24h." Works **without JS** (progressive enhancement via action `accept: 'form'`); modal can enhance client-side.

---

## Backend (D-BOOK-01)
- **Action:** `src/actions/index.ts` → `createBooking`, Zod-validated input matching the table.
- **DB:** `supabaseAdmin(env)` (service-role, server-only) `.from('bookings').insert(input)`.
- **Env (Worker secrets, NOT `PUBLIC_`):** `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE`, `SUPABASE_ANON` (already in `main-dev/.env`).
- **Email:** DEFERRED. `lib/email.ts` exists as a seam; `sendBookingNotification` not called this round. Later mini-phase wires Resend/SMTP → `TEAM_EMAIL` (= `thieu.dachill@gmail.com` until OQ-001).

### Supabase `bookings` table
| column | type | notes |
|--------|------|-------|
| `id` | uuid | pk, default `gen_random_uuid()` |
| `name` | text | not null |
| `phone` | text | not null |
| `date` | date | preferred consultation date |
| `consultation_type` | text | |
| `notes` | text | nullable |
| `created_at` | timestamptz | default `now()` |

RLS: no public insert needed (writes go through service-role on the Worker). Keep RLS on; service-role bypasses it.

---

## Build acceptance (pm gate)
- [ ] `booking.astro` is `prerender = true`; form posts to the `createBooking` action.
- [ ] Action validates with Zod and inserts via `supabaseAdmin` from `lib/supabase.ts` (invariant 6 — no inline client).
- [ ] `bookings` table exists with the columns above.
- [ ] Live submit on the deployed URL creates a row (verified in Supabase).
- [ ] No email wired this phase (insert-only deferral of D-BOOK-01's email half); `lib/email.ts` present but uncalled.
- [ ] All styling via tokens; no hardcoded literals.
