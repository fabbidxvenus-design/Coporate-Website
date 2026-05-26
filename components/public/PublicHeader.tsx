'use client'

import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { getDictionary, Locale } from '@/lib/i18n'

export function PublicHeader() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const locale = (params?.locale as Locale) || 'vi'
  const dict = getDictionary(locale === ('undefined' as any) ? 'vi' : locale)

  const navItems = [
    { href: '/', label: dict?.nav?.home || 'Trang chủ' },
    { href: '/jobs', label: dict?.nav?.jobs || 'Tuyển dụng' },
    { href: '/about', label: dict?.nav?.about || 'Về Fabbi' },
    { href: '/news', label: dict?.nav?.news || 'Tin tức' },
    { href: '/jobs?apply=true', label: dict?.nav?.apply || (locale === 'vi' ? 'Ứng tuyển' : '応募') },
  ]

  const switchLocale = (newLocale: Locale) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPathname)
  }
  return (
    <header className="bg-white border-b border-gray-100 fixed top-0 left-0 w-full z-50 h-20 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded focus:outline-2 focus:outline-offset-2 focus:outline-primary"
      >
        Skip to main content
      </a>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center shrink-0">
            <img src="/images/Logo-Fabbi.svg" alt="Fabbi" className="h-[3.75rem] w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => {
              const fullHref = `/${locale}${item.href === '/' ? '' : item.href}`
              const activeHref = item.href.split('?')[0]
              const fullActiveHref = `/${locale}${activeHref === '/' ? '' : activeHref}`
              const isModalTrigger = item.href.includes('?')
              const isActive = !isModalTrigger && (
                activeHref === '/'
                  ? pathname === fullActiveHref || pathname === `${fullActiveHref}/`
                  : pathname.startsWith(fullActiveHref)
              )

              return (
                <Link
                  key={item.href}
                  href={fullHref}
                  className={`relative pb-1 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-text group ${
                    isActive ? 'text-teal-text' : 'text-gray-600 hover:text-teal-text'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-200 origin-left bg-teal-text ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-full border border-gray-100">
              <button
                type="button"
                onClick={() => switchLocale('vi')}
                className={`px-3 py-1.5 rounded-full text-sm font-bold shadow-sm transition-colors ${
                  locale === 'vi' ? 'bg-white text-[#008B9C]' : 'text-gray-500 hover:text-[#008B9C]'
                }`}
              >
                VN
              </button>
              <button
                type="button"
                onClick={() => switchLocale('ja')}
                className={`px-3 py-1.5 rounded-full text-sm font-bold shadow-sm transition-colors ${
                  locale === 'ja' ? 'bg-white text-[#008B9C]' : 'text-gray-500 hover:text-[#008B9C]'
                }`}
              >
                JP
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}