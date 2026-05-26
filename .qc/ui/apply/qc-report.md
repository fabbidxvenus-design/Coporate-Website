# UI QC Report

## Verdict

FAIL

Weighted score: 38/100

## Inputs

- HTML design: `D:\WORKSPACE\CODE\Coporate_Website\.design\recruitment_site\form_ung_tuyen_nhanh_fabbi_final_precision\code.html`
- JSX/TSX implementation: `D:\WORKSPACE\CODE\Coporate_Website\app\[locale]\ung_tuyen\page.tsx`
- Route: `http://localhost:3000/vi/jobs/senior-frontend-engineer-react`
- Breakpoints checked: `1440`
- Browser verification: completed
- Computed style verification: completed for available rendered surfaces; failed parity because requested route does not render the design modal
- Accessibility verification: completed with axe on requested route
- Artifacts: `.qc/ui/apply`

## Summary

- Hard FAIL: the requested TSX file is not a visual implementation; it only redirects to `/${locale}/apply`.
- Hard FAIL: the requested browser route renders the job detail page, not the quick application modal from the HTML design.
- The closest implemented modal is `components/public/ApplicationModal.tsx`, but it is not rendered on the requested route and still has copy/layout differences from the HTML reference.
- The `/vi/apply` destination renders an application form page, but it is a page/card layout with extra job selection and different copy, not a modal overlay.
- Axe found serious color contrast violations on the requested route, mostly from `#008b9c` teal against white or white text over teal.

## Score breakdown

| Category | Score | Notes |
|---|---:|---|
| Structure parity | 1/5 | Requested TSX redirects; route renders job detail, not modal. |
| Layout parity | 1/5 | Design is centered modal overlay; route is full job-detail layout. |
| Typography parity | 3/5 | Font family matches, but title hierarchy/copy differs on apply surfaces. |
| Color/effect parity | 3/5 | Primary teal/white/radius partly align in closest components, but target surface absent. |
| Spacing/sizing parity | 2/5 | Modal max width/padding exists in `ApplicationModal`, but not on route; `/vi/apply` card differs. |
| Responsive parity | 2/5 | Only 1440 requested; no horizontal overflow at 1440, but modal responsive behavior could not be verified on route. |
| Accessibility/semantics | 3/5 | `ApplicationModal` has dialog semantics, but route lacks modal; axe found serious contrast issues. |

## Hard gate results

| Gate | Result | Notes |
|---|---|---|
| Render | PASS | Requested route returned HTTP 200 and screenshot was captured. |
| Structure | FAIL | Major design surface is missing from requested TSX/route. |
| Layout | FAIL | Modal overlay/card composition is not present on requested route. |
| CSS | FAIL | Primary computed comparison cannot pass because mapped design elements do not exist on route. |
| Responsive | WARN | 1440 has no overflow; other breakpoints were not requested in this invocation. |
| Accessibility | WARN | Axe found serious contrast violations on requested route. |

## Critical mismatches

- [FAIL] Requested implementation file does not implement the design.
  - Design: `code.html` contains a complete modal: overlay, close button, centered `max-w-[600px]` white card, form fields, upload area, submit, contact link.
  - Implementation: `app/[locale]/ung_tuyen/page.tsx` only redirects to `/${locale}/apply`.
  - Location: `app/[locale]/ung_tuyen/page.tsx:3`
  - Suggested fix: Point QC to the actual component (`components/public/ApplicationModal.tsx`) or replace the legacy page with the modal/page implementation expected by the design.

- [FAIL] Requested route does not render the design surface.
  - Design: Quick application modal should be visible over a dark overlay.
  - Implementation: `http://localhost:3000/vi/jobs/senior-frontend-engineer-react` renders the job detail page and an `Ứng tuyển ngay` link; `hasDialog=false` in browser metrics.
  - Location: `components/public/JobSidebar.tsx` / `app/[locale]/jobs/[slug]/page.tsx` route composition
  - Suggested fix: If the design is intended as a job-detail modal, wire the apply CTA to open `ApplicationModal` on the job route instead of navigating to `/vi/apply`, then rerun QC.

- [FAIL] `/vi/apply` fallback page is not modal-equivalent.
  - Design: title `Ứng tuyển job này`, no job select, phone optional, submit text `Ứng Tuyển`, modal card is the outer container.
  - Implementation: title `Ứng tuyển ngay nào`, includes job select, phone/CV required, submit text `Gửi hồ sơ`, nested page/card layout.
  - Location: `components/public/ApplyForm.tsx:118`
  - Suggested fix: Decide whether the source of truth is the modal design or the standalone application page; align copy, fields, and container layout accordingly.

## Visual mismatches

- [WARN] Closest modal component changes title copy and submit layout.
  - Design: `Ứng tuyển job này`; submit button centered with `w-full sm:w-[280px]`.
  - Implementation: `Ứng tuyển {jobTitle}`; submit button `w-full` in `ApplicationModal`.
  - Location: `components/public/ApplicationModal.tsx:148`, `components/public/ApplicationModal.tsx:210`
  - Suggested fix: Use exact title and button sizing from design if `ApplicationModal` is the intended match.

- [WARN] Upload area treatment differs.
  - Design: vertical flex column with 24px icon above text and `1px dashed #D1D5DB`.
  - Implementation: `ApplicationModal` upload area has no icon; `/vi/apply` uses 2px dashed border plus inline SVG background and horizontal icon/text.
  - Location: `components/public/ApplicationModal.tsx:196`, `components/public/ApplyForm.tsx:227`
  - Suggested fix: Restore the upload icon and vertical layout from the HTML reference.

## Computed CSS mismatches

| Breakpoint | Section/Element | Property | Design | Implementation | Severity | Location |
|---:|---|---|---:|---:|---|---|
| 1440 | Route surface | rendered surface | centered modal overlay | job detail page, no dialog | FAIL | `app/[locale]/ung_tuyen/page.tsx:9` |
| 1440 | Apply page title | text/font-size | `Ứng tuyển job này` / 30px | `Ứng tuyển ngay nào` / 24px | FAIL | `components/public/ApplyForm.tsx:118` |
| 1440 | Submit button | radius/padding/text | 8px / 12px 24px / `Ứng Tuyển` | 16px / 14px 32px / `Gửi hồ sơ` | WARN | `components/public/ApplyForm.tsx:265` |
| 1440 | Upload area | border/layout | 1px dashed, vertical | 2px dashed + SVG background, horizontal | WARN | `components/public/ApplyForm.tsx:227` |

## CSS/token mismatches

| Section/Element | Property | Design | Implementation | Location |
|---|---|---:|---:|---|
| Modal/page title | font-size | 30px | 24px on `/vi/apply` | `components/public/ApplyForm.tsx:118` |
| Submit button | border-radius | 8px | 16px on `/vi/apply` | `components/public/ApplyForm.tsx:265` |
| Upload area | border-width | 1px | 2px on `/vi/apply` | `components/public/ApplyForm.tsx:229` |
| Route body | background | image + black overlay | plain job detail background | `app/[locale]/jobs/[slug]/page.tsx` |

## Structure comparison

| Design section | Implementation status | Notes |
|---|---|---|
| Modal overlay | Missing on requested route | Route has job detail page; no `[role=dialog]`. |
| Modal container | Missing on requested TSX/route | Closest exists in `ApplicationModal`, not rendered by inputs. |
| Close button | Missing on requested route | Present only in `ApplicationModal`. |
| Header/title | Partial elsewhere | `/vi/apply` title differs; `ApplicationModal` title includes job name. |
| Form fields | Partial elsewhere | `/vi/apply` adds job select and validation differences. |
| Upload area | Partial | Styling/layout differ in both closest implementations. |
| Submit/contact | Partial | Copy and sizing differ on `/vi/apply`; contact link missing in `ApplicationModal`. |

## Responsive findings

| Breakpoint | Verdict | Findings |
|---:|---|---|
| 1440 | FAIL | Route renders successfully with no horizontal overflow, but it is the wrong surface. |

## Browser/screenshot findings

- Design screenshot: `.qc/ui/apply/screenshots/design-1440.png`
- Requested route screenshot: `.qc/ui/apply/screenshots/app-1440.png`
- Redirected apply page screenshot: `.qc/ui/apply/screenshots/app-apply-1440.png`
- Browser metrics: `.qc/ui/apply/browser-route-1440.json`, `.qc/ui/apply/browser-apply-1440.json`

## Accessibility/semantic findings

- `ApplicationModal` has proper dialog semantics (`role=dialog`, `aria-modal=true`, focus trap), but it is not shown on the requested route.
- Axe found serious `color-contrast` violations on the requested route involving `#008b9c` teal and white text/background combinations.
- Axe artifact: `.qc/ui/apply/a11y-job-route-1440.json`

## Artifacts generated

- `.qc/ui/apply/qc-report.md`
- `.qc/ui/apply/selector-map.json`
- `.qc/ui/apply/computed-style-diff.json`
- `.qc/ui/apply/visual-mismatches.json`
- `.qc/ui/apply/browser-route-1440.json`
- `.qc/ui/apply/browser-apply-1440.json`
- `.qc/ui/apply/a11y-job-route-1440.json`
- `.qc/ui/apply/screenshots/design-1440.png`
- `.qc/ui/apply/screenshots/app-1440.png`
- `.qc/ui/apply/screenshots/app-apply-1440.png`

## Recommended patch plan

1. Decide the intended target: job-detail modal (`ApplicationModal`) or standalone `/vi/apply` page.
2. If modal: wire the job-detail `Ứng tuyển ngay` CTA to open `ApplicationModal`, then align `ApplicationModal` copy, upload icon/layout, contact link, and submit width to the HTML design.
3. If standalone page: update the design reference or convert `/vi/apply` to the modal-style centered card with matching copy and fields.
4. Fix route-level color contrast for `#008b9c` usages or use a darker accessible teal for text/buttons.
5. Re-run `/qc-ui` with the actual JSX component/route that renders the target surface.
