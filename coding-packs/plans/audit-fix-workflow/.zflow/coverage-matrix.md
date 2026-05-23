# Audit Fix Coverage Matrix

| Requirement | Current finding | Planned phase | Verification |
|---|---|---|---|
| DET-UX-004 | Login includes mock credential bypass | Phase 02 | Login/auth tests + browser check |
| DET-UX-005 | CMS pages exist but mock data density incomplete | Phase 03 | Admin screenshots 1440/1920 |
| DET-API-001 | Public POST validates but needs failure UI/anti-abuse confirmation | Phase 04 | API/form tests |
| DET-API-002 | Mock login bypasses Supabase Auth | Phase 02 | Auth tests |
| DET-API-003 | Admin fallback empty/zero data | Phase 03 | CMS data tests + screenshots |
| DET-DATA-004 | Middleware and server auth guard mismatch | Phase 02 | Direct route/session tests |
| DET-VAL-001 | Basic API validation exists | Phase 04 | Invalid input tests |
| DET-VAL-002 | Mock credential path bypasses Supabase validation | Phase 02 | Login tests |
| DET-STATE-002 | Needs UI confirmation for API failures | Phase 04 | Form browser checks |
| DET-STATE-003 | Auth state inconsistent across middleware/page guard | Phase 02 | Admin auth tests |
| DET-STATE-004 | CMS nav must stay gated | Phase 02/03 | Browser checks |
| DET-ERR-001 | Submission errors mostly present, UI visibility must be verified | Phase 04 | Form tests |
| DET-ERR-002 | Login errors visible but mock bypass undermines failed auth | Phase 02 | Login tests |
| DET-ERR-003 | CMS missing data fallback not design-equivalent | Phase 03 | CMS screenshots |
| DET-SEC-001 | Client-set mock cookie can bypass middleware | Phase 02 | Security review |
| DET-SEC-002 | Sanitized HTML path appears positive; preserve it | Phase 06 | Safe implementation review |
| DET-SEC-003 | Candidate API lacks visible anti-abuse evidence | Phase 04 | Security review |
| DET-EDGE-001 | Direct CMS URL blocked by Supabase path, bypass cookie issue exists | Phase 02 | Route tests |
| DET-EDGE-002 | API returns failure when DB absent; UI visibility must be verified | Phase 04 | API/form tests |
| DET-EDGE-003 | Session expiry behavior depends on consistent auth guard | Phase 02 | Auth tests |
| DET-TEST-002 | Needs explicit form tests | Phase 01/04 | Test suite |
| DET-TEST-003 | Needs explicit CMS auth tests | Phase 01/02 | Test suite |
| DET-TEST-004 | Needs CMS page/data visual tests | Phase 03/06 | Screenshots |
| DET-TEST-005 | Needs safe implementation review | Phase 06 | Reviewer agents |
