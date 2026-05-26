# TIP-003: CMS and admin color alignment

**Agent:** frontend implementer
**Model:** sonnet
**File ownership:** `components/cms/**/*.tsx`, `components/admin/**/*.tsx`, `app/admin/**/*.tsx` color-class-only edits
**Blocked by:** tip-001
**Acceptance criteria:**
- [ ] CMS sidebar/topbar brand accents, active states, buttons, and focus states use canonical teal tokens.
- [ ] Admin forms use tokenized brand colors for primary actions and focus rings.
- [ ] Workflow/status badges keep semantic colors.
- [ ] No auth, CMS mutation, Supabase, table data, or form behavior changes are made.

## Context
Admin screens contain user/application data surfaces; do not alter behavior while changing color classes.

## Implementation Notes
Treat disabled, status, error, success, warning, and destructive colors as semantic. Document any intentionally preserved non-brand colors in the verification report.
