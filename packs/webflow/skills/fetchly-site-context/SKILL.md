---
name: fetchly-site-context
description: Preloaded Webflow site context for Fetchly (fetch.ly). Contains site ID, all page IDs, component IDs, CMS collection IDs, and class inventory. Load this skill in parallel with client-first and webflow-skills-knowledge-base to skip discovery API calls and jump straight into work.
---

# Fetchly Site Context — Preloaded Reference

> **Purpose:** Eliminate the initial "fetch site > list pages > list collections > list components" round-trips at the start of every Webflow conversation. All IDs and names are pre-cached here.
>
> **Last updated:** Pages + CMS collection IDs live-verified **2026-06-30** via Data API (`list_pages`). Components section last verified 2026-04-13 — re-verify with Designer connected before relying on component IDs.
>
> **Usage:** Load alongside `client-first` and `webflow-skills-knowledge-base`. Use these IDs directly in MCP tool calls — no need to call `list_sites`, `list_pages`, `get_all_components`, or `get_collection_list` unless verifying fresh data.

---

## Site

| Field | Value |
|---|---|
| **Site ID** | `67ffae2d1339b7cb15a88bb6` |
| **Display Name** | Fetchly |
| **Short Name** | staging-fetchly |
| **Workspace ID** | `67a10b37ecd5d47b651aa423` |
| **Staging URL** | staging-fetchly.design.webflow.com |
| **Custom Domains** | `fetch.ly`, `www.fetch.ly` |
| **Timezone** | America/Denver |
| **Primary Locale** | English (en) — ID: `68347a7d3064f12fdd863834` |
| **CMS Locale ID** | `68347a7d3064f12fdd863827` |

---

## Pages (36 total)

> Live-verified via Data API `list_pages` on **2026-06-30**. CMS collection IDs in the template table are embedded from the same call. Folder IDs: intake = `68c0759e8903c6daaadf8ca8`, arboards = `691dd7d9418dbb5e0faeaac9`.
>
> **Note:** the CLI session token (`~/.config/webflow/auth.json`) lacks `pages:read`, so REST `/v2/sites/:id/pages` returns 403. Use the MCP `data_pages_tool` (`list_pages`) for live page fetches.

### Live Static Pages

| Page | Slug | Page ID |
|---|---|---|
| **Home** | `/` | `689cac1cf85c1301d76dc84a` |
| **About** | `/about` | `691c9bb5ad24d253eafc31c7` |
| **Web** | `/web` | `6a39751fd54289c61ae23df4` |
| **Mobile** | `/mobile` | `6a3975108e927bfb3bb8159b` |
| **Web and Mobile** | `/web-and-mobile` | `6a26fb6e0a923dcc922eea89` |
| **eCommerce** | `/ecommerce` | `67ffaf4ed9f94735a253831c` |
| **Shopify** | `/shopify` | `6983f2ad3888bd5897689af1` |
| **Pricing** | `/pricing` | `6a10b4a79ffe93ee16c6012b` |
| **Case Studies** | `/case-studies` | `67ffb123120d5623cb47264a` |
| **Blog** | `/blog` | `69a5a4d721747dde1f3d2680` |
| **FAQ** | `/faq` | `69b459f3fc845ebca7baee6d` |
| **Sweepstakes** | `/sweepstakes` | `6a3d64fe161eb12ad8523617` |
| **Donal Duck, inc.** | `/donal-duck-inc` | `6a42b35f64b235f10ad41ce9` |
| **Privacy Policy** | `/privacy-policy` | `687fe3f516450b17a2d546ff` |
| **404** | `/404` | `67ffae2e1339b7cb15a88c35` |
| **Password** | `/401` | `67ffae2e1339b7cb15a88c34` |

### Intake Funnel Pages (folder: `/intake/`)

| Page | Slug | Page ID |
|---|---|---|
| Step 1 | `/intake/step-1` | `69e10af5ecbf3a307b9b0998` |
| Step 2 | `/intake/step-2` | `69e10affe730976667a09ba9` |
| Step 3 | `/intake/step-3` | `69e10b029e75154334be30da` |
| Shopify-Schedule | `/intake/shopify-schedule` | `699477d81e3eb12f1dd2da50` |

### CMS Template Pages

| Template | Slug Pattern | Page ID | Collection ID |
|---|---|---|---|
| Case-studies | `/post/[slug]` | `683a06cff9f722c5914d5d80` | `683a06cef9f722c5914d5d58` |
| Testimonials | `/testimonials/[slug]` | `68347a7e37fa16b9f74cdb14` | `68347a7e37fa16b9f74cdae8` |
| Post Categories | `/post-categories/[slug]` | `6880eb9cd23440c4b5bf61f6` | `6880eb9cd23440c4b5bf61d5` |
| Partner Logos | `/partnerlogos/[slug]` | `685b3cd7f27c0a42e0d54e97` | `685b3cd7f27c0a42e0d54e93` |
| Blog Posts | `/blog-posts/[slug]` | `69a5a45a0b6f1377d0fa91e5` | `69a5a45a0b6f1377d0fa91b9` |
| Authors | `/authors/[slug]` | `69a5a44ada5c4dad9b6dd3b6` | `69a5a449da5c4dad9b6dd3b0` |
| Categories | `/categories/[slug]` | `69a5a44406660d7bbf5ab2c2` | `69a5a44306660d7bbf5ab283` |
| Leadgen Pages | `/lead/[slug]` | `69a9d54a57a0a6407390e4af` | `69a9d54957a0a6407390e4a9` |
| Team Members | `/team-members/[slug]` | `69b849e4b304b081bea29c34` | `69b849e4b304b081bea29ba9` |
| Comparison Pages | `/compare/[slug]` | `69bc03422a245982a50e60aa` | `69bc03422a245982a50e60a4` |
| Comparison Feature Rows | `/comparison-feature-rows/[slug]` | `69bc0369fdcf5783c86daa1a` | `69bc0368fdcf5783c86da9e7` |
| Comparison Feature Blocks | `/comparison-feature-blocks/[slug]` | `69bc036942ab68813c47e9ad` | `69bc036942ab68813c47e9a7` |
| Docs | `/docs/[slug]` | `69cebc69cd1f787269d49c3d` | `69cebc68cd1f787269d49c37` |
| **FAQ** (new) | `/faq/[slug]` | `6a314e85137ab04c519d1d68` | `6a314e84137ab04c519d1d42` |

### Draft / Artboard Pages (folder: `/arboards/`)

| Page | Slug | Page ID |
|---|---|---|
| Style Guide (draft) | `/arboards/style-guide-…` | `67ffae2e1339b7cb15a88c36` |
| Artboard | `/arboards/artboard` | `6a2c2410da5ed5b78de01138` |

> **Removed since 2026-04-13** (no longer on the site, do not reuse these IDs): About Fetchly `/about-fetchly` (`691c9bb5…` was reused — that ID now resolves to **About** `/about`), prior About `69b2d9a1…`, Our Services `/services` + `/service/` template (**Services CMS collection deleted**), Our Model, SaaS Home, Team, Press, AI, Intake Request Form `/intake/request`, Intake Step 4/5 drafts, Home Copy, test-home-a, test-home-b, Ali_artboard, ARCHIVE, Basic, Contact Form. **Intake Step 1–3 page IDs all changed.** `/e-commerce` slug is now `/ecommerce`.

---

## Components (72 total — audited 2026-07-13)

> Live-verified 2026-07-13 via `data_localization_tool > list_components` + full usage audit (all pages scanned + native component internals + published code-island crawl). `readonly` in list_components = code/library component. 33 used, 39 unused. Full verdict in memory `project_fetchly-unused-components`.

### Used — core (on most pages)

| Component | ID | Kind |
|---|---|---|
| Global Styles | `ab488b17-f25a-fbf8-5f54-4a3955eb57e5` | native |
| Fetchly Navbar | `68d0821c-697c-b58d-f968-1c75ccc4efe1` | code |
| Fetchly Footer | `9301f41c-0205-859f-4ed7-ea13a48edc65` | code |
| Navbar_spacer | `3fc2f3e4-029b-7d1f-968e-4cba20b6d164` | native |
| Footer (old native; only on Team Members + Docs templates) | `dc8c2d86-fa05-b1af-befa-673f69f54676` | native |

### Used — sections/features

Code: Dashboard Showcase `3724f2d3`, Tech Stack Marquee `9f4b08f4`, Quote Builder `125770b4`, Pricing Plans `3e38801a`, Logo Marquee `e42ec6ab`, Curved Loop `2ef956cb`, Hero - Grow Brand `64dbf55c`, Testimonial Carousel `6638d117`, Our Work `4efc8df2`, Work List Item `70acae1a`, Fade Gallery `d2c4ca72`, Blog Index Layout `d3205823`, Blog Featured Post `0be53179`, Blog Post Row `538320a3`, Blog Post `31644a28`, Case Studies Index `193dc6c2`, Case Study Card `916c5096`, Case Study `1a7b43f1`, Product Buy Box `e1d136ca` (published only), Trust Strip `699d0082` (published only).
Native wrappers: logo-marquee-v2 `56117128`, Newsletter CTA `5ce888be`, featured-blog-post `680e8349`, Blog-Posts-List `bf809700`, Case Study Highlight `3a8a531e`, Case Studies Collection `a4f24fb4`, Our work list items `f733dbd4`, form `57a80f8c`.

### Unused (39 — libraries trimmed 2026-07-14; Designer deletes pending)

Natives (15): navbar_component `da58ea82` (holds only instances of Dropdown Menu Item / Hover Reveal Button / Mobile Nav List — delete first), Authors-List `eaf71bae` (holds only Blog Author Card instance), Black Wrapper, Timeline | Our Process, Stats | About Us, Comparison Table | Our Services, Testimonials (native) `d6d67e05`, Logo Banner Marquee, Blog item, Comparison_row, Hero `f622f9b4`, Avatar Group `46faeca8`, Testimonial Clean Card, Contact Form, Calendly Button.
Code (24): 18 were DETACHED 2026-07-14 by re-sharing trimmed libraries (pricing-page kept 4 used, blog kept 7 used, dropdown-menu kept Mobile Menu) — FAQ, FAQ Item, Pricing Hero, Testimonial Card, Testimonials 2 (renamed on detach), CTA, Hero 231, Calendly Popup, Calendly Inline, Button, Button Group, Dot Grid, Hover Reveal Button, Mobile Nav List, Dropdown Menu Item, Blog Index, Blog Author Card, Filter Bar are now editable local components, deletable in the Components panel. Still library-locked (6): ROI Calculator, Avatar Group (readonly), FAQ17, old Fetchly Navbar `f2221d6f`, CTA Section (Hero Header Library, source project gone) and World Cup Bolão (single-component library, dashboard delete).

---

## CMS Collections (14 total)

> Live-verified via Data API `get_collection_list` on **2026-06-30**. **Services collection was deleted** (was `68806e0ffe71d2ab1e6d20d1`, slug `service`); **FAQ collection is new**.

| Collection | Slug | Collection ID |
|---|---|---|
| **Case-studies** | `post` | `683a06cef9f722c5914d5d58` |
| **Testimonials** | `testimonials` | `68347a7e37fa16b9f74cdae8` |
| **Partner Logos** | `partnerlogos` | `685b3cd7f27c0a42e0d54e93` |
| **Post Categories** | `post-categories` | `6880eb9cd23440c4b5bf61d5` |
| **Categories** | `categories` | `69a5a44306660d7bbf5ab283` |
| **Authors** | `authors` | `69a5a449da5c4dad9b6dd3b0` |
| **Blog Posts** | `blog-posts` | `69a5a45a0b6f1377d0fa91b9` |
| **Leadgen Pages** | `lead` | `69a9d54957a0a6407390e4a9` |
| **Team Members** | `team-members` | `69b849e4b304b081bea29ba9` |
| **Comparison Pages** | `compare` | `69bc03422a245982a50e60a4` |
| **Comparison Feature Rows** | `comparison-feature-rows` | `69bc0368fdcf5783c86da9e7` |
| **Comparison Feature Blocks** | `comparison-feature-blocks` | `69bc036942ab68813c47e9a7` |
| **Docs** | `docs` | `69cebc68cd1f787269d49c37` |
| **FAQ** *(new)* | `faq` | `6a314e84137ab04c519d1d42` |

---

## Client-First Class Inventory

### Typography

**Heading tag defaults:** Heading 3, Heading 4, Heading 5, Heading 6, Heading 7, Heading 8
**Heading styles:** heading-style-h1, heading-style-h2, heading-style-h2-noanim, heading-style-h3, heading-style-h4, heading-style-h5, heading-style-h6, heading-style-display-1, heading-style-display-2, heading-style-h1-static
**Text sizes:** text-size-large, text-size-medium, text-size-regular, text-size-small, text-size-tiny, text-size-tinier, text-size-xtiny, text-size-xl, text-size-medium-static
**Text weights:** text-weight-xbold, text-weight-bold, text-weight-semibold, text-weight-medium, text-weight-normal, text-weight-light
**Text styles:** text-style-italic, text-style-strikethrough, text-style-allcaps, text-style-nowrap, text-style-quote, text-style-muted, text-style-link, text-style-2lines, text-style-3lines, text-style-tagline
**Text alignment:** text-align-left, text-align-center, text-align-right
**Text colors:** text-color-black, text-color-white, text-color-malibu, text-color-azure, text-color-red, text-color-yellow, text-color-green

### Spacing

**Section paddings:** padding-section-large, padding-section-medium, padding-section-small, padding-section-xsmall, padding-section-tiny
**Padding directional bases:** padding-top, padding-bottom, padding-left, padding-right
**Padding size combos:** padding-top-small, padding-top-xsmall, padding-top-xxsmall, padding-top-tiny, padding-bottom-small, padding-bottom-xsmall, padding-bottom-xxsmall, padding-bottom-tiny
**Margin directional bases:** margin-top, margin-bottom, margin-left, margin-right
**Margin size combos:** margin-top-xsmall, margin-top-xxsmall, margin-top-tiny, margin-top-auto, margin-bottom-xsmall, margin-bottom-xxsmall, margin-bottom-tiny
**Global:** padding-global, spacing-clean

### Layout

**Containers:** container-large, container-medium, container-small
**Max-width:** max-width-xxlarge, max-width-xlarge, max-width-large, max-width-medium, max-width-small, max-width-xsmall, max-width-xxsmall, max-width-full, max-width-full-tablet, max-width-full-mobile-landscape, max-width-full-mobile-portrait

### Background Colors

background-color-primary, background-color-dark, background-color-black

### Visibility

hide, hide-tablet, hide-mobile-landscape, hide-mobile-portrait

### Overflow & Display

overflow-hidden, overflow-scroll, overflow-auto, overflow-visible, display-inlineflex

### Advanced Utilities

z-index-1, z-index-2, align-center, layer, pointer-events-none, pointer-events-auto

### Aspect Ratios

aspect-ratio-square, aspect-ratio-portrait, aspect-ratio-landscape, aspect-ratio-widescreen

### Icon Sizing

**1x1:** icon-1x1-xxsmall, icon-1x1-xsmall, icon-1x1-small, icon-1x1-medium, icon-1x1-large, icon-1x1-xlarge, icon-1x1-xxlarge, icon-1x1-custom1
**Height:** icon-height-small, icon-height-medium, icon-height-large, icon-height-xlarge, icon-height-xsmall, icon-height-xxsmall, icon-height-custom1
**Embed:** icon-embed-small, icon-embed-medium, icon-embed-large, icon-embed-xlarge, icon-embed-xsmall, icon-embed-xxsmall, icon-embed-custom1

---

## Quick Reference for MCP Calls

```
# Skip discovery — use these directly:

Site ID:        67ffae2d1339b7cb15a88bb6
Home page:      689cac1cf85c1301d76dc84a
Style Guide:    67ffae2e1339b7cb15a88c36
Blog Posts:     69a5a45a0b6f1377d0fa91b9  (collection)
Case Studies:   683a06cef9f722c5914d5d58  (collection)
Team Members:   69b849e4b304b081bea29ba9  (collection)
Services:       68806e0ffe71d2ab1e6d20d1  (collection)
```

---

## Notes

- This data was captured on 2026-04-13. If pages/collections/components are added or removed, re-run the discovery to update this file.
- Classes listed here are base classes only. Combo class variants (is-* modifiers) exist for many of these but are context-dependent.
- The site uses **Finsweet Client-First** methodology. All class naming follows the Client-First convention.
