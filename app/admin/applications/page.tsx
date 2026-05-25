import { requireAdmin } from '@/lib/auth'
import { applicationsRepository } from '@/lib/db/repositories/applications'
import { jobsRepository } from '@/lib/db/repositories/jobs'
import { Application, Job, ApplicationStatus } from '@/lib/db/types'
import Link from 'next/link'
import { ApplicationStatusBadge } from '@/components/admin/ApplicationDetail'
import { formatDateWithTime, formatFileSize } from '@/lib/utils'

export const metadata = {
  title: 'Quản lý ứng tuyển | Fabbi CMS',
}

async function getApplications() {
  const applications = await applicationsRepository.findAll()
  const jobs = await jobsRepository.findAllPublished()

  return {
    applications: applications.map(app => ({
      ...app,
      jobs: jobs.find(j => j.id === app.job_id) || null
    })),
    total: applications.length,
  }
}

export default async function AdminApplicationsPage() {
  await requireAdmin()
  const { applications, total } = await getApplications()

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 bg-[#fbf9f8]">
        <div className="max-w-[1200px] mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý ứng tuyển</h1>
              <p className="text-gray-500 mt-1">Danh sách ứng viên đã ứng tuyển</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Tổng số</p>
              <p className="text-2xl font-bold text-gray-900">{total}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Mới</p>
              <p className="text-2xl font-bold text-blue-600">{statusCounts['pending'] || 0}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Đang xem</p>
              <p className="text-2xl font-bold text-yellow-600">{statusCounts['reviewing'] || 0}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Phỏng vấn</p>
              <p className="text-2xl font-bold text-green-600">{statusCounts['interview'] || 0}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Từ chối</p>
              <p className="text-2xl font-bold text-red-600">{statusCounts['rejected'] || 0}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ứng viên</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Vị trí</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Trạng thái</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">CV</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ngày nộp</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p>Chưa có đơn ứng tuyển nào</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{app.full_name}</p>
                            <p className="text-sm text-gray-500">{app.email}</p>
                            <p className="text-sm text-gray-500">{app.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {app.jobs ? (
                            <Link href={`/jobs/${app.jobs.slug}`} className="text-teal-text hover:underline">
                              {app.jobs.title}
                            </Link>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <ApplicationStatusBadge status={app.status} />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="material-symbols-outlined text-base">description</span>
                            <span>{app.cv_filename}</span>
                            <span className="text-gray-400">({formatFileSize(app.cv_size || 0)})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDateWithTime(app.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/applications/${app.id}`}
                              className="text-teal-text hover:text-[#007a89] font-medium text-sm flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-base">visibility</span>
                              Xem
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}