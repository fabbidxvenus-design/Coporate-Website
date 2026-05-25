'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getDictionary, Locale } from '@/lib/i18n';

export function PublicFooter() {
  const params = useParams();
  const rawLocale = params?.locale;
  const locale: Locale = rawLocale === 'ja' ? 'ja' : 'vi';
  const dict = getDictionary(locale);

  const quickLinks = [
    { href: `/${locale}/jobs`, label: dict.nav.jobs },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const socialLinks = [
    { label: 'Facebook', icon: 'fa-brands fa-facebook-f' },
    { label: 'Twitter', icon: 'fa-brands fa-twitter' },
    { label: 'Instagram', icon: 'fa-brands fa-instagram' },
    { label: 'TikTok', icon: 'fa-brands fa-tiktok' },
    { label: 'YouTube', icon: 'fa-brands fa-youtube' },
  ];

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Left Col: Branding & Info */}
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 font-bold text-4xl mb-4">
              <svg
                aria-hidden="true"
                fill="none"
                focusable="false"
                height="40"
                viewBox="0 0 32 32"
                width="40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.9803 30.6865C18.6657 32.5594 24.7865 29.4624 26.6593 23.777C28.5322 18.0916 25.4352 11.9708 19.7498 10.098C14.0644 8.22513 7.94357 11.3221 6.07073 17.0075C4.19789 22.6929 7.2949 28.8137 12.9803 30.6865Z"
                  fill="white"
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
              Fabbi
            </div>
            <p className="text-sm font-medium mb-8 text-white">
              {dict.footer.companyName}
            </p>
            <ul className="space-y-3 text-sm text-white">
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="material-symbols-outlined text-[18px] mt-1">
                  home
                </span>
                <span className="text-white">{dict.footer.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                  call
                </span>
                <span className="text-white">{dict.footer.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                  mail
                </span>
                <span className="text-white">{dict.footer.email}</span>
              </li>
            </ul>
          </div>

          {/* Right Col: Links & Social */}
          <div className="md:w-1/2 flex flex-col md:items-end">
            <div className="mb-8">
              <h2 className="text-base font-bold mb-4 text-white">{dict.footer.followUs}</h2>
              <ul className="flex gap-4" aria-label="Social media links">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <button
                      type="button"
                      aria-label={social.label}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-[#008B9C] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white text-sm"
                    >
                      <i className={social.icon} aria-hidden="true"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full max-w-[200px]">
              <h2 className="text-base font-bold mb-4 text-white">{dict.footer.quickLinks}</h2>
              <ul className="space-y-2 text-sm text-white">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-white/80 transition-colors text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-xs text-white">
          <p className="text-white">{dict.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 flex items-center gap-2 hover:text-white/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 text-white"
            aria-label={dict.footer.backToTop}
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[16px]">
              arrow_upward
            </span>{' '}
            {dict.footer.backToTop}
          </button>
        </div>
      </div>
    </footer>
  );
}