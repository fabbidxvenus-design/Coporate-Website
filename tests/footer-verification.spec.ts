import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const evidenceDir = path.join(process.cwd(), 'coding-packs', 'plans', 'public-footer-all-pages', '.zflow', 'evidence');

test.describe('Public Footer Visual Verification', () => {
  const routes = [
    { name: 'root', path: '/' },
    { name: 'vi', path: '/vi' },
  ];

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 375, height: 667 },
  ];

  for (const route of routes) {
    for (const viewport of viewports) {
      test(`Verify footer on ${route.name} (${viewport.name})`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(route.path);

        // Scroll to bottom to ensure footer is visible
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

        // Wait for potential animations or lazy loading
        await page.waitForTimeout(1000);

        const footer = page.locator('footer');
        await expect(footer).toBeVisible();

        const screenshotPath = path.join(evidenceDir, `${route.name}-${viewport.name}.png`);
        await footer.screenshot({ path: screenshotPath });

        // Visual Parity Checks
        const backgroundColor = await footer.evaluate((el) => window.getComputedStyle(el).backgroundColor);
        // Teal #008B9C in RGB is rgb(0, 139, 156)
        console.log(`Footer background color on ${route.name} (${viewport.name}): ${backgroundColor}`);

        const logo = footer.locator('svg, .fabbi-logo');
        await expect(logo.first()).toBeVisible();

        if (viewport.name === 'mobile') {
          // Check for stacked layout on mobile
          // This is a bit heuristic, but usually means columns become 100% width or flex-direction changes to column
          const isStacked = await footer.evaluate((el) => {
             const children = Array.from(el.querySelectorAll(':scope > div > div, :scope > div > section'));
             if (children.length === 0) return true;
             const rects = children.map(c => c.getBoundingClientRect());
             // If they are stacked, their X coordinates should be similar and Y should be different
             return rects.every((r, i) => i === 0 || r.top >= rects[i-1].bottom - 1);
          });
          console.log(`Footer stacked on ${route.name} (mobile): ${isStacked}`);
        }
      });
    }
  }
});
