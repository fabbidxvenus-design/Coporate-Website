import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Bilingual Localization Expansion (SPEC)', () => {

  test('AC-01: Dictionary Parity', async () => {
    const viPath = path.join(process.cwd(), 'lib/i18n/vi.json');
    const jaPath = path.join(process.cwd(), 'lib/i18n/ja.json');
    const vi = JSON.parse(fs.readFileSync(viPath, 'utf8'));
    const ja = JSON.parse(fs.readFileSync(jaPath, 'utf8'));

    const getKeys = (obj: any, prefix = ''): string[] => {
      return Object.keys(obj).reduce((res: string[], el) => {
        if (Array.isArray(obj[el])) return res;
        if (typeof obj[el] === 'object' && obj[el] !== null) {
          return [...res, ...getKeys(obj[el], prefix + el + '.')];
        }
        return [...res, prefix + el];
      }, []);
    };

    const viKeys = getKeys(vi).sort();
    const jaKeys = getKeys(ja).sort();

    // RED: These will differ initially
    expect(viKeys).toEqual(jaKeys);
  });

  test('AC-02: Home Page Localization', async ({ page }) => {
    await page.goto('/ja');
    const body = page.locator('body');
    // RED: Expect Japanese, will likely find hardcoded Vietnamese
    await expect(body).toContainText('IT人材採用');
    await expect(body).not.toContainText('Tuyển dụng nhân sự IT hàng đầu');
  });

  test('AC-04: Jobs Page Localization', async ({ page }) => {
    await page.goto('/ja/jobs');
    // Check for specific Japanese labels that are visible in the text
    await expect(page.locator('body')).toContainText('キャリア機会');
    await expect(page.locator('input[name="q"]')).toHaveAttribute('placeholder', '職種を検索');
  });

  test('AC-06: Apply Form Localization', async ({ page }) => {
    await page.goto('/ja/apply');
    const body = page.locator('body');
    // RED: Expect Japanese form labels
    await expect(body).toContainText('氏名');
    await expect(body).not.toContainText('Họ và tên');
  });

  test('AC-07: Route-Preserving Language Switch', async ({ page }) => {
    await page.goto('/vi/jobs');
    // Switch to JA
    await page.locator('header button:has-text("JP")').click();
    await expect(page).toHaveURL(/\/ja\/jobs/);
  });

  test('AC-08: Footer Localization', async ({ page }) => {
    await page.goto('/ja');
    const footer = page.locator('footer');
    // RED: Footer labels should be Japanese
    await expect(footer).toContainText('採用情報');
    await expect(footer).not.toContainText('Tuyển dụng');
  });

});