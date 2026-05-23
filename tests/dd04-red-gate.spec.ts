import { expect, test } from '@playwright/test';
import { existsSync } from 'node:fs';
import path from 'node:path';

const auditRoot = path.join(process.cwd(), 'plans', '04-detail-definition-impl', 'audit');
const requiredAuditArtifacts = [
  'final-report.md',
  'visual-audit.md',
  'security-audit.md',
  'accessibility-audit.md',
];

const requiredPublicRoutes = ['/', '/about', '/jobs', '/apply', '/news'];
const requiredAdminRoutes = ['/admin', '/admin/jobs', '/admin/news', '/admin/applications', '/admin/settings'];

test.describe('DD04 Red Gate: visual and audit completion evidence', () => {
  test('final DD04 audit artifacts exist before completion', () => {
    for (const artifact of requiredAuditArtifacts) {
      expect(existsSync(path.join(auditRoot, artifact)), `${artifact} should exist`).toBe(true);
    }
  });

  test('1440px and 1920px screenshot evidence exists for public and CMS routes', () => {
    for (const route of [...requiredPublicRoutes, ...requiredAdminRoutes]) {
      const slug = route === '/' ? 'home' : route.replace(/^\//, '').replaceAll('/', '-');

      expect(
        existsSync(path.join(auditRoot, 'final-screenshots', `${slug}-1440.png`)),
        `${route} should have 1440px screenshot evidence`,
      ).toBe(true);

      expect(
        existsSync(path.join(auditRoot, 'final-screenshots', `${slug}-1920.png`)),
        `${route} should have 1920px screenshot evidence`,
      ).toBe(true);
    }
  });
});
