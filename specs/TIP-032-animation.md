# SPEC: TIP-032 Smooth Page Transition Animation

## AC-01: Page Transition Wrapper Presence
- Given: A user is on any public localized route under `app/[locale]`
- When: The page renders
- Then: A transition wrapper component or class must be present around the `main` content to enable smooth entry/exit animations.

## AC-02: Modal Animation Polish
- Given: The Application or Contact modal is open
- When: The modal state changes (opening or closing)
- Then: The modal overlay and container must use opacity/transform transitions without changing the underlying form layout or field CSS.

## AC-03: Reduced Motion Compliance
- Given: `prefers-reduced-motion: reduce` is enabled in the browser
- When: A page navigation or modal open/close occurs
- Then: All movement animations (translateY) must be disabled or near-instant, falling back to a simple opacity change or instant visibility.

## AC-04: Item CSS/Layout Preservation
- Given: The page transition is active or completed
- When: Job cards, news cards, or list items are rendered
- Then: Their original Tailwind classes, padding, margin, dimensions, colors, and responsive layout must remain visually identical to the pre-animation design.

## AC-05: Desktop/Mobile Visual Stability
- Given: Desktop (1440px) or Mobile (375px) viewport
- When: Navigating between routes
- Then: No horizontal overflow or animation-induced layout shift (jumps) occurs in the header, footer, or item components.
