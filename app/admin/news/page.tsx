import { requireAdmin } from '@/lib/auth'
import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import { mockNews } from '@/lib/mock-data'
import type { Database } from '@/types/database'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { formatDateLocal, NEWS_STATUS_LABELS, NEWS_CATEGORY_LABELS } from '@/lib/utils'

type Article = Database['public']['Tables']['news_articles']['Row']

export const metadata = {
  title: 'Quản lý Tin tức | Fabbi CMS',
}

async function getArticles(page: number = 1, limit: number = 20) {
  const supabase = await createClient()
  const offset = (page - 1) * limit

  if (USE_MOCK_DATA || !supabase) {
    const sorted = [...mockNews].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    return {
      articles: sorted.slice(offset, offset + limit),
      total: sorted.length,
    }
  }

  const [{ data, count }] = await Promise.all([
    supabase
      .from('news_articles')
      .select('id, title, slug, excerpt, cover_image_url, category, status, published_at, author_id, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1),
  ])

  return {
    articles: (data || []) as Article[],
    total: count || 0,
  }
}

async function getStats(): Promise<{ total: number; published: number; draft: number; review: number }> {
  const supabase = await createClient()

  if (USE_MOCK_DATA || !supabase) {
    const total = mockNews.length
    const published = mockNews.filter(a => a.status === 'published').length
    const draft = mockNews.filter(a => a.status === 'draft').length
    const review = mockNews.filter(a => a.status === 'review').length
    return { total, published, draft, review }
  }

  // Single parallel query for all counts
  const [totalResult, publishedResult, draftResult, reviewResult] = await Promise.all([
    supabase.from('news_articles').select('status'),
    supabase.from('news_articles').select('status').eq('status', 'published'),
    supabase.from('news_articles').select('status').eq('status', 'draft'),
    supabase.from('news_articles').select('status').eq('status', 'review'),
  ])

  const allStatuses = (totalResult.data ?? []) as Database['public']['Tables']['news_articles']['Row'][]
  const published = (publishedResult.data || []).length
  const draft = (draftResult.data || []).length
  const review = (reviewResult.data || []).length

  return { total: allStatuses.length, published, draft, review }
}

interface ArticleRowProps {
  article: Article
}

const ArticleRow = React.memo(function ArticleRow({ article }: ArticleRowProps) {
  const status = NEWS_STATUS_LABELS[article.status] || { label: article.status, color: 'bg-gray-100 text-gray-600' }
  const categoryLabel = NEWS_CATEGORY_LABELS[article.category || ''] || article.category || '-'

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:border-gray-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-200">
      {/* Article Detail */}
      <div className="col-span-1 md:col-span-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200/50">
          {article.cover_image_url ? (
            <Image alt={article.title} fill className="object-cover" src={article.cover_image_url} unoptimized sizes="64px" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#008b9c]/10 to-gray-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl text-[#008b9c]/30">newspaper</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <Link
            href={`/news/${article.slug}`}
            className="font-semibold text-gray-900 group-hover:text-[#008b9c] transition-colors line-clamp-2"
            target="_blank"
          >
            {article.title}
          </Link>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">person</span>
            {article.author_id ? 'Admin' : 'System'}
          </span>
        </div>
      </div>

      {/* Category */}
      <div className="col-span-1 md:col-span-2 flex items-center">
        <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 font-medium text-sm rounded-full border border-gray-200">
          {categoryLabel}
        </span>
      </div>

      {/* Publish Date */}
      <div className="col-span-1 md:col-span-2 flex items-center">
        <span className="text-sm text-gray-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-gray-400">calendar_today</span>
          {formatDateLocal(article.published_at || '')}
        </span>
      </div>

      {/* Status */}
      <div className="col-span-1 md:col-span-2 flex items-center">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            article.status === 'published' ? 'bg-green-500' :
            article.status === 'review' ? 'bg-yellow-500' :
            article.status === 'draft' ? 'bg-gray-400' : 'bg-gray-500'
          }`}></span>
          {status.label}
        </span>
      </div>

      {/* Actions */}
      <div className="col-span-1 md:col-span-1 flex items-center justify-end gap-1">
        <Link
          href={`/admin/news/${article.id}/edit`}
          className="p-2 text-gray-400 hover:text-[#008b9c] hover:bg-[#008b9c]/10 rounded-lg transition-colors"
          title="Sửa"
        >
          <span className="material-symbols-outlined text-xl">edit</span>
        </Link>
        <button
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Xóa"
        >
          <span className="material-symbols-outlined text-xl">delete</span>
        </button>
      </div>
    </div>
  )
})

export default async function AdminNewsPage() {
  await requireAdmin()
  const [{ articles, total }, stats] = await Promise.all([getArticles(), getStats()])

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Page Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#fbf9f8]">
        <div className="max-w-[1200px] mx-auto space-y-6">
          {/* Page Header */}
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
                className="px-4 py-2 bg-[#008b9c] text-white rounded-lg text-sm font-medium hover:bg-[#007a8d] transition-colors flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Tạo bài viết mới
              </Link>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#008b9c] opacity-5 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">Tổng bài viết</span>
                <span className="material-symbols-outlined text-[#008b9c] bg-[#008b9c]/10 p-1.5 rounded-lg">newspaper</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="mt-2 text-sm text-gray-500">Tất cả bài viết</div>
            </div>

            {/* Published */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-green-500 opacity-5 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">Đã đăng</span>
                <span className="material-symbols-outlined text-green-600 bg-green-100/50 p-1.5 rounded-lg">check_circle</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.published}</div>
              <div className="mt-2 text-sm text-gray-500">Đang hiển thị</div>
            </div>

            {/* Draft */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gray-500 opacity-5 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">Nháp</span>
                <span className="material-symbols-outlined text-gray-600 bg-gray-100/50 p-1.5 rounded-lg">draft</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stats.draft}</div>
              <div className="mt-2 text-sm text-gray-500">Chưa xuất bản</div>
            </div>

            {/* Review */}
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
                      placeholder="Tên bài viết..."
                      type="text"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium">Danh mục</label>
                  <div className="relative">
                    <select className="w-full pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:border-[#008b9c] focus:ring-1 focus:ring-[#008b9c] transition-colors">
                      <option value="">Tất cả</option>
                      <option value="nguoi_fabbi">Người Fabbi</option>
                      <option value="cac_hoat_dong">Các hoạt động</option>
                      <option value="giai_thuong">Giải thưởng</option>
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

          {/* Data List */}
          <div className="flex flex-col gap-3">
            {/* Header (Desktop) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <div className="col-span-5">Chi tiết bài viết</div>
              <div className="col-span-2">Danh mục</div>
              <div className="col-span-2">Ngày đăng</div>
              <div className="col-span-2">Trạng thái</div>
              <div className="col-span-1 text-right">Hành động</div>
            </div>

            {/* Articles */}
            {articles.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-200">
                <span className="material-symbols-outlined text-5xl mb-3 text-gray-300">newspaper</span>
                <p className="text-lg">Chưa có bài viết nào</p>
                <Link
                  href="/admin/news/new"
                  className="inline-block mt-4 text-[#008b9c] hover:underline font-medium"
                >
                  Tạo bài viết mới
                </Link>
              </div>
            ) : (
              articles.map((article) => <ArticleRow key={article.id} article={article} />)
            )}

            {/* Pagination */}
            {articles.length > 0 && (
              <div className="py-3 px-4 border-t border-gray-200 bg-white rounded-xl flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">Hiển thị 1 đến {articles.length} của {stats.total} bài viết</span>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded text-gray-400 bg-white border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded bg-[#008b9c] text-white text-sm font-medium">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-sm">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-sm">3</button>
                  <span className="w-8 h-8 flex items-center justify-center text-gray-500 text-sm">...</span>
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