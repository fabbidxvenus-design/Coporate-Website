# SPEC: TIP-016 Production-Like Mock Data Package

## AC-01: Required JSON files exist and parse
- Given: the TIP-016 processed directory is expected at `coding-packs/crawlings/processed`
- When: the artifact validator loads each required JSON file
- Then: every required JSON file exists and parses successfully

## AC-02: Referenced image paths are local and valid
- Given: processed JSON contains image references or media manifest entries
- When: each referenced path is inspected
- Then: every image path is relative, has no remote URL scheme, and exists under `coding-packs/crawlings/images/`

## AC-03: Slugs are production-safe and unique
- Given: news, portfolio, and job collections contain slugs
- When: the validator checks each collection
- Then: every slug is lowercase URL-safe and unique within that collection

## AC-04: Processed content contains no placeholder artifacts
- Given: processed JSON and Markdown docs are created
- When: their text content is scanned
- Then: no lorem ipsum, TODO, TBD, placeholder copy, remote image URLs, or generic filler markers remain

## AC-05: Seed package maps to future Supabase collections
- Given: `mock-seed.json` is loaded
- When: its top-level structure is inspected
- Then: it contains `siteSettings`, `aboutContent`, `jobs`, `newsArticles`, `portfolioItems`, and `mediaAssets` with required field completeness

## AC-06: Japanese draft translations are explicitly flagged
- Given: Japanese content includes items translated from Vietnamese-only sources
- When: validator detects items without direct JA source evidence
- Then: those items include `translationStatus: "machine_draft_needs_review"`

## AC-07: Source and implementation docs exist
- Given: a builder needs to understand source traceability and app wiring
- When: `CONTENT-SOURCE-MAP.md` and `MOCK-DATA-GUIDE.md` are opened
- Then: they explain source evidence, synthetic recruitment data boundaries, image selection, and mapping to current/future data models
