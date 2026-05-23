# TIP-002: Supabase Schema, RLS, Storage, Seed Data

## HEADER
- TIP-ID: TIP-002
- Project: Coporate_Website
- Module: Database / Supabase
- Priority: P0
- Depends on: TIP-001
- Estimated: L

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase.
- Key files to read first: `coding-packs/BUILDER-HANDOFF.md`, `coding-packs/02-TASK-GRAPH.md`, `coding-packs/01-REQUIREMENTS-MATRIX.md`, `.design/**/DESIGN.md`, relevant `.design/**/code.html`.
- Patterns to follow: preserve `.design` visual direction, convert HTML into typed components, validate server inputs, protect admin routes, keep Supabase RLS/storage policies in place.

## APPLICABLE STANDARDS
- [database/supabase-saas](../standards/database/supabase-saas.md) — Supabase schema, auth, RLS, storage, and environment baseline.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — Jobs, applications, and news content model rules.

## TASK
Create the Supabase foundation for all MVP data. Add migrations, RLS policies, private CV storage policy, and seed data that supports public jobs/news and CMS workflows.

## SPECIFICATIONS
### Business Rules
1. Create supabase/migrations for tables: profiles, jobs, job_status_history, 
ews_articles, pplications, site_settings, media_assets.
2. Jobs statuses: draft, eview, published, closed, rchived.
3. News statuses: draft, eview, published, rchived.
4. Application statuses: 
ew, eviewing, shortlisted, ejected, hired.
5. Enable RLS on every table.
6. Public policies allow reads only for published jobs/news.
7. Admin policies require authenticated user with profiles.role = 'admin'.
8. Create private candidate-cvs storage bucket policy for admin-only access.
9. Add seed data matching visible design screens enough for public/CMS development.

### Validation
- Add database constraints for valid enum/status values, unique slugs, required candidate fields, and CV metadata.
- CV metadata defaults: PDF/DOC/DOCX, max 5MB enforced later in app validation and represented in constants.

### Error Handling
- Migration should be idempotent where reasonable and fail loudly on invalid schema assumptions.
- Seed script must not require production secrets.

## ACCEPTANCE CRITERIA
- Given Supabase CLI is available When migrations run Then all tables, indexes, and policies are created.
- Given anonymous access When querying jobs/news Then only published records are readable.
- Given anonymous access When querying applications/CVs Then access is denied.
- Given authenticated admin profile When querying CMS tables Then admin can read/write permitted rows.

## CONSTRAINTS
- DO NOT: disable RLS to make development easier.
- DO NOT: make CV bucket public.
- REUSE: data models in coding-packs/BUILDER-HANDOFF.md.
- SKIP: UI and Next.js page implementation.

## QUALITY GATE: SELF-REVIEW
- Completeness: all TIP fields included.
- Cross-reference: Covers REQ-C03, REQ-C04, REQ-E02, REQ-E04, REQ-E05.
- Gaps: none.
