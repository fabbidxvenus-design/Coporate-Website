# DD04 ZFlow Coverage Matrix

| Requirement Group | Primary TIPs | SPEC Coverage | Evidence Target |
|---|---|---|---|
| DET-UX-001 Homepage | TIP-001, TIP-002, TIP-006 | AC-PUB-01 | 1440/1920 screenshots + route test |
| DET-UX-002 Public content pages | TIP-001, TIP-002, TIP-006 | AC-PUB-02 | public route matrix + screenshots |
| DET-UX-003 Public form UX | TIP-003, TIP-006 | AC-FORM-01..03 | form E2E + state screenshots |
| DET-UX-004 Login/CMS entry UX | TIP-004, TIP-006 | AC-AUTH-01..03 | auth E2E |
| DET-UX-005 CMS pages | TIP-004, TIP-005, TIP-006 | AC-CMS-01 | CMS route tests + screenshots |
| DET-UX-006 Visual evidence | TIP-002, TIP-005, TIP-006 | AC-PUB-01/02, AC-CMS-01 | visual audit report |
| DET-API-001 Public submission | TIP-003, TIP-006 | AC-FORM-02/03 | API/form tests |
| DET-API-002 Supabase Auth | TIP-004, TIP-006 | AC-AUTH-02/03 | auth tests |
| DET-API-003 CMS data behavior | TIP-005, TIP-006 | AC-CMS-01 | CMS data fallback tests/audit |
| DET-DATA-001 Static content | TIP-001, TIP-002 | AC-PUB-01/02 | design inventory |
| DET-DATA-002 Tokens | TIP-001 | AC-PUB-01 | token audit |
| DET-DATA-003 Form data | TIP-003 | AC-FORM-02 | submission persistence test |
| DET-DATA-004 Auth session | TIP-004 | AC-AUTH-03 | session/logout test |
| DET-VAL-001 Form validation | TIP-003 | AC-FORM-01 | validation tests |
| DET-VAL-002 Login validation | TIP-004 | AC-AUTH-02 | failed login tests |
| DET-VAL-003 Visual QA | TIP-006 | AC-PUB-01/02, AC-CMS-01 | visual audit report |
| DET-STATE-001 Public nav | TIP-002 | AC-PUB-03 | navigation E2E |
| DET-STATE-002 Form states | TIP-003 | AC-FORM-01..03 | form state E2E |
| DET-STATE-003 CMS auth state | TIP-004 | AC-AUTH-01..03 | auth E2E |
| DET-STATE-004 CMS nav state | TIP-005 | AC-CMS-01 | admin nav E2E |
| DET-ERR-001 Form errors | TIP-003 | AC-FORM-03 | failure path test |
| DET-ERR-002 Login errors | TIP-004 | AC-AUTH-02 | failed login test |
| DET-ERR-003 Missing data | TIP-005 | AC-CMS-01 | empty state audit |
| DET-SEC-001 CMS access | TIP-004, TIP-006 | AC-AUTH-01 | security review + E2E |
| DET-SEC-002 Safe design | TIP-001, TIP-006 | AC-SAFE-01 | static audit |
| DET-SEC-003 Candidate privacy | TIP-003, TIP-006 | AC-FORM-03, AC-SAFE-01 | security review |
| DET-A11Y-001 Public a11y | TIP-002, TIP-006 | AC-PUB-04 | a11y audit |
| DET-A11Y-002 Form a11y | TIP-003, TIP-006 | AC-FORM-01 | a11y audit |
| DET-A11Y-003 CMS a11y | TIP-004, TIP-005, TIP-006 | AC-AUTH-02, AC-CMS-01 | a11y audit |
| DET-NFR-001 Desktop fidelity | TIP-002, TIP-005, TIP-006 | AC-PUB-01/02, AC-CMS-01 | screenshots |
| DET-NFR-002 Stack continuity | TIP-001, TIP-006 | AC-SAFE-01 | build/config audit |
| DET-NFR-003 Maintainability without redesign | TIP-001..006 | all specs | review report |
| DET-EDGE-001 Direct CMS URL | TIP-004 | AC-AUTH-01 | auth E2E |
| DET-EDGE-002 Supabase unavailable | TIP-003 | AC-FORM-03 | failure path test |
| DET-EDGE-003 Session expiry | TIP-004 | AC-AUTH-03 | logout/session test |
| DET-EDGE-004 Visual mismatch | TIP-006 | visual specs | final report |
| DET-EDGE-005 Design-order exception | TIP-001, TIP-006 | coverage matrix | exception log |
| DET-TEST-001 Public route/visual | TIP-002, TIP-006 | public specs | Playwright + screenshots |
| DET-TEST-002 Form tests | TIP-003, TIP-006 | form specs | Playwright/API tests |
| DET-TEST-003 CMS auth tests | TIP-004, TIP-006 | auth specs | Playwright tests |
| DET-TEST-004 CMS page/visual | TIP-005, TIP-006 | CMS specs | Playwright + screenshots |
| DET-TEST-005 Safe implementation | TIP-006 | AC-SAFE-01 | static/security audit |

[CORE] No orphan DD04 requirement groups remain after decomposition.
