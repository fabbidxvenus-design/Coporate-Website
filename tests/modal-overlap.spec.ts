import { test, expect } from '@playwright/test';

const BREAKPOINTS = [375, 768, 1440];
const ROUTES = [
  '/vi/jobs',
  '/vi/jobs/senior-frontend-engineer-react',
];

test.describe('Modal Overlap Header', () => {
  for (const width of BREAKPOINTS) {
    test.describe(`Breakpoint ${width}px`, () => {
      test.use({ viewport: { width, height: 800 } });

      test('General Apply Modal (from Nav) should overlap header', async ({ page }) => {
        await page.goto('/vi/jobs');

        // Wait for page to load
        await page.waitForLoadState('networkidle');

        // Find and click "Ứng tuyển" button in header/nav
        // Depending on mobile/desktop, the button might be inside a hamburger menu or visible
        if (width <= 768) {
          const menuButton = page.locator('header button').first(); // Assuming first button is menu
          await menuButton.click();
          await page.waitForTimeout(500);
        }

        const applyButton = page.getByRole('button', { name: /Ứng tuyển/i }).first();
        await applyButton.click();

        // Check if modal is visible
        const modal = page.locator('div[role="dialog"], .fixed.inset-0.z-\\[60\\]').first();
        await expect(modal).toBeVisible();

        // Verify z-index of modal is higher than header
        const header = page.locator('header');
        const headerZ = await header.evaluate((el) => window.getComputedStyle(el).zIndex);
        const modalZ = await modal.evaluate((el) => window.getComputedStyle(el).zIndex);

        console.log(`Breakpoint ${width}: Header z-index: ${headerZ}, Modal z-index: ${modalZ}`);

        expect(Number(modalZ)).toBeGreaterThan(Number(headerZ));

        // Take screenshot to verify visually
        await page.screenshot({ path: `D:/WORKSPACE/CODE/Coporate_Website/test-results/modal-overlap-nav-${width}.png` });
      });

      test('Job Specific Application Modal should overlap header', async ({ page }) => {
        await page.goto('/vi/jobs/senior-frontend-engineer-react');
        await page.waitForLoadState('networkidle');

        // Click apply button on job detail page
        const detailApplyButton = page.locator('button:has-text("Ứng tuyển ngay"), button:has-text("Nộp đơn")').first();
        if (await detailApplyButton.isVisible()) {
            await detailApplyButton.click();
        } else {
            // Fallback: search for any apply button on page
            await page.getByRole('button', { name: /Ứng tuyển/i }).last().click();
        }

        const modal = page.locator('div[role="dialog"], .fixed.inset-0.z-\\[60\\]').first();
        await expect(modal).toBeVisible();

        const header = page.locator('header');
        const headerZ = await header.evaluate((el) => window.getComputedStyle(el).zIndex);
        const modalZ = await modal.evaluate((el) => window.getComputedStyle(el).zIndex);

        console.log(`Breakpoint ${width} (Detail): Header z-index: ${headerZ}, Modal z-index: ${modalZ}`);

        expect(Number(modalZ)).toBeGreaterThan(Number(headerZ));

        await page.screenshot({ path: `D:/WORKSPACE/CODE/Coporate_Website/test-results/modal-overlap-detail-${width}.png` });
      });
    });
  }
});
