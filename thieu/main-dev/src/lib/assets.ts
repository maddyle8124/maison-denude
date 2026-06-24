import type { ImageMetadata } from 'astro';

import imgHeroEmbroideredGown        from '../assets/landing/hero-embroidered-gown-back-portrait.jpg';
import imgHeroSilkHalter             from '../assets/landing/hero-silk-halter-back-detail.jpg';
import imgKolRedWall                 from '../assets/landing/kol-white-lace-red-floral-red-wall.jpg';
import imgKolSequinAodaiRooftop      from '../assets/landing/kol-black-sequin-aodai-rooftop-night.jpg';
import imgKolSequinFloral            from '../assets/landing/kol-black-sequin-floral-saigon-night.jpg';
import imgKolPlaceholder1            from '../assets/landing/kol-placeholder-1.jpg';
import imgKolPlaceholder2            from '../assets/landing/kol-placeholder-2.jpg';
import imgKolPlaceholder3            from '../assets/landing/kol-placeholder-3.jpg';
import imgRunwayGroup6               from '../assets/landing/runway-group-6models-maison-signage.jpg';
import imgRunwayTrioCityview         from '../assets/landing/runway-trio-cityview-black-red-pink.jpg';
import imgRunwayAodaiDetail          from '../assets/landing/runway-aodai-detail-dark-velvet.jpg';
import imgRunwayBridal5Models        from '../assets/landing/runway-bridal-5models-red-ivory.jpg';
import imgRunwayAodaiOrchidEmbroidery from '../assets/landing/runway-aodai-orchid-embroidery-detail.jpg';
import imgRunwayDragonEmbroidery     from '../assets/landing/runway-dragon-embroidery-aodai-teal.jpg';
import imgRunwayBlackKaftan          from '../assets/landing/runway-black-kaftan-silver-lace-solo.jpg';
import imgRunwayAodaiOrchidCloseup   from '../assets/landing/runway-aodai-orchid-closeup-lace.jpg';
import imgRunwayWhiteLaceDetail      from '../assets/landing/runway-white-lace-aodai-detail-shoes.jpg';
import imgRunwayBridalLineup         from '../assets/landing/runway-bridal-aodai-5models-lineup.jpg';
import imgRenaissanceGoldMotion      from '../assets/landing/renaissance-gold-motion-logo.jpg';
import imgRenaissanceBrocadeReclining from '../assets/landing/renaissance-ivory-brocade-reclining.jpg';
import imgRenaissanceBridalReclingHero from '../assets/landing/renaissance-bridal-reclining-hero.jpg';
import imgRenaissanceBlueTulle       from '../assets/landing/renaissance-blue-tulle-portrait.jpg';
import imgRenaissanceBlackSequin     from '../assets/landing/renaissance-black-sequin-sitting.jpg';
import imgRenaissanceRedTulle        from '../assets/landing/renaissance-red-tulle-full-body.jpg';
import imgSableDuoJacquard           from '../assets/landing/sable-duo-jacquard-bar-interior.jpg';
import imgSableBlackLaceBow          from '../assets/landing/sable-black-lace-bow-gown-instagram.jpg';
import imgSableTealAodai             from '../assets/landing/sable-teal-aodai-hotel-instagram.jpg';
import imgSableRedLaceAodai          from '../assets/landing/sable-red-lace-aodai-red-carpet.jpg';
import imgSableGreenLaceCape         from '../assets/landing/sable-green-lace-cape-red-curtain.jpg';
import imgFooterAtelier              from '../assets/landing/footer-atelier-chair-dark-wood.jpg';
import imgPlaceholder                from '../assets/landing/_placeholder.jpg';

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

const assetMap: Record<ImageKey, ImageMetadata> = {
  heroEmbroideredGown:          imgHeroEmbroideredGown,
  heroSilkHalter:               imgHeroSilkHalter,
  kolRedWall:                   imgKolRedWall,
  kolSequinAodaiRooftop:        imgKolSequinAodaiRooftop,
  kolSequinFloral:              imgKolSequinFloral,
  kolPlaceholder1:              imgKolPlaceholder1,
  kolPlaceholder2:              imgKolPlaceholder2,
  kolPlaceholder3:              imgKolPlaceholder3,
  runwayGroup6:                 imgRunwayGroup6,
  runwayTrioCityview:           imgRunwayTrioCityview,
  runwayAodaiDetail:            imgRunwayAodaiDetail,
  runwayBridal5Models:          imgRunwayBridal5Models,
  runwayAodaiOrchidEmbroidery:  imgRunwayAodaiOrchidEmbroidery,
  runwayDragonEmbroidery:       imgRunwayDragonEmbroidery,
  runwayBlackKaftan:            imgRunwayBlackKaftan,
  runwayAodaiOrchidCloseup:     imgRunwayAodaiOrchidCloseup,
  runwayWhiteLaceDetail:        imgRunwayWhiteLaceDetail,
  runwayBridalLineup:           imgRunwayBridalLineup,
  renaissanceGoldMotion:        imgRenaissanceGoldMotion,
  renaissanceBrocadeReclining:  imgRenaissanceBrocadeReclining,
  renaissanceBridalReclingHero: imgRenaissanceBridalReclingHero,
  renaissanceBlueTulle:         imgRenaissanceBlueTulle,
  renaissanceBlackSequin:       imgRenaissanceBlackSequin,
  renaissanceRedTulle:          imgRenaissanceRedTulle,
  sableDuoJacquard:             imgSableDuoJacquard,
  sableBlackLaceBow:            imgSableBlackLaceBow,
  sableTealAodai:               imgSableTealAodai,
  sableRedLaceAodai:            imgSableRedLaceAodai,
  sableGreenLaceCape:           imgSableGreenLaceCape,
  footerAtelier:                imgFooterAtelier,
  placeholder:                  imgPlaceholder,
};

export function getAsset(key: ImageKey): ImageMetadata {
  return assetMap[key] ?? imgPlaceholder;
}
