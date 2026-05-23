# Phase-07 Plan: Requirements Compliance Audit — Type & Security Findings

## Intake

**Task:** Audit and fix remaining type-safety and security findings from Phase-02 through Phase-06 of `audit-fix-workflow`, based on `typescript-reviewer` and `security-reviewer` agent outputs.

**Parent Workflow:** `D:\WORKSPACE\CODE\Coporate_Website\plans\audit-fix-workflow`
**Plan Dir:** `D:\WORKSPACE\CODE\Coporate_Website\plans\audit-fix-workflow\phase-07`

## Reviewer Outputs

### Security Reviewer (security-reviewer agent)
- **Result:** PASS — No CRITICAL or HIGH issues
- **Medium findings:**
  - MF-1: Fail-open on non-admin routes in middleware (intentional, admin blocked)
  - MF-2: Client-side admin check in login page (mitigated by server-side middleware + requireAdmin)
  - MF-3: `getSession()` vs `getUser()` inconsistency (intentional, client-side use)
- **Low findings:**
  - LF-1: No rate limiting on login (consider infrastructure-level)
  - LF-2: No audit logging for security events (console.error only)

### TypeScript Reviewer (typescript-reviewer agent)
- **HIGH findings:**
  - HT-1: `jobs: Job | undefined` instead of `jobs: Job | null` in `app/admin/page.tsx` — missing `?? null`
  - HT-2: `employment_type` capitalization mismatch between mock values (lowercase) and label map keys (capitalized) in `app/admin/jobs/page.tsx`
- **MEDIUM findings:**
  - MM-1: `getStats()` return type differs between mock and live branches (nullability inconsistency)
  - MM-2: Label maps use `Record<string, ...>` instead of literal key unions

## Complexity Score

Tier: **STANDARD**

Score estimate: **25**
- 2 HIGH findings (both single-file fixes, no behavioral change)
- 2 MEDIUM findings (type annotation improvements, no logic change)
- No architectural changes or multi-file coordination
- Build already passes

## Workflow

### Phase 1 — Fix TypeScript HIGH Findings

#### HT-1: `app/admin/page.tsx` — Missing `?? null` on `mockJobs.find()`
```typescript
// Current (line ~27):
jobs: mockJobs.find(j => j.id === app.job_id),
// Fix:
jobs: mockJobs.find(j => j.id === app.job_id) ?? null,
```

#### HT-2: `app/admin/jobs/page.tsx` — `employment_type` capitalization mismatch
```typescript
// Current (lines 22-28):
const employmentTypeLabels: Record<string, string> = {
  'Full-time': 'Full-time',
  'Part-time': 'Part-time',
  'Freelancer': 'Freelancer',
  'Internship': 'Internship',
  'Contract': 'Contract',
}

// Fix: align keys to DB schema lowercase values
const employmentTypeLabels: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  'freelancer': 'Freelancer',
  'internship': 'Internship',
  'contract': 'Contract',
}
```

### Phase 2 — Improve Type Safety (MEDIUM)

#### MM-1: Add explicit return types to `getStats()` functions
Add explicit return types to prevent branch type drift in:
- `app/admin/jobs/page.tsx` — `getStats()`
- `app/admin/news/page.tsx` — `getStats()`

#### MM-2: Consider literal key unions for label maps
Optional improvement — `Record<'new'|'reviewing'|...>` vs `Record<string, ...>`
Can be addressed as part of Phase 2 cleanup, not blocking.

### Phase 3 — Verification

Run:
- `npx tsc --noEmit`
- `npm run build`
- Reviewer findings addressed: HT-1, HT-2, MM-1, MM-2

### Phase 4 — EVOLVE

Dispatch background agent to record learnings.

## Non-Goals

- Do not implement rate limiting — infrastructure-level concern
- Do not add audit logging beyond `console.error` — can be addressed in production observability
- Do not change auth architecture — security reviewer confirmed PASS
- Do not modify mock data structure beyond the `?? null` fix

## Execution Order

1. Fix HT-1 in `app/admin/page.tsx`
2. Fix HT-2 in `app/admin/jobs/page.tsx`
3. Add explicit return types (MM-1)
4. Run verification
5. Record learnings
6. Complete

## Acceptance Criteria

- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes
- [ ] HT-1 fixed: `jobs` typed as `Job | null` not `Job | undefined`
- [ ] HT-2 fixed: `employment_type` label map uses lowercase keys
- [ ] No functional behavior changes