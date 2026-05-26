import { test, expect } from '@playwright/test';

test.describe('About QC Non-Color Layout', () => {
  test('hero layout and geometry parity', async ({ page }) => {
    await page.goto('/vi/about');

    // Set viewport to 1440x1200 as per spec
    await page.setViewportSize({ width: 1440, height: 1200 });

    // AC-01: Hero height
    const hero = page.locator('section').first(); // Adjust selector based on actual structure
    const boundingBox = await hero.boundingBox();
    expect(boundingBox?.height).toBeGreaterThanOrEqual(598);
    expect(boundingBox?.height).toBeLessThanOrEqual(602);

    // AC-03: Header height
    const header = page.locator('header');
    const headerBox = await header.boundingBox();
    expect(headerBox?.height).toBeGreaterThanOrEqual(78);
    expect(headerBox?.height).toBeLessThanOrEqual(82);

    // AC-01: Play overlay
    await expect(page.locator('.play-overlay')).toBeVisible();
  });

  test('heading order and accessibility', async ({ page }) => {
    await page.goto('/vi/about');
    await page.setViewportSize({ width: 1440, height: 1200 });

    // AC-02: Check for valid h1
    const h1s = await page.locator('h1').all();
    // Assuming design removes visible h1 in hero, we need to ensure one exists elsewhere or is visually hidden
    // For now, this is a placeholder to ensure spec-driven failure
    expect(h1s.length).toBeGreaterThan(0);
  });
});
