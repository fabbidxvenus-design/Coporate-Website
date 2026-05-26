# UI QC Report

## Verdict

FAIL

Weighted score: 58/100

## Inputs

- HTML design: `D:\WORKSPACE\CODE\Coporate_Website\.design\recruitment_site\tim_kiem_cong_viec_fabbi_final_precision\code.html`
- JSX/TSX implementation: `D:\WORKSPACE\CODE\Coporate_Website\app\[locale]\ung_tuyen\page.tsx`
- Actual rendered route implementation: `app/[locale]/jobs/page.tsx` → `app/(public)/jobs/page.tsx`
- Route: `http://localhost:3000/vi/jobs`
- Breakpoints checked: `1440`
- Browser verification: completed
- Computed style verification: completed
- Accessibility verification: completed
- Artifacts: `.qc/ui/jobs`

## Summary

- `/vi/jobs` renders successfully with no horizontal overflow, and the broad header/hero/search/list/sidebar/footer structure is present.
- The provided JSX path is not the jobs implementation: `app/[locale]/ung_tuyen/page.tsx` only redirects to `/${locale}/apply`.
- The actual rendered jobs page differs materially from the HTML reference: dark photo hero instead of light teal illustrated hero, pink accents instead of teal, link filters instead of checkbox filters, compact cards instead of the reference cards.
- Major reference sections are missing after listings: `Chuyên mục ảnh`, `Tìm kiếm công việc theo Location`, and the floating bell.
- Axe found serious `color-contrast` and `link-name` violations on the rendered route.

## Score breakdown

| Category | Score | Notes |
|---|---:|---|
| Structure parity | 3 | Header, hero, search, listings, sidebar, footer exist; lower photo/location sections and floating bell are missing. |
| Layout parity | 3 | Container widths and 3-column jobs/sidebar grid match; hero and cards have different composition and height. |
| Typography parity | 3 | Font sizes/weights mostly align, but app uses Manrope instead of Plus Jakarta Sans. |
| Color/effect parity | 1 | Primary design teal is replaced by pink in hero count, search CTA, pagination/links/buttons; hero background is different. |
| Spacing/sizing parity | 3 | Main section spacing is close; hero padding and job-card height/radius differ significantly. |
| Responsive parity | 2 | Only 1440 was requested; desktop has no overflow, but lower breakpoint behavior was not checked. |
| Accessibility/semantics | 2 | Route renders semantic sections, but axe reports serious contrast and unnamed-link issues. |

## Hard gate results

| Gate | Result | Notes |
|---|---|---|
| Render | PASS | `/vi/jobs` rendered and screenshots were captured. |
| Structure | FAIL | Provided TSX target is wrong; rendered page also misses design photo/location sections. |
| Layout | WARN | Main jobs grid layout is close, but hero/card composition differs. |
| CSS | FAIL | Primary colors, hero treatment, card styling, and font family diverge. |
| Responsive | WARN | 1440 has no overflow; other requested/default breakpoints were not checked in this command. |
| Accessibility | FAIL | Axe found serious `link-name` and `color-contrast` issues. |

## Critical mismatches

- [FAIL] Provided JSX target is not the `/vi/jobs` implementation.
  - Design: jobs search/list page.
  - Implementation: `app/[locale]/ung_tuyen/page.tsx` redirects to `/${locale}/apply`.
  - Location: `app/[locale]/ung_tuyen/page.tsx:9`
  - Suggested fix: use `app/[locale]/jobs/page.tsx` or `app/(public)/jobs/page.tsx` as the JSX target for this QC.

- [FAIL] Hero visual treatment does not match.
  - Design: light teal illustrated hero background, dark heading, teal job count.
  - Implementation: dark photographic hero background, white heading, pink job count.
  - Location: `app/(public)/jobs/page.tsx:104`
  - Suggested fix: restore the design hero background asset/color and use teal/dark heading treatment.

- [FAIL] Primary search CTA uses the wrong brand color.
  - Design: teal `rgb(0, 139, 156)` search button.
  - Implementation: pink `rgb(233, 30, 99)` search button.
  - Location: `app/(public)/jobs/page.tsx:68`
  - Suggested fix: use `bg-[#008b9c] hover:bg-teal-600 text-white`.

- [FAIL] Job filters are structurally different.
  - Design: checkbox controls for Freelancer, Internship, Full Time, Part Time with visible checked state.
  - Implementation: text links including extra `Tất cả lĩnh vực`; no checkbox UI.
  - Location: `app/(public)/jobs/page.tsx:141`
  - Suggested fix: render checkbox-style filter controls if matching the reference is required.

- [FAIL] Job card component does not match the reference cards.
  - Design: 243px-tall block cards, 12px radius, image icon tile, metadata rows, teal detail CTA, tag links.
  - Implementation: 146px-tall compact flex cards, 24px radius, material icon, chips, pink `Ứng tuyển ngay` CTA.
  - Location: `components/public/JobCard.tsx:61`
  - Suggested fix: use the reference list-card layout and teal CTA for the jobs listing page.

- [FAIL] Lower content sections are missing.
  - Design: includes `Chuyên mục ảnh` carousel and `Tìm kiếm công việc theo Location` cards after job listings.
  - Implementation: `/vi/jobs` jumps from listings/sidebar to footer.
  - Location: `app/(public)/jobs/page.tsx:300`
  - Suggested fix: add the photo carousel and location-card sections after the jobs/sidebar section.

## Visual mismatches

- [WARN] Header nav and language switcher styling differ.
  - Design: teal logo/nav hover and rounded-full language switcher with VN teal.
  - Implementation: Manrope header with pink active/hover states and square-ish language switcher.
  - Location: `components/public/PublicHeader.tsx:75`
  - Suggested fix: align header active/hover color and language switcher shape to the design if strict parity is required.

- [WARN] Sidebar content is simplified.
  - Design: `Liên kết` sidebar with Facebook cover and social feed posts.
  - Implementation: `Follow Us` sidebar plus quick links; feed post cards are missing.
  - Location: `app/(public)/jobs/page.tsx:254`
  - Suggested fix: add feed widget blocks or update the design reference to the simplified sidebar.

- [WARN] Floating bell is missing.
  - Design: fixed orange bell button at bottom-right.
  - Implementation: no floating button.
  - Location: `app/(public)/jobs/page.tsx:300`
  - Suggested fix: add fixed bell button if part of the required design.

## Computed CSS mismatches

| Breakpoint | Section/Element | Property | Design | Implementation | Severity | Location |
|---:|---|---|---:|---:|---|---|
| 1440 | Provided JSX | route mapping | jobs page | apply redirect | FAIL | `app/[locale]/ung_tuyen/page.tsx:9` |
| 1440 | Body | font-family | Plus Jakarta Sans | Manrope | WARN | `app/globals.css:1` |
| 1440 | Body | background-color | `rgb(249, 250, 251)` | `rgb(251, 249, 248)` | WARN | `app/globals.css:37` |
| 1440 | Hero box | background-image | light teal illustrated image | dark photo image | FAIL | `app/(public)/jobs/page.tsx:108` |
| 1440 | Hero title | color/accent | dark + teal count | white + pink count | FAIL | `app/(public)/jobs/page.tsx:114` |
| 1440 | Search button | background-color | `rgb(0, 139, 156)` | `rgb(233, 30, 99)` | FAIL | `app/(public)/jobs/page.tsx:68` |
| 1440 | Jobs heading | text | `Danh sách tuyển dụng` | `Cơ hội nghề nghiệp` | WARN | `app/(public)/jobs/page.tsx:139` |
| 1440 | Filters | control type | checkboxes | links | FAIL | `app/(public)/jobs/page.tsx:141` |
| 1440 | First job card | radius/height/display | `12px`, `243px`, block | `24px`, `146px`, flex | FAIL | `components/public/JobCard.tsx:61` |
| 1440 | Photo section | presence | present | missing | FAIL | `app/(public)/jobs/page.tsx:300` |
| 1440 | Location section | presence | present | missing | FAIL | `app/(public)/jobs/page.tsx:300` |

## CSS/token mismatches

| Section/Element | Property | Design | Implementation | Location |
|---|---|---:|---:|---|
| Global font | font-family | Plus Jakarta Sans | Manrope | `app/globals.css:1` |
| Brand accent | primary color | `#008b9c` teal | pink used for key CTAs | `app/(public)/jobs/page.tsx:68` |
| Hero | background | `#E6F7FA` + illustrated asset | dark local photo asset | `app/(public)/jobs/page.tsx:108` |
| Job card | border radius | `12px` | `24px` | `components/public/JobCard.tsx:61` |
| Footer | background | `#008b9c` | `#006672` | `components/public/PublicFooter.tsx:29` |

## Structure comparison

| Design section | Implementation status | Notes |
|---|---|---|
| Header | Partial | Present; color/language/nav treatment differs. |
| Hero | Partial | Present; image/color/title treatment differs. |
| Search bar | Partial | Layout close; button color and option text differ. |
| Jobs listings | Partial | Present; heading/filter/card structure differs. |
| Sidebar | Partial | Present; feed content simplified/missing. |
| Photo carousel | Missing | Design section absent in rendered route. |
| Location cards | Missing | Design section absent in rendered route. |
| Footer | Partial | Present; color and social icon treatment differ. |
| Floating bell | Missing | Design fixed bell button absent. |

## Responsive findings

| Breakpoint | Verdict | Findings |
|---:|---|---|
| 1440 | FAIL | Route renders without overflow, but structure/CSS/accessibility hard gates fail. |

## Browser/screenshot findings

- Screenshots generated:
  - `.qc/ui/jobs/screenshots/design-1440.png`
  - `.qc/ui/jobs/screenshots/app-1440.png`
- Browser data generated:
  - `.qc/ui/jobs/browser-qc.json`
- The app route produced no page errors.
- Console included one 404 resource error on the app route.

## Accessibility/semantic findings

- [FAIL] `link-name` serious: 6 links lack discernible text, likely icon-only job-card links.
- [FAIL] `color-contrast` serious: 9 contrast failures detected.
- The bookmark buttons have accessible labels, but icon links still need accessible names.

## Artifacts generated

- `.qc/ui/jobs/qc-report.md`
- `.qc/ui/jobs/browser-qc.json`
- `.qc/ui/jobs/selector-map.json`
- `.qc/ui/jobs/computed-style-diff.json`
- `.qc/ui/jobs/visual-mismatches.json`
- `.qc/ui/jobs/screenshots/design-1440.png`
- `.qc/ui/jobs/screenshots/app-1440.png`

## Recommended patch plan

1. Correct the QC target path to `app/(public)/jobs/page.tsx` or `app/[locale]/jobs/page.tsx` for future runs.
2. Restore the light teal illustrated hero and teal search CTA.
3. Replace filter links with checkbox-style controls if the HTML design remains authoritative.
4. Rework `components/public/JobCard.tsx` for this list page to match the reference card structure.
5. Add the missing photo carousel, location cards, and floating bell sections.
6. Fix axe `link-name` and `color-contrast` issues, then re-run QC across `375,768,1024,1440`.
