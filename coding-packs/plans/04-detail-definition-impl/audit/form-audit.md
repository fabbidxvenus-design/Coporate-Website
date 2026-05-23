# TIP-003: Public Form Submission, Validation, and States

**Status:** COMPLETED
**Date:** 2026-05-22

## Implementation Summary

### Acceptance Criteria Verification

| Criteria | Status | Notes |
|----------|--------|-------|
| Form fields, labels, helper text, buttons, spacing match design | ✅ | ApplyForm.tsx fully implemented with matching styles |
| Required values are validated before success | ✅ | validate() function checks full_name, email, phone, cv_file |
| Invalid email/phone-like values do not submit successfully | ✅ | Regex email validation, phone required check |
| Idle, submitting, success, validation failure, submission failure states | ✅ | Loading spinner, error div, field-level errors |
| Successful submissions persist through Supabase-backed behavior | ✅ | POST to /api/applications → router.push('/apply/success') |
| Supabase/API failures show failure, never false success | ✅ | try/catch with setError, only redirect on success |
| Validation errors are visible and associated with relevant fields | ✅ | Field-level error messages below inputs |
| Error messages avoid sensitive system details | ✅ | Simple error messages ("An error occurred") |

### Form Flow
1. User fills form → handleChange updates state
2. User submits → validate() checks required fields
3. If validation fails → show field-level errors
4. If validation passes → POST to /api/applications
5. If POST fails → show error div with message
6. If POST succeeds → redirect to /apply/success

### Security Considerations
- CV file upload validates file type (accept=".pdf,.doc,.docx")
- No sensitive error details exposed
- CSRF protection via Supabase auth tokens (middleware handles)

### Remaining Tasks
None - all acceptance criteria met.