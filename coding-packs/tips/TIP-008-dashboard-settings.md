# TIP-008: CMS Dashboard Metrics and Settings

## HEADER
- TIP-ID: TIP-008
- Project: Coporate_Website
- Module: Dashboard / Settings
- Priority: P1
- Depends on: TIP-002, TIP-003, TIP-005, TIP-006, TIP-007
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase.
- Key files to read first: `coding-packs/BUILDER-HANDOFF.md`, `coding-packs/02-TASK-GRAPH.md`, `coding-packs/01-REQUIREMENTS-MATRIX.md`, `.design/**/DESIGN.md`, relevant `.design/**/code.html`.
- Patterns to follow: preserve `.design` visual direction, convert HTML into typed components, validate server inputs, protect admin routes, keep Supabase RLS/storage policies in place.
- Key design files: .design/cms_site/bang_dieu_khien_cms_fabbi/code.html, .design/cms_site/settings_cms_fabbi/code.html.

## APPLICABLE STANDARDS
- [cms/admin-shell](../standards/cms/admin-shell.md) — Protected CMS shell, navigation, management UX, and mutation feedback.
- [database/supabase-saas](../standards/database/supabase-saas.md) — Supabase schema, auth, RLS, storage, and environment baseline.
- [ui/design-tokens](../standards/ui/design-tokens.md) — Professional Tech Hub colors, typography, spacing, and radius source of truth.

## TASK
Implement real-data CMS dashboard metrics and basic settings management. Convert dashboard/settings design surfaces into production CMS pages backed by Supabase aggregates and site_settings while preserving source HTML/screenshot layout, item placement, component structure, colors, spacing, and responsive behavior.

## SPECIFICATIONS
### Business Rules
1. Dashboard metrics derive from Supabase data, not hardcoded counters.
2. Required metrics: open/published jobs, new applications, published news, applications by status.
3. Show recent applications table if data exists.
4. Settings page manages basic company/contact metadata via site_settings.
5. All settings mutations require admin auth and visible feedback.
6. Dashboard metric cards, chart/table areas, settings form layout, sidebar/topbar spacing, colors, and action placement must follow `.design` HTML/screenshots without visual redesign.

### Validation
- Validate setting keys against allowed keys.
- Validate email/phone/URL fields when present.
- Dashboard query must handle zero-data state.

### Error Handling
- Dashboard query failures show safe error state.
- Settings save failure preserves form input.
- Empty metrics render zero/empty state, not loading forever.

## ACCEPTANCE CRITERIA
- Given admin user When opening /admin Then dashboard metrics are derived from database rows.
- Given no data When opening dashboard Then empty/zero states render cleanly without changing the source dashboard layout or component colors.
- Given admin updates settings When saving Then settings persist and success feedback appears.
- Given invalid settings When saving Then field errors appear.

## CONSTRAINTS
- DO NOT: hardcode dashboard metrics.
- DO NOT: add advanced analytics beyond listed metrics.
- REUSE: MetricCard, DataTable, SettingsForm, CMS shell; adapt shared UI if needed to match `.design` layout and colors.
- SKIP: email notification settings unless already in basic metadata.

## QUALITY GATE: SELF-REVIEW
- Completeness: all TIP fields included.
- Cross-reference: Covers REQ-D08, settings part of MVP roadmap.
- Gaps: none.
