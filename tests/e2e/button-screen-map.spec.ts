import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const ROUTES = [
  '/vi',
  '/vi/about',
  '/vi/jobs',
  '/vi/apply',
  '/vi/news',
  '/vi/apply',
  '/ja',
  '/ja/about',
  '/ja/jobs',
  '/ja/apply',
  '/admin',
  '/admin/jobs',
  '/admin/news',
  '/admin/applications',
  '/admin/settings',
];

test.describe('Button Screen Map Audit', () => {
  for (const route of ROUTES) {
    test(`Screen map audit for ${route}`, async ({ page }) => {
      // Setup: ensure we are in mock mode
      await page.goto(route);

      // Wait for page load
      await page.waitForLoadState('networkidle');

      // 1. Collect visible actionable elements
      const actions = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('button, a[href], [role="button"], input[type="submit"], input[type="button"], summary'));
        return elements.filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).visibility !== 'hidden';
        }).map(el => ({
          tag: el.tagName.toLowerCase(),
          role: el.getAttribute('role'),
          text: el.textContent?.trim() || '',
          href: el.getAttribute('href'),
          ariaLabel: el.getAttribute('aria-label'),
          title: el.getAttribute('title'),
          disabled: (el as any).disabled || el.getAttribute('aria-disabled') === 'true',
          id: el.id,
          className: el.className
        }));
      });

      // 2. Save screen map artifact
      const artifactDir = path.join(process.cwd(), 'test-results', 'button-screen-map');
      if (!fs.existsSync(artifactDir)) fs.mkdirSync(artifactDir, { recursive: true });
      const slug = route.replace(/\//g, '_') || 'root';
      fs.writeFileSync(path.join(artifactDir, `${slug}.json`), JSON.stringify(actions, null, 2));

      // 3. Perform Red Gate assertions
      // In Red Gate, we expect implementation to be incomplete
      // For example, we might have href="#" links or missing handlers
      const deadButtons = actions.filter(a => a.href === '#' || (!a.href && !a.disabled && a.tag === 'a'));

      if (deadButtons.length > 0) {
        console.error(`Found ${deadButtons.length} dead buttons on ${route}:`, deadButtons);
      }

      // Expected to fail if there are any dead buttons or unhandled actions
      expect(deadButtons.length, `Dead buttons found on ${route}`).toBe(0);
    });
  }
});
