---
description: Produce a fully-formed agent spawn prompt (universal rules + injected project paths + scope) for bull/general/pm — so you never hand-type the rules.
argument-hint: <bull|general|pm> <task description>
---

Build a complete, ready-to-run spawn for the agent named in `$ARGUMENTS` (first token = agent: `bull`, `general`, or `pm`; the rest = the task).

Follow the **Agent Team Operating Protocol** in this repo's `CLAUDE.md`. Specifically:

1. Identify the **active project** and resolve its source-of-truth paths: entry README, `decisions.md`, the relevant scope doc, the conventions doc. If the active project is ambiguous, ask which one before proceeding.
2. Compose the spawn prompt containing, in order:
   - The resolved source-of-truth paths.
   - The **Universal Worker Rules** (verbatim from the protocol in `CLAUDE.md`).
   - A tight **scope contract** for the task in `$ARGUMENTS` — what is in scope, what is explicitly out.
3. Pick the agent: honor the one named in `$ARGUMENTS`; if it's mis-routed for the task shape (e.g. a judgment task sent to `bull`), say so and recommend the correct agent before spawning.
4. Spawn the agent with that prompt. When it returns, route its report through the **pm verification gate** unless the task was itself a pm task.

Do not inject persona/honorific rules. Keep the spawn lean.
