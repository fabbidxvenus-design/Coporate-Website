import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getDataSourceMode, isMockDataMode, isPayloadDataMode } from '../lib/config/data-source';

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
      expect(isPayloadDataMode()).toBe(false);
    });

    it('AC-02: Payload mode resolves when PAYLOAD_SECRET is set', () => {
      process.env.USE_MOCK_DATA = 'false';
      process.env.PAYLOAD_SECRET = 'test-secret';
      expect(getDataSourceMode()).toBe('payload');
      expect(isMockDataMode()).toBe(false);
      expect(isPayloadDataMode()).toBe(true);
    });

    it('AC-03: Missing flag defaults to mock mode', () => {
      delete process.env.USE_MOCK_DATA;
      expect(getDataSourceMode()).toBe('mock');
    });

    it('AC-04: Postgres fallback when USE_MOCK_DATA=false and no PAYLOAD_SECRET', () => {
      process.env.USE_MOCK_DATA = 'false';
      delete process.env.PAYLOAD_SECRET;
      expect(getDataSourceMode()).toBe('postgres');
      expect(isMockDataMode()).toBe(false);
    });
  });
});