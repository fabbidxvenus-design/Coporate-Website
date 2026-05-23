# TIP-003: Public Form Submission, Validation, and States

**Agent:** tdd-guide + frontend/backend implementer
**Model:** opus
**File ownership:** `components/public/ApplyForm.tsx`, `app/(public)/apply/**`, `app/api/applications/**`, form validation utilities
**Blocked by:** TIP-001

## Acceptance Criteria

- [ ] Apply and quick-apply form fields, labels, helper text, buttons, and spacing match design source.
- [ ] Required values are validated before success.
- [ ] Invalid email/phone-like values do not submit successfully.
- [ ] Idle, submitting, success, validation failure, and submission failure states are visible.
- [ ] Successful submissions persist through Supabase-backed behavior.
- [ ] Supabase/API failures show failure, never false success.
- [ ] Validation errors are visible and associated with relevant fields where practical.
- [ ] Error messages avoid sensitive system details.

## Context

Covers DET-UX-003, DET-API-001, DET-DATA-003, DET-VAL-001, DET-STATE-002, DET-ERR-001, DET-A11Y-002, DET-SEC-003, DET-EDGE-002, DET-TEST-002.
