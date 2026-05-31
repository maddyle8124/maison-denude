---
name: design-system-sync
description: >
  Keeps the /design-system page in sync with the actual component library.
  Detects when a new UI component is added to src/components/ui/, a new variant
  is added to an existing component, or a new section component is added to
  src/components/sections/. Adds the missing element to design-system.astro
  with real import, stub props, and a placed specimen.

  TRIGGER for: "sync design system", "update design system",
  "update design system with [component]", "add [component] to design system",
  "design system is out of date", "design system is missing [component]".

  DO NOT trigger for general component edits — only when the user
  explicitly wants the design-system page updated.
---

# design-system-sync Skill

## What This Skill Does

Keeps `src/pages/design-system.astro` in sync with the live component library at
`src/components/ui/` and `src/components/sections/`. It diffs the component
inventory against what the design-system page currently imports and renders,
then adds any missing elements.

## Trigger Phrases

- "sync design system"
- "update design system"
- "update design system with [component name]"
- "add [component] to design system"
- "design system is out of date"
- "design system is missing [component]"

---

## Phase 1: Discovery

1. **Inventory the component library:**
   - Glob `src/components/ui/*.astro` → list of all UI primitives
   - Glob `src/components/sections/*.astro` → list of all section components
   - Exclude: `Navbar.astro`, `Footer.astro` (shell components, not design tokens)

2. **Read the current design-system page:**
   - Read `src/pages/design-system.astro`
   - Extract all `import X from` lines → build the "imported" set
   - Scan the template body for `<X` tag occurrences → build the "rendered" set

3. **Build the diff:**
   - **Missing imports:** components in the glob but not in the imported set
   - **Imported but not rendered:** components imported but whose tag never appears in the template
   - **Missing variants:** for each rendered component, check if all `variant` and `theme` string union values from its Props interface are represented in the page (search for `variant="X"` or `theme="X"`)

4. **Report to user before acting:**
   Tell the user what will be added. Example:
   > "I found 1 unimported component (`MapCard.astro`) and 1 missing variant
   > (`Button variant="inverted"`). I'll add both to design-system.astro. Proceed?"

   Wait for confirmation before Phase 2.

---

## Phase 2: Execution

For each missing component:

### A. Determine placement

| Component type | Placement in design-system.astro |
|---|---|
| Atomic UI (Badge, Tag, Button, Divider, etc.) | Tile dashboard section — add a new `ds-tile` or extend existing tile |
| Card component (ends with `Card`) | "Cards in Composition" section — add a `ds-comp-group` |
| Section-level component | "Assembled Sections" section — add a `ds-specimen` |
| Form component | "Form UI" section — add or annotate |

### B. Add the import

Insert into the frontmatter import block in alphabetical order within its group (UI / sections / layouts).

### C. Add the rendered specimen

Use stub props:
- `imgSrc` / `photoUrl` / image URL → `https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=75`
- Any `Date` prop → `new Date('2026-04-30')` (use the `STUB_DATE` const already defined at the top)
- Any `href` → `"#"`
- String content → short, realistic placeholder (not "Lorem ipsum" — use Da Nang context)

For components with `theme="light"` and `theme="dark"` variants:
- Show both side-by-side using `<div class="ds-side-by-side">`

For components with multiple `variant` values on Button-like elements:
- Render all variants in a flex row within the same tile

### D. Label the specimen

Always add a `<span class="ds-section-overline ds-section-overline--sm">ComponentName · variant description</span>` above the rendered specimen.

---

## Phase 3: Variant Detection

For a component already imported, to detect missing variants:

1. Read the component file
2. Find the Props interface: look for `variant?: '...' | '...'` or `theme?: '...' | '...'`
3. Extract all string union values
4. Search `design-system.astro` for each `variant="VALUE"` or `theme="VALUE"` occurrence
5. Any missing value = add a demo alongside the existing ones in the correct tile

---

## Stub Props Reference

Always reuse these constants from the top of design-system.astro:

```astro
const STUB_IMG = 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=75';
const STUB_DATE = new Date('2026-04-30');
```

---

## Known Structure of design-system.astro

The page has these clearly labelled sections (search for the HTML comments):

```
<!-- 1. Hero -->
<!-- 2. Art Philosophy -->
<!-- 3. Tile Dashboard -->
<!-- 4. Components in Composition -->
<!-- 5. Section-Level Components -->
<!-- 6. Form UI -->
<!-- 7. Inconsistencies Audit -->
```

New atomic tokens go inside `<!-- 3. Tile Dashboard -->`.
New card components go inside `<!-- 4. Components in Composition -->`.
New section components go inside `<!-- 5. Section-Level Components -->`.
New form components go inside `<!-- 6. Form UI -->`.

After adding a new component, also consider whether it represents a **new inconsistency** to document in the audit section (section 7). If it's a component that exists but has known issues or is unused in production, add an audit entry.
