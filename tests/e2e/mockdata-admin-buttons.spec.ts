import { test, expect } from '@playwright/test';

test.describe('Admin Mock Data Buttons', () => {
  test('admin mutation controls show mock feedback', async ({ page }) => {
    // Navigate to admin jobs listing
    await page.goto('/admin/jobs');
    await page.waitForLoadState('networkidle');

    // Click on a "Create" or "Edit" button if visible
    // In Red Gate, we expect these actions to either be inert (href="#") or lack feedback
    const createButton = page.locator('button:has-text("Create"), a:has-text("Create")').first();

    if (await createButton.count() > 0) {
      await createButton.click();

      // In Red Gate, we might see no navigation, or a crash
      // We expect the URL or UI state to change
      const currentUrl = page.url();
      expect(currentUrl).toContain('/admin/jobs/');
    }
  });

  test('admin logout triggers correctly in mock mode', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');

    // Trigger logout
    const logout = page.locator('button:has-text("Logout"), a:has-text("Logout")');
    if (await logout.count() > 0) {
      await logout.click();
      // Should redirect to login or home
      await expect(page).toHaveURL(/\/login|\/$/);
    }
  });
});
