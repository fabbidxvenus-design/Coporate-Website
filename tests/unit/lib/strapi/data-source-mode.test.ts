import { describe, test, expect } from 'vitest';
import { isStrapiDataMode, isMockDataMode, isSqliteDataMode } from '@/lib/config/data-source';

describe('Data Source Mode boundary tests', () => {
  test('should default to mock mode when no USE_STRAPI is set', () => {
    // Default: no USE_MOCK_DATA=false, no USE_STRAPI=true
    expect(isMockDataMode()).toBe(true);
    expect(isStrapiDataMode()).toBe(false);
    expect(isSqliteDataMode()).toBe(false);
  });
});