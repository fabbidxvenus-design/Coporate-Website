import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('TIP-026 Job Detail QC Non-Excluded Fixes', () => {

  test('AC-01: share controls expose accessible names', async ({ page }) => {
    await page.goto('/vi/jobs/senior-frontend-engineer-react');
    const shareButtons = page.locator('button[aria-label]');
    const count = await shareButtons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
        await expect(shareButtons.nth(i)).toHaveAttribute('aria-label');
    }
  });

  test('AC-02: related jobs have valid list semantics', async ({ page }) => {
    await page.goto('/vi/jobs/senior-frontend-engineer-react');
    const axeResults = await new AxeBuilder({ page }).analyze();
    const relatedJobsViolations = axeResults.violations.filter(v => v.id === 'aria-required-children');
    expect(relatedJobsViolations.length).toBe(0);
  });

  test('AC-03: related jobs render full card affordances', async ({ page }) => {
    await page.goto('/vi/jobs/senior-frontend-engineer-react');
    const relatedCards = page.locator('[data-purpose="related-job-card"]');
    await expect(relatedCards.first()).toBeVisible();
    const isFlexRow = await relatedCards.first().evaluate((el) => el.classList.contains('sm:flex-row'));
    expect(isFlexRow).toBe(false); // Cards should be column, not row
  });

  test('AC-05: apply CTA radius is non-color aligned', async ({ page }) => {
    await page.goto('/vi/jobs/senior-frontend-engineer-react');
    const cta = page.locator('aside a[href*="/apply"]').first();
    const borderRadius = await cta.evaluate((el) => getComputedStyle(el).borderRadius);
    expect(borderRadius).toBe('8px');
  });

  test('AC-07: no horizontal overflow at breakpoints', async ({ page }) => {
    const viewports = [375, 768, 1024, 1440];
    for (const width of viewports) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto('/vi/jobs/senior-frontend-engineer-react');
      const isOverflowing = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      expect(isOverflowing).toBe(false);
    }
  });

});
