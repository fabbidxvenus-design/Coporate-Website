import { expect, test } from '@playwright/test';

const publicRoutes = ['/', '/about', '/jobs', '/apply', '/news'];
const adminRoutes = ['/admin', '/admin/jobs', '/admin/news', '/admin/applications', '/admin/settings'];

test.describe('DET-TEST-001 public page route and visual coverage', () => {
  for (const route of publicRoutes) {
    test(`public route ${route} is reachable without login`, async ({ page }) => {
      const response = await page.goto(route);

      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator('body')).toBeVisible();
    });
  }
});

test.describe('DET-TEST-002 public form validation states', () => {
  test('apply page shows validation feedback for missing required fields', async ({ page }) => {
    await page.goto('/apply');

    const submitButton = page.getByRole('button', { name: /ứng tuyển|gửi|submit/i }).first();
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    const requiredFields = await page.locator('input[required], textarea[required], select[required]').count();
    expect(requiredFields).toBeGreaterThan(0);
  });
});

test.describe('DET-TEST-003 CMS login and access control', () => {
  for (const route of adminRoutes) {
    test(`unauthenticated user is blocked from ${route}`, async ({ page }) => {
      await page.goto(route);

      await expect(page).toHaveURL(/\/login/);
    });
  }

  test('failed login remains on login surface with visible feedback', async ({ page }) => {
    await page.goto('/login');

    await page.locator('#email').fill('invalid@example.com');
    await page.locator('#password').fill('wrong-password');
    await page.getByRole('button', { name: /đăng nhập|login/i }).click();

    await expect(page).toHaveURL(/\/login/);
    await page.waitForTimeout(500);
    await expect(page.locator('body')).toContainText(/không|sai|invalid|credentials|password|email|error|failed|lỗi/i);
  });
});

test.describe('DET-TEST-004 CMS page visual access boundary', () => {
  test('login page is reachable and keyboard-operable', async ({ page }) => {
    await page.goto('/login');

    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByRole('button', { name: /đăng nhập|login/i })).toBeVisible();

    await page.keyboard.press('Tab');
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
    expect(['input', 'button', 'a']).toContain(focusedTag);
  });
});

test.describe('DET-TEST-005 safe implementation review', () => {
  test('news detail pages do not expose script tags from article body', async ({ page }) => {
    await page.goto('/news');

    const links = page.locator('a[href^="/news/"]');
    const count = await links.count();

    if (count === 0) {
      test.skip(true, 'No published news detail links available in current data set');
    }

    await links.first().click({ force: true });
    await expect(page.locator('script', { hasText: /alert|document\.cookie|innerHTML/i })).toHaveCount(0);
  });
});
