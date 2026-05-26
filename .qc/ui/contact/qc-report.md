# UI QC Report

## Verdict

FAIL

Weighted score: 39/100

## Inputs

- HTML design: `D:\WORKSPACE\CODE\Coporate_Website\.design\recruitment_site\ung_tuyen_ngay_fabbi_final_precision\code.html`
- JSX/TSX implementation: `D:\WORKSPACE\CODE\Coporate_Website\app\(public)\contact\page.tsx`
- Route: `http://localhost:3000/vi/contact`
- Breakpoints checked: `1440`
- Browser verification: `completed`
- Computed style verification: `completed`
- Accessibility verification: `completed with axe`
- Artifacts: `.qc/ui/contact`

## Summary

- The HTML reference is a centered application modal, but the implementation is a full contact page card.
- Major design sections are missing from the implementation: modal close button, position select, CV upload area, and support/contact footer line.
- The implementation includes extra contact-page fields (`company`, `subject`) that are not in the design reference.
- Key computed styles diverge: container width/shadow/layout, title scale, input typography/radius, and submit button color/size.
- Browser route renders without console errors, but axe reports one serious color-contrast violation.

## Score breakdown

| Category | Score | Notes |
|---|---:|---|
| Structure parity | 1/5 | Modal structure is not implemented; form field set differs substantially. |
| Layout parity | 2/5 | Both have centered white form surfaces, but design is 672px modal with max-height/overflow and close button; app is a 768px page card. |
| Typography parity | 3/5 | Same font family family, but heading and input sizes differ. |
| Color/effect parity | 2/5 | Primary submit button is pink instead of teal; modal shadow is much weaker in app; background differs. |
| Spacing/sizing parity | 2/5 | Container width, button width/height, input radius, label margin, and form content rhythm differ. |
| Responsive parity | 2/5 | Only 1440 was requested/checked; static code suggests modal max-height/scroll behavior missing. |
| Accessibility/semantics | 3/5 | Labels exist and no horizontal overflow; axe reports one serious color-contrast violation. |

## Hard gate results

| Gate | Result | Notes |
|---|---|---|
| Render | PASS | Route returned 200, rendered in Chromium, screenshots captured. |
| Structure | FAIL | Major modal structure and fields are missing/out of scope. |
| Layout | FAIL | Implementation is a page card, not the centered application modal layout. |
| CSS | FAIL | Primary button color, shadow, radii, field styling, and title scale diverge. |
| Responsive | WARN | Only 1440 was requested; no horizontal overflow at 1440, but modal-specific responsive behavior is absent. |
| Accessibility | FAIL | Axe found a serious `color-contrast` violation on the app route. |

## Critical mismatches

- [FAIL] The implementation is a contact page instead of the application modal in the HTML design.
  - Design: `body` centers `[data-purpose="modal-container"]`, a white `max-w-2xl` modal with `max-h-[90vh]`, close button, and internal scroll.
  - Implementation: full-page `bg-[#fbf9f8] min-h-screen` with a centered content card.
  - Location: `app/(public)/contact/page.tsx:13`
  - Suggested fix: If this route is meant to implement the HTML reference, replace the page-card shell with the modal container structure, including close control and scrollable inner content.

- [FAIL] Form fields do not match the design reference.
  - Design: `position` select, `fullName`, `email`, `phone`, `message`, and `file-upload` CV input.
  - Implementation: `name`, `email`, `phone`, `company`, `subject`, and `message`; missing position select and CV upload.
  - Location: `components/public/ContactForm.tsx:80`
  - Suggested fix: Align the rendered fields to the application modal contract or confirm the supplied HTML is the wrong reference for this contact route.

- [FAIL] Submit CTA visual identity is wrong.
  - Design: teal `#008b9c`, centered `min-w-[240px]`, 8px radius, 54px high.
  - Implementation: pink `#E91E63`, full width 670px, 16px radius, 48px high.
  - Location: `components/public/ContactForm.tsx:169`
  - Suggested fix: Use `bg-primary`/`hover:bg-[#007a89]`, `rounded-lg`, `sm:w-auto min-w-[240px]`, and design padding.

- [FAIL] CV upload area is missing.
  - Design: dashed upload box with SVG upload icon, file input accepting `.pdf,.doc,.docx`, hover state.
  - Implementation: no file input or upload surface.
  - Location: `components/public/ContactForm.tsx:80`
  - Suggested fix: Add the upload field if the application modal is the intended target.

## Visual mismatches

- [WARN] Container shadow and border differ.
  - Design: `shadow-xl`, no visible border, modal width 672px.
  - Implementation: `shadow-sm`, `border border-gray-100`, width 768px.
  - Location: `app/(public)/contact/page.tsx:15`
  - Suggested fix: Use `shadow-xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh]` for modal parity.

- [WARN] Heading semantics and alignment differ.
  - Design: centered `h2`, 30px font, 12px bottom margin.
  - Implementation: left-aligned `h1`, 36px font, 16px bottom margin.
  - Location: `app/(public)/contact/page.tsx:16`
  - Suggested fix: Use the design header block with centered title/description.

- [WARN] Input fields differ in styling.
  - Design: 14px text, 8px radius, gray-300 border, placeholders, select chevron.
  - Implementation: 16px text, 16px radius, gray-200 border, no placeholders.
  - Location: `components/public/ContactForm.tsx:89`
  - Suggested fix: Match design input utility classes and placeholders.

## Computed CSS mismatches

| Breakpoint | Section/Element | Property | Design | Implementation | Severity | Location |
|---:|---|---|---:|---:|---|---|
| 1440 | Container | width | 672px | 768px | FAIL | `app/(public)/contact/page.tsx:15` |
| 1440 | Container | display/position | flex/relative | block/static | FAIL | `app/(public)/contact/page.tsx:15` |
| 1440 | Container | box-shadow | shadow-xl multi-layer | shadow-sm | WARN | `app/(public)/contact/page.tsx:15` |
| 1440 | Title | font-size | 30px | 36px | WARN | `app/(public)/contact/page.tsx:16` |
| 1440 | Title | margin-bottom | 12px | 16px | WARN | `app/(public)/contact/page.tsx:16` |
| 1440 | First field | font-size | 14px | 16px | WARN | `components/public/ContactForm.tsx:89` |
| 1440 | First field | border-radius | 8px | 16px | FAIL | `components/public/ContactForm.tsx:89` |
| 1440 | Submit | background-color | rgb(0, 139, 156) | rgb(233, 30, 99) | FAIL | `components/public/ContactForm.tsx:169` |
| 1440 | Submit | width | 240px | 670px | FAIL | `components/public/ContactForm.tsx:169` |
| 1440 | Submit | border-radius | 8px | 16px | FAIL | `components/public/ContactForm.tsx:169` |

## CSS/token mismatches

| Section/Element | Property | Design | Implementation | Location |
|---|---|---:|---:|---|
| Body/page | background | `#e2e8f0` overlay backdrop | `#fbf9f8` page background | `app/(public)/contact/page.tsx:13` |
| Submit | brand color | `#008b9c` | `#E91E63` | `components/public/ContactForm.tsx:169` |
| Inputs | border color | `#d1d5db` | `#e5e7eb` | `components/public/ContactForm.tsx:89` |
| Container | shadow | Tailwind `shadow-xl` | Tailwind `shadow-sm` | `app/(public)/contact/page.tsx:15` |
| Container | max width | 672px | 768px | `app/(public)/contact/page.tsx:14` |

## Structure comparison

| Design section | Implementation status | Notes |
|---|---|---|
| Modal backdrop/body centering | Missing | Implementation is a normal page layout. |
| Modal container | Partial | White rounded card exists, but width, shadow, border, overflow, and positioning differ. |
| Close button | Missing | No close control in implementation. |
| Header title/description | Partial | Different text, heading level, alignment, and typography. |
| Position select | Missing | Design has select; implementation has no equivalent. |
| Name/email/phone | Partial | Semantic equivalents exist, but styling/placeholders differ. |
| Message | Partial | Exists; rows/styling/required behavior differ. |
| CV upload | Missing | No file upload in implementation. |
| Submit button | Partial | Exists, but color/sizing/radius diverge. |
| Support contact line | Missing | No bottom support line in implementation. |
| Extra company/subject fields | Extra | Present only in implementation. |

## Responsive findings

| Breakpoint | Verdict | Findings |
|---:|---|---|
| 1440 | FAIL | Major structure and computed-style mismatches; no horizontal overflow. |

## Browser/screenshot findings

- Screenshots captured:
  - `.qc/ui/contact/screenshots/design-1440.png`
  - `.qc/ui/contact/screenshots/app-1440.png`
- Browser evidence saved:
  - `.qc/ui/contact/browser-evidence.json`
- Console errors: none observed.

## Accessibility/semantic findings

- Axe scan completed against `http://localhost:3000/vi/contact`.
- One serious violation: `color-contrast`.
- Labels are associated with visible inputs in the implementation.
- No horizontal overflow detected at 1440px.

## Artifacts generated

- `.qc/ui/contact/qc-report.md`
- `.qc/ui/contact/browser-evidence.json`
- `.qc/ui/contact/selector-map.json`
- `.qc/ui/contact/visual-mismatches.json`
- `.qc/ui/contact/screenshots/design-1440.png`
- `.qc/ui/contact/screenshots/app-1440.png`
- `.qc/ui/contact/capture-qc.js`

## Recommended patch plan

1. Confirm whether the supplied HTML application-modal reference is actually intended for `/vi/contact`; if not, rerun QC with the correct contact-page design HTML.
2. If it is intended, replace the page-card structure with the modal shell and close button from the design.
3. Align `ContactForm` fields to the design: position select, name/email/phone/message, CV upload, and support line; remove company/subject from this modal flow.
4. Match computed styling for container, title, inputs, upload area, and submit CTA.
5. Re-run `/qc-ui --computed --a11y --screenshot --artifacts .qc/ui/contact --breakpoint 1440` and resolve the axe color-contrast violation.
