# SPEC: Public Mock Data Button Handling

## AC-01: Locale-aware public navigation
- Given: A user is on any `/vi/*` or `/ja/*` public route in mock mode.
- When: The user clicks header, footer, card, CTA, back, or language/navigation buttons.
- Then: The action navigates to a real route, preserves the intended locale, opens/closes UI, or shows an intentional disabled explanation.

## AC-02: Public jobs controls
- Given: Mock jobs are loaded on a localized jobs page.
- When: The user searches, filters, paginates, opens details, bookmarks/saves, or clicks apply.
- Then: Query params/state update deterministically and the UI shows filtered mock results or visible feedback.

## AC-03: Public form actions
- Given: Mock mode is enabled and Supabase credentials are absent.
- When: The user submits valid or invalid contact/application data.
- Then: Valid submissions show localized success and invalid submissions show validation without crashing or losing editable form state.
