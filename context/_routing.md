# Maison Dénudé — Routing Config

_Where new information goes. Read during Discovery before writing. Last updated: 2026-06-21._

## Architecture

| Layer | Folder | Purpose |
|-------|--------|---------|
| Base | `./` | Cross-cutting truth: vision, scope, decisions, open questions, team, timeline |
| Business Context | `client-context/` | Who the client + customers are, brand, positioning |
| Markets | `markets/` | Market research + Playbook (pointer only for now) |
| Meta | `meta/` | Changelog for this repo |

## Task / decision ID prefix

- Decisions: `MD-` (e.g. MD-022)
- Open questions: `OQ-` (e.g. OQ-006)

## Information Routing Table

| Information type | Target file | Operation |
|------------------|-------------|-----------|
| A decision was made | `decisions.md` | Append next `MD-xxx` row + rationale |
| A new unknown / blocker | `open-questions.md` | Append next `OQ-xxx` row |
| An OQ got answered | `open-questions.md` (mark resolved) + `decisions.md` (log MD) | Update + append |
| Scope change (in/out) | `scope.md` | Update section; log a decision |
| Vision / goal change | `vision.md` | Update section |
| Timeline / phase change | `timeline.md` | Update section |
| Team / role change | `team.md` | Update section |
| Brand fact (product, tone, social proof) | `client-context/brand.md` | Update section |
| Positioning / messaging | `client-context/positioning.md` | Update section |
| Client decision-maker info | `client-context/stakeholders.md` | Update section |
| End-customer persona | `client-context/personas.md` | Update section |
| Competitor | `client-context/competitors.md` | Add table row |
| Market research finding | `markets/_pointer.md` → follow to source | Note in source; pointer stays thin |
| Personal dev detail (frontend/backend/prototype) | `/thieu/context/...` | NOT master — keep in personal |

## Disambiguation rules

- Affects the whole project / more than one person → **master** (this folder).
- Only Thiệu's implementation detail → **`/thieu/context`** (personal).
- Who the client/customer is or what they feel → `client-context/`.
- What we decided to build / ship status → base layer (`decisions.md`, `scope.md`, `timeline.md`).
- Anything shown to the client → must be **Vietnamese** and live as a deliverable, not buried in master.
