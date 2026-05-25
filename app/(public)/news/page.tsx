import { newsRepository } from '@/lib/db/repositories/news'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { formatDateAgoEn } from '@/lib/utils'
import { getDictionary, Locale } from '@/lib/i18n'
import { normalizeLocalImage } from '@/lib/utils/images'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string; category?: string; page?: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'vi' ? 'Tin tức | Fabbi' : 'ニュース | Fabbi',
    description: locale === 'vi'
      ? 'Cập nhật tin tức mới nhất về Fabbi'
      : 'Fabbiに関する最新ニュースをお届けします',
  }
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
  article: any
  locale: string
  readMore: string
}

function FeaturedArticle({ article, locale, readMore }: ArticleCardProps) {
  const categoryLabel = categoryLabels[article.category || ''] || article.category || 'Category'
  const imageUrl = normalizeLocalImage(article.thumbnail_url)

  return (
    <article className="mb-16 group cursor-pointer">
      <Link href={`/${locale}/news/${article.slug}`}>
        <div className="overflow-hidden rounded-2xl mb-6 bg-gray-100 aspect-[16/9] relative">
          {imageUrl ? (
            <Image
              alt={article.title}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              src={imageUrl}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#006672]/10 to-gray-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-teal-text/30">newspaper</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">{categoryLabel}</span>
          <span className="text-sm text-gray-500 font-medium">{article.published_at ? formatDateAgoEn(article.published_at) : (locale === 'vi' ? 'Mới đăng' : '新規投稿')}</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3 group-hover:text-pink transition-colors duration-200">{article.title}</h2>
        <p className="text-gray-500 mb-4 text-lg line-clamp-2">{article.excerpt || ''}</p>
        <span className="inline-flex items-center text-teal-text font-semibold hover:text-pink transition-colors duration-200">
          {readMore} <i className="fa-solid fa-chevron-right ml-1 text-xs"></i>
        </span>
      </Link>
    </article>
  )
}

function ArticleGridCard({ article, locale, readMore }: ArticleCardProps) {
  const categoryLabel = categoryLabels[article.category || ''] || article.category || 'Category'
  const imageUrl = normalizeLocalImage(article.thumbnail_url)

  return (
    <article className="group cursor-pointer">
      <Link href={`/${locale}/news/${article.slug}`}>
        <div className="overflow-hidden rounded-2xl mb-5 bg-gray-100 aspect-[16/10] relative">
          {imageUrl ? (
            <Image
              alt={article.title}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              src={imageUrl}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#006672]/10 to-gray-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-teal-text/30">newspaper</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">{categoryLabel}</span>
          <span className="text-sm text-gray-500 font-medium">{article.published_at ? formatDateAgoEn(article.published_at) : (locale === 'vi' ? 'Mới đăng' : '新規投稿')}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink transition-colors duration-200 line-clamp-2">{article.title}</h3>
        <p className="text-gray-500 mb-4 text-base line-clamp-2">{article.excerpt || ''}</p>
        <span className="inline-flex items-center text-teal-text font-semibold text-sm hover:text-pink transition-colors duration-200">
          {readMore} <i className="fa-solid fa-chevron-right ml-1 text-xs"></i>
        </span>
      </Link>
    </article>
  )
}

function HorizontalArticleCard({ article, locale, readMore }: ArticleCardProps) {
  const categoryLabel = categoryLabels[article.category || ''] || article.category || 'Category'
  const imageUrl = normalizeLocalImage(article.thumbnail_url)

  return (
    <article className="flex flex-col sm:flex-row gap-6 group cursor-pointer">
      <Link href={`/${locale}/news/${article.slug}`} className="w-full sm:w-[240px] flex-shrink-0">
        <div className="overflow-hidden rounded-2xl bg-gray-100 aspect-video sm:aspect-[4/3] relative">
          {imageUrl ? (
            <Image
              alt={article.title}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              src={imageUrl}
              sizes="240px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#006672]/10 to-gray-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-teal-text/30">newspaper</span>
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-col justify-center py-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-[11px] font-semibold rounded-full uppercase tracking-wider">{categoryLabel}</span>
          <span className="text-xs text-gray-500 font-medium">{article.published_at ? formatDateAgoEn(article.published_at) : (locale === 'vi' ? 'Mới đăng' : '新規投稿')}</span>
        </div>
        <Link href={`/${locale}/news/${article.slug}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-pink transition-colors duration-200 line-clamp-2">{article.title}</h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{article.excerpt || ''}</p>
          <span className="inline-flex items-center text-gray-800 font-semibold text-sm hover:text-pink transition-colors duration-200 mt-auto">
            {readMore} <i className="fa-solid fa-chevron-right ml-1 text-[10px]"></i>
          </span>
        </Link>
      </div>
    </article>
  )
}

function NewsSearchForm({ params, locale, dict }: { params: { q?: string; category?: string }, locale: string, dict: any }) {
  return (
    <div className="max-w-3xl search-input-wrapper">
      <form
        className="w-full bg-white rounded-full shadow-lg p-2 flex flex-col md:flex-row items-center gap-2 border border-gray-100"
        action={`/${locale}/news`}
      >
        <div className="flex-grow flex items-center px-4 w-full py-3 md:py-0">
          <i className="fa-solid fa-search text-gray-400 mr-3"></i>
          <input
            type="text"
            name="q"
            defaultValue={params.q || ''}
            className="w-full bg-transparent border-none text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0"
            placeholder={dict.jobs.searchPlaceholder}
          />
        </div>
        {params.category && <input type="hidden" name="category" value={params.category} />}
        <button
          type="submit"
          className="bg-pink hover:bg-pink-700 text-white rounded-full px-8 py-3 text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap w-full md:w-auto justify-center"
        >
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i> {dict.jobs.searchButton}
        </button>
      </form>
    </div>
  )
}

export default async function NewsPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  const sParams = await searchParams
  const dict = getDictionary(locale as Locale)

  // Use repository
  const allArticles = await newsRepository.findAllPublished()

  // Apply filtering
  let filteredArticles = allArticles
  if (sParams.q) {
    filteredArticles = filteredArticles.filter(a =>
      a.title.toLowerCase().includes(sParams.q!.toLowerCase())
    )
  }
  if (sParams.category) {
    filteredArticles = filteredArticles.filter(a => a.category === sParams.category)
  }

  const total = filteredArticles.length
  const limit = 8
  const page = parseInt(sParams.page || '1')
  const totalPages = Math.ceil(total / limit)
  const paginatedArticles = filteredArticles.slice((page - 1) * limit, page * limit)

  const featuredArticle = paginatedArticles[0]
  const gridArticles = paginatedArticles.slice(1, 5)
  const horizontalArticles = paginatedArticles.slice(5)

  const categories = [
    { key: 'nguoi_fabbi', label: locale === 'vi' ? 'Người Fabbi' : 'Fabbiの人々' },
    { key: 'cac_hoat_dong', label: locale === 'vi' ? 'Các hoạt động' : 'さまざまな活動' },
    { key: 'giai_thuong', label: locale === 'vi' ? 'Giải thưởng' : '受賞' },
  ]

  const readMore = dict.news.readMore
  const sidebarTitle = dict.news.sidebarTitle || (locale === 'vi' ? 'Tin tức Fabbi' : 'Fabbiニュース')
  const notableSectionTitle = locale === 'vi' ? 'Tin tức chú ý' : '注目のニュース'
  const notableSectionDesc = locale === 'vi' ? 'Những bài viết nổi bật từ Fabbi' : 'Fabbiからの注目記事'

  return (
    <div className="flex-grow">
      {/* Title & Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-sm text-gray-500 mb-4 font-medium">{dict.nav.news}</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">{dict.news.title}</h1>
        <p className="text-lg text-gray-500 mb-8 max-w-2xl">
          {locale === 'vi'
            ? 'Khám phá những câu chuyện, cập nhật và thành tựu từ Fabbi'
            : 'Fabbiのストーリー、更新、情報をお届けします'}
        </p>
        <Suspense fallback={
          <div className="w-full max-w-3xl h-14 bg-gray-100 rounded-full animate-pulse"></div>
        }>
          <NewsSearchForm params={sParams} locale={locale} dict={dict} />
        </Suspense>
      </section>

      {/* Main Layout Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0" aria-label="Sidebar">
            <div className="bg-gray-50 rounded-2xl p-4 sticky top-28">
              <Link
                href={`/${locale}/news`}
                className={`block px-4 py-3 rounded-xl text-lg transition-colors duration-200 mb-2 ${
                  !sParams.category
                    ? 'bg-pink text-white'
                    : 'text-gray-800 hover:bg-pink/10 hover:text-pink'
                }`}
              >
                {sidebarTitle}
              </Link>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.key}>
                    <Link
                      href={`/${locale}/news${buildSearchParams(sParams, { category: cat.key, page: undefined }) ? '?' + buildSearchParams(sParams, { category: cat.key, page: undefined }) : ''}`}
                      className={`block px-4 py-3 rounded-xl font-medium transition-colors duration-200 ${
                        sParams.category === cat.key
                          ? 'bg-pink text-white'
                          : 'text-gray-500 hover:bg-pink/10 hover:text-pink'
                      }`}
                    >
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {paginatedArticles.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <i className="fa-solid fa-newspaper text-5xl mb-4 text-gray-300"></i>
                <p className="text-lg">{dict.news.emptyState}</p>
              </div>
            ) : (
              <>
                {/* Featured Article */}
                {featuredArticle && <FeaturedArticle article={featuredArticle} locale={locale} readMore={readMore} />}

                {/* Article Grid */}
                {gridArticles.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mb-16">
                    {gridArticles.map((article) => (
                      <ArticleGridCard key={article.id} article={article} locale={locale} readMore={readMore} />
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
                    href={`/${locale}/news?${buildSearchParams(sParams, { page: String(page - 1) })}`}
                    className="text-gray-600 hover:text-pink text-sm font-medium px-2 transition-colors"
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
                      href={`/${locale}/news?${buildSearchParams(sParams, { page: String(p) })}`}
                      className={`w-8 h-8 rounded text-sm font-medium flex items-center justify-center transition-colors ${
                        p === page
                          ? 'bg-pink text-white'
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
                    href={`/${locale}/news?${buildSearchParams(sParams, { page: String(totalPages) })}`}
                    className="w-8 h-8 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium flex items-center justify-center transition-colors"
                  >
                    {totalPages}
                  </Link>
                )}
                {page < totalPages ? (
                  <Link
                    href={`/${locale}/news?${buildSearchParams(sParams, { page: String(page + 1) })}`}
                    className="text-gray-600 hover:text-pink text-sm font-medium px-2 transition-colors"
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
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                  {notableSectionTitle}
                </h2>
                <p className="text-gray-500 text-lg">
                  {notableSectionDesc}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
              {horizontalArticles.map((article) => (
                <HorizontalArticleCard key={article.id} article={article} locale={locale} readMore={readMore} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
