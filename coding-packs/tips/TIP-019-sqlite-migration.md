# TIP-019: SQLite Migration for Public Site and CMS

## HEADER
- TIP-ID: TIP-019
- Project: Coporate_Website
- Module: Backend persistence / public site / CMS admin
- Priority: P0
- Depends on: TIP-002, TIP-003, TIP-005, TIP-006, TIP-007, TIP-008, TIP-011, TIP-015
- Estimated: XL

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: Existing product tech stack says Next.js App Router + TypeScript + Tailwind + Next.js Route Handlers/Server Actions with Supabase Postgres/Auth/Storage. This TIP intentionally supersedes the Supabase persistence portion and migrates runtime data access to SQLite while preserving the existing Next.js/UI stack.
- Key files to read first:
  - `package.json`
  - `.env.example`
  - `types/database.ts`
  - `lib/supabase/server.ts`
  - `lib/supabase/admin.ts`
  - `lib/supabase/client.ts`
  - `lib/supabase/index.ts`
  - `lib/auth.ts`
  - `middleware.ts`
  - `lib/mock-data.ts`
  - `app/api/auth/signin/route.ts`
  - `app/api/auth/signout/route.ts`
  - `app/api/applications/route.ts`
  - `app/api/applications/[id]/route.ts`
  - `app/api/contact/route.ts`
  - `app/api/news/route.ts`
  - `app/api/news/[id]/route.ts`
  - `app/api/settings/route.ts`
  - `app/(public)/jobs/page.tsx`
  - `app/(public)/jobs/[slug]/page.tsx`
  - `app/(public)/news/page.tsx`
  - `app/(public)/news/[slug]/page.tsx`
  - `app/admin/page.tsx`
  - `app/admin/jobs/page.tsx`
  - `app/admin/news/page.tsx`
  - `app/admin/news/[id]/edit/page.tsx`
  - `app/admin/applications/page.tsx`
  - `components/admin/ArticleForm.tsx`
  - `components/admin/ApplicationDetail.tsx`
  - `components/public/ApplyForm.tsx`
  - `components/public/ApplicationModal.tsx`
- Patterns to follow:
  - Keep public pages server-rendered where they are server-rendered today.
  - Keep existing public/CMS visual composition unchanged.
  - Preserve existing mock-data fallback semantics for fresh checkout where applicable.
  - Use a small repository/data-access layer so pages and API routes do not import SQLite driver code directly.

## APPLICABLE STANDARDS
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — jobs, applications, news, settings content model and public published-only visibility still apply.
- [cms/admin-shell](../standards/cms/admin-shell.md) — protected CMS shell and visible mutation feedback still apply.
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — preserve converted visual composition; this TIP must not redesign UI.
- [database/supabase-saas](../standards/database/supabase-saas.md) — superseded for database/auth/storage technology by this TIP. Reuse the same security intent: private candidate data, public published reads only, admin-only mutations, documented environment variables.

## TASK
Migrate the application persistence layer from Supabase to SQLite for both the public corporate recruitment site and the CMS/admin site. Replace Supabase table reads/writes, auth session checks, and CV/storage assumptions with local SQLite-backed equivalents while preserving current routes, UI behavior, public visibility rules, bilingual pages, and admin workflows.

## SPECIFICATIONS

### Business Rules
1. Use SQLite as the canonical local database for jobs, news articles, applications, contact submissions, site settings, and admin users/sessions.
2. Public pages must only show published jobs and published news.
3. CMS pages must be protected by admin authentication before showing `/admin/*` content.
4. CMS mutations for jobs, news, applications, and settings must persist to SQLite and show visible success/error feedback.
5. Application submissions must persist candidate metadata and CV metadata to SQLite.
6. CV files must be stored outside the public web root unless the existing implementation intentionally stores metadata only; never expose arbitrary uploaded files through public URLs.
7. Existing mock-data behavior must remain available for local fresh-checkout/demo mode if the SQLite DB is absent or explicitly disabled by env config.
8. Existing public route shapes must not change: `/vi/jobs`, `/ja/jobs`, `/vi/news`, `/ja/news`, `/admin/*`, and existing API endpoints must remain compatible unless this TIP explicitly updates their internal implementation.
9. Existing database-like field names can be preserved at the repository boundary to minimize component churn, but Supabase-specific generated types must be replaced or abstracted.
10. The migration must remove Supabase as a runtime requirement for public and CMS flows covered by this TIP.

### Data Model
Implement SQLite schema/migrations for at least:
1. `admin_users`: id, email, password_hash or approved auth credential representation, role, created_at, updated_at.
2. `admin_sessions`: id/session_token_hash, admin_user_id, expires_at, created_at.
3. `jobs`: id, slug, title, department, location, employment_type, salary_min, salary_max, currency, skills JSON/text, description, requirements, benefits, status, published_at, closed_at, created_at, updated_at.
4. `news_articles`: id, slug, title, excerpt, body, cover_image_url, category, tags JSON/text, status, author, published_at, created_at, updated_at.
5. `applications`: id, job_id, candidate_name, email, phone, portfolio_url, message, cv_file_name, cv_file_path or cv_storage_key, cv_mime_type, cv_size, source, status, created_at, updated_at.
6. `contact_submissions`: id, locale, name, email, phone, company, subject, message, status, created_at.
7. `site_settings`: key, value JSON/text, updated_at.
8. Seed records equivalent to current mock/public demo content so public and CMS screens render meaningful data after migration.

### Implementation
1. Add a SQLite dependency appropriate for Next.js server runtime, preferring a synchronous server-only driver such as `better-sqlite3` unless project constraints require an async alternative.
2. Create `lib/db/*` modules for connection, migrations, seed, repositories, and type-safe row mapping.
3. Ensure SQLite modules are server-only and are not imported by client components.
4. Replace Supabase clients in server pages and API routes with repository calls.
5. Replace `types/database.ts` usage with local domain types or generated SQLite row types.
6. Replace Supabase auth middleware with cookie/session based admin auth backed by SQLite.
7. Update `.env.example` with SQLite database path, upload path, admin bootstrap variables, and any mock-data flags.
8. Update package scripts if needed: database migrate, seed, reset, and test helpers.
9. Remove Supabase environment variable requirements from runtime paths migrated by this TIP.
10. Do not remove Supabase packages until all imports are eliminated and build/tests confirm they are unused.

### Validation
1. Validate API request bodies with existing Zod schemas where available.
2. Validate slugs for jobs/news to be URL-safe and unique.
3. Validate public query params for search/filter/page without throwing unhandled errors.
4. Validate uploaded CV file type and size using the existing product rule: PDF/DOC/DOCX, max 5MB unless current code already defines a stricter value.
5. Validate admin login inputs and never store plaintext passwords or session tokens.
6. Validate status transitions for jobs, news, and applications to known allowed statuses.

### Error Handling
1. Database connection failure: return actionable server errors in API routes and safe user-facing messages in UI.
2. Missing SQLite DB in demo mode: fall back to mock data only when explicitly configured or current mock fallback behavior requires it.
3. Migration failure: fail fast and do not start partial repository operations silently.
4. Duplicate slug/email/session conflicts: return validation errors with field-level feedback where UI supports it.
5. Unauthorized admin access: redirect to login or return 401/403 consistently.
6. File upload failure: do not create a completed application record pointing to a missing CV file.
7. Repository errors must not leak stack traces or filesystem paths to public responses.

## ACCEPTANCE CRITERIA
- Given a fresh checkout with SQLite configured, When migrations and seeds run, Then jobs, news, settings, admin user, and demo records exist in SQLite.
- Given `/vi/jobs` or `/ja/jobs`, When published and unpublished jobs exist, Then only published jobs render publicly.
- Given `/vi/news` or `/ja/news`, When published and draft news exist, Then only published news render publicly.
- Given an unauthenticated visitor, When they access `/admin`, `/admin/jobs`, `/admin/news`, or `/admin/applications`, Then they are redirected to login or denied access.
- Given a valid admin login, When credentials are submitted, Then a secure SQLite-backed session is created and admin pages are accessible.
- Given an admin edits a job, When the form saves successfully, Then the update persists in SQLite and public visibility follows the job status.
- Given an admin edits a news article, When the form saves successfully, Then the article persists in SQLite and public visibility follows the article status.
- Given a candidate submits a valid application with CV, When the request completes, Then application metadata is stored in SQLite and CV metadata/path is associated safely.
- Given invalid application/contact/admin input, When submitted, Then user-friendly validation errors appear and no invalid row is persisted.
- Given `npm run type-check` and `npm run build`, When migration is complete, Then both pass without Supabase runtime configuration.
- Given tests for public visibility, admin protection, and application submission, When run, Then they pass against SQLite-backed repositories.

## CONSTRAINTS
- DO NOT: Change public URL structure or CMS route structure.
- DO NOT: Redesign public or CMS UI while doing this migration.
- DO NOT: Import SQLite driver code into client components.
- DO NOT: Store plaintext passwords, raw session tokens, or public CV URLs.
- DO NOT: Keep public/CMS runtime paths dependent on Supabase environment variables after migration.
- DO NOT: Silently swallow database or migration errors.
- REUSE: Existing validation schemas, mock data, UI components, route handlers, and bilingual route structure.
- REUSE: Existing domain concepts from Supabase tables and `types/database.ts` when defining local domain types.
- SKIP: Production cloud database hosting decisions beyond local SQLite file configuration.
- SKIP: Multi-role RBAC, multi-tenant SaaS, email notifications, and ATS integrations.

## QUALITY GATE SELF-REVIEW
- Completeness: Covers public site reads, CMS admin persistence, admin auth, applications/CV metadata, settings, contact, env docs, tests, and build verification.
- Cross-reference: Maps to RRI domains B, C, D, E, and F while intentionally superseding REQ-E02/E03/E04/E05 Supabase-specific implementation with SQLite equivalents.
- Standards alignment: Preserves recruitment content model, CMS protection intent, visual-parity constraints, and private candidate-data handling.
- Declared gaps: Existing plan/docs still reference Supabase as the target stack; implementation should update docs or add migration notes after code changes. Production hosting strategy for SQLite is intentionally not solved in this TIP.
