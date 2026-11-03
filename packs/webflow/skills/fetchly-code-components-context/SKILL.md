---
name: fetchly-code-components-context
description: Preloaded research context for Webflow Code Components on the Fetchly workspace. Covers Webflow CLI 2.0 (devlink import/bundle, auth model), the @webflow/data-types v2 prop type system with exact TypeScript value shapes and gotchas, verified Fetchly site variable CSS names (Primitives, Color Schemes, Typography), the brand token wiring pattern for Shadow DOM, the tech stack logo SVG inventory and Figma source, and the deployed Fetchly Tech Stack library (Marquee, Sphere, Orbit, plus the scroll animated Dashboard Showcase hero). Load for ANY work on Webflow code components, devlink, the tech stack components, or Fetchly site variables to skip all discovery calls.
---

# Fetchly Code Components — Compiled Research Context

> Everything below was verified hands on during the Tech Stack library build on 2026-06-10 (CLI 2.0.0, @webflow/react 2.0.0, @webflow/data-types 2.0.0, React 19.2.7, TypeScript 5.9.3). Use these facts directly. Re verify only if versions changed.

---

## 1. Webflow CLI 2.0 — commands and auth

### Command renames (v1 → v2)

| v1 (deprecated, warns or breaks) | v2 (use this) |
|---|---|
| `webflow library bundle` | `webflow devlink bundle` |
| `webflow library share` | `webflow devlink import` |
| `webflow devlink sync` | `webflow devlink export` |

"Import" means import INTO the Webflow workspace (deploy). "Export" means export Webflow components TO the filesystem (the old DevLink sync).

### Canonical commands

```bash
# Validate the build locally (no auth needed)
npx webflow devlink bundle --public-path http://localhost:4000/ --no-input --skip-update-check

# Deploy to the workspace (uses the global auth session)
npx webflow devlink import --no-input --skip-update-check

# Auth
npx webflow auth status     # who is logged in + scopes
npx webflow auth login      # browser flow
npx webflow auth logout
```

### Auth model (changed from v1)

- Global session file: `~/.config/webflow/auth.json`. There is NO per project `.env` anymore.
- Lucas is logged in as **Lucas Teixeira (lucasteixeira@fetch.ly)** with scopes: assets:read/write, authorized_user:read, cloud_apps:write, cms:read/write, code_components:read/write, devlink_export:read, sites:read/write, workspace:read.
- `--api-token <token>` overrides; defaults to `WEBFLOW_API_TOKEN` env var. No token is stored in any project folder or `~/.zshrc`.
- Successful import prints: `Code library shared successfully: https://webflow.com/dashboard/workspace/fetchly-45d1a2/shared-libraries-and-templates`

### Errors hit and their fixes

| Error | Cause | Fix |
|---|---|---|
| `Library manifest does not have an id` | webflow.json missing `library.id` | Add `"id"`. A slug like `"fetchly-tech-stack"` works; UUID not required. |
| `'import' and 'export' may appear only with 'sourceType: module'` (in tmp_entry/Server.js) | `"type": "commonjs"` in package.json (npm init default) | Delete the `type` field entirely (or set `"module"`). |
| `export 'default' was not found in './X.module.css'` warnings, then bundle failure | `import styles from "./X.module.css"` | Use `import * as styles from "./X.module.css"` (bundler emits CSS Modules as named exports only). |
| `npm error could not determine executable to run` for `npx tsc` / `npx webflow` | Bash cwd reset to ~/Downloads between calls | Always `cd /abs/path/to/project &&` first. |
| Interactive prompt "Enter a name for your code library" force closes | Running without `--no-input` and missing manifest id | Add manifest id + always pass `--no-input --skip-update-check`. |

### Data API direct access (when the Designer MCP is offline)

The CLI session token at `~/.config/webflow/auth.json` (`.accessToken`) works as a Bearer token against `https://api.webflow.com/v2/*` with the CLI scopes (assets, cms, sites, code components). Verified working calls (2026-06-10):
- `GET /v2/sites/:siteId/assets?limit=100&offset=N` — full asset inventory (Fetchly had 524 assets) with id, displayName, contentType, size, hostedUrl, altText, variants.
- `PATCH /v2/assets/:assetId` with `{"altText": "..."}` — sets asset level alt text (the Designer asset_tool equivalent without needing the Designer open). displayName also patchable.
- Asset alt and custom code changes go live on the NEXT site publish.

### Custom code scripts API gotchas

- `add_site_script` / `add_page_script` attributes ONLY accept `data-*` prefixed keys. **`defer`/`async` cannot be set** on registered custom code scripts (API rejects with 400). The performance lever is `location: "footer"` instead — re calling add_site_script with the same script id updates its location in place.
- Header located registered scripts render as plain blocking `<script>` tags in `<head>`; any DOM fix script belongs in the footer.
- Registered script versions pile up (Fetchly had 244 registered versions for ~40 logical scripts); only applied ones load, cleanup is cosmetic.

### webflow.json (working manifest)

```json
{
  "library": {
    "id": "fetchly-tech-stack",
    "name": "Fetchly Tech Stack",
    "description": "...",
    "components": ["./src/**/*.webflow.@(ts|tsx)"]
  },
  "telemetry": { "global": { "allowTelemetry": true, "lastPrompted": 0, "version": "2.0.0" } }
}
```

The CLI auto appends the `telemetry` block on first run; keep it.

### Bundle output

`dist/Client/` and `dist/Server/`, with module federation exposes per component (`__federation_expose_<Name>.js`). The Tech Stack library: 820K total, ~6 to 12K per component module, shared chunks ~188K + 53K. Limit is 50MB.

---

## 2. @webflow/data-types v2 — exact prop type system

Read from `node_modules/@webflow/data-types/dist/index.d.ts`. This is the authoritative mapping.

### Value each prop type passes to the React component

| Constructor | Component receives | Notes |
|---|---|---|
| `props.Text` (alias `props.String`) | `string` | |
| `props.RichText` | declared `string`, but the Webflow platform runtime delivers ALREADY-RENDERED React nodes | render defensively (see RichText gotcha below) |
| `props.TextNode` | `string` | canvas editable; setting `multiline?: boolean` |
| `props.Link` | `{ href: string; target?: string; preload?: string }` | |
| `props.Image` | `{ src: string; alt?: string }` | `src` is REQUIRED in the type |
| `props.Visibility` | `boolean` | |
| `props.Slot` (alias `props.Children`) | `React.ReactNode` | |
| `props.Number` | `number` | settings: `min`, `max`, `decimals` |
| `props.Variant` | `string` | settings: `options: string[]` (required) |
| `props.Boolean` | `boolean` | settings: `trueLabel`, `falseLabel` |
| `props.Id` | `string` | HTML element id |
| `props.Attributes` | `Record<string, string>` | |

### Constructor options (all types)

`{ name: string, group?: string, tooltip?: string, defaultValue?, ...settings }`

- `group` creates collapsible sections in the Designer Properties panel. Used heavily in the Tech Stack library (Header, Layout, Motion, Colors, Logos, Advanced). Highly recommended for components with many props.
- `tooltip` shows on hover in the panel.
- Settings (min/max/options/etc.) are flattened into the same options object, NOT nested.

### defaultValue support

- CAN have defaultValue: Text, RichText, TextNode, Visibility, Number, Variant, Boolean.
- CANNOT have defaultValue (TS error if provided): Id, Link, Image, Slot, Attributes.

### RichText runtime gotcha (burned us 2026-06-11)

The d.ts declares `PropValues[RichText] = string`, but that is only the compile-time contract. At runtime in the Designer/published site, a RichText prop (especially CMS-bound) arrives as ALREADY-RENDERED React nodes, so `dangerouslySetInnerHTML={{ __html: value }}` renders NOTHING (symptom: "body isn't being loaded"). Keep the interface field typed `string` (so declareComponent's prop matcher accepts props.RichText), but render through a defensive helper that branches on the actual shape:
string -> dangerouslySetInnerHTML; React element / array -> render as children; object with .html string -> dangerouslySetInnerHTML(.html); else -> children. Descendant tag selectors (.prose h2 { ... }) style both paths identically. Working reference: `Prose` component in fetchly-blog/src/components/BlogPost/BlogPost.tsx.

### The type matching gotcha (cryptic error decoder)

`declareComponent` infers which PropTypes are compatible with each React prop via `T extends PropValues[P]`. If your component's TS type for a prop doesn't EXACTLY extend the expected value shape, the matcher falls through to `Slot` (whose value is `unknown`, which everything extends) and you get a baffling error like:

```
Type 'PropType.Image' is not assignable to type 'PropType.Slot'
```

Decoder: your interface is wrong for that prop. Concretely hit with Image: typing it `{ src?: string; url?: string; alt?: string }` fails; it MUST be `{ src: string; alt?: string }` (the prop itself can be optional: `customLogo?: ImageValue`).

### Image prop runtime gotcha (Designer placeholder)

An Image prop with NO image selected is not reliably undefined on the canvas: the Designer feeds Webflow's gray placeholder image, so `image?.src` is truthy and "optional" images render as ugly placeholder tiles. This made placeholder tiles appear in the Tech Stack marquee, and the custom logo props were removed because of it (2026-06-10). If optional Image props are ever needed, gate them behind a Boolean prop (e.g. "Use Custom Logo 1") instead of relying on the image being empty.

### Component options

```ts
options: {
  applyTagSelectors?: boolean,        // default FALSE (site h1/p tag styles do not cascade in)
  ssr?: "prerender" | true | false,   // default true; "prerender" awaits Suspense
}
```

SSR decisions used: marquee (pure CSS animation) ssr true; sphere and orbit (rAF + pointer driven) ssr false.

### WebflowContext

A `WebflowContext` type exists: `{ mode: "design"|"build"|"edit"|"preview"|"component-preview"|"comment"|"analyze"|"publish", interactive: boolean, locale: string|null }`.

---

## 3. Working project scaffold (copy this)

```
fetchly-tech-stack/
├── package.json        # NO "type" field. deps: react, react-dom; dev: typescript,
│                       # @types/react, @types/react-dom, @webflow/webflow-cli,
│                       # @webflow/data-types, @webflow/react, vite (preview only)
├── tsconfig.json       # target ES2020, module ESNext, moduleResolution Bundler,
│                       # jsx react-jsx, strict, skipLibCheck, esModuleInterop, noEmit
├── webflow.json        # see section 1
├── index.html          # vite preview entry (loads Google Fonts Inter + Geist Mono)
├── .claude/            # (do NOT put launch.json here — see section 8)
└── src/
    ├── declarations.d.ts
    ├── logos.tsx                       # generated, see section 6
    ├── preview/main.tsx                # vite-only harness, renders all variants
    ├── shared/
    │   ├── tokens.css                  # brand tokens, global classes (see section 5)
    │   ├── SectionHeader.tsx           # eyebrow + heading, uses .fts-* global classes
    │   └── logoKit.tsx                 # buildLogoSet(excludeLogos), cssVars()
    └── components/<Name>/
        ├── <Name>.tsx                  # import * as styles from "./<Name>.module.css"
        ├── <Name>.module.css
        └── <Name>.webflow.tsx          # declareComponent; side-effect imports BOTH
                                        # ../../shared/tokens.css AND ./<Name>.module.css
```

`declarations.d.ts` (exact, required):

```ts
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export = classes;
}
declare module "*.css";
```

Key facts:
- Plain (non module) shared CSS files imported in a `.webflow.tsx` DO get injected into that component's shadow root. Global class names like `.fts-root` are safe because each shadow root is isolated. This is how one shared tokens.css serves all components.
- CSS module class names should be valid JS identifiers (camelCase) so both webpack named exports and vite preview named exports work.
- Each `.webflow.tsx` must side effect import every CSS file the component needs.

---

## 4. Fetchly site variables — VERIFIED CSS names (Designer MCP, 2026-06-10)

### Variable collections

| Collection | ID | Modes |
|---|---|---|
| Primitives | `collection-0220e3ad-eb86-03ea-3026-8a5979301dd2` | none |
| Color Schemes | `collection-139f4ef2-8521-8181-4a7f-fc90894e2d6f` | Dark (`mode-19a26333-b0a9-8164-7b79-28dad0e26121`) |
| Typography | `collection-3c6a4911-12c4-e415-7fe0-514cefa2d46d` | none |
| UI Styles | `collection-08964abb-b13c-a798-071a-663d82b7f0a6` | `440>`, `1440 – 1920` |
| Spacing | `collection-cd1591de-9c65-ea46-fa63-647eb38573a3` | none |

### Primitives — colors (`--_primitives---colors--*`)

| CSS variable | Value |
|---|---|
| `--_primitives---colors--black` | black |
| `--_primitives---colors--white` | #fff |
| `--_primitives---colors--neutral-lightest` | #fffefa |
| `--_primitives---colors--neutral-lighter` | #f6f5f1 |
| `--_primitives---colors--neutral-light` | #eeede8 |
| `--_primitives---colors--neutral` | **#3c3f41** ⚠ |
| `--_primitives---colors--neutral-dark` | **#2b2f31** ⚠ |
| `--_primitives---colors--neutral-darker` | #1e2325 |
| `--_primitives---colors--neutral-darkest` | #050b0d |
| `--_primitives---colors--malibu-lightest` | #F0FCFE |
| `--_primitives---colors--malibu-lighter` | #E1F9FE |
| `--_primitives---colors--malibu-light` | #96ECFC |
| `--_primitives---colors--malibu` | #69E5FB |
| `--_primitives---colors--malibu-dark` | #54B7C8 |
| `--_primitives---colors--malibu-darker` | #2A5B64 |
| `--_primitives---colors--malibu-darkest` | #1F444B |
| `--_primitives---colors--spring-green-lightest` | #E5FFF6 |
| `--_primitives---colors--spring-green-lighter` | #CCFFED |
| `--_primitives---colors--spring-green-light` | #4FFFC2 |
| `--_primitives---colors--spring-green` | #04FFA8 |
| `--_primitives---colors--spring-green-dark` | #03CC86 |
| `--_primitives---colors--spring-green-darker` | #016643 |
| `--_primitives---colors--spring-green-darkest` | #014C32 |
| `--_primitives---colors--azure-radiance-*` | lightest #E5F1FF · lighter #CCE4FF · light #4CA2FF · default #007BFF · dark #0062CC · darker #003166 · darkest #00244C |
| `--_primitives---colors--mandy-*` | lightest #FCEEEE · lighter #F9DEDE · light #EB8B8B · default #E35A5A · dark #B54848 · darker #5A2424 · darkest #441B1B |

⚠ **Gotcha:** site `neutral` (#3c3f41) and `neutral-dark` (#2b2f31) are dark grays that do NOT match the brand book's Neutral (#E5E4DF, borders) and Neutral Dark (#505455, secondary text). The site has NO primitive for #E5E4DF or #505455. For borders use the scheme token below; for soft ink, `--_primitives---colors--neutral` is acceptable on site (resolves #3c3f41) with #505455 as the fallback hex.

### Primitives — opacity (`--_primitives---opacity--*`)

`transparent`, `white-5/10/15/20/30/40/50/60` (#ffffff0d … #ffffff99), `neutral-darkest-5/10/15/20/30/40/50/60` (#050b0d0d … #050b0d99).

### Color Scheme 1 — semantic, dark mode aware (`--color-scheme-1--*`)

These FLIP automatically when a section uses the collection's Dark mode. Light value → Dark value:

| CSS variable | Light | Dark |
|---|---|---|
| `--color-scheme-1--text` | black | white |
| `--color-scheme-1--background` | neutral-lightest | neutral-darker (#1e2325) |
| `--color-scheme-1--foreground` | white | neutral-darker |
| `--color-scheme-1--border` | neutral-darkest 15% | white 15% |
| `--color-scheme-1--accent` | malibu | malibu |
| `--color-scheme-1--primary-button` | black | neutral-lightest |
| `--color-scheme-1--secondary-button` | neutral-light | neutral |
| `--color-scheme-1--surface-1` | white | neutral-dark (#2b2f31) |
| `--color-scheme-1--surface-2` | neutral-lighter | neutral (#3c3f41) |

Also in this collection: `--transparent`, `--xsmall` (0.5rem), `--base-color-neutral--neutral-lightest`, `--accessible-components--dark-grey`, `--accessible-components--dodger-blue`.

### Typography (`--_typography---font-styles--*`)

| CSS variable | Value |
|---|---|
| `--_typography---font-styles--neo-heading` | **Marjorie** |
| `--_typography---font-styles--heading` | Inter |
| `--_typography---font-styles--body` | Inter |
| `--_typography---font-styles--neo-body` | Inter |
| `--_typography---font-styles--neo-tagline` | Inter (NOT Geist Mono) |

**There is NO Geist Mono variable on the site.** Use a literal stack: `"Geist Mono", ui-monospace, "SF Mono", Menlo, monospace`.

### Designer MCP connection

The variable_tool (and all Designer tools) need the Designer open with the MCP Bridge App. Launch link:
`https://staging-fetchly.design.webflow.com?app=dc8209c65e3ec02254d15275ca056539c89f6d15741893a0adf29ad6f381eb99`
If not connected the tool returns `Unable to connect to Webflow Designer...` — do not retry, ask the user to click the link with the Designer tab in the foreground.

---

## 5. Brand token wiring pattern for Shadow DOM (the proven approach)

Inside a code component's shadow root, site CSS classes do NOT reach in, but site CSS custom properties DO inherit. The pattern that ships in `src/shared/tokens.css`:

```css
.fts-root {
  --fts-ink: var(--_primitives---colors--neutral-darkest, #050b0d);
  --fts-ink-soft: var(--_primitives---colors--neutral, #505455);
  --fts-surface: var(--color-scheme-1--surface-1, #fffefa);
  --fts-surface-alt: var(--color-scheme-1--surface-2, #f6f5f1);
  --fts-line: var(--color-scheme-1--border, #e5e4df);
  --fts-accent: var(--_primitives---colors--malibu, #69e5fb);
  --fts-accent-ink: var(--_primitives---colors--malibu-darkest, #1f444b);
  --fts-font-display: var(--_typography---font-styles--neo-heading, "Marjorie", Georgia, serif);
  --fts-font-body: var(--_typography---font-styles--neo-body, "Inter", sans-serif);
  --fts-font-mono: "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace;
}
.fts-root[data-theme="dark"] {
  --fts-ink: var(--_primitives---colors--neutral-lightest, #fffefa);
  --fts-surface: var(--_primitives---colors--neutral-darker, #1e2325);
  --fts-line: var(--_primitives---opacity--white-15, rgba(255,255,255,0.15));
  --fts-accent-ink: var(--_primitives---colors--malibu, #69e5fb);
}
```

Three layers of precedence: component color props (applied as inline custom properties on the root, skipped when empty string) → site variables → brand book hex fallbacks. Helper `cssVars()` in logoKit.tsx builds the inline style object skipping empty values.

Brand rules applied (from ~/Downloads/fetchly-brand-guidelines.md, the source of truth): 60-30-10 color rule, Spring Green graphic accents only, no vibrant body text, Marjorie for display/H1/H2, Inter for H3 to H6/body/UI, Geist Mono uppercase ONLY for taglines/eyebrows/labels, eyebrow tracking 0.08em, heading letter spacing -1px, line height 1.2.

Fonts inside Webflow: Marjorie and Geist Mono are site fonts and resolve on canvas/publish. In local previews they fall back (load Inter + Geist Mono from Google Fonts in the preview html; Marjorie is commercial and falls back to Georgia).

---

## 6. Tech stack logos — Figma source and SVG inventory

### Figma source

- File: **Fetchly-Website**, key `ASMRrEchefWyN41K0CBp3y`, node **13174-5754** ("marquee" frame).
- Structure: 15 "Tech Stacks Logos" component instances, each a 36 × 36.097px centered cell, inner vectors ~26 to 29px, column gap 32px. Logos are flat dark vectors; `get_variable_defs` on the node returns `{}` (no bound variables).
- Inner vector node IDs run 12970:361 through 12970:376 (375 unused).
- Figma MCP asset URLs expire after 7 days; the durable source is the local folder below.

### Local SVGs: `/Users/fetchlyuser/Downloads/website/tech-stack-logos/`

All 15 files are clean: only `<path>` elements, `fill="black"` (replace with `currentColor`), no defs/clipPaths/strokes. Identification was verified visually via rendered labels.

| File | Technology | viewBox | Identification clue |
|---|---|---|---|
| Vector-11.svg | React | 0 0 30 27 | atom, 2 paths |
| Vector-12.svg | iOS & Android | 0 0 30 25 | Apple + Android side by side |
| Vector-9.svg | .NET | 0 0 30 27 | N square + "Microsoft .NET" text (8.4KB, most complex) |
| Vector-8.svg | Node.js | 0 0 33 10 | wide "node js" wordmark |
| Vector-14.svg | React Native | 0 0 30 27 | second atom, different path data than Vector-11 |
| Vector-6.svg | Python | 0 0 29 29 | two interlocked shapes + 2 circle eyes |
| Vector-10.svg | DevOps | 0 0 31 15 | segmented infinity (7 paths, X crossing center) |
| Vector-5.svg | PHP | 0 0 31 16 | wide oval |
| Vector-3.svg | SQL & Cloud | 0 0 28 30 | database cylinder + cloud |
| Vector-2.svg | TypeScript | 0 0 29 29 | full square + T and S letterforms |
| Vector-1.svg | Vue.js | 0 0 30 26 | simple nested V (363 bytes, smallest) |
| Vector.svg | Shopify | 0 0 26 30 | tall bag + S |
| Vector-7.svg | Swift | 0 0 30 21 | bird |
| Vector-13.svg | Go | 0 0 32 12 | GO letters + speed lines |
| Vector-4.svg | Rails | 0 0 32 11 | RAILS shield wordmark |

Generator: `~/Downloads/fetchly-tech-stack/scripts/generate-logos.mjs` reads these, swaps `fill="black"` → `fill="currentColor"`, converts `fill-rule`/`clip-rule` to JSX casing, and emits `src/logos.tsx` exporting `TECH_LOGOS: { name, slug, viewBox, glyph }[]` in the Figma marquee order above. Rerun with `node scripts/generate-logos.mjs` if the SVGs change.

Slugs (for the excludeLogos prop): react, mobile, dotnet, nodejs, react-native, python, devops, php, sql, typescript, vue, shopify, swift, go, rails.

---

## 7. The deployed library — Fetchly Tech Stack

- Project: `~/Downloads/fetchly-tech-stack/` · manifest id `fetchly-tech-stack` · library name **"Fetchly Tech Stack"** · Designer Add panel group **"Tech Stack"**.
- Deployed to workspace `fetchly-45d1a2` on 2026-06-10 (twice; second deploy wired verified site variables). Dashboard: https://webflow.com/dashboard/workspace/fetchly-45d1a2/shared-libraries-and-templates
- Sibling libraries (do not overwrite, each project = own library): "Hero Header Library" (9 components, id 6a0b6c06358a62231429b5ed), "Fetchly Pricing Page" (id bd107cbd-b45b-45df-b4c7-0ab297bcd104, at ~/Downloads/fetchly-pricing-page/), "Fetchly Media Gallery" (at ~/Downloads/fetchly-media-gallery/, not deployed).

### Components and props

All three share: Header group (Eyebrow [Geist Mono caps + 8px Malibu square mark], Heading [Marjorie], Show Header [Visibility], Header Alignment [left/center]), Colors group (Theme light/dark Variant, plus CSS color Text props that override custom properties, empty = brand default), Logos group (Exclude Logos comma list), Advanced (HTML ID via props.Id). Custom Logo Image props existed in v1 but were removed on 2026-06-10: unset Image props render the Designer's placeholder image (see section 2 gotcha).

1. **Tech Stack Marquee** (ssr true) — classic infinite carousel matching the Figma node. Motion: Loop Duration 5 to 180s (default 30), Direction left/right, Pause On Hover, Accent On Hover. Layout: Rows 1/2 (row 2 counter scrolls), Logo Size 20 to 96 (36), Gap 8 to 160 (64), Fade Edges (mask-image gradient), Show Labels. Implementation: track of 2 identical groups, `translateX(-50%)` keyframes, `animation-direction: reverse` for right, group padding = gap/2 each side, prefers-reduced-motion falls back to overflow-x auto.
2. **Tech Stack Sphere** (ssr false) — spinning ball with logo cards on the surface. Layout: Sphere Size 260 to 900 (480), Card Size 40 to 140 (76, auto clamped to 18% of measured diameter), Card Style card/ghost, Show Labels. Motion: Rotate Speed 0 to 60 deg/s (14), Spin Direction, Axis Tilt -45 to 45 (12), Drag To Rotate (pointer capture + inertia, velocity decay 0.94), Pause On Hover, Depth Fade, Accent On Hover. Implementation: Fibonacci sphere distribution, per frame yaw/pitch rotation projected to translate3d + scale (0.55 to 1.0 by depth) + opacity (0.3 to 1.0) + zIndex, billboarded cards, ResizeObserver drives diameter, deterministic initial transforms at yaw 0 for first paint.
3. **Tech Stack Orbit** (ssr false) — chips on concentric elliptical orbits around a center stat. Layout: Orbit Size 280 to 900 (560), Rings 1 to 4 (3), Vertical Squash 40 to 100% (80), Chip Size 36 to 120 (64, auto clamped to 15% of stage width), Chip Style, Show Ring Lines, Always Show Labels. Motion: Outer Revolution 8 to 180s (40), Alternate Ring Directions, Pointer Parallax (±6deg lerped rotateX/rotateY, perspective 1100px), Pause Ring On Hover, Depth Effect, Accent On Hover. Center: Show Center Stat, Center Value (empty = auto logo count), Center Label ("TECHNOLOGIES"). Implementation: ring radius fractions {1:[1], 2:[.6,1], 3:[.42,.72,1], 4:[.34,.57,.79,1]}, logos distributed proportionally to ring size, angular speed ω = (2π/speed) · (1/fraction)^0.7 with alternating sign, position cos/sin scaled by rx/ry, depth from sin(α) drives scale/opacity/zIndex, hover labels are pill chips (Geist Mono caps).
4. **Dashboard Showcase** (ssr TRUE, group "Hero", added 2026-06-10, performance rebuild 2026-06-10 PM) — server-rendered HTML rebuild of the WorkHub dashboard from Figma node 13174-5240. v2 architecture (the v1 JS-driven version was glitchy: blank-space CLS from JS-computed height, ssr false late paint, setState-per-frame count-up, will-change on ~40 nodes, reverse-on-exit churn): markup paints instantly from declarative shadow DOM; the `.scaler` wrapper hugs height via `aspect-ratio: 1280/964` + `container-type: inline-size` + `overflow: hidden` (border/radius/shadow live on the scaler, not the stage); the 1280×964 stage scales purely in CSS via `transform: scale(min(1, tan(atan2(100cqw, 1280px))))` (length-division trick, zero JS, zero CLS); entrance choreography is pure CSS `@starting-style` transitions with SSR-inlined per-element `transition-delay` (plays once at first paint, no IntersectionObserver, no data-play attribute); KPI count-up is a hydration enhancement writing `textContent` via refs (no re-renders), skipped when `performance.now() > 2500` or reduced motion (SSR markup already shows final values 45/12/8/3); a ResizeObserver fallback engages only when `CSS.supports` rejects container-query math. All content/KPIs/motion are HARD-CODED (user-approved trade-off); only props: Max Width (480–1280), Frame Shadow (Boolean), HTML ID. Reduced motion kills transitions only — never `transform: none` (the scale IS the transform). Palette unchanged: accent #3565FC, tab tint #DAE5FF, lime #D9F99D/#4D7C0F, red #FCE3E3/#9A2929, ink #334155, chrome #F7F6F1, panel #F9F8F6, line #ECEAE3, dark #242D3C. Verified: @starting-style/atan2/aspect-ratio survive the devlink bundler into emitted CSS.

---

## 8. Local preview setup

- Launch configs live at **`~/Downloads/.claude/launch.json`** (the session root), NOT inside individual project folders. A project local `.claude/launch.json` is ignored.
- Entry: name `tech-stack-preview`, `npm --prefix /Users/fetchlyuser/Downloads/fetchly-tech-stack run dev -- --port 5183 --strictPort`, port 5183. (`dev` script = `vite`.)
- Preview harness: `index.html` + `src/preview/main.tsx` render all variants (light defaults, dark 2 row marquee, sphere, orbit). Vite handles `import * as styles` from CSS modules natively (it emits named exports for valid identifiers).
- Other registered servers in that launch.json: range (3000), brandbook (8137), media-gallery (5188), textlab (5180), bottom-atc (5199).

---

## 9. Figma MCP quick reference (as used)

- `get_design_context(nodeId, fileKey)` → React + Tailwind reference code, screenshot, asset URLs (expire in 7 days). Node id format `13174-5754` or `13174:5754`.
- `get_variable_defs(nodeId, fileKey)` → only variables BOUND to that node ({} for the marquee since logos are flat vectors). For the full design system tokens, query the Webflow site variables instead (section 4) or use the Theme/Primitives collections in the Fetchly-Website Figma file.
- Always pass `clientFrameworks` and `clientLanguages`.

---

## 10. Decision log (why things are the way they are)

- **One library per project**: `devlink import` replaces the entire library it targets, so the tech stack got its own manifest id instead of joining the pricing or hero libraries.
- **applyTagSelectors false** on all three: full typographic control inside the shadow root; site tag styles could fight the brand scale.
- **Color props as Text, not a Color type**: no Color prop type exists in data-types v2. Text props accepting any CSS color, applied as inline custom properties when non empty, give the same result.
- **15 fixed logos inlined rather than Image props per logo**: the set is brand approved and ships in the bundle as currentColor JSX (CSS controls tint, no asset uploads needed). Flexibility comes from the excludeLogos prop. Custom Image slots were tried and removed: unset Image props show the Designer placeholder image in the marquee.
- **DevOps naming for the infinity glyph**: segmented infinity with center crossing; in a stack listing alongside React/Node/Go it reads as the DevOps symbol.
- **Two atoms are React and React Native**: the Figma marquee itself contains two distinct atom drawings (nodes 12970:361 and 12970:365).
