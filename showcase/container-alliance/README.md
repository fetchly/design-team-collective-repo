# Container Alliance · Animated Bento

A Stageshow-style animated bento of Container Alliance's Work Hub dashboard — its charts and
controls, one tile each — for a case study. Built from the `CA v.2 – Master` Figma file's own
layers (Bench/WorkHub Dashboard, Quote builder, app components).

Open `index.html` in a browser, no build step. The [`quote-builder/`](quote-builder/) needs a local server (see its README).

| Page | What it is | Source |
|---|---|---|
| [`index.html`](index.html) | 8-tile animated bento: pipeline trend chart, leads KPI, compare periods, quote builder, filter drawer, quotes-created chart, overdue alert, date range | Figma `CA v.2 – Master` (fileKey `8sG8o6MqZbl6Phr7xluhvk`), Work Hub + Benchmark dashboards |
| [`quote-builder/`](quote-builder/) | Quote card with a live three.js container: sizes, modifications, paint, draggable add-ons, camera and cut views | claude.ai artifact `TC5RShzgj29rvSdWX7jpfj` |

## Notes

- Self-contained HTML: Tailwind CDN 3.4.17, Google Fonts (Inter, Instrument Serif), no build step.
- Container Alliance's own light look (white tiles, blue `#2563eb`); not Fetchly's brand.
- Animations play once when a tile enters the viewport, replay on re-entry, and respect
  `prefers-reduced-motion`. A touch dot drives all control changes (per the `fetchly-bento` skill).
- Tile kinds: 2 charts, 2 controls, 2 stats, 1 collection, 1 statement.
- **Sample data** (not real CA figures): overdue count/rows, exact chart points, quotes = 98,
  compare-period values, team avatars beyond RT/AJ, statement copy.
- Built by a Fable agent via the `fetchly-bento` + `stageshow` skills, with an audit/critique
  review loop (8 fixes applied). HTML only; Fable 5 `export_video` renders Figma frames, not HTML.

Built 19 Nov 2026.
