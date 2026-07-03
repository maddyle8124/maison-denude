export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  // Absolute page routes only (D-NAV-02) — anchors break when the nav is rendered off-homepage.
  { label: 'HOME',         href: '/' },
  { label: 'ABOUT US',     href: '/about' },
  { label: 'COLLECTION',   href: '/collections' },
  // { label: 'SOCIAL CLUB',  href: '#featuring' }, // hidden per D-NAV-01 — restore when content exists
  // { label: 'FEATURING',    href: '#featuring' }, // hidden per D-NAV-01 — restore when content exists
  // { label: 'BLOG',         href: '/blog' },      // hidden per D-NAV-01 — restore when content exists
  { label: 'BOOKING',      href: '/booking' },
];
