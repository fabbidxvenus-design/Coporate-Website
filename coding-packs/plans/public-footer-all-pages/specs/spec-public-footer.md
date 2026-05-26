# SPEC: Public Footer Behavioral Validation

## AC-01: Shared Layout Mounting
- Given: A user visits any public route (e.g. `/`, `/about`, `/jobs`)
- When: The page renders
- Then: Exactly one `<footer>` element is present in the DOM
- And: The footer contains the brand wordmark "Fabbi"

## AC-02: Localized Layout Support
- Given: A user visits a localized public route (e.g. `/vi`, `/vi/about`)
- When: The page renders
- Then: Exactly one `<footer>` element is present in the DOM
- And: The `<html>` or wrapper div correctly identifies the locale while preserving footer presence

## AC-03: Internal Link Integrity
- Given: The footer is rendered
- When: A user clicks "Tuyển dụng"
- Then: The browser navigates to `/jobs` (not `#`)
- When: A user clicks "Về Fabbi"
- Then: The browser navigates to `/about`

## AC-04: Social Button Non-Navigation
- Given: The footer is rendered
- When: A user inspects social media "buttons" (Facebook, Twitter, etc.)
- Then: They are `type="button"` or accessible buttons
- And: They do NOT use `href="#"` for placeholder navigation

## AC-05: Back to Top Functionality
- Given: The page is scrolled down
- When: A user clicks "Back to top"
- Then: The viewport scrolls to the top (`y: 0`)
- And: No inline `onclick` attribute is used in the HTML markup

## AC-06: Responsive No-Overflow
- Given: Viewport width is 375px (mobile)
- When: Footer renders
- Then: No horizontal scrollbar is present
- And: Content stacks vertically as per design parity
