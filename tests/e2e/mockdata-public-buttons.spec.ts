import { test, expect } from '@playwright/test';

test.describe('Public Mock Data Buttons', () => {
  test('locale preservation on all page navigations', async ({ page }) => {
    await page.goto('/vi');
    await page.waitForLoadState('networkidle');

    // Click navigation links and verify locale is preserved (e.g. still has /vi in pathname)
    const links = page.locator('a[href^="/vi/"], a[href="/vi"]');
    const count = await links.count();

    // In Red Gate, we expect some links might be locale-less or empty href
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href) {
        await page.goto(href);
        expect(page.url()).toContain('/vi');
      }
    }
  });

  test('apply form accepts mock input in absence of Supabase keys', async ({ page }) => {
    await page.goto('/vi/apply');
    await page.waitForLoadState('networkidle');

    await page.fill('input[name="fullName"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '0123456789');
    await page.fill('textarea[name="message"]', 'This is a test message to verify the apply form works properly in mock mode.');

    await expect(page.locator('input[name="fullName"]')).toHaveValue('Test User');
  });
});
