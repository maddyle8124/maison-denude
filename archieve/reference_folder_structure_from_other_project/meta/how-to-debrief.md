# How to Run a Daily Debrief

1. Open Claude Code in the `context/` directory (or any directory — skills are global)
2. Type `debrief` (or `nhật ký hôm nay` / `tổng kết ngày`)
3. Talk about your day in Vietnamese — the AI will guide the conversation (~10 min)
4. The AI will ask follow-up questions to fill gaps
5. It may challenge your reasoning to surface cognitive biases — this is intentional
6. Confirm the file update plan when prompted ("push" or "được rồi push đi" to commit)
7. Check GitHub after to verify the commit went through

## Tips

- Don't structure your answer in Phase 1 — just dump everything naturally
- The AI skips questions you already answered organically
- Biases are flagged as "might be X" — not accusations. Engage with the reframe.
- The daily log is always created even for short sessions
- Contradictions with existing decisions are surfaced before committing — never silently overwritten

## Skill Triggers

| What you say | What happens |
|---|---|
| `debrief` | Starts the daily debrief interview |
| `nhật ký hôm nay` | Same — in Vietnamese |
| `what did we decide about X` | Queries the decisions log |
| `context for [product]` | Reads and summarizes a product's current state |
| `init context for [product]` | Creates a new product folder |
| `migrate docs from [path]` | Migrates existing docs into master files |

## Products

| Product ID | Name | Task Prefix |
|------------|------|-------------|
| main | withdanang.com hub | WD- |
| stay | stay.withdanang.com | ST- |
| escape | escape.withdanang.com | ES- |
| startup | startup.withdanang.com | SU- |
| food | TBD | FD- |
