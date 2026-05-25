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

  test('contact form mock submission in absence of Supabase keys', async ({ page }) => {
    // Navigate to localized contact
    await page.goto('/vi/contact');
    await page.waitForLoadState('networkidle');

    // Fill form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'E2E Testing Subject');
    await page.fill('textarea[name="message"]', 'This is a test message to verify the contact form submit action works properly in mock mode.');

    // Submit
    await page.click('button[type="submit"]');

    // Wait for response/success UI
    // In Red Gate, without mock mode active or if it fails, this will either show an error or crash
    const successMsg = page.locator('p.font-semibold');
    await expect(successMsg).toBeVisible({ timeout: 5000 });
    await expect(successMsg).toContainText('Cảm ơn bạn đã liên hệ');
  });
});
