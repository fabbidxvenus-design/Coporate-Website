# TIP-005: Jobs Public Pages and Jobs CMS Workflow

## HEADER
- TIP-ID: TIP-005
- Project: Coporate_Website
- Module: Jobs
- Priority: P0
- Depends on: TIP-001, TIP-002, TIP-003
- Estimated: XL

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase.
- Key files to read first: `coding-packs/BUILDER-HANDOFF.md`, `coding-packs/02-TASK-GRAPH.md`, `coding-packs/01-REQUIREMENTS-MATRIX.md`, `.design/**/DESIGN.md`, relevant `.design/**/code.html`.
- Patterns to follow: preserve `.design` visual direction, convert HTML into typed components, validate server inputs, protect admin routes, keep Supabase RLS/storage policies in place.
- Key design files: .design/recruitment_site/tim_kiem_cong_viec_fabbi_final_precision/code.html, .design/recruitment_site/chi_tiet_cong_viec_fabbi_final_precision/code.html, .design/cms_site/quan_ly_ten_tuyen_dung_cms_fabbi/code.html.

## APPLICABLE STANDARDS
Builder MUST conform to:
- [cms/admin-shell](../standards/cms/admin-shell.md) — Protected CMS shell, navigation, management UX, and mutation feedback.
- [database/supabase-saas](../standards/database/supabase-saas.md) — Supabase schema, auth, RLS, storage, and environment baseline.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — Jobs, applications, and news content model rules.
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — Convert static HTML exports into typed reusable Next.js components.
- [ui/design-tokens](../standards/ui/design-tokens.md) — Professional Tech Hub colors, typography, spacing, and radius source of truth.

## TASK
Implement the jobs domain end-to-end. Build public jobs list/detail pages backed by published Supabase jobs and CMS jobs management with create/edit/status workflow while preserving the source HTML/screenshot layout, item placement, component structure, colors, spacing, and responsive behavior for both public and CMS jobs screens.

## SPECIFICATIONS
### Business Rules
1. Public /jobs supports search/filter via URL params: q, department, location, 	ype, page.
2. Public /jobs/[slug] renders only published jobs.
3. Admin /admin/jobs lists all jobs with status badges and filters.
4. Admin can create/edit jobs using JobForm.
5. Admin can transition statuses: draft, review, published, closed, archived.
6. Publishing requires title, slug, description, and published_at.
7. Closed/archived jobs must not appear publicly.
8. Jobs list cards, filters, detail sidebar/content, CMS table/list layout, status badges, and actions must visually follow the `.design` HTML/screenshots; do not redesign their arrangement or colors.

### Validation
- Validate unique slug format.
- Validate salary range if both min/max exist.
- Validate required fields for publish.
- Validate status transitions server-side.

### Error Handling
- Public missing/unpublished job returns 404.
- CMS mutation errors show visible feedback and preserve form input.
- Duplicate slug returns actionable error.

## ACCEPTANCE CRITERIA
- Given published and draft jobs When visiting /jobs Then only published jobs appear.
- Given a published job When visiting /jobs/[slug] Then job detail renders with apply CTA and preserves the source detail layout, colors, and sidebar/content placement.
- Given admin user When creating a valid job Then it appears in admin list.
- Given admin publishes a job When public jobs page reloads Then the job appears publicly.
- Given invalid job form When submitting Then field-level errors are shown.

## CONSTRAINTS
- DO NOT: expose draft/review/closed/archived jobs publicly.
- DO NOT: bypass RLS using service role in client code.
- REUSE: JobCard, DataTable, StatusBadge, CMS shell, jobs table from TIP-002; adapt shared components when necessary to preserve `.design` visual fidelity.
- SKIP: applications submit flow except linking apply CTA.

## QUALITY GATE: SELF-REVIEW
- Completeness: all TIP fields included.
- Cross-reference: Covers REQ-B03, REQ-B04, REQ-B06, REQ-D03, REQ-D04.
- Gaps: none.
