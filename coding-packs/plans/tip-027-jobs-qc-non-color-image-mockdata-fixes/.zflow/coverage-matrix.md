# Coverage Matrix — TIP-027 Jobs QC

| Requirement / AC | Source | Phase | TIP | Verification |
|---|---|---|---|---|
| Preserve `/vi/jobs` and `/ja/jobs` localized route rendering | TIP-027 BR-1, AC-06 | phase-01, phase-04 | tip-001, tip-004 | Browser smoke `/vi/jobs`, `/ja/jobs` |
| Do not touch `ung_tuyen` redirect target | TIP-027 BR-2 | phase-01 | tip-001 | Diff review |
| Preserve data source/filter semantics | TIP-027 BR-3 | phase-03 | tip-002 | Existing filter behavior + route smoke |
| Exclude COLOR PINK fixes | TIP-027 BR-4, AC-02 | all phases | all tips | Diff review, final report |
| Exclude image swaps/mapping changes | TIP-027 BR-5, AC-02 | all phases | tip-003, tip-004 | Diff review |
| Exclude mock data edits | TIP-027 BR-6, AC-02 | all phases | all tips | Diff review on `lib/mock-data.ts` and seeds |
| Jobs heading matches design semantics | TIP-027 BR-7 | phase-03 | tip-002 | Browser/QC |
| Filters are checkbox-style controls | TIP-027 AC-03 | phase-03 | tip-002 | Playwright/keyboard/QC |
| Job cards match reference structure | TIP-027 AC-04 | phase-03 | tip-002 | Screenshot/QC |
| Photo section present | TIP-027 AC-01, AC-05 | phase-03 | tip-003 | Browser/QC |
| Location section present | TIP-027 AC-01, AC-05 | phase-03 | tip-003 | Browser/QC |
| Floating bell present and accessible | TIP-027 AC-01, AC-03 | phase-03 | tip-003 | Keyboard/axe/manual |
| Sidebar widget expansion | TIP-027 BR-7 | phase-03 | tip-003 | Screenshot/QC |
| Icon-only links have names | TIP-027 AC-04 | phase-04 | tip-002, tip-004 | Axe link-name check |
| No horizontal overflow at desktop/mobile | TIP-027 AC-05 | phase-04 | tip-004 | Browser viewport assertions |
| QC has no non-excluded FAILs | TIP-027 AC-07 | phase-04, phase-05 | tip-004 | `.qc/ui/jobs` rerun |
