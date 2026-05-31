# Commit Protocol — Maison Dénudé

_Reference for daily debrief and context updates._

---

## Standard Commit Sequence

```bash
cd c:\maison
git add .
git commit -m "debrief(YYYY-MM-DD): [brief English summary]"
git push origin main
```

## Commit Message Format

```
debrief(YYYY-MM-DD): [brief English summary of main topics]
```

**Examples:**
- `debrief(2026-05-31): project kickoff, thieu context initialized, scope confirmed`
- `debrief(2026-06-01): home page scaffolded, booking form wired to supabase`
- `debrief(2026-06-07): seo audit complete, go-live week 7`

## Other Commit Types

| Type | Format | Use when |
|------|--------|---------|
| init | `init(context): [what was seeded]` | Initializing context files |
| update | `update([file]): [what changed]` | Manual context update |
| fix | `fix([file]): correct [what]` | Fixing incorrect entries |
| build | `build([feature]): [what was built]` | Website feature added |

## Remote

**Repository:** https://github.com/maddyle8124/maison-denude

## Rules

- Always push to `main` branch
- Never amend commits — always append
- Log major decisions in `references/decisions.md` before committing
