# Phase 01 — Focus Visible System

## Scope

Add WCAG 2.2 compliant focus-visible styles across all interactive elements. Replace suppressed or insufficient focus indicators with consistent `outline-2 outline-offset-2` approach.

## Files

### 1. `app/globals.css` — Global Focus + Reduced Motion
Add global `focus-visible` override and `@media (prefers-reduced-motion)`:
```css
@layer base {
  /* Replace browser default with project focus */
  :focus-visible {
    @apply outline-2 outline-offset-2 outline-primary;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

### 2. `components/ui/Button.tsx`
Fix A11Y-082 (spinner aria-hidden):
- Spinner: `aria-hidden="true"`
- Button: `aria-busy={loading}` when loading
- `focus-visible` ring is already on baseStyles (line 20), check it's applied correctly

### 3. `components/ui/Input.tsx` — A11Y-119
Fix focus ring too subtle (`primary/20`):
```tsx
className={cn(
  'w-full px-4 py-3 bg-white border rounded text-body-md text-on-surface placeholder:text-outline',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  error ? 'border-error focus-visible:ring-error focus-visible:border-error' : 'border-outline-variant focus-visible:border-primary',
  'transition-all',
  className
)}
```
Also add spinner aria-hidden if any (Input doesn't have one currently).

### 4. `components/ui/Select.tsx` — A11Y-120
Same focus ring fix + forced-colors compatible:
```tsx
className={cn(
  'w-full px-4 py-3 bg-white border rounded text-body-md text-on-surface',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  error ? 'border-error focus-visible:ring-error focus-visible:border-error' : 'border-outline-variant focus-visible:border-primary',
  'transition-all appearance-none',
  /* forced-colors compatible: ensure right padding for custom arrow */
  'pr-10',
  className
)}
```

### 5. `components/ui/Textarea.tsx`
Same focus ring fix pattern as Input/Select.

### 6. `components/public/PublicHeader.tsx` — A11Y-005, A11Y-006
- Nav links: add `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008b9c]`
- A11Y-005: explicit focus styles on header links
- A11Y-006: skip link is not in scope here — Phase 02

### 7. `components/public/PublicFooter.tsx` — A11Y-013, A11Y-116
- Social links: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`
- Back-to-top: `focus-visible:outline-2 focus-visible:outline-offset-2`
- A11Y-012: Smooth scroll already uses `window.scrollTo({ top: 0, behavior: 'smooth' })` — will be handled in Phase 03 reduced-motion

### 8. `components/public/JobCard.tsx` — A11Y-018, A11Y-019
- Bookmark button: increase to 44×44px min (`min-w-11 min-h-11`)
- Apply link: add `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`

### 9. `components/public/NewsCard.tsx` — A11Y-025
- Card link: add `focus-visible:outline-2 focus-visible:outline-offset-2`

## Acceptance Criteria

- [ ] All buttons, links, inputs have visible 2px focus ring on Tab
- [ ] Focus ring contrast ≥3:1 against adjacent background
- [ ] No element suppresses focus with `outline-none` without `focus-visible` alternative
- [ ] Reduced motion CSS added globally

## Verification

```bash
npm run type-check
npm run build
```

[CRITICAL] No functional behavior changes — purely visual CSS/Tailwind class additions.