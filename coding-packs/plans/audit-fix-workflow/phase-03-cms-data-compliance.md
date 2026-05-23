# Phase 03 — CMS Data Compliance

## Goal

Ensure CMS/admin pages display design-equivalent data structures when live Supabase data is unavailable, while remaining behind auth.

## Requirement IDs

- `DET-UX-005`
- `DET-API-003`
- `DET-DATA-001`
- `DET-ERR-003`
- `DET-STATE-004`
- `DET-TEST-004`

## Current Findings

- Public mock jobs/news exist in `lib/mock-data.ts`.
- `mockApplications` exists but is minimal and not strongly typed.
- Admin pages currently fall back to empty arrays/zero metrics in mock/no DB mode.
- Empty admin tables may preserve render stability but fail design-equivalent density and operational flow requirements.

## Implementation Direction

- Create or extend typed mock CMS datasets:
  - jobs with mixed statuses (`published`, `draft`, `closed`);
  - news articles with categories/statuses;
  - applications with realistic candidate/job/status data;
  - dashboard metrics derived from mock data.
- Reuse schema-compatible database row types.
- Keep mock CMS data behind admin auth checks.
- Do not alter visual layout or component structure unless required to display compliant data.

## Tasks

1. Type `mockApplications` against `Database['public']['Tables']['applications']['Row']` where possible.
2. Add mock data helpers for admin list/dashboard needs.
3. Update admin pages to use design-equivalent mock data only when mock/no-live-data mode is intended.
4. Ensure list/table/card density matches CMS visual reference better than empty states.
5. Keep missing-data states visually controlled for true empty cases.

## Verification

- Admin dashboard shows non-zero metrics and recent records in mock/no-live-data mode.
- Admin jobs/news/applications pages show table/list rows with realistic statuses.
- CMS navigation remains gated and visually unchanged.
- 1440px and 1920px screenshots are captured for changed admin pages.
