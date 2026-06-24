# Frontend Open Questions
_Last updated: 2026-06-24._
_Resolve before implementing the affected section. Ask Chi for client-facing questions._

---

## Client questions (ask Chi / Michelle)

| ID | Question | Affects | Priority |
|----|----------|---------|----------|
| FQ-01 | What is "INTRODUCTION" in the nav? Is it an About page with brand story + founder info? What content goes there? | Nav, site map | 🔴 High |
| FQ-02 | What is "SOCIAL CLUB"? Is it the KOL/featuring section, or a separate concept (community, events, private members)? | Nav, site map | 🔴 High |
| FQ-03 | What is "FEATURING"? Is it different from Social Club, or are these two names for the same thing? | Nav, site map | 🔴 High |
| FQ-04 | Do you have the 3 video files/URLs? (Runway Video, Video Renaissance, Video Garden) | Sections 4, 6, 8 | 🔴 High |
| FQ-05 | Nav hover/active state — underline, opacity change, or something else? | Nav | 🟡 Medium |
| FQ-06 | Footer botanical background — is there a specific photo you want, or should we find one? | Footer | 🟡 Medium |
| FQ-07 | Blog and Booking — should they appear in the footer text bar, or only in the nav? | Footer | 🟡 Medium |
| FQ-08 | Booking modal timing — confirm ~30 seconds? (OQ-004 from master context) | All pages | 🟡 Medium |
| FQ-09 | Which email receives booking form submissions? (OQ-001 from master context) | Booking flow | 🔴 High |

---

## Internal decisions needed (Thiệu)

| ID | Question | Affects | Priority |
|----|----------|---------|----------|
| FQ-I-01 | ~~ABChanel Corpo font files — do you have a licensed copy? If not, use Cormorant Garamond as placeholder.~~ **RESOLVED 2026-06-24** — files found in `context/reference/`; wired via `@font-face` in `global.css` + preload in `Base.astro` + copied to `public/fonts/`. | All pages | ~~🔴 High~~ |
| FQ-I-02 | HEIC images in `2.KOL_featuring/` — convert to JPG and review. Are any of the HEIC shots intended for Section 2? | Section 2 | 🟡 Medium |
| FQ-I-03 | Section 2 currently shows 3 KOL photos. Design shows 3 columns. Do we add a 4th column, or keep 3? | Section 2 | 🟢 Low |
| FQ-I-04 | For the "YOUR TRULY, MAISON DENUDE" section — is this the name of a specific collection, or a general label? Does it link to `/collections`? | Section 3 | 🟡 Medium |
| FQ-I-05 | Video sections: placeholder behavior before videos are provided — show static poster with play icon, or skip section entirely in shell? | Sections 4, 6, 8 | 🟡 Medium |
| FQ-I-06 | Booking modal — implement on landing page shell now (stub, no email send) or defer until OQ-001 resolved? | Booking | 🟡 Medium |
