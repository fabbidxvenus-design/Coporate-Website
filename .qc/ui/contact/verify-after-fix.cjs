const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  await page.goto('http://localhost:3001/vi/contact', { waitUntil: 'networkidle', timeout: 60000 });
  const checks = {
    title: await page.locator('#contact-application-title').textContent(),
    dialog: await page.locator('[role="dialog"][aria-modal="true"]').count(),
    position: await page.locator('select#position').count(),
    upload: await page.locator('input[type="file"][accept=".pdf,.doc,.docx"]').count(),
    submitText: await page.locator('button[type="submit"]').textContent(),
    overflowX: await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth),
    containerWidth: await page.locator('[role="dialog"]').evaluate((el) => Math.round(el.getBoundingClientRect().width)),
    submitStyle: await page.locator('button[type="submit"]').evaluate((el) => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        backgroundColor: s.backgroundColor,
        borderRadius: s.borderRadius,
        width: Math.round(r.width),
        height: Math.round(r.height),
      };
    }),
  };
  await page.screenshot({ path: '.qc/ui/contact/screenshots/app-1440-after-fix.png', fullPage: true });
  console.log(JSON.stringify({ checks, errors }, null, 2));
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
