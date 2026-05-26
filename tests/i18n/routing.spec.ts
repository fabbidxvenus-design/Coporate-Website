import { test, expect } from '@playwright/test';

test('has locale redirect', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/vi($|\/)/);
});

test('apply page is accessible', async ({ page }) => {
  await page.goto('/vi/apply');
  await expect(page.locator('h1')).toContainText('Ứng tuyển');
});
