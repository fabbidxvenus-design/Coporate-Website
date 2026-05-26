# TIP-001: Source mapping and asset inventory

## HEADER
- TIP-ID: TIP-001
- Project: Coporate_Website
- Module: Source mapping and asset inventory
- Priority: P0
- Depends on: none
- Estimated: S

## CONTEXT
- Working dir: D:\WORKSPACE\CODE\Coporate_Website
- Tech stack: Next.js, TypeScript, Tailwind
- Key files to read: 
  - `coding-packs/crawlings/content_image_mapping.json`
  - `coding-packs/crawlings/crawled_raw_data.json`

## APPLICABLE STANDARDS
- domain/recruitment-content

## TASK
1. Parse `content_image_mapping.json` and group images by source page URL.
2. Parse `crawled_raw_data.json` for factual content.
3. Validate and map media files from `coding-packs/crawlings/images/` to `public/images/`.

## ACCEPTANCE CRITERIA
- Mapping object created.
- Assets synced to `public/images/`.
