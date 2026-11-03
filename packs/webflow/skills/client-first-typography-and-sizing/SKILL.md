---
name: client-first-typography-and-sizing
description: Typography utility classes and rem sizing for Finsweet Client-First — text sizing, heading strategies, text styles/weights/colors, rem unit conversion, approved values, and accessibility benefits.
type: reference
parent_skill: client-first
version: 2.0.0
---

# Client-First Typography & Sizing — Complete Reference

## Typography Strategy

### Core Principle
HTML tags (H1-H6, p, body) serve as baseline styling values. Ideally, never place a class on a Heading or Text Element. Classes apply only when variations from defaults occur.

### Default HTML Tags
Style body, H1, H2, H3, H4, H5, H6 tags directly — these are the global defaults.

### Class Application Rule
Apply a class only when text needs to differ from its default element style. Example: apply `text-size-medium` when a paragraph needs different sizing than the body default.

### Typography Utility Prefixes

**Heading Style Override** (`heading-style-`):
- `heading-style-h1` through `heading-style-h6`
- Purpose: Apply H2 styling to an H1 tag (for SEO vs design conflicts)

**Text Size** (`text-size-`):
- `text-size-large`
- `text-size-medium`
- `text-size-regular`
- `text-size-small`
- `text-size-tiny`

**Text Style** (`text-style-`):
- `text-style-allcaps`
- `text-style-italic`
- `text-style-link`
- `text-style-muted`
- `text-style-nowrap`
- `text-style-quote`
- `text-style-strikethrough`
- `text-style-2lines` (truncate after 2 lines)
- `text-style-3lines` (truncate after 3 lines)

**Text Weight** (`text-weight-`):
- `text-weight-xbold`
- `text-weight-bold`
- `text-weight-semibold`
- `text-weight-normal`
- `text-weight-light`

**Text Alignment** (`text-align-`):
- `text-align-left`
- `text-align-center`
- `text-align-right`

**Text Color** (`text-color-`):
- `text-color-primary`
- `text-color-secondary`
- `text-color-alternate`

**Buttons** (`button`):
- `button` (base)
- `button is-secondary` (combo)
- `button is-text` (combo)

### When to Customize Default Typography

1. **Style variations:** Apply `text-color-primary`, `text-weight-semibold`
2. **SEO vs design conflicts:** Use `heading-style-h#` to visually override heading level
3. **Non-heading elements needing heading styles:** Use text elements with custom classes — don't force heading tags on non-heading content

### Avoiding Deep Stacking in Typography
When frequently combining multiple utility classes, create grouped utility classes like `text-style-subtitle` instead of repeatedly stacking individual classes.

### Custom Typography Classes
Reserve for three scenarios:
1. **Unique specific text:** One-off combinations (e.g., `footer_copyright-text`)
2. **Text groupings:** Multiple instances managed together (e.g., `footer_link`)
3. **Responsive customization:** Different styles across breakpoints (e.g., `faq-template_heading-text`)

---

## Sizing and Rem Units

### What is Rem?
Rem = "root em" — relative to the `<html>` element's font-size. Browser default: 16px = 1rem.

### Conversion
- Pixels to rem: divide by 16 (64px / 16 = 4rem)
- Rem to pixels: multiply by 16 (2rem * 16 = 32px)
- Webflow shortcut: type `100/16rem` directly in inputs

### Client-First Approved Rem Values
Standard: 0.5, 1, 1.5, 2, 2.5, 3, 4, 5rem and continuing multiples.
Avoid: lengthy decimals like `8.4375rem`.

### Three Exceptions
1. **Typography:** 14px → 0.875rem for font-size
2. **Minimal spacing:** 2px → 0.125rem for tiny gaps
3. **Borders:** Use `1px` directly, never convert to rem

### Accessibility Benefits
- **Browser font settings:** Rem respects user font-size preferences
- **Browser zoom:** Rem-based layouts zoom proportionally (unlike vw/vh units)

### PX to REM Migrator
The Finsweet Extension includes a tool for converting existing projects from pixels to rem.
