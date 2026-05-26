# Phase 04 — Visual and Accessibility Verification

## Objective
Verify the implementation through browser evidence, computed/QC artifacts, accessibility checks, and a separate verifier agent.

## Required Commands
Run as feasible in the project environment:

```powershell
npm run type-check
npm run build
npm run test:e2e -- --grep "jobs"
```

If a command is unavailable or fails due to unrelated project configuration, record the blocker and continue with direct browser/QC verification.

## Browser Evidence
1. Start or reuse the Next.js dev server.
2. Open `http://localhost:3000/vi/jobs`.
3. Capture screenshots at:
   - 1440px desktop
   - 375px or 390px mobile
4. Open `http://localhost:3000/ja/jobs` and smoke-check newly added labels.
5. Confirm no horizontal overflow at both widths.

## QC Rerun
Use the actual implementation target, not the erroneous `ung_tuyen` file:

```text
/qc-ui --html "D:\WORKSPACE\CODE\Coporate_Website\.design\recruitment_site\tim_kiem_cong_viec_fabbi_final_precision\code.html" --jsx "D:\WORKSPACE\CODE\Coporate_Website\app\(public)\jobs\page.tsx" --route "http://localhost:3000/vi/jobs" --computed --a11y --screenshot --artifacts ".qc/ui/jobs" --breakpoint 1440
```

Also run or manually inspect a mobile breakpoint if the QC command supports it.

## Accessibility Gate
1. Re-run axe if available.
2. `link-name` issues for job-card icon links must be resolved.
3. Floating bell and filters must have accessible names.
4. Color-contrast failures caused solely by pink color are excluded by user request and may remain documented.

## Separate Verifier
Use a separate `code-reviewer` or UI verifier agent after implementation. The verifier must check:
- Exclusion compliance.
- Non-excluded QC mismatch coverage.
- A11y names/focus.
- No data-source/mock-data regression.

## Quality Gate
- [ ] Type-check completed or blocker documented.
- [ ] Build completed or blocker documented.
- [ ] Browser screenshots captured for desktop and mobile.
- [ ] QC rerun uses `app/(public)/jobs/page.tsx` target.
- [ ] Separate verifier completed.
- [ ] Remaining findings are classified as fixed, excluded, or blocker.
