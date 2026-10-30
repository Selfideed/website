# SelfIDeed website: rules for building

Static website for selfideed.com. Plain HTML, CSS and JavaScript, no build step. Hosted on Nginx (see `nginx/selfideed.conf`).

## Sources of truth
- Design and copy rules: the SelfIDeed design system (https://claude.ai/artifact/FXpbCmn62Cs6qQCPLyNr6j).
- Decisions and sitemap: `claude/website-brief.md` in the claude.ai project "selfideed".
- Brand name is always **SelfIDeed**.

## Structure
```
index.html            language redirect fallback (Nginx does it on the server)
en/  nl/              one folder per language; same file names in each
  index.html          home (one scrolling page)
  about/index.html    About us
  contact/index.html  Contact
  legal/index.html    Terms, privacy, cookies (#terms, #privacy, #cookies)
  countries/index.html  Countries and photo sizes
assets/css/tokens.css design tokens (copy of the design system; add nothing that isn't in it)
assets/css/site.css   all site styles, mobile first
assets/js/layout.js   header, footer, language switch and the app URL (APP_URL), for all pages
assets/js/consent.js  EU cookie banner, Google Consent Mode v2, GA4 (GA_ID)
assets/fonts/         Inter and Inter Display (Latin subset)
assets/img/logo/      logo files from SelfIDeed-Logo.zip (padding trimmed)
```

## Every page
- `<html lang="en|nl">`, `<body data-path="about/">` (path inside the language folder; `""` for home).
- `<div id="site-header"></div>` first and `<div id="site-footer"></div>` last in `<body>`.
- In `<head>`: tokens.css, site.css, `consent.js` (not deferred), `layout.js` (deferred), favicons, canonical and hreflang links.
- Paths are relative (`../assets/...`), so the site works in any folder.
- An English page and its Dutch counterpart have the same file path. When you change one, change the other.

## Rules
- Mobile first. Breakpoints: 735px and 1069px. Content width 980px.
- Use only tokens from tokens.css for colour, spacing and radius.
- One primary (blue) button per section. Buttons to the app use `data-app-link`.
- Sections alternate `section` and `section section--alt`, no divider lines.
- Icons: 24px line icons, 1.5px stroke, rounded caps.
- Copy: sentence case, short sentences, no exclamation marks, no emoji, no promises the service can't keep.
- Grey placeholders (`.ph`) until real photos, screenshots and the video arrive. Mark each with an HTML comment `PLACEHOLDER`.
- Accessibility: visible focus ring, 44px touch targets, alt text, respects reduced motion.
- Light theme only for now. Dark tokens exist in tokens.css for later.
