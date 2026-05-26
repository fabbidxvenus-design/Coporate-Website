# TIP-030: Payload Dev Runtime Cleanup

## HEADER
- TIP-ID: TIP-030
- Project: Coporate_Website
- Module: CMS Runtime / Payload Admin / Data Source
- Priority: P0
- Depends on: TIP-029
- Estimated: L

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: authoritative target stack is `coding-packs/product/tech-stack.md`: Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers / Server Actions, Supabase Postgres, Supabase Auth/Storage, Vercel-compatible deployment. For this TIP, Payload CMS becomes the active CMS UI/API layer while Postgres on port `5432` is the dev database.
- Key files to read first:
  - `lib/config/data-source.ts`
  - `lib/repositories/index.ts`
  - `lib/payload/config.ts`
  - `lib/payload/client.ts`
  - `lib/payload/repositories/index.ts`
  - `app/api/**/route.ts`
  - `app/admin/**` or existing CMS/admin route group files
  - `coding-packs/payload/setup.md`
  - `coding-packs/payload/content-types.md`
  - `.env.example`
  - `package.json`
  - `next.config.mjs`
- Patterns to follow:
  - Preserve public site UI and route structure from existing Next.js implementation.
  - Use `lib/repositories/index.ts` as the application-facing data boundary.
  - Use Payload collections as the CMS admin UI/API source of truth.
  - Keep existing domain repository method names unless a compile-safe rename is required.
  - Preserve `.design` visual fidelity for the public site; do not redesign candidate-facing screens.

## APPLICABLE STANDARDS
Builder MUST conform to:
- [cms/admin-shell](../standards/cms/admin-shell.md) — protected CMS shell, navigation, management UX, and mutation feedback.
- [database/supabase-saas](../standards/database/supabase-saas.md) — database, auth, RLS/storage principles; adapt database runtime to local Postgres `5432` for Payload dev operation.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — jobs, applications, and news content model rules.
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — preserve current site UI and `.design` visual composition.
- [ui/design-tokens](../standards/ui/design-tokens.md) — preserve Professional Tech Hub design tokens and visual fidelity.

## TASK
Clean the current CMS runtime so development uses Payload CMS with local PostgreSQL on port `5432` and no mock-data mode. Remove or disable the old custom CMS UI/API surfaces that duplicate Payload admin capabilities, while keeping the existing public site UI and public routes connected through the repository layer to Payload-backed content.

The output should be a dev-operable app where Payload admin UI is the CMS interface, public site routes render existing designs from Payload data, and application/CV/security boundaries remain explicit. This TIP is not a visual redesign task.

## SPECIFICATIONS

### Business Rules
1. Payload CMS is the active CMS UI/API for dev operations.
2. Local dev database must be PostgreSQL via `DATABASE_URL`, defaulting in docs/examples to port `5432`.
3. Mock data mode must no longer be the default runtime for dev operation.
4. Remove or decommission old custom CMS UI routes/pages/components that duplicate Payload admin management for jobs, news/articles, applications, settings, dashboard, or legacy CMS shells.
5. Preserve the current public site UI and route structure, including localized candidate pages.
6. Public site data access must go through `lib/repositories/index.ts`, not direct Payload calls inside UI components.
7. Public job/news reads must expose only published content.
8. Candidate application submission must persist to Payload/Postgres-backed storage through the existing application boundary.
9. CV/private applicant metadata must not become publicly readable.
10. Payload admin setup, collections, and env docs must be sufficient for a developer to run the CMS locally.
11. Remove stale Strapi/old-CMS references that remain in code, tests, docs, env examples, scripts, or comments.
12. Keep `USE_MOCK_DATA` only if needed for tests or emergency fallback, but it must not be documented or configured as the dev default. If retained, tests must prove it is off by default.
13. Do not remove public candidate-facing pages or their visual components.
14. Do not change color/layout/image QC work unless required to keep the public site compiling.

### Implementation Targets
1. Payload runtime/admin:
   - Add or complete embedded Payload v3 configuration and admin route mounting for Next.js if missing.
   - Define collections for jobs, articles/news, applications, media, site settings, and about pages using the content model in `coding-packs/payload/content-types.md`.
   - Configure Payload database adapter for PostgreSQL using `DATABASE_URL`.
   - Ensure local dev can target `postgres://...:5432/...`.
2. Data source config:
   - Update `lib/config/data-source.ts` so dev/runtime mode prefers Payload when required env is present.
   - Remove assumptions that mock mode is the fresh-checkout default for dev operation.
   - Ensure missing Payload/Postgres env fails clearly in non-test dev/runtime paths instead of silently falling back to mock content.
3. Public API/routes:
   - Audit `app/api/**` and keep only routes still needed by the public site or external form/webhook flows.
   - Remove custom admin CRUD APIs that are now superseded by Payload admin/API, unless still required by public site behavior.
   - Keep `/api/revalidate` only if Payload webhook revalidation uses it; validate its secret handling.
4. Old CMS UI cleanup:
   - Delete or redirect old custom CMS pages/components under `app/admin/**` that duplicate Payload admin UI.
   - If `/admin` is owned by Payload, do not keep a conflicting custom Next.js admin route at the same path.
   - If a legacy admin login/dashboard path remains for compatibility, make it a clear redirect to Payload admin, not a duplicate management UI.
5. Environment/docs:
   - Update `.env.example` with Payload/Postgres dev variables.
   - Update `coding-packs/payload/setup.md` with local Postgres `5432` run instructions.
   - Document the command sequence for install, migrate/init, dev server, and Payload admin login.
6. Tests:
   - Add tests that detect no active old CMS UI/API imports/routes remain for custom admin CRUD.
   - Add tests that dev data-source defaults do not use mock data.
   - Add tests that public repositories still route through Payload mode and public-only published filters are preserved.

### Validation
1. Environment variables:
   - Required: `PAYLOAD_SECRET`, `DATABASE_URL`, `PAYLOAD_URL` or equivalent runtime URL.
   - Example dev `DATABASE_URL` must point to PostgreSQL port `5432`.
   - Secrets must be placeholders in docs/examples, never real credentials.
2. Payload collections:
   - Jobs require slug, localized title/department/location/employment type/salary, skills, localized description/requirements/benefits, status, publish date, optional image.
   - Articles require slug, localized title/excerpt/body, cover/content images, category/tags, status, author, publish date.
   - Applications require job reference/id, full name, email, phone, optional portfolio/message, status, and CV metadata if supported.
   - Media uploads must restrict CV MIME types and image file constraints as documented.
3. Public site:
   - Existing public routes must compile and continue to render through current UI components.
   - Public jobs/news must filter unpublished statuses.
4. Old CMS cleanup:
   - No stale imports from `lib/strapi/*` or deleted old CMS modules.
   - No custom admin CRUD route/page should remain unless explicitly justified in code by current public-site need.

### Error Handling
1. If Payload env is missing in dev/non-test runtime, fail with a clear configuration error naming the missing variable.
2. If `DATABASE_URL` is missing or does not point to a valid PostgreSQL connection, show a clear startup/runtime error; do not silently fall back to mock data.
3. If Payload returns an error for public content reads, surface a safe server-side error and avoid leaking credentials or raw connection strings.
4. If application submission fails, return a user-safe error through the existing response envelope or route pattern.
5. If revalidation secret is missing/mismatched, return 401 without disclosing expected secret values.

## ACCEPTANCE CRITERIA
- Given a fresh dev environment with `DATABASE_URL` pointing to PostgreSQL on port `5432`, `PAYLOAD_SECRET`, and `PAYLOAD_URL` configured, When the developer runs the app, Then Payload CMS admin UI is available and uses PostgreSQL instead of mock data.
- Given the app is running in dev mode, When a developer opens the CMS admin path, Then the Payload admin UI is the management interface and old custom CMS management screens are not served as competing CRUD UIs.
- Given jobs/news exist in Payload with mixed statuses, When a candidate visits public jobs/news pages, Then only published content is rendered through the existing public site UI.
- Given a candidate submits an application, When the request is valid, Then the application persists through the Payload/Postgres-backed repository path and private CV/applicant metadata is not publicly exposed.
- Given `USE_MOCK_DATA` is unset in dev, When repositories resolve their data source, Then they do not select mock data by default.
- Given Payload/Postgres env is missing in non-test dev runtime, When a data-backed route is invoked, Then the app fails clearly instead of falling back to stale mock content.
- Given the codebase is searched for stale CMS references, When validation runs, Then no active Strapi or old custom CMS UI/API references remain except historical TIP docs or explicitly archived docs.
- Given validation commands run, When `pnpm type-check`, `pnpm build`, and relevant Vitest tests complete, Then all pass.

## CONSTRAINTS
- DO NOT: redesign public site UI, change visual tokens, or alter `.design` parity unless strictly necessary for compile/runtime correctness.
- DO NOT: reintroduce Strapi, SQLite, or Docker-only assumptions.
- DO NOT: make mock data the dev default.
- DO NOT: call Payload directly from public UI components; route through repository/server boundaries.
- DO NOT: expose CV files, application PII, admin tokens, `PAYLOAD_SECRET`, or database credentials to the browser.
- DO NOT: keep duplicate CMS admin CRUD screens if Payload admin owns that workflow.
- REUSE: `lib/repositories/index.ts`, `lib/payload/*`, existing public components/pages, existing validation patterns, existing API response envelope where present.
- REUSE: `coding-packs/payload/*` as the content model baseline.
- SKIP: production deployment hardening beyond dev-operable configuration.
- SKIP: advanced role matrix, multi-tenant CMS, email notifications, and visual QC fixes unrelated to Payload runtime cleanup.

## VALIDATION COMMANDS
Run at minimum:

```bash
pnpm type-check
pnpm build
pnpm vitest run tests/unit/lib/payload tests/unit/lib/repositories tests/data-source-boundary.spec.ts
```

If Payload admin routes are implemented and a dev database is available, also run a manual smoke test:

```bash
pnpm dev
# Open Payload admin path in browser
# Verify public jobs/news pages load from Payload-backed data
```

## QUALITY GATE: SELF-REVIEW
- Completeness: TIP includes context, standards, task, business rules, validation, error handling, acceptance criteria, constraints, and validation commands.
- Cross-reference: Aligns with TIP-029 Payload direction, `coding-packs/payload/*` content model docs, task graph requirement to replace Strapi, and user request to stop using mock data for dev operation.
- Standards coverage: CMS admin shell, database baseline, recruitment content model, frontend preservation, and design tokens are explicitly listed and applied.
- Ambiguity check: Builder has concrete files to inspect, files/surfaces to remove or update, env behavior to enforce, and tests to add.
- Declared gaps: Exact Payload v3 adapter package and admin route mounting details must be confirmed against installed dependency versions during implementation. If Payload packages are missing, builder must add the official packages needed for embedded Payload + PostgreSQL adapter rather than hand-rolling CMS behavior.
