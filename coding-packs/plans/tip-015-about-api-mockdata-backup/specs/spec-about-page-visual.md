# SPEC: About Page Visual + Behavior

## AC-08: Vietnamese page render
- Given the app runs in mock/fresh-checkout mode
- When `/vi/about` is opened
- Then the page renders complete Vietnamese About content with no console/page errors.

## AC-09: Japanese page render
- Given the app runs in mock/fresh-checkout mode
- When `/ja/about` is opened
- Then the page renders complete Japanese About content with no console/page errors.

## AC-10: Visual preservation
- Given the About page is refactored to typed content
- When screenshots are captured for `/vi/about` and `/ja/about`
- Then section order, spacing, colors, and visual hierarchy remain aligned with the current About page.

## AC-11: Deterministic controls
- Given visible activity/highlight controls on the About page
- When a user clicks them
- Then the UI changes deterministically or the controls are rendered with non-interactive accessible semantics.
