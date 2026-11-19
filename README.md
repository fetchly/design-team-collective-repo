# Design Team Collective Repo

Fetchly design team's shared Claude Code setup: every skill and agent we use, sorted into packs, with Fetchly brand tokens and GitHub standards. Install only the packs you need.

## Install guides

Pick the guide that fits. Every route installs the same skills; restart Claude Code afterwards.

### 1. Inside Claude Code (easiest, auto updates)

Each pack is a Claude Code plugin. Run these in Claude Code:

```text
/plugin marketplace add fetchly/design-team-collective-repo
/plugin install motion@design-team-collective
```

Swap `motion` for any pack name below. Plugin skills are namespaced, so `stageshow` shows up as `motion:stageshow`. Get updates with `/plugin marketplace update design-team-collective`.

### 2. One line in the terminal (no clone)

```bash
curl -fsSL https://raw.githubusercontent.com/fetchly/design-team-collective-repo/main/install.sh | bash -s -- ui-designer
```

This downloads the repo to `~/.design-team-collective` and installs the bundle into `~/.claude`. Leave off `-s -- ui-designer` to pick from a menu.

### 3. From a clone (to contribute or pin a version)

```bash
gh repo clone fetchly/design-team-collective-repo && cd design-team-collective-repo
./install.sh
```

With no arguments it lists bundles and packs and asks what to install.

### Bundles by role

Not sure which packs you need? Install a bundle. `fetchly-brand` is in all of them because other packs assume its tokens.

| Bundle | Packs | For |
|---|---|---|
| `starter` | fetchly-brand, writing-docs | Anyone new to the team |
| `ui-designer` | fetchly-brand, design-ui, figma, motion | Product and interface design |
| `motion-designer` | fetchly-brand, motion, design-ui, figma | Case study bentos, faux UI demos, transitions |
| `webflow-dev` | fetchly-brand, webflow, figma, github-standards | Building fetch.ly and client sites |
| `researcher` | fetchly-brand, research, writing-docs | UX research and readouts |
| `design-lead` | fetchly-brand, ops-automation, google-workspace, writing-docs, research | Running the team, reports, inbox |

Bundles live in [`bundles.txt`](bundles.txt). Add a line there to make a new one.

### Keep it current or remove it

```bash
./install.sh update             # pull the latest repo, reinstall every pack you have
./install.sh uninstall motion   # remove only what the installer added for that pack
```

### Installer reference

| Command | Does |
|---|---|
| `./install.sh` | Menu: pick bundles or packs, optionally their plugins |
| `./install.sh list` | Shows every bundle and pack with its skill count |
| `./install.sh <bundle\|pack> [...]` | Copies the skills and agents into `~/.claude` |
| `./install.sh all` | Installs every pack |
| `./install.sh update` | Pulls the repo and reinstalls the packs recorded in `~/.claude/.dtc-packs` |
| `./install.sh uninstall <pack>` | Removes that pack's installed skills and agents |
| `--project <dir>` | Uses `<dir>/.claude` so the skills live with one repo |
| `--plugins` | Also installs the Claude Code plugins a pack depends on (Figma, Webflow, Interfaces) |
| `--templates <dir>` | Copies CI workflows, Playwright tests and the PR template into a repo |

The installer never overwrites a skill you already had. It only replaces or removes copies it installed, which carry a `.dtc-installed` marker.

### Troubleshooting

- **Skills don't show up:** restart Claude Code, then check `~/.claude/skills/<name>/SKILL.md` exists.
- **"skip X: you already have your own copy":** you installed that skill another way. Delete your copy if you want the collective's version.
- **Plugin step says `claude CLI not found`:** run the printed `/plugin` commands inside Claude Code instead.
- **Same skill twice (plugin and copy):** pick one route. Remove the copy with `./install.sh uninstall <pack>`.

## Packs

| Pack | Skills | Agents | What it's for |
|---|---|---|---|
| [`design-ui`](packs/design-ui) | 11 | 4 | Interface craft from first sketch to finished build. Impeccable (shape, critique, audit, polish, animate) with its four review and documentation agents, plus the better-* rule sets for accessibility, color, layout, type, UI and UX writing. |
| [`fetchly-brand`](packs/fetchly-brand) | 4 | 0 | Everything that makes work look and sound like Fetchly. Brand tokens (CSS and W3C JSON), color and type rules, the case cover generator, and theme tooling. Install this pack first: other packs assume these tokens. |
| [`figma`](packs/figma) | 7 | 0 | Working in Figma through Claude. Writing to the canvas, design to code with 1:1 fidelity, Code Connect, design system rules, new files, and verified notes on Figma's agent features and their limits. |
| [`github-standards`](packs/github-standards) | 2 | 0 | Rules and test templates for design team repos. A CLAUDE.md rule set for branches, commits, PRs and reviews, plus copy-ready GitHub Actions for lint, unit, accessibility, visual regression, Lighthouse, link and HTML checks. |
| [`google-workspace`](packs/google-workspace) | 96 | 0 | Gmail, Calendar, Drive, Docs, Sheets, Slides, Meet, Chat, Forms and Tasks through the gws CLI. 96 skills: raw API skills, ready recipes (block focus time, share a folder, standup report) and role personas. |
| [`motion`](packs/motion) | 7 | 1 | Micro interactions and motion graphics. Case study bentos (fetchly-bento). Production CSS transitions, a motion token polish pass, UI effect libraries, generative p5.js art, Slack GIFs, screen videos, and the micro-interaction-designer agent. REFERENCE.md inlines every motion skill, including the Figma and Webflow plugin ones. |
| [`ops-automation`](packs/ops-automation) | 16 | 1 | Running the design team. Pulse ticket management (designer requests to efforts, PR sync, board hygiene) with the pulse-ticket-manager agent, weekly design report from Pulse, morning brief, end of day inbox triage (client leads to Pulse, internal follow-ups), Discord reader, browser and computer use, MCP and skill builders, and memory import. Contains Lucas's personal skills too (ufabc-normalization): skip what you do not need. |
| [`research`](packs/research) | 9 | 0 | UX research from plan to readout. Briefs, screeners, discussion guides, transcript cleanup, insight tagging, affinity mapping, synthesis, stakeholder readouts, and deep web research. |
| [`webflow`](packs/webflow) | 13 | 0 | Building fetch.ly and client sites in Webflow. The full Finsweet Client-First method, the Webflow MCP knowledge base, preloaded Fetchly site, page and CMS IDs, code component research, and an API rate guard. |
| [`writing-docs`](packs/writing-docs) | 10 | 0 | Writing that reads like a person wrote it, and the files it ships in. Humanizer and generic language killer, prompt builder, doc co-authoring, internal comms, and Word, PowerPoint, Excel and PDF skills. |

## Laws of UX PR check

A GitHub Action that scores a PR's UI changes against the 29 Laws of UX with Claude and fails when more than 75% of the applicable laws are broken. Setup in [`actions/laws-of-ux`](actions/laws-of-ux/README.md).

```yaml
- uses: fetchly/design-team-collective-repo/actions/laws-of-ux@main
  with:
    anthropic-api-key: ${{ secrets.ANTHROPIC_API_KEY }}
```

## Showcase

[`showcase/`](showcase) holds finished work made with these packs, one folder per client: Armada Power motion and bento studies, and the Spyderco V2 visuals bento. Open any `index.html` in a browser.

## Brand tokens

`packs/fetchly-brand/tokens/` holds `fetchly-tokens.css` (custom properties with light and dark roles, falling back to the live fetch.ly Webflow variables) and `fetchly-tokens.json` (W3C design tokens). The source of truth is the Fetchly-GUIDES Figma file.

## Contributing

Add a skill under `packs/<pack>/skills/<name>/SKILL.md`, write one line in that pack's `pack.desc` if the scope changed, and open a PR. The rules are in `packs/github-standards`.

## Not included

- Plugin skills (Figma, Webflow, Interfaces, Caveman, Cloudflare and others) install through `--plugins`, not as copies, so they keep getting updates.
- The impeccable CLI binary (`scripts/bin`, 17 MB) is left out. Install impeccable from its source if you need live mode.
- Codex-only system skills.
