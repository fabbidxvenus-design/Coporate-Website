# Phase 03 — Decompose

## [CORE] Strategy
STANDARD tier uses task-based sequential execution because shared public layout/header files can affect multiple screens and should have one lead owner. Split into two builder TIPs with non-overlapping primary ownership and explicit coordination points.

## [CORE] Execution Batches

### Batch 1 — Hero, Header, Main Offset, Stats
- TIP: `tips/tip-001-about-hero-header-stats.md`
- Owner: frontend lead
- Primary files:
  - `app/(public)/about/page.tsx`
  - `app/[locale]/about/page.tsx`
  - `components/public/PublicHeader.tsx`
  - `app/(public)/layout.tsx`
  - `app/[locale]/layout.tsx`
- Shared constraints:
  - No color changes.
  - No image source/data changes.
  - Preserve route behavior.

### Batch 2 — Activity, Accordion, Decoration, A11y Verification
- TIP: `tips/tip-002-about-activity-why-a11y.md`
- Owner: frontend lead
- Blocked by: Batch 1
- Primary files:
  - `components/about/ActivityTabs.tsx`
  - `components/about/WhyChooseAccordion.tsx`
  - `app/(public)/about/page.tsx`
  - `app/[locale]/about/page.tsx`
  - test/QC files if created
- Shared constraints:
  - No color changes.
  - No mock/content data changes.
  - Decorative SVG must be accessibility-hidden.

## [CORE] Dependency Graph
```text
phase-01-intake
  -> phase-02-spec-red-gate
     -> tip-001-about-hero-header-stats
        -> tip-002-about-activity-why-a11y
           -> phase-05-verify-fix
              -> phase-06-regress-evolve-complete
```

## [CORE] Continuous RRI Micro-Gate
| Requirement | Covered By | Score | Status |
|---|---|---:|---|
| Hero 600px + play overlay + no visible centered h1 | tip-001 | 90 | covered |
| Header fixed 80px + main offset | tip-001 | 85 | covered |
| Stats radius/shadow + heading-safe values | tip-001, tip-002 | 85 | covered |
| Activity width + controls + icon shape | tip-002 | 90 | covered |
| CTA border and accordion elevation | tip-002 | 80 | covered |
| Why decorative layer | tip-002 | 85 | covered |
| Exclude color/image/mockdata | both tips | 95 | covered |
| Visual/a11y verification | phase-05 | 90 | covered |

No orphan requirements detected.

## [PIVOT] Merge Rule
If file ownership conflicts arise because both tasks need the same About page files, execute sequentially and keep one patch branch/diff; do not spawn parallel implementers for those files.
