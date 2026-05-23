# A11y Complete Audit — Master Plan

**Date:** 2026-05-23
**Status:** INTAKE ✅ | SPEC ✅ | RRI/SKIP | SDD/SKIP | PROPOSAL/SKIP
**Tier:** THOROUGH | effort=max | quality=max
**Plan-dir:** `plans/a11y-complete-audit/`
**State:** `.zflow/` scoped to plan-dir

---

## Goal

Fix all ~120 remaining accessibility findings from `plans/comprehensive-audit/a11y-audit.md` (126 findings total, 10 fixed in Round 4 = ~116 remaining) across 5 execution rounds. Each round is independently executable via `zflow --plan <round-plan>`.

---

## Rounds

| Round | Plan Dir | Scope | Priority |
|-------|----------|-------|----------|
| 5 | `a11y-complete-audit/round-5-focus-motion/` | Focus visible system, skip links, reduced motion, contrast | HIGH |
| 6 | `a11y-complete-audit/round-6-form-labels/` | Form label associations, aria-invalid, error announcements | CRITICAL |
| 7 | `a11y-complete-audit/round-7-modal/` | Modal dialog ARIA, focus trap, escape key, target size | HIGH |
| 8 | `a11y-complete-audit/round-8-live-regions/` | Live regions, dynamic feedback announcements | MEDIUM |
| 9 | `a11y-complete-audit/round-9-rate-limit/` | Rate limiting implementation (infra) | MEDIUM |

---

## Round 5 — Focus, Motion, Contrast

**Scope:** Design-system-level fixes that affect all components.

### Phase 01 — Focus Visible System
- Add `focus-visible:outline-2 focus-visible:outline-offset-2` global CSS
- Update `components/ui/Button.tsx` focus states
- Update `components/ui/Input.tsx` focus ring (WCAG 2.2 compliant)
- Update `components/ui/Select.tsx` focus (forced-colors compatible)
- Update `components/public/JobCard.tsx` bookmark + apply link focus
- Update `components/public/NewsCard.tsx` card link focus
- Update `components/public/PublicHeader.tsx` links focus
- Update `components/public/PublicFooter.tsx` social links + back-to-top focus

### Phase 02 — Skip Links
- Add skip-to-main link to `components/public/PublicHeader.tsx`
- Add `id="main-content"` to `<main>` in all page layouts
- Add `scroll-margin-top` to major headings

### Phase 03 — Reduced Motion
- Add global `@media (prefers-reduced-motion: reduce)` CSS
- Cover: smooth scroll, spinner animation, card transforms, image scaling, pulse effects
- Update `components/public/NewsCard.tsx` motion-reduce classes
- Update `components/public/PublicFooter.tsx` smooth scroll

### Phase 04 — Color Contrast Audit
- Fix `text-white/60` on teal in `PublicFooter.tsx`
- Verify focus ring contrast (`primary/20` too subtle for WCAG 2.2)
- Verify all status badge colors meet 4.5:1

---

## Round 6 — Form Labels & Validation

**Scope:** A11Y-036 to A11Y-089, A11Y-112, A11Y-113.

### Phase 01 — ApplyForm Labels + Validation
- Fix 6 label-input pairs with `htmlFor`/`id` (position, full_name, email, phone, message, cv_file)
- Add `aria-invalid` + `aria-describedby` for validation errors
- Add `role="alert"` for submission errors
- Fix CV upload label association (keyboard-operable)
- Add file type/size validation announcement

### Phase 02 — JobsSearch Labels
- Add `<label htmlFor>` for location select
- Add `<label htmlFor>` for keyword input
- Wrap in `<form role="search">`
- Add visible labels or sr-only labels

### Phase 03 — ArticleForm Labels
- Fix 8 label-input pairs (title, slug, excerpt, cover, category, status, tags, body)
- Connect help text via `aria-describedby`
- Add `aria-hidden` on expand icons

### Phase 04 — SettingsForm Labels
- Generate deterministic IDs from `field.key`
- Add `htmlFor`/`id` on all label-input pairs
- Add `aria-hidden` on status icons

### Phase 05 — UI Component Updates
- `Input.tsx`: enforce label or aria-label, add aria-invalid + aria-describedby
- `Textarea.tsx`: same pattern
- `Select.tsx`: same pattern + forced-colors compatible focus

---

## Round 7 — Modal Dialog

**Scope:** A11Y-047 to A11Y-055, A11Y-115.

### Phase 01 — Modal ARIA Semantics
- Add `role="dialog"`, `aria-modal="true"`, `aria-labelledby` to modal container
- Close button: 44×44px hit area minimum

### Phase 02 — Focus Trap
- Implement `useFocusTrap` hook or use `focus-trap-react`
- Trap Tab/Shift+Tab within modal
- Initial focus to first focusable element
- Restore focus to trigger on close

### Phase 03 — Escape Key + Interaction
- Escape key closes modal
- Click outside closes modal (optional, test behavior)

### Phase 04 — Upload Accessibility
- Visible drop area = `<label htmlFor>` styled as button
- NOT `display:none` — use `sr-only` clipping instead

### Phase 05 — Success Announcement
- `role="status" aria-live="polite"` on success state
- Or move focus to success heading after submission

---

## Round 8 — Live Regions

**Scope:** A11Y-034, 043, 054, 070, 071, 080, 093, 106, 104.

### Phase 01 — Search Empty State
- Add `role="status" aria-live="polite"` to empty results in `JobsSearch.tsx`

### Phase 02 — Form Error Announcements
- ApplyForm: `role="alert"` on submission errors
- ArticleForm: `role="alert"` on save errors + focus management
- Login page: `role="alert"` on login errors

### Phase 03 — SettingsForm Auto-save
- `role="status" aria-live="polite"` on success
- `role="alert"` on error

### Phase 04 — ApplicationDetail Status Update
- Live region for status update success/failure
- Focus management for errors

### Phase 05 — Loading Spinners
- `aria-hidden` on spinner SVGs
- `role="status" aria-live="polite"` with visually hidden text on containers

### Phase 06 — DataTable Dynamic Changes
- `role="status" aria-live="polite"` for loading/empty state changes

---

## Round 9 — Rate Limiting

**Scope:** Infrastructure-level implementation.

### Phase 01 — Rate Limit Middleware
- Implement lightweight in-memory rate limiter OR
- Document deployment-level requirement (Vercel Edge/Cloudflare)

### Phase 02 — Application Endpoint
- `POST /api/apply`: 10 req/min per IP
- 429 + `Retry-After` header + visible error

### Phase 03 — Auth Endpoint
- `POST /api/auth/signin`: 5 attempts/min per IP
- 429 + `Retry-After` header

---

## Verification Commands (All Rounds)

```bash
npm run type-check  # must pass
npm run build       # must pass
npx playwright test --config=playwright.a11y.config.ts  # TBD per round
```

---

## Non-Goals

- Do NOT redesign UI — fixes are semantic/behavioral only
- Do NOT change color palette beyond contrast compliance
- Do NOT add new features — all changes are accessibility-only
- Do NOT touch functional code in DESLOP phase

---

## Dependencies

- Round 5 → no dependencies (can run first)
- Round 6 → depends on Round 5 (focus styles on UI components)
- Round 7 → depends on Round 5 + Round 6 (modal uses focus trap + form labels)
- Round 8 → depends on Round 5 + Round 6 (live regions use existing form structure)
- Round 9 → depends on nothing (standalone infrastructure)

> Each round can be executed independently — dependencies are logical, not technical. If Round 6 runs before Round 5, focus visible styles won't exist yet but form labels will still work.