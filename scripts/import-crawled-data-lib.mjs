import fs from 'fs';
import path from 'path';

/**
 * Parses the crawled_all_pages.md format
 * Sections are separated by #### x.y. TRANG n: URL
 */
export function parseCrawledPages(markdown) {
  if (!markdown) return [];

  const pages = [];
  // Split by "#### " but keep the delimiter to find the TRANG marker
  const sections = markdown.split(/\n(?=####\s+\d+\.\d+\.\s+TRANG\s+\d+:)/);

  for (const section of sections) {
    const urlMatch = section.match(/####\s+\d+\.\d+\.\s+TRANG\s+\d+:\s*(https?:\/\/[^\s\n]+)/);
    if (!urlMatch) continue;

    const url = urlMatch[1].trim();
    const page = { url };

    // Extract Phân loại trang
    const typeMatch = section.match(/\*\s+\*\*Phân loại trang:\*\*\s*(.*)/);
    if (typeMatch) page.type = typeMatch[1].trim();

    // Extract Tiêu đề
    const titleMatch = section.match(/\*\s+\*\*Tiêu đề:\*\*\s*(.*)/);
    if (titleMatch) page.title = titleMatch[1].trim();

    // Extract Mô tả chi tiết (everything between this and the next bullet or end of section)
    const detailMatch = section.match(/\*\s+\*\*Mô tả chi tiết:\*\*\s*([\s\S]*?)(?=\n\*|$)/);
    if (detailMatch) page.content = detailMatch[1].trim();

    // Extract contact info if present
    const contactSection = section.match(/\*\*Thông tin liên hệ:\*\*\s*([\s\S]*?)(?=\n\*|$)/);
    if (contactSection) {
      const addressMatch = contactSection[1].match(/\*?\s*Địa chỉ:\s*(.*)/);
      const phoneMatch = contactSection[1].match(/\*?\s*Điện thoại:\s*(.*)/);
      const emailMatch = contactSection[1].match(/\*?\s*Email:\s*(.*)/);

      page.contact = {
        address: addressMatch ? addressMatch[1].trim() : null,
        phone: phoneMatch ? phoneMatch[1].trim() : null,
        email: emailMatch ? emailMatch[1].trim() : null
      };
    }

    pages.push(page);
  }

  return pages;
}

/**
 * Parses the crawled_with_images.md format
 * Groups are separated by ## Page: URL
 */
export function parseImageMapping(markdown) {
  if (!markdown) return {};

  const mapping = {};
  const sections = markdown.split(/\n(?=##\s+Page:)/);

  for (const section of sections) {
    const urlMatch = section.match(/##\s+Page:\s*(https?:\/\/[^\s\n]+)/);
    if (!urlMatch) continue;

    const url = urlMatch[1].trim();
    const images = [];

    // Extract images: - ![](./images/...) or - ![Alt](./images/...)
    const imgMatches = section.matchAll(/-\s+!?\[.*?\]\((.*?)\)/g);
    for (const match of imgMatches) {
      images.push(match[1].trim());
    }

    // Also catch missing images to report
    const missingMatches = section.matchAll(/-\s+\[Missing Image\]\s+([^\s\n]+)/g);
    for (const match of missingMatches) {
      images.push(`[Missing Image] ${match[1].trim()}`);
    }

    mapping[url] = images;
  }

  return mapping;
}

/**
 * Builds a deterministic import plan
 */
export function buildImportPlan({ pages, imageMap, imageDir, publicImageDir }) {
  const plan = {
    news: [],
    about: [],
    settings: [],
    jobs: [],
    assets: [],
    skippedAssets: [],
    summary: {
      pagesParsed: pages.length,
      newsCount: 0,
      aboutCount: 0,
      settingsCount: 0,
      jobsCount: 0
    }
  };

  for (const page of pages) {
    const images = imageMap[page.url] || [];
    const browserImages = images.map(img => {
      if (img.startsWith('[Missing Image]')) {
        plan.skippedAssets.push({ url: page.url, reason: img });
        return null;
      }

      const filename = path.basename(img);
      const destUrl = `/images/${filename}`;

      // Add to copy tasks if not already there
      if (!plan.assets.find(a => a.filename === filename)) {
        plan.assets.push({
          src: path.join(imageDir || '', filename),
          dest: path.join(publicImageDir || '', filename),
          filename,
          destUrl
        });
      }

      return destUrl;
    }).filter(Boolean);

    // Classification
    const isNews = page.url.includes('/tin-tuc/') ||
                   (page.type && /tin tức|giải thưởng|hoạt động|sự kiện/i.test(page.type));
    const isAbout = page.type && /công ty|giới thiệu|thư ngỏ|ban lãnh đạo|văn hóa/i.test(page.type);

    const slug = page.url.split('/').filter(Boolean).pop() || 'index';

    if (isNews) {
      plan.news.push({
        id: crypto.randomUUID(),
        title: page.title,
        slug,
        content: page.content,
        excerpt: page.content.substring(0, 200) + '...',
        thumbnail_url: browserImages[0] || null,
        author_name: 'Fabbi Admin',
        tags: ['Crawled'],
        status: 'published',
        published_at: new Date().toISOString()
      });
      plan.summary.newsCount++;
    } else if (isAbout) {
      plan.about.push({
        id: slug,
        locale: page.url.includes('/vi/') ? 'vi' : 'ja',
        hero_title: page.title,
        content: page.content,
        hero_image_url: browserImages[0] || null
      });
      plan.summary.aboutCount++;
    }

    if (page.contact) {
      plan.settings.push({ key: 'company_address', value: page.contact.address });
      plan.settings.push({ key: 'company_phone', value: page.contact.phone });
      plan.settings.push({ key: 'company_email', value: page.contact.email });
      plan.summary.settingsCount += 3;
    }
  }

  return plan;
}
