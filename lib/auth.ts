import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { authRepository } from './db/repositories/admin-auth'

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
    const sessionToken = cookieStore.get('admin_session')?.value

    if (!sessionToken) {
      return null
    }

    const session = await authRepository.getSession(sessionToken)
    if (!session) {
      return null
    }

    return {
      id: session.user_id,
      email: 'admin@fabbi.com',
      role: 'admin',
      displayName: 'Administrator',
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
 * Get session for compatibility
 */
export async function getSession() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('admin_session')?.value

  if (!sessionToken) return null

  return authRepository.getSession(sessionToken)
}

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>