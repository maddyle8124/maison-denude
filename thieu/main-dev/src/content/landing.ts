import type { Section } from './types';

export const landingSections: Section[] = [
  {
    type: 'hero',
    id: 'introduction',
    imageDesktop: 'renaissanceBridalReclingHero',
    imageMobile: 'heroSilkHalter',
    frameInset: false,
  },
  {
    type: 'photoRow',
    id: 'featuring',
    columns: 3,
    images: ['kolRedWall', 'kolSequinAodaiRooftop', 'kolSequinFloral'],
  },
  {
    type: 'featureCollection',
    id: 'collection',
    label: { line1: 'YOUR TRULY, MAISON DENUDE', line2: 'COLLECTION' },
    feature: 'runwayGroup6',
    grid: ['runwayTrioCityview', 'runwayAodaiDetail'],
  },
  {
    type: 'video',
    id: 'runway-video',
    label: 'RUNWAY VIDEO',
    poster: 'runwayGroup6',
    orientation: 'full',
  },
  {
    type: 'featureCollection',
    id: 'renaissance',
    label: { line1: 'RENAISSANCE', line2: 'COLLECTION' },
    feature: 'renaissanceGoldMotion',
    grid: ['renaissanceBrocadeReclining', 'renaissanceRedTulle'],
  },
  {
    type: 'video',
    id: 'video-renaissance',
    label: 'VIDEO RENAISSANCE',
    poster: 'renaissanceBlackSequin',
    orientation: 'full',
  },
  {
    type: 'photoRow',
    id: 'sable-orchids',
    columns: 3,
    label: { line1: 'SABLE ORCHIDS', line2: 'COLLECTION' },
    images: ['sableDuoJacquard', 'sableBlackLaceBow', 'sableTealAodai'],
  },
  {
    type: 'video',
    id: 'video-garden',
    label: 'VIDEO GARDEN',
    poster: 'footerAtelier',
    orientation: 'portrait',
  },
  {
    type: 'footer',
    id: 'footer',
    taglineTitle: 'Shade of Living',
    taglineBody: 'Beyond the fleeting form, each individual embodies the totality of their experiences and emotions. Maison Denude walks alongside you in the art of being, where every shade, every movement, every version of the self is honored and celebrated.',
    socials: [
      { label: 'Zalo',      href: '#', icon: 'zalo' },
      { label: 'Facebook',  href: '#', icon: 'facebook' },
      { label: 'Instagram', href: '#', icon: 'instagram' },
    ],
  },
];
