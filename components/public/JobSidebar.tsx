'use client'

import Link from 'next/link'
import { Job } from '@/lib/db/types'
import { formatSalary, getEmploymentTypeStyle, formatDateLocal } from '@/lib/utils'

interface JobSidebarProps {
  job: Job
  locale: string
  dict: any
}

export function JobSidebar({ job, locale, dict }: JobSidebarProps) {
  return (
    <aside className="lg:col-span-1">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] sticky top-6">
        <div className="space-y-4 mb-6">
          {job.closed_at && (
            <div className="flex items-start gap-3">
              <i className="fa-regular fa-calendar w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
              <div>
                <span className="text-sm text-gray-500 block">{locale === 'vi' ? 'Ngày hết hạn ứng tuyển' : '応募期限'}:</span>
                <span className="font-semibold text-gray-900">{formatDateLocal(job.closed_at)}</span>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <i className="fa-solid fa-dollar-sign w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
            <div>
              <span className="text-sm text-gray-500 block">{locale === 'vi' ? 'Mức lương' : '給与'}:</span>
              <span className="font-semibold text-gray-900">{formatSalary(job.salary_min, job.salary_max)}</span>
            </div>
          </div>

          {job.department && (
            <div className="flex items-start gap-3">
              <i className="fa-solid fa-briefcase w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
              <div>
                <span className="text-sm text-gray-500 block">{locale === 'vi' ? 'Phòng ban' : '部署'}:</span>
                <span className="font-semibold text-gray-900">{job.department}</span>
              </div>
            </div>
          )}

          {job.location && (
            <div className="flex items-start gap-3">
              <i className="fa-solid fa-map-pin w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
              <div className="w-full">
                <span className="text-sm text-gray-500 block">{locale === 'vi' ? 'Nơi làm việc' : '勤務地'}:</span>
                <span className="font-semibold text-teal-text">{
                  job.location === 'HN' ? (locale === 'vi' ? 'Hà Nội' : 'ハノイ') :
                  job.location === 'HCM' ? (locale === 'vi' ? 'Hồ Chí Minh' : 'ホーチミン') :
                  job.location === 'DN' ? (locale === 'vi' ? 'Đà Nẵng' : 'ダナン') :
                  job.location === 'JP' ? 'Japan' : job.location
                }</span>
                <div className="mt-2 w-full h-24 bg-gray-200 rounded-lg overflow-hidden border border-gray-200">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-sm" aria-hidden="true">
                    {locale === 'vi' ? 'Bản đồ' : '地図'}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 pt-2">
            <i className="fa-solid fa-phone w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
            <div>
              <span className="text-sm text-gray-500 block">{locale === 'vi' ? 'Số điện thoại' : '電話番号'}:</span>
              <span className="font-semibold text-gray-900">0123 456 789</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <i className="fa-regular fa-envelope w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
            <div>
              <span className="text-sm text-gray-500 block">Email:</span>
              <span className="font-semibold text-gray-900">hr@fabbi.com.vn</span>
            </div>
          </div>
        </div>

        {job.skills && job.skills.length > 0 && (
          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-gray-900 mb-3">Job skills</h3>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Job skills">
              {job.skills.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium" role="listitem">{tag}</span>
              ))}
            </div>
          </div>
        )}

        {job.employment_type && (
          <div className="pt-6">
            <h3 className="font-bold text-gray-900 mb-3">{locale === 'vi' ? 'Hình thức làm việc' : '雇用形態'}</h3>
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEmploymentTypeStyle(job.employment_type)}`}>
                {job.employment_type}
              </span>
            </div>
          </div>
        )}

        <div className="pt-6">
          <Link
            href={`/${locale}/apply?job=${job.slug}`}
            className="w-full bg-pink hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            aria-label={`${locale === 'vi' ? 'Ứng tuyển' : '応募'} ${job.title}`}
          >
            <i className="fa-solid fa-paper-plane w-5 h-5" aria-hidden="true"></i>
            {locale === 'vi' ? 'Ứng tuyển ngay' : '今すぐ応募'}
          </Link>
        </div>
      </div>
    </aside>
  )
}