# ops-automation

Running the design team. Weekly design report from Pulse, morning brief, end of day inbox triage (client leads to Pulse, internal follow-ups), Discord reader, browser and computer use, MCP and skill builders, and memory import. Contains Lucas's personal skills too (ufabc-normalization): skip what you do not need.

```bash
./install.sh ops-automation
./install.sh ops-automation --plugins   # also installs: caveman@caveman,token-optimizer@alexgreensh-token-optimizer,claude-mem@thedotmack,cloudflare@cloudflare
```

Schedule the two EOD skills as one weekday task (for example 17:30) with the prompt: `Run the eod-client-leads skill, then the eod-internal-followups skill. Send me the combined summary.` Both only read email; the only write is Pulse efforts for leads.

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
| `skill-creator` | Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an e |
| `ufabc-normalization` | Use this skill when the user is formatting academic works following UFABC Library System guidelines (Guia de Normalização 2026). Triggers on mentions of "ABNT |
| `weekly-design-report` | Rotina semanal (terça 09:00) do DESIGN REPORT da Fetchly. Lê a alocação da equipe de Design no Pulse, sinaliza alocações suspeitas, compara com o relatór |
