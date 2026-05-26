# UI QC Report

## Verdict

FAIL

Weighted score: 75/100

## Inputs

- HTML design: `D:\WORKSPACE\CODE\Coporate_Website\.design\recruitment_site\tin_tuc_fabbi_final_precision\code.html`
- JSX/TSX implementation: `D:\WORKSPACE\CODE\Coporate_Website\app\(public)\news\page.tsx`
- Route: `http://localhost:3000/vi/news`
- Breakpoints checked: `1440`
- Browser verification: completed
- Computed style verification: completed
- Accessibility verification: manual basics completed; automated axe not run
- Artifacts: `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\jobs`

## Summary

- The live page renders without horizontal overflow and preserves the broad section model: header, title/search area, sidebar/content layout, articles, and footer.
- Major visual parity fails are caused by global theme drift: the design uses Plus Jakarta Sans, teal `#008B9C`, white background, and slate text; the implementation renders Manrope, pink `rgb(233, 30, 99)`, and a warm off-white page background.
- The search control is structurally and visually different from the design: exported HTML uses one 56px pill input with an absolutely positioned teal button, while the app uses a raised flex form with icon-leading input and static pink button.
- Sidebar content is similar, but semantics and active styling differ: the design uses an `aside` with a title and gray active category; the app uses a `div aria-label="Sidebar"` with an active pink all-news link.
- Content is data-dependent: the design shows 9 article cards and a notable-news section, while the rendered route currently shows 6 articles and omits the notable section when fewer than 6 trailing articles exist.

## Score breakdown

| Category | Score | Notes |
|---|---:|---|
| Structure parity | 3.5/5 | Core page sections exist, but sidebar is not semantic `aside`, notable section is conditional, and article count differs from the design snapshot. |
| Layout parity | 4/5 | Main max width, desktop two-column layout, article grids, sticky sidebar, and image aspect ratios mostly match. Search form layout differs materially. |
| Typography parity | 3/5 | H1/card sizes mostly match at 1440, but the font family is Manrope instead of Plus Jakarta Sans and live text line wrapping differs. |
| Color/effect parity | 2/5 | Primary teal system is replaced by pink accents; white body background is replaced by off-white; active sidebar and CTA states are different. |
| Spacing/sizing parity | 4/5 | Section padding, sidebar width, card gaps, and image sizes are close; search form height/shadow/padding differ. |
| Responsive parity | 3.5/5 | Only 1440 was requested/checked; static code suggests similar responsive grids, but search form and sidebar behavior may diverge at smaller widths. |
| Accessibility/semantics | 3.5/5 | Page renders with heading and named controls, but sidebar should be `aside`; one image-only article link was flagged without its own accessible text in the browser heuristic. |

## Hard gate results

| Gate | Result | Notes |
|---|---|---|
| Render | PASS | Route returned HTTP 200 and rendered in Chromium. One 404 resource appeared in console. |
| Structure | WARN | Major layout exists, but implementation lacks `aside` and conditionally omits design's notable section depending on data. |
| Layout | WARN | Search form composition does not match the exported design. |
| CSS | FAIL | Primary colors, font family, background, active sidebar, and search button styles do not match. |
| Responsive | WARN | No overflow at 1440; other breakpoints were not requested. |
| Accessibility | WARN | Manual basics pass, but semantic sidebar drift and one focusable-link naming heuristic need review. |

## Critical mismatches

- [FAIL] Global brand tokens do not match the HTML design.
  - Design: Plus Jakarta Sans, primary teal `#008B9C`, body background `#fff`, text `#1E293B`.
  - Implementation: Manrope, pink `rgb(233, 30, 99)`, body background `rgb(251, 249, 248)`, text `rgb(27, 28, 28)` / gray utilities.
  - Location: `app/(public)/news/page.tsx:234`, plus global theme/layout styles.
  - Suggested fix: Scope the news page to the exported design tokens or replace the relevant `text-pink`/`bg-pink`/global font usage with `text-teal-text`/`bg-[#008B9C]` and Plus Jakarta Sans for this surface.

- [FAIL] Search form structure and computed styling differ from the design.
  - Design: `.search-input-wrapper input` is a 56px rounded-full input with `padding-right: 120px`; `.search-btn` is absolutely positioned right/top/bottom and teal.
  - Implementation: `form` is a 62px rounded flex container with `shadow-lg`; input is transparent and the button is a static flex child with pink background.
  - Location: `app/(public)/news/page.tsx:166`, `app/(public)/news/page.tsx:168`, `app/(public)/news/page.tsx:184`.
  - Suggested fix: Remove the raised form-container styling and implement the design's relative wrapper + full-width pill input + absolutely positioned teal search button.

- [FAIL] Active sidebar styling uses the wrong visual role and color.
  - Design: sidebar title is an `h3`; active item is `Người Fabbi` with gray background, slate text, 16px/600.
  - Implementation: `Tin tức Fabbi` is rendered as an active link with pink background, white text, 18px/400.
  - Location: `app/(public)/news/page.tsx:257`, `app/(public)/news/page.tsx:259`, `app/(public)/news/page.tsx:272`.
  - Suggested fix: Render sidebar title as a heading, not the active all-news link, and match the design's gray active category styling unless product requirements require filter-all behavior.

## Visual mismatches

- [WARN] Live heading and copy differ from the exported design.
  - Design: H1 text is `Tin tức mới nhất về Fabbi`; intro copy is placeholder lorem text.
  - Implementation: H1 text is `Tin tức & Sự kiện`; intro copy is localized real content.
  - Location: `app/(public)/news/page.tsx:238`, `app/(public)/news/page.tsx:239`.
  - Suggested fix: Keep if intentional content localization is accepted; otherwise align strings with the design snapshot.

- [WARN] Notable news section is conditional and missing in the captured route state.
  - Design: `Tin tức chú ý` section is always shown with 4 horizontal articles.
  - Implementation: section renders only when `horizontalArticles.length > 0`; captured route had 6 articles total and no visible notable section equivalent to the design's 4-card block.
  - Location: `app/(public)/news/page.tsx:364`.
  - Suggested fix: If design parity is strict, render the notable section with a stable article source rather than coupling it to `paginatedArticles.slice(5)`.

- [WARN] Header/footer visual details differ from the design.
  - Design: header nav labels include `Home` and `Ứng tuyển`; footer is teal primary with exported quick links/social layout.
  - Implementation: live header text includes `Trang chủ` and `Liên hệ`; global branding appears from the app shell.
  - Location: app shell outside `app/(public)/news/page.tsx`.
  - Suggested fix: Decide whether the page should inherit the production shell or exactly match the exported static header/footer.

## Computed CSS mismatches

| Breakpoint | Section/Element | Property | Design | Implementation | Severity | Location |
|---:|---|---|---:|---:|---|---|
| 1440 | Body | font-family | `"Plus Jakarta Sans", sans-serif` | `Manrope, system-ui, sans-serif` | FAIL | `app/(public)/news/page.tsx:234` |
| 1440 | Body | background-color | `rgb(255, 255, 255)` | `rgb(251, 249, 248)` | WARN | global layout/theme |
| 1440 | Search button | background-color | `rgb(0, 139, 156)` | `rgb(233, 30, 99)` | FAIL | `app/(public)/news/page.tsx:184` |
| 1440 | Search button | position | `absolute` | `static` | FAIL | `app/(public)/news/page.tsx:168` |
| 1440 | Search form/input | box-shadow | input `shadow-sm` | form `shadow-lg` | WARN | `app/(public)/news/page.tsx:168` |
| 1440 | Active sidebar item | background-color | `rgb(243, 244, 246)` | `rgb(233, 30, 99)` | FAIL | `app/(public)/news/page.tsx:259` |
| 1440 | Active sidebar item | typography | `16px / 600` category link | `18px / 400` all-news link | WARN | `app/(public)/news/page.tsx:257` |

## CSS/token mismatches

| Section/Element | Property | Design | Implementation | Location |
|---|---|---:|---:|---|
| Page | Primary accent | `#008B9C` | pink utility | `app/(public)/news/page.tsx:76`, `app/(public)/news/page.tsx:184`, `app/(public)/news/page.tsx:259` |
| Page | Font | Plus Jakarta Sans | Manrope | global layout/theme |
| Search | Container shadow | input `shadow-sm` | wrapper `shadow-lg` | `app/(public)/news/page.tsx:168` |
| Sidebar | Active state | gray background, slate text | pink background, white text | `app/(public)/news/page.tsx:259` |

## Structure comparison

| Design section | Implementation status | Notes |
|---|---|---|
| Header | Partial | Present in app shell, but labels/theme differ from exported HTML. |
| Title/search | Partial | Section order and H1 scale match, but search structure and styling differ. |
| Sidebar | Partial | Same width/content family, but implemented as `div` and active title link differs from design. |
| Featured article | Match | Image aspect, title scale, metadata rhythm, and read-more location mostly match. |
| Article grid | Match | Two-column desktop grid and card rhythm mostly match. |
| Notable news | Partial | Implemented but conditional; absent in captured route state. |
| Footer | Partial | Present in app shell; exact exported footer parity not confirmed. |

## Responsive findings

| Breakpoint | Verdict | Findings |
|---:|---|---|
| 1440 | FAIL | Render succeeds with no horizontal overflow, but computed CSS token and search/sidebar visual mismatches fail parity. |

## Browser/screenshot findings

- Design screenshot: `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\jobs\screenshots\design-1440.png`
- App screenshot: `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\jobs\screenshots\app-1440.png`
- Browser metrics: `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\jobs\browser-metrics.json`
- Design metrics: `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\jobs\design-metrics.json`
- Console: one 404 resource error was recorded during app render.

## Accessibility/semantic findings

- The implementation uses `<div aria-label="Sidebar">` instead of the design's semantic `<aside>`.
- The browser heuristic flagged one focusable article image link without its own accessible text; because adjacent title text is a separate link, this may create a redundant or weakly named focus stop.
- No horizontal overflow was detected at 1440px.

## Artifacts generated

- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\jobs\qc-report.md`
- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\jobs\selector-map.json`
- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\jobs\computed-style-diff.json`
- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\jobs\visual-mismatches.json`
- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\jobs\browser-metrics.json`
- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\jobs\design-metrics.json`
- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\jobs\screenshots\design-1440.png`
- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\jobs\screenshots\app-1440.png`

## Recommended patch plan

1. Decide whether this page should obey the exported design tokens or the production app shell tokens; if exported design wins, scope Plus Jakarta Sans, white body surface, teal primary, and slate text to the news surface.
2. Rework `NewsSearchForm` to match the HTML design's `.search-input-wrapper`: relative wrapper, 56px full-width input, `padding-right: 120px`, absolutely positioned teal button.
3. Change the sidebar wrapper to semantic `aside`, render `Tin tức Fabbi` as a heading, and make active category styling gray/slate as in the design.
4. Decide whether notable news must always render like the design; if yes, source it independently from pagination rather than `paginatedArticles.slice(5)`.
5. Re-run `/qc-ui` at `375,768,1024,1440,1920` with computed styles and screenshots after fixes.
