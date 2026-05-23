import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'
import type { CookieOptions } from '@supabase/ssr'

// Flag to use mock data instead of Supabase (for development without Supabase credentials)
export const USE_MOCK_DATA = process.env.USE_MOCK_DATA === 'true'

/**
 * Server client for server-side operations (RSC, Server Actions)
 * Returns null if USE_MOCK_DATA=true or credentials are missing
 */
export async function createClient() {
  // Skip Supabase client if using mock data
  if (USE_MOCK_DATA) {
    return null
  }

  // Validate required environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey || supabaseUrl === 'https://your-project-id.supabase.co') {
    console.warn('[Supabase] Missing or placeholder credentials. Set USE_MOCK_DATA=true for development.')
    return null
  }

  const cookieStore = await cookies()

  return createServerClient<Database>(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  )
}