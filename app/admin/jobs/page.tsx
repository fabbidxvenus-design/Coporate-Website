import { requireAdmin } from '@/lib/auth'
import { jobsRepository } from '@/lib/db/repositories/jobs'
import { Job } from '@/lib/db/types'
import Link from 'next/link'
import React from 'react'
import { AdminJobsClient } from '@/components/admin/AdminJobsClient'

export const metadata = {
  title: 'Quản lý Tin tuyển dụng | Fabbi CMS',
}

async function getJobs() {
  const jobs = await jobsRepository.findAllPublished()
  return {
    jobs,
    total: jobs.length,
  }
}

async function getStats() {
  const jobs = await jobsRepository.findAllPublished()
  const total = jobs.length
  const published = jobs.filter(j => j.status === 'published').length
  const draft = jobs.filter(j => j.status === 'draft').length
  const closed = jobs.filter(j => j.status === 'closed' || j.status === 'archived').length
  return { total, published, draft, closed }
}

export default async function AdminJobsPage() {
  await requireAdmin()
  const [{ jobs, total }, stats] = await Promise.all([getJobs(), getStats()])

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 bg-[#fbf9f8]">
        <div className="max-w-[1200px] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý tin tuyển dụng</h1>
              <p className="text-gray-500 mt-1">Quản lý và theo dõi tất cả tin tuyển dụng</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">download</span>
                Xuất báo cáo
              </button>
              <Link
                href="/admin/jobs/new"
                className="px-4 py-2 bg-[#006672] text-white rounded-lg text-sm font-medium hover:bg-[#007a8d] transition-colors flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Thêm tin mới
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#006672] opacity-5 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">Tổng tin</span>
                <span className="material-symbols-outlined text-teal-text bg-[#006672]/10 p-1.5 rounded-lg">work_history</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="mt-2 text-sm text-teal-text flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> Tất cả tin tuyển dụng
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-500 opacity-5 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">Đã đăng</span>
                <span className="material-symbols-outlined text-green-600 bg-green-100/50 p-1.5 rounded-lg">check_circle</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.published}</div>
              <div className="mt-2 text-sm text-gray-500">Đang tuyển dụng</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500 opacity-5 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">Nháp</span>
                <span className="material-symbols-outlined text-yellow-600 bg-yellow-100/50 p-1.5 rounded-lg">pending_actions</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.draft}</div>
              <div className="mt-2 text-sm text-gray-500">Chưa xuất bản</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-500 opacity-5 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">Đã đóng</span>
                <span className="material-symbols-outlined text-red-600 bg-red-100/50 p-1.5 rounded-lg">cancel</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.closed}</div>
              <div className="mt-2 text-sm text-gray-500">Hết hạn hoặc đã lưu trữ</div>
            </div>
          </div>

          <AdminJobsClient initialJobs={jobs} total={total} locale="vi" />
        </div>
      </div>
    </div>
  )
}