# TIP-009: QA, Tests, Accessibility, Responsive Verification

## HEADER
- TIP-ID: TIP-009
- Project: Coporate_Website
- Module: Quality Assurance
- Priority: P0/P1
- Depends on: TIP-004, TIP-005, TIP-006, TIP-007, TIP-008
- Estimated: L

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
Add and run quality verification for the MVP. Cover validation, auth protection, public visibility rules, application submission, accessibility, responsive behavior, and visual regressions against .design intent.

## SPECIFICATIONS
### Business Rules
1. Add unit tests for validation schemas and API response helpers.
2. Add integration tests for public published-only reads and admin guard behavior.
3. Add E2E/smoke tests for core flows: public browsing, admin login protection, job publish visibility, application submission.
4. Run responsive checks at 320, 768, 1024, 1440 widths for public and CMS key screens.
5. Run accessibility checks for forms, navigation, dialogs, focus states, and status messages.
6. Document findings and fixes in coding-packs/reports if issues remain.
7. Visual QA must prioritize preservation of layout, item placement, component structure, colors, spacing, and responsive stacking against `.design` HTML/screenshots.

### Validation
- Tests must fail if draft jobs/news leak publicly.
- Tests must fail if unauthenticated /admin/* access is allowed.
- Tests must fail for invalid application/CV validation cases.

### Error Handling
- Flaky tests must be fixed or quarantined with rationale; do not ignore failures.
- If external Supabase is unavailable, provide local/test fallback instructions without weakening production security.

## ACCEPTANCE CRITERIA
- Given test suite runs When validation tests execute Then invalid inputs are rejected.
- Given unauthenticated browser When visiting /admin Then E2E expects redirect to login.
- Given draft content When public pages load Then tests confirm it is hidden.
- Given key breakpoints When screens render Then no horizontal overflow or unusable navigation occurs and layout/color/component arrangement remains faithful to `.design` screenshots.
- Given keyboard navigation When tabbing forms and dialogs Then focus is visible and logical.

## CONSTRAINTS
- DO NOT: weaken auth/RLS to make tests pass.
- DO NOT: skip failing tests without documenting and fixing root cause.
- REUSE: existing validation schemas and route/page structure; visual fixes must restore `.design` fidelity rather than redesigning screens.
- SKIP: load testing and advanced analytics QA.

## QUALITY GATE: SELF-REVIEW
- Completeness: all TIP fields included.
- Cross-reference: Covers REQ-F01, REQ-F02, REQ-F03, REQ-F05.
- Gaps: none.
