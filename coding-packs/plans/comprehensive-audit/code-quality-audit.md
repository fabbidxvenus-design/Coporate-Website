# Code Quality Audit Report

## Summary

| Severity | Count |
|----------|-------|
| HIGH | 8 |
| MEDIUM | 22 |
| LOW | 24 |

## Findings

| ID | Category | File | Issue | Lines | Recommendation |
|----|----------|------|-------|-------|----------------|
| CQ-001 | Duplication | `components/public/JobsSearch.tsx:150-169` | `formatDateAgo`, `formatDate`, `formatSalary`, `getEmploymentTypeStyle` duplicated from `app/(public)/jobs/page.tsx:18-48` | 50 | Extract to `lib/utils.ts` |
| CQ-002 | Duplication | `app/(public)/jobs/page.tsx:18-48` | Same utility functions duplicated from `components/public/JobsSearch.tsx` and `app/(public)/jobs/[slug]/page.tsx:66-96` | 30 | Extract to `lib/utils.ts` |
| CQ-003 | Duplication | `app/(public)/jobs/[slug]/page.tsx:66-96` | `formatDateAgo`, `formatDate`, `formatSalary`, `getEmploymentTypeStyle` duplicated from other job pages | 30 | Extract to `lib/utils.ts` |
| CQ-004 | Duplication | `app/(public)/news/page.tsx:18-35` | `formatDateAgo` and `formatDate` duplicated from job pages | 18 | Extract to `lib/utils.ts` |
| CQ-005 | Duplication | `components/admin/ApplicationDetail.tsx:35-50` | `formatDate` and `formatFileSize` duplicated from `app/admin/applications/page.tsx:17-32` | 16 | Extract to `lib/utils.ts` |
| CQ-006 | Duplication | `components/admin/ApplicationDetail.tsx:17-33` | `ApplicationStatusBadge` component duplicated from `components/admin/ApplicationStatusBadge.tsx` (both define same component) | 17 | Remove duplicate; use imported component |
| CQ-007 | DeadCode | `middleware.ts:119` | Matcher pattern excludes `/api/*` routes but some API routes require admin auth | N/A | Review API route protection strategy |
| CQ-008 | DeadCode | `components/public/ApplicationModal.tsx:4` | `createClient` import unused | 1 | Remove unused import |
| CQ-009 | DeadCode | `components/admin/ApplicationStatusBadge.tsx` | Entire file unused — duplicated in `ApplicationDetail.tsx` | 27 | Remove file; use import from ApplicationDetail |
| CQ-010 | DeadCode | `app/admin/jobs/page.tsx:6` | `CmsTopbar` import unused | 1 | Remove unused import |
| CQ-011 | DeadCode | `app/admin/news/page.tsx:6` | `CmsTopbar` import unused | 1 | Remove unused import |
| CQ-012 | LargeFunction | `components/admin/ArticleForm.tsx:31-106` | `ArticleForm` is 270 lines | 75 | Split into smaller: form state hooks, field components |
| CQ-013 | LargeFunction | `components/admin/SettingsForm.tsx:22-165` | `SettingsForm` is 166 lines | 80 | Split into `useSettings` hook + field components |
| CQ-014 | LargeFunction | `components/admin/ApplicationDetail.tsx:52-249` | `ApplicationDetail` is 200 lines | 100 | Split into info card components |
| CQ-015 | LargeFunction | `components/public/ApplyForm.tsx:14-283` | `ApplyForm` is 284 lines | 100 | Split into field components |
| CQ-016 | LargeFunction | `app/admin/jobs/page.tsx:157-354` | `AdminJobsPage` async component is 200 lines | 100 | Extract `JobRow`, `StatsCards`, `Filters` components |
| CQ-017 | LargeFunction | `app/admin/news/page.tsx:169-353` | `AdminNewsPage` async component is 185 lines | 80 | Extract `ArticleRow`, `StatsCards`, `Filters` components |
| CQ-018 | LargeFunction | `app/(public)/jobs/page.tsx:228-421` | `JobsPage` async component is 194 lines | 90 | Extract search form, sidebar, job card components |
| CQ-019 | LargeFunction | `app/(public)/jobs/[slug]/page.tsx:178-433` | `JobDetailPage` async component is 256 lines | 100 | Extract sidebar, related jobs components |
| CQ-020 | LargeFunction | `app/(public)/news/page.tsx:233-378` | `NewsPage` async component is 146 lines | 70 | Extract sidebar, article card components |
| CQ-021 | LargeFunction | `app/(public)/about/page.tsx:55-267` | `AboutPage` component is 213 lines | 80 | Split into section components |
| CQ-022 | DeepNesting | `app/admin/applications/page.tsx:58-61` | Status count reduction has nested callback with 3 levels | 4 | Use early return or extract helper |
| CQ-023 | DeepNesting | `app/(public)/jobs/page.tsx:145-163` | Mock data filtering has 3 nested conditions | 18 | Consider early returns |
| CQ-024 | DeepNesting | `app/(public)/news/page.tsx:167-180` | Mock data filtering has 3 nested conditions | 13 | Consider early returns |
| CQ-025 | DeepNesting | `components/admin/ApplicationDetail.tsx:86-103` | Status update handler has nested try-catch-finally | 18 | Simplify error handling |
| CQ-026 | ErrorHandling | `middleware.ts:95-106` | Fail-open for non-admin routes, no logging | 12 | Add logging; consider fail-closed for sensitive ops |
| CQ-027 | ErrorHandling | `lib/auth.ts:50-53` | Catches all errors and returns null silently | 4 | Add logging or return error state |
| CQ-028 | ErrorHandling | `lib/auth.ts:104-107` | Catches all errors and returns null silently | 4 | Add logging or return error state |
| CQ-029 | ErrorHandling | `components/admin/SettingsForm.tsx:37-41` | Error caught but only logged, no user feedback | 5 | Show error to user via state |
| CQ-030 | ErrorBoundary | `app/layout.tsx` | No error boundary | N/A | Add `error.tsx` file |
| CQ-031 | ErrorBoundary | `app/(public)/layout.tsx` | No error boundary | N/A | Add `error.tsx` in `(public)` segment |
| CQ-032 | ErrorBoundary | `app/admin/layout.tsx` | No error boundary | N/A | Add `error.tsx` in `admin` segment |
| CQ-033 | Naming | Multiple | Mixed `locationLabels` objects instead of centralized constants | 10+ | Create `lib/constants.ts` entry |
| CQ-034 | Naming | `components/admin/ApplicationDetail.tsx:17` | `ApplicationStatusBadge` exported with case difference from filename | N/A | Standardize export name |
| CQ-035 | Naming | `app/api/applications/route.ts:91` | Status array named `validStatuses` vs `statusLabels` elsewhere | 1 | Standardize to `VALID_STATUSES` |
| CQ-036 | LargeFile | `app/(public)/jobs/[slug]/page.tsx` | 433 lines | 433 | Split into sidebar, related jobs, sections |
| CQ-037 | LargeFile | `components/public/ApplyForm.tsx` | 284 lines | 284 | Split into field components |
| CQ-038 | LargeFile | `components/admin/ArticleForm.tsx` | 271 lines | 271 | Split into field components |
| CQ-039 | UnusedVar | `app/admin/jobs/page.tsx:158` | `user` from `requireAdmin()` unused | 1 | Remove or prefix with `_` |
| CQ-040 | UnusedVar | `app/admin/news/page.tsx:170` | `user` from `requireAdmin()` unused | 1 | Remove or prefix with `_` |
| CQ-041 | UnusedVar | `app/admin/news/new/page.tsx` | `requireAdmin()` return value unused | 1 | Call without assignment |
| CQ-042 | UnusedVar | `app/admin/settings/page.tsx` | `requireAdmin()` return value unused | 1 | Call without assignment |
| CQ-043 | Inconsistency | Multiple | `statusLabels` defined as inline objects instead of centralized | 50+ | Create `lib/constants.ts` entries |
| CQ-044 | Inconsistency | `components/ui/Input.tsx` vs `components/ui/Select.tsx` | Error handling pattern differs | N/A | Standardize error display |
| CQ-045 | MagicNumbers | `app/api/applications/route.ts:14` | `MAX_FILE_SIZE = 5 * 1024 * 1024` hardcoded | 1 | Move to constants file |
| CQ-046 | MagicNumbers | `app/(public)/jobs/page.tsx:143` | `limit = 10` pagination limit hardcoded | 1 | Move to constants |
| CQ-047 | MagicNumbers | `app/(public)/news/page.tsx:165` | `limit = 8` pagination limit hardcoded | 1 | Move to constants |
| CQ-048 | MagicNumbers | `components/public/ApplicationModal.tsx:22` | `setTimeout(resolve, 1500)` hardcoded | 1 | Extract to named constant |
| CQ-049 | DeadCode | `components/public/JobDetailClient.tsx:25-33` | Button with `display: 'none'` — debug/unused | 9 | Remove or implement modal |
| CQ-050 | DeadCode | `app/(public)/jobs/[slug]/page.tsx:408-430` | Floating apply button triggers non-existent modal | 22 | Implement modal integration or remove |
| CQ-051 | Inconsistency | `lib/supabase/server.ts` vs `lib/supabase/admin.ts` | Similar patterns but `admin.ts` lacks `USE_MOCK_DATA` check | N/A | Add mock data support to admin client |
| CQ-052 | Inconsistency | API routes | Some API routes lack consistent error response format | N/A | Standardize all error responses |
| CQ-053 | MissingProps | `app/admin/jobs/page.tsx:274` | Radio inputs have static `defaultChecked` but no controlled state | N/A | Add controlled state for filters |
| CQ-054 | MissingProps | `app/admin/news/page.tsx:283` | Radio inputs have static `defaultChecked` but no controlled state | N/A | Add controlled state for filters |

---

## Priority Fixes

### HIGH (8 issues)
1. **CQ-006/CQ-009** — Duplicate `ApplicationStatusBadge`: remove `components/admin/ApplicationStatusBadge.tsx`, use import from `ApplicationDetail.tsx`
2. **CQ-030/CQ-031/CQ-032** — Missing error boundaries: add `error.tsx` to `app/`, `app/(public)/`, `app/admin/` layouts
3. **CQ-049/CQ-050** — Dead hidden buttons: implement modal or remove
4. **CQ-036/CQ-037/CQ-038** — Files >250 lines: split into smaller components

### MEDIUM (22 issues)
1. **CQ-001 to CQ-005** — Utility duplication: extract to `lib/utils.ts`
2. **CQ-012 to CQ-021** — Large functions: split into focused sub-components
3. **CQ-043** — Inline `statusLabels` objects: centralize to `lib/constants.ts`
4. **CQ-026/CQ-027/CQ-028** — Silent error catches: add logging
5. **CQ-053/CQ-054** — Uncontrolled radio inputs: add controlled state

### LOW (24 issues)
1. **CQ-033/CQ-034/CQ-035** — Naming inconsistencies: standardize
2. **CQ-039 to CQ-042** — Unused `requireAdmin()` return values: clean up
3. **CQ-045 to CQ-048** — Magic numbers: name constants

---

**Verdict:** WARNING — 8 HIGH issues should be resolved before merge. Most issues are duplication, missing error boundaries, and oversized files.