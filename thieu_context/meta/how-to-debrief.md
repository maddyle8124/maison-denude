# How to Run a Daily Debrief — Maison Dénudé

---

## Steps

1. Open this context folder (`c:\maison\thieu_context\`) in your editor or AI session
2. Say: `debrief` or `nhật ký hôm nay` or `tổng kết ngày`
3. Talk through what happened — what you built, what you decided, what's blocked
4. AI will ask follow-up questions to fill gaps
5. Confirm the file updates (decisions, daily-log, changelog)
6. Commit: see `references/commit-protocol.md`

## What Gets Updated

| After each session | File |
|-------------------|------|
| New decisions | `references/decisions.md` — add MD-[next number] |
| Daily work log | `daily-logs/YYYY-MM-DD.md` |
| Changelog | `meta/changelog.md` — prepend new entry |
| Open questions resolved | `client/scope.md` or `plan/_overview.md` |

## Skill Triggers

| What you say | What happens |
|---|---|
| `debrief` | Starts daily debrief interview |
| `nhật ký hôm nay` | Same in Vietnamese |
| `what did we decide about X` | Queries decisions.md |
| `open questions` | Lists all OQ-00x items across plan files |
| `context for maison` | Reads and summarizes current project state |

## Open Questions to Chase

| ID | Question | Who to ask |
|----|---------|-----------|
| OQ-001 | Team email for booking submissions | Maison Dénudé |
| OQ-002 | Domain URL | Maison Dénudé |
| OQ-003 | Blog content language | Maison Dénudé |
| OQ-004 | Booking popup trigger (default 30s) | Maison Dénudé |
| OQ-005 | Multi-language ZH/KO timeline | Internal decision |
