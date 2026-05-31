---
name: context-init
description: >
  Initializes the withdanang context repository with the full folder structure and skeleton files,
  or adds a new product's folder structure to an existing repo. Also handles first-time repo setup
  including connecting to GitHub.

  ALWAYS trigger for: "init context for [product]", "set up context repo", "new product context",
  "add [product] to context", "khởi tạo context", "tạo folder cho [product]", or any request to
  create or scaffold the context knowledge base structure.
  Do NOT trigger for queries about existing content — use context-query for those.
---

# Context Init Skill

Sets up the folder structure for the withdanang context repo, either for first-time setup
or when adding a new product.

---

## Discovery Phase
# Discovery Phase — standard boot, keep in sync with other skills

Run this before doing anything.

1. **Set repo root** — use the current working directory. Do not hardcode any path.
2. **Check if `products/_index.md` exists.**
   - If missing: this is a first-time setup → go to Scenario A.
   - If present: repo exists → go to Scenario B or C based on user request.
3. **If a product is named:** check if `products/[product]/` folder already exists.
   - If it exists: tell the user "Folder already exists. Showing current structure." Then glob it and confirm what's present vs. missing before creating anything.
   - If it doesn't exist: proceed to scaffold.

---

## Scenario A: First-Time Repo Setup

Use when the repo doesn't exist yet.

```bash
git init
gh repo create thieudachill/withdanang --private --source=. --push
```

Then scaffold all repo-level files (see Repo-Level Files below), then scaffold the first product if named.

---

## Scenario B: Add a New Product

Use when the repo exists but a new product needs to be added.

1. Read `products/_index.md` to confirm the product doesn't already exist.
2. Create `products/[product-name]/` with all Standard Product Folder Structure files.
3. Update `products/_index.md` to add the product row.
4. Commit: `git commit -m "init([product-name]): add product context folder"`

---

## Scenario C: Add a New B2B Partner

Use when a named business partner needs a context folder under an existing product.

1. Identify which product the partner belongs to.
2. Create `products/[product]/b2b/[partner-name]/` with B2B skeleton files (see below).
3. Update `products/_index.md` — add row under B2B Partners section.
4. Commit: `git commit -m "init(b2b/[partner]): add B2B partner context folder"`

---

## Standard Product Folder Structure

```
products/[product]/
├── _overview.md
├── _routing.md          ← REQUIRED: routing config read by all skills
├── vision.md
├── decisions.md
├── open-questions.md
├── features.md
├── tasks.md
├── metrics.md
├── business-context/
│   ├── personas.md
│   ├── pain-points.md
│   ├── competitors.md
│   └── positioning.md
└── shaping/             ← empty folder, created on first use
```

---

### `_routing.md` template

```markdown
# [Product] — Routing Config

_Read by all skills during Discovery Phase. Last updated: YYYY-MM-DD._

## Architecture

| Layer | Folder | Purpose |
|-------|--------|---------|
| Business Context | `business-context/` | Centralized: who users are, why they care |
| Base | `./` | Cross-variant truths: vision, decisions, tasks, features, metrics |
| Shaping | `shaping/` | Pre-build design artifacts |

## Task ID Prefix
[PREFIX]-   (e.g. WD- for WithDaNang Main)

## Information Routing Table

### Business Context Layer
| Information Type | Target File | Operation |
|-----------------|-------------|-----------|
| Persona profile | `business-context/personas.md` | Update section |
| Pain point / JTBD / buying trigger | `business-context/pain-points.md` | Update section |
| Competitor | `business-context/competitors.md` | Update table row |
| Positioning / messaging | `business-context/positioning.md` | Update section |

### Base Layer
| Information Type | Target File | Operation |
|-----------------|-------------|-----------|
| Cross-product decision | `decisions.md` | Append row |
| Cross-product open question | `open-questions.md` | Append row |
| Vision change | `vision.md` | Update section |
| New task | `tasks.md` | Append row, assign next ID |
| Task update | `tasks.md` | Update status in-place |
| New feature | `features.md` | Append row |
| Feature status change | `features.md` | Update in-place |

## Routing Disambiguation Rules
- Affects all products → company-level or base layer
- Single product only → that product's base layer
- Who users are / what they feel → `business-context/`
- What we decided to build / ship status → base layer
```

---

### `business-context/personas.md` template

```markdown
# [Product] — Personas

_Centralized. Last updated: YYYY-MM-DD._

## Persona Map

| Persona | Description | Priority |
|---------|-------------|----------|

## Primary Persona: [Name]
[To be populated]

## Secondary Persona: [Name]
[To be populated]
```

### `business-context/pain-points.md` template

```markdown
# [Product] — Pain Points, JTBD & Buying Triggers

_Last updated: YYYY-MM-DD._

### Core Pains
| Pain | Description | Affected Personas |
|------|-------------|-------------------|

### Buying Triggers
[To be populated]

### Purchase Objections
[To be populated]

### Success Criteria
[To be populated]
```

### `business-context/competitors.md` template

```markdown
# [Product] — Competitors

_Last updated: YYYY-MM-DD._

## Competitor Table

| Brand | Website | Value Proposition | USP | Notes |
|-------|---------|-------------------|-----|-------|

## Competitive Position Notes
[To be populated]
```

### `business-context/positioning.md` template

```markdown
# [Product] — Positioning

_Last updated: YYYY-MM-DD._

## North Star Messaging
[To be populated]

## Core Differentiators
[To be populated]

## Product Scope
[To be populated]
```

---

## Repo-Level Files (first-time setup only)

`README.md`, `products/_index.md`, `company/_overview.md`, `company/strategy.md`, `company/team.md`, `daily-logs/_index.md`, `meta/changelog.md`, `meta/how-to-debrief.md`

---

## After Scaffolding

1. `git add .`
2. Commit: `init(repo): scaffold withdanang context structure` (or `init([product]): add product context folder`)
3. `git push`
4. Tell the user: "Structure is ready. Do you want to migrate existing docs now? Use 'migrate docs from [path]'."
