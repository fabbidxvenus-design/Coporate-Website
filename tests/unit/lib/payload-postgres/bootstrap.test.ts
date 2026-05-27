/**
 * SPEC: Payload + PostgreSQL Bootstrap Tests
 * Tests that payload package, postgres adapter, and data-source mode work correctly.
 * These tests verify bootstrap behavior WITHOUT requiring a running Postgres instance.
 */
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(process.cwd(), '.');

// ─── AC-05: Payload package and PostgreSQL adapter are installed ─────────────

describe('AC-05: Payload package and PostgreSQL adapter installed', () => {
  test('payload npm package exists in node_modules', () => {
    const pkgPath = resolve(ROOT, 'node_modules/payload/package.json');
    expect(existsSync(pkgPath)).toBe(true);
  });

  test('payload package.json contains expected version', () => {
    const pkgPath = resolve(ROOT, 'node_modules/payload/package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    expect(pkg.version).toMatch(/^\d+\.\d+\.\d+/);
  });

  test('Payload PostgreSQL adapter package is listed as a dependency or optional dep', () => {
    // Payload v3 uses @payloadcms/db-postgres or embeds it
    // Check if there's a postgres db adapter in node_modules
    const adapterPaths = [
      resolve(ROOT, 'node_modules/@payloadcms/db-postgres/package.json'),
      resolve(ROOT, 'node_modules/@payloadcms/db-postgres-pg/package.json'),
      resolve(ROOT, 'node_modules/payload/dist/database.js'),
    ];
    const hasAdapter = adapterPaths.some(p => existsSync(p));
    expect(hasAdapter).toBe(true);
  });
});

// ─── AC-01: Environment variables validated at startup ────────────────────────

describe('AC-01: Environment variable validation', () => {
  test('PAYLOAD_SECRET is not the .env.example placeholder value in .env.local', () => {
    const envLocal = resolve(ROOT, '.env.local');
    if (!existsSync(envLocal)) {
      // .env.local missing — AC fails (setup not done)
      expect(existsSync(envLocal)).toBe(true);
      return;
    }
    const content = readFileSync(envLocal, 'utf8');
    const hasRealSecret = /PAYLOAD_SECRET=.{20,}/.test(content);
    const hasPlaceholder = /PAYLOAD_SECRET=your-secret/.test(content);
    expect(hasRealSecret || !hasPlaceholder).toBe(true);
  });

  test('DATABASE_URL is configured and points to port 5432 in .env.local', () => {
    const envLocal = resolve(ROOT, '.env.local');
    if (!existsSync(envLocal)) {
      expect(existsSync(envLocal)).toBe(true);
      return;
    }
    const content = readFileSync(envLocal, 'utf8');
    expect(content).toMatch(/DATABASE_URL.*5432/);
  });

  test('.env.local does not force USE_MOCK_DATA=true for Payload setup', () => {
    const envLocal = resolve(ROOT, '.env.local');
    if (!existsSync(envLocal)) return;
    const content = readFileSync(envLocal, 'utf8');
    // Check that USE_MOCK_DATA=true is commented out or absent
    const forcedMock = /^USE_MOCK_DATA=true$/m.test(content);
    expect(forcedMock).toBe(false);
  });
});

// ─── AC-06: USE_MOCK_DATA=false enables Payload mode ─────────────────────────

describe('AC-06: USE_MOCK_DATA=false enables Payload mode', () => {
  test('getDataSourceMode returns payload when USE_MOCK_DATA=false and PAYLOAD_SECRET set', async () => {
    process.env.USE_MOCK_DATA = 'false';
    process.env.PAYLOAD_SECRET = 'test-secret-for-ac06-12345678901234';
    delete process.env.NODE_ENV; // ensure not test env
    vi.resetModules();
    const { getDataSourceMode } = await import('../../../../lib/config/data-source');
    const mode = getDataSourceMode();
    expect(mode).toBe('payload');
  });

  test('getDataSourceMode returns mock when USE_MOCK_DATA=true', async () => {
    process.env.USE_MOCK_DATA = 'true';
    delete process.env.PAYLOAD_SECRET;
    vi.resetModules();
    const { getDataSourceMode } = await import('../../../../lib/config/data-source');
    const mode = getDataSourceMode();
    expect(mode).toBe('mock');
  });
});

// ─── AC-03: Payload initialization with DATABASE_URL ──────────────────────────

describe('AC-03: Payload embedded-config references DATABASE_URL', () => {
  test('lib/payload/embedded-config.ts uses buildConfig from payload package', () => {
    const configFile = resolve(ROOT, 'lib/payload/embedded-config.ts');
    const content = readFileSync(configFile, 'utf8');
    expect(content).toContain('buildConfig');
    expect(content).toContain("from 'payload'");
  });

  test('lib/payload/config.ts documents DATABASE_URL for PostgreSQL adapter', () => {
    const configFile = resolve(ROOT, 'lib/payload/config.ts');
    const content = readFileSync(configFile, 'utf8');
    expect(content).toMatch(/DATABASE_URL/i);
  });
});

// ─── AC-04: Payload admin route accessible ───────────────────────────────────

describe('AC-04: Payload admin route configured via server.js', () => {
  test('server.js exists and sets up Payload express middleware', () => {
    const serverFile = resolve(ROOT, 'server.js');
    expect(existsSync(serverFile)).toBe(true);
    const content = readFileSync(serverFile, 'utf8');
    expect(content).toContain('payload.init');
    expect(content).toContain('payload.express');
  });

  test('package.json has dev:payload script that runs server.js', () => {
    const pkg = resolve(ROOT, 'package.json');
    const content = readFileSync(pkg, 'utf8');
    const json = JSON.parse(content);
    expect(json.scripts['dev:payload']).toBeDefined();
    expect(json.scripts['dev:payload']).toContain('server.js');
  });
});

// ─── AC-07: Missing PAYLOAD_SECRET in non-mock mode produces actionable error ─

describe('AC-07: Missing PAYLOAD_SECRET error is actionable', () => {
  test('lib/payload/config.ts throws when PAYLOAD_SECRET is missing in non-test env', async () => {
    // Remove PAYLOAD_SECRET so getPayloadConfig throws
    const original = process.env.PAYLOAD_SECRET;
    delete process.env.PAYLOAD_SECRET;
    process.env.USE_MOCK_DATA = 'false'; // force non-mock path
    vi.resetModules();
    try {
      await import('../../../../lib/config/data-source');
      // getPayloadConfig is called lazily, check the export
      const mod = await import('../../../../lib/payload/config');
      expect(() => mod.getPayloadConfig()).toThrow();
    } finally {
      process.env.PAYLOAD_SECRET = original;
      vi.resetModules();
    }
  });

  test('error message mentions PAYLOAD_SECRET and setup docs', async () => {
    delete process.env.PAYLOAD_SECRET;
    process.env.USE_MOCK_DATA = 'false';
    vi.resetModules();
    const mod = await import('../../../../lib/payload/config');
    try {
      mod.getPayloadConfig();
      expect(true).toBe(false); // should have thrown
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      expect(msg.toLowerCase()).toContain('payload_secret');
      expect(msg.toLowerCase()).toMatch(/setup|payload|docs/);
    }
    vi.resetModules();
  });
});