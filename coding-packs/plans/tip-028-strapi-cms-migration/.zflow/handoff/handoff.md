# TIP-028 zflow Handoff

## Status
Plan artifacts created. Implementation not started.

## Resume Command
`zflow: --plan coding-packs/plans/tip-028-strapi-cms-migration --resume`

## Next Step
Start Phase 01, then Phase 02. Do not implement route migration before Phase 03 schema mapping/data parity artifacts exist.

## Critical Guardrails
- Mock mode must never call Strapi.
- Production Strapi mode must never silently fall back to mock data.
- Strapi secrets must be server-only environment variables.
- CV/private media must remain private.
- Visual layout must not be redesigned.
