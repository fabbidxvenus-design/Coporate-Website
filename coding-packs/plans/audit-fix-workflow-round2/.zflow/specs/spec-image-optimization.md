# Phase SPEC: Image Optimization

## Context
`app/(public)/news/page.tsx` and `app/(public)/news/[slug]/page.tsx` use native `<img>` tags. PERF-018/019 require replacing with Next.js `<Image>` for LCP and CLS optimization.

## Given/When/Then Specs

### GWT-001: News listing featured article image
- **Given:** A published news article with a cover image URL
- **When:** The article renders in the FeaturedArticle component
- **Then:** The image uses Next.js `<Image>` with `priority` and `fill` props, loading eagerly for LCP

### GWT-002: News listing grid/thumbnail images
- **Given:** A published news article with a cover image URL in grid/list view
- **When:** The article renders in ArticleGridCard or HorizontalArticleCard
- **Then:** The image uses Next.js `<Image>` with `fill` and `loading="lazy"` for below-fold optimization

### GWT-003: News detail featured image
- **Given:** A news detail page with a featured image
- **When:** The page renders the featured image
- **Then:** The image uses Next.js `<Image>` with `priority` and `fill`, contributing to fast LCP

### GWT-004: Related article thumbnails
- **Given:** News detail page with related articles
- **When:** Related article cards render their thumbnails
- **Then:** Images use Next.js `<Image>` with `fill` and `loading="lazy"`

## Acceptance Criteria
- [ ] FeaturedArticle uses `<Image priority fill sizes="...">` for above-fold LCP
- [ ] ArticleGridCard uses `<Image fill loading="lazy">`
- [ ] HorizontalArticleCard uses `<Image fill loading="lazy">`
- [ ] News detail featured image uses `<Image priority fill>`
- [ ] Related article thumbnails use `<Image fill loading="lazy">`
- [ ] All images have explicit or fill-based sizing to prevent CLS
- [ ] `npm run build` passes with no image loading errors