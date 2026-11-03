---
name: client-first-folders-and-naming
description: Folder organization and naming strategy for Finsweet Client-First — custom/utility folder rules, page-name decisions, component keywords, nested folders, and bulk renaming.
type: reference
parent_skill: client-first
version: 2.0.0
---

# Client-First Folders & Naming — Complete Reference

## Folder System Overview

Folders are virtual organization tools to group and manage classes in Webflow. The underscore character creates folder levels.

## Custom Class Folders

One underscore = one folder level.

**Examples:**
- `nav_primary_logo-wrapper` → nav > primary > logo-wrapper
- `home-testimonials_wrapper` → home-testimonials > wrapper
- `careers_title-animation` → careers > title-animation

**Guidelines:**
- Nest only when meaningful for the project
- Over-nesting complicates navigation
- Single-level folders work fine for smaller sites

## Utility Class Folders

Format: `firstword-secondword-identifier` (no underscores).

**Auto-folder rules:**
- First-word folders are always created
- Second-word folders nest only when 2+ classes share first AND second words
- No matching keywords = class stays in parent folder

**Example:**
```
text/
  color/
    text-color-primary
    text-color-secondary
  size/
    text-size-large
    text-size-medium
  text-indent-large (stays in parent — no matching pair)
```

## One Folder Level Options

### General naming: `one-folder_name-of-element`
- For globally recurring elements
- Creates non-page-specific components

### Specific naming: `one-specific-folder_name-of-element`
- For smaller custom websites
- Adds content keywords for context

### Page name as folder: `page-folder_name-of-element`
- For page-specific sections
- **Warning:** Do NOT reuse page-specific classes across pages

### Page name as element prefix: `one-folder_page-name-element`
- Example: `slider_culture-pane`
- Creates unique variations within folder structure

## Nested Folder Options

### Page folder first: `page-folder_keyword-folder_name-of-element`
- Organize by page name initially
- Useful when page components are unique

### Keyword folder first: `keyword-folder_page-folder_name-of-element`
- Base organization on component type
- View component variations across multiple pages

## When to Include Page Names

**Include page names when:**
- Element styling applies to specific page only
- Signals no conflict with other pages
- Key question: "Is this element styled for this page only?"

**Exclude page names when:**
- Element is reusable across the project
- Prevents developers from accidentally creating duplicates
- Key question: "Is this a reusable element throughout the project?"

## One Folder vs Two Folders

"Just because we have the power of nested folders doesn't mean we should always use them."

**Decision factors:**
- Project size and complexity
- Number of items within folders
- Organizational necessity

**Rule:** Nested folders should accelerate workflow, not complicate it.

## Component Keyword

### Component Identification
Use `component` as element identifier when folder represents a complete UI element.

**Example structure:**
- `client-slider_component` (parent wrapper)
- `client-slider_mask`
- `client-slider_grid`
- `client-slider_arrow`

### Non-Component Folders
Style guide folders use organizational purpose without `component`:
- `styleguide_structure`
- `styleguide_content`
- `styleguide_item`

## Component Libraries with Folders

**Standard:** `slider1_component`, `grid1_component`
**Improved:** `slider_1_component`, `grid_1_component`

Benefits:
- Component types grouped clearly
- Variation options visible
- Scalable for large libraries

## Bulk Folder Rename

Renaming a folder automatically updates all classes within it. Example: `testimonials_` → `clients_` updates all contained classes.

## Critical Warnings

- **Never** use page-name folder organization and reuse the class on other pages
- Accept that perfect 100% naming clarity isn't always achievable — focus on maximum contextual information
