/**
 * Centralized data source configuration helper.
 *
 * Mode selection (non-test environments):
 *   USE_MOCK_DATA=true          → mock mode (local dev without CMS/DB)
 *   USE_MOCK_DATA=false + PAYLOAD_SECRET set → Payload CMS mode
 *   USE_MOCK_DATA=false + no PAYLOAD_SECRET → PostgreSQL via DATABASE_URL
 *
 * In tests (NODE_ENV=test), mock mode is the safe default.
 * In dev/runtime, missing Payload/Postgres config must fail clearly —
 * not silently fall back to stale mock content.
 */

export type DataSourceMode = 'mock' | 'payload' | 'postgres';

export function getDataSourceMode(): DataSourceMode {
  const useMockData = process.env.USE_MOCK_DATA;
  const payloadSecret = process.env.PAYLOAD_SECRET;
  const isTest = process.env.NODE_ENV === 'test';

  // Test environments default to mock for safety and speed
  if (isTest) {
    if (useMockData === 'false' && payloadSecret) return 'payload';
    return 'mock';
  }

  // Explicit mock: developer wants mock data only
  if (useMockData === 'true') {
    return 'mock';
  }

  // USE_MOCK_DATA=false or unset in non-test: prefer Payload if configured
  if (payloadSecret) {
    return 'payload';
  }

  // Require DATABASE_URL for postgres mode in non-test dev/runtime
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl) {
    return 'postgres';
  }

  // No valid config in non-test runtime — this is a developer config error
  // Do NOT silently return mock; this will be caught by a startup guard
  throw new Error(
    '[DataSource] No valid configuration found. ' +
    'Non-test environments require one of: ' +
    '  1. USE_MOCK_DATA=true  → mock mode (no external deps) ' +
    '  2. USE_MOCK_DATA=false + PAYLOAD_SECRET  → Payload CMS ' +
    '  3. USE_MOCK_DATA=false + DATABASE_URL  → PostgreSQL ' +
    'Set at least one of PAYLOAD_SECRET or DATABASE_URL in .env.local, ' +
    'or set USE_MOCK_DATA=true for local mock-only development.'
  );
}

export function isMockDataMode(): boolean {
  return getDataSourceMode() === 'mock';
}

export function isPayloadDataMode(): boolean {
  return getDataSourceMode() === 'payload';
}

export function isPostgresDataMode(): boolean {
  return getDataSourceMode() === 'postgres';
}

/** @deprecated Use isPayloadDataMode() — Strapi is no longer supported */
export function isStrapiDataMode(): boolean {
  return false;
}