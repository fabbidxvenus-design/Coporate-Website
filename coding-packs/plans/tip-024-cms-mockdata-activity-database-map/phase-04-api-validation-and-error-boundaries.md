# Phase 04 — API Validation and Error Boundaries

## [CORE] Goal
Apply TIP-024 API validation/error requirements only where CMS activity or database usage surfaces cross an API/server boundary.

## [CORE] Candidate Files
- `app/api/applications/route.ts`
- `app/api/applications/[id]/route.ts`
- `app/api/news/route.ts`
- `app/api/news/[id]/route.ts`
- `app/api/settings/route.ts`
- Optional new route only if justified by existing API pattern.

## [CORE] Implementation Steps
1. Decide whether activity data needs an API route. Prefer no new route unless CMS currently fetches data client-side.
2. If a route exists or is added, validate query params:
   - `limit` bounded to 1–50;
   - `entityType` constrained to `CmsEntityType`;
   - `entityId` treated as opaque stable string.
3. Use the existing API response envelope and error helpers.
4. Prevent stack traces/database internals from leaking in API errors.
5. Ensure database mode missing configuration fails fast with the existing config error pattern.

## [GREEN] Phase Exit Criteria
- API-bound tests pass where API boundaries are touched.
- Unknown filters return typed empty results or consistent API errors.
- No broad catch blocks swallow errors silently.

## [PIVOT] If No API Boundary Is Needed
Record the decision in `.zflow/verify-report.md` and leave this phase as documentation-only. Do not create an unnecessary endpoint.

## [CONSTRAINT] Do Not
- Do not add speculative API routes.
- Do not add validation for internal static arrays.
