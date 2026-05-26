# TIP-P1-004: Localize Footer and Verify Language Switcher

**Agent:** Implementer
**Model:** opus
**File ownership:**
- `components/public/PublicHeader.tsx`
- `components/public/PublicFooter.tsx`
- `app/[locale]/layout.tsx`
**Blocked by:** TIP-P1-002
**Acceptance criteria:**
- [ ] Footer visible text switches between Vietnamese and Japanese on localized routes.
- [ ] Footer quick links include active locale prefixes on localized routes.
- [ ] Header language switch preserves the active route path (`/vi/jobs` -> `/ja/jobs`).
- [ ] TIP-012 footer tests remain green.
- [ ] No social item uses `href="#"`.

## Context
TIP-012 made the footer shared and accessible. TIP-013 must preserve that work while localizing footer text and confirming the existing header switch does not only localize nav labels.

## Implementation Notes
- Keep the teal footer layout and logo structure unchanged.
- Prefer passing locale/dictionary from layout or deriving consistently with the header.
- Do not add footer to admin routes.
