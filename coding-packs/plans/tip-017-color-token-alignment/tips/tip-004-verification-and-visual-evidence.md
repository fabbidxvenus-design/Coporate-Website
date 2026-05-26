# TIP-004: Verification and visual evidence

**Agent:** verifier / QA
**Model:** sonnet
**File ownership:** `coding-packs/plans/tip-017-color-token-alignment/.zflow/*`, screenshot evidence only
**Blocked by:** tip-001, tip-002, tip-003
**Acceptance criteria:**
- [ ] `npm run lint`, `npm run type-check`, relevant tests, and `npm run build` are run or failures are documented as pre-existing/unrelated with exact summaries.
- [ ] Browser verification captures desktop 1440px and mobile 375px screenshots for representative public and CMS screens.
- [ ] Separate code-reviewer verifier reviews the diff and reports no CRITICAL/HIGH issues.
- [ ] Final report documents changed token names, preserved semantic colors, checks, screenshots, and any gaps.

## Context
Visual output verification is mandatory for this TIP because the deliverable changes UI colors.

## Implementation Notes
If admin screens require auth or Supabase state not available locally, verify accessible public screens and document the admin blocker; still review CMS source diff statically.
