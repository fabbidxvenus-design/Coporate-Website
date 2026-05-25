import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('corporate mock images exist and are referenced correctly', async ({ page }) => {
  const publicImagesDir = 'public/images';

  // 1. Navigate to pages and check image request status
  const targetPages = ['/vi/news', '/vi/about'];

  for (const url of targetPages) {
    console.log(`\n--- Checking page: ${url} ---`);
    const responses: any[] = [];
    page.on('response', response => {
      const respUrl = response.url();
      if (respUrl.includes('/images/')) {
        responses.push({ url: respUrl, status: response.status() });
      }
    });

    await page.goto(url, { waitUntil: 'networkidle' });

    // Assert no 400/404 for image requests
    for (const res of responses) {
      console.log(`Image request: ${res.url} -> ${res.status}`);
      expect(res.status, `Image ${res.url} should not return 400/404`).toBeLessThan(400);
    }

    // Evaluate image src on page
    const images = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img')).map(img => ({
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt')
        }));
    });
    console.log(`Found ${images.length} images on page.`);
    images.forEach(img => console.log(`  - ${img.src} (alt: ${img.alt})`));
  }
});
