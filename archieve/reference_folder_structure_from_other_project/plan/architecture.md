# withdanang.com — Technical Architecture

_Last updated: 2026-04-24_

---

## Resolved Architectural Decisions

### Entity-based URL model — decoupled from UI navigation

The site uses a flat, two-level entity model: `/{entity-hub}` (Level 1) and `/{entity-hub}/{slug}` (Level 2). Navigation dropdowns (Settle, Daily Life, Work, Connect) are **ghost categories** — they exist only in the UI to reduce cognitive load. They have no corresponding URL.

**Breadcrumb rule:** `Home > Coworking > Enouvo Space` — never `Home > Work > Coworking > Enouvo Space`.

**MVP Lean Rule (List-as-Destination):** Hub pages do not generate Level 2 spoke pages unless a deep review or affiliate relationship specifically requires it. The hub *is* the destination.

---

### Path-based routing — not subdomains

`withdanang.com/stay`, `/food`, `/escape` — never `stay.withdanang.com`.

**Why:** The domain has zero authority at launch. Every page on a path contributes to one domain authority score. Subdomains are treated by Google as separate sites — you'd be building five zero-authority domains instead of one. Migrate to subdomains only after authority is established and branding demands it.

### Astro as the framework

`output: 'server'` — SSR by default via Cloudflare adapter. Static/guide pages opt in with `export const prerender = true`. Entity pages (gyms, cafes, food, etc.) are always server-rendered from live Supabase data — no redeploy needed to update content.

### Data architecture — Supabase + GCS

All entity data (gyms, cafes, coworking spaces, food spots, communities, events, neighborhoods, people) lives in Supabase tables. Images are hosted on Google Cloud Storage (public bucket) — GCS public URLs are stored as `text` in Supabase.

Blog posts and guide pages (`/master-guide`, `/cost-of-living`, `/visas`, `/climate`, `/about`) stay in MDX + content collections — static, prerendered at build time.

### Supabase client pattern — per-request factory

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export function createSupabaseClient() {
  return createClient(
    import.meta.env.SUPABASE_URL,
    import.meta.env.SUPABASE_ANON_KEY
  );
}
```

**Never a module-level singleton.** Cloudflare Workers reuse module instances across requests — a singleton would leak data between requests. Call `createSupabaseClient()` at the top of each SSR page's frontmatter.

### Rendering strategy

| Page type | Rendering | How |
|---|---|---|
| Blog posts | Static (prerendered) | `export const prerender = true` + `getStaticPaths` |
| Guide pages (`/visas`, `/climate`, etc.) | Static (prerendered) | `export const prerender = true` |
| `/escape` | Static (prerendered) | `export const prerender = true` |
| Entity hubs (`/gyms`, `/food`, etc.) | SSR (server-rendered) | Default — no prerender export |
| Entity spokes (`/gyms/[slug]`, etc.) | SSR (server-rendered) | Default — no prerender export |
| Blog index | SSR (server-rendered) | Default — shows new posts without rebuild |
| Homepage | SSR (server-rendered) | Default — live Supabase people data |

**Note:** `@astrojs/sitemap` with `output: 'server'` only includes prerendered pages in the generated sitemap. A dynamic sitemap endpoint for entity pages is a Phase 4 task.

---

## Deployment

- **Platform:** Cloudflare Pages
- **Adapter:** `@astrojs/cloudflare`
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Environment variables:** Set in Cloudflare Pages dashboard → Settings → Environment variables
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
- **Local dev:** Same vars in `main-dev/.env`
- **Branch strategy:** `master` = production

---

## Astro Project Structure

```
main-dev/
├── src/
│   ├── content/
│   │   └── blog/              YYYY-MM-DD-slug.mdx  (blog only — all other entity types in Supabase)
│   ├── lib/
│   │   └── supabase.ts        createSupabaseClient() factory — called per SSR request
│   ├── pages/
│   │   ├── index.astro
│   │   ├── master-guide.astro          (prerender=true)
│   │   ├── cost-of-living.astro        (prerender=true)
│   │   ├── visas.astro                 (prerender=true)
│   │   ├── climate.astro               (prerender=true)
│   │   ├── escape.astro                (prerender=true, coming-soon)
│   │   ├── about.astro                 (prerender=true)
│   │   ├── 404.astro                   (prerender=true)
│   │   ├── where-to-stay.astro         SSR — has room inquiry form
│   │   ├── neighborhoods/
│   │   │   ├── index.astro             SSR — Supabase: neighborhoods
│   │   │   └── [slug].astro            SSR — Supabase: neighborhoods
│   │   ├── food/
│   │   │   ├── index.astro             SSR — Supabase: food_spots
│   │   │   └── [slug].astro            SSR — Supabase: food_spots
│   │   ├── gyms/
│   │   │   ├── index.astro             SSR — Supabase: gyms
│   │   │   └── [slug].astro            SSR — Supabase: gyms
│   │   ├── coworking/
│   │   │   ├── index.astro             SSR — Supabase: coworking_spaces
│   │   │   └── [slug].astro            SSR — Supabase: coworking_spaces
│   │   ├── cafes/
│   │   │   ├── index.astro             SSR — Supabase: cafes
│   │   │   └── [slug].astro            SSR — Supabase: cafes
│   │   ├── communities/
│   │   │   ├── index.astro             SSR — Supabase: communities
│   │   │   └── [slug].astro            SSR — Supabase: communities
│   │   ├── events/
│   │   │   ├── index.astro             SSR — Supabase: events
│   │   │   └── [slug].astro            SSR — Supabase: events
│   │   ├── people/
│   │   │   ├── index.astro             SSR — Supabase: people
│   │   │   └── [slug].astro            SSR — Supabase: people
│   │   └── blog/
│   │       ├── index.astro             SSR — content collections (new posts appear without rebuild)
│   │       └── [slug].astro            prerender=true + getStaticPaths + BlogPostLayout
│   ├── components/
│   │   ├── sections/          Page section components
│   │   │   ├── Navbar.astro   4 dropdowns (Settle/Daily Life/Work/Connect) + Blog flat link
│   │   │   ├── Footer.astro
│   │   │   └── homepage/
│   │   └── ui/                Reusable elements (Card, Button, Badge, etc.)
│   ├── layouts/
│   │   ├── BaseLayout.astro   <head>, meta, analytics, schema — wraps everything
│   │   ├── PageLayout.astro   Navbar + Footer + slot
│   │   └── BlogPostLayout.astro
│   └── styles/
│       └── global.css         Design tokens (CSS variables)
├── astro.config.mjs            output:'server', @astrojs/cloudflare adapter, GCS image domain
├── .env                        SUPABASE_URL, SUPABASE_ANON_KEY
└── package.json
```

---

## Supabase Table Schemas

All tables share these base columns:
- `id` — `uuid`, primary key, `gen_random_uuid()`
- `slug` — `text unique` — used as URL path segment
- `image_url` — `text` — full GCS public URL (`https://storage.googleapis.com/...`)
- `is_active` — `boolean default true` — toggle visibility without deleting
- `draft` — `boolean default false` — hide from public while editing
- `display_order` — `integer default 0` — manual sort order
- `created_at` — `timestamptz default now()`

### `neighborhoods`

| Column | Type | Notes |
|---|---|---|
| slug | text unique | URL path segment |
| name | text | |
| description | text | SEO meta (max 160 chars) |
| vibe | text | Used as PageHero description |
| expat_density | text | low / medium / high |
| rent_range | text | e.g. "$300–500/month" |
| best_for | text[] | |
| long_description | text | HTML — rendered with `set:html` |
| image_url | text | GCS URL |

### `gyms`

| Column | Type | Notes |
|---|---|---|
| slug | text unique | |
| name | text | |
| description | text | |
| address | text | |
| neighborhood | text | |
| price_monthly | text | e.g. "200,000–500,000 VND/month" |
| equipment | text[] | |
| expat_friendly | boolean | |
| google_maps_url | text | |
| image_url | text | GCS URL |

### `cafes`

| Column | Type | Notes |
|---|---|---|
| slug | text unique | |
| name | text | |
| description | text | |
| address | text | |
| neighborhood | text | |
| wifi_speed | text | slow / medium / fast / excellent |
| noise_level | text | quiet / moderate / busy |
| price_range | text | |
| opening_hours | text | |
| google_maps_url | text | |
| image_url | text | GCS URL |

### `coworking_spaces`

| Column | Type | Notes |
|---|---|---|
| slug | text unique | |
| name | text | |
| description | text | |
| address | text | |
| neighborhood | text | |
| price_day | text | e.g. "80,000 VND/day" |
| price_month | text | e.g. "1,200,000 VND/month" |
| wifi_speed | text | |
| opening_hours | text | |
| amenities | text[] | |
| affiliate_url | text | |
| google_maps_url | text | |
| image_url | text | GCS URL |

### `food_spots`

| Column | Type | Notes |
|---|---|---|
| slug | text unique | |
| name | text | |
| description | text | |
| type | text | local / market / restaurant / street-food / cafe |
| address | text | |
| neighborhood | text | |
| price_range | text | |
| must_try | text[] | |
| google_maps_url | text | |
| image_url | text | GCS URL |

### `communities`

| Column | Type | Notes |
|---|---|---|
| slug | text unique | |
| name | text | |
| description | text | |
| type | text | sports / social / professional / language / online / cultural |
| platform | text | e.g. "Facebook Group", "WhatsApp", "In-person" |
| join_url | text | |
| activity_frequency | text | |
| expat_friendly | boolean | |
| image_url | text | GCS URL |

### `events`

| Column | Type | Notes |
|---|---|---|
| slug | text unique | |
| title | text | |
| description | text | |
| date | timestamptz | |
| end_date | timestamptz | |
| location | text | |
| type | text | social / sports / professional / cultural / other |
| source_url | text | |
| image_url | text | GCS URL |

### `people`

| Column | Type | Notes |
|---|---|---|
| slug | text unique | URL path segment |
| name | text | |
| role | text | e.g. "Local Guide", "Co-founder" |
| bio | text | Short paragraph |
| photo_url | text | GCS URL |
| services | text[] | e.g. ["Mountain tours", "City orientation"] |
| contact_link | text | WhatsApp or email link |
| display_order | integer | |
| is_active | boolean | |

### `room_inquiries`

| Column | Type | Notes |
|---|---|---|
| id | uuid | primary key |
| name | text | |
| email | text | |
| budget_usd | integer | Monthly budget in USD |
| preferred_zones | text[] | Da Nang neighborhood names |
| move_in_date | date | |
| duration_months | integer | |
| room_type | text | studio / 1BR / 2BR / house |
| notes | text | |
| created_at | timestamptz | |

---

## RLS Policies (Supabase)

Apply to all entity tables (`neighborhoods`, `gyms`, `cafes`, `coworking_spaces`, `food_spots`, `communities`, `events`, `people`):

```sql
-- Public read: only active, non-draft rows
CREATE POLICY "public_read" ON [table]
  FOR SELECT USING (is_active = true AND draft = false);
```

For `room_inquiries`:
```sql
-- Anyone can submit
CREATE POLICY "public_insert" ON room_inquiries FOR INSERT WITH CHECK (true);
-- Only authenticated users (Thieu) can read submissions
CREATE POLICY "auth_select" ON room_inquiries FOR SELECT USING (auth.role() = 'authenticated');
```

No public `INSERT/UPDATE/DELETE` on entity tables — admin only via Supabase dashboard.

---

## Image Hosting — Google Cloud Storage

All entity images are hosted in a public GCS bucket. The full URL (`https://storage.googleapis.com/[bucket]/[path]`) is stored as `text` in the `image_url` column of each Supabase table.

Astro is configured to allow GCS images:
```js
image: {
  domains: ['storage.googleapis.com'],
  remotePatterns: [{ protocol: 'https', hostname: 'storage.googleapis.com' }],
}
```

Blog post images continue to go to `public/images/blog/` as local files (WebP format).

---

## Blog Content Collection Schema

Defined in `src/content.config.ts`. The only remaining Astro content collection.

```ts
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    publishDate: z.date(),
    author: z.string().default('Thieu'),
    tags: z.array(z.string()),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});
```

File naming: `YYYY-MM-DD-slug.mdx`. All other entity types (events, neighborhoods, etc.) were removed from content collections — they now live in Supabase.

---

## AI Agent File Conventions

- Blog posts → `src/content/blog/YYYY-MM-DD-slug.mdx`
- Blog images → `public/images/blog/filename.webp` (always WebP)
- Entity data → Supabase tables (never MDX)
- Entity images → GCS bucket (URL stored in Supabase `image_url` column)
- `draft: true` for any blog content not ready to publish
- `is_active = false` / `draft = true` in Supabase for entity data not ready to publish
- Never modify `src/layouts/BaseLayout.astro` or `src/styles/global.css` without human review
