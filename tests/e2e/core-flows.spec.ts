import { test, expect } from '@playwright/test'

test.describe('Public Core Flows', () => {
  test('public pages load successfully', async ({ page }) => {
    // Visit main public routes
    const routes = ['/', '/jobs', '/news', '/about', '/apply']

    for (const route of routes) {
      const response = await page.goto(route)
      expect(response?.status()).toBe(200)
    }
  })

  test('admin route redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/admin')
    // middleware.ts redirects /admin to /login?redirect=/admin
    await expect(page).toHaveURL(/\/login/)
    await expect(page).toHaveURL(/redirect=%2Fadmin/)
  })

  test('admin login with invalid credentials shows error', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[type="email"]', 'wrong@fabbi.vn')
    await page.fill('input[type="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    // Should show error message from Supabase auth failure
    await expect(page.locator('[role="alert"]')).toBeVisible()
  })

  test('language switch preserves route', async ({ page }) => {
    await page.goto('/vi/jobs')
    // Click JA switcher (Header has "JP" text for JA)
    await page.locator('header button:has-text("JP")').click()
    await expect(page).toHaveURL(/\/ja\/jobs/)

    // Verify some Japanese text
    await expect(page.locator('body')).toContainText('採用情報')

    // Switch back to VI
    await page.locator('header button:has-text("VN")').click()
    await expect(page).toHaveURL(/\/vi\/jobs/)
    await expect(page.locator('body')).toContainText('Tuyển dụng')
  })

  test('apply form validation and input', async ({ page }) => {
    await page.goto('/apply')

    await page.click('button[type="submit"]')
    await expect(page.locator('body')).toContainText(/bắt buộc|không hợp lệ|vui lòng/i)

    await page.fill('input[name="fullName"]', 'QA Test Runner')
    await page.fill('input[name="email"]', 'qa@example.com')
    await page.fill('input[name="phone"]', '0123456789')
    await page.fill('textarea[name="message"]', 'This is a test message from Playwright E2E.')

    await expect(page.locator('input[name="fullName"]')).toHaveValue('QA Test Runner')
  })
})

test.describe('Draft Visibility', () => {
  test('draft jobs are not visible on public list', async ({ page }) => {
    await page.goto('/jobs')
    // We expect the mock/seed data to have some jobs
    // We verify that the "draft" string (or draft items) is not present
    // Assuming UI shows status labels or we know specific IDs
    await expect(page.locator('body')).not.toContainText('draft')
  })
})
