const { chromium } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const root = process.cwd();
  const artifacts = path.join(root, '.qc', 'ui', 'contact');
  const screenshots = path.join(artifacts, 'screenshots');
  fs.mkdirSync(screenshots, { recursive: true });
  const htmlPath = path.join(root, '.design', 'recruitment_site', 'ung_tuyen_ngay_fabbi_final_precision', 'code.html');
  const htmlUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  const route = 'http://localhost:3000/vi/contact';
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1 });
  const design = await context.newPage();
  const app = await context.newPage();
  const result = { route, htmlUrl, breakpoint: 1440, consoleErrors: [], a11y: null, design: {}, app: {}, computed: [] };
  app.on('console', msg => { if (msg.type() === 'error') result.consoleErrors.push(msg.text()); });
  await design.goto(htmlUrl, { waitUntil: 'networkidle' });
  await app.goto(route, { waitUntil: 'networkidle' });
  await design.screenshot({ path: path.join(screenshots, 'design-1440.png'), fullPage: true });
  await app.screenshot({ path: path.join(screenshots, 'app-1440.png'), fullPage: true });
  result.design.titleText = await design.locator('h2').first().textContent().catch(() => null);
  result.app.titleText = await app.locator('h1').first().textContent().catch(() => null);
  result.design.formFields = await design.locator('input, textarea, select').evaluateAll(els => els.map(el => ({ tag: el.tagName.toLowerCase(), id: el.id, name: el.getAttribute('name'), type: el.getAttribute('type'), placeholder: el.getAttribute('placeholder') })));
  result.app.formFields = await app.locator('input, textarea, select').evaluateAll(els => els.map(el => ({ tag: el.tagName.toLowerCase(), id: el.id, name: el.getAttribute('name'), type: el.getAttribute('type'), placeholder: el.getAttribute('placeholder') })));
  result.design.bodyOverflowX = await design.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  result.app.bodyOverflowX = await app.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  result.a11y = await new AxeBuilder({ page: app }).analyze();
  const pairs = [
    ['container', design.locator('[data-purpose="modal-container"]').first(), app.locator('.bg-white.rounded-2xl').first()],
    ['title', design.locator('h2').first(), app.locator('h1').first()],
    ['submit', design.locator('button[type="submit"]').first(), app.locator('button[type="submit"]').first()],
    ['firstInput', design.locator('input, select, textarea').first(), app.locator('input, select, textarea').first()]
  ];
  for (const [name, d, a] of pairs) {
    const get = async (locator) => locator.evaluate(el => {
      const s = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        fontFamily: s.fontFamily, fontSize: s.fontSize, fontWeight: s.fontWeight, lineHeight: s.lineHeight,
        color: s.color, backgroundColor: s.backgroundColor, backgroundImage: s.backgroundImage,
        borderRadius: s.borderRadius, borderTopColor: s.borderTopColor, borderTopWidth: s.borderTopWidth,
        boxShadow: s.boxShadow, padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
        margin: `${s.marginTop} ${s.marginRight} ${s.marginBottom} ${s.marginLeft}`,
        display: s.display, position: s.position, width: `${Math.round(r.width)}px`, height: `${Math.round(r.height)}px`, maxWidth: s.maxWidth
      };
    }).catch(e => ({ error: e.message }));
    result.computed.push({ name, design: await get(d), app: await get(a) });
  }
  fs.writeFileSync(path.join(artifacts, 'browser-evidence.json'), JSON.stringify(result, null, 2));
  await browser.close();
})().catch(err => { console.error(err); process.exit(1); });
