import type { ImageKey } from '../lib/assets';

/*
 * Booking page content (D-BOOK-03 + booking-calendar D-BOOK-UI-01/02). All copy
 * for /booking, the live slot-picker form, and the cancel landing lives here —
 * components render, never author (design-system invariant 1). Redesign-swappable.
 *
 * LANGUAGE (D-BOOK-UI-01, 2026-07-08): the on-page booking UI is FULL ENGLISH.
 * The earlier bilingual VN/EN treatment (D-9) was cluttered and is superseded for
 * the page UI. Every string here is a plain English string. (The Google *invite*
 * body in calendar.ts may still be bilingual — that reversal is page-scoped.)
 */

/* ------------------------------------------------------------------ *
 * Booking page shell (unchanged seam — consumed by booking.astro).    *
 * ------------------------------------------------------------------ */

export const bookingPage = {
  cover: 'bookingCover' as ImageKey,
  coverAlt:
    'Model in a blush metallic-lace áo dài against an antiqued gold mirror wall',
  eyebrow: 'Maison Denude — Saigon',
  title: 'Private Consultation',
  lede: 'Every piece begins with a conversation. Choose a time below and we will confirm your fitting at once — online, or in person above Lê Thánh Tôn.',
  addressLines: ['194 Lê Thánh Tôn, 2nd Floor', 'District 1, Ho Chi Minh City'],
  responseNote: 'Confirmed the moment you book.',
};

/* ------------------------------------------------------------------ *
 * The live booking flow — slot-picker, form, confirmation. English.   *
 * ------------------------------------------------------------------ */

export const bookingFlow = {
  /* Consultation type (D-3: Online / Instore) */
  consultationType: {
    label: 'Consultation',
    options: [
      {
        value: 'Online' as const,
        label: 'Online',
        descriptor: 'A video meeting on Google Meet',
      },
      {
        value: 'Instore' as const,
        label: 'In person',
        descriptor: 'At 194 Lê Thánh Tôn, 2nd Floor, District 1',
      },
    ],
  },

  /* Slot picker (D-BOOK-UI-02: month-calendar layout) */
  picker: {
    dateHeading: 'Choose a date',
    timeHeading: 'Available times',
    timezoneNote: 'Times shown in Saigon time · GMT+7',
    loading: 'Loading available times…',
    empty: 'No open times at the moment — please check back soon.',
    /* Prompt shown in the time column before a date is chosen. */
    pickDatePrompt: 'Select a date to see open times.',
    /* Shown when Google free/busy could not be reached (D-2 degrade path).
       Booking is NOT blocked — this is a quiet reassurance only. */
    freeBusyNote: 'We will confirm if your chosen time has just been taken.',
    /* Weekday column headers (Mon-first) + month nav a11y labels. */
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    prevMonthLabel: 'Previous month',
    nextMonthLabel: 'Next month',
  },

  /* Form fields */
  fields: {
    slot: { index: '01', label: 'Time' },
    name: { index: '02', label: 'Name' },
    email: { index: '03', label: 'Email' },
    phone: { index: '04', label: 'Phone / Zalo / WhatsApp' },
    notes: { index: '05', label: 'Your occasion' },
  },

  /* Submit + inline states */
  submitLabel: 'Confirm booking',
  sendingLabel: 'Booking…',
  /* Guard: submit blocked until a slot is chosen */
  needSlot: 'Please choose a time above.',
  /* CONFLICT — the chosen slot was just taken; grid refreshes */
  slotTaken: 'That time was just booked. Please choose another.',
  /* Generic hard error */
  error: 'Something went wrong. Please check your details and try again.',

  /* Success confirmation */
  success: {
    title: 'Thank you',
    body: 'Your appointment is confirmed. A calendar invitation with the details has been sent to your email.',
    /* Extra line shown for Online bookings (Meet link present) */
    meetBody: 'The invitation includes a Google Meet link for your video consultation.',
    meetLinkLabel: 'Join the meeting',
    /* Fallback when Online but no meetUrl returned */
    meetFallback: 'The Meet link is in your calendar invitation.',
    /* Shown when the booking came back as pending */
    pendingBody: 'We are finalising your confirmation and the invitation will arrive by email shortly.',
    cancelNote: 'Need to change plans? You can cancel any time using the link below.',
    cancelLinkLabel: 'Cancel this appointment',
  },
};

/* ------------------------------------------------------------------ *
 * Cancel landing page (/booking/cancel — D-8 tokened link target).    *
 * ------------------------------------------------------------------ */

export const bookingCancel = {
  eyebrow: 'Maison Denude — Saigon',
  /* Initial confirm-cancel prompt */
  prompt: {
    title: 'Cancel your appointment',
    body: 'Are you sure you want to cancel this consultation? The time will be released for others.',
    confirmLabel: 'Confirm cancellation',
    keepLabel: 'Keep my appointment',
  },
  sending: 'Cancelling…',
  /* Success — friendly, whether or not the token was known */
  success: {
    title: 'Appointment cancelled',
    body: 'Your appointment has been cancelled. We would be glad to welcome you another time.',
    linkLabel: 'Book a new time',
    linkHref: '/booking',
  },
  /* No token / unknown token — still friendly */
  missing: {
    title: 'Nothing to cancel',
    body: 'We could not find an appointment to cancel — it may already have been cancelled.',
    linkLabel: 'Book a new time',
    linkHref: '/booking',
  },
  keptBody: 'Your appointment is unchanged.',
};
