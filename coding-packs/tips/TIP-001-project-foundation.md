# TIP-001: Project Scaffold, Tooling, Tailwind Tokens, Base Layouts

## HEADER
- TIP-ID: TIP-001
- Project: Coporate_Website
- Module: Foundation
- Priority: P0
- Depends on: none
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase.
- Key files to read first: `coding-packs/BUILDER-HANDOFF.md`, `coding-packs/02-TASK-GRAPH.md`, `coding-packs/01-REQUIREMENTS-MATRIX.md`, `.design/**/DESIGN.md`, relevant `.design/**/code.html`.
- Patterns to follow: preserve `.design` visual direction, convert HTML into typed components, validate server inputs, protect admin routes, keep Supabase RLS/storage policies in place.

## APPLICABLE STANDARDS
Builder MUST conform to:
- [cms/admin-shell](../standards/cms/admin-shell.md) — Protected CMS shell, navigation, management UX, and mutation feedback.
- [database/supabase-saas](../standards/database/supabase-saas.md) — Supabase schema, auth, RLS, storage, and environment baseline.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — Jobs, applications, and news content model rules.
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — Convert static HTML exports into typed reusable Next.js components.
- [ui/design-tokens](../standards/ui/design-tokens.md) — Professional Tech Hub colors, typography, spacing, and radius source of truth.

## TASK
Create the production Next.js foundation for the project. Scaffold App Router + TypeScript + Tailwind, migrate Professional Tech Hub design tokens into project-owned config, and create base route/layout/component structure for future TIPs.

## SPECIFICATIONS
### Business Rules
1. Use Next.js App Router and TypeScript.
2. Configure Tailwind locally; do not use Tailwind CDN from HTML exports.
3. Standardize typography on Manrope and expose design tokens for colors, spacing, radius, and typography.
4. Create public and admin route skeletons but do not implement full feature pages yet.
5. Create shared UI primitives: Button, Input, Textarea, Select, Card, Chip, Badge, StatusBadge, DataTable, EmptyState, LoadingState, ErrorState.
6. Create shared type/API helpers: 	ypes/api.ts, 	ypes/domain.ts, lib/api-response.ts, lib/constants.ts.

### Validation
- TypeScript strict mode must be enabled.
- Build and lint scripts must exist in package.json.
- Token names must map back to .design/**/DESIGN.md colors/spacing/radius.

### Error Handling
- Placeholder pages must render safely without Supabase env vars.
- Components must accept typed props and avoid throwing on missing optional content.

## ACCEPTANCE CRITERIA
- Given a fresh clone When dependencies are installed and build runs Then the Next.js app builds successfully.
- Given the app starts When visiting / Then a tokenized placeholder public page renders.
- Given the app starts When visiting /login Then a placeholder login page renders.
- Given code inspection When reviewing styles Then Tailwind CDN is absent and tokens are project-owned.

## CONSTRAINTS
- DO NOT: implement Supabase auth/database logic in this TIP.
- DO NOT: paste full exported HTML pages as production pages.
- REUSE: .design/**/DESIGN.md token values and blueprint folder structure.
- SKIP: jobs/news/applications feature implementation.

## QUALITY GATE: SELF-REVIEW
- Completeness: TIP header, context, standards, task, business rules, validation, error handling, acceptance criteria, and constraints included.
- Cross-reference: Covers REQ-A01 through REQ-A05 and REQ-F01.
- Gaps: none.
