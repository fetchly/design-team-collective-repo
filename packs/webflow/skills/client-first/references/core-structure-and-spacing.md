---
name: client-first-core-structure-and-spacing
description: Core structure details for Finsweet Client-First — page-wrapper through container hierarchy, spacing block/wrapper/grid strategies, responsive spacing, typography and button spacing tips.
type: reference
parent_skill: client-first
version: 2.0.0
---

# Client-First Core Structure & Spacing — Complete Reference

## Core Structure Classes

### 1. page-wrapper
- Outermost parent wrapping every page element
- Minimal styling (optional `overflow: hidden`)
- Enables quick copy-paste of entire page content
- Prevents body tag overuse — limit body styles to typography and background-color

### 2. main-wrapper
- HTML tag: `<main>`
- Contains main page content between nav and footer
- Excludes navigation and footer
- Accessibility best practice for screen readers and search engines

### 3. section_[section-identifier]
- HTML tag: `<section>`
- Pattern: `section_[descriptive-name]` (e.g., `section_hero`, `section_testimonials`)
- All section classes housed in `section_` folder
- Apply add-on classes like `section-style-dark` for consistent styling
- Creates page "sitemap" in Navigator
- Enables anchor-scroll functionality

### 4. padding-global
- CSS: `padding-left` and `padding-right` only
- Manages unified horizontal spacing across the page
- Not for individual content item spacing
- Decouples padding from max-width constraints

### 5. container-[size]
- CSS: `margin-left: auto`, `margin-right: auto`, `width: 100%`, `max-width: [value]`
- Default sizes: small, medium, large (customizable)
- Centering and max-width constraint

### 6. padding-section-[size]
- CSS: `padding-top` and `padding-bottom`
- Applied to the same div as `padding-global` to reduce nesting
- Default sizes: small, medium, large
- Global vertical spacing control

### Recommended Structure
```
main-wrapper
  section_[identifier]
    padding-global + padding-section-[size]
      container-large
        [content]
```

---

## Spacing Strategy

### Part 1: Utility Class Spacing

#### Spacing Block
An empty Div Block with spacing class(es) that creates space between two sibling elements.

**Option 1 — Single class:** `spacer-[size]` (allows responsive `is-` variants)
**Option 2 — Two classes:** `padding-bottom` + `padding-[size]`

**Use cases:**
- Fast implementation with fewer nested levels
- Navigator visibility — shows all component elements clearly
- Different top/bottom section spacing independently

#### Spacing Wrapper
A Div Block that wraps a child element and creates space via margin or padding.

**Classes:** `margin-[direction]` + `margin-[size]` or `padding-[direction]` + `padding-[size]`

**Example:** `margin-bottom` + `margin-medium` = `margin-bottom: 2rem`

#### Benefits of Utility Spacing
- **Consistency** — unified spacing across sections and pages
- **Automatic responsive updates** — values adjust across breakpoints
- **Global control** — single CSS change influences all instances
- **Reduced custom classes** — fewer one-off spacing classes
- **Faster workflows** — when used correctly

**Important:** Not required or recommended to use utility spacing everywhere.

### Part 2: Custom Class Spacing

#### Custom Class on Element
Apply margin/padding directly to custom classes for element-specific control.

**Use cases:**
1. Globally managing recurring elements (25+ instances)
2. Unique tablet/mobile spacing needs
3. One-off unique spacing values

**Example:** Apply `margin-bottom: 1rem` to `form_input` class → single global change across all pages.

#### CSS Grid Strategy
Apply CSS Grid to parent wrapper to manage equal child spacing.

**Benefits:**
- One controller manages spacing for all children
- Single adjustment affects all children
- Works well with consistent spacing values

**Combined approach:** When some children need unique spacing, add spacing wrapper to that specific element while maintaining parent grid.

### Typography and Button Spacing

**Typography:** Avoid stacking margin/padding classes directly on text elements. Use spacing blocks or wrappers to prevent deep stacking on headings and paragraphs.

**Buttons with icons:** Use flex/grid on the button element for icon spacing.
**Button rows:** Use flex/grid on parent wrapper — never apply margin directly to button classes.

### Spacing Tips

1. **Heading tag margins (optional):** Apply consistent margin (e.g., `margin-bottom: 2rem`) to all H2 tags for unified typography spacing. Avoid if design has many heading variations.

2. **Avoid utility padding for inner element size:** Inner padding typically requires breakpoint-specific customizations. Apply padding directly to custom class instead.

3. **Custom spacer folder:** Create `spacer_[element]` classes for element-specific spacing:
   - `spacer_header`, `spacer_sticky-nav`, `spacer_title-primary`, `spacer_footer`

4. **Responsive spacer variants:** Use `spacer-large` + `is-mobile-small` for responsive control. Not recommended for two-class strategies (creates 3-class stacks).

### Avoid Inner Padding with Utility Classes
Do not use utility classes to create padding around item content. Inner padding typically requires breakpoint-specific customizations — apply padding directly to the custom class.
