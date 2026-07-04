# Maison Denude — Project Overview

## Client

| | |
|--|--|
| **Brand** | Maison Denude |
| **Address** | 194 Lê Thánh Tôn, Quận 1, TP.HCM (tầng 2) |
| **Founder** | Chi Bui (to be confirmed) |
| **Positioning** | Premium bespoke & artisanal fashion — NOT fast fashion |
| **Core products** | Áo dài bespoke, occasion wear, tailoring, swimwear |
| **Brand tone** | Sultry, feminine power, heritage-inspired, luxury Saigon |
| **Facebook followers** | ~4.4K |
| **Previous website** | Built by another company — engagement ended; Thiệu rebuilds from scratch |

## Team

| Person | Role |
|--------|------|
| **Thiệu (= Matthew)** | Website dev + SEO lead — all implementation |

Thiệu and Matthew are the same person. Matthew is the English name used in client-facing documents.

## Project Status

- **Kickoff date:** 2026-05-31
- **Target go-live:** ~2026-07-19 (7 weeks from kickoff)
- **Current phase:** Phase 0 — Setup (blocked on OQ-001, OQ-002)

## Tech Stack (one-liner)

Astro (hybrid render) → Cloudflare Pages (free) → Supabase (single backend) + Cloudflare R2 (media) → GA4 + GTM + Search Console. Includes a minimal collections CMS (`/admin`) and a server-stored wishlist + metrics (MD-031–038).

## Phase Summary

| Phase | Name | Deliverable | Week |
|-------|------|-------------|------|
| 0 | Setup | Access, scaffold, Supabase, Cloudflare, tracking accounts | 1 |
| 1 | SEO Foundation | GTM/GA4/GSC live, keyword map, design wireframe approved | 1–2 |
| 2 | Core Build | `/`, `/booking`, booking form → email live, modal working | 2–3 |
| 3 | Blog + Content | `/blog` live, first 2–3 SEO posts, backlinks started | 3–4 |
| 4 | Review #1 | Saturday 15:00 call, feedback incorporated within 48h | 4 |
| 5 | Tính năng thêm + Polish | Tính năng thêm A/B (if chosen), cross-browser QA, Lighthouse > 90 | 5–6 |
| 6 | Go-Live | Full SEO audit passed, sitemap submitted, site live, handover docs | 7 |

## Open Questions (blocking or pending)

See `open_questions.md` for the full log with answers and resolution dates.

Current blockers: **OQ-001** (booking email), **OQ-002** (domain) — Phase 0 cannot start until both are answered.

## How to Debrief

Say `debrief` or `nhật ký hôm nay` to start a session summary.

After each session, update:
| File | What to update |
|------|---------------|
| `open_questions.md` | Mark OQ resolved, fill in answer + date |
| `decision.md` | Add MD-[next number] for the resolved OQ |
| `project_spec.md` | Update scope if anything changed |
| `plan.md` | Tick completed checklist items |

Commit format: `debrief(YYYY-MM-DD): [brief English summary]`
