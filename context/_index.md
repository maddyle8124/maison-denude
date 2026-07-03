# Maison Dénudé — Master Context

_The single source of truth for the Maison Dénudé engagement. Read this first._
_Last updated: 2026-07-03._

## What this is

This folder is the **shared, canonical context** for the whole Maison Dénudé project — read by the team (Thiệu + Maddy) and by AI sessions. If a fact about the project matters to more than one person, it lives here.

- **Master (`/context`)** = shared truth. Decisions, scope, brand, stakeholders, timeline.
- **Personal (`/thieu/context`)** = Thiệu's dev scratchpad (frontend/backend specs, prototypes, SEO data logs). It *links up* to master; master never depends on it.

When master and any other doc disagree, **master wins**. `decisions.md` is the legal source of truth within master.

## Language policy

- **Internal docs (this folder): English-first** — for AI consistency and clean diffs. Vietnamese is fine inline where it's clearer.
- **All client-side deliverables: Vietnamese.** Anything shown to Maison Dénudé (proposals, playbook, handover docs, reports) must be in Vietnamese.

## Map

| File | What's in it | Status |
|------|--------------|--------|
| `_routing.md` | Where new information goes | seeded |
| `vision.md` | Project goal + definition of done | seeded |
| `scope.md` | Contract scope, in/out, KPIs, deliverables | seeded |
| `decisions.md` | Canonical decision log (MD-xxx) | seeded |
| `open-questions.md` | Open questions (OQ-xxx) + resolution log | seeded |
| `team.md` | Delivery team + working model | seeded |
| `timeline.md` | 7-phase plan, milestones, go-live | seeded |
| `client-context/brand.md` | Brand snapshot, products, tone | seeded |
| `client-context/positioning.md` | Value prop, differentiators | seeded |
| `client-context/stakeholders.md` | Client decision-makers (Chi, Michelle) | seeded |
| `client-context/founder-signals.md` | Founders' intent: positioning/voice boundaries + how to work with them | seeded |
| `client-context/personas.md` | End-customer personas | draft (27/6 signals; ICP pending OQ-012) |
| `client-context/jtbd.md` | Jobs-to-be-Done — Maison-as-client + end-customer | seeded (27/6 transcript) |
| `client-context/competitors.md` | Competitive landscape | seeded (consideration-set + 3-POV, 27/6) |
| `markets/_pointer.md` | Market research + Playbook (pointer only) | pointer |
| `meta/changelog.md` | Change log for this context repo | seeded |

## Key facts (30-second brief)

- **Client:** Maison Dénudé — premium bespoke / artisanal fashion (áo dài + occasion/evening wear, ~50/50), Saigon. NOT fast fashion.
- **Engagement:** Phase 1, 7 weeks, kickoff 2026-05-31, target go-live ~2026-07-19. **8M VND** base (+ optional add-ons).
- **Deliverables:** SEO-optimized Astro website (3 pages) + digital tracking infra (GA4/GTM/GSC/GBP) + Digital Marketing Playbook (3 markets).
- **Team:** Thiệu/Matthew (dev + SEO), Maddy (research).
- **Status:** project live (deposit 6/18, domain resolved). Site to lead the next collection ~early July. **ICP delivered (4 personas, OQ-012 resolved); RTW line confirmed (OQ-009).** Next: data-sourcing sign-off (OQ-013) + pick 1–2 competitors to race keywords. Still need OQ-001 (booking email). Buyer base shifting VN → Việt Kiều.

## Related (outside master)

- `/MDenude_BrandHub_Internal.md` — internal strategy brain (upsell signals, market tactics). **Internal only — never share with client.**
- `/thieu/context/` — Thiệu's personal dev workspace.
- `/client_sources/` — raw client deliverables.
- GitHub: `maddyle8124/maison-denude`.
