/**
 * SPEC: Payload Dev Runtime Mode + Collections
 * Tests that payload package is installed, env defaults are correct,
 * Payload collections are configured, and dev docs are updated.
 */
import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import {
  existsSync,
  readFileSync,
  readdirSync,
  readdir,
  statSync,
} from 'fs';
import { resolve } from 'path';

const ROOT = resolve(process.cwd(), '.');

// ─── SPEC: Payload Dev Mode ────────────────────────────────────────────────

describe('SPEC: Payload Dev Mode', () => {

  describe('AC-04: payload npm package must be installed', () => {
    test('payload must exist in node_modules', () => {
      const pkgPath = resolve(ROOT, 'node_modules/payload/package.json');
      expect(existsSync(pkgPath)).toBe(true);
    });
  });

  describe('AC-02: USE_MOCK_DATA is not the dev default', () => {
    test('.env.example must not document USE_MOCK_DATA=true as dev default', () => {
      const envExample = resolve(ROOT, '.env.example');
      const content = readFileSync(envExample, 'utf8');
      const lines = content.split('\n');
      const mockLine = lines.find(l =>
        l.startsWith('USE_MOCK_DATA=') && l.includes('true')
      );
      expect(mockLine).toBeUndefined();
    });

    test('lib/config/data-source.ts must not return mock when USE_MOCK_DATA is undefined in dev', () => {
      // The default behavior must NOT be mock for dev — dev should require explicit PAYLOAD_SECRET or DATABASE_URL
      const dataSource = resolve(ROOT, 'lib/config/data-source.ts');
      const content = readFileSync(dataSource, 'utf8');
      // getDataSourceMode must NOT return 'mock' as the implicit default
      // when neither PAYLOAD_SECRET nor explicit USE_MOCK_DATA=false is set
      // Current code: if (useMockData === 'true' || useMockData === undefined) return 'mock';
      // This must change so undefined → not mock
      expect(content).not.toMatch(/useMockData === undefined.*return ['"]mock['"]/);
    });
  });

  describe('AC-05: Payload admin mount must exist', () => {
    test('Payload admin must be mountable at /admin route group', () => {
      // Check that Payload can be integrated into Next.js — either via
      // custom route (app/custom-server/...) or through Payload's built-in handler
      // At minimum, the payload package must be installed and configurable
      const pkgPath = resolve(ROOT, 'node_modules/payload/dist/index.js');
      expect(existsSync(pkgPath)).toBe(true);
    });
  });

  describe('AC-06: .env.example documents Payload/Postgres dev vars', () => {
    test('.env.example must contain PAYLOAD_SECRET', () => {
      const envExample = resolve(ROOT, '.env.example');
      const content = readFileSync(envExample, 'utf8');
      expect(content).toContain('PAYLOAD_SECRET');
    });

    test('.env.example must contain DATABASE_URL pointing to port 5432', () => {
      const envExample = resolve(ROOT, '.env.example');
      const content = readFileSync(envExample, 'utf8');
      expect(content).toContain('DATABASE_URL');
      expect(content).toMatch(/5432/);
    });
  });

  describe('AC-09: Payload config uses DATABASE_URL', () => {
    test('lib/payload/config.ts must reference DATABASE_URL for PostgreSQL adapter', () => {
      const config = resolve(ROOT, 'lib/payload/config.ts');
      const content = readFileSync(config, 'utf8');
      // Payload v3 uses DATABASE_URL for its postgres adapter
      expect(content).toContain('DATABASE_URL');
    });
  });

});

// ─── SPEC: Payload Collections ─────────────────────────────────────────────

describe('SPEC: Payload Collections', () => {

  function readPayloadCollections(): string[] {
    const collectionsDir = resolve(ROOT, 'lib/payload/repositories');
    const files: string[] = [];
    try {
      const entries = readdirSync(collectionsDir);
      for (const entry of entries) {
        if (entry.endsWith('.ts') && entry !== 'index.ts') {
          files.push(resolve(collectionsDir, entry));
        }
      }
    } catch {
      // ignore
    }
    return files;
  }

  describe('AC-01: Payload jobs repository has all required fields', () => {
    test('lib/payload/repositories/jobs.ts exists and has job shape methods', () => {
      const jobsRepo = resolve(ROOT, 'lib/payload/repositories/jobs.ts');
      expect(existsSync(jobsRepo)).toBe(true);
      const content = readFileSync(jobsRepo, 'utf8');
      expect(content).toContain('findAllPublished');
      expect(content).toContain('findById');
      expect(content).toContain('create');
      expect(content).toContain('update');
      expect(content).toContain('delete');
    });
  });

  describe('AC-02: Payload news/articles repository configured', () => {
    test('lib/payload/repositories/news.ts exists with article shape methods', () => {
      const newsRepo = resolve(ROOT, 'lib/payload/repositories/news.ts');
      expect(existsSync(newsRepo)).toBe(true);
      const content = readFileSync(newsRepo, 'utf8');
      expect(content).toContain('findAllPublished');
      expect(content).toContain('findBySlug');
      expect(content).toContain('create');
      expect(content).toContain('update');
      expect(content).toContain('delete');
    });
  });

  describe('AC-03: Payload applications repository configured', () => {
    test('lib/payload/repositories/applications.ts exists with application shape methods', () => {
      const appsRepo = resolve(ROOT, 'lib/payload/repositories/applications.ts');
      expect(existsSync(appsRepo)).toBe(true);
      const content = readFileSync(appsRepo, 'utf8');
      expect(content).toContain('findById');
      expect(content).toContain('create');
      expect(content).toContain('findByJobId');
      expect(content).toContain('updateStatus');
    });
  });

  describe('AC-04: Payload settings repository configured', () => {
    test('lib/payload/repositories/settings.ts exists', () => {
      const settingsRepo = resolve(ROOT, 'lib/payload/repositories/settings.ts');
      expect(existsSync(settingsRepo)).toBe(true);
    });
  });

  describe('AC-05: Payload about repository configured', () => {
    test('lib/payload/repositories/about.ts exists', () => {
      const aboutRepo = resolve(ROOT, 'lib/payload/repositories/about.ts');
      expect(existsSync(aboutRepo)).toBe(true);
    });
  });

  describe('AC-07: Payload access control — jobs/articles publicly readable only when published', () => {
    test('payload jobs repository filters by status: published', () => {
      const jobsRepo = resolve(ROOT, 'lib/payload/repositories/jobs.ts');
      const content = readFileSync(jobsRepo, 'utf8');
      // findAllPublished must filter by status = published (or _status in Payload v3)
      expect(content).toMatch(/status.*published|_status.*published/i);
    });

    test('payload news repository filters by status: published', () => {
      const newsRepo = resolve(ROOT, 'lib/payload/repositories/news.ts');
      const content = readFileSync(newsRepo, 'utf8');
      expect(content).toMatch(/status.*published|_status.*published/i);
    });
  });

});

// ─── SPEC: Dev Operations ───────────────────────────────────────────────────

describe('SPEC: Dev Operations Docs', () => {

  describe('AC-01: coding-packs/payload/setup.md documents PostgreSQL 5432', () => {
    test('setup.md documents DATABASE_URL and port 5432', () => {
      const setup = resolve(ROOT, 'coding-packs/payload/setup.md');
      expect(existsSync(setup)).toBe(true);
      const content = readFileSync(setup, 'utf8');
      expect(content).toContain('DATABASE_URL');
      expect(content).toMatch(/5432/);
    });

    test('setup.md documents PAYLOAD_SECRET', () => {
      const setup = resolve(ROOT, 'coding-packs/payload/setup.md');
      const content = readFileSync(setup, 'utf8');
      expect(content).toContain('PAYLOAD_SECRET');
    });
  });

  describe('AC-02: .env.example documents all required Payload env vars', () => {
    test('.env.example has PAYLOAD_SECRET placeholder', () => {
      const env = resolve(ROOT, '.env.example');
      const content = readFileSync(env, 'utf8');
      expect(content).toMatch(/PAYLOAD_SECRET[=\s]/);
    });

    test('.env.example has PAYLOAD_URL', () => {
      const env = resolve(ROOT, '.env.example');
      const content = readFileSync(env, 'utf8');
      expect(content).toMatch(/PAYLOAD_URL[=\s]/);
    });
  });

});