# Phase 03 — Reduced Motion + Color Contrast

## Scope

- A11Y-012: smooth scroll without reduced-motion check
- A11Y-023: card transform animations without reduced-motion
- A11Y-099: service cards + news cards transform without reduced-motion
- A11Y-106: login page animated pulse without reduced-motion
- A11Y-011: footer copyright text `text-white/60` contrast check

## Phase 03A — Reduced Motion

Already handled in `phase-01-focus-visible.md` (globals.css). No separate files needed.

## Phase 03B — Color Contrast Audit

### `components/public/PublicFooter.tsx` — A11Y-011
Check if `text-white/60` (60% opacity white on teal background) meets 4.5:1.
- Teal background: `#008B9C` → luminance ≈ 0.19
- White: `rgba(255,255,255,0.6)` → effective luminance for screen = 0.6
- Contrast ratio: (0.6 + 0.05) / (0.19 + 0.05) = 0.65/0.24 ≈ 2.7:1 — FAILS WCAG AA
- Fix: use `text-white/80` or `text-white` directly

### Verification

```bash
npm run type-check
npm run build
```

## Acceptance Criteria

- [ ] Smooth scroll uses `behavior: 'instant'` when `prefers-reduced-motion: reduce`
- [ ] Card transform animations disabled when `prefers-reduced-motion: reduce`
- [ ] Footer copyright text meets 4.5:1 contrast (≥3:1 for large text ≥18pt)
- [ ] Login page pulse animation respects reduced motion