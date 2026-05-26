# Phase 04 — Runtime Flag Alignment

## Objective

Make runtime data-source behavior explicit and consistent:

- `USE_MOCK_DATA=true` uses mock/hardcoded data only.
- `USE_MOCK_DATA=false` uses SQLite-backed data where the page supports DB mode.

## Scope

Audit and update public data-loading paths only where necessary for TIP-020 acceptance.

Likely files to inspect:

- `app/(public)/page.tsx`
- `app/(public)/jobs/page.tsx`
- `app/(public)/news/page.tsx`
- `app/(public)/about/page.tsx`
- `app/[locale]/page.tsx`
- `app/[locale]/jobs/page.tsx`
- `app/[locale]/news/page.tsx`
- `app/[locale]/about/page.tsx`
- existing mock-data loaders under `lib/`
- SQLite repositories under `lib/db/repositories/`

## Tasks

1. Inventory current data source per page.
2. Identify pages that already use SQLite while `USE_MOCK_DATA=true`.
3. Add the smallest data-loader switch needed to enforce the flag rule.
4. Preserve visual composition and route structure.
5. Do not add feature flags beyond the existing mock/DB mode flag.
6. Do not reintroduce Supabase clients, Supabase env vars, or Supabase generated types.

## Required evidence

- A short table in `final-report.md` showing each audited page and selected data source in mock mode vs DB mode.
- Targeted tests or manual smoke evidence showing mock mode does not require `.data/sqlite.db`.
- DB mode smoke evidence after import for supported pages.

## Exit criteria

- Mock mode and DB mode behavior are documented and testable.
- Public UI layout remains unchanged.
