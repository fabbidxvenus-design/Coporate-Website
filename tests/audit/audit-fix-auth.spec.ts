import { expect, test } from '@playwright/test'

const adminRoutes = ['/admin', '/admin/jobs', '/admin/news', '/admin/applications', '/admin/settings']

test.describe('AF-001 Red Gate: Audit auth findings', () => {
  test('DET-SEC-001 mock_admin cookie alone must NOT authorize /admin in USE_MOCK_DATA=false mode', async ({ page }) => {
    // Set mock_admin cookie WITHOUT logging in through the form
    await page.goto('/')
    await page.evaluate(() => {
      document.cookie = 'mock_admin=true; path=/; max-age=86400'
    })

    // Visit admin dashboard - should redirect to login since mock bypass should be removed in non-mock mode
    await page.goto('/admin')

    // In a properly fixed system, mock_admin cookie alone should NOT grant access
    // The page should NOT show CMS content (dashboard metrics, etc.)
    // It should redirect to login because there's no real Supabase session
    const pageContent = await page.content()
    const hasCMSDashboard = pageContent.includes('Vị trí tuyển dụng') || pageContent.includes('Dashboard')

    // PASS condition: no CMS dashboard is shown, auth is properly gated
    expect(hasCMSDashboard, 'mock_admin cookie must NOT bypass CMS auth in non-dev mode').toBe(false)
  })

  test('DET-SEC-001 mock admin credential email must NOT be visible in production-like mode', async ({ page }) => {
    await page.goto('/login')

    // The dev hint "(Dev: admin@fabbi.vn / admin123)" should NOT appear
    // when running in production-like configuration
    const pageContent = await page.content()
    const hasDevHint = pageContent.includes('admin@fabbi.vn') && pageContent.includes('admin123')

    expect(hasDevHint, 'Hardcoded mock admin credentials must not appear in login UI').toBe(false)
  })

  test('DET-API-002 admin routes blocked when no Supabase session exists', async ({ page }) => {
    // Clear any existing cookies including mock_admin
    await page.context().clearCookies()
    await page.goto('/')

    for (const route of adminRoutes) {
      await page.goto(route)

      // Should redirect to login
      await expect(page).toHaveURL(/\/login/)

      // Should NOT reach CMS dashboard
      const hasCMSContent = await page.locator('body').innerText()
      expect(hasCMSContent, `${route} should not show CMS content without auth`).not.toContain('Vị trí tuyển dụng')
    }
  })

  test('DET-VAL-002 failed login shows visible error without granting access', async ({ page }) => {
    await page.goto('/login')

    await page.locator('#email').fill('not-a-real-admin@fabbi.vn')
    await page.locator('#password').fill('wrongpassword')
    await page.getByRole('button', { name: /đăng nhập/i }).click()

    // Should stay on login page
    await expect(page).toHaveURL(/\/login/)

    // Should show error message
    const body = await page.locator('body').innerText()
    const hasErrorMessage = /không|sai|invalid|error|failed|lỗi|không có quyền|credentials|password|email/i.test(body)
    expect(hasErrorMessage, 'Failed login should show visible error message').toBe(true)

    // Should NOT reach admin dashboard
    expect(body, 'Failed login must not grant CMS access').not.toContain('Dashboard')
  })
})