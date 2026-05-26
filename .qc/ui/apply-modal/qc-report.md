# UI QC Report: GeneralApplyModal

## Verdict

**FAIL**

Weighted score: **68/100**

## Inputs

- **HTML design:** `D:/WORKSPACE/CODE/Coporate_Website/.design/recruitment_site/ung_tuyen_ngay_fabbi_final_precision/code.html`
- **JSX/TSX implementation:** `D:\WORKSPACE\CODE\Coporate_Website\components\public\GeneralApplyModal.tsx`
- **Route:** `http://localhost:3000/vi/jobs?apply=true`
- **Breakpoints checked:** 1440
- **Browser verification:** Completed
- **Computed style verification:** Completed
- **Accessibility verification:** Completed
- **Artifacts:** `.qc/ui/apply-modal`

## Summary

The implementation deviates significantly from the design in both structural layout and visual hierarchy. The most critical issue is the introduction of a **sticky header** with a border that does not exist in the design, and a **2-column grid layout** for form fields that conflicts with the design's single-column stack. Typography scales and specific brand colors/radii also drift significantly.

## Score breakdown

| Category | Score | Notes |
|---|---:|---|
| Structure parity | 2/5 | Implementation adds a sticky header; design has scrolling header. |
| Layout parity | 2/5 | Design is single column; implementation is 2-column grid. |
| Typography parity | 3/5 | Header text size is `xl` (20px) vs `3xl` (30px) in design. |
| Color/effect parity | 3/5 | Button radius `rounded-xl` vs `rounded-lg`. Teal color differs. |
| Spacing/sizing parity | 3/5 | Content padding is `p-8` vs design's `md:p-12`. |
| Responsive parity | 4/5 | Both handle mobile stacking, though implementation grid is new. |
| Accessibility/semantics | 4/5 | Good ARIA labels and focus trap implemented. |

## Hard gate results

| Gate | Result | Notes |
|---|---|---|
| Render | **PASS** | Component renders correctly on the route. |
| Structure | **FAIL** | Sticky header with border-bottom is a major design departure. |
| Layout | **FAIL** | Field arrangement (2-col grid) changes visual rhythm. |
| CSS | **FAIL** | Significant drift in heading sizes and primary button styling. |
| Responsive | **PASS** | No overflow; layouts adjust to viewport. |
| Accessibility | **PASS** | Focus trap and Escape key handling are excellent. |

## Critical mismatches

- **[FAIL] Structural Header Drift**
  - **Design:** Centered header (`text-center`) that scrolls with the form content.
  - **Implementation:** Sticky header (`sticky top-0`) with a bottom border (`border-b border-gray-100`).
  - **Location:** `GeneralApplyModal.tsx:204`
  - **Suggested fix:** Remove the sticky container and border; move the title into the scrollable content area and center it.

- **[FAIL] Form Grid Layout Mismatch**
  - **Design:** All fields stacked vertically in a single column with `space-y-6`.
  - **Implementation:** Fields grouped into `grid-cols-2` for Name/Email and Phone/Portfolio.
  - **Location:** `GeneralApplyModal.tsx:259, 286`
  - **Suggested fix:** Remove the grid classes and wrappers; stack all field containers directly in the form with consistent vertical spacing.

- **[FAIL] Heading Typography Scale**
  - **Design:** `text-3xl font-bold` (~30px) for "Ứng tuyển ngay nào".
  - **Implementation:** `text-xl font-bold` (20px).
  - **Location:** `GeneralApplyModal.tsx:205`
  - **Suggested fix:** Increase font size to `text-3xl` and ensure the sub-text description is present (currently missing in implementation).

- **[FAIL] Submit Button Styling**
  - **Design:** `rounded-lg`, color `#008b9c` (`bg-brand-teal`).
  - **Implementation:** `rounded-xl`, color `bg-primary`.
  - **Location:** `GeneralApplyModal.tsx:339`
  - **Suggested fix:** Update radius to `rounded-lg` and ensure the teal color matches `#008b9c`.

## Visual mismatches

- **[WARN] Close Button Position/Style**
  - **Design:** Simple SVG inside a `rounded-md` gray box.
  - **Implementation:** `rounded-full` circle with `material-symbols-outlined`.
  - **Location:** `GeneralApplyModal.tsx:211`

- **[WARN] Upload Area Border**
  - **Design:** Custom dashed SVG background with specific dash array (`8, 8`).
  - **Implementation:** Standard CSS `border-dashed`.
  - **Location:** `GeneralApplyModal.tsx:326`

## Recommended patch plan

1. **Fix Structure:** Move the `<h2>` and description inside the scrollable container. Remove the sticky header div.
2. **Restore Layout:** Remove all `md:grid-cols-2` wrappers and ensure `space-y-6` is applied to the form.
3. **Correct Typography:** Update the title to `text-3xl` and add the missing description paragraph.
4. **Refine Components:** Update button `border-radius` to `lg` and match the `brand-teal` color tokens. Replace material icons with the specific SVGs from the design for pixel-perfect match.
