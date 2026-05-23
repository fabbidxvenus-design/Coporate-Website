# INTAKE — A11y Complete Audit

**Date:** 2026-05-23
**Tier:** THOROUGH | Score: 85
**effort=max quality=max**

## Context

From `plans/GRAND-COMPLETION-REPORT.md` deferred items:

| Item | Count | Priority |
|------|-------|----------|
| Accessibility full sprint | ~95 | Medium (design review needed first) |
| Form labels + aria-invalid | ~30 (A11Y-036 to 089) | High |
| Modal focus trap | ~4 (A11Y-047 to 050) | High |
| Live regions for dynamic feedback | ~8 (A11Y-034,043,054,070,071,080,093,106) | Medium |
| Rate limiting implementation | infra-level | Medium |

## Complexity Scoring

- **Lexical signals:** security (+15), refactor (+20), production (+15), architecture (+20) = 35
- **Structural signals:** cross-file scope (10+ files), test requirements (+5), system-wide impact (+20) = 35
- **Impact:** multi-component, design-review-dependent, infrastructure-level = 25
- **Score:** 85 → THOROUGH

## Scope Decision

Given `--effort=max --quality=max`, the plan will cover ALL deferred items across multiple rounds:

1. **Round 5 — Design Review Prep**: Audit findings review, component prioritization, design direction
2. **Round 6 — Form Structure Fixes**: Labels, aria-invalid, association patterns (A11Y-036 to 089)
3. **Round 7 — Modal Focus Trap**: Accessible modal implementation (A11Y-047 to 050)
4. **Round 8 — Live Regions**: Dynamic feedback announcements (A11Y-034, 043, 054, etc.)
5. **Round 9 — Rate Limiting**: Implementation (infra-level)

> [DECISION] Rounds 5-9 will each be separate zflow plan executions. This INTAKE creates the master plan with all round scopes. Each round is independently executable via `zflow --plan ...`.

## Tech Stack

- Next.js 15 App Router + TypeScript
- Supabase SSR auth
- Playwright v1.60.0 (existing test infrastructure)
- no external UI library (native React + CSS)

## Next Phase

SPEC → generate behavioral specs for all 5 rounds.