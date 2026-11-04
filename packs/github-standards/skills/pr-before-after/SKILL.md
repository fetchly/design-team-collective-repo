---
name: pr-before-after
description: Every pull request that changes something a person can see gets before and after screenshots in its description. Use whenever you open or update a PR (gh pr create, gh pr edit, any PR tool) in a design team repo, and when asked to add screenshots, a visual diff or a before/after to a PR.
metadata:
  version: 1.0.0
---

# PR before and after

A reviewer should see what changed without checking out the branch. Every PR that changes rendered output (a page, component, style, copy, image, animation, artifact, generated HTML) carries before and after screenshots of the changed thing in its description. Pure tooling, config or docs PRs say `No visual change` in the Before / After section instead.

## When

- Before `gh pr create` (or any PR tool): capture, upload, then create the PR with the images in the body.
- After pushing more commits that change the visuals: recapture the after shots and update the body with `gh pr edit`.
- New files with no "before" (a new page, a new showcase project): show `New` as the before cell and the after shot.

## What to capture

- The changed thing, cropped to it, plus one full-page shot for context.
- Widths 1440 and 390 at minimum; add 768 when the layout has a tablet breakpoint. Light and dark when the site has both.
- Before = the base branch (usually `main`), after = the PR branch, same URL, same viewport, same state (same scroll, same open menu, same data).
- Motion: a still of the final state for both, plus a short GIF or MP4 of the after when the change is the motion itself.

## How

1. Serve both versions. Easiest: a worktree of the base branch next to the PR branch.
   ```bash
   git worktree add ../_before origin/main
   ```
   Serve each folder (`npx serve -l 5001 ../_before`, `npx serve -l 5002 .`, or the repo's own dev server on two ports).
2. Capture with the bundled script (Playwright, Chromium):
   ```bash
   node <skill-dir>/scripts/capture.mjs --before http://localhost:5001 --after http://localhost:5002 \
     --paths "/,/pricing/" --widths 1440,390 --out .pr-shots
   ```
   Add `--selector ".hero"` to crop to the changed element, `--dark` to also shoot `prefers-color-scheme: dark`. No server? Use `file://` URLs for plain HTML.
3. Upload. Push the images to the `pr-assets` branch of the same repo so they stay off `main`:
   ```bash
   <skill-dir>/scripts/upload.sh .pr-shots <pr-or-branch-name>
   ```
   It prints Markdown image links (`https://github.com/<owner>/<repo>/blob/pr-assets/<branch>/<file>?raw=true`), which render for anyone who can see the repo, private repos included.
4. Put the table in the PR body under `## Before / After`:

   | | Before | After |
   |---|---|---|
   | 1440 | ![](before-1440) | ![](after-1440) |
   | 390 | ![](before-390) | ![](after-390) |

5. Clean up: `git worktree remove ../_before`, and never commit `.pr-shots/` to the PR branch.

## Rules

- No screenshot, no review request. A visual PR without the table is not ready.
- Same viewport, same state on both sides, or the comparison lies.
- Crop to the change; a full-page shot alone hides a 2px fix.
- Never paste screenshots that show secrets, tokens, real client data or private dashboards. Blur or use seed data.
- Say what you could not capture (a logged-in state, a device-only bug) in the PR body.
- The `pr-screenshots.yml` workflow in `github-standards/templates` fails a PR that changes visual files without images in its Before / After section.
