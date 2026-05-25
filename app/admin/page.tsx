import { requireAdmin } from '@/lib/auth'
import { getCmsDashboardMetrics, getCmsActivities } from '@/lib/cms/data-source'

export const metadata = {
  title: 'Dashboard | Fabbi CMS',
}

async function getDashboardData() {
  const metrics = getCmsDashboardMetrics()
  const activities = getCmsActivities().slice(0, 5)
  return { metrics, activities }
}

function formatDateAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Hôm nay'
  if (diffDays === 1) return '1 ngày trước'
  return `${diffDays} ngày trước`
}

function getActivityIcon(type: string): string {
  const icons: Record<string, string> = {
    job_published: 'work',
    job_created: 'add_circle',
    job_updated: 'edit',
    job_closed: 'cancel',
    news_published: 'newspaper',
    news_draft_created: 'draft',
    application_submitted: 'person_add',
    application_status_changed: 'sync',
    settings_updated: 'settings',
    admin_signin: 'login',
    admin_signout: 'logout',
  }
  return icons[type] || 'info'
}

export default async function AdminDashboardPage() {
  await requireAdmin()
  const { metrics, activities } = await getDashboardData()

  return (
    <div className="max-w-[1200px] mx-auto">
      <h1 className="text-headline-lg font-bold text-on-surface mb-6">Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-[#006672]/10 mb-4 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-teal-text">work</span>
          </div>
          <div className="text-headline-lg font-bold text-on-surface">{metrics.totalJobs}</div>
          <div className="text-body-sm text-on-surface-variant">Vị trí tuyển dụng</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-green-500/10 mb-4 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-green-600">person_add</span>
          </div>
          <div className="text-headline-lg font-bold text-on-surface">{metrics.newApplications}</div>
          <div className="text-body-sm text-on-surface-variant">Đơn ứng tuyển mới</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 mb-4 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-blue-600">newspaper</span>
          </div>
          <div className="text-headline-lg font-bold text-on-surface">{metrics.totalNews}</div>
          <div className="text-body-sm text-on-surface-variant">Bài viết tin tức</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-yellow-500/10 mb-4 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-yellow-600">visibility</span>
          </div>
          <div className="text-headline-lg font-bold text-on-surface">{metrics.totalApplications}</div>
          <div className="text-body-sm text-on-surface-variant">Tổng đơn ứng tuyển</div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-headline-sm font-bold text-on-surface">Nhật ký hoạt động</h2>
        </div>
        {activities.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500">
            <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">history</span>
            <p>Chưa có hoạt động nào</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {activities.map((activity) => (
              <div key={activity.id} className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50">
                <span className="material-symbols-outlined text-xl text-teal-text mt-0.5">
                  {getActivityIcon(activity.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.message.vi}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {activity.actor} · {formatDateAgo(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Recent Applications placeholder */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-headline-sm font-bold text-on-surface">Đơn ứng tuyển gần đây</h2>
          <a
            href="/admin/applications"
            className="text-sm text-teal-text hover:text-[#007a89] font-medium flex items-center gap-1"
          >
            Xem tất cả
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </a>
        </div>

        <div className="px-6 py-12 text-center text-gray-500">
          <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">inbox</span>
          <p>Chưa có đơn ứng tuyển nào</p>
          <p className="text-xs text-gray-400 mt-1">Kết nối database để xem danh sách đầy đủ</p>
        </div>
      </div>
    </div>
  )
}