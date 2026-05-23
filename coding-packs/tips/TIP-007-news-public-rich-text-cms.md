# TIP-007: News Public Pages and Rich Text News CMS

## HEADER
- TIP-ID: TIP-007
- Project: Coporate_Website
- Module: News
- Priority: P0
- Depends on: TIP-001, TIP-002, TIP-003
- Estimated: L

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase.
- Key files to read first: `coding-packs/BUILDER-HANDOFF.md`, `coding-packs/02-TASK-GRAPH.md`, `coding-packs/01-REQUIREMENTS-MATRIX.md`, `.design/**/DESIGN.md`, relevant `.design/**/code.html`.
- Patterns to follow: preserve `.design` visual direction, convert HTML into typed components, validate server inputs, protect admin routes, keep Supabase RLS/storage policies in place.
- Key design files: .design/recruitment_site/tin_tuc_fabbi_final_precision/code.html, .design/recruitment_site/tin_tuc_chi_tiet_fabbi_final_precision/code.html, .design/cms_site/quan_ly_tin_tuc_cms_fabbi/code.html.

## APPLICABLE STANDARDS
Builder MUST conform to:
- [cms/admin-shell](../standards/cms/admin-shell.md) — Protected CMS shell, navigation, management UX, and mutation feedback.
- [database/supabase-saas](../standards/database/supabase-saas.md) — Supabase schema, auth, RLS, storage, and environment baseline.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — Jobs, applications, and news content model rules.
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — Convert static HTML exports into typed reusable Next.js components.
- [ui/design-tokens](../standards/ui/design-tokens.md) — Professional Tech Hub colors, typography, spacing, and radius source of truth.

## TASK
Implement public news list/detail pages and CMS rich text article management. Replace placeholder/lorem design content with seeded/CMS-backed news data, enforce published-only public visibility, and preserve source HTML/screenshot layout, item placement, component structure, colors, spacing, and responsive behavior for public and CMS news screens.

## SPECIFICATIONS
### Business Rules
1. Public /news lists published articles with filters for category/tag if implemented.
2. Public /news/[slug] renders one published article.
3. Admin /admin/news lists all articles.
4. Admin can create/edit articles with title, slug, excerpt, cover image URL, category, tags, rich text body, status.
5. Status values: draft, review, published, archived.
6. Rich text rendering must sanitize or constrain output to safe content.
7. Placeholder/lorem content from export must not be final production content.
8. News card grids, article detail typography/layout, CMS table/list layout, editor shell, status chips, and action placement must follow `.design` HTML/screenshots without visual redesign.

### Validation
- Validate title, slug, body for publish.
- Validate unique slug.
- Validate cover image URL or managed media reference.
- Validate rich text content server-side before persistence.

### Error Handling
- Unpublished/missing article returns 404 publicly.
- Invalid rich text or duplicate slug shows form-level error.
- CMS mutation failures preserve current form draft.

## ACCEPTANCE CRITERIA
- Given published and draft articles When visiting /news Then only published articles appear.
- Given a published article When visiting /news/[slug] Then rich text article renders safely while preserving source article layout, typography, colors, and spacing.
- Given admin user When creating news Then article appears in admin list.
- Given admin publishes news When public news reloads Then article appears publicly.
- Given lorem export content When final page renders Then it has been replaced by seed/CMS content.

## CONSTRAINTS
- DO NOT: render unsanitized arbitrary HTML.
- DO NOT: ship lorem ipsum as final data.
- REUSE: NewsCard, RichTextEditor, RichTextRenderer, DataTable, StatusBadge; adapt shared UI if needed to match `.design` layout and colors.
- SKIP: comments, subscriptions, and multi-language workflow.

## QUALITY GATE: SELF-REVIEW
- Completeness: all TIP fields included.
- Cross-reference: Covers REQ-B07, REQ-D05, REQ-D06.
- Gaps: none.
