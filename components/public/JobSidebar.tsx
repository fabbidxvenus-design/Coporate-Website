'use client'

import { Job } from '@/lib/db/types'
import { formatSalary, getEmploymentTypeStyle, formatDateLocal } from '@/lib/utils'
import { JobApplyButton } from '@/components/public/JobApplyButton'

interface JobSidebarProps {
  job: Job
  locale: string
  dict: any
}

export function JobSidebar({ job, locale, dict }: JobSidebarProps) {
  return (
    <aside className="lg:col-span-1">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] sticky top-6">
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            {job.closed_at && (
              <div className="flex items-start gap-3">
                <i className="fa-regular fa-calendar w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block">{locale === 'vi' ? 'Hạn ứng tuyển' : '応募期限'}:</span>
                  <span className="font-semibold text-gray-900">{formatDateLocal(job.closed_at)}</span>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <i className="fa-solid fa-dollar-sign w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block">{locale === 'vi' ? 'Mức lương' : '給与'}:</span>
                <span className="font-semibold text-gray-900">{formatSalary(job.salary_min, job.salary_max)}</span>
              </div>
            </div>

            {job.department && (
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-briefcase w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block">{locale === 'vi' ? 'Phòng ban' : '部署'}:</span>
                  <span className="font-semibold text-gray-900">{job.department}</span>
                </div>
              </div>
            )}
          </div>

          {job.location && (
            <div className="flex items-start gap-3 border-t border-gray-100 pt-6">
              <i className="fa-solid fa-map-pin w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
              <div className="w-full">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block">{locale === 'vi' ? 'Nơi làm việc' : '勤務地'}:</span>
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

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <div className="flex items-start gap-3">
              <i className="fa-solid fa-phone w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block">{locale === 'vi' ? 'Số điện thoại' : '電話番号'}:</span>
                <span className="font-semibold text-gray-900">0123 456 789</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <i className="fa-regular fa-envelope w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block">Email:</span>
                <span className="font-semibold text-gray-900">hr@fabbi.com.vn</span>
              </div>
            </div>
          </div>
        </div>

        {job.skills && job.skills.length > 0 && (
          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-gray-900 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
              ))}
            </div>
          </div>
        )}

        {job.employment_type && (
          <div className="pt-6">
            <h3 className="font-bold text-gray-900 mb-3">{locale === 'vi' ? 'Hình thức làm việc' : '雇用形態'}</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getEmploymentTypeStyle(job.employment_type)}`}>
              {job.employment_type}
            </span>
          </div>
        )}

        <div className="pt-8">
          <JobApplyButton jobTitle={job.title} locale={locale} variant="sidebar" />
        </div>
      </div>
    </aside>
  )
}