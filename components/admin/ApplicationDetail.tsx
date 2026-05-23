'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Database } from '@/types/database'
import { formatDateWithTime, formatFileSize } from '@/lib/utils'

type Application = Database['public']['Tables']['applications']['Row']
type Job = Database['public']['Tables']['jobs']['Row']

type ApplicationWithJob = Application & { jobs: Job | null }

interface ApplicationDetailProps {
  id: string
}

export function ApplicationStatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
    new: { label: 'Mới', bg: 'bg-blue-50', text: 'text-blue-700' },
    reviewing: { label: 'Đang xem', bg: 'bg-yellow-50', text: 'text-yellow-700' },
    shortlisted: { label: 'Trúng tuyển', bg: 'bg-green-50', text: 'text-green-700' },
    rejected: { label: 'Từ chối', bg: 'bg-red-50', text: 'text-red-700' },
    hired: { label: 'Đã tuyển', bg: 'bg-purple-50', text: 'text-purple-700' },
  }

  const config = statusConfig[status] || statusConfig.new

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}

export default function ApplicationDetail({ id }: ApplicationDetailProps) {
  const router = useRouter()
  const [application, setApplication] = useState<ApplicationWithJob | null>(null)
  const [cvUrl, setCvUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const statuses = [
    { value: 'new', label: 'Mới', color: 'bg-blue-50 text-blue-700' },
    { value: 'reviewing', label: 'Đang xem', color: 'bg-yellow-50 text-yellow-700' },
    { value: 'shortlisted', label: 'Trúng tuyển', color: 'bg-green-50 text-green-700' },
    { value: 'rejected', label: 'Từ chối', color: 'bg-red-50 text-red-700' },
    { value: 'hired', label: 'Đã tuyển', color: 'bg-purple-50 text-purple-700' },
  ]

  useEffect(() => {
    async function loadApplication() {
      try {
        const res = await fetch(`/api/applications/${id}`)
        if (!res.ok) throw new Error('Failed to load application')

        const data = await res.json()
        setApplication(data.data)
        setCvUrl(data.cvUrl)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    loadApplication()
  }, [id])

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!res.ok) throw new Error('Failed to update status')

      setApplication(prev => prev ? { ...prev, status: newStatus as Application['status'] } : null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#008b9c]"></div>
      </div>
    )
  }

  if (error || !application) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || 'Application not found'}</p>
        <Link href="/admin/applications" className="text-[#008b9c] hover:underline mt-4 inline-block">
          Quay lại danh sách
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[800px] mx-auto">
      {/* Back Link */}
      <Link
        href="/admin/applications"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#008b9c] mb-6"
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        Quay lại danh sách
      </Link>

      {error && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <span>{error}</span>
        </div>
      )}

      {/* Application Info */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{application.full_name}</h1>
            <p className="text-gray-500 mt-1">Mã hồ sơ: {application.id}</p>
          </div>
          <div role="status" aria-live="polite" aria-atomic="true">
            <ApplicationStatusBadge status={application.status} />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
            <p className="text-gray-900">{application.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Số điện thoại</label>
            <p className="text-gray-900">{application.phone}</p>
          </div>
        </div>

        {/* Job */}
        {application.jobs && (
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Vị trí ứng tuyển</label>
            <Link href={`/jobs/${application.jobs.slug}`} className="text-[#008b9c] hover:underline font-medium">
              {application.jobs.title}
            </Link>
          </div>
        )}

        {/* Portfolio */}
        {application.portfolio_url && (
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Portfolio</label>
            <a href={application.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-[#008b9c] hover:underline">
              {application.portfolio_url}
            </a>
          </div>
        )}

        {/* Message */}
        {application.message && (
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Tin nhắn</label>
            <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{application.message}</p>
          </div>
        )}

        {/* CV */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">CV</label>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <span className="material-symbols-outlined text-4xl text-gray-400" aria-hidden="true">description</span>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{application.cv_file_name}</p>
              <p className="text-sm text-gray-500">{formatFileSize(application.cv_file_size)}</p>
            </div>
            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#008b9c] text-white rounded-lg text-sm font-medium hover:bg-[#007a89] flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">download</span>
                Tải CV
              </a>
            )}
          </div>
        </div>

        {/* Timestamps */}
        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Ngày nộp</label>
            <p className="text-gray-900">{formatDateWithTime(application.submitted_at)}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Cập nhật cuối</label>
            <p className="text-gray-900">{formatDateWithTime(application.updated_at)}</p>
          </div>
        </div>

        {/* Status Update */}
        <div className="pt-4 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">Cập nhật trạng thái</label>
          <div className="flex flex-wrap gap-2">
            {statuses.map(status => (
              <button
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
                disabled={updating || application.status === status.value}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  application.status === status.value
                    ? status.color
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } disabled:opacity-50`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}