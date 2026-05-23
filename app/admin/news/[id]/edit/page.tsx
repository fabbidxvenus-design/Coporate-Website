import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import ArticleForm from '@/components/admin/ArticleForm'
import type { Database } from '@/types/database'

type Article = Database['public']['Tables']['news_articles']['Row']

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()

  if (USE_MOCK_DATA || !supabase) {
    return { title: 'Sửa bài viết | Fabbi CMS' }
  }

  const { data } = await supabase
    .from('news_articles')
    .select('title')
    .eq('id', id)
    .single<{ title: string }>()

  return {
    title: data ? `Sửa: ${data.title} | Fabbi CMS` : 'Sửa bài viết | Fabbi CMS',
  }
}

async function getArticle(id: string): Promise<Article | null> {
  const supabase = await createClient()

  if (USE_MOCK_DATA || !supabase) {
    return null
  }

  const { data } = await supabase
    .from('news_articles')
    .select('*')
    .eq('id', id)
    .single<Article>()

  return data
}

export default async function EditArticlePage({ params }: PageProps) {
  await requireAdmin()
  const { id } = await params
  const article = await getArticle(id)

  if (!article) {
    notFound()
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 bg-[#fbf9f8]">
        <div className="max-w-[800px] mx-auto space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sửa bài viết</h1>
            <p className="text-gray-500 mt-1">Chỉnh sửa nội dung bài viết</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <ArticleForm article={article} isEdit={true} />
          </div>
        </div>
      </div>
    </div>
  )
}