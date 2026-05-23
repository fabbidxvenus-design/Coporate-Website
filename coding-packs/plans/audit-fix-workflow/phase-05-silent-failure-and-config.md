# Phase 05 — Silent Failure and Config Validation

## Goal

Make auth/config failures deterministic and diagnosable while keeping client-facing errors safe.

## Requirement IDs

- `DET-ERR-001`
- `DET-ERR-002`
- `DET-ERR-003`
- `DET-EDGE-002`
- `DET-EDGE-003`
- `DET-NFR-002`

## Current Findings

- `lib/auth.ts` catches all errors and returns null.
- `getSession()` catches all errors and returns null.
- Some Supabase placeholder/null-client paths can make real mode appear partially functional.
- `.env.local` can have `USE_MOCK_DATA=false` while credentials are placeholders.

## Implementation Direction

- Add a small environment validation helper for Supabase configuration.
- When `USE_MOCK_DATA=false`, placeholder/missing Supabase values should fail clearly on server-side paths.
- Keep client-facing messages generic and user-friendly.
- Log server-side context for auth/config failures.
- Avoid throwing raw Supabase/config internals to browser responses.

## Tasks

1. Define expected config behavior for mock mode vs Supabase mode.
2. Add or refactor helper for Supabase environment validity.
3. Replace silent auth catches with explicit logging and deterministic null/redirect behavior.
4. Ensure public pages do not silently mask real production misconfiguration.
5. Update tests for placeholder config detection.

## Verification

- `USE_MOCK_DATA=false` plus placeholder credentials is detected.
- Login/auth failures are visible to user but do not leak secrets.
- Server logs include enough context for diagnosis.
- Build and type-check pass.
