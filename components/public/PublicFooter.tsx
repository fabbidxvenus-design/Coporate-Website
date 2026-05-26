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
    { href: `/${locale}/apply`, label: dict.apply.title },
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
            <div className="mb-4">
              <img src="/images/Logo-Fabbi-White.svg" alt="Fabbi" className="h-12 w-auto" />
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