# github-standards

Rules and test templates for design team repos. A CLAUDE.md rule set for branches, commits, PRs and reviews, plus copy-ready GitHub Actions for lint, unit, accessibility, visual regression, Lighthouse, link and HTML checks.

```bash
./install.sh github-standards
```

## Skills

| Skill | What it does |
|---|---|
| `pr-before-after` | Every visual PR carries before and after screenshots: capture script (Playwright), upload to a `pr-assets` branch, the PR body table, and a workflow that fails visual PRs without images. |
| `design-repo-standards` | Fetchly design team rules for GitHub repos (branches, commits, PRs, reviews, secrets) and the test suite every web repo should carry (lint, unit, accessibility, |

## Templates

Copy into a repo with `./install.sh github-standards --templates <repo-path>`. Includes 9 workflows (one is `pr-screenshots.yml`), Playwright a11y and visual specs, `lighthouserc.json`, a PR template and CODEOWNERS.
