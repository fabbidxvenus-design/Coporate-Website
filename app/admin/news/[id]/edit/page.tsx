import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { newsRepository } from '@/lib/db/repositories/news'
import ArticleForm from '@/components/admin/ArticleForm'
import { NewsArticle } from '@/lib/db/types'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const article = await newsRepository.findById(id)

  return {
    title: article ? `Sửa: ${article.title} | Fabbi CMS` : 'Sửa bài viết | Fabbi CMS',
  }
}

interface ArticleForForm extends NewsArticle {
  body: string
  author_id: string | null
}

async function getArticle(id: string): Promise<ArticleForForm | null> {
  const article = await newsRepository.findById(id)
  if (!article) return null
  return {
    ...article,
    body: (article as any).content || '',
    author_id: (article as any).author_id || null
  }
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
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sửa bài viết</h1>
            <p className="text-gray-500 mt-1">Chỉnh sửa nội dung bài viết</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <ArticleForm article={article as any} isEdit={true} />
          </div>
        </div>
      </div>
    </div>
  )
}