import { AdminNewsClient } from '@/components/admin/AdminNewsClient'
import { requireAdmin } from '@/lib/auth'
import { newsRepository } from '@/lib/db/repositories/news'
import Link from 'next/link'

export const metadata = {
  title: 'Quản lý Tin tức | Fabbi CMS',
}

async function getArticles() {
  const articles = await newsRepository.findAllPublished()
  return {
    articles,
    total: articles.length,
  }
}

async function getStats() {
  const articles = await newsRepository.findAllPublished()
  const total = articles.length
  const published = articles.filter(a => a.status === 'published').length
  const draft = articles.filter(a => a.status === 'draft').length
  const review = 0
  return { total, published, draft, review }
}

export default async function AdminNewsPage() {
  await requireAdmin()
  const [{ articles, total }, stats] = await Promise.all([getArticles(), getStats()])

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 bg-[#fbf9f8]">
        <div className="max-w-[1200px] mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý tin tức</h1>
              <p className="text-gray-500 mt-1">Quản lý và theo dõi tất cả bài viết</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">download</span>
                Xuất báo cáo
              </button>
              <Link
                href="/admin/news/new"
                className="px-4 py-2 bg-[#006672] text-white rounded-lg text-sm font-medium hover:bg-[#007a8d] transition-colors flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Tạo bài viết mới
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#006672] opacity-5 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">Tổng bài viết</span>
                <span className="material-symbols-outlined text-teal-text bg-[#006672]/10 p-1.5 rounded-lg">newspaper</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="mt-2 text-sm text-gray-500">Tất cả bài viết</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-500 opacity-5 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">Đã đăng</span>
                <span className="material-symbols-outlined text-green-600 bg-green-100/50 p-1.5 rounded-lg">check_circle</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.published}</div>
              <div className="mt-2 text-sm text-gray-500">Đang hiển thị</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gray-500 opacity-5 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">Nháp</span>
                <span className="material-symbols-outlined text-gray-600 bg-gray-100/50 p-1.5 rounded-lg">draft</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.draft}</div>
              <div className="mt-2 text-sm text-gray-500">Chưa xuất bản</div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500 opacity-5 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">Chờ duyệt</span>
                <span className="material-symbols-outlined text-yellow-600 bg-yellow-100/50 p-1.5 rounded-lg">pending_actions</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.review}</div>
              <div className="mt-2 text-sm text-gray-500">Cần xem xét</div>
            </div>
          </div>

          <AdminNewsClient initialArticles={articles} total={total} />
        </div>
      </div>
    </div>
  )
}