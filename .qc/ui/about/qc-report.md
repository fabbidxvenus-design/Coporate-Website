# UI QC Report

## Verdict

FAIL

Weighted score: 75/100

## Inputs

- HTML design: `.design/recruitment_site/ve_fabbi_fabbi_final_precision/code.html`
- JSX/TSX implementation: `app/(public)/about/page.tsx`
- Route: `/vi/about` on `http://localhost:3000`
- Breakpoints checked: `1440` only
- Browser verification: completed
- Computed style verification: completed
- Accessibility verification: completed
- Artifacts: `.qc/ui/about`

## Summary

- Desktop web route rendered successfully at `http://localhost:3000/vi/about` with no captured console errors.
- Main desktop section order mostly matches the HTML design: header, hero, stats, company story, activities, why-choose, footer.
- The largest desktop mismatch is above the fold: the design hero is 600px with a play-button overlay, while the web implementation is 400px with a centered `h1`.
- Desktop design tokens differ: reference uses Plus Jakarta Sans and `#008b9c`; implementation resolves to Manrope and darker teal/pink accents.
- Smaller CSS drift is concentrated in radius, shadows, border thickness, active/hover states, icon treatment, missing decorative layers, and a 1120px vs 1040px activity row width mismatch.
- Axe found serious color-contrast issues and one heading-order issue on the desktop web page.

## Score breakdown

| Category | Score | Notes |
|---|---:|---|
| Structure parity | 4/5 | Major desktop sections exist and are ordered, but hero content and activity controls differ. |
| Layout parity | 3/5 | Hero is 600px in design vs 400px in web; header is fixed in design vs sticky in web; vertical section positions diverge. |
| Typography parity | 3/5 | Design uses Plus Jakarta Sans; web uses Manrope. Heading sizes below hero are close. |
| Color/effect parity | 3/5 | Design teal is `#008b9c`; web uses `#006672` and pink active states. Stats card radius/shadow drift. |
| Spacing/sizing parity | 3/5 | Desktop container/stat dimensions are close, but hero height and section top positions differ substantially. |
| Responsive parity | N/A | Not evaluated; this run was desktop-only at 1440px per command. |
| Accessibility/semantics | 2/5 | Axe reports serious contrast violations and a moderate heading-order issue. |

## Hard gate results

| Gate | Result | Notes |
|---|---|---|
| Render | PASS | `/vi/about` rendered 200 on port 3000; no console errors captured. |
| Structure | WARN | Major sections present, but hero design intent differs. |
| Layout | FAIL | Desktop above-the-fold composition differs materially. |
| CSS | FAIL | Font family, primary color, active accent colors, footer color, and card effects differ. |
| Responsive | N/A | Desktop-only run. |
| Accessibility | WARN | Axe found serious `color-contrast` and moderate `heading-order` issues. |

## Critical mismatches

- [FAIL] Desktop hero section does not match the HTML design.
  - Design: `main section:first-of-type` is 600px tall and starts below fixed 80px header; it contains an image overlay with centered circular play button and no `h1`.
  - Web: first section is 400px tall and contains centered `h1` text `Về Fabbi`.
  - Location: `app/(public)/about/page.tsx:15`
  - Suggested fix: Use `h-[600px]`, replace the `h1` overlay with the centered 80px play button overlay, and keep the stats overlap aligned to the taller hero.

- [FAIL] Desktop typography token differs from design.
  - Design: body/header/main resolve to `Plus Jakarta Sans`.
  - Web: body/header/main resolve to `Manrope, system-ui, sans-serif`.
  - Location: `app/globals.css:0`
  - Suggested fix: Switch the public web font import and Tailwind font family to Plus Jakarta Sans for this design parity target.

- [FAIL] Primary brand color differs across desktop UI.
  - Design: primary teal is `rgb(0, 139, 156)` / `#008b9c`.
  - Web: footer resolves to `rgb(0, 102, 114)` and active navigation/language states use pink.
  - Location: `app/globals.css:20`, `components/public/PublicHeader.tsx:74`, `components/public/PublicFooter.tsx:28`
  - Suggested fix: Align public token `--color-primary` and active states to `#008b9c`; avoid pink where the HTML reference uses teal.

## Visual mismatches

- [WARN] Header desktop behavior/elevation differs.
  - Design: `position: fixed`, height `80px`, subtle shadow.
  - Web: `position: sticky`, height `81px`, no box shadow.
  - Location: `components/public/PublicHeader.tsx:26`
  - Suggested fix: Use fixed header and `shadow-sm`, then apply matching `main` top padding.

- [WARN] Stats card shape and shadow differ.
  - Design: `border-radius: 12px`, `box-shadow: rgba(0,0,0,0.05) 0px 4px 20px 0px`.
  - Web: `border-radius: 24px`, Tailwind `shadow-lg`-style elevation.
  - Location: `app/(public)/about/page.tsx:28`
  - Suggested fix: Match `rounded-xl`/12px and `shadow-[0_4px_20px_rgba(0,0,0,0.05)]`.

- [WARN] Activity desktop content misses carousel controls.
  - Design: activity card includes pagination dots and previous/next circular controls below the image.
  - Web: `ActivityTabs` renders sidebar, content title/description/image only.
  - Location: `components/about/ActivityTabs.tsx:36`
  - Suggested fix: Add the dots and arrow control row matching the HTML reference.

- [WARN] Why-choose decorative layer is missing.
  - Design: has low-opacity dashed circular SVG pattern at bottom-left.
  - Web: background color matches but decorative SVG layer is absent.
  - Location: `app/(public)/about/page.tsx:94`
  - Suggested fix: Add the decorative SVG layer behind the section content.

## Computed CSS mismatches

| Breakpoint | Section/Element | Property | Design | Web | Severity | Location |
|---:|---|---|---:|---:|---|---|
| 1440 | Header | position | fixed | sticky | WARN | `components/public/PublicHeader.tsx:26` |
| 1440 | Header | box-shadow | `rgba(0,0,0,.05) 0px 1px 2px` | none | WARN | `components/public/PublicHeader.tsx:26` |
| 1440 | Main | padding-top | 80px | 0px | WARN | layout wrapper / public layout |
| 1440 | Hero | height | 600px | 400px | FAIL | `app/(public)/about/page.tsx:15` |
| 1440 | Hero title | existence | none | `h1`, 48px | FAIL | `app/(public)/about/page.tsx:22` |
| 1440 | Stats card | border-radius | 12px | 24px | WARN | `app/(public)/about/page.tsx:28` |
| 1440 | Stats card | box-shadow | `0 4px 20px rgba(0,0,0,.05)` | stronger Tailwind shadow | WARN | `app/(public)/about/page.tsx:28` |
| 1440 | Footer | background-color | `rgb(0, 139, 156)` | `rgb(0, 102, 114)` | FAIL | `components/public/PublicFooter.tsx:28` |

## CSS/token mismatches

| Section/Element | Property | Design | Web | Location |
|---|---|---:|---:|---|
| Body/header/main | font-family | Plus Jakarta Sans | Manrope | `app/globals.css:0` |
| Brand teal | primary color | `#008b9c` | `#006672` | `app/globals.css:20` |
| Header active nav | active color | teal | pink | `components/public/PublicHeader.tsx:74` |
| Header active nav | underline treatment | `border-b-2 border-[#008B9C]` | pseudo underline `h-0.5 bg-pink` | `components/public/PublicHeader.tsx:80` |
| Header container | elevation | subtle shadow | no shadow, border-bottom treatment | `components/public/PublicHeader.tsx:26` |
| Language switcher | wrapper shape | `rounded-full` | `rounded-lg` | `components/public/PublicHeader.tsx:93` |
| Language switcher | active button shape/color | rounded-full teal active | rounded-md white/pink active | `components/public/PublicHeader.tsx:97` |
| Stats card | border-radius | 12px | 24px | `app/(public)/about/page.tsx:28` |
| Stats card | shadow | `0 4px 20px rgba(0,0,0,.05)` | stronger Tailwind shadow | `app/(public)/about/page.tsx:28` |
| CTA button | border width/color | `border border-brand-teal` | `border-2 border-teal-text` | `app/(public)/about/page.tsx:69` |
| Activity active tab | icon background | teal square with white icon | no active square background | `components/about/ActivityTabs.tsx:30` |
| Activity content row | desktop width | 1120px | 1040px | `components/about/ActivityTabs.tsx:17`, `app/(public)/about/page.tsx:82` |
| Activity content card | footer controls | dots + previous/next buttons | missing | `components/about/ActivityTabs.tsx:36` |
| Accordion active header | background color | teal | pink | `components/about/WhyChooseAccordion.tsx:23` |
| Accordion active item | border/shadow | gray border + shadow-sm | pink-tinted border + shadow-md | `components/about/WhyChooseAccordion.tsx:17` |
| Why-choose background | decorative SVG | dashed low-opacity circle | missing | `app/(public)/about/page.tsx:94` |
| Footer | background | `#008b9c` | `#006672` | `components/public/PublicFooter.tsx:28` |
| Footer icons | icon style | Font Awesome icons | Material Symbols text icons | `components/public/PublicFooter.tsx:63` |
| Footer social hover | hover color/background | white/alpha treatment | pink hover | `components/public/PublicFooter.tsx:93` |
| Footer quick links | hover color | white | pink | `components/public/PublicFooter.tsx:108` |
| Footer back-to-top | hover color | white | pink | `components/public/PublicFooter.tsx:127` |

## Structure comparison

| Design section | Implementation status | Notes |
|---|---|---|
| Header | Partial | Same broad elements, but fixed/shadow/active colors/language styling differ. |
| Hero | Partial | Image overlay exists, but height and center content differ. |
| Statistics | Match | Same four stats and desktop width/height; radius/elevation drift. |
| About company | Match | Same two-column desktop pattern. |
| Activities | Partial | Tabs/content match; carousel dots/arrows missing. |
| Why choose | Partial | Accordion/chat bubbles match; decorative SVG and active color differ. |
| Footer | Partial | Structure similar; color and icon treatment differ. |

## Responsive findings

| Breakpoint | Verdict | Findings |
|---:|---|---|
| 1440 | FAIL | Desktop page renders, but hero, typography, color tokens, and several effects do not match the HTML reference. |

## Browser/screenshot findings

- Desktop screenshots generated:
  - `.qc/ui/about/screenshots/design-1440.png`
  - `.qc/ui/about/screenshots/web-1440.png`
- Browser route used: `http://localhost:3000/vi/about`
- Captured console errors: none
- Horizontal overflow at 1440: none

## Accessibility/semantic findings

- [WARN] Axe `color-contrast` serious violations on active nav/language control/chat bubble-related targets.
- [WARN] Axe `heading-order` moderate violation: stats values are rendered as heading elements before the main content heading sequence.

## Artifacts generated

- `.qc/ui/about/qc-report.md`
- `.qc/ui/about/computed-style-diff.json`
- `.qc/ui/about/a11y-results.json`
- `.qc/ui/about/screenshots/design-1440.png`
- `.qc/ui/about/screenshots/web-1440.png`

## Recommended patch plan

1. Fix desktop hero first: 600px height, play button overlay, and matching stats overlap.
2. Align global public web tokens to the HTML design: Plus Jakarta Sans and `#008b9c`.
3. Align header/footer desktop styling: fixed header with shadow, teal active states, rounded-full language switcher, footer teal, and reference hover/icon treatments.
4. Normalize small CSS details: stats card radius/shadow, CTA border width, accordion active border/shadow/color, activity active icon background, and activity row width.
5. Add missing desktop activity controls and why-choose decorative SVG.
6. Re-run desktop-only QC at `--breakpoints 1440` after fixes.
