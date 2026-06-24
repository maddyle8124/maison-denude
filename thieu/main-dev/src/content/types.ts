import type { ImageKey } from '../lib/assets';

export interface HeroSection {
  type: 'hero';
  id: string;
  imageDesktop: ImageKey;
  imageMobile: ImageKey;
  frameInset?: boolean;
}

export interface PhotoRowSection {
  type: 'photoRow';
  id: string;
  columns: 2 | 3;
  images: ImageKey[];
  label?: { line1: string; line2?: string };
}

export interface FeatureCollectionSection {
  type: 'featureCollection';
  id: string;
  label: { line1: string; line2: string };
  feature: ImageKey;
  grid: ImageKey[];
}

export interface VideoSection {
  type: 'video';
  id: string;
  label: string;
  poster: ImageKey;
  videoUrl?: string;
  orientation: 'full' | 'portrait';
}

export interface FooterSection {
  type: 'footer';
  id: string;
  background?: ImageKey;
  taglineTitle: string;
  taglineBody: string;
  socials: Array<{ label: string; href: string; icon: 'zalo' | 'facebook' | 'instagram' }>;
}

export type Section =
  | HeroSection
  | PhotoRowSection
  | FeatureCollectionSection
  | VideoSection
  | FooterSection;
