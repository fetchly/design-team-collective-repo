---
name: client-first-accessibility-and-semantics
description: Semantic HTML tags and accessibility guidelines for Finsweet Client-First — ARIA attributes, keyboard navigation, focus states, screen reader support, heading structure, and Webflow-specific workarounds.
type: reference
parent_skill: client-first
version: 2.0.0
---

# Client-First Accessibility & Semantic HTML — Complete Reference

## Semantic HTML Tags

### header (`<header>`)
- Wraps navbars or section headers
- Can appear multiple times per page
- Cannot nest inside footers or other headers

### main (`<main>`)
- Primary page content
- Wraps content between header and footer
- Unique, page-specific content only
- Client-First applies this to `main-wrapper`

### footer (`<footer>`)
- Copyright, contact info, sitemaps, "back to top" links
- Can appear multiple times (article footers, page footers)

### section (`<section>`)
- Divides pages into logical sections
- Should include a heading (rare exceptions)
- Can nest within articles or other sections

### article (`<article>`)
- Self-contained, independently distributable content
- Blog posts, forum posts, product cards, user comments, interactive widgets

### aside (`<aside>`)
- Supplementary content: sidebars, related links, advertisements, tables of contents
- Nest inside related section, or outside sections if relating to entire page

### nav (`<nav>`)
- Navigation link lists
- Navbar links, sidebar navigation, tables of contents, footer links, breadcrumbs

### Heading Structure (h1-h6)
- **Only one `<h1>` per page** as primary title
- `<h2>` for subtopics of `<h1>`, `<h3>` for subtopics of `<h2>`, etc.
- **Never skip heading levels** — screen reader users jump between headings

### address (`<address>`)
- Author/owner contact information
- Multiple instances allowed per page

### figure (`<figure>`)
- Self-contained content: illustrations, diagrams, photos, code blocks
- Position independent from main content flow

---

## Accessibility (a11y)

### Keyboard Navigation

**Tab Key:** Moves focus through focusable elements; Shift+Tab reverses.
**Enter Key:** Activates links/buttons; submits forms.
**Space Key:** Activates buttons and toggle states (checkboxes, accordions).
**Arrow Keys:** Navigate grouped components.
**Esc Key:** Exit states like modals.

### Focusability (tabindex)
- `tabindex="0"` — makes elements focusable in natural page order
- `tabindex="X"` (positive) — explicit focus order
- `tabindex="-1"` — removes focusable status

### Button vs Link
"Buttons activate actions on the page. Links navigate through the page/website."

In Webflow (no native `<button>` tag):
- Add `role="button"` attribute
- Add `tabindex` for keyboard focus
- Style focus states

### Hiding Elements

**From screen readers only:**
- `aria-hidden="true"` on decorative elements

**Visually hidden (screen reader accessible):**
```css
.fs-a11y_visually-hidden {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
}
```

### ARIA Roles
- `role="button"` — elements acting as buttons
- `role="listbox"` — container for selectable options
- `role="option"` — individual option
- `role="table"`, `role="rowheader"`, `role="row"`, `role="columnheader"` — table structure

### ARIA Attributes
- `aria-label` — screen reader context when visual content lacks meaning
- `aria-labelledby` — references another element's ID to describe current element
- `aria-describedby` — additional descriptive context beyond label
- `aria-controls` — cause-effect relationship (button controls modal)
- `aria-expanded` — toggled content visibility (true/false)
- `aria-haspopup` — popup type (menu, listbox, tree, grid, dialog)
- `aria-pressed` — toggle button state (true/false)
- `aria-current` — current item (page, location, date, step)
- `aria-selected` — selected option in custom selection interfaces
- `aria-hidden` — decorative elements removed from screen reader

### Accordion Guidelines
**Trigger:** div with `role="button"`, `tabindex`, styled focus states, `aria-controls`, `aria-expanded`
**Content:** `aria-labelledby` referencing trigger

### Anti-Patterns
- Avoid `<div role="link">` instead of `<a>` — breaks keyboard nav and SEO
- Don't add redundant ARIA: `<form role="form">` causes double announcements
- Webflow's native components (Navbar, Slider, Tabs) already use correct ARIA

### Tables in Webflow
No native `<table>` elements. Build with divs and ARIA roles:
`role="table"`, `role="rowgroup"`, `role="row"`, `role="columnheader"`
