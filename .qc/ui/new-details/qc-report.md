# UI QC Report

## Verdict

FAIL

Weighted score: 62/100

## Inputs

- HTML design: `D:\WORKSPACE\CODE\Coporate_Website\.design\recruitment_site\tin_tuc_chi_tiet_fabbi_final_precision\code.html`
- JSX/TSX implementation: `D:\WORKSPACE\CODE\Coporate_Website\app\(public)\news\[slug]\page.tsx`
- Route: `http://localhost:3000/vi/news/fabbi-dat-giai-thuong-sao-khue-2024`
- Breakpoints checked: `1440`
- Browser verification: completed
- Computed style verification: completed
- Accessibility verification: manual basics completed; automated axe not run
- Artifacts: `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\new-details`

## Summary

- The detail route renders successfully with no horizontal overflow and no runtime console errors.
- The broad article-detail skeleton exists: header, breadcrumb, title, meta row, hero image, body, view count, and footer.
- Major parity fails are visible in page width, feature image treatment, body structure, and global tokens.
- The design uses a 928px article column with 256px side padding and a full-width 1440x520 square-corner hero image; the implementation uses a narrower 768px centered content column and a 1200px rounded 16:9 image.
- The implementation adds production CMS behavior that diverges from the static design: excerpt callout, sanitized body content, tags/related articles, live author/date/read-time, and production shell styling.

## Score breakdown

| Category | Score | Notes |
|---|---:|---|
| Structure parity | 3/5 | Core article-detail regions exist, but design body sections/inline image/blockquote are not structurally matched, and related articles are extra. |
| Layout parity | 2.5/5 | Header/meta order matches, but article width and hero image layout materially differ from the 1440px design. |
| Typography parity | 3/5 | H1 size/line-height matches, but font family differs and body heading hierarchy does not match the design content structure. |
| Color/effect parity | 2/5 | Teal/Plus Jakarta/white design system is replaced by production Manrope/off-white shell; blockquote/callout border color and background differ. |
| Spacing/sizing parity | 2.5/5 | Vertical rhythm around breadcrumb/title/meta is close, but content width, image size, body top position, and article padding differ significantly. |
| Responsive parity | 2.5/5 | Only 1440 was requested/checked; desktop already has major layout drift, so responsive parity cannot pass. |
| Accessibility/semantics | 4/5 | Main semantic regions and named focusables are acceptable in the app capture; no unnamed focusables were found. |

## Hard gate results

| Gate | Result | Notes |
|---|---|---|
| Render | PASS | Route returned HTTP 200 and rendered in Chromium. |
| Structure | FAIL | Design article body content model is not implemented: Introduction/inline image/blockquote/Conclusion are replaced by CMS content and related cards. |
| Layout | FAIL | Hero image and content column dimensions materially change the design composition. |
| CSS | FAIL | Primary font/background/color tokens and blockquote/callout styling do not match. |
| Responsive | WARN | No overflow at 1440; other breakpoints were not requested. |
| Accessibility | PASS | Manual basics passed at 1440; app had no focusable controls without accessible names in the heuristic scan. |

## Critical mismatches

- [FAIL] Article content column is too narrow and positioned differently.
  - Design: breadcrumb/title/meta and article body use a 928px content region, positioned with `px-[256px]` inside a 1440px main container.
  - Implementation: content is centered in `max-w-[800px] mx-auto px-4`, producing a 768px content width at 1440.
  - Location: `app/(public)/news/[slug]/page.tsx:63`, `app/(public)/news/[slug]/page.tsx:108`.
  - Suggested fix: Match the design container with `max-w-[1440px] mx-auto` and desktop `px-[256px]`, while keeping responsive mobile padding for smaller screens.

- [FAIL] Feature image composition differs materially.
  - Design: full-width image block `w-full h-[520px] mb-12`, square corners, spans 1440px at desktop.
  - Implementation: `max-w-[1200px] mx-auto px-4`, `aspect-video`, image has `rounded-2xl`, captured around 1200px wide and much taller top-to-body flow differs.
  - Location: `app/(public)/news/[slug]/page.tsx:89`, `app/(public)/news/[slug]/page.tsx:96`.
  - Suggested fix: Use the design's `w-full h-[520px] mb-12` hero block and remove desktop rounding if exact parity is required.

- [FAIL] Article body structure does not match the exported design.
  - Design: article body starts with `Introduction` H2, two paragraphs, inline image + caption, H3 body heading, paragraph, blockquote, more paragraph, `Conclusion` H2, and view count.
  - Implementation: body starts with a dynamic excerpt callout, then sanitized CMS HTML; captured page has no visible design-matching Introduction/Conclusion structure and adds related cards later.
  - Location: `app/(public)/news/[slug]/page.tsx:109`, `app/(public)/news/[slug]/page.tsx:115`, `app/(public)/news/[slug]/page.tsx:138`.
  - Suggested fix: If the CMS content is intended, align the CMS renderer's typography and content primitives to the design; if pixel parity is required, render the exported article sections explicitly or seed CMS content with the same structure.

- [FAIL] Blockquote/callout treatment is different.
  - Design: `blockquote` has background `#fdfaf8`, left border `#fecaca`, 24px left padding, 8px vertical padding, and nested italic 20px paragraph.
  - Implementation: excerpt callout is a paragraph with transparent background, teal `#006672` border, 20px/32.5px text, and no blockquote element.
  - Location: `app/(public)/news/[slug]/page.tsx:110`.
  - Suggested fix: Move excerpt styling out of the blockquote role or style actual `blockquote` nodes from sanitized content to match `.blockquote-left-border`.

- [FAIL] Global design tokens do not match.
  - Design: Plus Jakarta Sans, body `#fff`, text `#1D242A`, primary teal `#008b9c`.
  - Implementation: Manrope, body `rgb(251, 249, 248)`, production gray text and teal/pink mixed interactions.
  - Location: `app/(public)/news/[slug]/page.tsx:62`, plus global layout/theme.
  - Suggested fix: Scope the detail page to the exported news design tokens or update global shell tokens if this design is meant to replace the production theme.

## Visual mismatches

- [WARN] Live content differs from static placeholder content.
  - Design: placeholder title, `Admin`, `11 Jan 2022`, `5 min read`, lorem article copy, `11 Lượt xem`.
  - Implementation: real title, `Ban Truyền thông`, `15 thg 4, 2024`, `1 phút đọc`, real article content, `Lượt xem: 0`.
  - Location: `app/(public)/news/[slug]/page.tsx:72`, `app/(public)/news/[slug]/page.tsx:81`, `app/(public)/news/[slug]/page.tsx:130`.
  - Suggested fix: Treat content as acceptable if CMS realism is intended; otherwise use design fixture content for visual parity tests.

- [WARN] Related articles are present in implementation but absent from design.
  - Design: page ends after article view count and footer.
  - Implementation: renders `Bài viết liên quan` and three related article cards before footer.
  - Location: `app/(public)/news/[slug]/page.tsx:138`.
  - Suggested fix: Remove, hide, or design-match this section depending on product requirements.

- [WARN] Header/footer are inherited from production shell.
  - Design: exported shell uses Plus Jakarta Sans and teal primary with labels `Home`, `Ứng tuyển`.
  - Implementation: production shell uses Manrope and localized nav labels including `Trang chủ`, `Liên hệ`.
  - Location: app shell outside `app/(public)/news/[slug]/page.tsx`.
  - Suggested fix: Decide whether shell parity is in scope; if yes, audit and align the shared public layout.

## Computed CSS mismatches

| Breakpoint | Section/Element | Property | Design | Implementation | Severity | Location |
|---:|---|---|---:|---:|---|---|
| 1440 | Body | font-family | `"Plus Jakarta Sans", sans-serif` | `Manrope, system-ui, sans-serif` | FAIL | `app/(public)/news/[slug]/page.tsx:62` |
| 1440 | Body | background-color | `rgb(255, 255, 255)` | `rgb(251, 249, 248)` | WARN | global layout/theme |
| 1440 | Breadcrumb/title/meta | width/left | `928px`, left `256px` | `768px`, left `336px` | FAIL | `app/(public)/news/[slug]/page.tsx:63` |
| 1440 | H1 | height | `48px` reference single line | `96px` live two-line title | WARN | `app/(public)/news/[slug]/page.tsx:72` |
| 1440 | Feature image | size/radius | `1440px x 520px`, square | `1200px max`, 16:9, rounded | FAIL | `app/(public)/news/[slug]/page.tsx:89` |
| 1440 | Article body | content width | `928px` | `768px` | FAIL | `app/(public)/news/[slug]/page.tsx:108` |
| 1440 | First body content | role/type | `H2 Introduction` 32px | excerpt callout 20px | FAIL | `app/(public)/news/[slug]/page.tsx:109` |
| 1440 | Blockquote/callout | border/background | `#fecaca`, `#fdfaf8` | `#006672`, transparent | FAIL | `app/(public)/news/[slug]/page.tsx:110` |
| 1440 | Related section | presence | absent | present | WARN | `app/(public)/news/[slug]/page.tsx:138` |

## CSS/token mismatches

| Section/Element | Property | Design | Implementation | Location |
|---|---|---:|---:|---|
| Page | Font | Plus Jakarta Sans | Manrope | global layout/theme |
| Page | Background | `#fff` | warm off-white | global layout/theme |
| Article header/body | Desktop content width | `928px` | `768px` | `app/(public)/news/[slug]/page.tsx:63`, `app/(public)/news/[slug]/page.tsx:108` |
| Hero image | Width/height/radius | `1440px / 520px / 0px` | `1200px / aspect-video / 16px` | `app/(public)/news/[slug]/page.tsx:89` |
| Blockquote | Left border/background | `#fecaca` / `#fdfaf8` | `#006672` / transparent | `app/(public)/news/[slug]/page.tsx:110` |

## Structure comparison

| Design section | Implementation status | Notes |
|---|---|---|
| Header | Partial | Present, but production shell styling/content differs. |
| Breadcrumb | Match | Same role/order; width and theme differ. |
| Article title | Partial | Same size/weight/line-height, but live text wraps to two lines due narrower column and real content. |
| Meta row | Partial | Same layout concept; avatar is generated initial instead of image and content differs. |
| Feature image | Partial | Present, but width, height model, and radius differ. |
| Article body | Partial | Main body exists, but design section structure is not reproduced. |
| Inline image/caption | Missing/Unknown | Design has inline image and caption; captured implementation content did not expose equivalent static structure. |
| Blockquote | Partial | Implementation has excerpt callout, not design blockquote. |
| View count | Partial | Present, but text/order differs (`Lượt xem: 0` vs `11 Lượt xem`). |
| Related articles | Extra | Present in implementation, absent in design. |
| Footer | Partial | Present, but production shell styling/content differs. |

## Responsive findings

| Breakpoint | Verdict | Findings |
|---:|---|---|
| 1440 | FAIL | No overflow and route renders, but desktop content width, hero image composition, body structure, and tokens fail parity. |

## Browser/screenshot findings

- Design screenshot: `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\new-details\screenshots\design-1440.png`
- App screenshot: `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\new-details\screenshots\app-1440.png`
- Browser metrics: `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\new-details\app-metrics.json`
- Design metrics: `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\new-details\design-metrics.json`
- App console: no runtime error; only React DevTools info message.
- Design console: Tailwind CDN production warning from the static export.

## Accessibility/semantic findings

- App route has no focusable elements without accessible names in the heuristic scan.
- Header, main article region, breadcrumb, and footer are present.
- The design reference itself has unnamed icon-only footer social links and mobile menu button; the app shell appears better on this heuristic.
- If strict semantics are required, avoid using the excerpt paragraph as a blockquote substitute; render actual `blockquote` content when the article body includes a quote.

## Artifacts generated

- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\new-details\qc-report.md`
- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\new-details\selector-map.json`
- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\new-details\computed-style-diff.json`
- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\new-details\visual-mismatches.json`
- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\new-details\app-metrics.json`
- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\new-details\design-metrics.json`
- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\new-details\screenshots\design-1440.png`
- `D:\WORKSPACE\CODE\Coporate_Website\.qc\ui\new-details\screenshots\app-1440.png`

## Recommended patch plan

1. Align desktop containers first: use the design's `max-w-[1440px]` main surface and `px-[256px]` desktop article header/body column, with responsive fallbacks for smaller breakpoints.
2. Match the hero image block: full-width `h-[520px]`, no rounded corners at desktop, and same spacing before article body.
3. Decide whether CMS content or static design structure is the source of truth; if CMS wins, style sanitized `h2`, `h3`, `p`, `figure`, `figcaption`, and `blockquote` to match the exported primitives.
4. Replace the excerpt callout styling with the design blockquote styling or remove it from the visual parity path.
5. Remove/hide the related articles section for strict design parity, or add it to the design reference before treating it as acceptable.
6. Re-run QC at `375,768,1024,1440,1920` with screenshots and computed styles after fixes.
