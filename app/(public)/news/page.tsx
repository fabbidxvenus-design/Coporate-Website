import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import { mockNews } from '@/lib/mock-data'
import type { Database } from '@/types/database'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { formatDateAgoEn } from '@/lib/utils'

type Article = Database['public']['Tables']['news_articles']['Row']

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>
}

export const revalidate = 60

export const metadata = {
  title: 'Tin tức | Fabbi',
  description: 'Cập nhật tin tức mới nhất về Fabbi - Công ty cổ phần nghiên cứu và phát triển công nghệ',
}

function buildSearchParams(params: { q?: string; category?: string; page?: string }, updates: Record<string, string | undefined>) {
  const merged = { ...params, ...updates }
  const searchParams = new URLSearchParams()
  if (merged.q) searchParams.set('q', merged.q)
  if (merged.category) searchParams.set('category', merged.category)
  if (merged.page && merged.page !== '1') searchParams.set('page', merged.page)
  return searchParams.toString()
}

const categoryLabels: Record<string, string> = {
  'company_events': 'Company Events',
  'awards': 'Awards',
  'tech_updates': 'Tech Updates',
  'nguoi_fabbi': 'Người Fabbi',
  'cac_hoat_dong': 'Các hoạt động',
  'giai_thuong': 'Giải thưởng',
}

interface ArticleCardProps {
  article: Article
}

function FeaturedArticle({ article }: ArticleCardProps) {
  const categoryLabel = categoryLabels[article.category || ''] || article.category || 'Category'

  return (
    <article className="mb-16 group cursor-pointer">
      <Link href={`/news/${article.slug}`}>
        <div className="overflow-hidden rounded-2xl mb-6 bg-gray-100 aspect-[16/9] relative">
          {article.cover_image_url ? (
            <Image
              alt={article.title}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              src={article.cover_image_url}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#008b9c]/10 to-gray-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-[#008b9c]/30">newspaper</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">{categoryLabel}</span>
          <span className="text-sm text-gray-500 font-medium">{article.published_at ? formatDateAgoEn(article.published_at) : 'Mới đăng'}</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-[#008b9c] transition-colors duration-200">{article.title}</h2>
        <p className="text-gray-500 mb-4 text-lg line-clamp-2">{article.excerpt || ''}</p>
        <span className="inline-flex items-center text-[#008b9c] font-semibold hover:text-[#007a8d] transition-colors duration-200">
          Read more <i className="fa-solid fa-chevron-right ml-1 text-xs"></i>
        </span>
      </Link>
    </article>
  )
}

function ArticleGridCard({ article }: ArticleCardProps) {
  const categoryLabel = categoryLabels[article.category || ''] || article.category || 'Category'

  return (
    <article className="group cursor-pointer">
      <Link href={`/news/${article.slug}`}>
        <div className="overflow-hidden rounded-2xl mb-5 bg-gray-100 aspect-[16/10] relative">
          {article.cover_image_url ? (
            <Image
              alt={article.title}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              src={article.cover_image_url}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#008b9c]/10 to-gray-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-[#008b9c]/30">newspaper</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">{categoryLabel}</span>
          <span className="text-sm text-gray-500 font-medium">{article.published_at ? formatDateAgoEn(article.published_at) : 'Mới đăng'}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#008b9c] transition-colors duration-200 line-clamp-2">{article.title}</h3>
        <p className="text-gray-500 mb-4 text-base line-clamp-2">{article.excerpt || ''}</p>
        <span className="inline-flex items-center text-[#008b9c] font-semibold text-sm hover:text-[#007a8d] transition-colors duration-200">
          Read more <i className="fa-solid fa-chevron-right ml-1 text-xs"></i>
        </span>
      </Link>
    </article>
  )
}

function HorizontalArticleCard({ article }: ArticleCardProps) {
  const categoryLabel = categoryLabels[article.category || ''] || article.category || 'Category'

  return (
    <article className="flex flex-col sm:flex-row gap-6 group cursor-pointer">
      <Link href={`/news/${article.slug}`} className="w-full sm:w-[240px] flex-shrink-0">
        <div className="overflow-hidden rounded-2xl bg-gray-100 aspect-video sm:aspect-[4/3] relative">
          {article.cover_image_url ? (
            <Image
              alt={article.title}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              src={article.cover_image_url}
              sizes="240px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#008b9c]/10 to-gray-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-[#008b9c]/30">newspaper</span>
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-col justify-center py-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-[11px] font-semibold rounded-full uppercase tracking-wider">{categoryLabel}</span>
          <span className="text-xs text-gray-500 font-medium">{article.published_at ? formatDateAgoEn(article.published_at) : 'Mới đăng'}</span>
        </div>
        <Link href={`/news/${article.slug}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-[#008b9c] transition-colors duration-200 line-clamp-2">{article.title}</h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{article.excerpt || ''}</p>
          <span className="inline-flex items-center text-gray-800 font-semibold text-sm hover:text-[#008b9c] transition-colors duration-200 mt-auto">
            Read more <i className="fa-solid fa-chevron-right ml-1 text-[10px]"></i>
          </span>
        </Link>
      </div>
    </article>
  )
}

async function getArticles(searchParams: { q?: string; category?: string; page?: string }) {
  const supabase = await createClient()
  const page = parseInt(searchParams.page || '1')
  const limit = 8

  if (USE_MOCK_DATA || !supabase) {
    let filteredArticles = (mockNews as unknown as Article[]).filter(a => a.status === 'published')
    if (searchParams.q) {
      filteredArticles = filteredArticles.filter(a =>
        a.title.toLowerCase().includes(searchParams.q!.toLowerCase())
      )
    }
    if (searchParams.category) {
      filteredArticles = filteredArticles.filter(a => a.category === searchParams.category)
    }
    const total = filteredArticles.length
    const offset = (page - 1) * limit
    return { articles: filteredArticles.slice(offset, offset + limit), total, page, limit }
  }

  const offset = (page - 1) * limit

  let query = supabase
    .from('news_articles')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (searchParams.q) {
    query = query.ilike('title', `%${searchParams.q}%`)
  }
  if (searchParams.category) {
    query = query.eq('category', searchParams.category)
  }

  const { data, count } = await query

  return { articles: (data || []) as Article[], total: count || 0, page, limit }
}

function NewsSearchForm({ params }: { params: { q?: string; category?: string } }) {
  return (
    <div className="max-w-3xl search-input-wrapper">
      <form className="w-full h-14 pl-6 pr-4 bg-white border border-gray-200 rounded-full text-base shadow-sm flex items-center">
        <i className="fa-solid fa-search text-gray-400 mr-3"></i>
        <input
          type="text"
          name="q"
          defaultValue={params.q || ''}
          className="flex-grow bg-transparent border-none text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0"
          placeholder="Tìm bài viết"
        />
        {params.category && <input type="hidden" name="category" value={params.category} />}
        <button
          type="submit"
          className="bg-[#008b9c] hover:bg-[#007a8d] text-white rounded-full px-6 flex items-center justify-center font-medium transition-colors duration-200 ml-2"
        >
          <i className="fa-solid fa-magnifying-glass mr-2"></i> Tìm kiếm
        </button>
      </form>
    </div>
  )
}

const categories = [
  { key: 'nguoi_fabbi', label: 'Người Fabbi' },
  { key: 'cac_hoat_dong', label: 'Các hoạt động' },
  { key: 'giai_thuong', label: 'Giải thưởng' },
]

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { articles, total, page, limit } = await getArticles(params)
  const totalPages = Math.ceil(total / limit)
  const featuredArticle = articles[0]
  const gridArticles = articles.slice(1, 5)
  const horizontalArticles = articles.slice(5)

  return (
    <div className="flex-grow">
      {/* Title & Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-sm text-gray-500 mb-4 font-medium">Tin tức</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">Tin tức mới nhất về Fabbi</h1>
        <p className="text-lg text-gray-500 mb-8 max-w-2xl">Khám phá những câu chuyện, cập nhật và thành tựu từ Fabbi</p>
        <Suspense fallback={
          <div className="w-full max-w-3xl h-14 bg-gray-100 rounded-full animate-pulse"></div>
        }>
          <NewsSearchForm params={params} />
        </Suspense>
      </section>

      {/* Main Layout Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-gray-50 rounded-2xl p-4 sticky top-28">
              <h3 className="text-lg font-bold text-gray-800 px-4 py-3 mb-2">Tin tức Fabbi</h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.key}>
                    <Link
                      href={`/news${buildSearchParams(params, { category: cat.key, page: undefined }) ? '?' + buildSearchParams(params, { category: cat.key, page: undefined }) : ''}`}
                      className={`block px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
                        params.category === cat.key
                          ? 'bg-gray-200 text-gray-800 font-semibold'
                          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                      }`}
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1">
            {articles.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <i className="fa-solid fa-newspaper text-5xl mb-4 text-gray-300"></i>
                <p className="text-lg">Chưa có bài viết nào</p>
              </div>
            ) : (
              <>
                {/* Featured Article */}
                {featuredArticle && <FeaturedArticle article={featuredArticle} />}

                {/* Article Grid */}
                {gridArticles.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-16">
                    {gridArticles.map((article) => (
                      <ArticleGridCard key={article.id} article={article} />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {page > 1 ? (
                  <Link
                    href={`/news?${buildSearchParams(params, { page: String(page - 1) })}`}
                    className="text-gray-600 hover:text-[#008b9c] text-sm font-medium px-2 transition-colors"
                  >
                    Prev
                  </Link>
                ) : (
                  <span className="text-gray-400 text-sm font-medium px-2 cursor-not-allowed">Prev</span>
                )}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = i + 1
                  return (
                    <Link
                      key={p}
                      href={`/news?${buildSearchParams(params, { page: String(p) })}`}
                      className={`w-8 h-8 rounded text-sm font-medium flex items-center justify-center transition-colors ${
                        p === page
                          ? 'bg-[#008b9c] text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {p}
                    </Link>
                  )
                })}
                {totalPages > 5 && <span className="text-gray-400">...</span>}
                {totalPages > 5 && (
                  <Link
                    href={`/news?${buildSearchParams(params, { page: String(totalPages) })}`}
                    className="w-8 h-8 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium flex items-center justify-center transition-colors"
                  >
                    {totalPages}
                  </Link>
                )}
                {page < totalPages ? (
                  <Link
                    href={`/news?${buildSearchParams(params, { page: String(page + 1) })}`}
                    className="text-gray-600 hover:text-[#008b9c] text-sm font-medium px-2 transition-colors"
                  >
                    Next
                  </Link>
                ) : (
                  <span className="text-gray-400 text-sm font-medium px-2 cursor-not-allowed">Next</span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Notable News Section */}
      {horizontalArticles.length > 0 && (
        <section className="border-t border-gray-100 py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">Tin tức chú ý</h2>
                <p className="text-gray-500 text-lg">Những bài viết nổi bật từ Fabbi</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
              {horizontalArticles.map((article) => (
                <HorizontalArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}