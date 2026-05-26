# PLAN: TIP-017 Color Token Alignment

[CORE] Source TIP: `coding-packs/tips/TIP-017-color-token-alignment.md`

## 1. INTAKE

[DECISION] Complexity score: **55 / STANDARD**.

Rationale:
- Cross-file UI token work spans Tailwind config, global CSS, public components, CMS components, and admin forms.
- It changes visual output, so browser screenshots are mandatory.
- It is not THOROUGH because the TIP explicitly forbids schema/API/routing/data behavior changes and scope is color-only.

State root: `coding-packs/plans/tip-017-color-token-alignment/.zflow/`.

## 2. Approved Requirements

[CORE] Canonical colors from `coding-packs/research/color-branch.md`:

| Purpose | Value | Expected token usage |
|---|---:|---|
| Primary/default teal | `#006672` | `primary.DEFAULT`, `primary.600`, `teal.DEFAULT`, `teal.text`, `teal-text`, `brand.teal` |
| Hover/dark teal | `#005560` | `primary.800`, `teal.dark`, `brand.darkTeal`, primary hover classes |
| Secondary teal shade | `#00707e` | `primary.700` |
| Accent orange | `#F47F35` | `tertiary.DEFAULT`, `brand.accent` |
| Light teal surface | `#F0F9FA` | `teal.light`, soft callouts/chips/selected surfaces |

Constraints:
- Color-only implementation.
- No layout, spacing, typography, routing, data fetching, translations, CMS behavior, Supabase behavior, or mock fixture changes.
- Do not convert error/success/warning/status colors to brand colors.
- Preserve visual parity over cleanup.

## 3. SPEC / Red Gate Plan

[SPEC] Behavioral specs are in `specs/spec-color-token-alignment.md`.

[RED] Before changing implementation, add targeted tests/static checks that fail for missing or incorrect canonical token mapping. Suggested test scope:
1. Import or parse `tailwind.config.ts` and assert expected token values.
2. Add source-level assertions for critical raw brand duplicates only if stable and not overly brittle.
3. Keep visual screenshot verification for VERIFY, not as brittle unit tests unless existing Playwright snapshot patterns are already stable.

Red Gate conditions:
- Spec file exists.
- Tests compile/type-check.
- At least one new assertion fails before implementation or a documented pre-check proves the current implementation already satisfies token AC-01, in which case proceed with component drift tests/inventory as RED target.

## 4. Decomposition

### Batch 1 — Token source of truth
Artifact: `tips/tip-001-token-source-of-truth.md`

Steps:
1. Inventory current token definitions in `tailwind.config.ts` and color-related CSS variables in `app/globals.css`.
2. Verify token aliases exist for all canonical values.
3. Add or correct missing aliases only; avoid churn where `tailwind.config.ts` already matches.
4. Add targeted token tests/static checks.

### Batch 2 — Component color alignment
Can run in parallel after Batch 1 if file ownership stays separate.

Public surface artifact: `tips/tip-002-public-component-colors.md`
- Inspect `components/public/**/*.tsx`, `app/(public)/**/*.tsx`, and `app/[locale]/**/*.tsx`.
- Replace ad hoc brand hex/arbitrary Tailwind values with named tokens.
- Align primary CTA default/hover, public nav/footer hover, forms, cards, chips, focus rings.

CMS/admin artifact: `tips/tip-003-cms-admin-color-alignment.md`
- Inspect `components/cms/**/*.tsx`, `components/admin/**/*.tsx`, and `app/admin/**/*.tsx`.
- Align sidebar/topbar active states, admin buttons/forms/focus rings to tokens.
- Preserve status/validation/destructive colors.

Search inventory to run during execution:
- `#006672`, `#005560`, `#00707e`, `#F47F35`, `#F0F9FA`
- `bg-[#`, `text-[#`, `border-[#`, `ring-[#`, `from-[#`, `to-[#`
- `hover:text-`, `hover:bg-`, `focus:ring-`, `focus:border-`

### Batch 3 — Verification and reporting
Artifact: `tips/tip-004-verification-and-visual-evidence.md`

Steps:
1. Run `npm run lint`, `npm run type-check`, targeted tests, and `npm run build`.
2. Start the app and capture screenshots at desktop 1440px and mobile 375px for representative public pages.
3. Capture CMS/admin screenshots if auth/local state allows; otherwise document blocker and statically verify CMS diffs.
4. Invoke a separate `code-reviewer` agent for diff review.
5. Write `.zflow/final-report.md` with changed tokens, preserved semantic colors, command results, screenshot paths, gaps, and verifier result.
6. Dispatch EVOLVE as background/non-blocking learning step.

## 5. Quality Gates

[CORE] Required gates before complete:
- Complexity scored: PASS.
- SPEC G/W/T exists: PASS.
- Red Gate executed before implementation: pending execute.
- Green Gate: all spec tests pass after implementation.
- Separate verifier agent reviews the diff.
- Visual output opened and screenshotted at 1440px and 375px.
- No TODO/TBD in delivered implementation.
- DESLOP performs cleanup only, no behavior changes.
- REGRESS re-runs checks after cleanup.
- EVOLVE dispatched in background.

## 6. Verification Evidence Required

Visual evidence minimum:
- Public home desktop/mobile.
- Public jobs or job detail desktop/mobile.
- Public apply/contact form desktop/mobile.
- CMS dashboard or jobs/admin page desktop/mobile if accessible.

Command evidence minimum:
- `npm run lint`
- `npm run type-check`
- `npm run test` or targeted Vitest command for new tests
- `npm run build`

If any command fails due to unrelated existing issues, include exact command, concise failure summary, and why it is unrelated.

## 7. Resume Instructions

To continue implementation from this plan:

```text
/zflow --plan coding-packs/plans/tip-017-color-token-alignment --phase execute
```

Primary artifacts:
- `specs/spec-color-token-alignment.md`
- `.zflow/tasks.json`
- `.zflow/coverage-matrix.md`
- `.zflow/handoff.json`
- `tips/tip-001-token-source-of-truth.md`
- `tips/tip-002-public-component-colors.md`
- `tips/tip-003-cms-admin-color-alignment.md`
- `tips/tip-004-verification-and-visual-evidence.md`
