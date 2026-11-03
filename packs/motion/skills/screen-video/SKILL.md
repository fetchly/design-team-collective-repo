---
name: screen-video
description: "Re-records the flow from a website screen recording by script and turns it into a professional product demo video for LinkedIn — smooth scrolling, a cursor that moves like a human hand, an approved pace (near real time, nothing rushed, ends on the final state) and an optional frame/background. Websites only (public or localhost); it does not edit existing footage. Use when someone shares a screen recording / CleanShot / QuickTime capture and asks to polish it, make it professional, smooth out the scrolling, fix the speed, make a product demo or walkthrough, or a case video for the feed. Also in Portuguese: \"gravação de tela\", \"deixar profissional\", \"smooth scroll\", \"ajustar a velocidade\"."
---

# Screen video — product demo for the feed

This skill re-records the flow on the live site by script, following **one standard** for pace,
scrolling and cursor, described in
`reference/standard.md` — read it before starting. The numbers there were approved in real use;
don't reinvent them.

Talk to the person in their language. Scripts and file names stay as they are.

## 0. First of all: the route

1. Run `ffprobe` on the recording (duration, resolution, fps).
2. Build contact sheets at 1 frame per second (4×3, 12s per sheet) and **look at every one**:
   `ffmpeg -ss N -i video -t 12 -vf "fps=1,scale=640:-1,tile=4x3" -frames:v 1 sheet-N.png`
3. Write the step list: screen, what gets clicked, what gets scrolled to, the **name** of each
   item, quantities, where it ends. Show it to the person and wait for an OK. The video follows
   that list — nothing more, nothing less. If they asked for a different length or a different
   set of items, propose the list that fits and confirm it.

## 1. Check it can be re-recorded

The flow must run on a website Claude can open: public, or on localhost. The reference
recording is only the script to follow; the final video is a new recording.

If it's a native app, or a site behind a real login the person can't open in a test profile,
say so plainly: this skill can't do it. Don't try to edit or patch the original footage.

## 2. Re-record by script

Needs Node with Playwright (`npm i -g playwright && npx playwright install chromium`) and
ffmpeg. Every path below (`scripts/`, `routes/`, `reference/`) is relative to the folder
this SKILL.md lives in — resolve it to an absolute path before running anything.

1. **Entry screens** (age gate, region, cookies, test login): the person fills them in.
   Open the window for them and save the profile:
   `NODE_PATH=$(npm root -g) node scripts/profile.js https://site profile.json`
   If the person asks you to fill them in, confirm each item first (it's the site's form).
   Never use a real password, never complete a purchase: **the video stops before checkout.**
2. **Write the route** as a `.js` file following the examples in `routes/splash/`:
   - `byoc-pages.js` — **the preferred model**: 20–30s, 5 items × 3 spread across the grid,
     crosses to page 2 and visits one product page.
   - `curated.js` — short, with a carousel; the main section is on screen at ~5s.
   - `byoc-short.js` — everything on one page.
   - `byoc.js` — a long, exact replica of a real recording.

   The helpers (`h.reach`, `h.flick`, `h.click`, `h.clickLink`, `h.clickNavigates`, `h.wait`…)
   are documented at the top of `scripts/record.js`. Hide the chat widget and pop-ups with
   `hide` / `hideFixedContaining` before recording — find the selectors by inspecting the page
   (the chat `iframe`, `position: fixed` overlays). If the chat button is part of the site's
   look, keep a replica of the closed button with `overlay` (see `routes/splash/common.js`).
3. **Short test** with `--test` (the route exits early), look at a sheet, then the full run:
   `NODE_PATH=$(npm root -g) node scripts/record.js route.js frames/ --profile profile.json`
4. Assemble: `python scripts/assemble.py frames/ screen.mp4 1800`

If an item isn't found by name, the log says so and falls back to its position — check it.

## 3. Frame and format

`python scripts/frame.py screen.mp4 final.mp4 --format 16x9 [--background texture|flat|none|image.jpg] [--color 006DF3] [--tint 0.6] [--logo logo.png] [--cut 59]`

- Ask about the format if the person didn't say: **16:9** for desktop apps and websites (the
  screen stays large); **4:5** for a phone-first feed. 9:16 only if the content is vertical.
- Background: ask. For fetchly pieces the approved one is texture in `#006DF3`; for other
  brands, `flat` in their colour, `none`, or **their own texture/photo**: pass the image path
  as `--background`. It covers the frame without stretching. If the texture is neutral (a grey
  paper scan) and they want it in a brand colour, add `--color HEX --tint 0.6`; check one frame
  and adjust the tint before rendering the whole video.

## 4. Check before delivering

- A contact sheet of the final video at the key moments (look at it, don't assume).
- Smoothness: measure the per-frame shift on the final screen (see `reference/standard.md`);
  if the mean deviation goes above ~17%, something broke.
- 20–30s ideally, 60s at most; ends on the final state; no text the person didn't ask for.
- Send the MP4 and say in one line: duration, format, what changed. Offer **one** adjustment.

Outputs go in `output/{slug}/`. Frames and intermediates go in the temp folder.
