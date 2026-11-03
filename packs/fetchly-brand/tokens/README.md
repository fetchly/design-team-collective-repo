# Fetchly brand tokens

`fetchly-tokens.css` holds CSS custom properties with light and dark roles. `fetchly-tokens.json` holds the same values in W3C design token format, for Figma Tokens Studio or Style Dictionary.

## Rules

- **Type:** Marjorie for Display 1/2, H1, H2 and large body. Inter for H3 to H6, body and UI. Geist Mono only for the tagline and uppercase eyebrows.
- **Color:** 60-30-10. Neutrals carry 60, Malibu 30, accents 10. Spring Green is for graphic accents only. No vibrant body text.
- **Caps:** only taglines and eyebrows.
- **Voice:** direct, technically literate, quietly confident. Say "clients", not "partners". Use active voice. Back every claim with proof. Cut "robust", "seamless", "leverage".

## Webflow gotcha

On fetch.ly, the site's `neutral` (#3C3F41) and `neutral-dark` (#2B2F31) are dark grays, not the brand book's #E5E4DF and #505455. The CSS here uses brand book values for those two. Every other token falls back to the live site variable when the page runs inside Webflow.

Marjorie is a commercial font. Outside Webflow it falls back to Georgia. Load Inter and Geist Mono from Google Fonts.

The `fetchly-knowledge` skill in this pack has stale colors and fonts. These tokens win on any conflict.
