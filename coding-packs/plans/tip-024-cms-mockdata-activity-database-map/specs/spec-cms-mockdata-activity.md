# SPEC: CMS Mock Data and Activity Feed

## [SPEC] AC-01: Dashboard uses derived CMS mock data
- Given: mock mode is active
- When: an admin opens `/admin`
- Then: dashboard metrics and recent activity are derived from shared CMS mock data matching current jobs/news/applications/settings fixtures.

## [SPEC] AC-02: CMS records reuse corporate mock IDs
- Given: existing corporate mock jobs and news exist in `lib/mock-data.ts`
- When: CMS mock data is built
- Then: CMS list records reference the same IDs/slugs/titles instead of duplicating unrelated placeholder records.

## [SPEC] AC-03: Activity items contain stable entity metadata
- Given: a CMS activity item references a job, news article, application, or settings entity
- When: rendered in recent activity
- Then: it shows the correct entity title, activity type, actor display name, deterministic timestamp, and optional transition metadata.

## [SPEC] AC-04: Mock activity generation is deterministic
- Given: tests or snapshots run multiple times
- When: CMS activity data is loaded
- Then: IDs, timestamps, and ordering remain stable without `Date.now()`, randomness, or module-load generated values.

## [SPEC] AC-05: Mutation feedback remains visible
- Given: a CMS page mutation succeeds or fails
- When: the result is shown
- Then: visible success/error feedback remains consistent with the CMS admin-shell standard.
