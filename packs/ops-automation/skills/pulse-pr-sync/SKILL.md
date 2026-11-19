---
name: pulse-pr-sync
description: Keeps Pulse efforts in step with GitHub pull requests. Creates an effort for any PR that has none, sets state and board from the PR (open = review, merged = done, closed unmerged = flagged), and adds the sub-task and hour estimate Pulse needs for time logs. Use when someone opens a PR, merges one, or asks to "sync my PRs with Pulse", "close the tickets for merged PRs", or "make sure every PR has a ticket", for themselves or for a designer on the team.
---

# Pulse PR Sync

Matches pull requests to Pulse efforts and fixes whatever is missing or out of date. Works for whoever runs it: "me" is the signed in GitHub and Pulse user. It can also run for a teammate by GitHub login.

## Requirements

- `gh` CLI signed in (`gh auth status`)
- Pulse MCP connected (`efforts_index`, `efforts_show`, `efforts_create`, `effort_states_update`, `effort_positions_update`, `boards_index`, `projects_index`, `repo_index`, `users_show`, `comments_create`)

If either is missing, stop and say which. Never guess.

## Pulse facts that bite

- **State and board are separate.** `effort_states_update` changes the state only; `effort_positions_update` changes the board (kanban column) only. Always set both.
- **Board names differ by project.** "Done", "Done (V2 Theme)", "PR Review", "Review". Read `boards_index` for the project and pick the board whose name matches the target state. If two boards fit (for example "Done (V2 Theme)" and "Archive (Old Theme)"), pick the one the project's recent efforts use; if still unclear, ask.
- **Descriptions can't be edited after creation.** Write them right on `efforts_create`. To correct one later, add a comment with `comments_create`.
- **`efforts_index` filters by user need the UUID.** Get it once with `users_show id="me"`. `efforts_create` accepts `assignee_id: "me"`.
- **Text search misses URLs.** `q` with a PR URL often returns nothing. Search by the PR title, then confirm with `efforts_show` that the description links the PR.

## Steps

1. **List PRs.** Default window is the last 21 days; use the user's window if given.
   ```bash
   gh search prs --author @me --created ">=YYYY-MM-DD" --limit 100 --json url,title,state,createdAt,closedAt
   gh search prs --author @me --merged --merged-at ">=YYYY-MM-DD" --limit 100 --json url,title,closedAt
   ```
   For a teammate, swap `@me` for their GitHub login. Get merge info per PR with `gh pr view <url> --json state,mergedAt,additions,deletions,body`.
2. **Find the project for each repo.** `repo_index q="<owner/repo>"`, then the project it is attached to. Otherwise use the project an existing effort for that repo already sits in, or `projects_index q=<client or repo name>`. Ambiguous or none: ask once, listing the candidates. Never pick one yourself.
3. **Match PRs to efforts.** Search the project with `efforts_index project_id=… q="<PR title words>"`, then the user's open efforts. Treat an effort as matched when its name mirrors the PR title or its description links the PR. Sub-tasks match their parent. Note any effort already linked that belongs to someone else, and leave it alone.
4. **Decide the target.**
   | PR | State | Board |
   |---|---|---|
   | open, draft | working | the project's Working column |
   | open, ready | review | the project's PR Review or Review column |
   | merged | done | the project's Done column |
   | closed, not merged | leave as is | leave, add a comment saying the PR closed without merging, and list it in the report |
5. **Create what is missing.** For a PR with no effort, `efforts_create`:
   - `name`: the PR title as written.
   - `description`: first line `PR: <url> (merged YYYY-MM-DD)` or `(opened YYYY-MM-DD)`, a blank line, then two or three plain sentences on what changed and why, taken from the PR body. No filler.
   - `assignee_id: "me"` (or the teammate's id), `current_state` and `board` from the table, `effort_type`: `defect` for fixes, `chore` for tooling, docs and CI, `design` for design work, `feature` otherwise.
   - `estimated_days`: hours / 8. Size from the diff and body: under 20 lines about 1h, under 100 about 2 to 4h, larger 4 to 8h. Err generous.
   - Then one sub-task with `parent_id`, same project, state and board, its own estimate (about half the parent), named for the concrete step ("Write sync rules and PR check workflow").
6. **Fix what drifted.** For matched efforts, set state and board when they differ from the table. Add a sub-task with an estimate when the parent has none. Mark open sub-tasks of a merged PR done too.
7. **Link back.** On PRs this run created an effort for that are still open, append `Pulse: <effort name>` to the PR body with `gh pr edit`. Do not touch merged PR bodies.
8. **Report.** A table per project: PR, effort, what changed (created, state x to y, board x to y, sub-task added), estimate. Then a list of PRs left alone and why (closed unmerged, owned by someone else, project unclear).

## Rules

- Changes are immediate and visible to the whole project team. Confirm the project when it is ambiguous.
- Never create a second effort for a PR that already has one.
- Never change efforts assigned only to other people unless the user asked for that person.
- Never log time. Estimates only; hours are the person's to log.
- Zero changes is a valid result. Say so in one line.
