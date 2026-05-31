---
name: context-migrate
description: >
  Migrates existing product documentation into the withdanang context repo master files.
  Reads source docs, maps content to the correct target files, extracts implicit decisions
  embedded in prose, and seeds decisions.md with a dated decision log.

  ALWAYS trigger for: "migrate docs", "import existing docs", "seed from [folder/path]",
  "chuyển docs sang context repo", "import tài liệu", or any request to bring existing
  documentation into the context knowledge base structure.
  Do NOT trigger for queries — use context-query. Do NOT trigger for new scaffolding — use context-init.
---

# Context Migrate Skill

Migrates existing markdown documentation into the correct master files in the withdanang context repo.

---

## Discovery Phase
# Discovery Phase — standard boot, keep in sync with other skills

Run this before touching any file.

1. **Set repo root** — use the current working directory. Do not hardcode any path.
2. **Read `products/_index.md`** — confirm repo is initialized.
   - If missing: tell the user to run context-init first.
3. **Identify the product** — from the user's message or ask.
4. **Read `products/[product]/_routing.md`** — load the architecture and routing table.
   - If missing: glob the product folder, infer structure from what exists, present to user for confirmation before proceeding.
5. **Now migrate using the routing map from step 4.**

---

## Migration Workflow

### Step 1: Identify source files

Ask the user if not already provided:
> "Where are the docs? Give me the folder path or specific files."

### Step 2: Read all source files

Read every file in the source folder. Build an internal map:
- What product does this belong to?
- What type of information does it contain?
- Which target file does it map to, based on the `_routing.md`?

### Step 3: Check target files exist

Verify `products/[product]/` folder exists. If not:
> "Folder for [product] doesn't exist yet. Creating skeleton first."
Then run context-init for that product.

### Step 4: Migrate content

For each source file, migrate content into the correct target file using the routing table.

**Migration rules:**
- Do not blindly copy-paste entire files.
- Identify each section in the source, place it under the correct heading in the target.
- Preserve all original content — do not summarize or rewrite.
- Add a migration note at the top of each target file: `_Migrated from [source filename] on YYYY-MM-DD_`
- If a target file already has content, merge — do not overwrite existing entries.

### Step 5: Extract implicit decisions

This is the most important step. Read `references/decision-extraction-rules.md` for guidance.

Re-read all source files looking for implicit decisions: choices that were made, directions committed to, things explicitly ruled out. Each one becomes a row in `decisions.md` if it meets the classification bar (see `_routing.md` disambiguation rules).

### Step 6: Commit

```bash
git add products/
git commit -m "migrate([product]): seed context from [source], [N] decisions extracted"
git push origin main
```

---

## Content-Type Detection

When source files have no obvious mapping, detect content type from the file name and headings:

| If the source file contains... | Migrate to... |
|--------------------------------|---------------|
| Persona descriptions, target audience, "who they are" | `business-context/personas.md` |
| Pain points, JTBD, buying triggers, objections | `business-context/pain-points.md` |
| Competitor names, pricing, USPs | `business-context/competitors.md` |
| Positioning, messaging, differentiators, north star | `business-context/positioning.md` |
| Vision, long-term direction, core values | `vision.md` |
| Explicit decisions with rationale | `decisions.md` |
| Feature list, status, roadmap | `features.md` |
| Tasks, to-do items | `tasks.md` |
| SEO keywords, content strategy | `business-context/positioning.md` |

If a single source file contains multiple content types, split it across multiple target files.

---

## After Migration

1. Update `products/[product]/_overview.md` — set Last Updated for each migrated file to today's date.
2. Update `products/_index.md` — update the product row if status changed.
3. Commit and push (see Step 6 above).
