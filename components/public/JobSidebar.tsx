'use client'

import Link from 'next/link'
import type { Database } from '@/types/database'
import { formatSalary, getEmploymentTypeStyle, formatDateLocal } from '@/lib/utils'

type Job = Database['public']['Tables']['jobs']['Row']

interface JobSidebarProps {
  job: Job
}

export function JobSidebar({ job }: JobSidebarProps) {
  return (
    <aside className="lg:col-span-1">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] sticky top-6">
        <div className="space-y-4 mb-6">
          {job.closed_at && (
            <div className="flex items-start gap-3">
              <i className="fa-regular fa-calendar w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
              <div>
                <span className="text-sm text-gray-500 block">Ngày hết hạn ứng tuyển:</span>
                <span className="font-semibold text-gray-900">{formatDateLocal(job.closed_at)}</span>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <i className="fa-solid fa-dollar-sign w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
            <div>
              <span className="text-sm text-gray-500 block">Mức lương:</span>
              <span className="font-semibold text-gray-900">{formatSalary(job.salary_min, job.salary_max)}</span>
            </div>
          </div>

          {job.department && (
            <div className="flex items-start gap-3">
              <i className="fa-solid fa-briefcase w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
              <div>
                <span className="text-sm text-gray-500 block">Phòng ban:</span>
                <span className="font-semibold text-gray-900">{job.department}</span>
              </div>
            </div>
          )}

          {job.location && (
            <div className="flex items-start gap-3">
              <i className="fa-solid fa-map-pin w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
              <div className="w-full">
                <span className="text-sm text-gray-500 block">Nơi làm việc:</span>
                <span className="font-semibold text-[#008b9c]">{
                  job.location === 'HN' ? 'Hà Nội' :
                  job.location === 'HCM' ? 'Hồ Chí Minh' :
                  job.location === 'DN' ? 'Đà Nẵng' :
                  job.location === 'JP' ? 'Japan' : job.location
                }</span>
                <div className="mt-2 w-full h-24 bg-gray-200 rounded-lg overflow-hidden border border-gray-200">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 text-sm" aria-hidden="true">
                    Bản đồ
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 pt-2">
            <i className="fa-solid fa-phone w-5 h-5 text-gray-400 mt-0.5 shrink-0" aria-hidden="true"></i>
            <div>
              <span className="text-sm text-gray-500 block">Số điện thoại:</span>
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
            <h3 className="font-bold text-gray-900 mb-3">Hình thức làm việc</h3>
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEmploymentTypeStyle(job.employment_type)}`}>
                {job.employment_type}
              </span>
            </div>
          </div>
        )}

        <div className="pt-6">
          <Link
            href={`/apply?job=${job.slug}`}
            className="w-full bg-[#008b9c] hover:bg-[#007a8d] text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            aria-label={`Ứng tuyển ${job.title}`}
          >
            <i className="fa-solid fa-paper-plane w-5 h-5" aria-hidden="true"></i>
            Ứng tuyển ngay
          </Link>
        </div>
      </div>
    </aside>
  )
}