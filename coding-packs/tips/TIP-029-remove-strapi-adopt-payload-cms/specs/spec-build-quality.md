# SPEC: Build and Quality

## AC-01: TypeScript type-check passes
- Given: the project has TypeScript configuration
- When: `pnpm type-check` runs
- Then: zero type errors are reported

## AC-02: Production build passes
- Given: the project builds for production
- When: `pnpm build` runs
- Then: the build completes successfully without errors

## AC-03: Payload boundary tests pass
- Given: targeted Payload boundary tests exist
- When: `pnpm test` runs on the Payload test files
- Then: all Payload-related tests pass including mock-mode isolation and auth boundaries

## AC-04: No secrets in client bundles
- Given: browser/client bundles are generated for production
- When: the bundles are inspected
- Then: `PAYLOAD_SECRET`, `DATABASE_URL`, private CV storage paths, and signed token internals do not appear in any client component or public runtime config