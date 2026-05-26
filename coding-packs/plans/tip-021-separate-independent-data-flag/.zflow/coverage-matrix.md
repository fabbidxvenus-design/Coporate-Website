# Coverage Matrix — TIP-021

| Requirement | Spec AC | Phase | Test/Evidence |
|---|---|---|---|
| `USE_MOCK_DATA=true` is mock-only | AC-01, AC-04 | 01, 02, 03 | `tests/data-source-boundary.spec.ts` |
| Mock mode does not depend on SQLite availability | AC-05 | 01, 03, 05 | targeted test / smoke result |
| SQLite connection/init/migration/seed not called in mock mode | AC-04, AC-05 | 01, 03, 05 | spy/mocking test |
| `USE_MOCK_DATA=false` uses SQLite | AC-02, AC-06 | 01, 03, 05 | targeted test |
| SQLite mode does not fallback silently | AC-06 | 01, 03, 04, 05 | targeted test |
| API/CMS routes obey shared helper | AC-07 | 04, 05 | route tests or verifier evidence |
| Full regression passes | AC-08 | 05, 06 | test/type-check/build output |
