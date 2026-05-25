import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { authRepository } from '@/lib/db/repositories/admin-auth'

export async function POST() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('admin_session')?.value

  try {
    if (sessionToken) {
      await authRepository.deleteSession(sessionToken)
    }
  } catch (error) {
    console.error('[Auth] Signout failed:', error)
  }

  cookieStore.delete('admin_session')
  redirect('/login')
}
