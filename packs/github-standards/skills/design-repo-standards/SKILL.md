---
name: design-repo-standards
description: Fetchly design team rules for GitHub repos (branches, commits, PRs, reviews, secrets) and the test suite every web repo should carry (lint, unit, accessibility, visual regression, Lighthouse, links, HTML). Use when creating a repo, opening a PR, adding CI, setting up tests, or when the user asks "what checks should this repo have".
---

# Design repo standards

## Branches and commits

- `main` is always deployable. Protect it: require a PR, one approving review and passing checks. No force pushes.
- Branch names: `feat/<thing>`, `fix/<thing>`, `chore/<thing>`, `docs/<thing>`. Lowercase, hyphens.
- Commits: Conventional Commits (`feat: add toast motion`). One logical change per commit. The subject says what changed, the body says why.
- Never commit secrets, `.env`, client exports with personal data, or binaries over 10 MB. Use Git LFS for large design assets.

## Pull requests

- Keep them small: under 400 changed lines where possible.
- Fill in the template: what changed, why, screenshots or a short video for anything visual, and how you tested it.
- Visual changes need before and after screenshots at 375, 768 and 1440 px, in light and dark mode when the site has both.
- Link the Pulse effort in the PR body.
- The author merges after approval. Use squash merge so history stays readable.

## Reviews

- Review within one working day.
- Prefix comments: `blocking:`, `suggestion:`, `question:`, `nit:`. Only `blocking:` stops a merge.
- Check against the brand tokens (`packs/fetchly-brand/tokens`). A hardcoded hex that has a token is a `blocking:` comment.

## Tests every web repo should run

Copy what fits from `templates/.github/workflows/`. Start with the first four and add the rest once the repo has real pages.

| Check | Tool | Catches | Workflow |
|---|---|---|---|
| Lint and format | ESLint, Stylelint, Prettier | Style drift, unused code, invalid CSS | `lint.yml` |
| Unit and component | Vitest + Testing Library | Logic and component regressions | `test.yml` |
| Accessibility | Playwright + axe-core | WCAG 2.2 AA failures: contrast, labels, roles, focus | `a11y.yml` |
| Visual regression | Playwright screenshots | Unintended layout, color or type changes | `visual.yml` |
| Performance | Lighthouse CI | LCP, CLS, TBT and bundle weight past budget | `lighthouse.yml` |
| Links | lychee | Broken internal and external links | `links.yml` |
| HTML validity | html-validate | Invalid markup, duplicate IDs | `html.yml` |
| Reduced motion | Playwright with `reducedMotion: 'reduce'` | Animations that ignore the user setting | inside `a11y.yml` |
| Secrets | gitleaks | Keys and tokens committed by mistake | `secrets.yml` |

Budgets to start from: Lighthouse performance 90 or higher, accessibility 100, CLS under 0.1, LCP under 2.5 s on mobile.

## For Shopify, Webflow and Figma work

- **Shopify themes:** run `shopify theme check` in CI, and deploy previews to an unpublished theme, never the live one.
- **Webflow:** there is no repo CI. Run the `webflow-skills:safe-publish` and `accessibility-audit` skills before every publish.
- **Figma to code:** attach the Figma frame link to the PR, and compare the screenshots in `visual.yml` against it.
