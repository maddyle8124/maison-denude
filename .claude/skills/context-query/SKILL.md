---
name: context-query
description: >
  Answers questions about any WithDaNang product's current state, decisions, open questions,
  personas, flows, or strategy by reading the master files in the withdanang context repo.
  Use this skill whenever the user asks about past decisions, current product status, what was
  decided about a topic, or needs to recall context about any product (main, stay, escape, startup, food, etc.).

  ALWAYS trigger for: "what did we decide about X", "what's the current status of Y",
  "remind me about Z", "context for [product]", "tình trạng hiện tại của", "quyết định về",
  "mình đã quyết định gì về", or any question that requires recalling documented product knowledge.
  Do NOT trigger for daily debriefs — use daily-debrief skill for those.
---

# Context Query Skill

You are reading from the withdanang context knowledge base to answer questions about
any product or company context.

---

## Discovery Phase
# Discovery Phase — standard boot, keep in sync with other skills

Run this before answering any query.

1. **Set repo root** — use the current working directory. Do not hardcode any path.
2. **Read `products/_index.md`** — identify what products exist.
   - If missing: "Repo not initialized. Run context-init first."
3. **Identify the product in scope** — from the user's message. Ask if unclear.
4. **Read `products/[product]/_routing.md`** — load the product's architecture and routing table.
   - If missing: read `_overview.md` + glob the product folder to infer structure.
     Present inferred map to user: "Here's what I found — does this look right?" Wait for confirmation.
5. **Now answer using the routing map from step 4.**

---

## How to Answer a Query

1. Use the routing table from `_routing.md` to identify which file(s) to read.
2. Read only what's needed — start with the most specific file.
3. Answer directly — cite the file and section. Quote exact decisions with date and rationale.
4. Surface related context — if the answer touches open questions or contradictions, mention them.

---

## Default File Routing by Query Type

Use the product's `_routing.md` as the primary source. The table below is a fallback
for products that don't yet have a `_routing.md`.

| Query type | Read first | Also check |
|---|---|---|
| "Who is the target user / persona?" | `business-context/personas.md` | `_routing.md` for scope |
| "What pain does X persona have?" | `business-context/pain-points.md` | `business-context/personas.md` |
| "Who are the competitors?" | `business-context/competitors.md` | — |
| "What's the positioning / messaging?" | `business-context/positioning.md` | `vision.md` |
| "What did we decide about X?" | `decisions.md` | — |
| "What are the open questions?" | `open-questions.md` | — |
| "What's the product vision?" | `vision.md` | `business-context/positioning.md` |
| "What tasks are pending / active?" | `tasks.md` | Filter Active Tasks table |
| "What is [assignee] working on?" | `tasks.md` | Filter by Assignee column |
| "What's the status of feature Y?" | `features.md` | — |
| "What features are in dev / shaping / live?" | `features.md` | Filter by Status column |
| "What metrics are we tracking?" | `metrics.md` | — |
| "What happened on [date]?" | `daily-logs/YYYY/MM/YYYY-MM-DD.md` | — |
| "What products do we have?" | `products/_index.md` | — |
| "Company strategy?" | `company/strategy.md` | — |

---

## Answer Format

**For decision queries:**
> Decision #[N] (logged [date]): [decision].
> Rationale: [rationale].
> Alternatives rejected: [alternatives].
> Source: `[file path]`

**For open questions:**
> [N] open questions found for [product]:
> - OQ-[N]: [question] (added [date], priority: [priority])

**For status/overview queries:**
> Read `_overview.md` and summarize current phase, last updated dates per file, and any in-flight work.

---

## Surfacing Related Context

After answering, check:
- Are there open questions related to this topic? If yes: "Note: [N] unresolved questions related to this topic: [OQ-N]."
- Does this contradict a logged decision? If yes: "Note: this may conflict with Decision #[N]."
