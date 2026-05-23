# Phase 03 — Contact Data Contract

**Mode:** plan-supervised  
**Gate:** RED → GREEN  
**Depends on:** Phase 01, Phase 02

## Goal

Define and implement the server-side data contract for validated contact submissions.

## RED Gate

Create failing specs/tests for:

1. Required fields: name, email, subject, message, locale.
2. Optional length-limited fields: phone, company.
3. Email syntax validation.
4. Message max length validation.
5. Unsupported locale rejection.
6. Valid submission persists with `locale`, `status`, `source`, and timestamp metadata.
7. Supabase insertion failure returns a safe localized error.
8. Anti-abuse rejection does not persist data.

## Execute Steps

1. Add or adapt contact validation schema.
2. Add Supabase migration for `contact_submissions` if no equivalent table exists.
3. Enable RLS for `contact_submissions`.
4. Add safe insert path through server action or route handler.
5. Add admin-read policy only if the current admin profile/RLS pattern makes it straightforward; otherwise keep admin UI out of scope but preserve future compatibility.
6. Add localized error mapping for validation and persistence failures.
7. Add anti-abuse boundary using the existing application form pattern where available.

## GREEN Gate

- Validation tests pass.
- Persistence tests pass with mocked or local Supabase pattern used elsewhere in the repo.
- Migration matches project naming and RLS conventions.
- No contact data is logged to console or stored client-only.

## Security Notes

- Treat contact submissions as user-provided personal data.
- Do not expose raw database errors.
- Validate at the server boundary even if client-side validation exists.
