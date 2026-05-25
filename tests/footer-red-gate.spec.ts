import { test, expect } from '@playwright/test';

test.describe('Public Footer Red Gate (SPEC)', () => {
  test('AC-01: Footer presence on root page', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Fabbi');
  });

  test('AC-02: Footer presence on localized route (vi)', async ({ page }) => {
    // Current app/[locale]/layout.tsx is known missing PublicFooter
    await page.goto('/vi');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('AC-03: Internal link integrity (no hash placeholders)', async ({ page }) => {
    await page.goto('/');
    const quickLinks = page.locator('footer a:has-text("Tuyển dụng"), footer a:has-text("Về Fabbi")');
    const hrefs = await quickLinks.evaluateAll(links => links.map(a => (a as HTMLAnchorElement).getAttribute('href')));

    for (const href of hrefs) {
      expect(href).not.toBe('#');
      expect(href?.startsWith('/')).toBe(true);
    }
  });

  test('AC-04: Social buttons should not navigate (no href="#")', async ({ page }) => {
    await page.goto('/');
    // Check for social links/buttons in Follow Us section
    const socialLinks = page.locator('footer h2:has-text("Follow Us") + ul a, footer h2:has-text("Follow Us") + ul button');
    const count = await socialLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const tag = await socialLinks.nth(i).evaluate(el => el.tagName.toLowerCase());
      const href = await socialLinks.nth(i).getAttribute('href');

      // Should either be a button or a link that doesn't point to '#'
      if (tag === 'a') {
        expect(href).not.toBe('#');
      } else {
        expect(tag).toBe('button');
      }
    }
  });

  test('AC-05: Back to top should not use inline onclick', async ({ page }) => {
    await page.goto('/');
    const backToTop = page.locator('footer button:has-text("Back to top")');
    await expect(backToTop).toBeVisible();
    const hasOnClick = await backToTop.getAttribute('onclick');
    expect(hasOnClick).toBeNull();
  });

  test('AC-06: No horizontal overflow at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const overflowX = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(overflowX).toBe(false);
  });
});
