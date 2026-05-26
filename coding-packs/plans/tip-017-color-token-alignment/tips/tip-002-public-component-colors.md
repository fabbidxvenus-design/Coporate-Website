# TIP-002: Public component color alignment

**Agent:** frontend implementer
**Model:** sonnet
**File ownership:** `components/public/**/*.tsx`, `app/(public)/**/*.tsx`, `app/[locale]/**/*.tsx` color-class-only edits
**Blocked by:** tip-001
**Acceptance criteria:**
- [ ] Public header/footer link hover and active states use teal text/default tokens.
- [ ] Public primary CTAs use teal default + dark teal hover.
- [ ] Job/news/application/contact brand accents use tokenized teal/orange/light teal values.
- [ ] No layout, copy, routing, form behavior, localization, or data behavior changes are made.

## Context
Preserve visual parity priority. This pass only replaces brand color usage and hover/focus color classes.

## Implementation Notes
Use source searches for `#006672`, `#005560`, `#00707e`, `#F47F35`, `#F0F9FA`, `bg-[#`, `text-[#`, `border-[#`, `hover:text`, `hover:bg`, and `focus:ring`. Convert brand duplicates to tokens; leave semantic status colors alone.
