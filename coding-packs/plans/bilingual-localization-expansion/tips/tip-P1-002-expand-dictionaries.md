# TIP-P1-002: Expand VI/JA Dictionaries

**Agent:** Implementer
**Model:** opus
**File ownership:**
- `lib/i18n/vi.json`
- `lib/i18n/ja.json`
- `messages/vi.json` (only if still used by i18n runtime)
- `messages/ja.json` (only if still used by i18n runtime)
**Blocked by:** TIP-P1-001
**Acceptance criteria:**
- [ ] `vi.json` and `ja.json` have identical nested key paths.
- [ ] Dictionaries cover nav, footer, common CTAs, home, about, jobs, job detail, news, news detail, apply, apply success, contact, forms, validation, loading, error, and empty states.
- [ ] JSON parses cleanly.
- [ ] Brand names/proper nouns remain unchanged.

## Context
The current dictionaries only cover nav, a small CTA set, and contact labels. Full localized public UI needs a broader dictionary structure before components can be wired cleanly.

## Implementation Notes
- Keep dictionary shape simple and explicit.
- Do not add a third locale.
- Do not introduce external translation APIs.
- If CMS data has only one language field, dictionary only localizes surrounding UI chrome.
