# Coverage Matrix: TIP-018 Corporate Mock Data Image Mapping

| TIP-018 Requirement / AC | Plan Artifact | Verification |
|---|---|---|
| Use `content_image_mapping.json` as authoritative source | `tips/tip-001-source-mapping-and-assets.md` | Source mapping notes in final report |
| Use `crawled_raw_data.json` as factual text source | `tips/tip-001-source-mapping-and-assets.md`, `tips/tip-003-runtime-loaders-and-image-helper.md` | Runtime data inspection and reviewer check |
| Use only local crawl media | `tips/tip-001-source-mapping-and-assets.md` | Static image integrity test |
| Ensure referenced media exists under `public/images/` | `tips/tip-001-source-mapping-and-assets.md`, `tips/tip-002-red-gate-validation.md` | Public asset existence assertions |
| Wire visible app runtime mock data | `tips/tip-003-runtime-loaders-and-image-helper.md` | Loader inspection and browser tests |
| No Unsplash/Picsum/remote placeholders | `tips/tip-002-red-gate-validation.md`, `tips/tip-003-runtime-loaders-and-image-helper.md` | Forbidden URL scan |
| Normalize `/images/` exactly once | `tips/tip-003-runtime-loaders-and-image-helper.md`, `tips/tip-004-public-renderer-wiring.md` | No bare filename/double-prefix assertions |
| Preserve layout/routing/translations | `tips/tip-004-public-renderer-wiring.md`, `tips/tip-005-green-gate-visual-verification.md` | Screenshots and reviewer check |
| Handle unavailable mapped images | `tips/tip-001-source-mapping-and-assets.md` | Fallback decisions in final report |
| `/vi/news` no 400/404 image failures | `tips/tip-002-red-gate-validation.md`, `tips/tip-005-green-gate-visual-verification.md` | Browser response assertions |
| `/vi/news/[slug]` cover images valid | `tips/tip-002-red-gate-validation.md`, `tips/tip-005-green-gate-visual-verification.md` | Browser response assertions |
| `/vi/about` local imagery only | `tips/tip-003-runtime-loaders-and-image-helper.md`, `tips/tip-005-green-gate-visual-verification.md` | Browser response assertions and screenshot |
| Build passes or blockers documented | `tips/tip-005-green-gate-visual-verification.md` | Build command evidence |
| Separate verification | `tips/tip-005-green-gate-visual-verification.md` | `code-reviewer` result in final report |
