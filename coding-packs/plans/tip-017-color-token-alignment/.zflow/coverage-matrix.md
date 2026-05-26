# Coverage Matrix — TIP-017 Color Token Alignment

| TIP-017 Acceptance Criteria | SPEC AC | Decomposed Task | Verification |
|---|---|---|---|
| Tailwind brand tokens resolve to canonical values | AC-01 | tip-001 | token/static tests + config inspection |
| Primary CTA default/hover colors are official pair | AC-02 | tip-002, tip-003 | source scan + browser hover inspection |
| Public navigation/footer hover uses teal text token | AC-03 | tip-002 | source scan + browser inspection |
| Public/CMS brand accents use named tokens | AC-04 | tip-002, tip-003 | source scan + visual screenshots |
| Semantic validation/status colors preserved | AC-05 | tip-002, tip-003 | diff review + verifier review |
| Lint/tests/build pass or unrelated failures documented | AC-06 | tip-004 | command logs in final report |
| Desktop/mobile visual check shows no regressions | AC-06 | tip-004 | screenshots at 1440px and 375px |

No orphan acceptance criteria.
