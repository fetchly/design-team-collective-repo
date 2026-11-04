# Armada Power · Design Studies

Motion and bento explorations for the Armada Power resident app, built from the Figma frames' own layers (Working App Pages 2).

Open `index.html` in a browser, or each folder's `index.html`.

| Folder | What it is | claude.ai artifact |
|---|---|---|
| [`motion-studies/`](motion-studies/) | Home, thermostat runtime and smart valve screens, each in Option A (in place), B (zoom reveal) and C (touch walkthrough) | https://claude.ai/artifact/4j9QWHwiRY8huTbB2wQhsz |
| [`bento-studies/`](bento-studies/) | Study B and Study C (Opus): animated bentos of app sections, charts and controls | https://claude.ai/artifact/PD2ceYZMi7F4MhduFvUVQp |
| [`bento-fable/`](bento-fable/) | Study C rebuilt by a Fable agent from the same brief, for model comparison | https://claude.ai/artifact/2L3UNcMByjT8KZ6rPhyUes |

## Notes

- Each page is a single self-contained HTML file: Tailwind CDN 3.4.17 for the exported Figma markup, Google Fonts (Inter, Instrument Serif), no build step.
- Animations play when a section enters the viewport and respect `prefers-reduced-motion`.
- Some chart values in the bentos are sample data (humidity curve, range datasets, comparison bars, valve log); see each artifact's notes.
- The bento rules live in the `fetchly-bento` Claude Code skill, which builds on the stageshow skill.

Exported from claude.ai artifacts on 4 Nov 2026.
