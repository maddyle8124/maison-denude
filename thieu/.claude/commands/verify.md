---
description: Route the just-finished work through the pm verification gate (PASS/FAIL against source docs) and drive the fix-loop until PASS.
argument-hint: [task or tracker row to verify]
---

Run the **verification loop** from the Agent Team Operating Protocol (`~/.claude/CLAUDE.md`) on the work described by `$ARGUMENTS` (or, if empty, the most recently completed task this session).

1. Assemble for **@pm** (VERIFY mode): the worker's completion report (or the artifacts + claimed scope), the source-of-truth docs for the active project, and the scope contract.
2. Spawn **@pm** in VERIFY mode. It returns `VERDICT: PASS|FAIL` with concrete file:line diffs and, on FAIL, a fix-spec.
3. **FAIL** → re-spawn the original worker (bull/general) with pm's fix-spec injected, then re-verify. Loop until PASS.
4. **PASS** → ensure the tracker row is marked done and a newest-on-top `status_log.md` entry is appended (have pm do it, or do it yourself), then report the verdict to the user.

Never declare work done without a pm PASS.
