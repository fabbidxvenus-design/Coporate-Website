# SPEC: Default Mock Mode

## AC-06: Fresh checkout defaults to mock data
- Given: Supabase env vars are missing or placeholders.
- When: The app renders public pages or form APIs are called.
- Then: Mock data and mock success/error behavior are used instead of crashing.

## AC-07: Supabase mode remains available
- Given: Valid Supabase env vars exist and mock mode is explicitly disabled.
- When: The same pages/APIs run.
- Then: Supabase-backed behavior remains available with the same button UX contracts.
