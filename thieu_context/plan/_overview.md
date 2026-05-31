# Maison Dénudé — Project Plan Overview

_Last updated: 2026-05-31_

## Goal

Ship a production-grade Maison Dénudé website that:
- Passes a full technical SEO audit before go-live
- Has the booking system live and tested
- Has cornerstone content to earn organic traffic from day one
- Converts visitors into booking inquiries

## Locked Constraints

| Constraint | Decision |
|-----------|---------|
| Tech stack | Astro + Cloudflare adapter |
| Hosting | Cloudflare Pages (free tier) |
| Database | Supabase (free tier) |
| Booking | Supabase Edge Function → email |
| Domain | Purchased by Maison Dénudé (unknown — OQ-002) |
| Language default | English |
| Multi-language | Open question (OQ-005) |
| CMS | None — Thiệu manages |
| Wishlist auth | Anonymous, local storage only |
| Analytics | GA4 + GTM + Search Console on new Astro site |

## Site Map

| Page | Path | Purpose |
|------|------|---------|
| Home / Landing | `/` | Brand showcase, primary CTA |
| Blog | `/blog` | SEO; individual posts at `/blog/[slug]` |
| Booking | `/booking` | Full booking form |
| Booking Modal | all pages | Auto-triggers at 30s scroll (OQ-004) |

## Add-ons (Maison Dénudé Chooses)

| Add-on | Price | Status |
|--------|-------|--------|
| A — Google Calendar | +500,000 VND | Pending client |
| B — Wishlist | +1,000,000 VND | Pending client |

## Phase Map

| Phase | Name | Deliverable | Timeline |
|-------|------|-------------|---------|
| 0 | Setup | Access, scaffold, Supabase, Cloudflare | Week 1 |
| 1 | SEO Foundation | GTM/GA4/GSC live, keyword map, design approved | Week 1–2 |
| 2 | Core Build | Home, booking form + modal, /booking page | Week 2–3 |
| 3 | Blog + Content | /blog live, first SEO posts, backlinks | Week 3–4 |
| 4 | Review #1 | Client feedback incorporated | Week 4 |
| 5 | Add-ons + Polish | Add-ons A/B (if chosen), QA, mobile | Week 5–6 |
| 6 | Go-Live | Audit passed, Search Console verified, launched | Week 7 |

## Open Questions

| ID | Question | Owner |
|----|---------|-------|
| OQ-001 | Team email for booking submissions | Ask Maison Dénudé |
| OQ-002 | Domain URL | Ask Maison Dénudé |
| OQ-003 | Blog content language | Ask Maison Dénudé |
| OQ-004 | Booking popup trigger timing (default 30s) | Reconfirm with client |
| OQ-005 | Multi-language ZH/KO timeline | Defer — major architecture |
