import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const evidenceDir = path.join(process.cwd(), 'tests', 'audit', 'screenshots');
if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

const PAGES = [
  { name: 'home-vi', path: '/vi' },
  { name: 'home-ja', path: '/ja' },
  { name: 'jobs', path: '/jobs' },
  { name: 'news', path: '/news' },
  { name: 'apply', path: '/apply' },
  { name: 'contact', path: '/contact' },
];

const VIEWPORTS = [
  { name: 'mobile', width: 320, height: 568 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1024, height: 768 },
  { name: 'wide', width: 1440, height: 900 },
];

test.describe('Responsive Verification', () => {
  for (const page of PAGES) {
    for (const viewport of VIEWPORTS) {
      test(`Screenshot ${page.name} at ${viewport.name}`, async ({ page: pw }) => {
        await pw.setViewportSize({ width: viewport.width, height: viewport.height });
        await pw.goto(page.path, { waitUntil: 'domcontentloaded' });

        const filename = `${page.name}-${viewport.name}.png`;
        const screenshotPath = path.join(evidenceDir, filename);

        await pw.screenshot({ path: screenshotPath, fullPage: true });

        console.log(`Saved: ${filename}`);

        // Check no horizontal overflow
        const bodyWidth = await pw.evaluate(() => document.body.scrollWidth);
        expect(bodyWidth).toBeLessThanOrEqual(viewport.width);
      });
    }
  }

  // Spot-check: verify no overflow on key pages at mobile
  test('Home VI — no horizontal overflow at mobile', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/vi', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    const overflow = await page.evaluate(() => {
      const el = document.documentElement;
      return {
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        overflow: el.scrollWidth > el.clientWidth,
      };
    });
    expect(overflow.overflow).toBe(false);
  });

  test('Jobs — no horizontal overflow at mobile', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/jobs', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    const overflow = await page.evaluate(() => {
      const el = document.documentElement;
      return { overflow: el.scrollWidth > el.clientWidth };
    });
    expect(overflow.overflow).toBe(false);
  });

  test('Apply — no horizontal overflow at mobile', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto('/apply', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    const overflow = await page.evaluate(() => {
      const el = document.documentElement;
      return { overflow: el.scrollWidth > el.clientWidth };
    });
    expect(overflow.overflow).toBe(false);
  });
});