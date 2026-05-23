# Design Tokens

## Rule
Use `.design/**/professional_tech_hub/DESIGN.md`, `.design/**/code.html`, and `.design/**/screen.png` as the source of truth for colors, typography, radius, spacing, layout rhythm, and component appearance.

## Visual Fidelity Priority
- Keep original component colors, item layout, spacing rhythm, card/button/input shapes, and responsive stacking before introducing abstractions.
- When tokens and implementation convenience conflict with screenshot/HTML fidelity, match the screenshot/HTML first and centralize the resulting value as a token.

## Apply
- Primary action color: teal family (`#006672` / `#008190`, with design copy calling out `#008B9C`).
- Typography: standardize on Manrope unless RRI explicitly approves a second font.
- Layout: 1200px desktop container, 24px gutter, 16px mobile margin, 64px section gap.
- Radius: 8px for buttons/inputs, 16px for cards/modals, pill radius for chips.

## Why
Both recruitment and CMS design docs share the same Professional Tech Hub tokens, so implementation should centralize them instead of copying per screen.

## Exceptions
Use semantic error/success/status colors for CMS state chips and validation, but keep them mapped as named tokens.
