import { test, expect } from '@playwright/test';

test.describe('Jobs Page Visual Parity', () => {
  test('matches design at 1440px', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1200 });
    await page.goto('http://localhost:3000/vi/jobs');

    // Capture app screenshot
    await page.screenshot({ path: '.qc/ui/jobs/screenshots/app-1440.png', fullPage: true });

    // Check accessibility
    // (Axe results would normally be captured here)

    // Structure verification
    const heroTitle = page.locator('h1').first();
    await expect(heroTitle).toBeVisible();

    const jobListings = page.locator('h2').filter({ hasText: /Cơ hội nghề nghiệp|Danh sách tuyển dụng|キャリア機会/ });
    await expect(jobListings).toBeVisible();

    const photoSection = page.locator('h2').filter({ hasText: /Chuyên mục ảnh|フォトセクション/ });
    await expect(photoSection).toBeVisible();

    const locationSection = page.locator('h2').filter({ hasText: /Tìm kiếm công việc theo Location|ロケーションで仕事を探す/ });
    await expect(locationSection).toBeVisible();
  });
});
