# SPEC: Payload + PostgreSQL Bootstrap

## AC-01: Environment variables validated at startup
- Given: `USE_MOCK_DATA` is not `true`
- When: application or seed script starts
- Then: `PAYLOAD_SECRET` must be set and not the placeholder value from `.env.example`
- And: `DATABASE_URL` must be set and contain a valid Postgres connection string

## AC-02: PostgreSQL connection works on port 5432
- Given: `DATABASE_URL` is configured pointing to a local Postgres on 5432
- When: a lightweight connection test runs
- Then: the connection succeeds without timeout or auth errors

## AC-03: Payload can initialize with DATABASE_URL
- Given: `PAYLOAD_SECRET` and `DATABASE_URL` are set, Postgres is reachable
- When: `server.js` starts (`payload.init()` is called)
- Then: Payload initializes without throwing a database-adapter or secret error
- And: `payload.express` middleware is available for `/admin` routing

## AC-04: Payload admin accessible at /admin route group
- Given: Payload has initialized with a local Postgres backend
- When: `http://localhost:3000/admin` is requested
- Then: Payload admin UI loads (not a 404 or redirect to public 404 page)

## AC-05: Payload package and PostgreSQL adapter are installed
- Given: project dependencies are installed
- When: `node_modules/payload` and `node_modules/@payloadcms/db-postgres` (or equivalent) are checked
- Then: both packages exist in `node_modules`

## AC-06: USE_MOCK_DATA=false enables Payload mode (not mock)
- Given: `USE_MOCK_DATA=false` is set
- When: `getDataSourceMode()` is called outside test environment
- Then: mode is `payload` (not `mock`) when `PAYLOAD_SECRET` is set
- And: mock data is NOT used for repository reads

## AC-07: Missing PAYLOAD_SECRET in non-mock mode produces actionable error
- Given: `USE_MOCK_DATA=false` and `PAYLOAD_SECRET` is not set
- When: application or seed starts
- Then: a clear error message is produced that mentions `PAYLOAD_SECRET` and points to setup docs
- And: the process exits with non-zero code