# withdanang.com — SEO Foundation

_Last updated: 2026-04-19_

This is the production-grade SEO checklist. Every item must pass before Phase 4 exits. Nothing ships until this is complete.

---

## Why SEO is the core business lever

withdanang.com earns through organic traffic → affiliate conversions. There is no paid acquisition budget. That means SEO is not a nice-to-have — it is the revenue model. Every architectural, content, and design decision should be evaluated through this lens.

---

## 1. Technical SEO (non-negotiable at launch)

### Crawlability & Indexing

- [ ] `public/robots.txt` — allows all crawlers, points to sitemap
- [ ] `@astrojs/sitemap` plugin installed and configured in `astro.config.mjs`
- [ ] Sitemap submitted to Google Search Console after launch
- [ ] No accidental `noindex` tags on production pages
- [ ] All pages reachable from internal links (no orphan pages)

### URL Structure

- [ ] All URLs are lowercase, hyphen-separated slugs (no underscores, no capitals)
- [ ] No trailing slashes inconsistency — pick one and enforce across all links
- [ ] Canonical tag on every page (`<link rel="canonical" href="..." />`) — in `BaseLayout.astro`

### Meta Tags (templated in `BaseLayout.astro`)

- [ ] `<title>` — every page has a unique title, max 60 characters
- [ ] `<meta name="description">` — every page, max 160 characters, written to be clicked
- [ ] Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [ ] Twitter card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] Default OG image created (1200×630px) for pages without a custom image

### Performance (Core Web Vitals)

Astro static output is fast by default but these must be verified:
- [ ] LCP < 2.5s — largest contentful paint. Check hero images are preloaded.
- [ ] CLS < 0.1 — no layout shifts. All images have explicit width/height.
- [ ] INP < 200ms — interaction to next paint. Minimize client-side JS.
- [ ] All images converted to WebP and served with correct `width`/`height` attributes
- [ ] Hero/above-fold images use `loading="eager"` + `fetchpriority="high"`. All others `loading="lazy"`.
- [ ] No render-blocking resources

### Mobile

- [ ] Responsive design — mobile-first. Test on 375px width minimum.
- [ ] Tap targets minimum 44×44px
- [ ] No horizontal scroll on mobile

### Infrastructure

- [ ] HTTPS — automatic on Vercel
- [ ] No broken internal links — run a link checker before launch
- [ ] 404 page exists (`src/pages/404.astro`)
- [ ] Redirects configured for any URL changes

---

## 2. Structured Data (Schema.org)

Structured data helps Google understand what each page is about and can produce rich results. Add JSON-LD in `BaseLayout.astro` with page-type overrides via props.

### Global (every page)
```json
{
  "@type": "WebSite",
  "name": "WithDaNang",
  "url": "https://withdanang.com",
  "description": "Trustworthy, locally authentic information about life in Da Nang for non-Vietnamese speakers"
}
```

### Homepage
```json
{
  "@type": "Organization",
  "name": "WithDaNang",
  "url": "https://withdanang.com",
  "founder": { "@type": "Person", "name": "Thieu" },
  "areaServed": "Da Nang, Vietnam"
}
```

### Blog posts
```json
{
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Person", "name": "Thieu" },
  "datePublished": "YYYY-MM-DD",
  "image": "..."
}
```

### /people profiles
```json
{
  "@type": "Person",
  "name": "...",
  "jobTitle": "...",
  "url": "https://withdanang.com/people"
}
```

### /events items
```json
{
  "@type": "Event",
  "name": "...",
  "startDate": "...",
  "location": { "@type": "Place", "name": "...", "address": "Da Nang, Vietnam" }
}
```

---

## 3. E-E-A-T (Experience, Expertise, Authoritativeness, Trust)

Google's quality rater guidelines weight these heavily for "Your Money or Your Life" adjacent content (travel, accommodation, relocation). This site falls squarely in that category.

- [ ] **Experience:** All content references real, lived experience in Da Nang. Specific street names, real prices, personal anecdotes. Generic descriptions will not rank.
- [ ] **Expertise:** Thieu's 23-year local background and former tour guide role must be stated on `/about` and in every blog post author bio.
- [ ] **Authoritativeness:** Author name on all blog posts. Real photos on `/people`. No anonymous content.
- [ ] **Trust:**
  - [ ] `/about` page exists with real founder story and photo
  - [ ] Affiliate disclosure in footer and on any page with affiliate links
  - [ ] Contact method visible (WhatsApp or email in footer)
  - [ ] No paid-placement masquerading as recommendations (stated in /about)

---

## 4. Content SEO

### Keyword targeting per page

| Page | Primary keyword | Secondary keywords |
|---|---|---|
| Homepage | da nang expat guide | living in da nang, moving to da nang |
| /neighborhoods | best neighborhoods in da nang | where to live in da nang, da nang districts expats |
| /cost-of-living | da nang cost of living 2026 | how much to live in da nang, da nang monthly expenses |
| /where-to-stay | da nang apartments for rent expats | long term accommodation da nang |
| /work | da nang coworking spaces | digital nomad da nang, internet da nang |
| /food | best local food da nang | da nang restaurants locals eat |
| /communities | da nang expat community | expat groups da nang, things to do da nang |
| /people | local guides da nang | da nang tour guide, local expert da nang |
| Blog posts | One specific long-tail keyword each | — |

### Internal linking rules

- Every page must link to at least 3 other pages
- /cost-of-living → /where-to-stay (natural next step for users)
- /neighborhoods → /where-to-stay (natural next step)
- All blog posts → at least one cornerstone page
- Homepage → all main sections
- /people → /communities and vice versa
- "Find a Room" CTA appears on: homepage, /neighborhoods, /cost-of-living, /where-to-stay

### Content quality rules (for AI agents and human writers)

- Every page must answer a specific question a real user searches for
- Use specific Da Nang details — street names, real price ranges, actual neighborhood names
- No filler paragraphs. Every sentence earns its place.
- Descriptions from 160 characters must be compelling, not summary sentences

---

## 5. Analytics & Search Console

- [ ] Google Analytics 4 installed in `BaseLayout.astro` (or Plausible for privacy-first)
- [ ] Google Search Console property created for withdanang.com
- [ ] HTML verification tag added before launch
- [ ] Sitemap URL submitted in Search Console after launch
- [ ] Core Web Vitals report checked in Search Console after first week

---

## Launch SEO Checklist (run before Phase 4 exits)

Run these tools before declaring the site ready:

1. **Google Search Console** — no coverage errors, sitemap submitted
2. **PageSpeed Insights** — all pages score 90+ on mobile
3. **schema.org validator** — no errors on structured data
4. **Screaming Frog (free tier)** or ahrefs webmaster — crawl for broken links, missing meta, duplicate titles
5. **Mobile-Friendly Test** (Google) — pass on all key pages
6. **Manual check** — visit every page, click every internal link
