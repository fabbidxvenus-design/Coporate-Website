import { requireAdmin } from '@/lib/auth'
import ArticleForm from '@/components/admin/ArticleForm'
import { CmsTopbar } from '@/components/cms'

export const metadata = {
  title: 'Tạo bài viết mới | Fabbi CMS',
}

export default async function NewArticlePage() {
  await requireAdmin()

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 bg-[#fbf9f8]">
        <div className="max-w-[800px] mx-auto space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tạo bài viết mới</h1>
            <p className="text-gray-500 mt-1">Tạo một bài viết mới cho trang tin tức</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <ArticleForm />
          </div>
        </div>
      </div>
    </div>
  )
}