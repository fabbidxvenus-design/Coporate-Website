'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

interface JobCardProps {
  id: string
  title: string
  company: string
  location: string
  salary?: string
  employmentType: string
  skills: string[]
  postedDays: number
  isHot?: boolean
  locale?: string
}

export function JobCard({
  id,
  title,
  company,
  location,
  salary,
  employmentType,
  skills,
  postedDays,
  isHot,
  locale: propLocale,
}: JobCardProps) {
  const params = useParams()
  const locale = propLocale || (params?.locale as string) || 'vi'

  const labels = {
    vi: {
      postedAgo: `Đăng ${postedDays} ngày trước`,
      applyNow: 'Ứng tuyển ngay',
      bookmark: 'Lưu việc làm',
    },
    ja: {
      postedAgo: `${postedDays}日前に掲載`,
      applyNow: '今すぐ応募',
      bookmark: '求人を保存',
    },
  }

  const t = labels[locale as keyof typeof labels] || labels.vi

  const locationLabels: Record<string, Record<string, string>> = {
    HN: { vi: 'Hà Nội', ja: 'ハノイ' },
    DN: { vi: 'Đà Nẵng', ja: 'ダナン' },
    HCM: { vi: 'Hồ Chí Minh', ja: 'ホーチミン' },
    JP: { vi: 'Japan', ja: 'Japan' },
  }

  const displayLocation = locationLabels[location]?.[locale as keyof typeof locationLabels[typeof location]] || location

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-lg transition-all group">
      <div className="flex flex-col md:flex-row gap-6 flex-1">
        <div className="w-16 h-16 rounded-xl bg-gray-50 flex-shrink-0 flex items-center justify-center border border-gray-100">
          <span className="material-symbols-outlined text-teal-text text-3xl" aria-hidden="true">
            work
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-text transition-colors">
              {title}
            </h3>
            {isHot && (
              <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                Hot
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-4 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-1.5">{company}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full" aria-hidden="true"></span>
            <span className="flex items-center gap-1.5">
              {t.postedAgo}
            </span>
            {salary && (
              <>
                <span className="w-1 h-1 bg-gray-300 rounded-full" aria-hidden="true"></span>
                <span className="flex items-center gap-1.5 text-teal-text font-bold">
                  {salary}
                </span>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                location_on
              </span>{' '}
              {displayLocation}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#006672]/10 text-teal-text text-xs font-semibold">
              {employmentType}
            </span>
            {skills.slice(0, 2).map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="min-w-11 min-h-11 p-3 border border-gray-200 rounded-xl text-gray-400 hover:text-teal-text hover:border-teal-text transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-text"
          aria-label={t.bookmark}
        >
          <span className="material-symbols-outlined">bookmark</span>
        </button>
        <Link
          href={`/${locale}/apply?job=${id}`}
          className="flex-1 lg:flex-none bg-[#006672] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#005560] transition-colors shadow-sm whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {t.applyNow}
        </Link>
      </div>
    </div>
  )
}