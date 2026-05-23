# TIP-003: Supabase Auth, Middleware, Admin Guard, Login

## HEADER
- TIP-ID: TIP-003
- Project: Coporate_Website
- Module: Auth / CMS Protection
- Priority: P0
- Depends on: TIP-001, TIP-002
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase.
- Key files to read first: `coding-packs/BUILDER-HANDOFF.md`, `coding-packs/02-TASK-GRAPH.md`, `coding-packs/01-REQUIREMENTS-MATRIX.md`, `.design/**/DESIGN.md`, relevant `.design/**/code.html`.
- Patterns to follow: preserve `.design` visual direction, convert HTML into typed components, validate server inputs, protect admin routes, keep Supabase RLS/storage policies in place.

## APPLICABLE STANDARDS
- [cms/admin-shell](../standards/cms/admin-shell.md) — Protected CMS shell, navigation, management UX, and mutation feedback.
- [database/supabase-saas](../standards/database/supabase-saas.md) — Supabase schema, auth, RLS, storage, and environment baseline.
- [ui/design-tokens](../standards/ui/design-tokens.md) — Professional Tech Hub colors, typography, spacing, and radius source of truth.

## TASK
Implement Supabase authentication and admin route protection. Build the login/logout flow, Supabase server/browser clients, middleware, admin guard helper, and protected CMS shell placeholder.

## SPECIFICATIONS
### Business Rules
1. Use Supabase Auth for CMS/admin users.
2. MVP has one role: dmin from profiles.role.
3. Protect every /admin/* route.
4. Unauthenticated users visiting /admin/* redirect to /login.
5. Authenticated non-admin users must be denied admin access.
6. Logout returns user to /login.
7. CMS shell must include sidebar/topbar placeholders matching .design/cms_site direction.

### Validation
- Login form validates email and password presence.
- Server guard validates session and profile role.
- Middleware should not block public routes.

### Error Handling
- Invalid login shows user-friendly error.
- Missing Supabase env vars should show clear developer error in server logs, not leak secrets.
- Admin guard failures redirect or render access denied consistently.

## ACCEPTANCE CRITERIA
- Given no session When visiting /admin Then user is redirected to /login.
- Given valid admin credentials When logging in Then user reaches /admin shell.
- Given a logged-in admin When clicking logout Then session ends and /admin is inaccessible.
- Given public routes When browsing Then auth middleware does not block them.

## CONSTRAINTS
- DO NOT: implement multi-role permissions.
- DO NOT: hardcode admin credentials.
- REUSE: Supabase schema from TIP-002 and CMS shell design from .design/cms_site.
- SKIP: full dashboard/jobs/news/applications content.

## QUALITY GATE: SELF-REVIEW
- Completeness: all TIP fields included.
- Cross-reference: Covers REQ-D01, REQ-D02, REQ-E03, REQ-F04.
- Gaps: none.
