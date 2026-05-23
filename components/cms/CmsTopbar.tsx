'use client'

import Link from 'next/link'

interface CmsTopbarProps {
  title: string
  breadcrumbs?: { label: string; href?: string }[]
  actions?: React.ReactNode
}

export function CmsTopbar({ title, breadcrumbs, actions }: CmsTopbarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm mb-1">
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-2">
                {idx > 0 && (
                  <span className="text-gray-400">/</span>
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-gray-500 hover:text-[#008b9c]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  )
}