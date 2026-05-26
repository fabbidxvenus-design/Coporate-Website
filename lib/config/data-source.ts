/**
 * Centralized data source configuration helper.
 *
 * USE_MOCK_DATA=true: Use ONLY local mock data/JSON fixtures. No SQLite connection.
 * USE_STRAPI=true: Use Strapi CMS as backend.
 * USE_MOCK_DATA=false: Use ONLY SQLite database content.
 * Default: true (local development friendly)
 */

export type DataSourceMode = 'mock' | 'sqlite' | 'strapi';

export function getDataSourceMode(): DataSourceMode {
  const value = process.env.USE_MOCK_DATA;

  // Strapi takes priority over SQLite
  if (process.env.USE_STRAPI === 'true') {
    return 'strapi';
  }

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

export function isStrapiDataMode(): boolean {
  return getDataSourceMode() === 'strapi';
}
