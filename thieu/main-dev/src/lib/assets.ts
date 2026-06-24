import type { ImageMetadata } from 'astro';

// All landing page images. Add keys here when new images land; never use raw paths in components.
export type ImageKey =
  | 'heroEmbroideredGown'
  | 'heroSilkHalter'
  | 'kolRedWall'
  | 'kolSequinAodaiRooftop'
  | 'kolSequinFloral'
  | 'kolPlaceholder1'
  | 'kolPlaceholder2'
  | 'kolPlaceholder3'
  | 'runwayGroup6'
  | 'runwayTrioCityview'
  | 'runwayAodaiDetail'
  | 'runwayBridal5Models'
  | 'runwayAodaiOrchidEmbroidery'
  | 'runwayDragonEmbroidery'
  | 'runwayBlackKaftan'
  | 'runwayAodaiOrchidCloseup'
  | 'runwayWhiteLaceDetail'
  | 'runwayBridalLineup'
  | 'renaissanceGoldMotion'
  | 'renaissanceBrocadeReclining'
  | 'renaissanceBridalReclingHero'
  | 'renaissanceBlueTulle'
  | 'renaissanceBlackSequin'
  | 'renaissanceRedTulle'
  | 'sableDuoJacquard'
  | 'sableBlackLaceBow'
  | 'sableTealAodai'
  | 'sableRedLaceAodai'
  | 'sableGreenLaceCape'
  | 'footerAtelier'
  | 'placeholder';

// Glob all images at build time (astro:assets optimisation)
const images = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/landing/*.{jpg,jpeg,png,webp,avif,svg}',
  { eager: true }
);

const keyToFilename: Record<ImageKey, string> = {
  heroEmbroideredGown:         'hero-embroidered-gown-back-portrait.jpg',
  heroSilkHalter:              'hero-silk-halter-back-detail.jpg',
  kolRedWall:                  'kol-white-lace-red-floral-red-wall.jpg',
  kolSequinAodaiRooftop:       'kol-black-sequin-aodai-rooftop-night.jpg',
  kolSequinFloral:             'kol-black-sequin-floral-saigon-night.jpg',
  kolPlaceholder1:             'kol-placeholder-1.jpg',
  kolPlaceholder2:             'kol-placeholder-2.jpg',
  kolPlaceholder3:             'kol-placeholder-3.jpg',
  runwayGroup6:                'runway-group-6models-maison-signage.jpg',
  runwayTrioCityview:          'runway-trio-cityview-black-red-pink.jpg',
  runwayAodaiDetail:           'runway-aodai-detail-dark-velvet.jpg',
  runwayBridal5Models:         'runway-bridal-5models-red-ivory.jpg',
  runwayAodaiOrchidEmbroidery: 'runway-aodai-orchid-embroidery-detail.jpg',
  runwayDragonEmbroidery:      'runway-dragon-embroidery-aodai-teal.jpg',
  runwayBlackKaftan:           'runway-black-kaftan-silver-lace-solo.jpg',
  runwayAodaiOrchidCloseup:    'runway-aodai-orchid-closeup-lace.jpg',
  runwayWhiteLaceDetail:       'runway-white-lace-aodai-detail-shoes.jpg',
  runwayBridalLineup:          'runway-bridal-aodai-5models-lineup.jpg',
  renaissanceGoldMotion:       'renaissance-gold-motion-logo.jpg',
  renaissanceBrocadeReclining:  'renaissance-ivory-brocade-reclining.jpg',
  renaissanceBridalReclingHero: 'renaissance-bridal-reclining-hero.jpg',
  renaissanceBlueTulle:        'renaissance-blue-tulle-portrait.jpg',
  renaissanceBlackSequin:      'renaissance-black-sequin-sitting.jpg',
  renaissanceRedTulle:         'renaissance-red-tulle-full-body.jpg',
  sableDuoJacquard:            'sable-duo-jacquard-bar-interior.jpg',
  sableBlackLaceBow:           'sable-black-lace-bow-gown-instagram.jpg',
  sableTealAodai:              'sable-teal-aodai-hotel-instagram.jpg',
  sableRedLaceAodai:           'sable-red-lace-aodai-red-carpet.jpg',
  sableGreenLaceCape:          'sable-green-lace-cape-red-curtain.jpg',
  footerAtelier:               'footer-atelier-chair-dark-wood.jpg',
  placeholder:                 '_placeholder.jpg',
};

export function getAsset(key: ImageKey): ImageMetadata {
  const filename = keyToFilename[key];
  const entry = images[`../assets/landing/${filename}`];
  if (!entry) {
    const fallback = images['../assets/landing/_placeholder.jpg'];
    if (!fallback) throw new Error(`[assets] placeholder missing`);
    return fallback.default;
  }
  return entry.default;
}
