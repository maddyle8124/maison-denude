# Maison Dénudé — Decision Log

_The legal source of truth. If any doc disagrees with a row here, this wins._
_Append-only: add the next `MD-xxx`; never rewrite history. Last updated: 2026-06-21._

## Decision Registry

| ID | Date | Decision | Rationale |
|----|------|----------|-----------|
| MD-001 | 2026-05-31 | Phase 1 total = 8,000,000 VND | 6M original SEO-only + 2M website scope add-on |
| MD-002 | 2026-05-31 | Duration = 7 weeks | 6 original + 1 extra week for website build |
| MD-003 | 2026-05-31 | Annual maintenance = 1,000,000 VND/year (free year 1) | Monthly data export + report + infra upkeep |
| MD-004 | 2026-05-31 | Domain: client buys their own | Thiệu does not purchase or own client domains |
| MD-005 | 2026-05-31 | Tech stack: Astro + Cloudflare Pages + Supabase | Free hosting, SEO-optimized output, Supabase free tier |
| MD-006 | 2026-05-31 | GA4 + GTM + Search Console installed on the new Astro site, not the old one | Old site is being replaced entirely |
| MD-007 | 2026-05-31 | Old website (built by another company) is replaced by this build | Maison ended prior web engagement |
| MD-008 | 2026-05-31 | Website = 3 pages: `/`, `/blog`, `/booking` | MVP scope; no collections or about page yet |
| MD-009 | 2026-05-31 | Booking modal auto-triggers ~30s after page load | Proactive conversion UX — reconfirm timing (OQ-004) |
| MD-010 | 2026-05-31 | Base booking: form → Supabase Edge Function → email to team | Simplest viable booking flow |
| MD-011 | 2026-05-31 | Sales manager handles accept/decline manually via Zalo/WhatsApp | Team prefers direct human conversation for high-value bespoke consultations |
| MD-012 | 2026-05-31 | No CMS — Thiệu manages all content | Maison does not self-edit the site |
| MD-013 | 2026-05-31 | Multi-language deferred — English is default | ZH/KO = major architecture change; deferred (OQ-005) |
| MD-014 | 2026-05-31 | Add-on A (Google Calendar) → sales manager's personal calendar | Simplest integration; shared calendar needs a service account |
| MD-015 | 2026-05-31 | Add-on B (Wishlist) is anonymous, no auth | Login = major scope increase; localStorage sufficient |
| MD-016 | 2026-05-31 | Add-on B analytics: Thiệu manually exports Supabase monthly | Included in maintenance; no custom dashboard needed |
| MD-017 | 2026-05-31 | Add-ons A & B are upsells — Maison chooses | Optional, not default scope |
| MD-018 | 2026-05-31 | Add-on B (Wishlist) price = 1,000,000 VND | Confirmed |
| MD-019 | 2026-05-31 | Add-on A (Google Calendar) price = 500,000 VND | Confirmed |
| MD-020 | 2026-05-31 | Supabase free tier limits acknowledged: 500MB DB, 500k Edge invocations/month | Within expected MVP usage |
| MD-021 | 2026-05-31 | Thiệu = Matthew — same person | Matthew is the English name used in client-facing docs |
| MD-022 | 2026-06-21 | Master context lives at `/context`; `/thieu/context` is Thiệu's personal scratchpad | Shared truth must be separable from personal dev notes; master never depends on personal |
| MD-023 | 2026-06-21 | Internal docs English-first; all client-side deliverables in Vietnamese | English aids AI recall + clean diffs; client reads Vietnamese |
| MD-024 | 2026-06-21 | Project team = Thiệu (dev/SEO) + Maddy (research) only | No third member; design handled within the two |
| MD-025 | 2026-06-11 | Domain = **maisondenude.com** on Mắt Bão (matbao.net); Thiệu added as technical manager | Client owns/registers; Thiệu needs DNS access for Cloudflare (resolves OQ-002) |
| MD-026 | 2026-06-11 | Blog briefs authored in English (primary); Vietnamese keyword sheet kept for later | EN search demand exists; VN volume near-zero now (resolves OQ-003) |
| MD-027 | 2026-06-15 | SEO/keyword strategy: niche-first, broaden later | Niche terms are uncontested → rank fast; "nuôi" broad terms after authority builds. Confirmed by Chi |
| MD-028 | 2026-06-15 | Payment terms = **Net** 9,500,000 (gross debated, reverted to net) | Chi: quality + commitment matter more than fee mechanics; net keeps it simple |
| MD-029 | 2026-06-18 | Deposit received → project officially started; build site shell first, apply design later | MD's graphic designer resigned → visual design delayed; decouple tracking/shell from design |
| MD-030 | 2026-06-15 | SEO tooling = SimilarWeb Pro (API) + manual workflow; no SEMrush | Cost-efficient, tailored; SEMrush features mostly unused for this scope |

## Session Log

### 2026-05-31 — Project kickoff
- Kickoff with Maison Dénudé. Major scope change: website now included (was SEO-only).
- Pricing defined: 8M base + 500k Add-on A + 1M Add-on B + 1M/year maintenance.
- Logged MD-001 to MD-021.
- Blocked on OQ-001 (email) and OQ-002 (domain) to start Phase 0.

### 2026-06-21 — Master context initialized
- Created `/context` master (shared truth) via `/context-init` (adapted to single-project, flat).
- Ported decisions MD-001–021 and open questions OQ-001–005.
- Logged MD-022 (master/personal split), MD-023 (language policy), MD-024 (team = Thiệu + Maddy).
- Market research / Playbook kept as pointer pending 5→3 market selection at the Saturday presentation.

### 2026-06-21 — Client context from WhatsApp chat
- Analyzed full project chat (5/16–6/18); enriched `client-context/stakeholders.md`.
- Key correction: **Chi is digitally engaged and opinionated**, not a passive non-technical founder; Michelle is a coordinator/approver, not the marketing brain; added Phan Hà (MD's in-house content writer).
- Captured Chi's **brand-language rules** in `client-context/positioning.md` (no "high end"; bespoke = luxury; not a "tailor").
- Logged MD-025 (domain), MD-026 (blog language), MD-027 (niche-first SEO), MD-028 (net payment), MD-029 (deposit in, build shell first / design delayed), MD-030 (SimilarWeb not SEMrush).
- Resolved OQ-002, OQ-003; added OQ-007 (competitor list to scrape). Deposit received 6/18 — project live.

## Commit protocol

Commit after each session from `c:\maison`:
```
git add . && git commit -m "debrief(YYYY-MM-DD): [summary]" && git push origin main
```

| Type | Format |
|------|--------|
| debrief | `debrief(YYYY-MM-DD): [summary]` |
| init | `init(context): [what was seeded]` |
| update | `update([file]): [what changed]` |
| fix | `fix([file]): correct [what]` |
| build | `build([feature]): [what was built]` |

Rules: always push to `main`; never amend — always append; log decisions here before committing.
Remote: https://github.com/maddyle8124/maison-denude
