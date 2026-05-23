# Audit Fix Workflow — Round 2

## Intake

**Task:** Execute the deferred/remaining findings from the comprehensive audit (`plans/comprehensive-audit`). Address remaining a11y, security, performance, and code quality items. Complete image optimization and dynamic loading. Schedule dedicated a11y sprint.

**Plan Dir:** `D:\WORKSPACE\CODE\Coporate_Website\plans\audit-fix-workflow-round2`
**Parent:** `audit-fix-workflow` (COMPLETE ✅), `comprehensive-audit` (COMPLETE ✅)
**Tier:** THOROUGH | Effort: max | Quality: max

## Prior Context

- `audit-fix-workflow`: All 8 tasks (AF-001 → AF-008) complete ✅ — Security, auth, CMS data, API hardening, silent failure cleanup, verification, type fixes, visual evidence
- `comprehensive-audit`: All 3 waves complete ✅ — 272 findings found, ~142 fixed, ~130 deferred

**Deferred items from comprehensive audit:**

| Category | Deferred | Priority Focus |
|----------|----------|----------------|
| Accessibility | ~105 | ARIA labels, focus styles, form associations, reduced-motion |
| Security | 5 | SEC-001/002/003/008/010 |
| Code Quality | 8 | Large file refactor, naming, magic numbers |
| Performance | 7 | Image optimization, next/dynamic lazy loading |

## Complexity Score

Tier: **STANDARD** (focused on specific items, not full codebase sweep)

Score estimate: **45**
- ~130 remaining items across 4 dimensions
- Some items require visual review (a11y) before implementing
- Image optimization is concrete and testable
- Large file refactor needs careful planning

## Scope

### Priority 1 — Performance (Image + Dynamic Loading)

**PERF-015/018/019/020:**
- Replace `<img>` tags with Next.js `<Image>` in news pages
- Add `priority` for above-fold images (LCP optimization)
- Add `fetchpriority="high"` for hero/featured images
- Lazy load `ApplyForm`, `ApplicationModal` via `next/dynamic`

### Priority 2 — Accessibility Sprint (Focused)

**A11Y items (sample from 120 findings):**
- ARIA labels on icon-only buttons
- Form field associations (`htmlFor` / `id`)
- Error announcements with `aria-live`
- Focus-visible styles on all interactive elements
- `prefers-reduced-motion` for animations
- Alt text on all images

**Note:** ~105 a11y findings — recommend dedicated sprint with design review. Do critical ones now (icon buttons, forms), flag rest for sprint.

### Priority 3 — Security Remaining

**SEC-001/002:** `.env.example` documentation improvements
**SEC-003:** Fail-closed auth in middleware for `/api/admin/*` paths
**SEC-008:** Hardcoded external image URL — replace with local asset or allowlist
**SEC-010:** DOMPurify server component compatibility

### Priority 4 — Code Quality

**CQ-036:** Refactor `app/(public)/jobs/[slug]/page.tsx` (433 lines → ~3 focused files)
**CQ-049/050:** Already fixed in Wave 1 ✅
**Naming standardization, magic number extraction:** Minor cleanup

## Workflow

### Phase 1 — Performance Image Fix (SPEC → Execute → Verify)

1. Replace all `<img>` in `app/(public)/news/page.tsx` with Next.js `<Image>`
2. Replace featured image in `app/(public)/news/[slug]/page.tsx` with `<Image>` + `priority`
3. Add `next/dynamic` lazy loading for `ApplyForm` and `ApplicationModal`
4. Verify build + Lighthouse CWV

### Phase 2 — Critical A11y Fixes

1. ARIA labels on all icon-only buttons in `components/public/` and `components/ui/`
2. Form field associations in apply form and search forms
3. Focus-visible outline styles on all interactive elements
4. `prefers-reduced-motion` wrapper for animated sections

### Phase 3 — Security Remaining

1. Add fail-closed behavior for sensitive API paths in middleware
2. Replace SEC-008 hardcoded image URL
3. Add DOMPurify server-side compat check

### Phase 4 — Code Quality Fixes

1. Refactor `jobs/[slug]/page.tsx` into sidebar + related jobs + job body components
2. Naming standardization sweep
3. Magic number extraction

### Phase 5 — Verification & Report

1. `npm run build` + `tsc --noEmit`
2. Screenshot capture for any visual changes
3. Separate reviewer agent re-verifies
4. Generate final report

## Files Requiring Changes

```
app/(public)/news/page.tsx         ← Image optimization
app/(public)/news/[slug]/page.tsx  ← Image optimization + priority
components/public/ApplyForm.tsx     ← next/dynamic lazy load
components/public/ApplicationModal.tsx ← next/dynamic lazy load
components/public/*.tsx             ← ARIA labels, focus styles
components/ui/*.tsx                 ← ARIA labels
components/admin/*.tsx               ← ARIA labels
app/layout.tsx                      ← error boundary (already done)
lib/sanitize.ts                     ← DOMPurify compat check
middleware.ts                       ← fail-closed for sensitive paths
app/(public)/jobs/[slug]/page.tsx   ← refactor into components
```

## Non-Goals

- No new features
- No visual design changes except where required for a11y
- No architecture refactoring beyond the `jobs/[slug]` file
- No commits unless explicitly requested

## Acceptance Criteria

- [ ] Image optimization complete — all `<img>` → `<Image>` with proper loading
- [ ] `next/dynamic` lazy loading for ApplyForm and ApplicationModal
- [ ] Critical a11y fixes (icon buttons, forms) completed
- [ ] SEC-003/008/010 resolved
- [ ] `jobs/[slug]/page.tsx` refactored to <250 lines per file
- [ ] `npm run build` passes throughout
- [ ] Final report generated