# Coverage Matrix — TIP-025 About QC Non-Color Layout Fixes

| AC | Requirement | Spec | Builder TIP | Verification Evidence |
|---|---|---|---|---|
| AC-01 | Hero 600px, no visible centered h1, play overlay | `specs/spec-about-qc-non-color-layout.md` | `tips/tip-001-about-hero-header-stats.md` | screenshot + computed style |
| AC-02 | Accessible page title retained | spec | tip-001 | axe/heading inspection |
| AC-03 | Fixed 80px header + main offset | spec | tip-001 | computed style + screenshot |
| AC-04 | Stats radius/shadow + no heading-order issue | spec | tip-001 | computed style + axe |
| AC-05 | Activity width and controls | spec | tip-002 | screenshot + DOM assertions |
| AC-06 | CTA/tab/accordion non-color shape details | spec | tip-002 | screenshot + computed style |
| AC-07 | Why decorative layer | spec | tip-002 | screenshot + DOM inspection |
| AC-08 | COLOR/IMAGE/MOCKDATA excluded | spec | both | diff review + verify report |

## Gate Status
- Orphan requirements: none.
- Requirements below score 60: none.
- Critical gaps: none at planning time.
