/**
 * Centralized data source configuration helper.
 *
 * USE_MOCK_DATA=true: Use ONLY local mock data/JSON fixtures. No network, no DB.
 * USE_MOCK_DATA=false + PAYLOAD_SECRET set: Use Payload CMS as backend.
 * USE_MOCK_DATA=false + no PAYLOAD_SECRET: Use Supabase/Postgres as backend (fallback).
 * Default: true (local development friendly)
 */

export type DataSourceMode = 'mock' | 'payload' | 'postgres';

export function getDataSourceMode(): DataSourceMode {
  const useMockData = process.env.USE_MOCK_DATA;
  const payloadSecret = process.env.PAYLOAD_SECRET;

  // Mock mode: no external dependencies
  if (useMockData === 'true' || useMockData === undefined) {
    return 'mock';
  }

  // Non-mock: prefer Payload if secret is configured
  if (payloadSecret) {
    return 'payload';
  }

  // Fallback to Supabase/Postgres
  return 'postgres';
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