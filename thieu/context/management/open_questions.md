# Maison Dénudé — Open Questions

When an OQ is resolved:
1. Update the row here (Status → ✅ Resolved, fill in Answer + date)
2. Add a new MD-xxx entry in `decision.md` with the decision and rationale

---

## Active Questions

| ID | Question | Who to ask | Status | Answer | Resolved date |
|----|---------|------------|--------|--------|---------------|
| OQ-001 | Which email address receives booking form submissions? | Maison Dénudé | ❌ Open | — | — |
| OQ-002 | What is Maison Dénudé's domain? Do they have one yet? | Maison Dénudé | ✅ Resolved | maisondenude.com — connected to CF Worker, live on prod | 2026-06-26 |
| OQ-003 | Blog content language: Vietnamese only, or also English? | Maison Dénudé | ❌ Open | — | — |
| OQ-004 | Booking popup trigger timing: confirm 30s default? | Maison Dénudé | ❌ Open | — | — |
| OQ-005 | Multi-language (ZH/KO) — when, or is it ever in scope? | Internal decision | ⏸ Deferred | Deferred — English default confirmed; ZH/KO = major architecture change | 2026-05-31 |
| OQ-008 | Admin (`/admin`) auth method — shared Supabase account vs. magic-link to Maison's email? | Internal + Maison | ❌ Open | — | — |
| OQ-009 | Collection data shape — final fields, image hosting confirmed (R2, MD-038), ordering convention? | Internal | ⚠ Partly resolved | Image hosting = Cloudflare R2 (MD-038); fields/ordering TBD | — |
| OQ-010 | Exact interaction metrics events + what the monthly report shows | Internal + Maison | ❌ Open | — | — |
| OQ-011 | SEO/indexability + Lighthouse>90 strategy for the dynamic `/collections` page | Internal | ❌ Open | — | — |
| OQ-012 | Supabase keep-alive robustness — now load-bearing for the live site (was buffer). Redundant pinger + failure alert? | Internal | ❌ Open | — | — |

> **Note:** OQ-002 and OQ-003 are resolved in the master log (`/context`, 2026-06-11) — this personal file is behind; defer to the master. New architecture OQs (008–012) come from the 2026-06-21 foundation rethink (MD-031–038).

---

## Resolved Questions

*(Move rows here once resolved, keep for reference)*

| ID | Question | Answer | Resolved date | Decision logged |
|----|---------|--------|---------------|-----------------|
| OQ-005 | Multi-language ZH/KO timeline? | Deferred — English default; ZH/KO deferred to future decision | 2026-05-31 | MD-013 |
