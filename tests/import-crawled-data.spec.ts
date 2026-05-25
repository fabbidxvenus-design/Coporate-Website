import { describe, it, expect } from 'vitest'
import {
  parseCrawledPages,
  parseImageMapping,
  buildImportPlan
} from '../lib/db/crawl-parser'

describe('TIP-020: Import Crawled Data Parser', () => {
  const mockPagesMd = `
#### 1.1. TRANG 1: https://fabbiholdings.com/vi/greeting/

*   **Phân loại trang:** Trang chủ / Giới thiệu
*   **Tiêu đề:** Lời chào từ Chủ tịch
*   **Mô tả chi tiết:**
    * Fabbi khởi nguồn từ khát vọng...
    * **Tầm nhìn:** Trở thành tập đoàn công nghệ hàng đầu.
    * **Sứ mệnh:** Mang lại giá trị tốt nhất.
*   **Hình ảnh:**
    * ![](./images/Logo-Fabbi.svg)
  `.trim()

  const mockImagesMd = `
## Page: https://fabbiholdings.com/vi/greeting/
### Images found:
- ![Logo](./images/Logo-Fabbi.svg)
- ![](./images/tu_message-683x1024.jpg)
  `.trim()

  it('should parse page sections correctly', () => {
    const pages = parseCrawledPages(mockPagesMd)
    expect(pages).toHaveLength(1)
    expect(pages[0].url).toBe('https://fabbiholdings.com/vi/greeting/')
    expect(pages[0].title).toBe('Lời chào từ Chủ tịch')
    expect(pages[0].type).toContain('Giới thiệu')
  })

  it('should parse image mapping correctly', () => {
    const imageMap = parseImageMapping(mockImagesMd)
    expect(imageMap['https://fabbiholdings.com/vi/greeting/']).toBeDefined()
    expect(imageMap['https://fabbiholdings.com/vi/greeting/']).toContain('./images/Logo-Fabbi.svg')
  })

  it('should build an import plan with browser-safe URLs', () => {
    const pages = parseCrawledPages(mockPagesMd)
    const imageMap = parseImageMapping(mockImagesMd)
    const plan = buildImportPlan({
      pages,
      imageMap,
      imageDir: 'coding-packs/crawlings/images',
      publicImageDir: 'public/images'
    })

    expect(plan.news).toBeDefined()
    expect(plan.about).toBeDefined()
    // Verify image path conversion
    const logoEntry = plan.assets.find((a: any) => a.filename === 'Logo-Fabbi.svg')
    expect(logoEntry?.destUrl).toBe('/images/Logo-Fabbi.svg')
  })

  it('should classify about pages correctly', () => {
    const pages = parseCrawledPages(mockPagesMd)
    const imageMap = parseImageMapping(mockImagesMd)
    const plan = buildImportPlan({ pages, imageMap, imageDir: '', publicImageDir: '' })

    expect(plan.about).toHaveLength(1)
    expect(plan.about[0].locale).toBe('vi')
    expect(plan.about[0].hero_title).toBe('Lời chào từ Chủ tịch')
  })

  it('should return empty array for empty markdown', () => {
    expect(parseCrawledPages('')).toHaveLength(0)
    expect(parseCrawledPages(null as any)).toHaveLength(0)
    expect(Object.keys(parseImageMapping('')).length).toBe(0)
  })
})
