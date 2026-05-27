# TIP-031: Payload + PostgreSQL Bootstrap and Seed

## HEADER
- TIP-ID: TIP-031
- Project: Coporate_Website
- Module: Payload CMS / PostgreSQL / Public Site Data Runtime
- Priority: P0
- Depends on: TIP-030
- Estimated: L

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: authoritative stack from `coding-packs/product/tech-stack.md` is Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers / Server Actions, Supabase Postgres, Supabase Auth, Supabase Storage, Vercel + Supabase deployment. Current implementation has shifted CMS runtime to Payload CMS v3 embedded in Next.js with PostgreSQL via `DATABASE_URL`.
- Key files to read first:
  - `.env.example`
  - `.env.local`
  - `package.json`
  - `server.js`
  - `lib/config/data-source.ts`
  - `lib/payload/config.ts`
  - `lib/payload/embedded-config.ts`
  - `lib/payload/client.ts`
  - `lib/payload/repositories/jobs.ts`
  - `lib/payload/repositories/news.ts`
  - `lib/payload/repositories/applications.ts`
  - `lib/payload/repositories/settings.ts`
  - `lib/payload/repositories/about.ts`
  - `lib/db/migrate.ts`
  - `lib/db/seed.ts`
  - `scripts/import-crawled-data.mjs`
  - `coding-packs/payload/setup.md`
- Patterns to follow:
  - Repository boundary stays in `lib/repositories/index.ts`; public pages must not import Payload or Postgres directly.
  - `USE_MOCK_DATA=true` remains mock-only and must not connect to Postgres or Payload.
  - Non-mock local dev uses `PAYLOAD_SECRET` + `DATABASE_URL` and serves Payload admin at `/admin` through `server.js`.
  - Seed/import code must be idempotent.

## APPLICABLE STANDARDS
Builder MUST conform to these standards where still relevant after the Payload migration:
- [database/supabase-saas](../standards/database/supabase-saas.md) — database/auth/storage baseline, environment documentation, public published reads, protected writes. Interpret the Postgres/RLS guidance as the durable database/security baseline even though Payload now owns CMS schema/admin.
- [cms/admin-shell](../standards/cms/admin-shell.md) — protected CMS/admin behavior and real-data management UX. Payload admin replaces the previous custom shell.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — jobs, applications, news content model rules and public published-only visibility.

## TASK
Implement the missing local operational path for testing the public site, Payload CMS, and PostgreSQL together. The builder must provide a repeatable bootstrap flow that creates/validates a local PostgreSQL database, initializes Payload collections, seeds usable content from existing mock/crawled data, and proves that public pages read the seeded Payload/Postgres content through repository boundaries.

This TIP is about operational connectivity and seedability, not visual redesign. After this TIP, a developer should be able to run one documented setup sequence, open `http://localhost:3000` for the public site, open `http://localhost:3000/admin` for Payload CMS, create/edit content in Payload, and see published content on public routes.

## SPECIFICATIONS

### Business Rules
1. Local dev must support a PostgreSQL instance on port `5432` with a clear database name, username, password, and `DATABASE_URL`.
2. `.env.local` must be updated or documented so local Payload dev uses:
   - `USE_MOCK_DATA=false` or unset
   - `PAYLOAD_SECRET=<generated 32+ char secret>`
   - `PAYLOAD_URL=http://localhost:3000`
   - `DATABASE_URL=postgres://<user>:<password>@localhost:5432/<database>`
   - `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
3. Payload must be initialized with an explicit PostgreSQL adapter/config compatible with the installed Payload v3 package version. Do not rely on vague assumptions if the current code path does not actually connect to Postgres.
4. The Payload collection definitions must support the data that public repositories expect:
   - jobs: slug, localized title/description/requirements/benefits/location/department/employment type/salary range, skills, status, published_at, image
   - articles/news: slug, localized title/excerpt/body/author, cover image, category, tags, status, published_at
   - applications: job reference or job_id, candidate contact fields, status, message/portfolio/CV metadata where supported
   - site settings and about content sufficient for current public pages
5. Seed/import must be idempotent. Running the seed command twice must not create duplicate jobs/articles/settings/about records.
6. Seed data should reuse existing authoritative sources in this order:
   - existing `lib/mock-data` content
   - existing crawled data and images under `coding-packs/crawlings/`
   - existing Postgres seed/import logic in `lib/db/seed.ts` only if it can be adapted without preserving obsolete direct-db runtime assumptions
7. Public routes must continue to call repository boundaries, not Payload client APIs directly.
8. Public routes must only render published Payload content.
9. Mock mode must remain isolated: `USE_MOCK_DATA=true` must not require Postgres, Payload, or migrations.
10. The setup guide must include exact commands for Windows/PowerShell and Docker-based Postgres if local Postgres is unavailable.

### Validation
1. Validate required environment variables at startup or before seed:
   - missing `PAYLOAD_SECRET` in non-mock mode produces a clear actionable error
   - missing/invalid `DATABASE_URL` produces a clear actionable error
2. Validate database connectivity before attempting seed.
3. Validate Payload collection availability before seed writes.
4. Validate seed source files exist before import and print clear skip/error messages.
5. Validate generated `PAYLOAD_SECRET` is not the placeholder value from `.env.example`.
6. Validate seeded content includes at least:
   - 1 published job
   - 1 draft or non-published job
   - 1 published article
   - site settings/about content used by public pages when applicable

### Error Handling
1. If Postgres is not running on port 5432, the setup command must fail with a message that includes how to start it.
2. If the database does not exist, either create it through the documented Docker/local command or print exact manual creation instructions.
3. If Payload cannot initialize, fail fast with the original error plus a concise hint about checking `PAYLOAD_SECRET`, `DATABASE_URL`, and package versions.
4. If seed partially fails, do not silently continue. Return a non-zero exit and preserve enough logs to identify which collection failed.
5. If public routes return empty content after seed, smoke tests must fail with a message that distinguishes “no published content” from “server/database unavailable”.

## ACCEPTANCE CRITERIA
- Given a fresh checkout with no `.env.local`, When the developer follows the updated setup guide, Then they can create a valid `.env.local` for Payload + Postgres without guessing any variable.
- Given Docker is available and no local Postgres is running, When the developer runs the documented bootstrap command, Then Postgres starts on `localhost:5432` with a working `DATABASE_URL`.
- Given `USE_MOCK_DATA=false`, `PAYLOAD_SECRET`, and `DATABASE_URL` are configured, When `pnpm dev:payload` starts, Then `http://localhost:3000/admin` loads Payload admin instead of the old custom CMS UI.
- Given an empty local Payload/Postgres database, When the seed command runs, Then jobs, articles/news, settings/about baseline content are created idempotently.
- Given seed has run, When the public site is opened at `/vi/jobs`, Then at least one published seeded job is visible and draft/non-published jobs are not visible.
- Given seed has run, When the public site is opened at `/vi/news`, Then at least one published seeded article is visible.
- Given an admin creates or publishes a job in Payload admin, When the public jobs route is refreshed, Then the published job appears through the existing repository boundary.
- Given `USE_MOCK_DATA=true`, When public pages and tests run without Postgres, Then they still use mock data and never initialize Payload/Postgres.
- Given the seed command runs twice, When the database is inspected through Payload/admin or smoke tests, Then duplicate slugs/records are not created.
- Given `npx vitest run` and `npx tsc --noEmit` are executed after implementation, Then both pass.

## CONSTRAINTS
- DO NOT reintroduce Strapi, Supabase-specific runtime assumptions, SQLite, or custom `/admin` CMS pages.
- DO NOT make public pages import `payload`, `postgres`, or direct database clients; use repository boundaries.
- DO NOT set `USE_MOCK_DATA=true` as dev default for Payload/Postgres setup.
- DO NOT hardcode real secrets, database passwords, or machine-specific absolute paths into committed files.
- DO NOT seed duplicate content on repeated runs.
- DO NOT redesign public UI, CMS UI, colors, layouts, or visual components in this TIP.
- DO NOT delete mock mode; it remains required for tests/emergency/fresh no-DB behavior.
- REUSE existing mock/crawled content and repository conversion helpers where practical.
- REUSE existing `coding-packs/payload/setup.md` and `.env.example` documentation style.
- REUSE existing test style under `tests/unit/lib/payload/` and `tests/unit/lib/admin/`.
- SKIP production deployment, Supabase cloud provisioning, email notifications, analytics, and advanced applicant workflow automation.

## IMPLEMENTATION NOTES
1. First verify the installed Payload v3 database adapter requirements. If the project needs `@payloadcms/db-postgres`, add it explicitly and update lockfile.
2. Consider adding scripts such as:
   - `dev:db` or documented Docker command for local Postgres
   - `payload:seed` for idempotent Payload collection seed
   - `payload:smoke` for local connectivity checks
3. Prefer one clear seed entrypoint over scattered manual steps.
4. Add a lightweight smoke test that can run only when `DATABASE_URL` and `PAYLOAD_SECRET` are present; skip gracefully in CI/no-DB mode.
5. Update `.env.example` only with placeholders, never generated secrets.

## VALIDATION COMMANDS
- `npx tsc --noEmit`
- `npx vitest run`
- `pnpm dev:payload`
- `pnpm payload:seed` (or the final implemented seed command)
- Manual smoke:
  - open `http://localhost:3000/admin`
  - open `http://localhost:3000/vi/jobs`
  - open `http://localhost:3000/vi/news`

## QUALITY GATE: SELF-REVIEW
- Completeness: Covers the user's stated gap: no Postgres setup, no database, no seed data, and uncertainty about how public site + Payload CMS + Postgres connect.
- Cross-reference: Builds on TIP-030 Payload dev runtime cleanup, repository-boundary architecture, `coding-packs/payload/setup.md`, `lib/payload/embedded-config.ts`, and existing PostgreSQL seed/import attempts in `lib/db/seed.ts`.
- Acceptance criteria quality: Includes setup, bootstrap, admin access, public published reads, mock isolation, idempotent seed, and verification commands.
- Standards alignment: Applies database, CMS, and recruitment content standards while noting that Payload has superseded the original custom Supabase CMS shell.
- Gaps: Exact Payload v3 Postgres adapter package/API must be verified during implementation against installed versions; this is intentionally an implementation requirement, not assumed in the TIP.
- Action needed: Implement `coding-packs/tips/TIP-031-payload-postgres-bootstrap-seed.md`, then run type checks, unit tests, Payload/Postgres seed, and browser smoke tests.