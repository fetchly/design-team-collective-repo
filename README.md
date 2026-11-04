# Design Team Collective Repo

Fetchly design team's shared Claude Code setup: every skill and agent we use, sorted into packs, with Fetchly brand tokens and GitHub standards. Install only the packs you need.

## Quick start

```bash
gh repo clone fetchly/design-team-collective-repo && cd design-team-collective-repo
./install.sh list
./install.sh fetchly-brand motion design-ui
```

Restart Claude Code after installing.

## Installer

| Command | Does |
|---|---|
| `./install.sh list` | Shows every pack with its skill count |
| `./install.sh <pack> [pack...]` | Copies the pack's skills and agents into `~/.claude` |
| `./install.sh all` | Installs every pack |
| `--project <dir>` | Installs into `<dir>/.claude` so the skills live with one repo |
| `--plugins` | Also installs the Claude Code plugins a pack depends on (Figma, Webflow, Interfaces) |
| `--templates <dir>` | Copies CI workflows, Playwright tests and the PR template into a repo |

The installer never overwrites a skill you already had. It only replaces copies it installed earlier, which carry a `.dtc-installed` marker.

## Packs

| Pack | Skills | Agents | What it's for |
|---|---|---|---|
| [`design-ui`](packs/design-ui) | 11 | 4 | Interface craft from first sketch to finished build. Impeccable (shape, critique, audit, polish, animate) with its four review and documentation agents, plus the better-* rule sets for accessibility, color, layout, type, UI and UX writing. |
| [`fetchly-brand`](packs/fetchly-brand) | 4 | 0 | Everything that makes work look and sound like Fetchly. Brand tokens (CSS and W3C JSON), color and type rules, the case cover generator, and theme tooling. Install this pack first: other packs assume these tokens. |
| [`figma`](packs/figma) | 7 | 0 | Working in Figma through Claude. Writing to the canvas, design to code with 1:1 fidelity, Code Connect, design system rules, new files, and verified notes on Figma's agent features and their limits. |
| [`github-standards`](packs/github-standards) | 1 | 0 | Rules and test templates for design team repos. A CLAUDE.md rule set for branches, commits, PRs and reviews, plus copy-ready GitHub Actions for lint, unit, accessibility, visual regression, Lighthouse, link and HTML checks. |
| [`google-workspace`](packs/google-workspace) | 96 | 0 | Gmail, Calendar, Drive, Docs, Sheets, Slides, Meet, Chat, Forms and Tasks through the gws CLI. 96 skills: raw API skills, ready recipes (block focus time, share a folder, standup report) and role personas. |
| [`motion`](packs/motion) | 7 | 1 | Micro interactions and motion graphics. Case study bentos (fetchly-bento). Production CSS transitions, a motion token polish pass, UI effect libraries, generative p5.js art, Slack GIFs, screen videos, and the micro-interaction-designer agent. REFERENCE.md inlines every motion skill, including the Figma and Webflow plugin ones. |
| [`ops-automation`](packs/ops-automation) | 11 | 0 | Running the design team. Weekly design report from Pulse, morning brief, Discord reader, browser and computer use, MCP and skill builders, and memory import. Contains Lucas's personal skills too (ufabc-normalization): skip what you do not need. |
| [`research`](packs/research) | 9 | 0 | UX research from plan to readout. Briefs, screeners, discussion guides, transcript cleanup, insight tagging, affinity mapping, synthesis, stakeholder readouts, and deep web research. |
| [`webflow`](packs/webflow) | 13 | 0 | Building fetch.ly and client sites in Webflow. The full Finsweet Client-First method, the Webflow MCP knowledge base, preloaded Fetchly site, page and CMS IDs, code component research, and an API rate guard. |
| [`writing-docs`](packs/writing-docs) | 10 | 0 | Writing that reads like a person wrote it, and the files it ships in. Humanizer and generic language killer, prompt builder, doc co-authoring, internal comms, and Word, PowerPoint, Excel and PDF skills. |

## Brand tokens

`packs/fetchly-brand/tokens/` holds `fetchly-tokens.css` (custom properties with light and dark roles, falling back to the live fetch.ly Webflow variables) and `fetchly-tokens.json` (W3C design tokens). The source of truth is the Fetchly-GUIDES Figma file.

## Contributing

Add a skill under `packs/<pack>/skills/<name>/SKILL.md`, write one line in that pack's `pack.desc` if the scope changed, and open a PR. The rules are in `packs/github-standards`.

## Not included

- Plugin skills (Figma, Webflow, Interfaces, Caveman, Cloudflare and others) install through `--plugins`, not as copies, so they keep getting updates.
- The impeccable CLI binary (`scripts/bin`, 17 MB) is left out. Install impeccable from its source if you need live mode.
- Codex-only system skills.
