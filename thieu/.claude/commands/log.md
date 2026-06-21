---
description: Append a status_log entry in the project's canonical format (newest-on-top) and refresh the CONTINUITY anchor.
argument-hint: [what happened]
---

Record progress for the active project, following its documentation conventions.

1. Resolve the active project's `management/status_log.md` and `management/CONTINUITY.md`.
2. **Append** a `status_log.md` entry **newest-on-top**, matching the file's existing format exactly (date, what changed, why, verification result). Use `$ARGUMENTS` as the substance; if empty, summarize what was accomplished this session.
3. **Refresh** `CONTINUITY.md` (the resume anchor): update the now-line, active task contracts + owners, last pm-PASSED state, next 1–3 actions, and blockers. Prune anything stale — keep it small.
4. Do not touch `decisions.md` unless a real decision was made (that's a `D0NN` row, via pm).

status_log is append-only history; CONTINUITY is a live resume doc. Don't confuse them.
