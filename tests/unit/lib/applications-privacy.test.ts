import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(process.cwd(), '.');

function findTsFiles(dir: string, pattern = /\.ts(x?)$/): string[] {
  const { readdirSync } = require('fs');
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

describe('AC-01: Public API routes must not use postgres raw queries for CMS data', () => {
  test('API routes must not import postgres or lib/db/repositories for CMS content', async () => {
    const apiDir = resolve(ROOT, 'app/api');
    const files = findTsFiles(apiDir);

    const violations: string[] = [];
    for (const file of files) {
      const content = readFileSync(file, 'utf8');
      if (content.includes("from '@/lib/db/repositories") ||
          content.includes("from 'postgres'") || content.includes('from "postgres"')) {
        // Exclude auth and contact — they are admin-specific, not CMS content
        const relative = file.replace(ROOT, '').replace(/\\/g, '/');
        if (relative.includes('/auth/') || relative.includes('/contact/')) continue;
        violations.push(relative);
      }
    }
    expect(violations).toHaveLength(0);
  });
});

describe('AC-02: applications route.ts has admin auth before PII access', () => {
  test('GET handler must call requireAdmin before applicationsRepository.findById', () => {
    const routePath = resolve(ROOT, 'app/api/applications/[id]/route.ts');
    const content = readFileSync(routePath, 'utf8');

    const getHandlerMatch = content.match(/export\s+async\s+function\s+GET[\s\S]*?^}/m);
    expect(getHandlerMatch).not.toBeNull();

    const getBody = getHandlerMatch![0];
    const requireAdminPos = getBody.indexOf('requireAdmin');
    const findByIdPos = getBody.indexOf('applicationsRepository.findById');

    expect(requireAdminPos).toBeGreaterThanOrEqual(0);
    expect(findByIdPos).toBeGreaterThanOrEqual(0);
    expect(requireAdminPos).toBeLessThan(findByIdPos);
  });
});

describe('AC-03: Applications repository omits CV fields from mock objects', () => {
  test('mock application creation must not include cv_path, cv_filename, cv_mime_type, cv_size', () => {
    const repoIndex = resolve(ROOT, 'lib/repositories/index.ts');
    const content = readFileSync(repoIndex, 'utf8');

    const mockAppMatch = content.match(/mockApplication[\s\S]{0,800}/);
    if (mockAppMatch) {
      expect(mockAppMatch[0]).not.toContain('cv_path');
      expect(mockAppMatch[0]).not.toContain('cv_filename');
      expect(mockAppMatch[0]).not.toContain('cv_mime_type');
      expect(mockAppMatch[0]).not.toContain('cv_size');
    }
  });
});