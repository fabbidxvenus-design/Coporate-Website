const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const evidenceDir = path.join(process.cwd(), 'plans', 'audit-fix-workflow', 'phase-08', 'evidence');
if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

const pages = [
  { url: 'http://localhost:3001/', slug: 'home' },
  { url: 'http://localhost:3001/jobs', slug: 'jobs' },
  { url: 'http://localhost:3001/jobs/senior-frontend-developer-reactjs', slug: 'job-detail' },
  { url: 'http://localhost:3001/news', slug: 'news' },
  { url: 'http://localhost:3001/news/le-tong-ket-quy-1-2024', slug: 'news-detail' },
  { url: 'http://localhost:3001/apply', slug: 'apply' },
  { url: 'http://localhost:3001/about', slug: 'about' },
  { url: 'http://localhost:3001/login', slug: 'login' },
];

const viewports = [
  { width: 1440, height: 900, label: '1440' },
  { width: 1920, height: 1080, label: '1920' },
];

async function captureScreenshots() {
  const browser = await chromium.launch();

  for (const page of pages) {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
      });
      const p = await context.newPage();

      try {
        console.log(`Capturing ${page.slug} @ ${vp.label}px...`);
        await p.goto(page.url, { waitUntil: 'networkidle', timeout: 15000 });
        await p.waitForTimeout(1000);

        const filename = `${page.slug}-${vp.label}.png`;
        const filepath = path.join(evidenceDir, filename);
        await p.screenshot({ path: filepath, fullPage: true });
        console.log(`  ✓ Saved: ${filename}`);
      } catch (err) {
        console.error(`  ✗ Failed: ${page.slug} @ ${vp.label} — ${err.message}`);
      } finally {
        await context.close();
      }
    }
  }

  await browser.close();
  console.log('\nScreenshots saved to:', evidenceDir);
}

captureScreenshots().catch(console.error);