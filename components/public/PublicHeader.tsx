'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { getDictionary, Locale } from '@/lib/i18n'

export function PublicHeader() {
  const params = useParams()
  const pathname = usePathname()
  const locale = (params.locale as Locale) || 'vi'
  const dict = getDictionary(locale)

  const navItems = [
    { href: '/', label: dict.nav.home },
    { href: '/jobs', label: dict.nav.jobs },
    { href: '/about', label: dict.nav.about },
    { href: '/news', label: dict.nav.news },
    { href: '/contact', label: dict.nav.contact },
  ]

  const switchLocale = (newLocale: Locale) => {
    return pathname.replace(`/${locale}`, `/${newLocale}`)
  }
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#008b9c] focus:text-white focus:rounded focus:outline-2 focus:outline-offset-2 focus:outline-[#008b9c]"
      >
        Skip to main content
      </a>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <svg
              fill="none"
              height="32"
              viewBox="0 0 32 32"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9803 30.6865C18.6657 32.5594 24.7865 29.4624 26.6593 23.777C28.5322 18.0916 25.4352 11.9708 19.7498 10.098C14.0644 8.22513 7.94357 11.3221 6.07073 17.0075C4.19789 22.6929 7.2949 28.8137 12.9803 30.6865Z"
                fill="#008b9c"
              />
              <path
                d="M10.7486 9.87329C13.2052 10.6823 15.8492 9.34444 16.6582 6.88785C17.4673 4.43126 16.1294 1.78726 13.6728 0.978233C11.2162 0.169207 8.5722 1.50707 7.76317 3.96366C6.95415 6.42025 8.292 9.06426 10.7486 9.87329Z"
                fill="#F47F35"
              />
              <path
                d="M2.37895 19.9888C3.89675 20.4886 5.5303 19.662 6.03009 18.1442C6.52989 16.6264 5.70327 14.9929 4.18546 14.4931C2.66766 13.9933 1.03411 14.8199 0.534313 16.3377C0.0345163 17.8555 0.861139 19.489 2.37895 19.9888Z"
                fill="#F47F35"
              />
            </svg>
            <span className="text-2xl font-bold text-[#008b9c]">Fabbi</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href === '/' ? '' : item.href}`}
                className="text-gray-600 font-medium hover:text-[#008b9c] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008b9c]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-100">
              <Link
                href={switchLocale('vi')}
                className={`px-3 py-1.5 rounded-md text-sm font-bold shadow-sm transition-colors ${
                  locale === 'vi' ? 'bg-white text-[#008b9c]' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                VN
              </Link>
              <Link
                href={switchLocale('ja')}
                className={`px-3 py-1.5 rounded-md text-sm font-bold shadow-sm transition-colors ${
                  locale === 'ja' ? 'bg-white text-[#008b9c]' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                JP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}