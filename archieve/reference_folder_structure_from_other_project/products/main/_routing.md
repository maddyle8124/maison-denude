# Main Hub — Routing Config

_Read by all skills during Discovery Phase. Last updated: 2026-04-13._

## Architecture

| Layer | Folder | Purpose |
|-------|--------|---------|
| Business Context | `business-context/` | Who users are, why they're here, what they need |
| Base | `./` | Cross-product truths: vision, decisions, features, tasks, metrics |
| Shaping | `shaping/` | Pre-build design artifacts (created on demand) |

## Task ID Prefix
WD-   (WithDaNang Main)

## Information Routing Table

### Business Context Layer
| Information Type | Target File | Operation |
|-----------------|-------------|-----------|
| Persona profile | `business-context/personas.md` | Update section |
| Pain point / JTBD / buying trigger | `business-context/pain-points.md` | Update section |
| Competitor | `business-context/competitors.md` | Update table row |
| Positioning / messaging / SEO strategy | `business-context/positioning.md` | Update section |

### Base Layer
| Information Type | Target File | Operation |
|-----------------|-------------|-----------|
| Decision | `decisions.md` | Append row |
| Open question | `open-questions.md` | Append row |
| Vision change | `vision.md` | Update section |
| New task | `tasks.md` | Append row, assign next WD- ID |
| Task update | `tasks.md` | Update status in-place |
| New feature | `features.md` | Append row |
| Feature status change | `features.md` | Update in-place |
| Metric target or result | `metrics.md` | Update in-place |

## Routing Disambiguation Rules
- Who users are / what they feel → `business-context/`
- What we decided to build / ship status → base layer
- Affects all products → also note in `company/strategy.md`
- SEO keyword strategy → `business-context/positioning.md`
