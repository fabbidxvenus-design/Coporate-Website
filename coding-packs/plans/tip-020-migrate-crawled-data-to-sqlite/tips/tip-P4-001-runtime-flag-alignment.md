# Sub-TIP P4-001 — Runtime Flag Alignment

## Parent

- TIP-020: Migrate Crawled Data to SQLite
- Phase: `phase-04-runtime-flag-alignment.md`

## Task

Audit and minimally update public data-loading paths so `USE_MOCK_DATA=true` means mock-only and `USE_MOCK_DATA=false` means SQLite-backed where supported.

## Files to inspect

- `app/(public)/page.tsx`
- `app/(public)/jobs/page.tsx`
- `app/(public)/news/page.tsx`
- `app/(public)/about/page.tsx`
- `app/[locale]/page.tsx`
- `app/[locale]/jobs/page.tsx`
- `app/[locale]/news/page.tsx`
- `app/[locale]/about/page.tsx`
- `lib/db/repositories/*`
- existing mock-data modules under `lib/`

## Constraints

- Do not redesign UI.
- Do not change route structure.
- Do not add Supabase imports or Supabase environment variables.
- Do not change admin auth/session behavior.

## Acceptance criteria

- Given `USE_MOCK_DATA=true`, when supported public pages load, then they do not require `.data/sqlite.db`.
- Given `USE_MOCK_DATA=false` after import, when supported public pages load, then they read imported SQLite data.
- Given homepage remains hardcoded, when it is intentionally out of DB-mode scope, then the decision is recorded in `final-report.md`.

## Verification

- Fill the runtime flag audit table in `final-report.md`.
- Run targeted tests if data-source helpers are added.
- Smoke affected pages if runtime rendering changes.
