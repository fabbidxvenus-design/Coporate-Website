'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Database } from '@/types/database'

type Article = Database['public']['Tables']['news_articles']['Row']

interface ArticleFormProps {
  article?: Article
  isEdit?: boolean
}

const categories = [
  { key: 'nguoi_fabbi', label: 'Người Fabbi' },
  { key: 'cac_hoat_dong', label: 'Các hoạt động' },
  { key: 'giai_thuong', label: 'Giải thưởng' },
  { key: 'company_events', label: 'Company Events' },
  { key: 'awards', label: 'Awards' },
  { key: 'tech_updates', label: 'Tech Updates' },
]

const statusOptions = [
  { value: 'draft', label: 'Nháp' },
  { value: 'review', label: 'Chờ duyệt' },
  { value: 'published', label: 'Đã đăng' },
  { value: 'archived', label: 'Lưu trữ' },
]

export default function ArticleForm({ article, isEdit = false }: ArticleFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    body: article?.body || '',
    cover_image_url: article?.cover_image_url || '',
    category: article?.category || '',
    tags: article?.tags?.join(', ') || '',
    status: article?.status || 'draft',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }))
  }

  const handleSubmit = async (e: React.FormEvent, newStatus?: string) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        slug: formData.slug || generateSlug(formData.title),
        status: newStatus || formData.status,
      }

      const url = isEdit && article ? `/api/news/${article.id}` : '/api/news'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save article')
      }

      router.push('/admin/news')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {error && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="article-title" className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
        <input
          id="article-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleTitleChange}
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus-visible:border-[#008b9c] focus-visible:ring-1 focus-visible:ring-[#008b9c] transition-colors"
          placeholder="Nhập tiêu đề bài viết"
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="article-slug" className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
        <input
          id="article-slug"
          type="text"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus-visible:border-[#008b9c] focus-visible:ring-1 focus-visible:ring-[#008b9c] transition-colors"
          placeholder="duong-dan-bai-viet"
        />
        <p id="article-slug-help" className="text-xs text-gray-500 mt-1">URL thân thiện cho bài viết</p>
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="article-excerpt" className="block text-sm font-medium text-gray-700 mb-1">Tóm tắt</label>
        <textarea
          id="article-excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus-visible:border-[#008b9c] focus-visible:ring-1 focus-visible:ring-[#008b9c] transition-colors resize-none"
          placeholder="Mô tả ngắn gọn về bài viết"
        />
      </div>

      {/* Cover Image */}
      <div>
        <label htmlFor="article-cover" className="block text-sm font-medium text-gray-700 mb-1">Ảnh bìa</label>
        <input
          id="article-cover"
          type="url"
          name="cover_image_url"
          value={formData.cover_image_url}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus-visible:border-[#008b9c] focus-visible:ring-1 focus-visible:ring-[#008b9c] transition-colors"
          placeholder="https://example.com/image.jpg"
        />
        {formData.cover_image_url && (
          <div className="mt-2 w-full h-32 rounded-lg overflow-hidden bg-gray-100">
            <img src={formData.cover_image_url} alt="Xem trước ảnh bìa bài viết" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Category & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="article-category" className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
          <div className="relative">
            <select
              id="article-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none focus-visible:border-[#008b9c] focus-visible:ring-1 focus-visible:ring-[#008b9c] transition-colors"
            >
              <option value="">Chọn danh mục</option>
              {categories.map(cat => (
                <option key={cat.key} value={cat.key}>{cat.label}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm" aria-hidden="true">expand_more</span>
          </div>
        </div>

        <div>
          <label htmlFor="article-status" className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
          <div className="relative">
            <select
              id="article-status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm appearance-none focus-visible:border-[#008b9c] focus-visible:ring-1 focus-visible:ring-[#008b9c] transition-colors"
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm" aria-hidden="true">expand_more</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="article-tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
        <input
          id="article-tags"
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus-visible:border-[#008b9c] focus-visible:ring-1 focus-visible:ring-[#008b9c] transition-colors"
          placeholder="fabbi, recruitment, culture"
          aria-describedby="article-tags-help"
        />
        <p id="article-tags-help" className="text-xs text-gray-500 mt-1">Phân cách bằng dấu phẩy</p>
      </div>

      {/* Body */}
      <div>
        <label htmlFor="article-body" className="block text-sm font-medium text-gray-700 mb-1">Nội dung *</label>
        <textarea
          id="article-body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
          rows={15}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus-visible:border-[#008b9c] focus-visible:ring-1 focus-visible:ring-[#008b9c] transition-colors resize-y font-mono"
          placeholder="Nhập nội dung bài viết..."
        />
        <p id="article-body-help" className="text-xs text-gray-500 mt-1">Hỗ trợ HTML cơ bản: &lt;p&gt;, &lt;br&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <Link
          href="/admin/news"
          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 rounded"
        >
          Hủy
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => handleSubmit(e as unknown as React.FormEvent, 'draft')}
            disabled={isSubmitting}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
          >
            Lưu nháp
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#008b9c] text-white rounded-lg text-sm font-medium hover:bg-[#007a8d] transition-colors disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008b9c]"
          >
            {isSubmitting ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Tạo bài viết'}
          </button>
        </div>
      </div>
    </form>
  )
}