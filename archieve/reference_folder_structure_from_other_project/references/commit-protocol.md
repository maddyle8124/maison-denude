# Commit Protocol

_Reference for the daily-debrief skill. Used during Phase 5 — Auto-Commit._

---

## Standard Commit Sequence

```bash
cd [repo root]
git add .
git commit -m "debrief(YYYY-MM-DD): [brief English summary of main topics]"
git push origin main
```

## Commit Message Format

```
debrief(YYYY-MM-DD): [brief English summary of main topics]
```

**Examples:**
- `debrief(2026-04-13): resolve subdomain architecture, seed main hub personas`
- `debrief(2026-04-14): stay product scoping, 2 new decisions on accommodation MVP`
- `debrief(2026-04-15): food product name decided, SEO pipeline approach confirmed`

## Other Commit Types

| Type | Format | Use when |
|------|--------|----------|
| init | `init([product]): add product context folder` | Adding new product folder |
| migrate | `migrate([product]): seed context from [source]` | Migrating existing docs |
| update | `update([product]): [what changed]` | Manual context updates |
| fix | `fix([file]): correct [what]` | Fixing incorrect entries |

## Remote

**Repository:** https://github.com/thieudachill/withdanang

## Notes

- Always push to `main` branch
- Never amend commits with context changes — always append new rows/files
- If push fails, check `git status` first before retrying
