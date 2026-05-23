# TIP-006: Application Form, CV Upload, Applications CMS

## HEADER
- TIP-ID: TIP-006
- Project: Coporate_Website
- Module: Applications
- Priority: P0
- Depends on: TIP-002, TIP-003, TIP-005
- Estimated: L

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase.
- Key files to read first: `coding-packs/BUILDER-HANDOFF.md`, `coding-packs/02-TASK-GRAPH.md`, `coding-packs/01-REQUIREMENTS-MATRIX.md`, `.design/**/DESIGN.md`, relevant `.design/**/code.html`.
- Patterns to follow: preserve `.design` visual direction, convert HTML into typed components, validate server inputs, protect admin routes, keep Supabase RLS/storage policies in place.
- Key design files: .design/recruitment_site/ung_tuyen_ngay_fabbi_final_precision/code.html, .design/recruitment_site/form_ung_tuyen_nhanh_fabbi_final_precision/code.html, .design/cms_site/quan_ly_ung_tuyen_cms_fabbi/code.html.

## APPLICABLE STANDARDS
- [cms/admin-shell](../standards/cms/admin-shell.md) — Protected CMS shell, navigation, management UX, and mutation feedback.
- [database/supabase-saas](../standards/database/supabase-saas.md) — Supabase schema, auth, RLS, storage, and environment baseline.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — Jobs, applications, and news content model rules.
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — Convert static HTML exports into typed reusable Next.js components.
- [ui/design-tokens](../standards/ui/design-tokens.md) — Professional Tech Hub colors, typography, spacing, and radius source of truth.

## TASK
Implement candidate application submission with CV upload and the admin applications management flow. Convert full apply page, quick apply modal, and applications CMS from .design while preserving source layout, item placement, component structure, colors, spacing, and responsive behavior; store private CVs in Supabase Storage and let admin review applications securely.

## SPECIFICATIONS
### Business Rules
1. Full /apply page and QuickApplyModal submit application data.
2. Required fields: full name, email, phone, CV. Optional: job, portfolio URL, message.
3. CV allowlist default: PDF, DOC, DOCX; max 5MB.
4. CV files go to private candidate-cvs bucket.
5. Application rows store candidate data, selected job, CV metadata, source, status, timestamps.
6. Admin /admin/applications lists/filter applications.
7. Admin /admin/applications/[id] shows details and secure CV access.
8. Admin can change status: new, reviewing, shortlisted, rejected, hired.
9. Application form fields, quick modal layout, CV upload affordance, CMS application list/detail, status chips, and action placement must follow `.design` HTML/screenshots without visual redesign.

### Validation
- Validate email format, phone presence, URL format when portfolio exists.
- Validate CV MIME/extension/size server-side.
- Validate selected job exists if provided.

### Error Handling
- Failed upload must not create orphan application records; if unavoidable, clean up uploaded file.
- Failed application insert must not expose internal Supabase details.
- Admin CV access failure shows safe error.

## ACCEPTANCE CRITERIA
- Given valid candidate data and CV When submitting application Then application is saved and success state appears within the source design's form layout and visual styling.
- Given invalid CV type or over 5MB When submitting Then upload is rejected with clear message.
- Given admin user When viewing applications Then submitted candidate appears in CMS.
- Given admin user When opening application detail Then CV can be accessed through authenticated flow only.
- Given anonymous user When trying admin CV URL Then access is denied.

## CONSTRAINTS
- DO NOT: make CV bucket public.
- DO NOT: store CV files outside Supabase Storage.
- REUSE: applications table/storage policies, ApplicationForm, CMS DataTable, StatusBadge; adapt shared UI if needed to match `.design` layout and colors.
- SKIP: email notifications and ATS integrations.

## QUALITY GATE: SELF-REVIEW
- Completeness: all TIP fields included.
- Cross-reference: Covers REQ-B05, REQ-C01 to REQ-C06, REQ-D07.
- Gaps: none.
