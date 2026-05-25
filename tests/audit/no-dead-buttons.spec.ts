import { test, expect } from '@playwright/test';

const ROUTES = ['/vi', '/ja', '/admin'];

test.describe('Static Dead Button Audit', () => {
  for (const route of ROUTES) {
    test(`Static audit for ${route} pattern matches`, async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      // Check for any href="#" or empty href that are not disabled
      const deadLinks = await page.locator('a[href="#"], a:not([href]):not([disabled]):not([aria-disabled="true"])').all();

      // Red Gate expects some placeholders to exist before implementation
      expect(deadLinks.length, `Dead links found on ${route}`).toBe(0);
    });

    test(`Verify locale prefix in navigations on ${route}`, async ({ page }) => {
      if (route.includes('/admin')) return;

      await page.goto(route);
      const links = await page.locator('a[href]').all();

      for (const link of links) {
        const href = await link.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('/_next') && !href.startsWith('/api')) {
          expect(href, `Link ${href} missing locale prefix on ${route}`).toMatch(/^\/(vi|ja)(\/|$)/);
        }
      }
    });
  }
});
