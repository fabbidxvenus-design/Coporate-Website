# SPEC: Admin Mock Data Button Handling

## AC-04: Admin navigation and dashboard actions
- Given: Mock mode is enabled and an admin fixture/session is available.
- When: The admin uses sidebar, dashboard cards, logout, and section action links.
- Then: Each action navigates, updates UI state, or shows a visible intentional disabled explanation without weakening production auth.

## AC-05: Admin mutation controls
- Given: Mock jobs, news, applications, and settings are loaded.
- When: The admin clicks create, edit, delete, status, save, publish, reset, CV, filter, search, or pagination buttons.
- Then: Each action mutates mock UI state with visible feedback or is intentionally disabled with an accessible explanation.
