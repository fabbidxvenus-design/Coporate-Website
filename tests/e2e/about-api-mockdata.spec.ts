import { test, expect } from '@playwright/test'

test.describe('About Page API - Red Gate', () => {
  test('GET /api/about/vi returns Vietnamese content', async ({ request }) => {
    const response = await request.get('/api/about/vi')
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data).toHaveProperty('title')
    expect(body.data).toHaveProperty('stats')
    expect(body.data.title).toContain('Fabbi')
  })

  test('GET /api/about/ja returns Japanese content', async ({ request }) => {
    const response = await request.get('/api/about/ja')
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data).toHaveProperty('title')
    expect(body.data.title).toContain('Fabbi')
  })

  test('GET /api/about/vi with unknown locale falls back gracefully', async ({ request }) => {
    const response = await request.get('/api/about/fr')
    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    expect(body.success).toBe(true)
    expect(body.data).toBeDefined()
  })
})

test.describe('About Page Rendering - Dynamic Content Check', () => {
  test('Vietnamese about page renders dynamic content', async ({ page }) => {
    await page.goto('/vi/about', { waitUntil: 'domcontentloaded' })
    const heading = page.locator('section h1').first()
    await expect(heading).toBeVisible()
    const statValues = page.locator('[class*="text-4xl"]')
    const count = await statValues.count()
    expect(count).toBeGreaterThan(0)
  })

  test('Japanese about page renders dynamic content', async ({ page }) => {
    await page.goto('/ja/about', { waitUntil: 'domcontentloaded' })
    const heading = page.locator('section h1').first()
    await expect(heading).toBeVisible()
    const statValues = page.locator('[class*="text-4xl"]')
    const count = await statValues.count()
    expect(count).toBeGreaterThan(0)
  })
})
