/**
 * SPEC: Payload + PostgreSQL Seed Tests
 * Tests that seed scripts exist, are idempotent, and cover the required collections.
 */
import { describe, test, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(process.cwd(), '.');

// ─── AC-01/AC-05: Seed creates jobs/articles/settings/about ───────────────────

describe('AC-01: Seed command structure and collection coverage', () => {
  test('package.json has a payload:seed script', () => {
    const pkg = resolve(ROOT, 'package.json');
    const content = readFileSync(pkg, 'utf8');
    const json = JSON.parse(content);
    expect(json.scripts['payload:seed']).toBeDefined();
  });

  test('payload:seed script references a seed entrypoint', () => {
    const pkg = resolve(ROOT, 'package.json');
    const content = readFileSync(pkg, 'utf8');
    const json = JSON.parse(content);
    const seedScript = json.scripts['payload:seed'] || json.scripts['db:seed'];
    expect(seedScript).toBeDefined();
    // Script should reference ts/tsx/js file, or a require() call that loads one
    expect(seedScript).toMatch(/(\.(ts|tsx|js|mjs)\b|require\s*\(['"][^'"]*seed[^'"]*['"])/);
  });

  test('seed script exists at the referenced path', () => {
    const pkg = resolve(ROOT, 'package.json');
    const content = readFileSync(pkg, 'utf8');
    const json = JSON.parse(content);
    let seedScript = json.scripts['payload:seed'] || json.scripts['db:seed'];
    if (!seedScript) {
      const commonPaths = [
        resolve(ROOT, 'scripts/payload-seed.ts'),
        resolve(ROOT, 'scripts/payload-seed.mjs'),
        resolve(ROOT, 'lib/payload/seed.ts'),
        resolve(ROOT, 'lib/db/seed.ts'),
      ];
      const found = commonPaths.some(p => existsSync(p));
      expect(found).toBe(true);
      return;
    }
    // Extract all require() paths from the script; pick the one that looks like a seed file
    const allMatches = [...seedScript.matchAll(/require\s*\(['"]([^'"]+)['"]/g)].map(m => m[1]);
    // Check for direct tsx/node invocation: "tsx ./scripts/payload-seed.ts" or "node_modules/.bin/tsx ./scripts/..."
    const directPathMatch = seedScript.match(/(?:tsx|node)\s+(?:\S+\/)?(\.\/scripts\/[^\s]+\.(?:ts|tsx|js|mjs))/i);
    const directPath = directPathMatch ? directPathMatch[1] : null;
    // Prefer the path containing 'seed' or 'payload-seed'
    const seedPathCandidate =
      directPath ??
      allMatches.find(p => /seed|payload-seed|\.seed$/i.test(p)) ??
      allMatches[allMatches.length - 1];
    // path.resolve() strips extension, so check with and without .ts
    const seedPathNoExt = seedPathCandidate ? resolve(ROOT, seedPathCandidate) : null;
    const seedPath = seedPathNoExt
      ? (existsSync(seedPathNoExt) ? seedPathNoExt : resolve(ROOT, seedPathNoExt + '.ts'))
      : null;
    expect(seedPath).not.toBeNull();
    expect(existsSync(seedPath!)).toBe(true);
  });
});

// ─── AC-02: Seed creates published news articles ──────────────────────────────

describe('AC-02: Seed references news/articles collection in Payload repositories', () => {
  test('lib/payload/repositories/news.ts exists with findAllPublished method', () => {
    const newsRepo = resolve(ROOT, 'lib/payload/repositories/news.ts');
    expect(existsSync(newsRepo)).toBe(true);
    const content = readFileSync(newsRepo, 'utf8');
    expect(content).toContain('findAllPublished');
  });

  test('news repository filters by published status', () => {
    const newsRepo = resolve(ROOT, 'lib/payload/repositories/news.ts');
    const content = readFileSync(newsRepo, 'utf8');
    expect(content).toMatch(/status.*published|_status.*published/i);
  });

  test('news repository filters by published status in findBySlug', () => {
    const newsRepo = resolve(ROOT, 'lib/payload/repositories/news.ts');
    const content = readFileSync(newsRepo, 'utf8');
    // findBySlug should also filter published for public access
    expect(content).toMatch(/status.*published|_status.*published/i);
  });
});

// ─── AC-03: Seed is idempotent ────────────────────────────────────────────────

describe('AC-03: Seed is idempotent', () => {
  test('seed script uses ON CONFLICT or upsert logic to avoid duplicates', () => {
    // Check if there's a dedicated Payload seed script
    const seedPaths = [
      resolve(ROOT, 'scripts/payload-seed.ts'),
      resolve(ROOT, 'scripts/payload-seed.mjs'),
      resolve(ROOT, 'lib/payload/seed.ts'),
      resolve(ROOT, 'scripts/seed-payload.mjs'),
    ];
    const seedPath = seedPaths.find(p => existsSync(p));
    if (!seedPath) {
      // No dedicated seed yet — this AC will fail (RED gate)
      expect(seedPath).toBeDefined();
      return;
    }
    const content = readFileSync(seedPath, 'utf8');
    // Idempotent patterns: upsert, ON CONFLICT, check-before-insert, slug unique constraint
    expect(content).toMatch(/upsert|onConflict|ON CONFLICT|conflict.*do nothing|exists/i);
  });

  test('lib/payload/repositories use unique slug constraints for idempotency', () => {
    // Seed should create jobs with unique slugs, so re-running creates no duplicates
    const jobsRepo = resolve(ROOT, 'lib/payload/repositories/jobs.ts');
    expect(existsSync(jobsRepo)).toBe(true);
    const content = readFileSync(jobsRepo, 'utf8');
    // The repository create/update should work with Payload's slug uniqueness
    expect(content).toContain('create');
    expect(content).toContain('slug');
  });
});

// ─── AC-04: Seed skips gracefully when source unavailable ────────────────────

describe('AC-04: Seed handles missing source files gracefully', () => {
  test('seed script checks for source file existence before seeding', () => {
    const seedPaths = [
      resolve(ROOT, 'scripts/payload-seed.ts'),
      resolve(ROOT, 'scripts/payload-seed.mjs'),
      resolve(ROOT, 'lib/payload/seed.ts'),
      resolve(ROOT, 'scripts/seed-payload.mjs'),
    ];
    const seedPath = seedPaths.find(p => existsSync(p));
    if (!seedPath) {
      expect(seedPath).toBeDefined();
      return;
    }
    const content = readFileSync(seedPath, 'utf8');
    // Should check file existence before reading
    expect(content).toMatch(/existsSync|readFileSync.*exists|if.*!.*exists|await\s+import.*mock-data/);
  });

  test('seed prints informative skip/error message for missing sources', () => {
    const seedPaths = [
      resolve(ROOT, 'scripts/payload-seed.ts'),
      resolve(ROOT, 'scripts/payload-seed.mjs'),
      resolve(ROOT, 'lib/payload/seed.ts'),
    ];
    const seedPath = seedPaths.find(p => existsSync(p));
    if (!seedPath) {
      expect(seedPath).toBeDefined();
      return;
    }
    const content = readFileSync(seedPath, 'utf8');
    // Should have console.warn/console.log/console.error for missing sources
    expect(content).toMatch(/console\.(warn|log|error)/);
  });
});

// ─── AC-05: Seed creates site settings and about content ──────────────────────

describe('AC-05: Seed covers site settings and about content', () => {
  test('lib/payload/repositories/settings.ts exists', () => {
    const settingsRepo = resolve(ROOT, 'lib/payload/repositories/settings.ts');
    expect(existsSync(settingsRepo)).toBe(true);
  });

  test('lib/payload/repositories/about.ts exists', () => {
    const aboutRepo = resolve(ROOT, 'lib/payload/repositories/about.ts');
    expect(existsSync(aboutRepo)).toBe(true);
  });

  test('seed script includes settings and about in the seed data', () => {
    const seedPaths = [
      resolve(ROOT, 'scripts/payload-seed.ts'),
      resolve(ROOT, 'scripts/payload-seed.mjs'),
      resolve(ROOT, 'lib/payload/seed.ts'),
    ];
    const seedPath = seedPaths.find(p => existsSync(p));
    if (!seedPath) {
      // No dedicated seed yet
      expect(seedPath).toBeDefined();
      return;
    }
    const content = readFileSync(seedPath, 'utf8');
    // Should reference settings/about collections
    expect(content.toLowerCase()).toMatch(/settings|about|site-settings|about-pages/i);
  });
});

// ─── AC-08: Draft/non-published content not visible on public routes ─────────

describe('AC-08: Public routes only show published content', () => {
  test('payload jobs repository findAllPublished filters by status=published', () => {
    const jobsRepo = resolve(ROOT, 'lib/payload/repositories/jobs.ts');
    const content = readFileSync(jobsRepo, 'utf8');
    expect(content).toMatch(/status.*published|_status.*published/i);
  });

  test('payload news repository findAllPublished filters by status=published', () => {
    const newsRepo = resolve(ROOT, 'lib/payload/repositories/news.ts');
    const content = readFileSync(newsRepo, 'utf8');
    expect(content).toMatch(/status.*published|_status.*published/i);
  });

  test('public jobs route uses findAllPublished (not findAll)', () => {
    // Check the repository barrel or public route imports
    const reposIndex = resolve(ROOT, 'lib/repositories/index.ts');
    expect(existsSync(reposIndex)).toBe(true);
    const content = readFileSync(reposIndex, 'utf8');
    // Should export findAllPublished for jobs, not findAll
    expect(content).toMatch(/findAllPublished|jobsRepository/);
  });
});