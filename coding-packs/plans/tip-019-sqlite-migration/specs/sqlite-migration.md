# SPEC: TIP-019 SQLite Migration

## AC-01: SQLite migrations and seeds create canonical data
- Given: a fresh checkout with SQLite env configured
- When: the migration and seed scripts run
- Then: SQLite contains jobs, news articles, applications, settings, admin users, sessions table structure, and demo rows needed for public/CMS screens

## AC-02: Public jobs expose only published jobs
- Given: SQLite contains jobs with statuses draft, review, published, closed, and archived
- When: public jobs list/detail queries run for `/vi/jobs` or `/ja/jobs`
- Then: only published jobs are returned and unpublished jobs are not addressable publicly

## AC-03: Public news exposes only published articles
- Given: SQLite contains news articles with draft and published statuses
- When: public news list/detail queries run for `/vi/news` or `/ja/news`
- Then: only published articles are returned and draft articles are not addressable publicly

## AC-04: Admin routes require SQLite-backed admin sessions
- Given: no valid admin session cookie is present
- When: a visitor requests `/admin`, `/admin/jobs`, `/admin/news`, or `/admin/applications`
- Then: the visitor is redirected to `/login` or receives an authorization denial

## AC-05: Admin login creates a secure session
- Given: an admin user exists in SQLite with a non-plaintext password hash
- When: valid credentials are submitted to the signin route
- Then: a secure session is stored in SQLite and an HttpOnly cookie is issued

## AC-06: CMS mutations persist to SQLite
- Given: a valid admin session exists
- When: an admin creates or updates a job, news article, application status, or setting
- Then: the change persists in SQLite and the UI receives a success response compatible with current components

## AC-07: Candidate applications store metadata and private CV references
- Given: a candidate submits required application fields and a valid PDF/DOC/DOCX CV under 5MB
- When: the application API completes
- Then: application metadata and CV metadata/path are persisted in SQLite and the CV is not publicly accessible

## AC-08: Invalid input does not persist data
- Given: invalid admin, contact, or candidate application input
- When: the request is submitted
- Then: a user-safe validation error is returned and no invalid SQLite row is written

## AC-09: Supabase runtime config is no longer required
- Given: Supabase environment variables are absent
- When: `npm run type-check`, `npm run build`, and SQLite-specific tests run
- Then: the migrated public and CMS flows pass without requiring Supabase runtime configuration
