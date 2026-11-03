---
name: client-first-utility-classes-reference
description: Complete list of all Finsweet Client-First utility classes with their values — spacing (margin/padding), typography, visibility, max-width, icons, background colors, z-index, overflow, aspect ratios, and responsive breakpoints.
type: reference
parent_skill: client-first
version: 2.0.0
---

# Client-First Utility Classes — Complete Reference

All utility classes are optional. Modify or extend based on project needs.

## Core Structure

### Global Horizontal Padding
- `padding-global` — left and right page content padding

### Container Sizes (Max-width)
- `container-large`
- `container-medium`
- `container-small`

### Section Padding (Vertical)
- `padding-section-small`
- `padding-section-medium`
- `padding-section-large`

---

## Typography

### Heading Style Override (heading-style-)
- `heading-style-h1` through `heading-style-h6`

### Text Size (text-size-)
- `text-size-large`
- `text-size-medium`
- `text-size-regular`
- `text-size-small`
- `text-size-tiny`

### Text Style (text-style-)
- `text-style-allcaps`
- `text-style-italic`
- `text-style-link`
- `text-style-muted`
- `text-style-nowrap`
- `text-style-quote`
- `text-style-strikethrough`
- `text-style-2lines`
- `text-style-3lines`

### Text Weight (text-weight-)
- `text-weight-xbold`
- `text-weight-bold`
- `text-weight-semibold`
- `text-weight-normal`
- `text-weight-light`

### Text Alignment (text-align-)
- `text-align-left`
- `text-align-center`
- `text-align-right`

### Text Color (text-color-)
- `text-color-primary`
- `text-color-secondary`
- `text-color-alternate`

### Buttons (button)
- `button` (base)
- `button is-secondary`
- `button is-text`

---

## Spacing

### Margin Direction (margin-)
- `margin-top`
- `margin-bottom`
- `margin-left`
- `margin-right`
- `margin-horizontal`
- `margin-vertical`

### Margin Size Values
| Class | Value |
|-------|-------|
| `margin-0` | 0rem |
| `margin-tiny` | 0.125rem (2px) |
| `margin-xxsmall` | 0.25rem (4px) |
| `margin-xsmall` | 0.5rem (8px) |
| `margin-small` | 1rem (16px) |
| `margin-medium` | 2rem (32px) |
| `margin-large` | 3rem (48px) |
| `margin-xlarge` | 4rem (64px) |
| `margin-xxlarge` | 5rem (80px) |
| `margin-huge` | 6rem (96px) |
| `margin-xhuge` | 8rem (128px) |
| `margin-xxhuge` | 12rem (192px) |
| `margin-custom1` | 1.5rem (24px) |
| `margin-custom2` | 2.5rem (40px) |
| `margin-custom3` | 3.5rem (56px) |

### Padding Direction (padding-)
- `padding-top`
- `padding-bottom`
- `padding-left`
- `padding-right`
- `padding-horizontal`
- `padding-vertical`

### Padding Size Values
Same scale as margins (0rem through 12rem, plus custom values).

### Reset
- `spacing-clean` — sets all margin and padding to 0

---

## Visibility (hide-)
- `hide` — hide on all devices
- `hide-tablet`
- `hide-mobile-landscape`
- `hide-mobile-portrait`

---

## Display
- `display-inlineflex` — applies display: inline-flex

---

## Max Width (max-width-)
| Class | Value |
|-------|-------|
| `max-width-xxlarge` | 80rem |
| `max-width-xlarge` | 64rem |
| `max-width-large` | 48rem |
| `max-width-medium` | 32rem |
| `max-width-small` | 20rem |
| `max-width-xsmall` | 16rem |
| `max-width-xxsmall` | 12rem |
| `max-width-full` | max-width: none |
| `max-width-full-tablet` | max-width: none (tablet) |
| `max-width-full-mobile-landscape` | (mobile landscape) |
| `max-width-full-mobile-portrait` | (mobile portrait) |

---

## Icon Sizing
- `icon-height-small`
- `icon-height-medium`
- `icon-height-large`
- `icon-1x1-small`
- `icon-1x1-medium`
- `icon-1x1-large`

---

## Background Colors (background-color-)
- `background-color-primary`
- `background-color-secondary`
- `background-color-tertiary`
- `background-color-alternate`

---

## Advanced Utilities

### Z-Index
- `z-index-1`
- `z-index-2`

### Alignment
- `align-center` — margin-left/right auto

### Positioning
- `layer` — position: absolute, 0% all sides

### Pointer Events
- `pointer-events-none`
- `pointer-events-auto`

### Overflow
- `overflow-hidden`
- `overflow-scroll`
- `overflow-auto`

### Aspect Ratios
- `aspect-ratio-square` (1/1)
- `aspect-ratio-portrait` (2/3)
- `aspect-ratio-landscape` (3/2)
- `aspect-ratio-widescreen` (16/9)

---

## Responsive Breakpoints
- Desktop: 1920px and above
- Tablet: 991px and below
- Mobile landscape: 767px and below
- Mobile portrait: 479px and below
