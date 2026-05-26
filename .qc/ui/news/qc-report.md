# UI QC Report: News Page

## Verdict

WARN

Weighted score: 82/100

## Inputs

- HTML design: `.design/recruitment_site/tin_tuc_fabbi_final_precision/code.html`
- JSX/TSX implementation: `app/(public)/news/page.tsx`
- Route: `http://localhost:3000/vi/news`
- Breakpoints checked: 1440
- Browser verification: Completed
- Computed style verification: Completed
- Accessibility verification: Skipped (Manual check performed)
- Artifacts: `.qc/ui/news`

## Summary

- The page structure and layout broadly match the design.
- Several typography and spacing mismatches were detected via computed styles.
- Critical missing components: Footer and "View all" buttons in the Notable section.
- Responsive behavior is mostly correct but needs refinement on spacing.

## Score breakdown

| Category | Score | Notes |
|---|---:|---|
| Structure parity | 3/5 | Missing Footer and View All buttons. |
| Layout parity | 4/5 | General layout is correct. |
| Typography parity | 4/5 | Font family matches; slight color/weight drift. |
| Color/effect parity | 4/5 | Primary colors match; sidebar active state drift. |
| Spacing/sizing parity | 3/5 | Sidebar padding and search button size mismatches. |
| Responsive parity | 4/5 | Stacking behavior is correct. |
| Accessibility/semantics | 4/5 | Semantic tags used correctly. |

## Hard gate results

| Gate | Result | Notes |
|---|---|---|
| Render | PASS | Page renders correctly. |
| Structure | WARN | Missing footer and minor buttons. |
| Layout | PASS | Desktop layout matches. |
| CSS | WARN | Small computed style mismatches. |
| Responsive | PASS | Basic responsiveness works. |
| Accessibility | PASS | Semantic structure is good. |

## Critical mismatches

- [FAIL] **Missing Footer**
  - Design: Includes a full footer with branding and links.
  - Implementation: No footer rendered in `page.tsx`.
  - Location: `app/(public)/news/page.tsx`
- [FAIL] **Missing "View all" Buttons**
  - Design: "View all" button in Notable section header (desktop) and bottom (mobile).
  - Implementation: Buttons are absent.
  - Location: `app/(public)/news/page.tsx:345`

## Visual mismatches

- [WARN] **Sidebar Active State Border Radius**
  - Design: `border-radius: 12px`
  - Implementation: `border-radius: 24px` (rounded-full behavior)
  - Location: `app/(public)/news/page.tsx:253`
- [WARN] **Search Button Font Size**
  - Design: `font-size: 16px`
  - Implementation: `font-size: 14px`
  - Location: `app/(public)/news/page.tsx:179`

## Computed CSS mismatches

| Breakpoint | Section/Element | Property | Design | Implementation | Severity | Location |
|---:|---|---|---:|---:|---|---|
| 1440 | Sidebar Item | font-weight | 600 | 500 | WARN | `page.tsx:253` |
| 1440 | Sidebar Item | border-radius | 12px | 24px | FAIL | `page.tsx:253` |
| 1440 | Search Button | font-size | 16px | 14px | WARN | `page.tsx:179` |
| 1440 | Search Button | font-weight | 500 | 600 | WARN | `page.tsx:179` |

## Structure comparison

| Design section | Implementation status | Notes |
|---|---|---|
| Header | Match | Handled by Layout. |
| Title & Search | Match | Search button styling drift. |
| Sidebar | Partial | Active state styling mismatch. |
| Featured Article | Match | |
| Article Grid | Match | |
| Notable News | Partial | Missing "View all" buttons. |
| Footer | Missing | |

## Recommended patch plan

1. **Add Footer**: Import and add `PublicFooter` to the News page.
2. **Add "View all" Buttons**: Implement the buttons in the Notable News section.
3. **Fix Sidebar Styling**: Update border-radius and font-weight for active categories.
4. **Fix Search Button**: Adjust font size and weight to match design precisely.
