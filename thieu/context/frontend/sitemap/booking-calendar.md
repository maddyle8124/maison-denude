# Feature Spec — Google Calendar Booking (self-serve slots) `/booking`

> **STATUS: DRAFT — in active brainstorm (2026-07-08). NOT yet a locked decision.**
> This captures the direction agreed during the design interview so it survives compaction.
> It supersedes nothing yet: D-BOOK-01/02/03 remain live. When the design is locked we
> log a new decision row (proposed id **D-BOOK-04**) in `context/frontend/decisions.md`
> and this doc becomes the buildable page spec.
>
> **D-BOOK-EMAIL-01 (2026-07-08, user-approved):** the Google Calendar invite SUBJECT
> (Google renders the event `summary` as the invitation email title) is a clean English
> line: **`Private Consultation — Maison Denude (Online)`** / **`(In Person)`**. It drops
> the old cluttered brand+bilingual+name format for the TITLE only — the client name and
> the full VN+EN detail stay in the event BODY (D-9 body unchanged). Note: Gmail's
> "Invitation from an unknown sender:" prefix and the trailing time/organizer address are
> added by the recipient's Gmail and are NOT under our control. Implemented in
> `main-dev/src/lib/calendar.ts` (`summary`). Also on 2026-07-08 the prod Worker's Google
> secrets were synced to thieuxmaison so the invite ORGANIZER shown to clients is
> `thieuxmaison@gmail.com` (was still nguyenthaithieu on prod) — consistent with
> D-BOOK-INFRA-01 / D-12.
>
> **D-BOOK-INFRA-01 (2026-07-08, binding correction from user):** the Cloudflare Worker
> `maisondenude-web` MUST live in the **thieuxmaison@gmail.com** account (ID
> `73fb68b2979b1b17abbafc4eccdbc354`), NOT nguyenthaithieu (`ecb2e6bb13ae7aeba7fa7c23b64d43a0`).
> The domain **maisondenude.com is managed within the thieuxmaison account.** `wrangler.jsonc`
> historically had the wrong `account_id` (`ecb2e6bb…`) — an ERROR to fix, not intended state.
> All Worker secrets (GOOGLE_*/GCAL_*/SUPABASE_*/RESEND_*) and the production deploy target
> thieuxmaison. Consistent with D-12 (thieuxmaison = canonical project account for ALL registrations).
>
> **Why this exists:** turn the current "request → team replies within 24h" flow (Supabase
> insert + Resend notification email, D-BOOK-01/02) into an **instant self-serve booking**:
> the client picks a real open time slot, and on submit the system creates a confirmed
> Google Calendar event with a Meet link (where applicable) and invites both the Maison
> team and the client.

---

## 1. What we're changing (delta from today)

| Today (D-BOOK-01/02) | Target (this feature) |
|---|---|
| Form collects a **date only** (no time) | Client picks a **real open time slot** |
| Insert row → best-effort notification email to team | Insert row → **create Google Calendar event** + invite both parties → email is the calendar invite (+ optional team notif) |
| Team replies within 24h to arrange | Booking is **confirmed instantly** on submit |
| No availability logic | Availability = **fixed weekly hours − live Google free/busy** |
| Client not invited anywhere | Client is a **calendar attendee**; virtual/event bookings carry a **Google Meet link** |

The existing Supabase insert stays (it's our own record + the concurrency guard — see §5). Email
transport (Resend) may still be used for a human-readable confirmation; the *calendar invite*
itself is sent by Google to attendees.

---

## 2. Locked design decisions (agreed in interview 2026-07-08)

- **D-1 — Booking model = INSTANT SELF-SERVE SLOTS.** Client sees real open slots from the
  team's live availability and books one; the event is created & confirmed on submit
  (Calendly-style), not a request awaiting human confirmation.
- **D-2 — Availability = FIXED WEEKLY HOURS − LIVE GOOGLE FREE/BUSY.** Working hours are
  defined as rules (e.g. Mon–Sat, a daytime window, Asia/Ho_Chi_Minh). The system generates
  candidate slots inside those hours, then removes any slot that collides with an existing
  event on the team's Google Calendar (free/busy query) **and** any slot already taken by a
  confirmed booking in our own DB. Self-maintaining: team blocks personal time in GCal → those
  slots vanish automatically.
- **D-10 — Auth = OAuth 2.0 on the calendar OWNER (refresh-token), NOT the service account.**
  RATIONALE (verified via web research 2026-07-08): a Google **service account** created after
  2020-03-02 **cannot invite guests and cannot create a Meet link** unless it uses **domain-wide
  delegation**, which **requires a Google Workspace account + super-admin** and **does not work on
  a personal `@gmail.com`**. Since D-4's testing owner (`nguyenthaithieu@gmail.com`) is a personal
  gmail, the service-account path would silently fail on exactly the two headline features. Instead:
  the calendar owner performs a **one-time OAuth consent** ("Connect Google"); we store their
  **refresh token as a Worker secret** and create events **as them** — full guest-invite + Meet
  link, working on personal gmail AND Workspace.
  - Meet link: request explicitly via `conferenceDataVersion=1` + `conferenceData.createRequest`
    with `conferenceSolutionKey.type = hangoutsMeet` and a unique `requestId` (Google no longer
    auto-adds Meet). Only for `Online` (D-3).
  - The existing service-account JSON at `main-dev/env/maison-denude-16ab32e1daa5.json` is
    **NOT used** by this feature. Keep it git-ignored; may remove later or repurpose if we ever
    migrate to a Workspace + delegation model.
  - Scopes: `https://www.googleapis.com/auth/calendar.events` (create events) +
    `.../auth/calendar.freebusy` or `.../calendar.readonly` for free/busy (D-2). Minimize scope.
- **D-11 — Build method = Test-Driven Development** (user directive 2026-07-08). Mirrors the
  existing email module (`email.ts` + `email.test.ts`, vitest): pure/injectable core, zero
  import-time env, tests written first. Slot math, availability computation, the atomic-claim
  contract, and the Calendar payload builder are all unit-tested before wiring. See §9.
- **D-3 — Two consultation types only: `Online` / `Instore`** (2026-07-08 user directive,
  simplifies the old atelier/virtual/event set — resolves OQ-CAL-02, which is now void):
  | type | meaning | location | Meet link? |
  |---|---|---|---|
  | `Online` | remote video consultation | Google Meet | ✅ yes |
  | `Instore` | in-person atelier visit | 194 Lê Thánh Tôn, 2nd Floor, District 1 | ❌ no |
  Durations still TBD per type (see OQ-CAL-01).
- **D-4 — Source calendar = the marketing manager's calendar in production**
  (chị Michelle, per client-stakeholders). **For testing NOW, use `thieuxmaison@gmail.com`**
  as the source/owner calendar (revised 2026-07-08 per D-12: the project account owns test events,
  not the personal email). `GOOGLE_CALENDAR_ID` = `GCAL_OWNER_EMAIL` = `thieuxmaison@gmail.com`.
  `nguyenthaithieu@gmail.com` remains a test INVITEE (D-5) but is no longer the calendar owner.
  Switch to the marketing manager's calendar before go-live.
- **D-12 — Canonical project account = `thieuxmaison@gmail.com`** (2026-07-08 user directive).
  ALL registrations for this project — Google Cloud, OAuth clients, third-party services —
  are under `thieuxmaison@gmail.com` (the 2-month engagement's dedicated email), NEVER a personal
  email. The booking OAuth client lives in Google Cloud project `maison-denude` under
  thieuxmaison. `nguyenthaithieu@gmail.com` is the user's PERSONAL email, used here ONLY as the
  interim test calendar owner / test invitee — not the account infrastructure is registered under.
  OAuth Web client id `1052017137688-...apps.googleusercontent.com`, cred file (git-ignored)
  `main-dev/env/maison-denude-booking.json`.
- **D-5 — Team invitees** (attendees added to every event, in addition to the client):
  `nhokieunhan@gmail.com`, `nguyenthaithieu@gmail.com`, and `nhokieunhan3@gmail.com`.
  (These double as the early test recipients before real client traffic.)
- **D-6 — Working hours:** Mon–Sat 10:00–18:00, **60-min slots** (start times 10:00–17:00),
  closed Sunday, tz **Asia/Ho_Chi_Minh**. Both Online and Instore share this window.
  Resolves OQ-CAL-04's hours portion.
- **D-7 — Guardrails:** min lead **≥24h** (earliest bookable slot = 24h from now);
  max horizon **60 days** ahead.
- **D-8 — Cancel/reschedule (v1) = client cancel via link.** The confirmation email carries a
  **tokened cancel link** → frees the slot in our DB + deletes the GCal event. (Reschedule =
  cancel + rebook for v1 unless we add explicit reschedule.) Resolves OQ-CAL-05.
- **D-9 — Client-facing language = BILINGUAL (VN + EN).** Invite title/description and the
  on-page confirmation carry key details in both Vietnamese and English. Internal event notes
  may stay English. Resolves OQ-CAL-06.
  - **SUPERSEDED for the on-page booking UI (2026-07-08, D-BOOK-UI-01):** the `/booking` PAGE UI
    is now **FULL ENGLISH ONLY** — the VN-over-EN treatment on every label was cluttered and
    unprofessional (user directive). Drop all `.bi__vi`/`.bi__en` pairs from the page; render a
    single clean English line per label/status/message. The Google *invite* body (calendar.ts)
    MAY remain bilingual — this reversal is scoped to the page UI only.
  - **D-BOOK-UI-02 (2026-07-08) — slot picker = MONTH-CALENDAR layout ("Approach B").** The old
    picker dumped ~40 full-date buttons in a grid (a wall of text) — rejected. Replacement: a
    month-calendar grid (Mon-first, 7-col) where days WITH availability are clickable and carry a
    small **monochrome** availability dot (low-opacity `--color-text` — NOT gold; the design system
    forbids accent colours without Chi's approval), days WITHOUT are dimmed + disabled; selecting a day reveals its
    open times as a vertical column beside/under the calendar. `‹ ›` month nav across the 60-day
    horizon. Two-pane page layout (cover image left, panel right) is KEPT. Mockup source of truth:
    `main-dev/booking-mockups.html` (Approach B). Times still render in Saigon +07 wall-clock via
    string-slice (never converted to viewer tz).

---

## 3. Open questions blocking a full lock (registered as OQ-CAL-*)

These MUST be answered before we exit brainstorm → plan mode:

- **OQ-CAL-01 — Consultation-type DURATIONS.** Type set is locked (D-3: `Online`/`Instore`);
  only the durations remain open. Proposed: `Online` 45 min, `Instore` 60 min — confirm.
- ~~**OQ-CAL-02**~~ — VOID. Resolved by D-3 (types simplified to Online/Instore; no `event`).
- **OQ-CAL-03 — RESOLVED (D-4):** production owner = marketing manager's calendar;
  testing owner = `nguyenthaithieu@gmail.com`. Still to confirm: is the marketing manager's
  account a Google **Workspace** account (allows domain-wide delegation) or a personal gmail
  (service account must be granted "make changes to events" sharing on that calendar)? This
  affects the auth wiring, not the decision.
- **OQ-CAL-04 — Timezone + working-hours rules.** Confirm Asia/Ho_Chi_Minh, the exact
  weekly window (days + start/end), slot granularity (30/60 min), and min lead time
  (how soon can someone book — e.g. no same-day within 2h) + max horizon (how far out).
- **OQ-CAL-05 — Cancellation / reschedule.** Is there a client-facing cancel/reschedule
  path, or is that team-only in Google Calendar for v1?
- **OQ-CAL-06 — Language of the invite/confirmation.** Vietnamese for the client-facing
  invite? (Per language policy: client deliverables Vietnamese.)
- **OQ-CAL-07 — Notification email still needed?** Keep the Resend team-notification email
  in addition to the Google calendar invite, or is the calendar invite sufficient?

---

## 4. Core reliability principles (the reason this is a careful design)

Instant self-serve booking's hardest problem is **correctness under concurrency** — never
double-book a slot, never show a stale slot as open, never confirm a booking we can't honor.

1. **Single source of truth for "taken" = our DB, not the calendar.** Free/busy on Google is
   eventually consistent and rate-limited; we cannot rely on it as the lock. Our Supabase table
   holds the authoritative record of confirmed slots.
2. **Atomic slot claim.** Two clients hitting the same slot at the same instant must not both
   succeed. Enforce with a **DB uniqueness constraint** on (calendar, slot_start) — e.g. a unique
   index / exclusion constraint — so the second insert fails cleanly. The winner creates the
   calendar event; the loser is told the slot just went and re-shown live slots.
3. **Calendar write is downstream of the DB claim, and is idempotent.** Order: claim slot in DB
   (atomic) → create GCal event → store the returned event id back on the row. If the GCal call
   fails after the claim, we either retry or release the claim; never leave a confirmed DB slot
   with no event silently.
4. **Availability is always recomputed server-side at submit time**, never trusted from the
   client. The slot the browser shows is a hint; the server re-validates the slot is still open
   in the same transaction that claims it (TOCTOU guard).
5. **Idempotency on submit.** A double-click / retry must not create two events. Use an
   idempotency key (client-generated per booking attempt) or the unique slot constraint to
   dedupe.
6. **Failure isolation (inherited from D-BOOK-02).** A calendar/email failure must degrade
   gracefully — but note the priority INVERTS vs today: here a *confirmed* booking with no
   calendar event is a real problem, so we surface/retry rather than silently swallow. Decide the
   exact failure contract in plan mode.
7. **Timezone discipline.** All slot math in Asia/Ho_Chi_Minh; store timestamps as UTC/tz-aware;
   render to the client in their locale but confirm the tz explicitly in the invite.
8. **Rate-limit & quota awareness.** Google Calendar API has quotas; cache free/busy briefly and
   batch where possible. Never hammer free/busy per keystroke.

---

## 5. Data model delta (proposed — refine in plan mode)

Extend the `bookings` table (D-BOOK-01) or add a `slots`/`appointments` concept:
- add `slot_start` (timestamptz, tz-aware) and `slot_end` / `duration_min`
- add `calendar_event_id` (text, nullable until event created)
- add `status` (e.g. `confirmed` | `cancelled` | `pending`)
- **unique constraint** on the active slot per calendar to make the claim atomic (§4.2)
- keep `name`, `phone`, `consultation_type`, `notes`; **add client `email`** (required now —
  they must be an attendee)

> ⚠ Adding a required client **email** field to the form is a real UX change (today we only
  collect phone). Flag for client sign-off.

---

## 6. Auth / secrets handling (security)

- Service-account JSON is a **private key**. It currently sits in `main-dev/env/` — verify it is
  **git-ignored** and never committed. (Note: `main-dev/.gitignore` is modified in the working
  tree — confirm it excludes `env/`.)
- In production, load the JSON as a **Worker secret** (e.g. `GOOGLE_SA_JSON`), parse at runtime
  via `cloudflare:workers` `env` (same pattern as `RESEND_API_KEY` / Supabase, per the
  cloudflare-worker-env-access memory), **never** import the file at build time.
- The service account must have access to the target calendar (calendar shared with the SA's
  email, or domain-wide delegation for a Workspace calendar). Personal-gmail calendars can't be
  shared to a SA the same way → this drives OQ-CAL-03.

---

## 7. High-level flow (target)

```
Client opens /booking
  → server computes open slots (weekly rules − GCal free/busy − DB-taken), tz Asia/Ho_Chi_Minh
  → client picks a slot + fills name/phone/email/type/notes
  → submit (Astro action on Worker):
      1. re-validate slot still open (server-side)
      2. atomic claim in Supabase (unique slot constraint)  ── loser → "slot just taken, pick another"
      3. create Google Calendar event (attendees: team + client; Meet link if virtual/event)
      4. store event id + status=confirmed on the row
      5. (optional) Resend confirmation / team notification
  → client sees confirmation with date/time/tz (+ Meet link if applicable)
Google emails the calendar invite to both parties.
```

---

## 8. Build acceptance (pm gate) — to be finalized when design locks

- [ ] Open questions OQ-CAL-01..07 resolved (or explicitly deferred with a decision row).
- [ ] Service-account JSON confirmed git-ignored + loaded as a Worker secret (never committed).
- [ ] Slot claim is provably atomic (concurrent double-book test fails the 2nd insert).
- [ ] Server re-validates availability at submit (no client-trusted slot).
- [ ] Calendar event created with correct tz, duration, attendees, and Meet link per type.
- [ ] Test invites to `nhokieunhan@gmail.com` + `nguyenthaithieu@gmail.com` succeed end-to-end.
- [ ] Calendar/email failure contract implemented (no silent confirmed-without-event).
- [ ] Client-facing copy/invite language per OQ-CAL-06.
```
