import { test, expect } from '@playwright/test';

test('has locale redirect', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/vi\//);
});

test('contact page is accessible', async ({ page }) => {
  await page.goto('/vi/contact');
  await expect(page.locator('h1')).toHaveText('Liên hệ');
});
