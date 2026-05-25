import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const ROUTES = ['/', '/jobs', '/news', '/apply', '/contact'];

test.describe('Accessibility Audit', () => {
  for (const route of ROUTES) {
    test(`Audit ${route} for accessibility violations`, async ({ page }) => {
      await page.goto(route);

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
