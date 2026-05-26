# Phase 04: Admin/CMS Button Handling

## [CORE] Goal
Handle every CMS/admin button/action in mock mode with visible feedback while preserving production auth and Supabase mode.

## [CORE] Files Likely Owned
- `app/admin/layout.tsx`
- `app/admin/page.tsx`
- `app/admin/jobs/page.tsx`
- `app/admin/news/page.tsx`
- `app/admin/news/new/page.tsx`
- `app/admin/news/[id]/edit/page.tsx`
- `app/admin/applications/page.tsx`
- `app/admin/applications/[id]/page.tsx`
- `app/admin/settings/page.tsx`
- `components/admin/**`
- `components/cms/**`
- `app/api/news/**/route.ts`
- `app/api/applications/**/route.ts`
- `app/api/settings/route.ts`
- `tests/e2e/mockdata-admin-buttons.spec.ts`

## [CORE] Tasks
1. Admin access in mock mode:
   - Decide whether mock admin pages use a test admin fixture or existing auth bypass helper.
   - Do not weaken production auth when mock mode is disabled.
2. Dashboard:
   - Cards/action links navigate to implemented admin pages.
   - Metrics render from mock fixtures when Supabase is unavailable.
3. Jobs admin:
   - Search/filter/pagination controls work on mock jobs.
   - Create/edit/status/delete buttons either mutate mock UI state with feedback or are intentionally disabled with accessible explanation.
   - Forms validate and show success/error feedback.
4. News admin:
   - Search/filter/pagination controls work on mock news.
   - Create/edit/publish/draft/delete buttons are handled.
   - Rich text or body fields validate consistently.
5. Applications admin:
   - Search/filter/status buttons work on mock applications.
   - CV view/download has deterministic mock behavior or accessible disabled explanation.
6. Settings:
   - Save/reset/upload/social/contact buttons validate and show mock success/error.
7. Logout/sidebar:
   - Sidebar links work.
   - Logout has deterministic behavior in mock mode and real auth behavior in Supabase mode.

## [GREEN] Acceptance Criteria
- [ ] Admin E2E tests pass in mock mode.
- [ ] Admin button inventory rows marked handled or intentionally disabled.
- [ ] Every admin mutation has visible success/error feedback.
- [ ] Production auth/Supabase behavior remains available when mock mode is disabled.
- [ ] No broad `any` types added for new mock action payloads.

## [SECURITY] Constraints
- Do not expose service-role keys or secrets to the client.
- Do not bypass admin auth in production mode.
- Do not make private CV URLs public in production behavior.
