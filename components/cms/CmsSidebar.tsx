'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: 'dashboard',
    exact: true,
  },
  {
    href: '/admin/jobs',
    label: 'Quản lý Tin tuyển dụng',
    icon: 'work',
    exact: false,
  },
  {
    href: '/admin/news',
    label: 'Quản lý Tin tức',
    icon: 'article',
    exact: false,
  },
  {
    href: '/admin/applications',
    label: 'Quản lý Đơn ứng tuyển',
    icon: 'people',
    exact: false,
  },
  {
    href: '/admin/settings',
    label: 'Cài đặt',
    icon: 'settings',
    exact: false,
  },
]

interface CmsSidebarProps {
  userEmail?: string
}

export function CmsSidebar({ userEmail }: CmsSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await fetch('/api/auth/signout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="p-8 border-b border-gray-100 flex justify-center">
        <Link href="/admin" className="w-full flex justify-center">
          <Image
            src="/images/Logo-Fabbi.svg"
            alt="Fabbi Logo"
            width={220}
            height={80}
            className="h-16 w-auto object-contain"
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin</p>
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          Đăng xuất
        </button>
      </div>
    </aside>
  )
}