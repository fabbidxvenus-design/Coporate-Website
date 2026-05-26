# TIP-P1-001: Create Bilingual Localization RED Gate Tests

**Agent:** Implementer
**Model:** opus
**File ownership:**
- `tests/i18n/bilingual-localization.spec.ts`
**Blocked by:** none
**Acceptance criteria:**
- [ ] Playwright tests cover dictionary parity for `lib/i18n/vi.json` and `lib/i18n/ja.json`.
- [ ] Playwright tests cover `/vi`, `/ja`, `/vi/about`, `/ja/about`, `/vi/jobs`, `/ja/jobs`, `/vi/news`, `/ja/news`, `/vi/apply`, `/ja/apply`, `/vi/contact`, `/ja/contact`.
- [ ] Tests assert language changes beyond the header: body copy, CTAs, footer, and form labels/messages.
- [ ] Tests include route-preserving switch from `/vi/jobs` to `/ja/jobs`.
- [ ] RED gate fails before implementation for current mixed-language body/footer/form content.

## Context
TIP-013 exists because only the header currently switches between Vietnamese and Japanese. Tests must prove the broken behavior before implementation.

## Implementation Notes
- Prefer stable visible text assertions over full-page snapshots.
- Avoid relying on CMS dynamic records unless seeded records are deterministic.
- For form validation, use submit with empty required fields and assert localized validation text if current form architecture exposes it deterministically.
