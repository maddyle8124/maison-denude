import type { ImageKey } from '../lib/assets';

/*
 * SEO content module (D-SEO-01).
 * Single source of truth for ALL SEO data: site identity, entity facts for
 * JSON-LD (Organization / ClothingStore), and per-page titles/descriptions.
 * URLs live here as data — never inline in markup (D-ARCH-01).
 *
 * Entity arrays (sameAs / subjectOf / mentions) are copied VERBATIM from the
 * verified mention-research report: context/SEO/03_entity_mentions.md
 * (research date 2026-07-03; every URL live-verified or search-verified there).
 *
 * Brand-language law: never "high end", never call the maison a "tailor".
 */

/** Official brand profiles — JSON-LD `sameAs`. */
export const sameAs: string[] = [
  'https://www.facebook.com/MaisonDenude',
  'https://www.instagram.com/maisondenude.official',
  'https://www.tiktok.com/@maison.denude',
  'https://www.threads.com/@maisondenude.official',
];

/** Verified press articles ABOUT the brand — JSON-LD `subjectOf` (CreativeWork URLs). */
export const subjectOf: string[] = [
  'https://tuoitre.vn/nld/nhung-khai-niem-an-tuong-o-maison-denude-196251224110909193.htm',
  'https://baovanhoa.vn/giai-tri/maison-denude-ra-mat-thuong-hieu-va-bo-suu-tap-ss26-tai-tphcm-191099.html',
  'https://cafebiz.vn/khi-thoi-trang-chon-thi-tham-thay-vi-pho-dien-hanh-trinh-tro-ve-voi-ve-dep-nguyen-ban-176251224105625019.chn',
  'https://vtv.vn/chat-lieu-ren-xuyen-thau-ton-vinh-ve-dep-cua-ao-dai-truyen-thong-100251225151003438.htm',
  'https://www.vietnam.vn/en/maison-denude-ra-mat-thuong-hieu-va-bo-suu-tap-ss26-tai-tp-hcm',
  'https://www.elledecoration.vn/decorating/inspiration/phong-cach-style-book-giam-doc-sang-tao-chi-bui',
];

/** Wardrobe-credit / roundup press mentions — JSON-LD `mentions` (strongest candidates). */
export const mentions: string[] = [
  'https://kenh14.vn/10-bo-ao-dai-xuat-sac-nhat-wechoice-awards-2024-day-roi-215250113225420564.chn',
  'https://bazaarvietnam.vn/tham-do-ao-dai-wechoice-awards-2024/',
  'https://dep.com.vn/now-and-then-su-hoa-tron-giua-hoai-co-va-hien-dai/',
  'https://dep.com.vn/leave-a-tender-moment-alone-tran-quy-khoanh-khac-hanh-phuc-tu-nhung-dieu-nho-be/',
  'https://dep.com.vn/deptet-spring-reunion-sac-xuan-ruc-ro-qua-lang-kinh-cua-nghe-thuat-to-son-moi-do-diem-phan-ma-hong-thoi-thuong/',
  'https://www.lofficielvietnam.com/local/ao-dai-ngay-tet-cap-nhat-vo-van-ban-cach-tan-tu-cac-thuong-hieu-viet',
  'https://www.youtube.com/watch?v=ALnly4iah0w',
];

/** Canonical organization entity facts. */
export const org = {
  name: 'Maison Denude',
  alternateName: 'Maison Denude',
  url: 'https://maisondenude.com',
  /** Public path to the logo asset; made absolute via Astro.site at render. */
  logoPath: '/logo_white.svg',
  description:
    'Maison Denude is a bespoke fashion house in Ho Chi Minh City, Vietnam — heritage-inspired áo dài, occasion wear and swimwear, artisanal and made in Saigon.',
  address: {
    streetAddress: '194 Lê Thánh Tôn, 2nd Floor',
    addressLocality: 'District 1',
    addressRegion: 'Ho Chi Minh City',
    addressCountry: 'VN',
  },
  founder: {
    name: 'Chi Bui',
    jobTitle: 'Creative Director',
  },
  foundingLocation: 'Ho Chi Minh City, Vietnam',
  knowsAbout: [
    'Bespoke áo dài',
    'Occasion wear',
    'Tailoring craft',
    'Swimwear',
    'Heritage-inspired fashion',
    'Artisanal craftsmanship',
    'Made in Saigon',
  ],
  sameAs,
  subjectOf,
  mentions,
} as const;

/** Site-wide SEO config. */
export const site = {
  siteName: 'Maison Denude',
  locale: 'en_US',
  /**
   * Default social-share image. The Renaissance collection hero (a real
   * editorial photograph) is used rather than the SVG logo: og:image must be
   * raster for most crawlers, and a garment photo represents the maison better
   * in link previews.
   */
  ogImageKey: 'renHeroWhiteJacquard' as ImageKey,
} as const;

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface PageSeo {
  /** Route path, no trailing slash (root = '/'). */
  path: string;
  title: string;
  description: string;
  /** Emit <meta name="robots" content="noindex"> and skip canonical. */
  noindex?: boolean;
  /** BreadcrumbList items, home first. Only on sub-pages. */
  breadcrumb?: BreadcrumbItem[];
}

/** Per-page titles/descriptions (~150-char descriptions, EN, lawful vocabulary). */
export const pages = {
  home: {
    path: '/',
    title: 'Maison Denude — Bespoke Áo Dài & Occasion Wear, Saigon',
    description:
      'Maison Denude is a bespoke fashion house in Saigon — heritage-inspired áo dài, occasion wear and artisanal craft at 194 Lê Thánh Tôn, District 1.',
  },
  about: {
    path: '/about',
    title: 'About the Maison — Maison Denude, Saigon',
    description:
      'The story of Maison Denude — a bespoke fashion house in Saigon founded by Chi Bui: heritage-inspired áo dài, occasion wear and artisanal craft.',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
    ],
  },
  collections: {
    path: '/collections',
    title: 'Renaissance — Spring Summer 2026 Collection | Maison Denude',
    description:
      'Renaissance, the Spring Summer 2026 collection by Maison Denude — bespoke áo dài and artisanal occasion wear, unveiled at Hôtel des Arts Saigon.',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Collections', path: '/collections' },
    ],
  },
  booking: {
    path: '/booking',
    title: 'Book a Private Consultation — Maison Denude, Saigon',
    description:
      'Request a private consultation at the Maison Denude atelier in Saigon — bespoke áo dài, bridal and occasion wear, fitted to you in District 1.',
    breadcrumb: [
      { name: 'Home', path: '/' },
      { name: 'Booking', path: '/booking' },
    ],
  },
  notFound: {
    path: '/404',
    title: 'Page Not Found — Maison Denude',
    description:
      'The page you are looking for does not exist. Return to Maison Denude — bespoke áo dài and occasion wear, made in Saigon.',
    noindex: true,
  },
} satisfies Record<string, PageSeo>;

/** Look up a page's SEO entry by pathname (trailing-slash tolerant). */
export function getPageSeo(pathname: string): PageSeo | undefined {
  const normalized =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return Object.values(pages).find((p) => p.path === normalized);
}
