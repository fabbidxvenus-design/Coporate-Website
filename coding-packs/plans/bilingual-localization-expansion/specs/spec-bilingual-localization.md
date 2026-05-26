# SPEC: Bilingual Localization Expansion

## AC-01: Dictionary Parity
- Given: `lib/i18n/vi.json` and `lib/i18n/ja.json` exist
- When: dictionary key paths are recursively compared
- Then: both dictionaries expose the same nested key paths
- And: both files parse as valid JSON

## AC-02: Home Page Locale Coverage
- Given: a user visits `/vi` and `/ja`
- When: each page renders
- Then: public page body, section headings, CTA labels, and footer UI chrome match the active locale
- And: the Japanese route does not show Vietnamese-only static UI chrome outside brand/proper nouns

## AC-03: About Page Locale Coverage
- Given: a user visits `/vi/about` and `/ja/about`
- When: each page renders
- Then: the page body, labels, headings, CTAs, and footer UI text switch language consistently

## AC-04: Jobs Page Locale Coverage
- Given: a user visits `/vi/jobs` and `/ja/jobs`
- When: the jobs page renders
- Then: search/filter UI, job card action labels, empty/loading/error UI chrome, and footer UI text match the active locale

## AC-05: News Page Locale Coverage
- Given: a user visits `/vi/news` and `/ja/news`
- When: the news page renders
- Then: headings, list/card UI labels, empty/loading/error UI chrome, and CTA labels match the active locale

## AC-06: Apply and Contact Form Locale Coverage
- Given: a user visits `/vi/apply`, `/ja/apply`, `/vi/contact`, and `/ja/contact`
- When: forms render and validation is triggered
- Then: labels, placeholders, submit buttons, validation messages, success states, and error states match the active locale

## AC-07: Route-Preserving Language Switch
- Given: a user is on `/vi/jobs`
- When: they switch to Japanese through the header language control
- Then: the browser navigates to `/ja/jobs`
- And: the route does not reset to `/ja`

## AC-08: Footer Localization Without Regression
- Given: localized routes render the public footer
- When: a user visits `/vi` and `/ja`
- Then: footer labels and quick links match the active locale
- And: footer remains visually consistent with TIP-012
- And: no social control uses `href="#"`
