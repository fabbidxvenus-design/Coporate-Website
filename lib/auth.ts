import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Database } from '@/types/database'

interface AuthUser {
  id: string
  email: string
  role: string
  displayName: string | null
}

/**
 * Get current user from session (server-side)
 * Returns null if not authenticated
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return null
    }

    // Get profile to check role
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single<{ role: string; display_name: string | null }>()

    if (!profile) {
      return null
    }

    return {
      id: user.id,
      email: user.email!,
      role: profile.role,
      displayName: profile.display_name,
    }
  } catch (error) {
    console.error('[Auth] getCurrentUser failed:', error)
    return null
  }
}

/**
 * Require admin authentication - redirects to login if not authenticated
 */
export async function requireAdmin() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  if (user.role !== 'admin') {
    redirect('/login?error=unauthorized')
  }

  return user
}

/**
 * Check if user is admin (non-throwing)
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user ? user.role === 'admin' : false
}

/**
 * Get session for client components
 */
export async function getSession(): Promise<import('@supabase/supabase-js').Session | null> {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
        },
      }
    )

    const {
      data: { session },
    } = await supabase.auth.getSession()

    return session
  } catch (error) {
    console.error('[Auth] getSession failed:', error)
    return null
  }
}

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>