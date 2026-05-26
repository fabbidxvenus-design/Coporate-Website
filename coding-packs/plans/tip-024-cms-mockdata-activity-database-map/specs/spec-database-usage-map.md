# SPEC: CMS Database Usage Map and Data Source Boundary

## [SPEC] AC-06: Database usage map marks persisted surfaces
- Given: a builder reviews the CMS database usage map
- When: deciding what needs Supabase/Postgres
- Then: jobs, news/articles, applications, settings, CV metadata/download audit, and persisted admin activity/audit log are marked database-required.

## [SPEC] AC-07: Presentation-only summaries are recomputable
- Given: dashboard summary cards are derived from persisted entities
- When: the database usage map is reviewed
- Then: purely presentational summaries are marked database-required false or documented as recomputable from database-backed records.

## [SPEC] AC-08: Mock mode does not require database access
- Given: local demo/mock mode is active
- When: CMS pages render
- Then: no Supabase/Postgres client is required and no real database read/write is attempted.

## [SPEC] AC-09: Database mode uses existing abstractions
- Given: database mode is active
- When: CMS pages need persisted data
- Then: they go through the existing database/API abstraction instead of importing mock arrays directly.

## [SPEC] AC-10: API filters are bounded if an activity route exists
- Given: CMS activity is exposed through an API route
- When: a request includes `limit`, `entityType`, or `entityId`
- Then: `limit` is bounded to 1–50, entity type is constrained to known values, and errors use the existing API envelope without leaking internals.
