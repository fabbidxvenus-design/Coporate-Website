# Audit Fix Workflow Round 4 — Plan

## Overview

Address deferred findings from the comprehensive audit (272 total findings, ~142 resolved across rounds 1-3). Remaining ~130 items: mostly low/medium, with ~105 accessibility findings as the largest bucket.

## Prior Completions

- `comprehensive-audit`: 272 findings found. CRITICAL/HIGH resolved.
- `audit-fix-workflow`: All security/data/auth fixes done.
- `audit-fix-workflow-round2`: Image optimization, lazy loading, ISR, jobs refactor done.
- `audit-fix-workflow-round3`: 36/36 Playwright tests pass, DET-TEST-* verified.

## Remaining Work (Deferred)

| Bucket | Count | Priority | Approach |
|--------|-------|---------|----------|
| Accessibility | ~105 | LOW/MEDIUM | Dedicated a11y sprint — selective fixes |
| Performance (remaining) | ~7 | MEDIUM | Code-level items only |
| Code Quality (remaining) | ~8 | LOW | Incremental cleanup |
| TypeScript (remaining) | ~5 | MEDIUM | Strict mode / nullable cleanup |
| Security (remaining) | ~5 | LOW/MEDIUM | Documentation and minor hardening |

## Complexity Score

**Tier: STANDARD** (score estimate: 30)
- Selected medium-priority items from each bucket
- No CRITICAL/HIGH items remaining
- Regression risk: LOW (low/medium only)

## Out of Scope

- Full 105-item a11y sprint (requires visual review, design decisions)
- Production Supabase integration testing
- New feature development

---

## Phase 01 — Accessibility — Selective High-Impact Fixes

**Scope:** Pick the top 10 accessibility findings that are purely mechanical (no design change needed).

**Source:** `plans/comprehensive-audit/a11y-audit.md`

**Criteria:**
- Fixable with code only (no visual redesign)
- Clear ARIA attributes, form labels, focus management
- Not dependent on design system decisions

**Files likely to touch:**
- `app/(public)/apply/page.tsx` — form field associations
- `app/login/page.tsx` — input labels
- `app/(public)/jobs/page.tsx` — filter controls
- `app/(public)/news/page.tsx` — sidebar navigation
- `components/public/*.tsx` — icon-only buttons

**Verification:** `axe` or `playwright` a11y tests on fixed pages.

## Phase 02 — Code Quality — Incremental Cleanup

**Scope:** Small cleanup items from `findings-summary.md` CQ section.

**Items:**
- Magic number extraction (`lib/utils.ts` or constants)
- Naming consistency (already named reasonably)
- Dead code cleanup if any exists

**Verification:** Build passes, no functional change.

## Phase 03 — TypeScript — Nullable / Strict Mode

**Scope:** Remaining TS medium findings.

**Items (TBD after file review):**
- Check for `any` in non-trusted contexts
- Nullable return types that could be explicit
- Strict null checks in data access paths

**Verification:** `npm run type-check` passes.

## Phase 04 — Security — Documentation & Minor Hardening

**Items:**
- SEC-001: Document secret rotation procedure in README
- SEC-002: `.env.example` already updated in round 1
- Verify no new security surface introduced in round 2 changes

**Verification:** Manual code review of round 2 changes.

## Phase 05 — Final Verification

**Steps:**

1. `npm run type-check` ✅
2. `npm run build` ✅
3. Run full audit test suite: `npx playwright test --config=playwright.audit.config.ts` ✅
4. Generate completion report

**Dependencies:** All prior phases complete.
**Risk:** LOW — verification only.

---

## Acceptance Criteria

- [ ] Top 10 mechanical a11y fixes applied and tested
- [ ] Code quality cleanup complete (0 new issues)
- [ ] TypeScript strict mode verified
- [ ] Security documentation updated
- [ ] All tests pass
- [ ] Completion report generated

---

## Out of Scope

- Full a11y sprint (105 items)
- Design system changes
- Production integration testing
- New features