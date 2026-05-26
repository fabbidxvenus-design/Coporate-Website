import { expect, test } from '@playwright/test';

test.describe('TIP-027 Jobs QC Red Gate', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/vi/jobs');
  });

  test('AC-01: jobs listing renders non-excluded reference sections', async ({ page }) => {
    // These sections MUST exist in design
    await expect(page.getByRole('heading', { name: /Chuyên mục ảnh/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Tìm kiếm công việc theo Location/i })).toBeVisible();
  });

  test('AC-03: jobs filters are checkbox-style controls', async ({ page }) => {
    // Filters must be checkbox-style in design
    const checkboxes = page.locator('input[type="checkbox"]');
    // Ensure we have checkboxes for: Freelancer, Internship, Full Time, Part Time
    await expect(checkboxes).toHaveCount(4);
  });

  test('AC-04: job cards expose accessible named controls', async ({ page }) => {
    // Design cards have accessible "Xem chi tiết" text
    const detailLinks = page.getByRole('link', { name: /Xem chi tiết/i });
    await expect(detailLinks.first()).toBeVisible();
  });

  test('AC-05: jobs page has no horizontal overflow', async ({ page }) => {
    const breakpoints = [1440, 375];
    for (const width of breakpoints) {
      await page.setViewportSize({ width, height: 800 });
      const isOverflowing = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(isOverflowing, `Horizontal overflow at ${width}px`).toBe(false);
    }
  });
});
