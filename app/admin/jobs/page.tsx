import { requireAdmin } from '@/lib/auth'
import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import { mockJobs } from '@/lib/mock-data'
import type { Database } from '@/types/database'
import Link from 'next/link'
import React from 'react'
import { formatDateLocal, JOB_STATUS_LABELS, EMPLOYMENT_TYPE_LABELS } from '@/lib/utils'

type Job = Database['public']['Tables']['jobs']['Row']

export const metadata = {
  title: 'Quản lý Tin tuyển dụng | Fabbi CMS',
}

async function getJobs(page: number = 1, limit: number = 20) {
  const supabase = await createClient()
  const offset = (page - 1) * limit

  if (USE_MOCK_DATA || !supabase) {
    const sorted = [...mockJobs].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    return {
      jobs: sorted.slice(offset, offset + limit),
      total: sorted.length,
    }
  }

  const [{ data, count }] = await Promise.all([
    supabase
      .from('jobs')
      .select('id, title, slug, location, employment_type, status, published_at, closed_at, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1),
  ])

  return {
    jobs: (data || []) as Job[],
    total: count || 0,
  }
}

async function getStats(): Promise<{ total: number; published: number; draft: number; closed: number }> {
  const supabase = await createClient()

  if (USE_MOCK_DATA || !supabase) {
    const total = mockJobs.length
    const published = mockJobs.filter(j => j.status === 'published').length
    const draft = mockJobs.filter(j => j.status === 'draft').length
    const closed = mockJobs.filter(j => j.status === 'closed' || j.status === 'archived').length
    return { total, published, draft, closed }
  }

  // Single parallel query for all counts
  const [totalResult, publishedResult, draftResult, closedResult] = await Promise.all([
    supabase.from('jobs').select('status'),
    supabase.from('jobs').select('status').eq('status', 'published'),
    supabase.from('jobs').select('status').eq('status', 'draft'),
    supabase.from('jobs').select('status').in('status', ['closed', 'archived']),
  ])

  const allStatuses = (totalResult.data ?? []) as Database['public']['Tables']['jobs']['Row'][]
  const published = (publishedResult.data || []).length
  const draft = (draftResult.data || []).length
  const closed = (closedResult.data || []).length

  return { total: allStatuses.length, published, draft, closed }
}

interface JobRowProps {
  job: Job
}

const JobRow = React.memo(function JobRow({ job }: JobRowProps) {
  const status = JOB_STATUS_LABELS[job.status] || { label: job.status, color: 'bg-gray-100 text-gray-600' }

  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="py-4 px-4 text-sm text-gray-500">#{job.id.toString().slice(0, 8).toUpperCase()}</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#008b9c]/10 flex items-center justify-center text-[#008b9c]">
            <span className="material-symbols-outlined text-sm">work</span>
          </div>
          <span className="text-sm font-medium text-gray-900">{job.title}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-sm text-gray-600">
        {job.location ? (
          job.location === 'HN' ? 'Hà Nội' :
          job.location === 'HCM' ? 'Hồ Chí Minh' :
          job.location === 'DN' ? 'Đà Nẵng' :
          job.location === 'JP' ? 'Japan' : job.location
        ) : '-'}
      </td>
      <td className="py-4 px-4">
        <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium bg-[#008b9c]/10 text-[#008b9c]">
          {EMPLOYMENT_TYPE_LABELS[job.employment_type || ''] || job.employment_type || '-'}
        </span>
      </td>
      <td className="py-4 px-4 text-sm text-gray-500">{formatDateLocal(job.published_at || '')}</td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${
            job.status === 'published' ? 'bg-green-500' :
            job.status === 'draft' ? 'bg-gray-400' :
            job.status === 'review' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}></div>
          <span className="text-sm text-gray-600">{status.label}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-right">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href={`/jobs/${job.slug}`}
            className="p-1.5 text-gray-400 hover:text-[#008b9c] hover:bg-[#008b9c]/10 rounded transition-colors"
            title="Xem"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
          </Link>
          <Link
            href={`/admin/jobs/${job.id}/edit`}
            className="p-1.5 text-gray-400 hover:text-[#008b9c] hover:bg-[#008b9c]/10 rounded transition-colors"
            title="Sửa"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </Link>
          <button
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Xóa"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </td>
    </tr>
  )
})

export default async function AdminJobsPage() {
  await requireAdmin()
  const [{ jobs, total }, stats] = await Promise.all([getJobs(), getStats()])

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Page Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#fbf9f8]">
        <div className="max-w-[1200px] mx-auto space-y-6">
          {/* Page Header */}
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
                className="px-4 py-2 bg-[#008b9c] text-white rounded-lg text-sm font-medium hover:bg-[#007a8d] transition-colors flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Thêm tin mới
              </Link>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#008b9c] opacity-5 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">Tổng tin</span>
                <span className="material-symbols-outlined text-[#008b9c] bg-[#008b9c]/10 p-1.5 rounded-lg">work_history</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="mt-2 text-sm text-[#008b9c] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> Tất cả tin tuyển dụng
              </div>
            </div>

            {/* Active */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-500 opacity-5 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">Đã đăng</span>
                <span className="material-symbols-outlined text-green-600 bg-green-100/50 p-1.5 rounded-lg">check_circle</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.published}</div>
              <div className="mt-2 text-sm text-gray-500">Đang tuyển dụng</div>
            </div>

            {/* Pending */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500 opacity-5 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">Nháp</span>
                <span className="material-symbols-outlined text-yellow-600 bg-yellow-100/50 p-1.5 rounded-lg">pending_actions</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.draft}</div>
              <div className="mt-2 text-sm text-gray-500">Chưa xuất bản</div>
            </div>

            {/* Closed */}
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

          {/* Filters */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4 items-end">
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium">Tìm kiếm</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
                    <input
                      className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-[#008b9c] focus:ring-1 focus:ring-[#008b9c] transition-colors"
                      placeholder="Tên công việc..."
                      type="text"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium">Địa điểm</label>
                  <div className="relative">
                    <select className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:border-[#008b9c] focus:ring-1 focus:ring-[#008b9c] transition-colors">
                      <option value="">Tất cả</option>
                      <option value="HN">Hà Nội</option>
                      <option value="HCM">Hồ Chí Minh</option>
                      <option value="DN">Đà Nẵng</option>
                      <option value="JP">Japan</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">expand_more</span>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium">Trạng thái</label>
                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input className="w-4 h-4 text-[#008b9c] bg-white border-gray-200 rounded focus:ring-[#008b9c]" name="status" type="radio" defaultChecked />
                      <span className="text-sm text-gray-600">Tất cả</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input className="w-4 h-4 text-[#008b9c] bg-white border-gray-200 rounded focus:ring-[#008b9c]" name="status" type="radio" />
                      <span className="text-sm text-gray-600">Đã đăng</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input className="w-4 h-4 text-[#008b9c] bg-white border-gray-200 rounded focus:ring-[#008b9c]" name="status" type="radio" />
                      <span className="text-sm text-gray-600">Nháp</span>
                    </label>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap h-[38px]">
                Xóa bộ lọc
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tiêu đề công việc</th>
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Vị trí</th>
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Hình thức</th>
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ngày đăng</th>
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {jobs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-500">
                        <span className="material-symbols-outlined text-4xl mb-2 text-gray-300">work_off</span>
                        <p>Chưa có tin tuyển dụng nào</p>
                        <Link
                          href="/admin/jobs/new"
                          className="inline-block mt-2 text-[#008b9c] hover:underline"
                        >
                          Tạo tin mới
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    jobs.map((job) => <JobRow key={job.id} job={job} />)
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {jobs.length > 0 && (
              <div className="py-3 px-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                <span className="text-xs text-gray-500">Hiển thị 1 đến {jobs.length} của {stats.total} tin</span>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded bg-[#008b9c] text-white text-sm font-medium">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-sm">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-sm">3</button>
                  <span className="w-8 h-8 flex items-center justify-center text-gray-500 text-sm">...</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-sm">10</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}