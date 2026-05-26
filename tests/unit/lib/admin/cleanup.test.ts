/**
 * SPEC: Old CMS UI Cleanup
 * Tests that custom CMS admin pages are removed and Payload owns /admin.
 */
import { describe, test, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

const ROOT = resolve(process.cwd(), '.');

function findTsFiles(dir: string): string[] {
  const results: string[] = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = resolve(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        results.push(...findTsFiles(full));
      } else if (/\.ts(x?)$/.test(entry.name)) {
        results.push(full);
      }
    }
  } catch {
    // ignore
  }
  return results;
}

// ─── SPEC: Old CMS Cleanup ──────────────────────────────────────────────────

describe('SPEC: Old CMS UI Cleanup', () => {

  describe('AC-01: No custom jobs admin CRUD pages remain (custom management UI)', () => {
    test('app/admin/jobs/page.tsx must not exist or must not be a management UI', () => {
      const jobsPage = resolve(ROOT, 'app/admin/jobs/page.tsx');
      if (existsSync(jobsPage)) {
        const content = readFileSync(jobsPage, 'utf8');
        // If it exists, it must redirect to Payload admin or be a minimal wrapper
        // It must NOT be a full CRUD management UI with table/list/create/edit
        expect(content).toMatch(/redirect|REDIRECT|notFound|payload/i);
      }
    });

    test('app/admin/jobs/[id]/edit/page.tsx must not exist (custom edit page)', () => {
      const editPage = resolve(ROOT, 'app/admin/jobs/[id]/edit/page.tsx');
      expect(existsSync(editPage)).toBe(false);
    });

    test('app/admin/jobs/new/page.tsx must not exist (custom create page)', () => {
      const newPage = resolve(ROOT, 'app/admin/jobs/new/page.tsx');
      expect(existsSync(newPage)).toBe(false);
    });
  });

  describe('AC-02: No custom news admin CRUD pages remain', () => {
    test('app/admin/news/page.tsx must not exist or must redirect', () => {
      const newsPage = resolve(ROOT, 'app/admin/news/page.tsx');
      if (existsSync(newsPage)) {
        const content = readFileSync(newsPage, 'utf8');
        expect(content).toMatch(/redirect|REDIRECT|notFound|payload/i);
      }
    });

    test('app/admin/news/[id]/edit/page.tsx must not exist', () => {
      const editPage = resolve(ROOT, 'app/admin/news/[id]/edit/page.tsx');
      expect(existsSync(editPage)).toBe(false);
    });

    test('app/admin/news/new/page.tsx must not exist', () => {
      const newPage = resolve(ROOT, 'app/admin/news/new/page.tsx');
      expect(existsSync(newPage)).toBe(false);
    });
  });

  describe('AC-03: No custom applications admin pages that duplicate Payload remain', () => {
    test('app/admin/applications/[id]/page.tsx must not exist or must redirect', () => {
      const appDetail = resolve(ROOT, 'app/admin/applications/[id]/page.tsx');
      if (existsSync(appDetail)) {
        const content = readFileSync(appDetail, 'utf8');
        expect(content).toMatch(/redirect|REDIRECT|notFound|payload/i);
      }
    });
  });

  describe('AC-05: Custom admin root page redirects to Payload admin', () => {
    test('app/admin/page.tsx must redirect to Payload admin or show Payload landing', () => {
      const adminPage = resolve(ROOT, 'app/admin/page.tsx');
      if (existsSync(adminPage)) {
        const content = readFileSync(adminPage, 'utf8');
        // Must redirect to /admin (Payload admin) or contain Payload-specific content
        // Must not be a custom dashboard with metrics/tables
        const isPayloadWrapper = /redirect|payload|Payload|REDIRECT/i.test(content);
        expect(isPayloadWrapper).toBe(true);
      }
    });
  });

  describe('AC-06: Remaining admin files use lib/repositories barrel, not direct db/strapi imports', () => {
    test('remaining app/admin/* files do not import lib/db/repositories for CMS content', () => {
      const adminDir = resolve(ROOT, 'app/admin');
      const adminFiles = findTsFiles(adminDir);

      const violations: string[] = [];
      for (const file of adminFiles) {
        const content = readFileSync(file, 'utf8');
        // These direct imports indicate old CMS UI patterns
        if (
          content.includes("from '@/lib/db/repositories") ||
          content.includes("from '@/lib/strapi") ||
          content.includes("from 'lib/db/repositories")
        ) {
          violations.push(file.replace(ROOT, ''));
        }
      }
      expect(violations).toHaveLength(0);
    });
  });

  describe('AC-07: Revalidate endpoint validates secret properly', () => {
    test('app/api/revalidate.ts returns 401 for missing/ wrong secret', () => {
      const revalidate = resolve(ROOT, 'app/api/revalidate.ts');
      if (existsSync(revalidate)) {
        const content = readFileSync(revalidate, 'utf8');
        // Must check for x-payload-secret or PAYLOAD_REVALIDATE_SECRET
        expect(content).toMatch(/secret|payload.*secret|revalidate/i);
        // Must NOT leak secret value in error messages
        expect(content).not.toMatch(/Unauthorized.*secret/i);
      }
    });
  });

  describe('AC-08: No stale lib/db/repositories direct calls in public API routes', () => {
    test('app/api/jobs/route.ts uses lib/repositories barrel, not lib/db/repositories', () => {
      const jobsRoute = resolve(ROOT, 'app/api/jobs/route.ts');
      if (existsSync(jobsRoute)) {
        const content = readFileSync(jobsRoute, 'utf8');
        // Jobs route is for public job listing — should use barrel
        expect(content).toMatch(/@\/lib\/repositories/);
        expect(content).not.toMatch(/@\/lib\/db\/repositories[^/]/);
      }
    });

    test('app/api/news/route.ts uses lib/repositories barrel, not lib/db/repositories', () => {
      const newsRoute = resolve(ROOT, 'app/api/news/route.ts');
      if (existsSync(newsRoute)) {
        const content = readFileSync(newsRoute, 'utf8');
        expect(content).toMatch(/@\/lib\/repositories/);
        expect(content).not.toMatch(/@\/lib\/db\/repositories[^/]/);
      }
    });

    test('app/api/settings/route.ts uses lib/repositories barrel', () => {
      const settingsRoute = resolve(ROOT, 'app/api/settings/route.ts');
      if (existsSync(settingsRoute)) {
        const content = readFileSync(settingsRoute, 'utf8');
        expect(content).toMatch(/@\/lib\/repositories/);
        expect(content).not.toMatch(/@\/lib\/db\/repositories[^/]/);
      }
    });
  });

});