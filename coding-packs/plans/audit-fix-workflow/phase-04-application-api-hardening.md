# Phase 04 — Application API Hardening

## Goal

Strengthen public candidate application submission behavior without changing the approved form design.

## Requirement IDs

- `DET-API-001`
- `DET-DATA-003`
- `DET-VAL-001`
- `DET-STATE-002`
- `DET-ERR-001`
- `DET-SEC-003`
- `DET-EDGE-002`
- `DET-TEST-002`
- `DET-TEST-005`

## Current Findings

- `app/api/applications/route.ts` validates required fields, email format, file MIME type, and 5MB file limit.
- CV filename is sanitized before upload.
- Supabase upload/insert failures return user-safe errors.
- No code-level rate limit or anti-abuse layer is visible.
- In mock/no DB mode, public POST returns `Database not configured` instead of false success, which is safe but should be user-visible in form UI.

## Implementation Direction

- Preserve existing validation behavior.
- Add lightweight anti-abuse if feasible without new infrastructure.
- If app-level rate limiting is not feasible, document deployment-level requirement and ensure API shape supports it.
- Keep error messages user-safe and non-sensitive.
- Ensure frontend form displays API errors clearly.

## Tasks

1. Review `components/public/ApplyForm.tsx` and `ApplicationModal.tsx` error handling.
2. Add tests for missing fields, invalid email, invalid file type, oversized file, invalid job, and Supabase unavailable.
3. Add anti-abuse control or explicit documented handoff for deployment-level rate limiting.
4. Confirm failed API responses are visible in the public form UI.
5. Ensure successful submission is only shown after successful persistence.

## Verification

- Invalid submissions return 400 and visible UI error.
- Supabase unavailable returns failure, not success.
- Valid submission path persists and shows success when Supabase is configured.
- No sensitive system details leak to candidate-facing errors.
