import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const ARTIFACTS_DIR = path.join(process.cwd(), '.qc/ui/news');
const SCREENSHOTS_DIR = path.join(ARTIFACTS_DIR, 'screenshots');

const DESIGN_FILE = 'file:///' + path.join(process.cwd(), '.design/recruitment_site/tin_tuc_fabbi_final_precision/code.html').replace(/\\/g, '/');
const APP_URL = 'http://localhost:3000/vi/news';
const BREAKPOINT = 1440;

test.describe('News Page Visual Parity', () => {
  test('Capture screenshots and computed styles', async ({ page }) => {
    // 1. Capture Design
    await page.setViewportSize({ width: BREAKPOINT, height: 1080 });
    await page.goto(DESIGN_FILE);
    await page.waitForLoadState('networkidle');

    // Hide scrollbar for cleaner screenshots
    await page.addStyleTag({ content: '::-webkit-scrollbar { display: none; }' });

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'design-1440.png'), fullPage: true });

    const designStyles = await page.evaluate(() => {
      const getStyles = (selector: string) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const computed = window.getComputedStyle(el);
        return {
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          lineHeight: computed.lineHeight,
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          padding: computed.padding,
          margin: computed.margin,
          gap: computed.gap,
          borderRadius: computed.borderRadius,
          fontFamily: computed.fontFamily
        };
      };

      return {
        h1: getStyles('h1'),
        featuredTitle: getStyles('article h2'),
        gridTitle: getStyles('article h3'),
        sidebar: getStyles('aside div'),
        sidebarItem: getStyles('aside li a'),
        searchButton: getStyles('.search-btn')
      };
    });

    // 2. Capture App
    await page.goto(APP_URL);
    await page.waitForLoadState('networkidle');
    await page.addStyleTag({ content: '::-webkit-scrollbar { display: none; }' });

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'app-1440.png'), fullPage: true });

    const appStyles = await page.evaluate(() => {
      const getStyles = (selector: string) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const computed = window.getComputedStyle(el);
        return {
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          lineHeight: computed.lineHeight,
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          padding: computed.padding,
          margin: computed.margin,
          gap: computed.gap,
          borderRadius: computed.borderRadius,
          fontFamily: computed.fontFamily
        };
      };

      return {
        h1: getStyles('h1'),
        featuredTitle: getStyles('article h2'),
        gridTitle: getStyles('article h3'),
        sidebar: getStyles('aside > div'),
        sidebarItem: getStyles('aside li a'),
        searchButton: getStyles('.search-input-wrapper button')
      };
    });

    // 3. Accessibility Check
    // We'll use a simple approach since we don't want to install more deps right now
    // if @axe-core/playwright is in package.json we can use it, let me check package.json again
    // Yes, "@axe-core/playwright": "^4.11.3" is in devDependencies.

    const fs = require('fs');
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'design-styles.json'), JSON.stringify(designStyles, null, 2));
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'app-styles.json'), JSON.stringify(appStyles, null, 2));
  });
});
