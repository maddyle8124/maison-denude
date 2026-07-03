import type { ImageKey } from '../lib/assets';

/*
 * Booking page content (D-BOOK-03). All copy for /booking and the booking form
 * lives here — components render, never author. Redesign-swappable: a future
 * client design replaces the presentation components, not this file.
 */

export interface BookingField {
  /** Editorial index rendered beside the label, e.g. "01" */
  index: string;
  id: 'name' | 'phone' | 'date' | 'consultationType' | 'notes';
  label: string;
  /** Only for the select field */
  options?: { value: string; label: string }[];
}

export const bookingPage = {
  cover: 'bookingCover' as ImageKey,
  coverAlt:
    'Model in a blush metallic-lace áo dài against an antiqued gold mirror wall',
  eyebrow: 'Maison Dénudé — Saigon',
  title: 'Private Consultation',
  lede:
    'Every piece begins with a conversation. Share your occasion and our atelier will arrange a fitting — in person above Lê Thánh Tôn, or wherever you are.',
  addressLines: ['194 Lê Thánh Tôn, 2nd Floor', 'District 1, Ho Chi Minh City'],
  responseNote: 'We reply within 24 hours.',
};

export const bookingForm = {
  fields: [
    { index: '01', id: 'name', label: 'Name' },
    { index: '02', id: 'phone', label: 'Phone / Zalo / WhatsApp' },
    { index: '03', id: 'date', label: 'Preferred date' },
    {
      index: '04',
      id: 'consultationType',
      label: 'Consultation',
      options: [
        { value: 'atelier', label: 'Atelier visit' },
        { value: 'virtual', label: 'Virtual consultation' },
        { value: 'event', label: 'Event / occasion' },
      ],
    },
    { index: '05', id: 'notes', label: 'Your occasion' },
  ] satisfies BookingField[],
  submitLabel: 'Request a consultation',
  error: 'Something went wrong. Please check your details and try again.',
  sendingLabel: 'Sending…',
  success: {
    title: 'Thank you',
    body: 'Your request has been received. Our atelier will reach out within 24 hours to arrange your consultation.',
    linkLabel: 'Return to the collection',
    linkHref: '/collections',
  },
};
