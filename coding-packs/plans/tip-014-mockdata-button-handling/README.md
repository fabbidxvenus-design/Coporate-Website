# TIP-014 Plan Directory

This plan implements `coding-packs/tips/TIP-014-mockdata-button-handling.md` in zflow plan-supervised mode.

## Execute

```text
/zflow --plan D:\WORKSPACE\CODE\Coporate_Website\coding-packs\plans\tip-014-mockdata-button-handling --quality=high --effort=high
```

## Phases
1. Inventory + Red Gate
2. Mock Mode Foundation
3. Public Button Handling
4. Admin Button Handling
5. Verification / DESLOP / Regress

## Hard Gates
- Red Gate before implementation.
- Playwright screen-map click audit is the primary TIP-014 QC gate.
- Green Gate before completion.
- Separate verifier required.
- Visual screenshots required for public/admin representative routes.
