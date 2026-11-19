# Laws of UX check

A GitHub Action that scores a pull request's UI changes against the 29 Laws of UX and fails when too many are broken. Use it in any Fetchly repo.

## How it scores

1. Diffs the PR and keeps UI files only: HTML, CSS/SCSS, Liquid, JSX/TSX, Vue, Svelte, Astro, JS/TS and theme JSON.
2. Claude (`claude-opus-5-5`) rates every law in [`laws-of-ux.json`](laws-of-ux.json) as pass, violated or not applicable, with a reason and `file:line` evidence per violation.
3. Score = violated ÷ applicable laws. Over the threshold (default `0.75`) the check fails. Exactly 75% passes.

A PR with no UI changes passes without an API call. If the checker errors (bad key, outage) the check fails, so nothing merges unchecked.

## Add it to a repo

1. Create a Console API key at console.anthropic.com, Settings, API Keys. It starts with `sk-ant-api03-`. Session tokens (`sk-ant-usr-`, `sk-ant-oat-`) do not work.
2. Copy the key, then set it as a secret without pasting:

```bash
pbpaste | tr -d '[:space:]' | gh secret set ANTHROPIC_API_KEY -R <owner>/<repo>
```

3. Add `.github/workflows/laws-of-ux.yml`:

```yaml
name: Laws of UX
on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
permissions:
  contents: read
  pull-requests: write
jobs:
  laws-of-ux:
    name: laws-of-ux
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: fetchly/design-team-collective-repo/actions/laws-of-ux@main
        with:
          anthropic-api-key: ${{ secrets.ANTHROPIC_API_KEY }}
          threshold: ${{ vars.UX_THRESHOLD || '0.75' }}
```

Optional: set a repo variable `UX_THRESHOLD`, or pass `screenshots: <folder>` after a step that captures previews (up to 10 images).

## Make it block merges

Open one PR so GitHub registers the `laws-of-ux` check. Then Settings, Branches (or Rules), require status check `laws-of-ux` on `main`. Private repos need GitHub Pro, Team or Enterprise for this; on a free plan the check goes red but the merge button stays active.

## Inputs

| Input | Default | Purpose |
|---|---|---|
| `anthropic-api-key` | required | Console API key |
| `threshold` | `0.75` | Fail when violated ÷ applicable is over this |
| `model` | `claude-opus-5-5` | Claude model |
| `screenshots` | empty | Folder of preview screenshots |
| `comment` | `true` | Post or update one summary comment |

Outputs: `ratio`, `blocked`.

## Tuning the rules

Edit `violation_heuristics` or `applies_when` in `laws-of-ux.json` and bump `version`. Each result records the rules version. Run the scoring tests with `node --test actions/laws-of-ux/score.test.mjs`.

## Cost

One Opus 5.5 call per PR push, usually well under $1. The rules prompt is cached.
