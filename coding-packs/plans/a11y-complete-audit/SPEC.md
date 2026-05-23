# SPEC — A11y Complete Audit (All Rounds)

**Date:** 2026-05-23
**Plan:** `a11y-complete-audit`
**Tier:** THOROUGH | effort=max quality=max

---

## Round 5 — Design Review Prep

### SPEC: A11Y-R5-01 Focus Visible System
- Given: keyboard users navigate the site
- When: they tab to any interactive element
- Then: a visible 2px high-contrast focus ring appears that meets WCAG 2.2 Focus Appearance

### SPEC: A11Y-R5-02 Skip Links
- Given: keyboard users load any page
- When: they press Tab
- Then: a skip-to-main-content link appears and navigates to `#main-content`

### SPEC: A11Y-R5-03 Reduced Motion
- Given: users have `prefers-reduced-motion: reduce`
- When: they view animated content
- Then: all animations (scroll, spinners, transforms, pulse) are disabled or instant

### SPEC: A11Y-R5-04 Color Contrast Audit
- Given: all text on colored backgrounds
- When: checked against WCAG AA
- Then: normal text ≥4.5:1, large text ≥3:1, focus indicators ≥3:1

---

## Round 6 — Form Structure Fixes

### SPEC: A11Y-R6-01 ApplyForm Labels
- Given: ApplyForm has 6 inputs (position, full_name, email, phone, message, cv_file)
- When: each field renders
- Then: a visible `<label>` exists with matching `htmlFor` and the input has matching `id`

### SPEC: A11Y-R6-02 ApplyForm Validation Errors
- Given: ApplyForm field fails validation
- When: error message is rendered
- Then: the input has `aria-invalid="true" aria-describedby="error-{field}"` and the error has `id="error-{field}"`

### SPEC: A11Y-R6-03 ApplyForm Error Announcement
- Given: ApplyForm submission fails with server error
- When: the error message is displayed
- Then: `role="alert"` or `aria-live="assertive"` is on the error container

### SPEC: A11Y-R6-04 JobsSearch Form Labels
- Given: JobsSearch has location select and keyword input
- When: each renders
- Then: visible `<label>` or `aria-label` exists with programmatic association

### SPEC: A11Y-R6-05 ArticleForm Labels
- Given: ArticleForm has 8 label-input pairs (title, slug, excerpt, cover, category, status, tags, body)
- When: each field renders
- Then: a visible `<label>` exists with matching `htmlFor` and `id`

### SPEC: A11Y-R6-06 SettingsForm Labels
- Given: SettingsForm has N dynamic field pairs
- When: each renders
- Then: visible `<label>` with matching `htmlFor` and generated `id` from `field.key`

### SPEC: A11Y-R6-07 UI Component Label Enforcement
- Given: Input, Textarea, Select components
- When: they are used without a `label` prop
- Then: they require `aria-label` or `aria-labelledby` to be passed

### SPEC: A11Y-R6-08 UI Component Error Association
- Given: Input, Textarea, Select have error text
- When: error exists
- Then: input has `aria-invalid="true" aria-describedby="{id}"` and error has matching `id`

---

## Round 7 — Modal Focus Trap

### SPEC: A11Y-R7-01 Modal Semantics
- Given: ApplicationModal is open
- When: screen reader user navigates the page
- Then: the modal has `role="dialog"`, `aria-modal="true"`, `aria-labelledby` referencing the heading

### SPEC: A11Y-R7-02 Focus Trap
- Given: ApplicationModal is open
- When: keyboard user presses Tab
- Then: focus cycles within the modal and does not exit to page content

### SPEC: A11Y-R7-03 Focus Restoration
- Given: ApplicationModal is closed
- When: it was opened from a trigger
- Then: focus returns to the original trigger element

### SPEC: A11Y-R7-04 Escape Key Close
- Given: ApplicationModal is open
- When: keyboard user presses Escape
- Then: the modal closes

### SPEC: A11Y-R7-05 Initial Focus
- Given: ApplicationModal opens
- When: it renders
- Then: focus moves to the first focusable element inside the modal

### SPEC: A11Y-R7-06 Modal Target Size
- Given: ApplicationModal close button
- When: it renders
- Then: its hit area is at least 44×44px

### SPEC: A11Y-R7-07 Modal Upload Label
- Given: ApplicationModal has a CV upload area
- When: it renders
- Then: the visible drop area is a `<label>` or focusable element forwarding to the file input

### SPEC: A11Y-R7-08 Modal Success Announcement
- Given: ApplicationModal form submission succeeds
- When: the success state renders
- Then: `role="status" aria-live="polite"` wraps the success message or focus moves to the success heading

---

## Round 8 — Live Regions & Dynamic Feedback

### SPEC: A11Y-R8-01 Search Empty State
- Given: JobsSearch returns 0 results
- When: the empty state message renders
- Then: `role="status" aria-live="polite"` wraps the message

### SPEC: A11Y-R8-02 Form Error Announcement
- Given: ApplyForm submission fails
- When: error renders
- Then: `role="alert"` wraps the message

### SPEC: A11Y-R8-03 SettingsForm Auto-save Status
- Given: SettingsForm auto-saves
- When: save succeeds
- Then: `role="status" aria-live="polite"` announces success
- When: save fails
- Then: `role="alert"` announces failure

### SPEC: A11Y-R8-04 ApplicationDetail Status Update
- Given: application status is updated
- When: the update succeeds or fails
- Then: a live region announces the result

### SPEC: A11Y-R8-05 Loading Spinners
- Given: any loading spinner renders
- When: it appears
- Then: it is hidden from screen readers (`aria-hidden`) and the container has `role="status" aria-live="polite"` with visually hidden text

### SPEC: A11Y-R8-06 DataTable Dynamic Changes
- Given: DataTable receives new data
- When: it renders
- Then: `role="status" aria-live="polite"` wraps the loading/empty state changes

### SPEC: A11Y-R8-07 Login Error Announcement
- Given: login fails
- When: error message renders
- Then: `role="alert"` wraps the message

---

## Round 9 — Rate Limiting Implementation

### SPEC: A11Y-R9-01 Application Endpoint Rate Limit
- Given: client sends POST to `/api/apply`
- When: requests exceed 10 per minute per IP
- Then: a 429 response is returned with `Retry-After` header and user-visible error

### SPEC: A11Y-R9-02 Auth Endpoint Rate Limit
- Given: client sends POST to `/api/auth/signin`
- When: failed attempts exceed 5 per minute per IP
- Then: a 429 response is returned with `Retry-After` header

---

## Coverage Targets

| Round | Components | AC Count | Target |
|-------|-----------|----------|--------|
| R5 | Header, Footer, Cards, Buttons | 4 | 100% |
| R6 | ApplyForm, JobsSearch, ArticleForm, SettingsForm, UI components | 8 | 100% |
| R7 | ApplicationModal | 8 | 100% |
| R8 | All dynamic-feedback components | 7 | 100% |
| R9 | API routes (apply, auth) | 2 | 100% |

---

## Test Files

- `tests/a11y/form-labels.spec.ts` — R6 form label + validation
- `tests/a11y/modal-focus-trap.spec.ts` — R7 modal ARIA + focus
- `tests/a11y/live-regions.spec.ts` — R8 live region announcements
- `tests/a11y/rate-limit.spec.ts` — R9 rate limit enforcement