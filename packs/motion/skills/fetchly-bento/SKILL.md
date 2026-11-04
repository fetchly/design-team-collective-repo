---
name: fetchly-bento
description: Build a Stageshow-style animated bento of an app's charts and interactive controls (sections, not whole screens) for a case study, from its Figma layers or a past artifact. Use when Lucas asks for a bento, feature grid or case-study motion tiles for any app Fetchly built, e.g. "/fetchly-bento for Spyderco".
metadata:
  version: 1.0.0
---

# Fetchly bento

A grid of 8 tiles that shows one app through its charts and controls, each tile doing one thing a resident or user would do. Proven on Armada Power (Study C in `reference/armada-bento-reference.html`).

## Load first

1. **Load the `stageshow` skill** (motion and framing authority) before planning. Read from its folder `~/.claude/skills/stageshow/`:
   - `references/bento.md` (grid rules, tile kinds, planning table)
   - `references/motion.md` (story, cursor/touch, changing values, loops)
   - `references/craft.md` (restraint, spacing, type)
   Stageshow wins on any motion or framing question this file does not settle.
2. Open `reference/armada-bento-reference.html` and copy Study C's CSS (`.bc`, `.tile`, `.touch`, `.c-*`), markup and the `loopC` / `finger` / `fm` / `fp` / `roll` helpers. Start from it; don't rewrite from a glance.
3. Get the app's source: Figma frames (node ids, tokens, icons) or a past artifact (`Artifact` read). Brand: the app's own look, never Fetchly's, unless the app is Fetchly.

## Known pitfalls (seen in past runs)

- Shopify `templates/*.json` and `config/settings_data.json` start with a `/* ... */` comment. Strip it before parsing: `python3 -c "import json,re,sys;t=open(sys.argv[1]).read();print(json.loads(re.sub(r'^\s*/\*.*?\*/','',t,flags=re.S)))" FILE`. Plain `json.load` fails.
- A chained read command (`a; b; c`) is reported as failed when its last step exits nonzero (grep with no match, `ls` of a missing path), even when the output is usable. End exploratory chains with `; true`, or check paths first.
- The reference HTML is about 150K. Find Study C with `grep -n "Study C"` (around line 1005) and read from there. Don't page through it with blind `sed` ranges.
- Code source: worktrees of a repo are often on other branches. Export the branch you need with `git archive origin/<branch> <paths> | tar -x -C <scratchpad>/src` and read from that copy. Never check out over someone's worktree.
- Outputs go to the bento repo, one folder per project (`<repo>/<project>/`). Confirm the repo exists (`gh repo view`) before building, and ask Lucas if it doesn't.

## Plan before code

Write the tile table (stageshow `bento.md`, Planning a grid): tile, span, kind, the one action, line 1, line 2. Check: no two charts or two controls side by side, each fact once, one hero.

## Rules

Source
- Real layers: clone the app's Figma markup by `data-node-id` from `<template>`s, or rebuild with its exact tokens. Never redraw a section that exists.
- Sections, never whole screens: one card, one chart, one control per tile.
- Ground is the app's own theme. No plate behind tiles.

Grid
- 3 columns, 16px gap, 20px radius, 28px padding, min height 360px; one column under 900px.
- 8 tiles: 2 wide (span 2), 6 single. Hero = wide chart tile, top left.
- Kinds: about 3 charts, 3 controls, 1 stat or countdown, 1 comparison.
- At most one accent tile (alert or event color); the rest share one surface.
- Say each fact once across the grid: no repeated string, number or component.

Tile heads (two lines, optically balanced)
- Break where the color changes: line 1 bold ink, the claim; line 2 dim, the proof. Both `display:block`.
- 20px, line-height 1.35, `text-wrap: balance`; both lines within about 6 characters.
- 2 to 5 words a line, a natural spoken pause at the break, the product's own words, no filler (Lucas's voice rules apply: no dashes as punctuation).

Pictures
- Each tile has one action: scrub a chart, switch a range, step a value, toggle a device, a ring or bar filling, a countdown, a line drawing in with a hairline scrub, two bars compared.
- A touch dot (36px, translucent, `.touch`) causes every control change. Nothing changes on its own except system stories (filling, countdown).
- Values roll (out up, in from below) on the same element, never a hard swap; numbers `tabular-nums`, unit on the same line.
- Charts sit at the tile bottom or bleed off an edge; a lone control is centered; copy centered only when the picture is.
- Scale cloned fragments to their slot at runtime (measure, then set zoom); never a fixed zoom that leaves a void or overflows.
- Real data where it exists; flag invented sample data to Lucas.

Fill and alignment (check every tile at 1440 and 390)
- Every tile is a flex column: head at the top, picture fills the rest (`flex:1`), anchored to the bottom or bleeding off one edge. No empty band under or beside the picture larger than the 28px padding.
- One inner padding for all tiles (28px); content never touches the edge unless it bleeds on purpose, and then it bleeds past it (no 2 to 10px slivers of gap).
- Tiles in one row share a height; their pictures align on a common baseline or top line, never at random offsets.
- Inner gaps step from one scale (8, 12, 16, 24); the same element kind uses the same gap in every tile.
- Left edges line up: head, picture and labels start on the padding line unless the picture is centered.
- Wide tiles use their width: lay the picture out horizontally (two columns, a row of items, or a chart across the full width), never a single-tile layout stretched or centered in a void.
- Measure, don't eyeball: run a script that logs each tile's picture box vs tile box and flag empty space over 15% or overflow, and fix before reporting.

Motion (stageshow motion.md)
- Each tile plays once when it enters the viewport and replays only on re-entry; never a continuous loop.
- Tiles arrive about 100ms apart in reading order; ease `cubic-bezier(.22,1,.36,1)`.
- End every story on a readable result; `prefers-reduced-motion` shows the final state.
- Scope selectors per study (`.bc .tile`), so one grid's script never hides another's tiles.

## Verify and ship

- Serve over localhost and check at 1440 and 390: no horizontal scroll, no dead corners, text at least 12px, no console errors. A hidden browser pane pauses animation: say what motion you could not watch.
- Publish as an artifact (`Artifact`, icon `grid`) and report the link, what is sample data, and what was not checked.

## Compare mode (Fable vs Opus)

Only when Lucas asks to compare models ("compare", "Fable vs Opus", "swarm"). It costs about two full builds, and Fable is the expensive one, so never run it by default.

1. Do the shared prep once in the main thread: load stageshow, read the source, write the tile table. Both builds use the same plan, so they differ by craft, not by brief.
2. Spawn two `Agent` subagents in one message so they run in parallel, `subagent_type: "general-purpose"`, one with `model: "fable"`, one with `model: "opus"`. Give each the same brief: this SKILL.md path, the stageshow reference paths, the source (template file or Figma node ids), the tile table, and its own output file, `<scratchpad>/bento-fable.html` or `<scratchpad>/bento-opus.html`. Tell them to build and verify only, not publish.
3. When both return, check each file yourself (localhost, 1440 and 390, console). Then build one comparison page: two full-width sections stacked, "Build A · Fable" above "Build B · Opus", each section its own scoped grid (rename study classes or wrap each in an iframe with `srcdoc` so scripts don't collide).
4. Publish the comparison artifact and report what differs between the two (tile choices kept, heads, motion, any rule broken). Lucas picks; the winner then becomes the published bento.
