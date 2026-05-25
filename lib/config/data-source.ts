/**
 * Centralized data source configuration helper.
 *
 * USE_MOCK_DATA=true: Use ONLY local mock data/JSON fixtures. No SQLite connection.
 * USE_MOCK_DATA=false: Use ONLY SQLite database content.
 * Default: true (local development friendly)
 */

export type DataSourceMode = 'mock' | 'sqlite';

export function getDataSourceMode(): DataSourceMode {
  const value = process.env.USE_MOCK_DATA;

  // Explicit SQLite mode
  if (value === 'false') {
    return 'sqlite';
  }

  // Default to mock mode for safety and local development
  return 'mock';
}

export function isMockDataMode(): boolean {
  return getDataSourceMode() === 'mock';
}

export function isSqliteDataMode(): boolean {
  return getDataSourceMode() === 'sqlite';
}
