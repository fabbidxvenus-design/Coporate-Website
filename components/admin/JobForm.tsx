'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Job } from '@/lib/db/types'

interface JobFormProps {
  job?: Job
  isEdit?: boolean
}

const employmentTypes = [
  { value: 'full-time', label: 'Toàn thời gian' },
  { value: 'part-time', label: 'Bán thời gian' },
  { value: 'contract', label: 'Hợp đồng' },
  { value: 'internship', label: 'Thực tập' },
]

const statusOptions = [
  { value: 'draft', label: 'Nháp' },
  { value: 'review', label: 'Chờ duyệt' },
  { value: 'published', label: 'Đã đăng' },
  { value: 'closed', label: 'Đã đóng' },
]

export default function JobForm({ job, isEdit = false }: JobFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: job?.title || '',
    slug: job?.slug || '',
    description: job?.description || '',
    requirements: job?.requirements || '',
    benefits: job?.benefits || '',
    salary_min: job?.salary_min || '',
    salary_max: job?.salary_max || '',
    location: job?.location || '',
    employment_type: job?.employment_type || 'full-time',
    skills: job?.skills?.join(', ') || '',
    tags: job?.tags?.join(', ') || '',
    status: job?.status || 'draft',
    department: job?.department || '',
    currency: job?.currency || 'VND',
    summary: job?.summary || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const submitData = {
        ...formData,
        salary_min: formData.salary_min ? Number(formData.salary_min) : null,
        salary_max: formData.salary_max ? Number(formData.salary_max) : null,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      }

      const url = isEdit && job ? `/api/jobs/${job.id}` : '/api/jobs'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save job')
      }

      router.push('/admin/jobs')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      {error && <div className="p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tiêu đề</label>
          <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slug</label>
          <input name="slug" value={formData.slug} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mô tả</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded h-32" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Lương tối thiểu</label>
          <input name="salary_min" type="number" value={formData.salary_min} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lương tối đa</label>
          <input name="salary_max" type="number" value={formData.salary_max} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
                {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hình thức</label>
            <select name="employment_type" value={formData.employment_type} onChange={handleChange} className="w-full p-2 border rounded">
                {employmentTypes.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
      </div>

      <div className="flex justify-end gap-4">
        <button type="button" onClick={() => router.back()} className="px-4 py-2 text-gray-600">Hủy</button>
        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-[#008B9C] text-white rounded">
          {isSubmitting ? 'Đang lưu...' : 'Lưu công việc'}
        </button>
      </div>
    </form>
  )
}
