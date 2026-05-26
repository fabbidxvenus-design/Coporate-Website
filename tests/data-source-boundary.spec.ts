import { describe, it, expect, vi } from 'vitest';

describe('Data Source Boundary', () => {

  describe('Helper Semantics (test-safe)', () => {
    it('AC-01: Mock flag resolves to mock-only mode', async () => {
      process.env.USE_MOCK_DATA = 'true';
      delete process.env.PAYLOAD_SECRET;
      vi.resetModules();
      const { getDataSourceMode, isMockDataMode, isPayloadDataMode } = await import('../lib/config/data-source');
      expect(getDataSourceMode()).toBe('mock');
      expect(isMockDataMode()).toBe(true);
      expect(isPayloadDataMode()).toBe(false);
    });

    it('AC-02: Payload mode resolves when PAYLOAD_SECRET is set', async () => {
      process.env.USE_MOCK_DATA = 'false';
      process.env.PAYLOAD_SECRET = 'test-secret';
      vi.resetModules();
      const { getDataSourceMode, isMockDataMode, isPayloadDataMode } = await import('../lib/config/data-source');
      expect(getDataSourceMode()).toBe('payload');
      expect(isMockDataMode()).toBe(false);
      expect(isPayloadDataMode()).toBe(true);
    });

    it('AC-03: Missing USE_MOCK_DATA and PAYLOAD_SECRET in test env defaults to mock (safe default)', async () => {
      delete process.env.USE_MOCK_DATA;
      delete process.env.PAYLOAD_SECRET;
      vi.resetModules();
      const { getDataSourceMode } = await import('../lib/config/data-source');
      // In test env, missing config defaults to mock for safety
      expect(getDataSourceMode()).toBe('mock');
    });
  });
});