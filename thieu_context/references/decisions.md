# Maison Dénudé — Decisions Log

_Last updated: 2026-05-31_
_Format: MD-[number] | Date | Decision | Rationale_

---

| ID | Date | Decision | Rationale |
|----|------|---------|-----------|
| MD-001 | 2026-05-31 | Phase 1 total = 8,000,000 VND | 6M original + 2M website scope add-on |
| MD-002 | 2026-05-31 | Duration = 7 weeks | 6 original + 1 week for website build |
| MD-003 | 2026-05-31 | Phase 2 (Maddy automation) is separate, 2–3M/month | Different scope and timeline |
| MD-004 | 2026-05-31 | Maintenance = 1,000,000 VND/year | Includes monthly data export + report + infra upkeep |
| MD-005 | 2026-05-31 | Domain: client buys their own | Team does not purchase or own client domains |
| MD-006 | 2026-05-31 | Tech stack: Astro + Cloudflare Pages + Supabase | Free hosting, SEO-optimized output, Supabase free tier for backend |
| MD-007 | 2026-05-31 | GA4 + GTM + Search Console installed on new Astro site, not old | Old site is replaced, not maintained |
| MD-008 | 2026-05-31 | Old website (built by other company) is replaced by this build | Maison Dénudé ended prior web engagement |
| MD-009 | 2026-05-31 | Website = 3 pages: /, /blog, /booking | MVP scope; no collections or about page yet |
| MD-010 | 2026-05-31 | Booking modal auto-triggers 30s after page load (reconfirm with client — OQ-004) | Proactive conversion UX |
| MD-011 | 2026-05-31 | Base booking: form → Supabase Edge Function → email to team | Simplest viable booking flow |
| MD-012 | 2026-05-31 | Sales manager handles accept/decline manually via Zalo/WhatsApp | Team prefers direct human conversation for high-value bespoke consultations |
| MD-013 | 2026-05-31 | No CMS needed — Thiệu manages all content | Maison Dénudé does not self-edit site |
| MD-014 | 2026-05-31 | Multi-language deferred — English is default | ZH/KO = major architecture change; deferred to later decision |
| MD-015 | 2026-05-31 | No Maddy context folder needed | Maddy has decision input only; Thiệu owns all implementation |
| MD-016 | 2026-05-31 | Add-on A: Google Calendar — sales manager's personal calendar | Simplest integration; shared calendar would require service account |
| MD-017 | 2026-05-31 | Add-on B: Wishlist is anonymous, no auth | Login = major scope increase; localStorage is sufficient for this use case |
| MD-018 | 2026-05-31 | Add-on B analytics: Thiệu manually exports Supabase data monthly, reports to team | Included in maintenance; no custom admin dashboard needed |
| MD-019 | 2026-05-31 | Add-ons A & B are upsells — Maison Dénudé chooses | They are optional, not default |
| MD-020 | 2026-05-31 | Wishlist price = 1,000,000 VND | Confirmed |
| MD-021 | 2026-05-31 | Thiệu = Matthew — same person | Clarified: Matthew is the English name used in the proposal |
