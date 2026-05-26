'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { formatSalary } from '@/lib/utils'

interface JobCardProps {
  id: string
  slug: string
  title: string
  company: string
  location: string
  salary?: string
  employmentType?: string
  skills?: string[]
  postedDays?: number
  locale: string
}

export function JobCard({
  id,
  slug,
  title,
  company,
  location,
  salary,
  employmentType,
  skills = [],
  postedDays = 0,
  locale,
}: JobCardProps) {
  const displayLocation = location === 'HN' ? 'Hà Nội' :
    location === 'HCM' ? 'Hồ Chí Minh' :
      location === 'DN' ? 'Đà Nẵng' :
        location === 'JP' ? 'Japan' : location

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow group relative">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <i className="fa-solid fa-briefcase text-xl text-[#008B9C]" aria-hidden="true"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#008B9C] transition-colors">
              <Link href={`/${locale}/jobs/${slug}`}>
                {title}
              </Link>
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <i className="fa-regular fa-calendar w-4 h-4" aria-hidden="true"></i>
                {postedDays === 0 ? (locale === 'vi' ? 'Mới đăng' : '新規投稿') : `${postedDays} ${locale === 'vi' ? 'ngày trước' : '日前'}`}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="fa-regular fa-clock w-4 h-4" aria-hidden="true"></i>
                {locale === 'vi' ? 'Ngày hết hạn: 20/04/2023' : '有効期限: 2023/04/20'}
              </span>
              {salary && (
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-dollar-sign w-4 h-4" aria-hidden="true"></i>
                  {salary}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
          <button
            className="text-gray-400 hover:text-[#008B9C] p-2"
            aria-label={locale === 'vi' ? 'Đánh dấu' : 'ブックマーク'}
          >
            <i className="fa-regular fa-bookmark text-xl" aria-hidden="true"></i>
          </button>
          <Link
            href={`/${locale}/jobs/${slug}`}
            className="bg-[#008B9C] hover:bg-teal-600 !text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors w-full md:w-auto text-center whitespace-nowrap"
          >
            {locale === 'vi' ? 'Xem chi tiết' : '詳細を見る'}
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
        <i className="fa-solid fa-map-pin w-4 h-4" aria-hidden="true"></i>
        {displayLocation}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {employmentType && (
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            {employmentType}
          </span>
        )}
        <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
          {locale === 'vi' ? 'Internship' : 'インターンシップ'}
        </span>
      </div>
      <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
        <i className="fa-solid fa-tag"></i> Tag:
        {skills.map((skill) => (
          <Link
            key={skill}
            href={`/${locale}/jobs?q=${skill}`}
            className="hover:text-[#008B9C] transition-colors"
          >
            {skill}
          </Link>
        ))}
      </div>
    </div>
  )
}