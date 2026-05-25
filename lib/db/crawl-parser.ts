import fs from 'fs';
import path from 'path';

/**
 * Parses the crawled_all_pages.md format
 */
export function parseCrawledPages(markdown: string) {
  if (!markdown) return [];

  const pages: any[] = [];
  // Split by headers like "#### 1.1. TRANG 1:"
  const sections = markdown.split(/\n(?=####\s+\d+\.\d+\.\s+TRANG\s+\d+:)/);

  for (const section of sections) {
    const urlMatch = section.match(/####\s+\d+\.\d+\.\s+TRANG\s+\d+:\s*(https?:\/\/[^\s\n]+)/);
    if (!urlMatch) continue;

    const url = urlMatch[1].trim();
    const page: any = { url };

    // Extract Phân loại trang
    const typeMatch = section.match(/\*\s+\*\*Phân loại trang:\*\*\s*(.*)/);
    if (typeMatch) page.type = typeMatch[1].trim();

    // Extract Tiêu đề
    const titleMatch = section.match(/\*\s+\*\*Tiêu đề:\*\*\s*(.*)/);
    if (titleMatch) page.title = titleMatch[1].trim();

    // Extract Mô tả chi tiết
    const detailMatch = section.match(/\*\s+\*\*Mô tả chi tiết:\*\*\s*([\s\S]*?)(?=\n\*|$)/);
    if (detailMatch) page.content = detailMatch[1].trim();

    // Extract contact info
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
 */
export function parseImageMapping(markdown: string) {
  if (!markdown) return {};

  const mapping: Record<string, string[]> = {};
  const sections = markdown.split(/\n(?=##\s+Page:)/);

  for (const section of sections) {
    const urlMatch = section.match(/##\s+Page:\s*(https?:\/\/[^\s\n]+)/);
    if (!urlMatch) continue;

    const url = urlMatch[1].trim();
    const images: string[] = [];

    const imgMatches = section.matchAll(/-\s+!?\[.*?\]\((.*?)\)/g);
    for (const match of imgMatches) {
      images.push(match[1].trim());
    }

    mapping[url] = images;
  }

  return mapping;
}

/**
 * Builds an import plan compatible with SeedData
 */
export function buildImportPlan({
  pages,
  imageMap,
  imageDir,
  publicImageDir
}: {
  pages: any[],
  imageMap: Record<string, string[]>,
  imageDir: string,
  publicImageDir: string
}) {
  const plan: any = {
    news: [],
    about: [],
    settings: [],
    assets: []
  };

  for (const page of pages) {
    const images = imageMap[page.url] || [];
    const browserImages = images.map(img => {
      const filename = path.basename(img);
      const destUrl = `/images/${filename}`;

      // Add to copy tasks
      if (!plan.assets.find((a: any) => a.filename === filename)) {
        plan.assets.push({
          src: path.join(imageDir, filename),
          dest: path.join(publicImageDir, filename),
          filename,
          destUrl
        });
      }

      return destUrl;
    });

    const isNews = page.url.includes('/tin-tuc/') ||
                   (page.type && /tin tức|giải thưởng|hoạt động|sự kiện/i.test(page.type));
    const isAbout = page.type && /công ty|giới thiệu|thư ngỏ|ban lãnh đạo|văn hóa/i.test(page.type);

    const slug = page.url.split('/').filter(Boolean).pop() || 'home';

    if (isNews) {
      plan.news.push({
        title: page.title,
        slug,
        content: page.content,
        excerpt: page.content.substring(0, 200).replace(/\s\S*$/, '') + '...',
        author_name: 'Fabbi Admin',
        tags: ['Crawled'],
        status: 'published',
        thumbnail_url: browserImages[0] || null
      });
    } else if (isAbout) {
      const locale = page.url.includes('/vi/') ? 'vi' : page.url.includes('/ja/') ? 'ja' : 'en';
      plan.about.push({
        id: slug,
        locale,
        hero_title: page.title,
        content: page.content,
        hero_image_url: browserImages[0] || null
      });
    }

    if (page.contact) {
      if (page.contact.address) plan.settings.push({ key: 'company_address', value: page.contact.address, type: 'string' });
      if (page.contact.phone) plan.settings.push({ key: 'company_phone', value: page.contact.phone, type: 'string' });
      if (page.contact.email) plan.settings.push({ key: 'company_email', value: page.contact.email, type: 'string' });
    }
  }

  return plan;
}
