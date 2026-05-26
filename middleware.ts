import { NextResponse, type NextRequest } from 'next/server'
import { locales, defaultLocale } from './lib/i18n'

const adminPaths = ['/admin']
const authPaths = ['/login']
const publicPaths = ['/', '/jobs', '/news', '/about', '/apply']

function getLocale(request: NextRequest): string {
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
  if (pathnameIsMissingLocale) return defaultLocale
  return pathname.split('/')[1]
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Locale redirection
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
  const isAuthRootPath = pathname === '/login' || pathname === '/admin' || pathname.startsWith('/admin/')
  const isAdminPath = pathname.startsWith('/admin')

  if (pathnameIsMissingLocale && !isAuthRootPath) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }

  let response = NextResponse.next({ request: { headers: request.headers } })

  const pathWithoutLocale = pathname.replace(new RegExp(`^/(${locales.join('|')})`), '') || '/'
  const isAuthPath = authPaths.includes(pathWithoutLocale)
  const isPublicPath = publicPaths.some((p) => pathWithoutLocale === p || pathWithoutLocale === `${p}/`)

  if (isPublicPath || isAuthPath) return response

  // Auth check: require admin_session cookie for admin paths
  // Session verification against SQLite happens in page components (Node.js runtime)
  const sessionToken = request.cookies.get('admin_session')?.value

  if (!sessionToken && isAdminPath) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (sessionToken && isAuthPath) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|public|api/).*)'],
}