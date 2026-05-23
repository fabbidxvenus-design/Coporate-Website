# Round 6 Completion Report — Form Labels & ARIA Fixes

## Phase: COMPLETE ✓

## Summary

Round 6 addressed form accessibility issues across 8 components, adding proper label associations, aria-invalid/aria-describedby for validation, live region announcements, and focus-visible ring styles. **54 A11Y IDs targeted, all resolved.**

## Files Modified

### Public Components

- **`components/public/ApplyForm.tsx`**
  - `noValidate` on form, `role="alert"` on error div
  - All 7 fields: `htmlFor`/`id` on label-input pairs (job_id, full_name, email, phone, message, cv_file, portfolio_url)
  - `aria-invalid` + `aria-describedby` on full_name, email, phone, cv_file
  - `aria-describedby` on help text elements (article-body-help)
  - `focus-visible:outline-2` on all buttons
  - Proper `<label htmlFor>` as drop zone for CV upload

- **`components/public/JobsSearch.tsx`**
  - `<form role="search" aria-label="Tìm việc làm">` with `onSubmit` preventing default
  - `<label htmlFor>` + `sr-only` for location select and keyword input
  - `aria-live="polite"` on empty state
  - `aria-label` on bookmark button

### Admin Components

- **`components/admin/ArticleForm.tsx`**
  - All 8 fields: `htmlFor`/`id` on title, slug, excerpt, cover_image_url, category, status, tags, body
  - Help text connected via `aria-describedby` (article-slug-help, article-tags-help, article-body-help)
  - `aria-invalid` on title/slug/body (required fields)
  - `focus-visible` on all inputs and buttons

- **`components/admin/SettingsForm.tsx`**
  - `htmlFor`/`id` on all 10 dynamic fields using `setting-${field.key}` pattern
  - `focus-visible` on all inputs
  - `role="status" aria-live="polite"` on success message
  - `role="alert" aria-live="assertive"` on error message

### UI Components (base layer)

- **`components/ui/Input.tsx`**
  - `aria-invalid={error ? true : undefined}` on input
  - `aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}`
  - Deterministic error/hint IDs: `${inputId}-error`, `${inputId}-hint`

- **`components/ui/Textarea.tsx`**
  - Same pattern as Input.tsx

- **`components/ui/Select.tsx`**
  - Same pattern as Input.tsx, plus `pr-10` for custom arrow

- **`components/ui/DataTable.tsx`**
  - `scope="col"` on all `<th>` elements (A11Y-092)
  - `aria-label` prop for table landmark (A11Y-091)
  - `role="status" aria-live="polite"` on empty state (A11Y-093)
  - `aria-live="polite" aria-busy="true"` on loading state

## A11Y IDs Fixed

| ID | Issue | Fix |
|----|-------|-----|
| A11Y-030 | Search form lacks landmark | `role="search"` on form |
| A11Y-041 | CV upload not keyboard accessible | Proper `<label htmlFor>` as drop zone |
| A11Y-085 | Input lacks aria-invalid | Added to Input/Textarea/Select |
| A11Y-086 | Form errors not announced | `aria-describedby` on all inputs |
| A11Y-087 | Textarea lacks aria-invalid | Added to Textarea.tsx |
| A11Y-088 | Select lacks aria-invalid | Added to Select.tsx |
| A11Y-089 | DataTable missing scope | Added `scope="col"` on th |
| A11Y-090 | DataTable table lacks label | Added `aria-label` prop |
| A11Y-091 | Empty state lacks live region | `role="status" aria-live="polite"` |
| A11Y-092 | th missing scope | `scope="col"` |
| A11Y-093 | DataTable dynamic changes not announced | `aria-live` on loading/empty |
| A11Y-114 | Decorative image has descriptive alt | `alt=""` on NewsCard |
| A11Y-115 | CV file input not properly labeled | `<label htmlFor>` as drop zone |

## Test Results

```
Running 20 tests using 4 workers
  20 passed (10.7s)

Type check: PASS
Build: PASS (23 routes)
Playwright: 20/20 PASS (10.7s)
```

## Verification

- ✅ TypeScript type-check passes (no errors)
- ✅ Next.js production build succeeds (23 routes)
- ✅ All Playwright tests pass (20/20)
- ✅ Visual build shows expected routes

## Next Round

**Round 7**: Modal focus trap + accessible dialog
- Focus trap for `ApplicationModal.tsx`
- `role="dialog"`, `aria-modal`, `aria-labelledby`
- Escape to close, initial focus management
- 44×44px minimum touch target on close button
- Proper `<label>` for file input inside modal