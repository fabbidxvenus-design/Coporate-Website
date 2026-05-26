'use client'

import { useState, useCallback } from 'react'
import { Pagination } from './ui/Pagination'
import { useRouter } from 'next/navigation'

interface AdminJobsClientProps {
  initialJobs: Array<{
    id: string
    title: string
    slug: string
    status: string
  }>
  total: number
  locale: string
}

export function AdminJobsClient({ initialJobs, total, locale }: AdminJobsClientProps) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [jobs] = useState(initialJobs)
  const [deleting, setDeleting] = useState<string | null>(null)

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !status || job.status === status
    return matchesSearch && matchesStatus
  })

  const handleDelete = useCallback(async (jobId: string, jobTitle: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa tin "${jobTitle}"?`)) return

    setDeleting(jobId)
    try {
      // In mock mode, simulate delete by re-rendering
      // In production, this would call the API
      await new Promise(resolve => setTimeout(resolve, 500))
      router.refresh()
    } catch {
      alert('Không thể xóa tin tuyển dụng')
    } finally {
      setDeleting(null)
    }
  }, [router])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const handleClearFilters = useCallback(() => {
    setSearch('')
    setStatus('')
    setCurrentPage(1)
  }, [])

  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage) || 1
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, filteredJobs.length)

  return (
    <div className="space-y-6">
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
                  className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Tên công việc..."
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setCurrentPage(1) }}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-1">
              <label className="text-xs text-gray-500 font-medium">Trạng thái</label>
              <div className="relative">
                <select
                  className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  value={status}
                  onChange={e => { setStatus(e.target.value); setCurrentPage(1) }}
                >
                  <option value="">Tất cả</option>
                  <option value="published">Đã đăng</option>
                  <option value="draft">Nháp</option>
                  <option value="review">Đang xem xét</option>
                  <option value="closed">Đã đóng</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">expand_more</span>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="text-xs text-gray-500 font-medium">Địa điểm</label>
              <div className="relative">
                <select className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors">
                  <option value="">Tất cả</option>
                  <option value="HN">Hà Nội</option>
                  <option value="HCM">Hồ Chí Minh</option>
                  <option value="DN">Đà Nẵng</option>
                  <option value="JP">Japan</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">expand_more</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap h-[38px]"
          >
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
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500">
                    <span className="material-symbols-outlined text-4xl mb-2 text-gray-300">search_off</span>
                    <p>Không tìm thấy tin tuyển dụng phù hợp</p>
                  </td>
                </tr>
              ) : (
                filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="py-4 px-4 text-sm text-gray-500">#{job.id.toString().slice(0, 8).toUpperCase()}</td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-gray-900">{job.title}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${
                          job.status === 'published' ? 'bg-green-500' :
                          job.status === 'draft' ? 'bg-gray-400' :
                          job.status === 'review' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}></div>
                        <span className="text-sm text-gray-600">
                          {job.status === 'published' ? 'Đã đăng' :
                           job.status === 'draft' ? 'Nháp' :
                           job.status === 'review' ? 'Đang xem xét' : 'Đã đóng'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href={`/${locale}/jobs/${job.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-gray-400 hover:text-teal-text hover:bg-primary/10 rounded transition-colors"
                          title="Xem"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </a>
                        <a
                          href={`/admin/jobs/${job.id}/edit`}
                          className="p-1.5 text-gray-400 hover:text-teal-text hover:bg-primary/10 rounded transition-colors"
                          title="Sửa"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </a>
                        <button
                          onClick={() => handleDelete(job.id, job.title)}
                          disabled={deleting === job.id}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                          title="Xóa"
                        >
                          <span className="material-symbols-outlined text-[18px]">{deleting === job.id ? 'hourglass_empty' : 'delete'}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}