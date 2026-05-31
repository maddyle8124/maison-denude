# withdanang.com — Content Strategy

_Last updated: 2026-04-24_

---

## Content Philosophy

Every piece of content on withdanang.com must pass this test:
> "Would a Da Nang local who has lived here 23 years write this differently than a travel blogger who spent 2 weeks here?"

If the answer is no — the content is not good enough. Generic descriptions, tourist-level framing, and filler paragraphs are the enemy. Real street names, real prices, personal experience, and honest opinions are the weapon.

---

## Page-by-Page Content Plan

Pages are grouped by nav dropdown. Ghost-category dropdowns (Settle, Daily Life, Work, Connect) have no URL — they are psychological groupings only.

---

### Homepage

**Job:** Orient new visitors. Show who this is for, what they'll find, and that there are real local people behind it.

**Sections:**
1. Hero — one-line statement of what this site is and who it's for
2. "Who this is for" — 2-3 sentences, explicitly NOT a tourist guide
3. Content gateway — cards linking to main sections (Live Here, Discover, Community, Blog)
4. "Meet the team" carousel — 4 people cards with name, role, and a service they offer
5. Latest blog posts — 3 most recent
6. CTA footer strip — "Need a room? Talk to us."

**Content to write:** Hero copy, intro paragraph, section descriptions. Short. Punchy. No filler.

---

---

### /master-guide

**Primary keyword:** `da nang expat guide` / `moving to da nang complete guide`

**Job:** The one page that covers everything. Acts as a central hub for all major content sections. A user who lands here should be able to understand Da Nang, make key decisions, and navigate to any deep-dive resource in under 5 minutes.

**Structure:**
- Intro: "Everything you need to live in Da Nang — in one page"
- Quick-read sections per topic (Neighborhoods, Cost of Living, Visas, Accommodation, Work, Food, Community) — 2–3 sentences each + link to the full hub page
- Recommendation panel: "Arriving in 30 days → start here"; "Already here → start here"
- CTA at bottom: "Need help finding a room? Talk to us."

**Link strategy:** Every major hub page should link back to /master-guide. Homepage prominently features a "Get the Master Guide" CTA.

---

## Settle

*(UI grouping — no URL)*

---

### /neighborhoods

**Primary keyword:** `best neighborhoods in da nang for expats`

**Job:** Help users understand Da Nang geographically and choose where to live.

**Structure:**
- Intro: how Da Nang is structured (beach side, city center, outskirts)
- One section per major zone — each with: vibe, expat density, typical rent range, best for, what's nearby
- Recommendation matrix at the bottom ("If you want X, live in Y")
- CTA: "Found your neighborhood? → Find a room there"

**Da Nang zones to cover (minimum for launch):**
- My Khe / An Thuong — beach area, high expat density
- Han River / City Center — urban core
- Son Tra Peninsula — quieter, nature-close
- Ngu Hanh Son / Marble Mountains — local, lower cost
- Hoa Xuan / Cam Le — emerging, very local

**Content source:** Thieu's direct knowledge. No research needed.

**Spoke pages (/neighborhoods/[slug]):** One MDX file per zone. Already planned for launch (An Thuong, Han River, Son Tra, Ngu Hanh Son, Hoa Xuan).

---

### /cost-of-living

**Primary keyword:** `da nang cost of living 2026`

**Job:** Give expats a realistic monthly budget breakdown. This is a high-traffic nomad research page.

**Structure:**
- Summary table: monthly budget ranges (budget / comfortable / comfortable+)
- Section per category: rent, food, transport, utilities, co-working, entertainment, healthcare
- Real numbers with context ("a Vietnamese breakfast is 30,000 VND, a western cafe is 80,000 VND")
- Comparison callout: Da Nang vs. Chiang Mai, Bali, Ho Chi Minh City
- CTA: "Looking for accommodation in budget? → Find a room"

**Update cadence:** Review every 6 months — prices change. Date-stamp prominently.

---

### /visas

**Primary keyword:** `vietnam visa requirements expats 2026` / `da nang long stay visa`

**Job:** Answer the first legal question every expat asks — "How long can I stay and how do I extend it?"

**Structure:**
- Overview: the 3 visa options relevant to expats (e-visa 90 days, tourist visa, business/investor visa)
- E-visa application process (step by step)
- How to extend and border-run reality in 2026
- Work and freelance legality (honest, clear)
- Disclaimer: "Not legal advice" + link to official Vietnamese immigration portal
- CTA: links to /coworking (remote workers) and /cost-of-living (budget planning with visa fees)

**Content source:** Thieu's local knowledge + current official sources. Review every 6 months or when Vietnamese immigration policy changes.

---

### /where-to-stay

**Primary keyword:** `da nang apartments for rent expats`

**Job:** Explain accommodation zones and capture room inquiry leads.

**Structure:**
- Intro: why Airbnb/Booking don't work for long-term expat stays
- Zone cards — same zones as /neighborhoods but accommodation-focused (typical apartment types, price ranges, streets to look at)
- "How it works" — 3 steps: fill the form → Thieu sends you a curated list → you pick
- Inquiry form (name, email, budget, zones, move-in date, duration, room type, notes)
- Disclosure: "I earn a small commission from landlords when you book — this never affects my recommendations"

**Form → Supabase `room_inquiries` table → Thieu gets notified by email**

---

## Daily Life

*(UI grouping — no URL)*

---

### /food

**Primary keyword:** `best local food da nang` / `where locals eat da nang`

**Job:** Guide expats to real Da Nang food experiences, not tourist traps. The hub covers food culture; individual spot pages (spokes) are built on demand.

**Structure (hub page):**
- Introduction to Da Nang food culture
- Must-eat dishes specific to Da Nang (Mi Quang, Banh Mi, fresh seafood)
- Neighborhood-by-neighborhood food guide
- "Tourist trap vs. local spot" callout
- Market guide overview with links to individual market/spot pages

**Spoke pages (/food/[slug]):** Individual restaurant or market MDX files. Build only when affiliate/partnership justifies a deep review.

**No affiliate play at launch.** Content-first, build traffic, introduce restaurant partnerships post-MVP.

---

### /gyms

**Primary keyword:** `gyms da nang` / `fitness clubs da nang expats`

**Job:** Help expats find a gym quickly. List-as-destination — the hub page is the answer.

**Structure (hub page):**
- Intro: gym culture in Da Nang, price range context
- Gym cards: name, price range (monthly), equipment highlights, location, expat-friendly rating
- Practical tips: negotiating monthly rates, what to bring

**Spoke pages (/gyms/[slug]):** Only for major gyms where a full review or affiliate relationship exists.

**Affiliate opportunity:** Gyms that offer referral discounts.

---

### /climate

**Primary keyword:** `da nang weather and climate` / `da nang typhoon season guide`

**Job:** Give expats a realistic, honest picture of Da Nang's weather — including the parts travel blogs skip.

**Structure:**
- Monthly breakdown (Jan–Dec): temperature, rainfall, conditions
- Typhoon season (Oct–Nov): what to expect, how to prepare, how serious it actually is
- "Best time to arrive" recommendation
- Practical advice: air conditioning costs, damp season effects on apartments
- CTA: links to /where-to-stay (choosing a flood-resistant zone)

**Content source:** Thieu's 23 years of local experience.

---

### /escape *(coming soon placeholder)*

**Job:** Reserve the URL and signal future value.

**Structure:**
- Headline: "Hidden Places. Coming Soon."
- One paragraph: what /escape will be (day trips, hidden spots, off-the-tourist-trail experiences with Thieu)
- Email signup or follow-on-social CTA to be notified at launch

**Note:** Static placeholder only — no MDX content collection needed at MVP.

---

## Work

*(UI grouping — no URL)*

---

### /coworking

**Primary keyword:** `best coworking spaces da nang` / `coworking da nang digital nomads`

**Job:** Answer the coworking question definitively. Every remote worker asks this before choosing a base city.

**Structure (hub page):**
- Intro: why Da Nang is a strong coworking city (internet quality, community, price)
- Coworking space cards: name, price/day, price/month, wifi speed, vibe, location, opening hours
- Recommendation matrix: "If you want X, go to Y"
- Affiliate links where available

**Spoke pages (/coworking/[slug]):** Full deep-dive reviews. Build for spaces with affiliate relationships first.

**Affiliate opportunity:** Many coworking spaces have referral programs.

---

### /cafes

**Primary keyword:** `cafes with fast wifi da nang` / `best work cafes da nang`

**Job:** Serve nomads and remote workers who prefer cafe flexibility over formal coworking.

**Structure (hub page):**
- Intro: working from cafes in Da Nang — the culture and expectations
- Cafe cards: name, wifi speed, noise level, price range, opening hours, neighborhood
- Tips: peak hours to avoid, cafe etiquette in Vietnam

**Spoke pages (/cafes/[slug]):** Individual deep-dives for popular or affiliate cafes.

**Affiliate opportunity:** Low — content value is primarily SEO and UX.

---

## Connect

*(UI grouping — no URL)*

---

### /communities

**Primary keyword:** `da nang expat community` / `expat groups da nang`

**Job:** Show expats where the Da Nang community already lives, both online and offline. The hub centralizes it; individual group pages (spokes) exist for communities that want a dedicated presence.

**Structure (hub page):**
- Intro: the Da Nang expat community is real but scattered — this page centralizes it
- Interest-based group cards: beach volleyball, coding, hiking, surfing, dancing, language exchange, etc. — each with group name, type, activity frequency, how to join
- Online communities section: Facebook groups, Reddit, Discord
- Regular events tied to communities (links to /events)

**Spoke pages (/communities/[slug]):** Deep pages for major groups or those that want a dedicated presence.

**Content source:** Thieu's network. Start with groups he personally knows, expand over time.

---

### /people

**Primary keyword:** `local guides da nang` / `da nang insider guide`

**Job:** Make the "local authenticity" moat visible. Real faces, real names, real services. Back in MVP scope — lives under Connect nav.

**Structure (hub page):**
- Opening statement: "We are withdanang.com — a team of Da Nang locals and long-term expats who built this because the existing guides weren't good enough."
- Profile cards (4 at launch): photo, name, role, services offered, how to contact
- Services section: what you can book/request
- Contact anchor (#contact) — target for the Connect dropdown CTA
- "Want to join us?" — brief statement, no form yet

**Spoke pages (/people/[slug]):** Individual profile pages for each person.

**Data source:** Supabase `people` table

---

### /blog

**Primary keyword:** varies per post — one specific long-tail keyword per article

**Job:** Long-form content that captures long-tail SEO traffic and builds domain authority.

**Content categories:**
- Moving guides ("How to move to Da Nang in 2026 — complete checklist")
- Neighborhood deep-dives ("Living in An Thuong — honest 6-month review")
- Practical guides ("How to rent an apartment in Da Nang without speaking Vietnamese")
- Cost breakdowns ("My actual spending in Da Nang for 3 months")
- Local experiences ("The Da Nang markets tourists never find")
- Community stories (post-MVP, when team grows)

**First 5 posts to publish at launch:**
1. "Da Nang Expat Guide 2026 — Everything You Need to Know Before Moving"
2. "Da Nang Cost of Living 2026 — Real Numbers from a Local"
3. "Best Neighborhoods in Da Nang for Expats and Digital Nomads"
4. "How to Find a Long-Term Apartment in Da Nang (Without Getting Ripped Off)"
5. "Da Nang for Digital Nomads — Coworking, Cafes, and the Remote Work Reality"

These 5 posts reinforce the 5 highest-traffic cornerstone pages with richer long-form content.

**Author:** All posts attributed to Thieu at launch. Author bio block on every post.

---

### /events (skeleton at launch)

**Job:** Show Da Nang is a living city with things happening.

**MVP scope:** A simple list of upcoming events — name, date, location, type. No scraping. Thieu adds events manually as MDX files.

**Post-MVP:** Automated scraping pipeline from Vietnamese event sources → translate → filter for expat relevance → publish.

---

### /about

**Job:** E-E-A-T page. Tells the brand story and establishes credibility.

**Content:**
- Why this site exists — the manipulation problem in Da Nang tourism information
- Thieu's background — 23 years in Da Nang, former tour guide, tech builder
- The team's approach — no paid placements, affiliate transparency, local-first
- Contact information
- Affiliate disclosure statement

**Location:** Footer only. Not in main nav.

---

## Content Production with AI Agents

**Agent role:** Research, draft, structure. Never publish without human review.

**Workflow:**
1. Agent drafts MDX with correct frontmatter schema
2. Thieu reviews: checks factual accuracy with local knowledge, adjusts tone
3. Thieu approves → file moves from `draft: true` to `draft: false` → deploys

**What agents can do autonomously:** Structure, formatting, SEO meta descriptions, internal link suggestions, image alt text

**What always needs Thieu:** Price accuracy, local knowledge accuracy, tone of voice, anything involving personal experience
