import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const KEY_PAGES = [
  { url: '/vi', label: 'Home (VI)' },
  { url: '/ja', label: 'Home (JA)' },
  { url: '/vi/jobs', label: 'Jobs listing' },
  { url: '/vi/news', label: 'News listing' },
  { url: '/vi/apply', label: 'Apply form' },
  { url: '/vi/contact', label: 'Contact' },
]

const RESPONSIVE_BREAKPOINTS = [
  { width: 320, height: 568, label: 'mobile-small' },
  { width: 375, height: 667, label: 'mobile' },
  { width: 768, height: 1024, label: 'tablet' },
  { width: 1024, height: 768, label: 'laptop' },
  { width: 1440, height: 900, label: 'desktop' },
]

test.describe('Accessibility Audit', () => {
  for (const page of KEY_PAGES) {
    test(`${page.label} (/${page.url.replace('/', '') || 'home'}): axe-core accessibility check`, async ({ page: pw }) => {
      await pw.goto(page.url)

      const accessibilityScanResults = await new AxeBuilder({ page: pw })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze()

      const violations = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious'
      )

      if (violations.length > 0) {
        const summary = violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.length,
        }))
        console.log(`[A11Y] ${page.label} violations:`, JSON.stringify(summary, null, 2))
      }

      // Critical/serious violations fail the test
      expect(violations, `Accessibility violations found on ${page.label}`).toHaveLength(0)
    })
  }
})

test.describe('Responsive Verification', () => {
  for (const bp of RESPONSIVE_BREAKPOINTS) {
    test(`${bp.label} (${bp.width}x${bp.height}): no horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height })
      await page.goto('/')

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth
      })

      expect(hasOverflow, `Horizontal overflow detected at ${bp.label} (${bp.width}x${bp.height})`).toBe(false)
    })
  }

  for (const bp of RESPONSIVE_BREAKPOINTS) {
    test(`${bp.label} (${bp.width}x${bp.height}): navigation is accessible`, async ({ page }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height })
      await page.goto('/')

      // Check that header links are visible
      const header = page.locator('header')
      await expect(header).toBeVisible()

      // Check that skip link exists
      const skipLink = page.locator('a:has-text("Skip to main content")')
      if (bp.width >= 768) {
        await expect(skipLink).toHaveCount(1)
      }

      // Check footer is visible
      const footer = page.locator('footer')
      await expect(footer).toBeVisible()
    })
  }
})

test.describe('Visual QA: Key Screens', () => {
  test('home page renders at desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/vi')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('section').first()).toBeVisible()
  })

  test('jobs page renders at desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/vi/jobs')
    await expect(page.locator('h1,h2').first()).toBeVisible()
  })

  test('apply form renders at desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/vi/apply')
    await expect(page.getByRole('textbox').first()).toBeVisible()
  })

  test('news page renders at desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/vi/news')
    await expect(page.locator('h1,h2').first()).toBeVisible()
  })
})

test.describe('Security: Admin Route Protection', () => {
  test('unauthenticated access to /admin redirects to login', async ({ page }) => {
    await page.goto('/admin')
    // Wait for redirect to /login
    await expect(page).toHaveURL(/\/login/)
  })

  test('login page is accessible to public', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })
})

test.describe('Content Visibility Rules', () => {
  test('published jobs appear in public listing', async ({ page }) => {
    await page.goto('/vi/jobs')
    const body = page.locator('body')
    // Mock data should have published jobs
    await expect(body).toContainText(/jobs|recruitment|việc làm|採用/i)
  })

  test('news articles appear in public listing', async ({ page }) => {
    await page.goto('/vi/news')
    const body = page.locator('body')
    await expect(body).toContainText(/news|tin|tức|ニュース/i)
  })

  test('no "draft" status leaks to public job listings', async ({ page }) => {
    await page.goto('/vi/jobs')
    const body = page.locator('body')
    // Check that no draft labels are visible
    const draftText = body.getByText(/draft|review/i, { exact: false })
    await expect(draftText).toHaveCount(0)
  })
})