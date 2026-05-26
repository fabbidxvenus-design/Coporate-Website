# Coverage Matrix — TIP-023

| TIP-023 AC | Spec File | Phase | Decomposed TIP | Evidence Target |
|---|---|---|---|---|
| Mock mode no DB connection | `spec-data-source-and-repositories.md` AC-10 | Phase 04 | tip-P4-001 | data-source boundary test |
| Migrations create required schema | `spec-postgres-migrations.md` AC-02 | Phase 02 | tip-P2-001 | migration test/manual DB run |
| Seed inserts/updates from mock/crawled sources | `spec-seed-pipeline.md` AC-05, AC-07 | Phase 03 | tip-P3-001 | transformer tests + seed summary |
| Seed idempotency | `spec-seed-pipeline.md` AC-07 | Phase 03 | tip-P3-001 | second seed run no duplicates |
| DB mode renders seeded public data | `spec-data-source-and-repositories.md` AC-11 | Phase 04 | tip-P4-001 | repository/page loader tests |
| Slug lookup parses JSON fields | `spec-data-source-and-repositories.md` AC-12 | Phase 04 | tip-P4-001 | job/news slug tests |
| Browser-safe image paths | `spec-seed-pipeline.md` AC-06 | Phase 03 | tip-P3-001 | transformer validation tests |
| Missing migrations fail explicitly | `spec-data-source-and-repositories.md` AC-13 | Phase 04 | tip-P4-001 | repository error test/manual check |
| Type-check and unit tests pass | all specs | Phase 05 | tip-P5-001 | `pnpm run type-check`, targeted tests |
| No active SQLite runtime syntax | `spec-postgres-migrations.md` AC-04 | Phase 05 | tip-P5-001 | grep/search audit |

## RRI Gate
- Score: 100/100 mapped acceptance criteria.
- Orphans: none.
- Blockers: live PostgreSQL integration evidence depends on configured `DATABASE_URL`; if unavailable, local unit coverage and documented manual commands are required.
