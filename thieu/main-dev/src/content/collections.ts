import type { ImageKey } from '../lib/assets';

/*
 * Collections content module (D-SCOPE-03).
 * ALL copy and image references for /collections live here — components are
 * presentation-only. When the client's real design or Supabase data arrives,
 * this module is the only thing that changes shape.
 */

export interface CollectionImage {
  imageKey: ImageKey;
  alt: string;
  /** Small caption under the image (muse name), uppercase house style. */
  caption?: string;
}

export type CollectionSectionLayout = 'pair' | 'muses';

export interface CollectionSection {
  label: string;
  layout: CollectionSectionLayout;
  items: CollectionImage[];
}

export interface Collection {
  slug: string;
  title: string;
  season: string;
  showCredit: string;
  hero: CollectionImage;
  /** Short manifesto excerpt — 2-3 lines max, never body-copy walls. */
  manifesto: string[];
  /** Optional editorial pairing under the manifesto lines. */
  manifestoImages: CollectionImage[];
  sections: CollectionSection[];
  cta: { label: string; href: string };
}

export const renaissance: Collection = {
  slug: 'renaissance',
  title: '« RENAISSANCE »',
  season: 'SPRING SUMMER 2026',
  showCredit: 'Social Club, Hôtel des Arts Saigon — 18.12.2025',
  hero: {
    imageKey: 'renHeroWhiteJacquard',
    alt: 'White jacquard áo dài with rose appliqué and lace hem, worn in a wood-panelled salon — Spring Summer 2026 editorial card',
  },
  // Extracted from the pinned brand statement (IG posts 001/002 caption).
  manifesto: [
    'Every chapter is about presence, a Renaissance of the self.',
    'A woman of Maison Denude is a Renaissance woman.',
    'She chooses, savours, and becomes.',
  ],
  manifestoImages: [
    {
      imageKey: 'renManifestoBrocade',
      alt: 'Ivory brocade jacket with beaded blossom embroidery over sheer lace — Renaissance title card',
    },
    {
      imageKey: 'renManifestoJacquard',
      alt: 'White dragon-jacquard silk sleeve with openwork lace cuff — Renaissance title card',
    },
  ],
  sections: [
    {
      label: 'RUNWAY',
      layout: 'pair',
      items: [
        {
          imageKey: 'renRunwayVelvetDuo',
          alt: 'Two models in black velvet halter dress and lace-trimmed leather trousers before a floor-to-ceiling city view',
        },
        {
          imageKey: 'renRunwayPinkSequin',
          alt: 'Pink sequin halter gown with crystal-cluster neckline beside carved wood panelling',
        },
      ],
    },
    {
      label: 'MUSES',
      layout: 'muses',
      items: [
        {
          imageKey: 'renMuseGigiStage',
          alt: 'White sequin gown with midnight floral embroidery and gold blossom earring, on stage',
          caption: 'GIGI HƯƠNG GIANG',
        },
        {
          imageKey: 'renMuseGigiConstellation',
          alt: 'Coral-pink sequin halter gown with crystal collar against the Saigon night skyline',
          caption: 'GIGI HƯƠNG GIANG',
        },
        {
          imageKey: 'renMuseTuAnhBlushLace',
          alt: 'Blush lace áo dài with silver-embroidered tulle sleeves, photographed low-angle by a mahogany door',
          caption: 'TÚ ANH',
        },
        {
          imageKey: 'renMuseAlitaBlackLace',
          alt: 'Black silk jacket over sequin-embroidered lace, before a lacquered blossom-branch backdrop',
          caption: 'ALITA',
        },
        {
          imageKey: 'renMuseEasternForest',
          alt: 'Embroidered coat back with orchids, leopard motif and beaded fern fronds',
          caption: 'EASTERN FOREST',
        },
        {
          imageKey: 'renMuseThuAnhSequin',
          alt: 'Black sequin mandarin-collar set with silk blossoms, seated on a rooftop above the city',
          caption: 'THU ANH',
        },
      ],
    },
  ],
  cta: { label: 'BOOK A PRIVATE CONSULTATION', href: '/booking' },
};
