import { requireAdmin } from '@/lib/auth'
import { newsRepository } from '@/lib/db/repositories/news'
import { NewsArticle } from '@/lib/db/types'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { formatDateLocal, NEWS_STATUS_LABELS, NEWS_CATEGORY_LABELS } from '@/lib/utils'

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
  const review = 0 // review not supported in current repo
  return { total, published, draft, review }
}

interface ArticleRowProps {
  article: NewsArticle
}

const ArticleRow = React.memo(function ArticleRow({ article }: ArticleRowProps) {
  const status = NEWS_STATUS_LABELS[article.status] || { label: article.status, color: 'bg-gray-100 text-gray-600' }
  const categoryLabel = article.category || '-'

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:border-gray-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-200">
      <div className="col-span-1 md:col-span-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200/50">
          {article.thumbnail_url ? (
            <div className="relative w-full h-full">
               <Image alt={article.title} fill className="object-cover" src={article.thumbnail_url} unoptimized sizes="64px" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#006672]/10 to-gray-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl text-teal-text/30">newspaper</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <Link
            href={`/news/${article.slug}`}
            className="font-semibold text-gray-900 group-hover:text-teal-text transition-colors line-clamp-2"
            target="_blank"
          >
            {article.title}
          </Link>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">person</span>
            {article.author_name}
          </span>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 flex items-center">
        <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 font-medium text-sm rounded-full border border-gray-200">
          {categoryLabel}
        </span>
      </div>

      <div className="col-span-1 md:col-span-2 flex items-center">
        <span className="text-sm text-gray-600 flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-gray-400">calendar_today</span>
          {formatDateLocal(article.published_at || '')}
        </span>
      </div>

      <div className="col-span-1 md:col-span-2 flex items-center">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${
            article.status === 'published' ? 'bg-green-500' :
            article.status === 'draft' ? 'bg-gray-400' : 'bg-gray-500'
          }`}></span>
          {status.label}
        </span>
      </div>

      <div className="col-span-1 md:col-span-1 flex items-center justify-end gap-1">
        <Link
          href={`/admin/news/${article.id}/edit`}
          className="p-2 text-gray-400 hover:text-teal-text hover:bg-[#006672]/10 rounded-lg transition-colors"
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

          <div className="flex flex-col gap-3">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <div className="col-span-5">Chi tiết bài viết</div>
              <div className="col-span-2">Danh mục</div>
              <div className="col-span-2">Ngày đăng</div>
              <div className="col-span-2">Trạng thái</div>
              <div className="col-span-1 text-right">Hành động</div>
            </div>

            {articles.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-200">
                <span className="material-symbols-outlined text-5xl mb-3 text-gray-300">newspaper</span>
                <p className="text-lg">Chưa có bài viết nào</p>
                <Link
                  href="/admin/news/new"
                  className="inline-block mt-4 text-teal-text hover:underline font-medium"
                >
                  Tạo bài viết mới
                </Link>
              </div>
            ) : (
              articles.map((article) => <ArticleRow key={article.id} article={article} />)
            )}
          </div>
        </div>
      </div>
    </div>
  )
}