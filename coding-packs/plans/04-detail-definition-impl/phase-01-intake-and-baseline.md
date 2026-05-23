# Phase 01: Intake, Baseline, and Design Inventory

## ZFlow Context

**Mode:** plan-supervised
**Source requirement:** `.requirements/04-detail-definition.md`
**Scope:** implement and audit complete Detail Definition 04 for the corporate recruitment website.
**Resolved tier:** THOROUGH

## Complexity Score

- Technical: 30/35 — Next.js App Router, Supabase Auth, protected admin routes, public form persistence, visual parity.
- Scope: 35/35 — public site, CMS/admin, routes, forms, auth, QA evidence, tests.
- Risk: 25/30 — auth, user-submitted personal data, database writes, visual approval requirements.

**Total:** 90/100 → THOROUGH.

## Goals

- Establish exact page/design coverage for `.design/recruitment_site` and `.design/cms_site`.
- Establish current implementation baseline.
- Build a traceability matrix from DET-* requirements to routes, files, tests, and visual evidence.
- Decide any temporary implementation-order deviations and record them explicitly.

## Tasks

1. Inventory source designs.
   - List every `.design/recruitment_site/*/code.html` and `screen.png`.
   - List every `.design/cms_site/*/code.html` and `screen.png`.
   - Map design folder names to target Next.js routes.

2. Inventory current implementation.
   - Public route map: `app/(public)/**/page.tsx`.
   - Admin route map: `app/admin/**/page.tsx`.
   - API route map: `app/api/**/route.ts`.
   - Component map: `components/public`, `components/cms`, `components/admin`, `components/ui`.
   - Supabase helpers: `lib/supabase`, `lib/auth.ts`.

3. Create the implementation coverage table.
   - Columns: DET ID, design source, route/file, current status, implementation gap, test/audit evidence.
   - Required DET IDs: DET-UX-001 through DET-TEST-005.

4. Establish baseline checks.
   - `pnpm type-check`.
   - `pnpm build`.
   - Playwright smoke test if existing.
   - Document failures as baseline, not implementation regressions.

5. Establish visual baseline.
   - Start app locally.
   - Capture current screenshots for implemented public and admin routes at 1440px and 1920px.
   - Compare against `.design/**/screen.png` manually.

## Acceptance Criteria

- [ ] Every design artifact is mapped to a target route.
- [ ] Every DET-* item has an owner route/file/test/evidence target.
- [ ] Baseline build/type/test state is known.
- [ ] Current visual drift is recorded before implementation.
- [ ] Any implementation-order exception is recorded with reason.

## Outputs

- `plans/04-detail-definition-impl/audit/coverage-matrix.md`
- `plans/04-detail-definition-impl/audit/design-inventory.md`
- `plans/04-detail-definition-impl/audit/baseline-report.md`
- `plans/04-detail-definition-impl/audit/visual-baseline/`
