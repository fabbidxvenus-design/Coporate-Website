# TypeScript Audit Report

## Executive Summary

- **Project**: Coporate_Website (Next.js with Supabase)
- **Date**: 2026-05-23
- **Baseline**: npx tsc --noEmit produces 0 errors (clean compilation)
- **Scope**: lib/, app/, components/ - all target files
- **Overall Assessment**: Code compiles but has type-safety gaps, unsafe patterns, and design-level issues

## Findings

| ID | Severity | File | Line | Issue | Fix |
|----|----------|------|------|-------|-----|
| TS-001 | HIGH | app/api/applications/route.ts | 122 | as never cast bypasses insert type validation | Use TablesInsert types |
| TS-002 | HIGH | app/api/applications/[id]/route.ts | 113 | as never cast on update payload | Define typed interfaces |
| TS-003 | HIGH | app/api/news/route.ts | 70,82 | as never cast on article insert | Use TablesInsert news_articles |
| TS-004 | HIGH | app/api/news/[id]/route.ts | 132,145 | as never cast on article update | Use TablesUpdate news_articles |
| TS-005 | HIGH | app/api/settings/route.ts | 139 | as never cast on settings upsert | Create typed upsert payload |
| TS-006 | MEDIUM | lib/auth.ts | 10 | getCurrentUser lacks explicit return type | Add return type annotation |
| TS-007 | MEDIUM | lib/auth.ts | 59 | requireAdmin lacks explicit return type | Add return type annotation |
| TS-008 | MEDIUM | lib/auth.ts | 84 | getSession lacks explicit return type | Add return type annotation |
| TS-009 | MEDIUM | lib/supabase/server.ts | 13 | createClient return type null | SupabaseClient | Document null-ability |
| TS-010 | MEDIUM | components/admin/ArticleForm.tsx | 72 | handleSubmit has implicit any on parameter | Explicitly type |
| TS-011 | MEDIUM | components/admin/ArticleForm.tsx | 254 | onClick with unsafe double cast | Refactor handler |
| TS-012 | MEDIUM | components/admin/SettingsForm.tsx | 6,23 | Record string vs string null mismatch | Use Record string null |
| TS-013 | MEDIUM | components/public/ApplyForm.tsx | 32-43 | validate has implicit any | Explicitly type errors |
| TS-014 | MEDIUM | components/public/ApplicationModal.tsx | 18 | handleSubmit untyped setTimeout | Add return type |
| TS-015 | MEDIUM | components/public/JobDetailClient.tsx | 28 | display none button dead code | Remove or wire |
| TS-016 | MEDIUM | app/(public)/jobs/[slug]/page.tsx | 412 | onClick on server component | Move to client |
| TS-017 | MEDIUM | app/(public)/jobs/[slug]/page.tsx | 422-430 | onClick server component | Move to JobDetailClient |
| TS-018 | MEDIUM | app/(public)/page.tsx | 1-92 | Hardcoded arrays no types | Add interfaces |
| TS-019 | MEDIUM | app/(public)/about/page.tsx | 1-55 | Hardcoded arrays no types | Define interfaces |
| TS-020 | MEDIUM | components/ui/DataTable.tsx | 61 | Unsafe generic cast | Use item directly |
| TS-021 | MEDIUM | lib/api-response.ts | 1-11 | ApiResponse uses null vs undefined | Use undefined |
| TS-022 | MEDIUM | lib/api-response.ts | 9 | apiError returns ApiResponse never | Fix discriminated union |
| TS-023 | MEDIUM | lib/mock-data.ts | 22-28 | Type mismatch spread merge | Use ApplicationWithJob |
| TS-024 | MEDIUM | app/admin/applications/[id]/page.tsx | 16 | Unnecessary async wrapper | Remove async |
| TS-025 | MEDIUM | components/admin/ApplicationStatusBadge.tsx | 6 | Duplicate export | Consolidate |
| TS-026 | LOW | lib/sanitize.ts | 3,11 | Missing return types | Add string |
| TS-027 | LOW | lib/utils.ts | 5,9,17 | Missing return types | Add explicit types |
| TS-028 | LOW | app/(public)/jobs/page.tsx | 50,188 | Missing return types | Add types |
| TS-029 | LOW | app/(public)/news/page.tsx | 37,203 | Missing return types | Add types |
| TS-030 | LOW | app/(public)/jobs/page.tsx | 279-303 | String literals vs DB enums | Use employment_type |
| TS-031 | LOW | components/cms/CmsSidebar.tsx | 47 | createClient at module level | Move to useEffect |
| TS-032 | LOW | app/api/settings/route.ts | 53-58 | Mutation in for-of loop | Use immutable |
| TS-033 | LOW | types/database.ts | 301-302 | Json used as string | Add type guard |

## Detailed Analysis

### 1. as never Type Casts (TS-001 to TS-005) - HIGH

All Supabase insert/update operations use as never to bypass type checking. This disables type checking on payloads.

Danger: If schema and code diverge, mismatched fields silently pass.

Fix: Use TablesInsert T and TablesUpdate T from types/database.ts

### 2. Missing Return Type Annotations (TS-006 to TS-008) - MEDIUM

Functions in lib/auth.ts rely on inference. This creates invisible contracts that break silently.

Fix: Define explicit return types for getCurrentUser, requireAdmin, getSession

### 3. Server Component with Event Handlers (TS-016 to TS-017) - MEDIUM

jobs/[slug]/page.tsx is a server component but has onClick handlers. Next.js strips these - zero runtime effect.

Fix: Move floating action button to JobDetailClient.tsx

### 4. Duplicate Component Export (TS-025) - MEDIUM

ApplicationStatusBadge exported from two files: ApplicationDetail.tsx and ApplicationStatusBadge.tsx

Fix: Consolidate into one file

### 5. Unsafe Generic DataTable Cast (TS-020) - MEDIUM

Unsafe cast loses generic constraint. Safer: use item col.key directly

### 6. Implicit any in Event Handlers (TS-010 to TS-011) - MEDIUM

Double cast as unknown as React.FormEvent indicates API design issue

Fix: Separate status handler from form submit

### 7. Supabase Nullable Client (TS-009) - MEDIUM

createClient returns null but type not documented

### 8. Hardcoded Data Without Types (TS-018 to TS-019) - MEDIUM

Public pages have hardcoded arrays without type annotations

### 9. API Response Type Inconsistency (TS-021 to TS-022) - MEDIUM

ApiResponse uses null instead of undefined. apiError loses generic.

### 10. Module-Level Supabase Client (TS-031) - LOW

createClient called at module level should be in useEffect

## Type Safety Recommendations

1. Replace all as never casts with TablesInsert T and TablesUpdate T
2. Add explicit return types to all exported async functions in lib/
3. Migrate server-component event handlers to client components
4. Consolidate duplicate exports
5. Use zod for API input validation
6. Define interfaces for hardcoded data
7. Align null vs undefined - prefer undefined
8. Fix DataTable generic rendering

## Baseline

npx tsc --noEmit - Exit code: 0, Errors: 0

The codebase compiles cleanly under strict: true. All issues are type-quality issues, not type errors.

---
Report generated by TypeScript audit agent.
