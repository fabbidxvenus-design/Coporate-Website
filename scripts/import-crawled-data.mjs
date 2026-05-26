import fs from 'fs';
import path from 'path';
import { sql, closeDb } from '../lib/db/connection.js';
import { runMigrations } from '../lib/db/migrate.js';
import {
  parseCrawledPages,
  parseImageMapping,
  buildImportPlan
} from './import-crawled-data-lib.mjs';

async function main() {
  console.log('Starting Crawled Data Import (PostgreSQL)...');

  if (process.env.USE_MOCK_DATA === 'true') {
    console.error('Cannot run import in mock mode. Set USE_MOCK_DATA=false and provide DATABASE_URL.');
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Import aborted.');
    process.exit(1);
  }

  const CRAWL_PAGES_PATH = 'coding-packs/crawlings/crawled_all_pages.md';
  const CRAWL_IMAGES_PATH = 'coding-packs/crawlings/crawled_with_images.md';
  const IMAGE_SOURCE_DIR = 'coding-packs/crawlings/images';
  const PUBLIC_IMAGE_DIR = 'public/images';

  // 1. Ensure public/images exists
  if (!fs.existsSync(PUBLIC_IMAGE_DIR)) {
    fs.mkdirSync(PUBLIC_IMAGE_DIR, { recursive: true });
  }

  // 2. Read source files
  console.log('Reading crawl source files...');
  const pagesMd = fs.readFileSync(CRAWL_PAGES_PATH, 'utf8');
  const imagesMd = fs.readFileSync(CRAWL_IMAGES_PATH, 'utf8');

  // 3. Build plan
  console.log('Building import plan...');
  const pages = parseCrawledPages(pagesMd);
  const imageMap = parseImageMapping(imagesMd);
  const plan = buildImportPlan({
    pages,
    imageMap,
    imageDir: IMAGE_SOURCE_DIR,
    publicImageDir: PUBLIC_IMAGE_DIR
  });

  console.log(`Plan built: ${pages.length} pages parsed.`);

  // 4. Run migrations
  console.log('Running database migrations...');
  await runMigrations();

  // 5. Copy assets (non-destructive)
  console.log(`Copying ${plan.assets.length} assets...`);
  let copiedCount = 0;
  let skippedCount = 0;
  for (const asset of plan.assets) {
    if (fs.existsSync(asset.src)) {
      if (!fs.existsSync(asset.dest)) {
        fs.copyFileSync(asset.src, asset.dest);
        copiedCount++;
      } else {
        skippedCount++;
      }
    } else {
      console.warn(`Source image not found: ${asset.src}`);
    }
  }

  // 6. PostgreSQL upserts in a transaction
  console.log('Upserting records to PostgreSQL...');

  let newsCount = 0;
  let aboutCount = 0;
  let settingsCount = 0;

  await sql.begin(async (tx) => {
    // News Articles
    for (const article of plan.news) {
      await tx`
        INSERT INTO news_articles (id, title, slug, content, excerpt, thumbnail_url, author_name, tags, status, published_at)
        VALUES (
          ${article.id || crypto.randomUUID()},
          ${article.title},
          ${article.slug},
          ${article.content || ''},
          ${article.excerpt || ''},
          ${article.thumbnail_url || null},
          ${article.author_name || 'Fabbi Admin'},
          ${JSON.stringify(article.tags || [])},
          ${article.status || 'published'},
          NOW()
        )
        ON CONFLICT(slug) DO UPDATE SET
          title = EXCLUDED.title,
          content = EXCLUDED.content,
          excerpt = EXCLUDED.excerpt,
          thumbnail_url = EXCLUDED.thumbnail_url,
          updated_at = NOW()
      `;
      newsCount++;
    }

    // Site Settings
    for (const setting of plan.settings) {
      if (setting.value) {
        await tx`
          INSERT INTO site_settings (id, key, value, type, updated_at)
          VALUES (${crypto.randomUUID()}, ${setting.key}, ${setting.value}, 'string', NOW())
          ON CONFLICT(key) DO UPDATE SET
            value = EXCLUDED.value,
            updated_at = NOW()
        `;
        settingsCount++;
      }
    }

    // About Content
    for (const about of plan.about) {
      await tx`
        INSERT INTO about_content (id, locale, hero_title, hero_image_url, updated_at)
        VALUES (${about.id || 'about-us'}, ${about.locale || 'vi'}, ${about.hero_title || ''}, ${about.hero_image_url || null}, NOW())
        ON CONFLICT(id, locale) DO UPDATE SET
          hero_title = EXCLUDED.hero_title,
          hero_image_url = EXCLUDED.hero_image_url,
          updated_at = NOW()
      `;
      aboutCount++;
    }
  });

  console.log('Import completed successfully!');
  console.log('----------------------------');
  console.log(`News:      ${newsCount}`);
  console.log(`About:     ${aboutCount}`);
  console.log(`Settings:  ${settingsCount}`);
  console.log(`Assets copied:    ${copiedCount}`);
  console.log(`Assets skipped:  ${skippedCount}`);
  console.log('----------------------------');

  await closeDb();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});