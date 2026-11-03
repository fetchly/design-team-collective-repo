---
name: fetchly-case-cover
description: Create looping UI-motion cover videos for Fetchly case studies (fetch.ly/case-studies) with Remotion, in the style of Paperpillar's Dribbble "App UI Motion Exploration" shots — branded phone screens, a tap cursor walking through the client's key flow, soft camera moves. Use when asked to make, update or render a case-study cover, case-study video, "UI motion" or "app motion" video for a Fetchly client or product (e.g. Pet Releaf, Casper, Oats Overnight, VRT Sync, Container Alliance).
---

# Fetchly case-study cover videos

A cover is a silent, seamlessly looping 4:3 video (1600×1200, 30 fps, ~18 s) that sits in
the case-study card on fetch.ly. It shows the client's product UI on a flat brand-colour background and
acts out **the improvement the case study is about** — not a generic tour.

Covers are built in a Remotion project with this layout:

```
<project>/
  src/kit/                 shared, client-agnostic building blocks (see references/kit.md)
  src/covers/<client>/     one folder per cover: brand.ts, screens, <Client>Cover.tsx
  public/<client>/         downloaded product shots, logos
  out/                     rendered MP4 + poster PNG
```

`src/covers/pet-releaf/` is the reference implementation. Copy its structure for every new client.
The skill folder bundles a copy of the kit and the Pet Releaf example in `template/`.

## Project setup (once)

Look for an existing project first: a folder with `package.json` depending on `remotion`
and a `src/kit/` folder. If there is one, use it. Otherwise create one next to the user's
work (requires Node 18+ and Git; folder names must not contain spaces):

```bash
npx create-video@latest --yes --blank --no-tailwind fetchly-covers
cd fetchly-covers
npm i
npx remotion add @remotion/google-fonts
rm src/Composition.tsx
cp -R <skill-dir>/template/src/. src/
cp -R <skill-dir>/template/public/. public/
npx tsc --noEmit
```

`<skill-dir>` is the folder containing this SKILL.md. The copied `src/Root.tsx` registers
`PetReleafCover`. Render one still of it to confirm the setup works before starting a new cover.

Before writing Remotion code, load the `remotion:remotion-best-practices` skill.
Read [references/style-guide.md](references/style-guide.md) before designing screens or timing.

## Workflow

### 1. Research the story (browser)
1. Open `https://www.fetch.ly/case-studies`. The cards render inside `code-island` shadow
   roots — query `el.shadowRoot` to find the client's card, its current cover image and the
   case-study URL (`/post/...`).
2. Read the case study. Pull out the **Solution** bullets and the **Result** metric.
   The cover's flow must demonstrate those bullets, in order, as taps on screen.
   - Pet Releaf: "visual swatch variant selector" → "custom subscription widget" →
     add to cart → cart sheet showing subscription savings.
3. Open the client's live product in a **mobile viewport** (375×812) and screenshot the
   relevant screens. Sample brand tokens with `getComputedStyle` (most-used colours, font
   families) and grab real product data (Shopify: `/products/<handle>.js` gives variants,
   prices, image URLs).

Pick a format: mobile app / mobile web → phone screens (default). Desktop-only products can
still use phone screens of the responsive site; ask the user if a desktop browser frame fits
the story better.

### 2. Confirm with the user
Before downloading anything, ask permission and list each file (name, source, size): product
shots, logo. Also confirm the flow (3–4 interactions), and whether to show any text besides
UI (default: UI only — the card already has a title).

### 3. Build the cover
1. `public/<client>/` ← approved assets (`curl -sSfL`). Check them visually.
2. `src/covers/<client>/brand.ts` — colours, font (closest Google Font if the brand font is
   commercial; note the substitution in a comment), asset paths, real product data.
3. Screens as pure components of a `state` object (each field a 0→1 progress or a value),
   authored at 390×844 points. Export tap targets in screen points next to the layout they
   describe so the cursor aims at the real element.
4. `<Client>Cover.tsx` — a `B` beats table (frames), `stateAt(frame)`, cursor keys, camera.
   Follow the shot structure in the style guide: overview → push in → flow → pull out.
5. Register the `<Composition>` inside the `Case-study-covers` folder in `src/Root.tsx`.

Use only real data: real product names, variants and prices. Never invent reviews, metrics
or features that the case study or the client site doesn't state.

### 4. Preview and check
- Studio: `npm run dev` inside the project (port 3000), then attach the browser pane to
  `http://localhost:3000`. If the preview launcher can't access `~/Desktop` (EPERM uv_cwd),
  start Studio from Bash in the background and use a launch config with only `url`.
- Render stills at the key beats and look at them:
  `npx remotion still <Id> /tmp/f.png --frame=<n> --scale=0.5`
  Check: frame 0, mid push-in, each tap, the end state, mid pull-out, last frame.
- Run `npx tsc --noEmit`.
- Work through the QA list in the style guide.

### 5. Render
```bash
npx remotion render <Id> out/<client>-cover.mp4 --codec=h264 --crf=18 --muted
npx remotion still <Id> out/<client>-cover-poster.png --frame=0
```
Hand over the MP4 (Webflow background video / autoplay muted loop) and the poster PNG.
