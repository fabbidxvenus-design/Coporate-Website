# Phase 03: Public Forms — Submission, Validation, States

## ZFlow Context

**Phase purpose:** DET-UX-003, DET-API-001, DET-DATA-003, DET-VAL-001, DET-STATE-002, DET-ERR-001, DET-A11Y-002, DET-SEC-003, DET-EDGE-002

## Overview

Implement public form submission with full lifecycle: idle → validation → submitting → success/failure. Forms persist candidate data through Supabase. No CMS login required for public submission.

## Forms

| Design Folder | Target Route | Form Purpose |
|---|---|---|
| `ung_tuyen_ngay_fabbi_final_precision` | `/(public)/apply/page.tsx` | Full application form |
| `form_ung_tuyen_nhanh_fabbi_final_precision` | `/(public)/apply/page.tsx` (quick) | Quick application form |

## Tasks

1. **Form field parity.**
   - Extract all form fields from design `code.html`.
   - Match field types, labels, helper text, placeholder values with design.
   - Preserve design layout during validation feedback (DET-UX-003).

2. **Zod validation schema.**
   - Required field validation.
   - Email and phone format validation.
   - Client-side validation visible in UI.
   - No silent validation failure (DET-VAL-001).

3. **Supabase submission flow.**
   - Server action or API route for form submission.
   - Persist submission data to Supabase `applications` table.
   - No CMS login required (DET-API-001).
   - Submission data treated as user-provided personal data (DET-SEC-003).

4. **Form states implementation.**
   - Idle: default form state.
   - Submitting: button disabled, visible spinner/indicator, prevent duplicate submit.
   - Success: visible confirmation (success page or inline message).
   - Validation failure: inline field errors, user can correct and retry.
   - Submission failure: visible error, user can retry (DET-STATE-002).

5. **Error handling.**
   - Supabase error → user-facing failure message, no technical details (DET-ERR-001).
   - Supabase unavailable → failure feedback, no false success (DET-EDGE-002).
   - Error messages don't expose sensitive internals (DET-SEC-003).

6. **Form accessibility.**
   - Inputs have accessible labels or `aria-label` (DET-A11Y-002).
   - Validation errors associated with fields via `aria-describedby`.
   - Submit button keyboard operable.

## Acceptance Criteria

- [ ] All form fields match design layout and labels.
- [ ] Required field validation prevents empty submission.
- [ ] Email/phone format validated.
- [ ] Successful submission persists to Supabase.
- [ ] No login required for public submission.
- [ ] Submitting state prevents duplicate action.
- [ ] Success state confirms completion.
- [ ] Failure state visible, user can retry.
- [ ] Supabase error does not show as success.
- [ ] Form inputs have accessible labels.
- [ ] Validation errors linked to fields.
- [ ] No sensitive details in error messages.

## DET Traceability

DET-UX-003, DET-API-001, DET-DATA-003, DET-VAL-001, DET-STATE-002, DET-ERR-001, DET-A11Y-002, DET-SEC-002, DET-SEC-003, DET-EDGE-002
