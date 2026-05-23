import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import type { CookieOptions } from '@supabase/ssr'
import type { Database } from '@/types/database'

export async function POST() {
  const cookieStore = await cookies()

  try {
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Server Component context
            }
          },
        },
      }
    )

    await supabase.auth.signOut()
  } catch (error) {
    console.error('[Auth] Signout failed:', error)
  }

  redirect('/login')
}