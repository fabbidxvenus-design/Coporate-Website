# Round 7 Completion Report — Modal Focus Trap

## Phase: COMPLETE ✓

## Summary

Round 7 implemented full focus trap accessibility for `ApplicationModal.tsx`, including `role="dialog"`, `aria-modal`, focus trap, Escape close, initial focus, return focus, 44×44px touch target on close button, and proper form labeling.

## Files Modified

### `components/public/ApplicationModal.tsx`

**Focus Trap Implementation:**
- `useRef` for modal container and close button
- `useEffect` for initial focus on first focusable element when modal opens
- `useEffect` for focus return to previously focused element on close
- `useEffect` for focus trap with Tab/Shift+Tab cycling
- `useEffect` for Escape key to close modal

**Dialog Accessibility:**
- `role="dialog"` on modal container
- `aria-modal="true"` to indicate modal blocks background
- `aria-labelledby="modal-title"` pointing to modal heading
- `id="modal-title"` on h2 elements (both success and form views)

**Close Button:**
- `min-w-11 min-h-11` for 44×44px minimum touch target (WCAG 2.2)
- `ref={closeButtonRef}` for programmatic focus
- `aria-label="Đóng cửa sổ"` (Close window)
- `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500`

**Backdrop:**
- Click on backdrop closes modal (`onClick={handleBackdropClick}`)
- `aria-hidden="false"` on backdrop (removed default hidden)

**Focus Styles:**
- All inputs: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008b9c] focus-visible:ring-offset-2` (WCAG 2.2 compliant)
- Submit button: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008b9c]`
- Success "Đóng" button: same focus ring

**Form Labels:**
- All 5 fields have `htmlFor`/`id` pairs: modal-fullName, modal-email, modal-phone, modal-message, modal-cv
- `noValidate` on form
- CV input: `<label htmlFor="modal-cv">` wrapping the drop zone, `<input id="modal-cv">` with `className="sr-only"`

**Live Regions:**
- Success view: `role="status" aria-live="polite"`

## A11Y IDs Fixed

| ID | Issue | Fix |
|----|-------|-----|
| A11Y-046 | Modal lacks role=dialog | Added `role="dialog"` |
| A11Y-047 | Modal missing aria-modal | Added `aria-modal="true"` |
| A11Y-048 | No focus trap | Added focus trap with Tab cycling |
| A11Y-049 | No Escape close | Added Escape key handler |
| A11Y-050 | Close button too small | `min-w-11 min-h-11` (44×44px) |
| A11Y-051 | No initial focus | Focus first focusable on open |
| A11Y-052 | No return focus | Return to `document.activeElement` on close |
| A11Y-053 | CV input not labeled | `<label htmlFor="modal-cv">` |

## Test Results

```
Running 20 tests using 4 workers
  20 passed (19.4s)

Type check: PASS
Build: PASS (23 routes)
Playwright: 20/20 PASS (19.4s)
```

## Verification

- ✅ TypeScript type-check passes
- ✅ Next.js production build succeeds
- ✅ All Playwright tests pass (20/20)

## Next Round

**Round 8**: Live regions for dynamic feedback
- `role="alert"` on login error
- `aria-live` on SettingsForm auto-save
- `aria-live` on ApplicationDetail status
- `aria-live` on DataTable loading/empty
- `aria-live` on login Suspense fallback