# TIP-005: CMS Pages Visual Parity and Data Fallbacks

**Agent:** admin frontend implementer
**Model:** opus
**File ownership:** `app/admin/**`, `components/cms/**`, `components/admin/**`, `app/api/news/**`, `app/api/settings/**`
**Blocked by:** TIP-004

## Acceptance Criteria

- [ ] Dashboard, jobs, news, applications, and settings pages are reachable after login.
- [ ] Sidebar/header/table/card/form layouts match `.design/cms_site` references.
- [ ] CMS navigation supports movement between implemented pages and shows current section where design intends.
- [ ] CMS pages display design-equivalent data structures.
- [ ] Missing live data retains controlled design-equivalent table/list structure.
- [ ] Tables, controls, and statuses have accessible text equivalents where practical.

## Context

Covers DET-UX-005, DET-API-003, DET-STATE-004, DET-ERR-003, DET-A11Y-003, DET-TEST-004.
