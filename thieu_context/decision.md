# Maison Dénudé — Decision Log

## Decision Registry

| ID | Date | Decision | Rationale |
|----|------|---------|-----------|
| MD-001 | 2026-05-31 | Phase 1 total = 8,000,000 VND | 6M original SEO-only + 2M website scope add-on |
| MD-002 | 2026-05-31 | Duration = 7 weeks | 6 original + 1 extra week for website build |
| MD-003 | 2026-05-31 | Annual maintenance = 1,000,000 VND/year | Includes monthly data export + report + infra upkeep |
| MD-004 | 2026-05-31 | Domain: client buys their own | Thiệu does not purchase or own client domains |
| MD-005 | 2026-05-31 | Tech stack: Astro + Cloudflare Pages + Supabase | Free hosting, SEO-optimized output, Supabase free tier |
| MD-006 | 2026-05-31 | GA4 + GTM + Search Console installed on new Astro site, not old | Old site is being replaced entirely |
| MD-007 | 2026-05-31 | Old website (built by other company) is replaced by this build | Maison Dénudé ended prior web engagement |
| MD-008 | 2026-05-31 | Website = 3 pages: /, /blog, /booking | MVP scope; no collections or about page yet |
| MD-009 | 2026-05-31 | Booking modal auto-triggers 30s after page load | Proactive conversion UX — reconfirm timing with client (OQ-004) |
| MD-010 | 2026-05-31 | Base booking: form → Supabase Edge Function → email to team | Simplest viable booking flow |
| MD-011 | 2026-05-31 | Sales manager handles accept/decline manually via Zalo/WhatsApp | Team prefers direct human conversation for high-value bespoke consultations |
| MD-012 | 2026-05-31 | No CMS needed — Thiệu manages all content | Maison Dénudé does not self-edit site |
| MD-013 | 2026-05-31 | Multi-language deferred — English is default | ZH/KO = major architecture change; deferred to later decision (OQ-005) |
| MD-014 | 2026-05-31 | Add-on A: Google Calendar — sales manager's personal calendar | Simplest integration; shared calendar would require service account |
| MD-015 | 2026-05-31 | Add-on B: Wishlist is anonymous, no auth required | Login = major scope increase; localStorage sufficient for use case |
| MD-016 | 2026-05-31 | Add-on B analytics: Thiệu manually exports Supabase data monthly | Included in maintenance; no custom admin dashboard needed |
| MD-017 | 2026-05-31 | Add-ons A & B are upsells — Maison Dénudé chooses | They are optional, not default scope |
| MD-018 | 2026-05-31 | Add-on B wishlist price = 1,000,000 VND | Confirmed |
| MD-019 | 2026-05-31 | Add-on A Google Calendar price = 500,000 VND | Confirmed |
| MD-020 | 2026-05-31 | Supabase free tier limits acknowledged: 500MB DB, 500k Edge invocations/month | Within expected usage for MVP |
| MD-021 | 2026-05-31 | Thiệu = Matthew — same person | Matthew is the English name used in client-facing proposals |

## Session Log

### 2026-05-31 — Project Kickoff

**What happened:**
- Kickoff meeting with Maison Dénudé
- Major scope change: website now included (was SEO-only)
- Defined full pricing: 8M base + 500k add-on A + 1M add-on B + 1M/year maintenance
- Initialized `thieu_context` folder
- Logged 21 decisions (MD-001 to MD-021)

**Open questions at end of day:**
- OQ-001: Team email — blocked Phase 0 start
- OQ-002: Domain URL — blocked Phase 0 start
- OQ-003: Blog language (VN only or EN?)
- OQ-004: Booking popup timing (30s default — confirm)
- OQ-005: Multi-language ZH/KO — deferred

**Blocked on:**
- Cannot start Phase 0 until OQ-001 (email) and OQ-002 (domain) answered
- Cannot confirm add-ons A & B until Maison Dénudé decides

**Next priorities:**
1. Send OQ-001, OQ-002, OQ-003, OQ-004 to Maison Dénudé
2. Present add-on A & B upsells to client
3. Start Phase 0 as soon as answers received

## Commit Protocol

**Standard commit after each session:**
```bash
cd c:\maison
git add .
git commit -m "debrief(YYYY-MM-DD): [brief English summary]"
git push origin main
```

**Commit message formats:**

| Type | Format | When |
|------|--------|------|
| debrief | `debrief(YYYY-MM-DD): [summary]` | After each working session |
| init | `init(context): [what was seeded]` | Initializing context files |
| update | `update([file]): [what changed]` | Manual context update |
| fix | `fix([file]): correct [what]` | Fixing incorrect entries |
| build | `build([feature]): [what was built]` | Website feature added |

**Examples:**
- `debrief(2026-05-31): project kickoff, scope confirmed, 21 decisions logged`
- `debrief(2026-06-01): home page scaffolded, booking form wired to supabase`
- `build(booking-modal): modal component built, auto-triggers at 30s`

**Rules:**
- Always push to `main` branch
- Never amend commits — always append
- Log major decisions in `decision.md` before committing
- Remote: https://github.com/maddyle8124/maison-denude
