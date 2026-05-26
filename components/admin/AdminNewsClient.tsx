'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Pagination } from './ui/Pagination'
import { formatDateLocal, NEWS_STATUS_LABELS } from '@/lib/utils'
import { NewsArticle } from '@/lib/db/types'

interface AdminNewsClientProps {
  initialArticles: NewsArticle[]
  total: number
}

export function AdminNewsClient({ initialArticles, total }: AdminNewsClientProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [articles] = useState(initialArticles)
  const itemsPerPage = 10
  const totalPages = Math.ceil(articles.length / itemsPerPage) || 1

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const paginatedArticles = articles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="flex flex-col gap-3">
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <div className="col-span-5">Chi tiết bài viết</div>
        <div className="col-span-2">Danh mục</div>
        <div className="col-span-2">Ngày đăng</div>
        <div className="col-span-2">Trạng thái</div>
        <div className="col-span-1 text-right">Hành động</div>
      </div>

      {paginatedArticles.length === 0 ? (
        <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-200">
          <span className="material-symbols-outlined text-5xl mb-3 text-gray-300">newspaper</span>
          <p className="text-lg">Chưa có bài viết nào</p>
        </div>
      ) : (
        paginatedArticles.map((article) => (
          <div key={article.id} className="group bg-white border border-gray-200 rounded-xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:border-gray-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-200">
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
                {article.category || '-'}
              </span>
            </div>
            <div className="col-span-1 md:col-span-2 flex items-center">
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-gray-400">calendar_today</span>
                {formatDateLocal(article.published_at || '')}
              </span>
            </div>
            <div className="col-span-1 md:col-span-2 flex items-center">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${NEWS_STATUS_LABELS[article.status]?.color || 'bg-gray-100 text-gray-600'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  article.status === 'published' ? 'bg-green-500' :
                  article.status === 'draft' ? 'bg-gray-400' : 'bg-gray-500'
                }`}></span>
                {NEWS_STATUS_LABELS[article.status]?.label || article.status}
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
        ))
      )}

      {articles.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
