# Task Tracker — Maison Dénudé Frontend (Preview + Booking)

> Phase tracker. Live status also mirrored in the harness Task list. History → `status_log.md`; resume anchor → `CONTINUITY.md`; decisions → `../frontend/decisions.md` (D-rows) + `../decision.md` (MD-rows).

| Phase | What | Owner | Model | Status | Note |
|-------|------|-------|-------|--------|------|
| 0 | Doc reorg → harness layout (decisions.md, sitemap/, management anchors) | orchestrator | Opus | done (pm-PASSED) | compaction anchor in place |
| 1 | Asset pipeline — HEIC→JPG, rename per asset-rename-list.md → `main-dev/src/assets/landing/`, logo_white→public/, _placeholder.jpg | bull | Haiku | done (pm-PASSED) | 30 files verified; 3 HEIC converted |
| 2 | Foundation — astro.config (output server + imageService), tokens.css + global.css + @font-face, Base.astro (GTM/GA4/Clarity), lib/assets.ts + SmartImage, add @supabase/supabase-js | general | Sonnet | done (pm-PASSED) | fix-loop: broken CSS link → frontmatter import → PASS |
| 3 | Content layer + sections — types.ts (Section union), landing.ts, nav.ts, SectionRenderer + 5 section components + Nav/Logo/SocialIcons, index.astro (prerender) | general | Sonnet | done (pm-PASSED) | all invariants PASS; 3 acceptable deviations logged |
| 4 | Deploy + tracking verify — fix CF account (D-DEPLOY-03), deploy to *.workers.dev, verify GTM/GA4/Clarity live | orchestrator | Opus | done (pm-PASSED) | GTM confirmed live; GA4+Clarity IDs pending PT-02/PT-03 |
| 5 | Booking (insert-only) — supabase.ts, email.ts stub, actions/index.ts, BookingForm, booking.astro, bookings table, secrets | general | Sonnet | done (pm-PASSED) | live insert verified via MCP; env access fixed to cloudflare:workers |
