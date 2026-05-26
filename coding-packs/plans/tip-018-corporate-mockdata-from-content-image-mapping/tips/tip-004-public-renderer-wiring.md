# TIP-004: Public renderer wiring

## HEADER
- TIP-ID: TIP-004
- Project: Coporate_Website
- Module: Public renderer wiring
- Priority: P0
- Depends on: TIP-002, TIP-003
- Estimated: M

## CONTEXT
- Key components:
  - `app/(public)/news/page.tsx`
  - `app/(public)/news/[slug]/page.tsx`
  - `app/(public)/about/page.tsx`

## APPLICABLE STANDARDS
- frontend/html-to-nextjs

## TASK
1. Update news and about page renderers to use `normalizeLocalImage` helper.
2. Remove bare filename logic or double-prefixing logic from component files.

## ACCEPTANCE CRITERIA
- Components render images using corrected helper.
- No bare filenames in components.
