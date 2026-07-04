import type { ImageKey } from '../lib/assets';

/*
 * About page content (D-NAV-02). All copy for /about lives here — the page
 * renders, never authors. Facts match the canonical entity data in seo.ts.
 */

export const aboutPage = {
  eyebrow: 'Maison Denude — Saigon',
  title: 'The Maison',
  paragraphs: [
    'Maison Denude is a bespoke fashion house in Saigon. The name means to strip down, to reveal — every piece begins by removing what is unnecessary, until only presence remains.',
    'Founded by creative director Chi Bui, the maison creates áo dài, occasion wear and swimwear made to measure: heritage-inspired silhouettes, artisanal handwork, a contemporary sensibility. Each garment is made for one woman, once.',
    'The atelier receives by appointment above Lê Thánh Tôn, in the heart of District 1 — steps from the silk houses the street has always been known for.',
  ],
  image: 'renMuseEasternForest' as ImageKey,
  imageAlt:
    'Model in an embroidered coat from the Renaissance collection — Maison Denude editorial',
  addressLabel: 'The Atelier',
  addressLines: ['194 Lê Thánh Tôn, 2nd Floor', 'District 1, Ho Chi Minh City'],
  cta: {
    label: 'Book a private consultation',
    href: '/booking',
  },
};
