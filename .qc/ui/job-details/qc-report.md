# UI QC Report

## Verdict

FAIL

Weighted score: 76/100

## Inputs

- HTML design: `d:\WORKSPACE\CODE\Coporate_Website\.design\recruitment_site\chi_tiet_cong_viec_fabbi_final_precision\code.html`
- JSX/TSX implementation: `d:\WORKSPACE\CODE\Coporate_Website\app\(public)\jobs\[slug]\page.tsx`
- Route: `http://localhost:3000/vi/jobs/senior-frontend-engineer-react`
- Breakpoints checked: `1440`
- Browser verification: completed
- Computed style verification: completed
- Accessibility verification: completed
- Artifacts: `.qc/ui/jobs`

## Summary

- The route renders successfully at 1440px with no horizontal overflow.
- The main job-detail section order and 3-column desktop grid match the HTML reference closely.
- Major visual parity fails remain: the hero image is replaced by an empty gradient block, the primary CTA uses pink instead of teal, and the implementation uses Manrope instead of Plus Jakarta Sans.
- Sidebar shape and spacing are close, but content rows do not fully match the design reference.
- Accessibility has hard issues from axe: unnamed buttons and an invalid ARIA child-role relationship.

## Score breakdown

| Category | Score | Notes |
|---|---:|---|
| Structure parity | 4 | Header, hero, job header, content sections, sidebar, related jobs, and footer are present, but related cards and sidebar details differ. |
| Layout parity | 4 | Desktop grid, widths, sticky header/sidebar, and vertical structure are close at 1440px. |
| Typography parity | 3 | Scale/weights mostly match, but global font differs: Plus Jakarta Sans vs Manrope. |
| Color/effect parity | 2 | Primary CTA and active navigation use pink instead of design teal; hero image/effect differs. |
| Spacing/sizing parity | 4 | Container widths, gaps, padding, hero size, and sidebar dimensions are mostly aligned. |
| Responsive parity | 3 | Only 1440 was requested/checked; desktop has no overflow, lower breakpoints unverified in this run. |
| Accessibility/semantics | 2 | Semantic structure exists, but axe reported critical button-name and ARIA role violations. |

## Hard gate results

| Gate | Result | Notes |
|---|---|---|
| Render | PASS | Route rendered and screenshots were captured. |
| Structure | WARN | Major sections exist; related job card structure is significantly simplified. |
| Layout | PASS | 1440px grid and sticky card behavior are close. |
| CSS | FAIL | Primary colors and hero visual treatment differ materially from the HTML design. |
| Responsive | WARN | 1440px has no overflow; mobile/tablet not checked because the command specified one breakpoint. |
| Accessibility | FAIL | Axe found critical `button-name` and `aria-required-children` violations. |

## Critical mismatches

- [FAIL] Hero banner is not the HTML design image.
  - Design: `main > div img` is a 1168x400 object-cover image with rounded-2xl and subtle shadow.
  - Implementation: first hero visual is an empty gradient block with no image content.
  - Location: `app/(public)/jobs/[slug]/page.tsx:49`
  - Suggested fix: render an image element using object-cover and rounded-2xl, wired to the intended design/job banner source.

- [FAIL] Primary apply CTA uses the wrong color treatment.
  - Design: teal background `rgb(0, 139, 156)`, white text, `8px` radius.
  - Implementation: pink background `rgb(233, 30, 99)`, computed text `rgb(0, 102, 114)`, `16px` radius.
  - Location: `app/(public)/jobs/[slug]/page.tsx:69`
  - Suggested fix: use `bg-[#008B9C] hover:bg-[#00707e] text-white rounded-lg` for the top apply CTA.

- [FAIL] Accessibility has critical unnamed buttons.
  - Design: icon-only buttons are static/reference HTML and should still map to named interactive controls in app code.
  - Implementation: axe reports two `button-name` violations.
  - Location: likely `app/(public)/jobs/[slug]/page.tsx:121` and `app/(public)/jobs/[slug]/page.tsx:124`
  - Suggested fix: add `aria-label` to the Facebook/Twitter share buttons or convert them to named links.

## Visual mismatches

- [WARN] Header active state and language switcher differ from the design.
  - Design: active navigation and selected VN language pill are teal, with a rounded-full language control.
  - Implementation: active navigation/language accents are pink and the switcher uses a rounded-lg white selected button.
  - Location: `components/public/PublicHeader.tsx:75`
  - Suggested fix: use teal active/hover colors and rounded-full language pill styling for strict parity.

- [WARN] Related jobs are simplified.
  - Design: large white cards with icon tile, metadata rows, tags, bookmark button, and teal detail CTA.
  - Implementation: compact link rows with icon, title, small metadata, and chevron.
  - Location: `components/public/RelatedJobs.tsx:13`
  - Suggested fix: expand the component to match the HTML card layout.

- [WARN] Sidebar content does not fully match the reference card.
  - Design: deadline, salary, position, quantity, location/map, phone, email, skills, employment type.
  - Implementation: deadline is conditional, department replaces position, quantity is absent, and map is a gradient placeholder.
  - Location: `components/public/JobSidebar.tsx:18`
  - Suggested fix: add missing rows or align labels/data fields with the design reference where data exists.

## Computed CSS mismatches

| Breakpoint | Section/Element | Property | Design | Implementation | Severity | Location |
|---:|---|---|---:|---:|---|---|
| 1440 | Body | font-family | Plus Jakarta Sans | Manrope | WARN | `app/globals.css:1` |
| 1440 | Body | background-color | `rgb(249, 250, 251)` | `rgb(251, 249, 248)` | WARN | `app/globals.css:37` |
| 1440 | Hero banner | content/model | image | empty gradient block | FAIL | `app/(public)/jobs/[slug]/page.tsx:49` |
| 1440 | Apply CTA | background-color | `rgb(0, 139, 156)` | `rgb(233, 30, 99)` | FAIL | `app/(public)/jobs/[slug]/page.tsx:69` |
| 1440 | Apply CTA | color | `rgb(255, 255, 255)` | `rgb(0, 102, 114)` | FAIL | `app/(public)/jobs/[slug]/page.tsx:69` |
| 1440 | Apply CTA | border-radius | `8px` | `16px` | WARN | `app/(public)/jobs/[slug]/page.tsx:69` |

## CSS/token mismatches

| Section/Element | Property | Design | Implementation | Location |
|---|---|---:|---:|---|
| Brand accent | teal | `#008B9C` | `#006672` and pink accents | `app/globals.css:21`, `components/public/PublicHeader.tsx:75` |
| Font family | sans font | Plus Jakarta Sans | Manrope | `app/globals.css:1` |
| Primary CTA | bg/text/radius | teal / white / 8px | pink / teal / 16px | `app/(public)/jobs/[slug]/page.tsx:69` |
| Hero | media | photographic image | gradient placeholder | `app/(public)/jobs/[slug]/page.tsx:49` |

## Structure comparison

| Design section | Implementation status | Notes |
|---|---|---|
| Header | Partial | Same semantic sticky header; colors/language control differ. |
| Hero | Partial | Same dimensions/location; missing image. |
| Job header | Partial | Title/date/apply layout matches; missing expiry row in header and wrong CTA colors. |
| Main content | Match | Description, requirements, benefits, action bar order matches. |
| Sidebar | Partial | Sticky card and styling close; content rows differ. |
| Related jobs | Partial | Section exists but card structure is much simpler. |
| Floating chat | Missing | HTML has a fixed chat bot image; implementation route did not show this element in the audited TSX surface. |
| Footer | Partial | Layout close; implementation uses text abbreviations for socials instead of Font Awesome icons. |

## Responsive findings

| Breakpoint | Verdict | Findings |
|---:|---|---|
| 1440 | FAIL | No horizontal overflow and main grid matches, but hero/CTA/color/accessibility hard issues remain. |

## Browser/screenshot findings

- Screenshots generated:
  - `.qc/ui/jobs/screenshots/design-1440.png`
  - `.qc/ui/jobs/screenshots/app-1440.png`
- Browser data generated:
  - `.qc/ui/jobs/browser-qc.json`
- The app route produced no page errors.
- Console output included React DevTools info plus design-reference warnings from the local HTML file.

## Accessibility/semantic findings

- [FAIL] `button-name` critical: two share/icon buttons lack discernible names.
- [FAIL] `aria-required-children` critical: an element with an ARIA role requiring child roles is missing required child roles, likely related to `role="list"` wrapping link children in related jobs.
- [WARN] `color-contrast` serious: four nodes fail contrast thresholds.
- [WARN] `heading-order` moderate: one heading-order issue was detected.

## Artifacts generated

- `.qc/ui/jobs/qc-report.md`
- `.qc/ui/jobs/browser-qc.json`
- `.qc/ui/jobs/selector-map.json`
- `.qc/ui/jobs/computed-style-diff.json`
- `.qc/ui/jobs/visual-mismatches.json`
- `.qc/ui/jobs/screenshots/design-1440.png`
- `.qc/ui/jobs/screenshots/app-1440.png`

## Recommended patch plan

1. Replace the hero gradient placeholder with the reference-style image treatment.
2. Change the top apply CTA to the teal/white/rounded-lg design treatment and verify computed color.
3. Add accessible names to share buttons and fix the related-jobs list semantics.
4. Decide whether strict page parity should override the current global brand tokens for header, font, and pink accents.
5. Re-run QC at `375,768,1024,1440` after fixes.
