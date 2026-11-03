---
name: client-first-interactions-and-responsive
description: Interaction naming conventions and fluid responsive design for Finsweet Client-First — naming formula, action/state keywords, trigger/responsive keywords, root-font scaling, and vw/vh alternatives.
type: reference
parent_skill: client-first
version: 2.0.0
---

# Client-First Interactions & Responsive — Complete Reference

## Interactions Naming Convention

### Core Formula
**Element [Action + State]**

- **Element:** Component receiving the interaction (button, div, section)
- **Action:** What happens (Show, Hide, Move, Rotate, Scale)
- **State:** Optional context (Open/Close, In/Out, Expand/Collapse)

### Formatting
- Capital letters for each word's first character
- Square brackets separate Element from Action/State
- Keep names short enough to fit Webflow's Interactions UI panel

### Action Keywords
Show, Hide, Move, Rotate, Scale

### State Keywords
In/Out, Open/Close, Increase/Decrease, Expand/Collapse

### General Naming (universal interactions)
- "Button Arrow [Move In]"
- "Nav Menu [Open]"

### Specific Naming (unique use cases)
- "Home Hero Lottie [Show]"
- "Jobs Item Modal [Open]"

### Optional Additions

**Trigger keywords:** Add only when greatly enhancing clarity.
Examples: "[Delay On Load]", "[Open Modal With JS Click]"

**Responsive keywords:** Append when targeting specific breakpoints.
Examples: "[Show] [Mobile]", "[Hover In] [Desktop]"

### Philosophy
Don't overthink naming decisions. Pick clarity and proceed.

---

## Fluid Responsive Design

### Client-First Approach: Root-Font Scaling
Instead of `vw`/`vh` units, Client-First uses root-font scaling with `rem` units throughout. Modifying the HTML font size across breakpoints creates global control over all dimensions.

### Problems with VW/VH Scaling
- Requires setting `vw`/`vh` on every fluid element
- Linear scaling causes disproportionate sizing
- Accessibility issues — browser zooming cannot affect these units
- Difficult to maintain for teams and clients

### Benefits of Root-Font Scaling
- Normal Client-First workflow — no special process needed
- Optional — can be added at project completion
- Respects browser zoom functionality
- Honors user-modified browser font size settings
- Easier project maintenance

### Implementation
Use the visual fluid responsive generator (in docs and Finsweet Extension):
1. Visually configure scaling rules
2. Generate CSS code automatically
3. Copy code into Webflow project

No manual calculations or custom CSS writing required.
