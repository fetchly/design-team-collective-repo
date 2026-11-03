# figma

Working in Figma through Claude. Writing to the canvas, design to code with 1:1 fidelity, Code Connect, design system rules, new files, and verified notes on Figma's agent features and their limits.

```bash
./install.sh figma
./install.sh figma --plugins   # also installs: figma@claude-plugins-official
```

## Skills

| Skill | What it does |
|---|---|
| `figma-agents-context` | Verified context for Figma's agent features on Lucas's account, checked live on 2026-09-24. Covers the Figma MCP tools that arrived with Config 2026 (generative |
| `figma-code-connect` | Creates and maintains Figma Code Connect template files that map Figma components to code snippets. Use when the user mentions Code Connect, Figma component map |
| `figma-create-design-system-rules` | Generates custom design system rules for the user's codebase. Use when user says "create design system rules", "generate rules for my project", "set up design r |
| `figma-create-new-file` | Create a new blank Figma file. Use when the user wants to create a new Figma design or FigJam file, or when you need a new file before calling use_figma. Handle |
| `figma-generate-design` | Use this skill alongside figma-use when the task involves translating an application page, view, or multi-section layout into Figma. Triggers: 'write to Figma', |
| `figma-implement-design` | Translates Figma designs into production-ready application code with 1:1 visual fidelity. Use when implementing UI code from Figma files, when user mentions "im |
| `figma-use` | **MANDATORY prerequisite** — you MUST invoke this skill BEFORE every `use_figma` tool call. NEVER call `use_figma` directly without loading this skill first.  |
