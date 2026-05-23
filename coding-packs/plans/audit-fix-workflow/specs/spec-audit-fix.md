# Spec — Audit Fix Requirements

## Scenario A — CMS access is Supabase Auth gated

Given an unauthenticated user
When they open `/admin`
Then they are redirected to login
And no CMS content is usable.

Given a failed Supabase login
When the user submits the login form
Then CMS access is not granted
And a visible login error is shown.

Given an authenticated admin Supabase session
When the user opens `/admin`
Then the CMS dashboard is available.

Given a logged-out or expired session
When the user opens a CMS route
Then CMS access is blocked.

## Scenario B — Mock admin bypass is not production authorization

Given production-like configuration
When a request includes `mock_admin=true`
Then `/admin` access is not granted solely because of that cookie.

Given dev mock mode is intentionally enabled
When dev mock auth is used
Then it is explicitly guarded and consistent between middleware and server page guards.

## Scenario C — CMS data supports design-equivalent pages

Given live Supabase CMS data is unavailable in intended mock/no-live-data mode
When an authenticated admin opens CMS list/dashboard pages
Then tables/cards show design-equivalent seeded/existing data
And visual density remains suitable for 1440px and 1920px review.

## Scenario D — Application submission does not silently fail

Given invalid required fields, email, file type, file size, or job id
When a candidate submits the public form
Then the API rejects the request
And the UI shows a visible failure state.

Given Supabase persistence is unavailable
When a candidate submits the public form
Then the app does not show false success.

Given valid input and configured Supabase
When a candidate submits the form
Then the application is persisted and a success state is shown.

## Scenario E — Safe implementation remains safe

Given public detail pages render rich job/news content
When HTML content is displayed
Then sanitized HTML is used
And no unsafe design-file wholesale injection or runtime design CDN dependency is introduced.
