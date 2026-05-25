import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getDataSourceMode, isMockDataMode, isSqliteDataMode } from '../lib/config/data-source';
import { newsRepository } from '../lib/db/repositories/news';
import * as connection from '../lib/db/connection';

describe('Data Source Boundary', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe('Helper Semantics', () => {
    it('AC-01: Mock flag resolves to mock-only mode', () => {
      process.env.USE_MOCK_DATA = 'true';
      expect(getDataSourceMode()).toBe('mock');
      expect(isMockDataMode()).toBe(true);
      expect(isSqliteDataMode()).toBe(false);
    });

    it('AC-02: SQLite flag resolves to SQLite mode', () => {
      process.env.USE_MOCK_DATA = 'false';
      expect(getDataSourceMode()).toBe('sqlite');
      expect(isMockDataMode()).toBe(false);
      expect(isSqliteDataMode()).toBe(true);
    });

    it('AC-03: Missing flag defaults to mock mode', () => {
      delete process.env.USE_MOCK_DATA;
      expect(getDataSourceMode()).toBe('mock');
    });

    it('AC-03: Invalid flag defaults to mock mode', () => {
      process.env.USE_MOCK_DATA = 'random-value';
      expect(getDataSourceMode()).toBe('mock');
    });
  });

  describe('Implementation Isolation', () => {
    it('AC-04: Mock mode does not call SQLite connection (WIP: will fail until repository updated)', async () => {
      process.env.USE_MOCK_DATA = 'true';

      const getDbSpy = vi.spyOn(connection, 'getDb');

      // Attempt to load data
      await newsRepository.findAllPublished();

      // This will fail until newsRepository is updated to use the helper
      expect(getDbSpy).not.toHaveBeenCalled();
    });
  });
});
