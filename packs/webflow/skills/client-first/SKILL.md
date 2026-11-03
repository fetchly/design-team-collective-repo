---
name: client-first
description: This skill should be used when the user works with Webflow, mentions "Client-First", "Finsweet", asks about Webflow class naming, Webflow project structure, Webflow utility classes, Webflow spacing strategy, Webflow typography strategy, Webflow folder organization, Webflow custom classes, Webflow combo classes, or builds any Webflow website. Provides the complete Finsweet Client-First methodology for Webflow development.
version: 2.0.0
---

# Finsweet Client-First - Webflow Design System & Methodology

Client-First is Finsweet's Webflow methodology that prioritizes client manageability, developer speed, project scalability, and organizational clarity. The core philosophy: put the client's interests first in the Webflow build process.

## Core Class Strategy

Classes divide into two categories using the underscore as delimiter:

### Custom Classes (contain underscore `_`)
- For specific components/elements on the page
- Format: `[folder]_[element-identifier]`
- Examples: `header-primary_content`, `footer_column`, `clients-slider_arrow`
- The underscore creates folder organization in the Styles panel

### Utility Classes (no underscore)
- For reusable CSS properties applied globally
- Format: `[property]-[value]` using only dashes
- Examples: `padding-global`, `text-color-secondary`, `background-color-dark`
- Auto-organize into prefix-based folders

### Global Classes
- Applied across the entire project for unified styling
- Both custom and utility classes can be global
- Must pass the test: "Does this benefit from global management?"

### Combo Classes (is- prefix)
- Variants stacked on a base class: `button is-primary`
- The `is-` class only works when combined with its base class
- Use when: base class has shared default properties worth inheriting
- Do NOT use when: shared properties provide no real benefit (e.g., containers)

## Naming Conventions

- General-to-specific structure: `text-size-large`, `team-list_headshot-wrapper`
- No abbreviations or shorthand — maximum descriptiveness
- Names should be self-documenting and searchable
- Class names should answer: "What is this class doing?"

## Core Structure (Required on Every Page)

```
page-wrapper
  main-wrapper (<main> tag)
    section_[identifier] (<section> tag)
      padding-global + padding-section-[size]
        container-[size]
          [page content]
```

- `page-wrapper` — outermost wrapper, minimal styling
- `main-wrapper` — `<main>` tag, wraps content between nav and footer
- `section_[identifier]` — `<section>` tag, organizes page sections
- `padding-global` — horizontal padding (left/right only)
- `padding-section-[size]` — vertical padding (top/bottom), sizes: small/medium/large
- `container-[size]` — max-width + auto margins for centering, sizes: small/medium/large

## Deep Stacking Limits

| Classes | Assessment |
|---------|-----------|
| 1-2 | Ideal |
| 3 | Acceptable, verify necessity |
| 4 | Absolute maximum |
| 5+ | Too many — create a custom class |

Avoid deep stacking by: creating custom classes, using nested div blocks, or using strategic combo classes.

## No Layout Utility System

Client-First deliberately excludes flex/grid/column utility classes. Build layouts with custom classes for full responsive control and easier handoff.

## Sizing: Rem Units

All sizing uses rem (1rem = 16px). Approved values: 0.5, 1, 1.5, 2, 2.5, 3, 4, 5rem and up.
Exceptions: typography 14px (0.875rem), minimal spacing 2px (0.125rem), borders use px.

## Typography Strategy

- HTML tags (H1-H6, p) are default styles — ideally no class on text elements
- Apply classes only when overriding defaults
- Utility prefixes: `heading-style-h#`, `text-size-`, `text-weight-`, `text-color-`, `text-align-`, `text-style-`
- For SEO vs design conflicts: use `heading-style-h#` (e.g., H1 tag styled as H2)

## Spacing Strategy

Three approaches:
1. **Spacing Block** — empty div with spacing class(es) between siblings
2. **Spacing Wrapper** — div wrapping a child, creating space via margin/padding
3. **CSS Grid** — parent grid managing equal child spacing

Avoid putting margin/padding utility classes directly on text elements.

## Folder Organization

- Underscore = folder level: `nav_primary_logo-wrapper` creates nav > primary > logo-wrapper
- Utility classes auto-folder by prefix: `text-color-*` groups under text > color
- Nest folders only when there's a clear organizational benefit
- Use page names in folders only for page-specific elements

## Color Variables

- **Primitive tokens** (base colors): `- Base Color:` prefix, named by color+shade (Blue-01)
- **Semantic tokens**: named by purpose: `background - color - dark`, `text - color - primary`
- Never name semantic variables by actual color name
- Use primary/alternate pattern for theme readiness

## Additional Resources

### Reference Files

For detailed implementation guidance, consult:
- **`references/classes-strategy.md`** — Full class types, custom vs utility vs global, combo class rules, deep stacking prevention
- **`references/core-structure-and-spacing.md`** — Core structure details, spacing block/wrapper/grid strategies, responsive spacing
- **`references/typography-and-sizing.md`** — Typography utility classes, text sizing, heading strategies, rem conversion
- **`references/folders-and-naming.md`** — Folder organization, page-name decisions, component keywords, nested folders
- **`references/utility-classes-reference.md`** — Complete list of all Client-First utility classes with values
- **`references/accessibility-and-semantics.md`** — Semantic HTML tags, ARIA attributes, keyboard navigation, focus states
- **`references/variables-and-embed.md`** — Color variables, primitive/semantic tokens, global styles embed CSS
- **`references/interactions-and-responsive.md`** — Interaction naming conventions, fluid responsive design, CSS specificity
