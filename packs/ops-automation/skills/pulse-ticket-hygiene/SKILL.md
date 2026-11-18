---
name: pulse-ticket-hygiene
description: Audits and tidies a person's or the design team's Pulse efforts. Finds efforts whose state and board disagree, efforts with no estimate or no sub-task, stale ones, vague names and empty descriptions, and work that is done in GitHub but still open in Pulse. Fixes what Pulse allows (state, board, sub-tasks, estimates) and comments where it doesn't (descriptions). Use when someone asks to "clean up my Pulse", "tidy the team's tickets", "check the board", or before the weekly design report.
---

# Pulse Ticket Hygiene

A sweep over open efforts that leaves the boards honest and every effort ready for time logs.

## Requirements

- Pulse MCP connected (`users_show`, `users_index`, `efforts_index`, `efforts_show`, `boards_index`, `effort_states_update`, `effort_positions_update`, `efforts_create`, `comments_create`)
- Optional: `gh` CLI, to check PR status for efforts that link a PR

## Scope

- Default: the signed in user. Get the UUID with `users_show id="me"` (`efforts_index` needs the UUID, not "me").
- "The team": the designers the user names, or ask for the list once. Resolve each with `users_index`.
- Pull `efforts_index user_id=<uuid> open: true`, every page.

## Checks

| Check | How to spot it | Fix |
|---|---|---|
| State and board disagree | state `done` on a non Done column, `review` on Icebox, a card in "Done" not in state done | Ask which is true when unclear. Otherwise move the board to match the state |
| PR merged, effort open | description or name links a PR; `gh pr view <url> --json state` says MERGED | state `done`, board Done, close open sub-tasks |
| PR closed unmerged | same, CLOSED without merge | comment, list for the user, no state change |
| No estimate | `estimated_hours` is `0:00` | list with a suggested estimate; set it only by creating the missing sub-task, since Pulse can't edit a parent's estimate here |
| No sub-task | no effort with this `parent_id` | create one with its own estimate |
| Stale | `working` or `review` with no movement in 14+ days (check `efforts_show` history or `updated_at`) | list it; ask whether to move it to blocked, icebox or done |
| Overdue | `overdue: true` | list with due date |
| Over budget | `over_budget: true` | list with logged vs estimate |
| Vague name | under four words, no area or page, or just a verb ("Fix", "Updates") | suggest a name in the project's pattern; rename only if the user agrees |
| Empty or unclear description | blank, or no "what" and "done when" | add a comment with a proposed description in the `pulse-request-intake` format |

## Steps

1. Pull the scope above. For each project involved, read `boards_index` once.
2. Run every check. Use `efforts_show` only on efforts that need detail.
3. Apply the safe fixes without asking: board matched to an unambiguous state, merged PRs closed, missing sub-tasks added.
4. Group everything else as questions for the user. Ask in one message, one line per effort, with your suggested action.
5. Apply the answers.
6. **Report.** Per person: fixed (what changed), waiting on them (question), and counts: open, done this run, still missing estimates.

## Rules

- Never change efforts on projects the user did not include.
- Never delete efforts. Icebox or blocked instead, and only with the user's yes.
- Never log time.
- State and board are separate in Pulse: set both, each with its own tool.
