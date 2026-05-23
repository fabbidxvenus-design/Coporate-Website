import { requireAdmin } from '@/lib/auth'
import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import { mockJobs, mockNews, mockApplications } from '@/lib/mock-data'
import type { Database } from '@/types/database'
import { APPLICATION_STATUS_LABELS } from '@/lib/utils'

type Job = Database['public']['Tables']['jobs']['Row']
type Application = Database['public']['Tables']['applications']['Row']
type Article = Database['public']['Tables']['news_articles']['Row']

export const metadata = {
  title: 'Dashboard | Fabbi CMS',
}

async function getMetrics() {
  const supabase = await createClient()

  if (USE_MOCK_DATA || !supabase) {
    const publishedJobs = mockJobs.filter(j => j.status === 'published')
    const newApps = mockApplications.filter(a => a.status === 'new')
    const reviewingApps = mockApplications.filter(a => a.status === 'reviewing')
    const publishedNews = mockNews.filter(a => a.status === 'published')
    const recentApps = mockApplications
      .sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
      .slice(0, 5)
      .map(app => ({
        ...app,
        jobs: mockJobs.find(j => j.id === app.job_id) ?? null,
      }))

    return {
      jobsCount: publishedJobs.length,
      newApplicationsCount: newApps.length,
      newsCount: publishedNews.length,
      reviewingCount: reviewingApps.length,
      recentApplications: recentApps,
    }
  }

  // Single parallel query for all counts
  const [{ count: jobsCount }, { count: newsCount }, { data: appStats }] = await Promise.all([
    supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('news_articles').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('applications').select('status'),
  ])

  const newApplicationsCount = ((appStats as unknown as Database['public']['Tables']['applications']['Row'][])?.filter(a => a.status === 'new')?.length || 0)
  const reviewingCount = ((appStats as unknown as Database['public']['Tables']['applications']['Row'][])?.filter(a => a.status === 'reviewing')?.length || 0)

  const { data: recentApplications } = await supabase
    .from('applications')
    .select('*, jobs(title)')
    .order('submitted_at', { ascending: false })
    .limit(5)

  return {
    jobsCount: jobsCount || 0,
    newApplicationsCount,
    newsCount: newsCount || 0,
    reviewingCount,
    recentApplications: recentApplications || [],
  }
}

function formatDateAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Hôm nay'
  if (diffDays === 1) return '1 ngày trước'
  return `${diffDays} ngày trước`
}

export default async function AdminDashboardPage() {
  await requireAdmin()
  const metrics = await getMetrics()

  return (
    <div className="max-w-[1200px] mx-auto">
      <h1 className="text-headline-lg font-bold text-on-surface mb-6">Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-[#008b9c]/10 mb-4 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-[#008b9c]">work</span>
          </div>
          <div className="text-headline-lg font-bold text-on-surface">{metrics.jobsCount}</div>
          <div className="text-body-sm text-on-surface-variant">Vị trí tuyển dụng</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-green-500/10 mb-4 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-green-600">person_add</span>
          </div>
          <div className="text-headline-lg font-bold text-on-surface">{metrics.newApplicationsCount}</div>
          <div className="text-body-sm text-on-surface-variant">Đơn ứng tuyển mới</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 mb-4 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-blue-600">newspaper</span>
          </div>
          <div className="text-headline-lg font-bold text-on-surface">{metrics.newsCount}</div>
          <div className="text-body-sm text-on-surface-variant">Bài viết tin tức</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-yellow-500/10 mb-4 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-yellow-600">visibility</span>
          </div>
          <div className="text-headline-lg font-bold text-on-surface">{metrics.reviewingCount}</div>
          <div className="text-body-sm text-on-surface-variant">Ứng viên đang xem</div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-headline-sm font-bold text-on-surface">Đơn ứng tuyển gần đây</h2>
          <a
            href="/admin/applications"
            className="text-sm text-[#008b9c] hover:text-[#007a89] font-medium flex items-center gap-1"
          >
            Xem tất cả
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </a>
        </div>

        {metrics.recentApplications.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500">
            <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">inbox</span>
            <p>Chưa có đơn ứng tuyển nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ứng viên</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Vị trí</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ngày nộp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {metrics.recentApplications.map((app: Database['public']['Tables']['applications']['Row'] & { jobs?: { title: string } | null }) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{app.full_name}</p>
                        <p className="text-xs text-gray-500">{app.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {app.jobs?.title || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === 'new' ? 'bg-blue-50 text-blue-700' :
                        app.status === 'reviewing' ? 'bg-yellow-50 text-yellow-700' :
                        app.status === 'shortlisted' ? 'bg-green-50 text-green-700' :
                        app.status === 'rejected' ? 'bg-red-50 text-red-700' :
                        'bg-purple-50 text-purple-700'
                      }`}>
                        {APPLICATION_STATUS_LABELS[app.status] || app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateAgo(app.submitted_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}