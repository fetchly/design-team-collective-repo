# ops-automation

Running the design team. Pulse ticket management (designer requests to efforts, PR sync, board hygiene) with the pulse-ticket-manager agent, weekly design report from Pulse, morning brief, end of day inbox triage (client leads to Pulse, internal follow-ups), Discord reader, browser and computer use, MCP and skill builders, and memory import. Contains Lucas's personal skills too (ufabc-normalization): skip what you do not need.

```bash
./install.sh ops-automation
./install.sh ops-automation --plugins   # also installs: caveman@caveman,token-optimizer@alexgreensh-token-optimizer,claude-mem@thedotmack,cloudflare@cloudflare
```

Schedule the two EOD skills as one weekday task (for example 17:30) with the prompt: `Run the eod-client-leads skill, then the eod-internal-followups skill. Send me the combined summary.` Both only read email; the only write is Pulse efforts for leads.

Or in Claude Code: `/plugin marketplace add fetchly/design-team-collective-repo` then `/plugin install ops-automation@design-team-collective`.

## Pulse tickets

Three skills and one agent keep Pulse true to the work. Say "sync my PRs with Pulse", "make a ticket for this request" or "clean up my Pulse", or hand the whole job to the agent: "use pulse-ticket-manager to do a full sweep for me, Ana and Bruno". A weekly routine works well, for example Monday 09:00 with the prompt `Use the pulse-ticket-manager agent for a full sweep of my efforts and my merged PRs from the last 7 days.`

Pulse limits the skills work around: state and board are separate fields (both get set), and descriptions can only be written at creation (corrections go in a comment).

## Skills

| Skill | What it does |
|---|---|
| `built-in-browser` | Read this skill before the first step that uses the built-in browser, the browser pane inside the Claude desktop app (also called the in-app browser, the browse |
| `chrome-browser` | Read this skill before the first step that uses Claude in Chrome, the browser extension whose tools are named mcp__claude-in-chrome__* (also called Chrome, the  |
| `computer-use` | Read this skill before the first step of any request to do something in an app on the person's own computer (Notes, Finder, System Settings, any desktop app), t |
| `discord-get-messages` | Retrieve messages from Discord channels via the Discord API. Use this skill when the user wants to read, search, or analyze messages from a Discord channel. |
| `eod-client-leads` | End of day sweep of client email: picks real leads and creates a Pulse effort for each. Needs Gmail and Pulse MCPs. |
| `eod-internal-followups` | End of day list of colleagues whose email you have not answered. Needs Gmail MCP. |
| `import-memory` | Import a memory export from another AI assistant into Claude's memory — conversationally, additively, and with the content treated as data. |
| `learn` | Use this skill when the user wants intellectual understanding — learning how or why something works, not getting a task done or soliciting Claude's judgment. |
| `mcp-builder` | Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when b |
| `morning` | Render the user's morning brief as a styled HTML artifact, or set it up as a recurring weekday task. Use only when the user explicitly asks to run, see, or set  |
| `pulse-pr-sync` | Matches your GitHub PRs to Pulse efforts: creates missing ones, sets state and board (open = review, merged = done), adds sub-tasks and estimates. Needs Pulse MCP and `gh`. |
| `pulse-request-intake` | Turns a designer's or client's request (text, Slack, email, Figma comment, notes) into a clear Pulse effort with board, type, estimate, description and sub-tasks. Needs Pulse MCP. |
| `pulse-ticket-hygiene` | Audits open efforts for you or the team: state and board mismatches, merged PRs still open, missing estimates or sub-tasks, stale and vague tickets. Fixes what it safely can, asks about the rest. Needs Pulse MCP. |
| `skill-creator` | Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an e |
| `ufabc-normalization` | Use this skill when the user is formatting academic works following UFABC Library System guidelines (Guia de Normalização 2026). Triggers on mentions of "ABNT |
| `weekly-design-report` | Rotina semanal (terça 09:00) do DESIGN REPORT da Fetchly. Lê a alocação da equipe de Design no Pulse, sinaliza alocações suspeitas, compara com o relatór |

## Agents

- `pulse-ticket-manager`: Runs the three Pulse skills as one job (intake, PR sync, hygiene) and reports what it created, moved and still needs from you.
