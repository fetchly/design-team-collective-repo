---
name: client-first-classes-strategy
description: Full class types strategy for Finsweet Client-First — custom vs utility vs global classes, combo class rules, deep stacking prevention, naming conventions, and layout philosophy.
type: reference
parent_skill: client-first
version: 2.0.0
---

# Client-First Classes Strategy — Complete Reference

## Three Primary Class Types

### Utility Classes
- Created with a specific combination of CSS properties for global use
- No underscores in naming
- Examples: `background-color-primary`, `font-size-large`, `text-weight-bold`
- Inherently global in scope — changes affect every instance

### Custom Classes
- Created for a specific component, page, grouping, or single element
- Use underscores: `header_background-layer`, `testimonial-slider_headshot`
- Created when utility classes prove insufficient

**Four Benefits of Custom Classes:**
1. **Fast creation** — style freely through Webflow's Styles panel
2. **Easier customization & safety** — modify without risk of affecting other elements
3. **Responsive flexibility** — unique tablet/mobile variations without extra utility variants
4. **Client management** — accommodate "random" client requests easily

### Global Classes
- A classification (not a type) — both utility and custom can be global
- Intended for use across the entire project
- Must pass: "Does this style benefit from global management?"

**Good global class:** `section-style-dark` — applying color and background-color to multiple sections enables site-wide color scheme changes.

**Bad global class:** A class adding only `position: absolute` — position requires additional properties and isn't updated globally.

## Combo Classes

A combo class is a variant that inherits styles from a base class and adds more on top.

### Structure
- Base class: `button` (holds shared defaults: padding, font-size)
- Variant: `is-primary`, `is-secondary`, `is-dark`
- Convention: always use `is-` prefix for the variant class

### When to Use
- When base class holds meaningful default properties that variants build upon
- Example: Update button padding once → affects all `is-*` variants site-wide

### When NOT to Use
- When shared properties provide no real benefit
- Example: `container` + `is-large`/`is-medium`/`is-small` — margin/width won't change globally, only max-width varies. Use individual classes: `container-large`, `container-medium`, `container-small`

### Stacked Global Classes Rules
- Stack only similar categories: margin with margin, typography with typography
- **Critical:** Never add additional styles to stacked global classes — this creates unintended combo classes
- Example violation: applying custom styles to `margin-top` + `margin-large` defeats the purpose

### Stacking Solutions
1. **Custom class from start** — create `home-header_text` with all properties
2. **Additive combo class** — `text-size-large` + `text-color-neutral` + `is-home-header` where `is-home-header` holds custom instance styles

## Deep Stacking Prevention

### Five Reasons Against Deep Stacking
1. **Workflow limitations** — cannot reorder classes in Styles panel; must remove all to edit earlier ones
2. **Time-consuming edits** — deleting multiple classes to remove one creates frustration
3. **Increased learning curve** — contradicts Client-First's goal of lowering complexity
4. **Writing CSS in Webflow is fast** — no need to save bytes
5. **Negligible CSS savings** — 65kb → 52kb is irrelevant for load times

### Stack Limits
| Classes | Assessment |
|---------|-----------|
| 1-2 | Great, common practice |
| 3 | Acceptable, verify necessity |
| 4 | Absolute maximum, reconsider |
| 5+ | Too much — create custom class |

### Avoidance Strategies
1. **Single custom class** — replace stack with one class holding all styles
2. **Nested div blocks** — separate concerns using nested layers (Client-First core structure exemplifies this)
3. **Strategic combo class** — reduce 4-class stack to 2-class combo

## No Layout Utility System

Client-First deliberately excludes flex, grid, column, or layout utility classes.

**Why layout utilities create problems:**
- Deep stacking: `grid-3-col` + `gap-large` + `tablet-grid-2` + `mobile-grid-1`
- Unclear naming: `flex-a-l-j-c`, `col-2-d` + `col-5-t` + `col-12m`
- Client tablet-specific adjustments require additional custom classes anyway

**Recommended:** Build layouts entirely with custom classes for:
- Quick page structure development
- Complete responsive customization control
- Minimal learning curve for handoff
- Prevents accidental site-wide layout breaking

## Naming Convention Framework

### Primary Goals
- Enable non-technical stakeholders to manage the website
- Provide clarity, information, and descriptiveness
- Create searchable class names in the Styles panel
- Answer: "What is this class doing?"

### General-to-Specific Structure
- `text-size-large`: text → size → large (broad → specific → value)
- `team-list_headshot-wrapper`: team-list → headshot → wrapper (folder → element → function)

### Rules
- No abbreviations or shorthand
- Maximum descriptiveness and context
- Keywords progress from general to specific
- Names should be self-documenting
- Should convey relationship to website structure
