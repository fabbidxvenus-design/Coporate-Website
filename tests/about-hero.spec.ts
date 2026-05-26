import { test, expect } from '@playwright/test';

test('about hero structure matches design', async ({ page }) => {
  await page.goto('/vi/about');
  const hero = page.locator('main section:first-of-type');
  const box = await hero.boundingBox();
  expect(box?.height).toBe(600);
  const h1 = hero.locator('h1');
  await expect(h1).toHaveClass(/sr-only/);
});

test('header is fixed 80px', async ({ page }) => {
  await page.goto('/vi/about');
  const header = page.locator('header');
  await expect(header).toHaveCSS('position', 'fixed');
  await expect(header).toHaveCSS('height', /80px|5rem/);
});