---
name: prompt-builder
description: Build a structured Claude prompt using the Task, Context Files, Reference, Success Brief, Rules, Conversation, Plan, and Alignment template. Use when the user types /prompt-builder, asks for help crafting a prompt, or wants to start a complex task with structured framing. Trigger keywords include "structured prompt", "help me write a prompt", "anatomy of a prompt", "prompt template", "prompt builder".
---

# Prompt Builder

Walk the user through the 8-section "Anatomy of a Claude Prompt" framework, then render a ready-to-use prompt. Templates can be saved and reused.

## When to invoke

Invoke this skill when:

- The user types `/prompt-builder`
- The user asks "help me write a prompt", "structured prompt", "prompt template", or similar
- The user references the Anatomy of a Claude Prompt image or framework

## Workflow

### Step 1: Check for saved templates

List files in `~/.claude/skills/prompt-builder/templates/`. If any exist, present them to the user via AskUserQuestion:

- Option: "Start fresh"
- One option per saved template (use the name and description from each template's frontmatter)

If the user picks a template, load its fields and use them as pre-filled defaults in Step 2. Show each field with the saved value, and let the user accept or override.

If no templates exist, skip directly to Step 2.

### Step 2: Gather inputs

Walk through these 7 input sections using AskUserQuestion. Keep each question focused. Batch only the four Success Brief fields together, since they belong to one section.

1. **Task and Success Criteria.** "What do you want to accomplish, and what does done look like?"
2. **Context Files.** "Any files I should read first? List paths with a one-line description each, or say 'none'."
3. **Reference material.** "Paste a reference example or describe what to mimic, or say 'skip'." If the user provides one, follow up: "What patterns from this should I follow? Give Always / Never rules, or say 'extract for me' to derive them from the reference."
4. **Success Brief.** Ask four fields in one question:
   - Output type and length (e.g., "1200-word blog post")
   - Recipient's reaction (what should they think, feel, or do?)
   - Does NOT sound like (e.g., "generic AI, jargon-heavy")
   - Success means (concrete outcome: "they sign", "they reply", "they ship the feature")
5. **Rules file path.** "Path to your standards or context file, or 'none'."
6. **Conversation mode.** "Should Claude ask clarifying questions first, or start immediately?"
7. **Plan mode.** "Should Claude list the top 3 rules and a 5-step plan before executing?"

If the user skips a section, omit it from the rendered prompt. Do not print empty placeholders.

### Step 3: Render the prompt

Output the assembled prompt as a single markdown fenced code block. Follow this skeleton, omitting any section the user skipped. Use the user's exact wording without rewriting.

```
I want to [TASK] so that [SUCCESS CRITERIA].
First, read these files completely before responding:

[file1]: [desc]
[file2]: [desc]

Here is a reference to what I want to achieve:

[reference text]

Here's what makes this reference work:

[rules extracted, formatted as "Always X" or "Never Y"]

Here's what I need for my version:

SUCCESS BRIEF
Type of output and length: [output_type]
Recipient's reaction: [recipient_reaction]
Does NOT sound like: [not_like]
Success means: [success]

My context file contains my standards, constraints, landmines, and audience. Read it fully before starting. If you're about to break one of my rules, stop and tell me.

DO NOT start executing yet. Instead, ask me clarifying questions (use the 'AskUserQuestion' tool) so we can refine the approach together step by step.

Before you write anything, list the 3 rules from my context file that matter most for this task.

Then give me your execution plan (5 steps maximum). Only begin work once we've aligned.
```

Conditional rules for rendering:

- Include the "DO NOT start executing yet" paragraph only if `conversation_mode` is on.
- Include the "list 3 rules" and "execution plan" paragraphs only if `plan_mode` is on.
- Include the "context file" paragraph only if a rules file was provided.
- Omit the "Context Files" block entirely if no files were given.
- Omit the "Reference" and "Here's what makes this reference work" blocks if reference was skipped.

### Step 4: Offer next actions

After rendering, ask the user via AskUserQuestion which path they want:

- **Run it now**: pivot from the wizard to acting on the assembled prompt as the new active task. Read any context files, follow the success brief, and apply the conversation and plan toggles as written.
- **Save as template**: store this configuration for reuse, then end.
- **Both**: save first, then run.
- **Done**: leave the rendered prompt visible for the user to copy.

### Step 5 (only if saving): Save the template

If the user picks "Save as template" or "Both":

1. Ask for a template name in kebab-case (e.g., "blog-post-brief").
2. Ask for a one-line description.
3. Check whether `~/.claude/skills/prompt-builder/templates/<name>.md` already exists. If it does, ask before overwriting.
4. Write the file with this format:

```yaml
---
name: <kebab-name>
description: <one-line>
created: <YYYY-MM-DD using today's date>
---

task: <task plus success criteria>

context_files:
  - path: <path>
    desc: <desc>

reference: |
  <reference text, or 'skip'>

reference_rules: |
  <Always/Never list, or 'skip'>

success_brief:
  output_type: <value>
  recipient_reaction: <value>
  not_like: <value>
  success: <value>

rules_file: <path, or 'none'>
conversation_mode: true
plan_mode: true
```

Confirm the save by showing the absolute path written.

### Step 6 (only if running): Execute

If the user picked "Run it now" or "Both", treat the rendered prompt as the active task:

1. If context files were specified, read them all first.
2. If a rules file was specified, read it fully.
3. If conversation_mode is on, ask clarifying questions before doing anything.
4. If plan_mode is on, list the top 3 rules from the rules file and a 5-step plan, then wait for the user to align.
5. Otherwise, proceed with the task as specified in the rendered prompt.

## Guidelines

- **Never auto-save.** Templates only save when the user explicitly picks "Save as template" or "Both".
- **Never overwrite a template silently.** If the chosen name already exists, ask first.
- **Use the user's exact wording.** Don't rewrite their inputs; only enforce the template structure.
- **Don't render empty fields.** Omit entire sections rather than printing "[skip]" or empty placeholders.
- **No em dashes or en dashes** in the rendered prompt or in any output. Use commas, periods, colons, or parentheses.
- **One focused question at a time.** Batch only the four Success Brief fields. Keep each question scannable.
- **Templates are plain markdown with YAML frontmatter.** No separate schema file. Claude reads them back directly on next invocation.

## Examples

### Example 1: Fresh build, no templates exist

User: `/prompt-builder`

Claude: "No saved templates yet. Let's build one from scratch. First question: what do you want to accomplish, and what does done look like?"

The wizard walks through all 7 sections, renders the assembled prompt, and offers next actions.

### Example 2: Reuse a saved template

User: `/prompt-builder`

Claude: "You have 2 saved templates: 'blog-post-brief' (long-form Webflow blog posts) and 'sales-email-brief' (cold outbound for Fetchly). Want to start fresh or use one?"

User picks 'blog-post-brief'. Claude shows each field with the saved value as default. User edits only the Task field, accepts the rest. Claude renders the final prompt and offers next actions.

### Example 3: Save without running

User builds a prompt for "weekly status report" and picks "Save as template" only. Claude writes `~/.claude/skills/prompt-builder/templates/weekly-status-report.md`, confirms the path, and ends.

### Example 4: Save and run

User builds a prompt for a Webflow site audit, picks "Both", and gives the template name "site-audit-brief". Claude saves the template, confirms the path, then pivots to running the rendered prompt (reads the context files, asks clarifying questions because conversation_mode is on, and proceeds).
