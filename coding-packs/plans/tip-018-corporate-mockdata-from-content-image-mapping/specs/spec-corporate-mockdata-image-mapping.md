# SPEC: TIP-018 Corporate Mock Data Image Mapping

## AC-01: Runtime mock data is wired from authoritative crawl sources
- Given: `content_image_mapping.json` and `crawled_raw_data.json` are the authoritative TIP-018 inputs
- When: app-visible mock loaders are inspected
- Then: news/about runtime data is derived from those sources or deterministic processed artifacts based on those sources, not stale hand-written placeholder records

## AC-02: App-visible images are local public URLs
- Given: runtime mock data exposes `cover_image_url`, `thumbnail_url`, `heroImage`, `imageUrl`, or equivalent fields
- When: each image reference is normalized
- Then: every visible image URL starts with `/images/`, is not a bare filename, and is not double-prefixed as `/images//images/...`

## AC-03: Referenced public image files exist
- Given: runtime mock data references `/images/<local_filename>`
- When: the validator resolves each reference against `public/images/`
- Then: every referenced file exists and unavailable mapped images are excluded from primary visible data

## AC-04: Remote and placeholder imagery is absent
- Given: public mock-mode news/about pages render corporate imagery
- When: app-visible mock data and renderers are scanned
- Then: no image reference contains `images.unsplash.com`, `picsum.photos`, crawled remote URLs, or stale generated placeholder image services

## AC-05: News list renders mapped local images without request failures
- Given: `USE_MOCK_DATA=true`
- When: `/vi/news` is opened in a browser
- Then: at least one crawled corporate/news article renders a visible local image and no image request returns 400 or 404

## AC-06: News detail renders mapped local cover images
- Given: a published mock article appears on `/vi/news`
- When: `/vi/news/[slug]` is opened for that article
- Then: the detail cover image starts with `/images/`, resolves to `public/images/`, and no image request returns 400 or 404

## AC-07: About page uses local crawl imagery
- Given: `USE_MOCK_DATA=true`
- When: `/vi/about` is opened in a browser
- Then: hero/story/activity/team images use local crawl assets, not Unsplash/Picsum/remote placeholders, and no image request returns 400 or 404

## AC-08: Layout and route behavior are preserved
- Given: TIP-018 changes data and image wiring only
- When: target public pages are visually checked
- Then: layout hierarchy, spacing, responsive composition, locale routes, and translations are preserved outside the necessary data/media changes

## AC-09: Build and targeted validation pass
- Given: implementation is complete
- When: targeted mock image validation and `npm run build` or `npx next build` run
- Then: they pass, or unrelated blockers are documented with exact command output and evidence

## AC-10: Fallback image decisions are documented
- Given: a mapped image is unavailable, missing, duplicated, or ambiguous
- When: a fallback is selected
- Then: the fallback uses a nearby available mapped image and the decision is recorded in the final report or source mapping notes
