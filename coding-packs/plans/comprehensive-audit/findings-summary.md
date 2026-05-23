# Comprehensive Audit — Findings Summary

**Date:** 2026-05-23
**Plan:** `plans/comprehensive-audit`
**Parent:** `audit-fix-workflow` (completed)
**Tier:** THOROUGH

---

## Aggregate Finding Count

| Dimension | CRITICAL | HIGH | MEDIUM | LOW | Total |
|----------|----------|------|--------|-----|-------|
| Security | 0 | 4 | 7 | 15 | 26 |
| TypeScript | 0 | 5 | 20 | 8 | 33 |
| Performance | 0 | 11 | 20 | 8 | 39 |
| Accessibility | 0 | 0 | 80 | 40 | 120 |
| Code Quality | 0 | 8 | 22 | 24 | 54 |
| **Total** | **0** | **28** | **149** | **95** | **272** |

---

## CRITICAL Findings — None

No CRITICAL severity issues found across any dimension.

---

## HIGH Priority Findings (28 total)

### Security — 4 HIGH

| ID | File | Issue | Fix |
|----|------|--------|-----|
| SEC-001 | `.env.local:9-11` | Placeholder credentials documented — no real secrets found, but rotation docs needed | Add `SUPABASE_SERVICE_ROLE_KEY` rotation instructions to README |
| SEC-002 | `.env.example:30` | Template documents `SERVICE_ROLE_KEY` with placeholder | Add "NEVER commit real values" comment |
| SEC-008 | `app/(public)/jobs/[slug]/page.tsx:193-197` | Hardcoded external image URL in hero banner | Replace with local asset or validate against allowlist |
| SEC-018 | `app/api/applications/route.ts:87` | `Date.now()` for CV filename prefix — collision risk | Replace with `crypto.randomUUID()` |

### TypeScript — 5 HIGH

| ID | File | Issue | Fix |
|----|------|--------|-----|
| TS-001 | `app/api/applications/route.ts:122` | `as never` bypasses insert type validation | Use `TablesInsert<applications>` from types/database.ts |
| TS-002 | `app/api/applications/[id]/route.ts:113` | `as never` cast on update payload | Define typed update interface |
| TS-003 | `app/api/news/route.ts:70,82` | `as never` cast on article insert | Use `TablesInsert<news_articles>` |
| TS-004 | `app/api/news/[id]/route.ts:132,145` | `as never` cast on article update | Use `TablesUpdate<news_articles>` |
| TS-005 | `app/api/settings/route.ts:139` | `as never` cast on settings upsert | Create typed upsert payload |

### Performance — 11 HIGH

| ID | File | Issue | Fix |
|----|------|--------|-----|
| PERF-001 | `app/admin/jobs/page.tsx:53-83` | 4 sequential count queries in `getStats()` | Single query with `COUNT(*) FILTER (WHERE ...)` |
| PERF-002 | `app/admin/news/page.tsx:53-83` | 4 sequential count queries in `getStats()` | Same as PERF-001 |
| PERF-003 | `app/admin/jobs/page.tsx:36-51` | No pagination — fetches ALL jobs | Add `range(offset, offset + limit)` |
| PERF-004 | `app/admin/news/page.tsx:36-51` | No pagination — fetches ALL articles | Add `range(offset, offset + limit)` |
| PERF-005 | `app/admin/applications/page.tsx:34-52` | No pagination — fetches ALL applications | Add `range(offset, offset + limit)` |
| PERF-009 | `app/admin/jobs/page.tsx:90-155` | `JobRow` re-renders on any parent change — no memoization | Wrap with `React.memo(JobRow)` |
| PERF-010 | `app/admin/news/page.tsx:90-167` | `ArticleRow` re-renders on any parent change | Wrap with `React.memo(ArticleRow)` |
| PERF-015 | `app/admin/news/page.tsx:100` | `<img>` tag has no width/height/loading — causes CLS | Add explicit dimensions + `loading="lazy"` |
| PERF-018 | `app/(public)/news/page.tsx:67-143` | Multiple `<img>` tags with no performance attributes | Use Next.js `<Image>` with `priority` for above-fold |
| PERF-019 | `app/(public)/news/[slug]/page.tsx:136-205` | Featured image missing LCP optimization | Add `fetchpriority="high"` + `<Image>` |
| PERF-020 | All pages | No `next/dynamic` lazy loading anywhere | Lazy-load `ApplyForm`, `ApplicationModal`, admin forms |

### Code Quality — 8 HIGH

| ID | File | Issue | Fix |
|----|------|--------|-----|
| CQ-006 | `components/admin/ApplicationDetail.tsx:17-33` | Duplicate `ApplicationStatusBadge` defined in two places | Remove `ApplicationStatusBadge.tsx`; use import |
| CQ-009 | `components/admin/ApplicationStatusBadge.tsx` | Entire file dead code — duplicate definition | Delete file; import from `ApplicationDetail.tsx` |
| CQ-030 | `app/layout.tsx` | No error boundary — full app crash on client error | Add `error.tsx` |
| CQ-031 | `app/(public)/layout.tsx` | No error boundary in public segment | Add `error.tsx` in `(public)` |
| CQ-032 | `app/admin/layout.tsx` | No error boundary in admin segment | Add `error.tsx` in `admin` |
| CQ-049 | `components/public/JobDetailClient.tsx:25-33` | Button with `display: 'none'` — dead debug code | Remove or implement modal |
| CQ-050 | `app/(public)/jobs/[slug]/page.tsx:408-430` | Floating apply button triggers non-existent modal | Implement modal or remove |
| CQ-036 | `app/(public)/jobs/[slug]/page.tsx` | 433-line file exceeds 250-line threshold | Split into sidebar, related jobs, job sections |

---

## Fix Execution Order

### Wave 1 — CRITICAL-equivalent HIGH (Safety & Stability)

**Files affected:** `app/layout.tsx`, `app/(public)/layout.tsx`, `app/admin/layout.tsx`, `components/admin/ApplicationStatusBadge.tsx`, `components/public/JobDetailClient.tsx`, `app/(public)/jobs/[slug]/page.tsx`, `app/api/applications/route.ts`, `app/api/applications/[id]/route.ts`, `app/api/news/route.ts`, `app/api/news/[id]/route.ts`, `app/api/settings/route.ts`

1. Add `error.tsx` to all 3 layout segments (CQ-030/031/032)
2. Remove dead `ApplicationStatusBadge.tsx` file (CQ-009)
3. Remove dead hidden button + floating apply dead code (CQ-049/CQ-050)
4. Replace `as never` casts in all API routes with typed payloads (TS-001 → TS-005)
5. Replace `Date.now()` with `crypto.randomUUID()` for CV filenames (SEC-018)

### Wave 2 — HIGH (Functionality & Performance)

**Files affected:** `app/admin/jobs/page.tsx`, `app/admin/news/page.tsx`, `app/admin/applications/page.tsx`, `app/(public)/news/page.tsx`, `app/(public)/news/[slug]/page.tsx`, `lib/supabase/admin.ts`

1. Fix N+1 stats queries: single query with conditional aggregation (PERF-001/002)
2. Add server-side pagination to all 3 admin list pages (PERF-003/004/005)
3. Add `React.memo` to `JobRow` and `ArticleRow` (PERF-009/010)
4. Fix image optimization: explicit dimensions + Next.js `<Image>` (PERF-015/018/019)
5. Add lazy loading via `next/dynamic` for heavy components (PERF-020)

### Wave 3 — MEDIUM (Type Safety, A11y, Quality)

**Files affected:** `lib/auth.ts`, `lib/utils.ts`, `components/`, `app/`, `components/admin/`, `components/public/`, `components/ui/`

1. Add explicit return types to exported `lib/auth.ts` functions (TS-006/007/008)
2. Extract duplicated utilities to `lib/utils.ts` (CQ-001 → CQ-005)
3. Centralize `statusLabels` and other inline constants to `lib/constants.ts` (CQ-043)
4. Add ARIA labels, form associations, error announcements across components (A11Y-*)
5. Add `prefers-reduced-motion` support (A11Y-012, A11Y-023)
6. Fix DOMPurify server component compatibility (SEC-010)
7. Add fail-closed auth behavior for sensitive middleware paths (SEC-003)

### Wave 4 — LOW (Polish & Refinement)

**Files affected:** Various

1. Naming standardization across codebase (CQ-033/034/035)
2. Unused variable cleanup (CQ-039 → CQ-042)
3. Magic number extraction to named constants (CQ-045 → CQ-048)
4. Add bundle analyzer to `next.config.mjs` (PERF-030)
5. Add ISR caching via `revalidate` exports (PERF-024/025)

---

## Files Requiring Changes

### Wave 1 (highest priority)
```
app/error.tsx                          ← NEW: root error boundary
app/(public)/error.tsx               ← NEW: public segment error boundary
app/admin/error.tsx                  ← NEW: admin segment error boundary
components/admin/ApplicationStatusBadge.tsx  ← DELETE
components/public/JobDetailClient.tsx      ← remove dead button
app/(public)/jobs/[slug]/page.tsx        ← remove floating apply dead code
app/api/applications/route.ts           ← as never fix, crypto.randomUUID
app/api/applications/[id]/route.ts       ← as never fix
app/api/news/route.ts                   ← as never fix
app/api/news/[id]/route.ts               ← as never fix
app/api/settings/route.ts               ← as never fix
```

### Wave 2 (performance)
```
app/admin/jobs/page.tsx          ← N+1 fix, pagination, React.memo
app/admin/news/page.tsx          ← N+1 fix, pagination, React.memo, image fix
app/admin/applications/page.tsx  ← pagination
app/(public)/news/page.tsx       ← image optimization
app/(public)/news/[slug]/page.tsx ← image optimization
components/public/ApplyForm.tsx  ← lazy load with next/dynamic
components/public/ApplicationModal.tsx ← lazy load with next/dynamic
```

### Wave 3 (medium)
```
lib/auth.ts                    ← explicit return types
lib/utils.ts                   ← extract duplicated formatters
lib/constants.ts               ← centralize statusLabels, employmentTypeLabels, etc.
components/ui/*.tsx           ← form label associations, aria-hidden on icons
components/public/*.tsx        ← a11y fixes, focus-visible styles
components/admin/*.tsx         ← a11y fixes
app/(public)/*.tsx             ← a11y fixes, focus-visible styles
middleware.ts                  ← fail-closed auth for sensitive paths
lib/sanitize.ts               ← DOMPurify server component compatibility
```

---

## Verification Gates

After each wave:
- `npm run build` must pass
- `npx tsc --noEmit` must pass (zero errors)
- Screenshot capture for any visual changes
- Separate reviewer agent re-verifies after each wave

---

## Non-Goals

- No new features
- No visual design changes except where required for a11y
- No architecture refactoring — only fix specific findings
- No commits unless explicitly requested