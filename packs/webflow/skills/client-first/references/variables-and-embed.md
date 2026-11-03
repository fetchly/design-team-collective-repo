---
name: client-first-variables-and-embed
description: Color variables and global styles embed for Finsweet Client-First — primitive/semantic tokens, variable naming conventions, theme-ready patterns, global CSS embed snippets, and CSS specificity rules.
type: reference
parent_skill: client-first
version: 2.0.0
---

# Client-First Variables & Global Styles Embed — Complete Reference

## Color Variables

### Benefits
- **Consistency** — define colors once, reuse everywhere
- **Maintenance** — changes update everywhere simultaneously
- **Theming** — enables dark/light mode functionality
- **Readability** — `--primary-color` is more memorable than `#FF5733`
- **Context** — naming clarifies usage intent

### Primitive Tokens (Base Colors)
Prefix: `- Base Color:`

**Rules:**
- Create semantic variables from primitives rather than linking directly to classes
- Only link primitives directly when that color won't be used elsewhere

**Grouping:** Brand colors, Neutral colors, System colors

**Naming:** Color names with shade numbers (e.g., Blue-01, Blue-02). Alternative systems using HSL values, numeric scales, or descriptive terms are viable.

### Semantic Tokens
All variables without "- Base Color" prefix. Describe purpose/meaning, not the color itself.

**Naming convention:** `[element] - [style] - [identifier]`

Examples:
- `background - color - dark`
- `text - color - primary`
- `border - color - brand`

**Recommended utility classes linked to semantic tokens:**
- `background-color-primary`
- `background-color-secondary`
- `background-color-tertiary`
- `background-color-alternate`
- `text-color-primary`
- `text-color-secondary`
- `text-color-alternate`

### Critical Rules
1. **Never name a semantic variable with the color name** — prevents renaming during theme changes
2. **Use generic naming** for different theme values (light/dark modes)
3. **Primary/alternate pattern** — set default theme as reference (e.g., dark background = primary, light background = alternate)
4. **Don't apply color directly to text element base tags** — preserves inheritance. Use `inherit-color` utility class when needed.

### Naming Questions
- Element: What receives this styling?
- Style: What value is changing?
- Identifier: What distinguishes this variable?

---

## Global Styles Embed

CSS snippets included in the Client-First cloneable, placed as a symbol embed on every page.

**Why embed (not Site Settings):** CSS is visible inside Designer for easier management.

### 1. Text Clarity
```css
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
```
Improves text rendering across browsers.

### 2. Focus State for Keyboard
```css
[tabindex]:focus-visible {
  outline: 0.125rem solid [focus-color-variable];
  outline-offset: 0.125rem;
}
```
Unified focus states for keyboard navigation.

### 3. Rich Text Top Margin Removal
Selectors: `.w-richtext > :not(div):first-child`, `.w-richtext > div:first-child > :first-child`
Eliminates unwanted top spacing from first Rich Text element.

### 4. Rich Text Bottom Margin Removal
Removes bottom spacing from final Rich Text element (paragraphs, lists).

### 5. Container Centerizer
Forces centering on `.container-medium`, `.container-small`, `.container-large`:
```css
margin-right: auto !important;
margin-left: auto !important;
```
Uses `!important` to protect from accidental modifications.

### 6. Inherited Styles (Disabled by Default)
Removes hardcoded Webflow styles to allow inheritance. Advanced option — may cause unexpected behavior.

### 7. Inherit Color from Parent
Class: `.inherit-color`
Applies `color: inherit` to all child elements.

### 8. !important Declarations
Applied to display, padding, and margin utility classes across responsive breakpoints. Ensures utility classes maintain intended global style controls.

---

## CSS Specificity

### Key Issue
When copying Client-First spacing classes in wrong order, the system fails. Size classes created *after* direction classes override zero-margin declarations.

### Solutions
1. **Use official cloneable** — classes in correct order by default
2. **Finsweet Extension** — auto-creates classes in correct order
3. **Correct copy-paste order** — copy spacing-sizes first, then spacing-directions second

### Rule
Later-created classes override earlier ones when conflicts arise. Direction classes must have higher stylesheet weight (created after size classes).
