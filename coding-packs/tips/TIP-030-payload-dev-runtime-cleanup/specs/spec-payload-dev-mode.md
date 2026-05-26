# SPEC: Payload Dev Runtime Mode

## AC-01: Payload mode activates with env
- Given: `PAYLOAD_SECRET` is set and `USE_MOCK_DATA` is not `'true'`
- When: `getDataSourceMode()` is called or repository methods are invoked
- Then: Mode is `'payload'` and `isPayloadDataMode()` returns `true`

## AC-02: Dev default is not mock data
- Given: Environment variables are default (nothing set in `.env.local`)
- When: App starts in non-test dev/runtime environment
- Then: `USE_MOCK_DATA` is not the implicit default; app fails clearly if Payload/Postgres env is missing instead of silently falling back to mock content

## AC-03: Missing Payload env fails clearly
- Given: `PAYLOAD_SECRET` is not set and `USE_MOCK_DATA` is `'false'`
- When: App invokes data-backed repository methods in non-test runtime
- Then: A descriptive configuration error is thrown naming the missing variable

## AC-04: Payload package is installed
- Given: Package manager commands run
- When: `pnpm install` completes
- Then: `payload` package exists in `node_modules` and can be imported

## AC-05: Payload admin mount exists
- Given: App is running in Payload mode with valid env
- When: GET request is made to `/admin`
- Then: Payload admin UI is served (or a redirect/landing exists at `/admin`)

## AC-06: No stale mock default comment in .env.example
- Given: `.env.example` file content
- When: File is reviewed
- Then: No comment/doc states `USE_MOCK_DATA=true` as the dev default; Payload/Postgres env vars are documented

## AC-07: Public API routes use repository barrel
- Given: `app/api/*` route files
- When: Routes invoke data for public CMS content (jobs, news, settings, about)
- Then: Routes use `lib/repositories` barrel, NOT `lib/db/repositories` or `lib/payload/repositories` directly

## AC-08: Old admin CRUD routes removed
- Given: `app/admin/` directory
- When: Custom admin CRUD pages exist for jobs, news, applications, settings management
- Then: These pages are removed or redirected to Payload admin; no competing management UI exists at `/admin` paths that Payload owns

## AC-09: Payload config uses DATABASE_URL
- Given: `lib/payload/config.ts` and Payload collection initialization
- When: Payload runs in dev mode
- Then: Payload database adapter uses `DATABASE_URL` from env, defaulting to `localhost:5432` pattern

## AC-10: Type-check passes
- Given: All code changes for TIP-030
- When: `pnpm type-check` runs
- Then: Zero TypeScript errors