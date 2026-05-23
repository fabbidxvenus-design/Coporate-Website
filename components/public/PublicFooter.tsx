'use client'

import Link from 'next/link'

const quickLinks = [
  { href: '/jobs', label: 'Tuyển dụng' },
  { href: '/about', label: 'Về Fabbi' },
  { href: '/news', label: 'Tin tức' },
  { href: '/apply', label: 'Ứng tuyển' },
]

const socialLinks = [
  { href: '#', icon: 'fa-facebook-f', label: 'Facebook' },
  { href: '#', icon: 'fa-twitter', label: 'Twitter' },
  { href: '#', icon: 'fa-instagram', label: 'Instagram' },
  { href: '#', icon: 'fa-tiktok', label: 'TikTok' },
  { href: '#', icon: 'fa-youtube', label: 'YouTube' },
]

export function PublicFooter() {
  return (
    <footer className="bg-[#008B9C] text-white pt-16 pb-8">
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
            <p className="text-sm font-medium mb-8">
              CÔNG TY CỔ PHẦN NGHIÊN CỨU VÀ PHÁT TRIỂN FABBI
            </p>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[18px] mt-1" aria-hidden="true">
                  home
                </span>
                <span>Địa chỉ: 107 Nguyễn Phong Sắc - Hai Bà Trưng - Hà Nội</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">call</span>
                <span>Điện thoại: 0123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">mail</span>
                <span>Email: Hr@fabbi.com.vn</span>
              </li>
            </ul>
          </div>

          {/* Right Col: Links & Social */}
          <div className="md:w-1/2 flex flex-col md:items-end">
            <div className="mb-8">
              <h4 className="text-base font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.icon}
                    href={social.href}
                    aria-label={social.label}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <i className={`fa-brands ${social.icon} text-sm`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div className="w-full max-w-[200px]">
              <h4 className="text-base font-bold mb-4">Quick link</h4>
              <ul className="space-y-2 text-sm text-white/80">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors"
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
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-xs text-white/80">
          <p>© 2024 Fabbi. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-4 md:mt-0 flex items-center gap-2 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <span className="material-symbols-outlined text-[16px]">
              arrow_upward
            </span>{' '}
            Back to top
          </button>
        </div>
      </div>
    </footer>
  )
}