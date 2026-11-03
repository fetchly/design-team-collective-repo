---
name: figma-agents-context
description: Verified context for Figma's agent features on Lucas's account, checked live on 2026-09-24. Covers the Figma MCP tools that arrived with Config 2026 (generative plugins, shaders, Motion keyframes and export_video, get_motion_context, Weave models and tools, SwiftUI, design-to-code, download_assets, bulk Code Connect) and Figma's native Design Agent (custom skills, connectors). Holds plan keys, what is enabled or blocked, routing to the right figma:* skill, and gotchas found in hands-on tests. Load it alongside the figma:* skills whenever a Figma task touches these features, or when Lucas asks what the Figma agents can do.
---

# Figma agents: verified context

Two different things get called "Figma agents":

1. The Figma Design Agent, Figma's own AI inside the canvas (launched 2026-05-20, beta). Claude can't drive it. Claude can write custom skills for it, which Lucas uploads.
2. Outside agents (Claude) working through the Figma MCP server. Everything in the routing table below is this path.

This skill holds account facts, routing, and gotchas. The how-to lives in the figma:* skills; load those as the table says.

## Account facts (verified 2026-09-24)

| Item | Value |
|---|---|
| Default `planKey` for create tools | `team::940636037676285552` (Fetchly Design, pro tier, Full seat, admin). No need to call `whoami` again unless access breaks |
| Other plans | `team::1300827957096507792` Lucas Teixeira's team (starter, Full, admin; starter caps files at 3 pages). ecurry's team is a View guest seat on starter: never use it, View seats get 6 MCP calls per month |
| Motion API | Enabled. The `metronome` flag is on and `figma.motion` exists |
| Weave | Not linked. `weave_list_tools` answers with a link-your-account message. Lucas has to link his Figma account at https://app.weavy.ai/settings?section=profile before any weave_* call works |
| Shader library | 35 first-party shaders (25 effects, 10 fills). None of Lucas's own yet |
| Generative plugins | None yet |
| Figma agent custom skills | Available (paid plan, Full seat) |
| Figma agent MCP connectors | Unavailable. They need an Organization or Enterprise plan and Fetchly Design is Professional |

Rate limits: a Full seat on a paid plan gets per-minute limits equal to REST API Tier 1. Write tools (`use_figma`, `generate_figma_design`, the create and update tools, `upload_assets`) are exempt. Writing to the canvas is free during the beta and will become usage-based.

## Environment facts

- The Claude desktop app loads `figma:*` skills from its own managed plugin copy under `~/Library/Application Support/Claude/local-agent-mode-sessions/<id>/<session>/rpm/plugin_01VUWKAs3gYLNqeKbDtxv1Xs` and syncs it by itself (2.2.118 on 2026-09-22).
- Terminal `claude` sessions read `~/.claude/plugins/cache/claude-plugins-official/figma/<version>`, which only moves when updated by hand. It sat at 2.0.7 because the marketplace clone hadn't synced since March. Update with `claude plugin marketplace update claude-plugins-official`, then `claude plugin update figma@claude-plugins-official` (2.0.7 to 2.2.120 on 2026-09-24, active after a restart).
- The Figma MCP in these sessions is the claude.ai connector (`mcp__f9e6999d-83db-4114-8121-deec48607c51__*`). It does not support MCP resources: `ReadMcpResourceTool` fails with "does not support resources". So call `get_shader` and `get_generative_plugin` with `includeSource: true`, read `skill://` URIs through `get_figma_skill`, and treat any `resource_link` in tool output as unreadable.
- Skills load through the Skill tool from the plugin, so `skillNames` takes plain names (`figma-use,figma-use-motion`), never the `resource:` prefix.
- `ffmpeg` and `ffprobe` are at `/opt/homebrew/bin`. Python is 3.9.6 with Pillow 11.3.
- Newest `figma-use` guidance (2.2.120) replaced "max 10 operations per call": batch related work into calls that are safe to retry, treat returned IDs and counts as the structural check, take one composition screenshot and one after a visual fix, then stop.

## Routing

| Request | Load | Tools, in order |
|---|---|---|
| Create or edit anything on a canvas | figma:figma-use, plus figma-generate-design for screens or figma-generate-library for components | `use_figma` |
| Animate layers inside Figma | figma-use and figma-use-motion | `use_figma` with manual keyframes or animation styles; check with `export_video` plus ffmpeg frames |
| Figma design into code | figma-design-to-code | `get_design_context` (screenshot on, `skillNames`) |
| Figma animation into code | figma-design-to-code and figma-implement-motion | `get_design_context`, then `get_motion_context` with `recursive: true` |
| SwiftUI, either direction | figma-swiftui (plus figma-use for code to design) | `get_design_context` with `clientLanguages: "swift"`, `clientFrameworks: "swiftui"`; `use_figma` the other way |
| Custom shader effect or fill | figma-shaders | `create_shader`, `get_shader` with `includeSource`, `update_shader` |
| Custom plugin or tool | figma-generative-plugins | `create_generative_plugin`, `get_generative_plugin` with `includeSource`, `update_generative_plugin` |
| Diagram | figma-generate-diagram | `generate_diagram` (Mermaid flowchart, sequence, state, gantt, ER) |
| FigJam or Slides edits | figma-use-figjam or figma-use-slides | `use_figma` |
| Screen recording into an annotated storyboard | video-interaction-mapper (user skill) | local scripts, `create_new_file`, `use_figma`, `upload_assets` |
| PRD into a FigJam plan board | generate-project-plan (user skill) | `use_figma`, `generate_diagram`. Lucas wants sprint-based vertical slices, never Gantt or waterfall |
| AI image or video from a named model | none | `weave_find_model`, `weave_run_model` (quote first), `weave_get_model_run_output` |
| Run a published Weave workflow | none | `weave_get_tool_inputs`, `weave_run_tool` (quote first), `weave_get_tool_run_output` |
| Export assets out of Figma | none | `download_assets` (node render, raw images, SVGs) |
| Put images or SVGs into Figma | none | `upload_assets` (ask for N URLs, POST the bytes) |
| Bulk Code Connect | figma-code-connect | `list_file_components_for_code_connect` (published components only) |
| Find library components or tokens | none | `get_libraries`, then one batched `search_design_system` call with a `queries` array |

The two user skills were copied from the plugin's `workflow-skills` folder (2.2.120) into `~/.claude/skills/`. Three video-interaction-mapper scripts got `from __future__ import annotations` so they run on Python 3.9; reapply that line if the skill is ever recopied.

## Shaders

- `effect` transforms the rendered layer beneath it (it samples `frame.input`, premultiplied alpha). `fill` generates its own pixels (no input, straight alpha). The kind can't change on update.
- One file, `main.ts`: `import { defineProperties } from "figma:shaders"`, `export default function Effect() {}`, `export function setup(device, frame)`, `export function render(device, frame)`, and `defineProperties(Effect, {...})` at module scope. No other top-level declarations.
- The WGSL string starts with `diagnostic(off,derivative_uniformity);`, uses entry points `vs_main` and `fs_main`, packs uniforms in `vec4f` slots (sizes in multiples of 16 bytes), rebuilds the pipeline only when `frame.output.format` changes, and binds a 1x1 placeholder texture when `frame.input` is null.
- Property descriptors carry `type`, `label`, `defaultValue`, and for numbers `control: "slider"`, `min`, `max`, `step`. Dropdowns are numeric selects, never strings.
- Runtime param shapes, from Figma's own helpers: color `{r,g,b,a}` in 0..1; point `{x,y}`; point-radius `{x,y,radius}`; point-point-line `{x,y,x2,y2}`; point-angle-radius `{x,y,radius,angle}`; color-point `{x,y,color:{r,g,b,a}}`; gradient `{stops:[{color,position}]}`, packed as 8 rgba stops, 8 positions, then the count (44 floats).
- `frame.time` is in milliseconds. Reading time or the mouse requires `metadata.isAnimated` or `metadata.usesMouse` on `update_shader`.
- Known-good module: `references/shader-template-duotone.ts` (Figma's first-party Duotone effect). To study another, call `get_shader` with `includeSource: true` on any id from `list_shaders`.
- Finish by giving Lucas the try link: `https://www.figma.com/file/new?try-tool-resource-content-id=<id>&try-tool-resource-type=<gen_effect or gen_fill>&type=design&mode=design`.

## Generative plugins

- Two files: `code.ts` (the sandbox, the only side that calls `figma.*`) and `ui.html` (the iframe, DOM only). They talk through `postMessage`. `manifest.json` is fixed, and an update can't add files or imports.
- Every plugin needs working UI built from PropsKit elements: `fig-content`, `fig-footer`, `fig-field` with a `label`, `fig-slider`, `fig-input-number`, `fig-input-text`, `fig-input-color picker="figma-native"`, `fig-switch`, `fig-options options="A, B"`, `fig-dropdown` with `option` children, `fig-button type="submit"`.
- Keep the localStorage shim in `ui.html`, use the async Plugin API calls (dynamic page access), set relaunch data, and never embed secrets because the source is readable.
- The try link uses `try-tool-resource-type=gen_tool`.

## Motion

- Live catalog from `figma.motion.figmaAnimationStyles()` on 2026-09-24 has six styles, with `styleId` values `Position`, `Scale`, `Rotation`, `Size`, `Opacity`, `Path`. The `name` field is a translation key such as `motion.preset_name.opacity`.
- Gotcha: the skill examples look up a style named "Fade" and pass `props: { timing: "in" }`. Neither exists in the live catalog. Look styles up by `styleId` and read the `props` doc strings at runtime. Opacity takes `type: 'fadeIn' | 'fadeOut' | 'custom'`, `amount`, `startFrame`, `endFrame`. Position takes `type: 'slide_in' | 'slide_out' | 'custom'`, `direction`, `distance`, `axis`, `startX`, `startY`, `endX`, `endY`. Scale takes `type: 'scaleIn' | 'scaleOut' | 'custom'`, `axis`, `amount` (%). Rotation takes `type: 'rotateIn' | 'rotateOut' | 'custom'`, `direction`, `amount` (degrees). Size takes `type: 'resize_in' | 'resize_out' | 'custom'`. Path takes `type: 'draw' | 'erase' | 'travel' | 'custom'`. All six list `delay`, `duration` (seconds) and `easing` among their props, while the skill says `duration` and `timelineOffset` are top-level fields. Read back `node.animationStyles` after the first apply to see which one holds.
- Manual keyframes: `node.applyManualKeyframeTrack({ type: "PROPERTY", name: "OPACITY" }, { keyframes: [...] })`. Times are in seconds. Transform fields (`TRANSLATION_X`, `TRANSLATION_Y`, `TRANSLATION_XY`, `ROTATION`, `SCALE_X`, `SCALE_Y`, `SCALE_XY`) add to the resting transform. `OPACITY`, `WIDTH`, `HEIGHT`, radius, stroke, padding and gap fields replace the value. Fills and strokes animate by paint index (SOLID only); effects by index plus field name.
- Easing types: `EASE_IN`, `EASE_OUT`, `EASE_IN_AND_OUT` (never `EASE_IN_OUT`), `LINEAR`, the `_BACK` variants, `CUSTOM_CUBIC_BEZIER`, `GENTLE`, `QUICK`, `BOUNCY`, `SLOW`, `CUSTOM_SPRING` with `{ bounce }` in 0..1, and `HOLD`.
- Never animate a top-level frame; animate its children. Extend the timeline with `setTimelineDuration` when needed and never shorten it unasked.
- `get_screenshot` only shows the resting state. To check motion, run `export_video` on the top-level frame (keep it small: `WIDTH` 320 to 768, `quality: "low"`, `fps` 5 to 10), poll with the `jobId`, then pull frames with `ffmpeg -ss <t> -i anim.mp4 -frames:v 1 f.png`.
- If a motion call throws `"<name>" is not a supported API`, the flag is off for that user. Stop and say so.

## Weave

- Blocked until the Weave link above is done. Runs spend Weave credits, not Figma AI credits.
- Every run: call once without `acknowledgedCost` to get a quote, show it with AskUserQuestion (Approve or Cancel), then call again with `acknowledgedCost`. Include the `costDisclosure` sentence the first time a cost is quoted. Never invent an input. Local files go through `weave_upload_asset`, which shows Lucas a file picker.
- A pasted `app.weavy.ai/tool/<id>` or `app.weavy.ai/flow/<id>` URL already gives the recipeId. Never open a browser for Weave.

## Figma's native Design Agent

- It lives on the canvas and in the left rail. Prompts start from any layer, can run in parallel, and take @mentions of tokens, variables and components. It explores directions, builds screens from the design system, does bulk edits, maintains libraries, and works through file comments.
- Access: Full seats on Professional, Organization and Enterprise. Collab and Dev seats only in drafts. Free during the beta; AI credits apply at GA. Open beta additions from 2026-06-24: web search, custom skills, MCP connectors, file attachments. The agent in FigJam and Slides is still waitlist only.
- Custom skills are one Markdown file following the Agent Skills spec (agentskills.io). No `references/`, `scripts/` or `assets/` folders, so flatten everything into the single file. They run from a slash command (`/skill-name`), and only the first skill named in a prompt runs. Scopes: personal, team, organization, Community. Lucas uploads by dragging the .md into the skills panel or with Upload a file. There's no API that lets Claude upload one.
- The Community already lists 50+ skills, and skills can be published to the AI skills library.
- Code layers (working code as canvas layers) are in closed beta behind a waitlist.

## Sources

- https://www.figma.com/blog/the-figma-agent-is-here/
- https://help.figma.com/hc/en-us/articles/39582753756695-What-s-new-from-Config-2026
- https://help.figma.com/hc/en-us/articles/40283639496599-Custom-skills-for-the-Figma-agent-and-Figma-Make
- https://help.figma.com/hc/en-us/articles/36343926263703-Manage-MCP-connectors-for-the-Figma-agent-and-Figma-Make
- https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/
- https://github.com/figma/mcp-server-guide (plugin 2.2.120 README and skills)
