import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import type { CookieOptions } from '@supabase/ssr'
import type { Database } from '@/types/database'

const locales = ['vi', 'ja']
const defaultLocale = 'vi'

/**
 * Paths that require admin authentication (must match prefix)
 */
const adminPaths = ['/admin']

/**
 * Paths that should never be accessed by authenticated admins
 */
const authPaths = ['/login']

/**
 * Public paths that should not be affected by auth middleware
 */
const publicPaths = ['/', '/jobs', '/news', '/about', '/apply', '/contact']

function getLocale(request: NextRequest): string {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    return defaultLocale
  }
  return pathname.split('/')[1]
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Locale redirection
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }

  // Create response to allow modifications
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Strip locale for auth path matching
  const pathWithoutLocale = pathname.replace(new RegExp(`^/(${locales.join('|')})`), '') || '/'

  // Check if path requires admin authentication (ensure prefix match)
  const isAdminPath = adminPaths.some((path) => pathWithoutLocale.startsWith(path)) || pathWithoutLocale.startsWith('/admin/');
  const isAuthPath = authPaths.includes(pathWithoutLocale)
  const isPublicPath = publicPaths.some((path) => pathWithoutLocale === path || pathWithoutLocale === `${path}/`)

  // Skip auth check for public and auth paths
  if (isPublicPath || isAuthPath) {
    return response
  }

  try {
    // Create Supabase client for session verification
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value)
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    // Verify session
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user && isAdminPath) {
      // Redirect to login for admin paths
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (user && isAuthPath) {
      // Redirect to admin if already logged in
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    // Check admin role for admin paths
    if (user && isAdminPath) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single<{ role: string }>()

      if (!profile || profile.role !== 'admin') {
        // Not an admin, redirect to login with error
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('error', 'unauthorized')
        return NextResponse.redirect(loginUrl)
      }
    }

    return response
  } catch (error) {
    console.error('[Auth] Session verification failed:', error)
    // On error, allow request to proceed (fail-open for public routes)
    // But block admin routes
    if (isAdminPath) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes that don't need auth
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api/).*)',
  ],
}