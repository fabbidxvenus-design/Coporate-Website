import { describe, test, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve } from 'path';

const ROOT = 'D:\\WORKSPACE\\CODE\\Coporate_Website';

function findTsFiles(dir: string, pattern = /\.ts(x?)$/): string[] {
  const results: string[] = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = resolve(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        results.push(...findTsFiles(full, pattern));
      } else if (pattern.test(entry.name)) {
        results.push(full);
      }
    }
  } catch {
    // ignore
  }
  return results;
}

describe('AC-01: No active lib/strapi imports remain in production routes', () => {
  test('production API routes must not import lib/strapi', async () => {
    const apiDir = resolve(ROOT, 'app/api');
    const apiFiles = findTsFiles(apiDir);

    const violations: string[] = [];
    for (const file of apiFiles) {
      const content = readFileSync(file, 'utf8');
      if (content.includes("from '@/lib/strapi") || content.includes("from 'lib/strapi")) {
        violations.push(file.replace(ROOT, ''));
      }
    }
    expect(violations).toHaveLength(0);
  });
});

describe('AC-02: lib/repositories/index.ts must not contain Strapi calls', () => {
  test('repository barrel must use Payload, not Strapi, for non-mock mode', async () => {
    const repoIndex = resolve(ROOT, 'lib/repositories/index.ts');
    const content = readFileSync(repoIndex, 'utf8');

    expect(content).not.toContain('strapiApplicationsRepo');
    expect(content).not.toContain('strapiJobsRepo');
    expect(content).not.toContain('strapiNewsRepo');
    expect(content).not.toContain('strapiSettingsRepo');
    expect(content).not.toContain('strapiAboutRepo');
    expect(content).not.toContain('getStrapiConfig');
  });
});

describe('AC-03: No STRAPI_* runtime references in lib source', () => {
  test('lib source files must not reference STRAPI env or strapi internals', async () => {
    const libDir = resolve(ROOT, 'lib');
    const files = findTsFiles(libDir);

    const violations: string[] = [];
    for (const file of files) {
      const content = readFileSync(file, 'utf8');
      if (content.includes('STRAPI_URL') || content.includes('STRAPI_API_TOKEN') ||
          content.includes('strapiApplicationsRepo') || content.includes('getStrapiConfig')) {
        violations.push(file.replace(ROOT, ''));
      }
    }
    expect(violations).toHaveLength(0);
  });
});

describe('AC-04: smoke-strapi.mjs must not exist', () => {
  test('scripts/smoke-strapi.mjs must not exist after Strapi removal', () => {
    const smokeScript = resolve(ROOT, 'scripts/smoke-strapi.mjs');
    expect(existsSync(smokeScript)).toBe(false);
  });
});

describe('AC-05: infra/strapi/ must not exist', () => {
  test('infra/strapi directory must not exist after Strapi removal', () => {
    const infraStrapi = resolve(ROOT, 'infra/strapi');
    expect(existsSync(infraStrapi)).toBe(false);
  });
});

describe('AC-06: coding-packs/strapi/* active docs must be removed', () => {
  test('coding-packs/strapi/setup.md must not exist as active doc', () => {
    const setupPath = resolve(ROOT, 'coding-packs/strapi/setup.md');
    expect(existsSync(setupPath)).toBe(false);
  });
});