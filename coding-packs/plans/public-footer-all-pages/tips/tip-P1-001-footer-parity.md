# TIP-P1-001: Implement Shared Public Footer Parity

**Agent:** Implementer
**Model:** sonnet
**File ownership:** 
- `components/public/PublicFooter.tsx`
- `app/(public)/layout.tsx`
- `app/[locale]/layout.tsx`
- `components/public/index.ts`
**Blocked by:** none
**Acceptance criteria:**
- [ ] `PublicFooter.tsx` matches `.design` layout, colors (`#008B9C`), logo, and content.
- [ ] Social links are replaced with accessible `type="button"` controls (no `href="#"`).
- [ ] Internal quick links use real Next.js route paths: `/jobs`, `/about`, `/news`, `/apply`.
- [ ] `app/(public)/layout.tsx` and `app/[locale]/layout.tsx` both render exactly one `<PublicFooter />`.
- [ ] Back to top button works without inline `onclick` (uses client component `window.scrollTo`).
- [ ] Footer copyright matches design: `© 2023 Fabbi. All rights reserved.`

## Context
From PLAN.md: Ensure the `.design` recruitment footer is shared across every public route exactly once, preserves visual parity, uses real internal links, avoids inaccessible placeholder navigation.

## Implementation Notes
- Use `use client` in `PublicFooter.tsx` for the scroll-to-top handler.
- Verify mounting in both root public and localized layouts to avoid duplication or gaps.
- Standardize teal to `#008B9C`.
- Check if Font Awesome is available; if not, use text initials or local svg icons.
