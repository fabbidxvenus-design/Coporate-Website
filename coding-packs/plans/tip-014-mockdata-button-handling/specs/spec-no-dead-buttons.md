# SPEC: No Dead Buttons

## AC-08: No inert visible actions
- Given: Source files for public, locale, admin, component, and API surfaces.
- When: The static audit scans for dead interaction patterns.
- Then: There are no visible actions left with `href="#"`, empty click handlers, placeholder console output, or missing user-visible outcomes.

## AC-09: Intentionally disabled controls are accessible
- Given: A control is out of MVP scope in mock mode.
- When: The control is rendered.
- Then: It uses proper disabled semantics or an accessible explanation so users understand the action is unavailable.

## AC-10: Playwright screen map clicks every visible action
- Given: The app is running in default mock mode.
- When: Playwright opens each required public and CMS screen and builds a screen map from visible actionable DOM elements.
- Then: Every enabled action is clicked in isolation and must produce a valid route change, URL/query change, visible state change, validation/success feedback, modal/menu transition, or mock mutation feedback.

## AC-11: Screen map artifacts support QC review
- Given: The screen-map click audit runs.
- When: It finishes or fails.
- Then: It writes per-route JSON artifacts with element identity, accessible name, selector, bounding box, disabled state, click result, and screenshot/trace on failure.
