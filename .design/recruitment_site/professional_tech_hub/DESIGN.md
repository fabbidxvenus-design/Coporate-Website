---
name: Professional Tech Hub
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#3e494b'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#6e797c'
  outline-variant: '#bdc9cb'
  surface-tint: '#006875'
  primary: '#006672'
  on-primary: '#ffffff'
  primary-container: '#008190'
  on-primary-container: '#f8feff'
  inverse-primary: '#6fd5e7'
  secondary: '#576061'
  on-secondary: '#ffffff'
  secondary-container: '#d8e1e2'
  on-secondary-container: '#5b6465'
  tertiary: '#8b4c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#af6100'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9eefff'
  primary-fixed-dim: '#6fd5e7'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004e59'
  secondary-fixed: '#dbe4e5'
  secondary-fixed-dim: '#bfc8c9'
  on-secondary-fixed: '#151d1e'
  on-secondary-fixed-variant: '#404849'
  tertiary-fixed: '#ffdcc2'
  tertiary-fixed-dim: '#ffb77a'
  on-tertiary-fixed: '#2e1500'
  on-tertiary-fixed-variant: '#6d3a00'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 64px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The design system embodies a **Modern Corporate** aesthetic tailored for recruitment in the technology sector. It balances professional reliability with a clean, approachable digital experience. The interface is characterized by high legibility, structured information density, and a refreshing teal-centric palette that distinguishes it from traditional blue-heavy enterprise software.

The emotional response should be one of **trust, clarity, and opportunity**. The UI utilizes generous whitespace and a logical hierarchy to guide candidates through job listings and application processes without friction. Visual elements are refined and functional, avoiding unnecessary decoration in favor of a systematic approach that prioritizes content.

## Colors

The color strategy is anchored by a vibrant **Teal (#008B9C)**, used for primary actions, navigation highlights, and brand reinforcement. This is supported by a palette of functional neutrals and specific semantic accents:

- **Primary:** Teal (#008B9C) - Used for buttons, active states, and footer backgrounds.
- **Secondary/Light:** A soft teal tint (#F0F9FA) used for background sections and tag containers.
- **Surface Neutrals:** Use #F8F9FA for secondary background areas to provide subtle contrast against the white content cards.
- **Text:** Dark Gray (#333333) for primary body text and headlines to ensure high readability; lighter gray (#666666) for meta-information like timestamps and secondary labels.
- **Accents:** Occasional use of warm accents (like the orange notification bell or specific status chips) to break the cool color profile.

## Typography

The design system utilizes **Manrope** across all levels for its modern, geometric construction and exceptional legibility. 

- **Headlines:** Use Bold (700) or Semi-Bold (600) weights. Primary page titles should be high-contrast against the background.
- **Body Text:** Standard body text uses the Regular (400) weight with a comfortable 1.5x line-height to facilitate long-form reading in job descriptions.
- **Metadata:** Use `body-sm` or `label-sm` for details like "posted 2 days ago" or tag text, typically in a lighter gray shade to maintain hierarchy.
- **Scale:** Maintain a clear vertical rhythm. Mobile font sizes are scaled down slightly for primary headers to prevent excessive line wrapping.

## Layout & Spacing

This design system follows a **Fixed Grid** philosophy for desktop, centering content within a 1200px max-width container to maintain focus and readability.

- **Grid:** A 12-column system is used for complex layouts (like the job detail page with sidebar).
- **Vertical Spacing:** Significant breathing room between sections (64px+) helps distinguish between different content types (e.g., job info vs. related jobs).
- **Component Spacing:** Inside cards and forms, use a base-8 spacing scale. 16px is the standard padding for cards, while 24px is used for larger modal padding.
- **Responsive Behavior:** On mobile, margins shrink to 16px and multi-column layouts (like sidebars) stack vertically.

## Elevation & Depth

Hierarchy is established primarily through **Tonal Layers** and **Low-Contrast Outlines**, rather than heavy shadows.

- **Flat Surface:** The primary background is white or very light gray.
- **Cards:** Content containers use a subtle 1px border (#E0E0E0) or a very soft, diffused ambient shadow (blur: 15px, opacity: 0.05, color: neutral) to lift them from the background.
- **Modals:** Use a higher elevation with a darker backdrop overlay (60% opacity black) to isolate the interaction.
- **Interactive States:** Subtle depth changes (slight darkening of the teal primary) indicate hover states on buttons.

## Shapes

The design system employs a **Rounded** corner strategy to soften the corporate feel and make the interface more approachable.

- **Buttons & Inputs:** Use a standard 8px (0.5rem) radius.
- **Cards & Modals:** Use a larger 16px (1rem) radius for significant containers.
- **Tags/Chips:** Often utilize a pill-shape (full radius) to distinguish them from interactive buttons or input fields.
- **Images:** Featured images and thumbnails should consistently use a 12px or 16px radius.

## Components

### Buttons
- **Primary:** Solid Teal (#008B9C) with white text. 8px border radius.
- **Secondary:** Outline Teal with Teal text, or Ghost style for less prominent actions.
- **Icon Buttons:** Use within input fields or as standalone actions (like the "Save Job" bookmark).

### Job Cards
- White background with a subtle border.
- Left-aligned company/job icon.
- Clear title in Semi-Bold typography.
- Metadata (location, salary, time) arranged in a flexible row/grid using `body-sm`.
- Primary "View Details" button positioned consistently on the right or bottom-right.

### Input Fields & Forms
- **Labels:** Positioned above the input, using `label-md`.
- **Inputs:** White background, 1px light gray border, 8px radius.
- **Placeholder:** Light gray text (#999999).
- **Focus State:** Border changes to Primary Teal with a subtle outer glow.

### Chips & Tags
- Used for skills and job categories.
- Light gray or light teal background with centered text.
- Fully rounded (pill) shape.

### Navigation
- Top-bar navigation with a clean white background.
- Active links indicated by an underline or color change to Teal.
- Language switcher (JP/VN) as a segmented control in the top-right.