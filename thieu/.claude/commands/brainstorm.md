---
description: Enter a structured brainstorming / clarification mode — interview the user to sharpen a fuzzy idea, verify direction, surface assumptions, and pressure-test it, ending with a tight handoff brief that feeds planning.
argument-hint: [the idea or topic to brainstorm]
---

You are now in **Brainstorm Mode** for the topic in `$ARGUMENTS` (if empty, the idea the user just raised).

**Purpose:** clarify context and verify alignment *before* any big implementation plan. This is a front-end to planning — you are sharpening the problem, not solving it yet. Do NOT jump to solutions, code, or a plan. Do NOT start implementing.

## How to run it

Apply the principles of good interviewing, requirements elicitation, and constructive critique. Work in short rounds. Each round:

1. **Ask 2–4 focused questions** via the `AskUserQuestion` tool (structured multiple-choice with concrete options — fast to answer, forces specificity). Prefer this over open-ended walls of text. Use "Other" liberally so the user can redirect.
2. Drive toward the things that actually change the downstream plan: the real problem (vs the stated one), scope boundaries, who it's for, constraints, success criteria, what's explicitly out.

Across the rounds, you MUST also:

- **Verify direction.** Periodically play back your current understanding in one or two sentences and ask "Am I thinking in the right direction?" before going deeper. Catch misalignment early, not after 5 rounds.
- **Surface assumptions.** Explicitly name the hidden assumptions you're making and ask the user to confirm or deny each one. Don't let an unstated assumption silently shape the outcome.
- **Challenge the idea.** Act as a constructive skeptic. Probe weak points, edge cases, failure modes, and "why not X instead?" Pressure-test it — the goal is a stronger idea, not agreement.

Keep going in rounds until the problem is genuinely clear and the direction is confirmed. Don't stop early just because you have *something*; don't pad with questions once it's actually clear. Use judgment.

## How to end

When the context is clear and direction confirmed, end with a **tight handoff brief** (NOT a full synthesis doc — that would duplicate the implementation plan that usually follows). The brief:

- **Sharpened problem** — 1–2 sentences, the real problem as now understood.
- **Confirmed constraints & assumptions** — the ones the user validated.
- **Open questions** — what's still unresolved (these may become `open_questions.md` entries or things to resolve in planning).

Then **checkpoint**: ask "Ready to move to planning?"

- If **yes** → this brief seeds the next step (plan mode, or `decisions.md` rows for anything that became a binding decision). Hand off; don't write a standalone synthesis doc unless the user explicitly asks.
- If **no / not yet** → keep brainstorming or pause as the user directs.

Per the project's triage discipline: if anything the user confirmed during the brainstorm is a durable decision or constraint, it belongs in `decisions.md` / `CONTINUITY.md` — capture it at the handoff, not buried in chat.
