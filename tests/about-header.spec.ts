import { test, expect } from '@playwright/test';

test('header is fixed 80px', async ({ page }) => {
  await page.goto('/vi/about');
  const header = page.locator('header');
  const position = await header.evaluate(el => window.getComputedStyle(el).position);
  const height = await header.evaluate(el => window.getComputedStyle(el).height);
  expect(position).toBe('fixed');
  expect(height).toBe('80px');
});