# SPEC: Seed Pipeline

## AC-05: Seed transformers produce repository-compatible rows
- Given: current mock/crawled sources exist
- When: seed transformer functions run
- Then: output rows include deterministic IDs/slugs/keys and fields required by repository TypeScript types

## AC-06: Seed validates browser-safe image paths
- Given: seed records include image fields
- When: validation runs
- Then: accepted values are `/images/<filename>`, null, or allowed HTTPS URLs, and absolute Windows paths are rejected

## AC-07: Seed command is idempotent
- Given: migrations have run and `pnpm db:seed` has completed once
- When: `pnpm db:seed` runs a second time
- Then: seeded rows are upserted without duplicates and summary counts are reported per entity

## AC-08: Seed errors identify entity and key
- Given: a malformed seed record is encountered
- When: validation or upsert fails
- Then: error output names the entity type and record ID/slug/key that failed

## AC-09: Admin seed does not store plaintext passwords
- Given: admin seed data is generated
- When: admin user rows are written
- Then: stored credential fields are hashed or delegated to approved auth flow, and no plaintext default password is stored in source-controlled seed rows
