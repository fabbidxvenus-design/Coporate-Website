import { newsRepository } from '@/lib/db/repositories/news'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { sanitizeAndFormatHtml } from '@/lib/sanitize'
import { formatDateLocal, formatDateShortLocal } from '@/lib/utils'
import { getDictionary, Locale } from '@/lib/i18n'
import { normalizeLocalImage } from '@/lib/utils/images'

export const revalidate = 300

interface PageProps {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params
  const article = await newsRepository.findBySlug(slug)

  if (!article) return { title: locale === 'vi' ? 'Không tìm thấy' : '見つかりませんでした' }
  return {
    title: locale === 'vi' ? `${article.title} | Fabbi Tin tức` : `${article.title} | Fabbi ニュース`,
    description: article.excerpt || article.title,
  }
}

function calculateReadTime(body: string, locale: string): string {
  const wordsPerMinute = 200
  const wordCount = body.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return locale === 'vi' ? `${minutes} phút đọc` : `${minutes} 分で読めます`
}

const categoryLabels: Record<string, string> = {
  'company_events': 'Company Events',
  'awards': 'Awards',
  'tech_updates': 'Tech Updates',
  'nguoi_fabbi': 'Người Fabbi',
  'cac_hoat_dong': 'Các hoạt động',
  'giai_thuong': 'Giải thưởng',
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug, locale } = await params
  const dict = getDictionary(locale as Locale)
  const article = await newsRepository.findBySlug(slug)

  if (!article || !article.id.startsWith(`${locale}-`)) {
    notFound()
  }

  const allArticles = await newsRepository.findAllPublished()
  const localizedArticles = allArticles.filter((item) => item.id.startsWith(`${locale}-`))
  const relatedArticles = localizedArticles
    .filter(a => a.id !== article.id)
    .slice(0, 3)

  const categoryLabel = categoryLabels[article.category || ''] || article.category || 'Category'
  const readTime = calculateReadTime(article.content, locale)
  const imageUrl = normalizeLocalImage(article.thumbnail_url)

  return (
    <div className="flex-grow pb-20">
      <main className="max-w-[1440px] mx-auto pt-8 pb-20">
        <div className="px-[256px]">
          <nav className="flex items-center text-sm text-gray-600 mb-6">
            <Link className="hover:text-[#008B9C] transition-colors" href={`/${locale}/news`}>{dict.nav.news}</Link>
            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
            </svg>
            <span className="font-medium text-gray-900">{categoryLabel}</span>
          </nav>

          <h1 className="text-[40px] leading-[48px] font-bold text-gray-900 mb-6">{article.title}</h1>

          <div className="flex items-center mb-10">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
              <div className="w-full h-full bg-gradient-to-br from-[#006672] to-[#007a8d] flex items-center justify-center text-white font-semibold">
                {article.author_name ? article.author_name[0] : 'F'}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{article.author_name || 'Fabbi'}</p>
              <p className="text-sm text-gray-600">
                {article.published_at ? formatDateShortLocal(article.published_at) : (locale === 'vi' ? 'Mới đăng' : '新規投稿')} <span className="mx-1">•</span> {readTime}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-[520px] mb-12">
          {imageUrl ? (
            <Image
              alt={article.title}
              fill
              priority
              className="object-cover"
              src={imageUrl}
              sizes="1440px"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#006672]/10 to-gray-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-8xl text-[#008B9C]/30">newspaper</span>
            </div>
          )}
        </div>

        <article className="px-[256px]">
          {article.excerpt && (
            <p className="text-xl text-gray-600 leading-[30px] mb-8 font-medium border-l-4 border-[#FECACA] pl-6 italic bg-[#FDFAF8] py-2">
              {article.excerpt}
            </p>
          )}

          <div
            className="prose prose-lg max-w-none text-gray-600 leading-[26px] [&>h2]:text-[32px] [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mb-6 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-4 [&>p]:text-base [&>p]:leading-[26px] [&>p]:text-gray-600 [&>p]:mb-4"
            dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(article.content) }}
          />

          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="border-t border-gray-200 mt-8 pt-6">
            <p className="text-sm font-medium text-gray-900">
              <i className="fa-regular fa-eye mr-1"></i>
              {locale === 'vi' ? 'Lượt xem' : '閲覧数'}: {article.views || 0}
            </p>
          </div>
        </article>
      </main>


      {relatedArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{locale === 'vi' ? 'Bài viết liên quan' : '関連記事'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((related) => {
              const relImageUrl = normalizeLocalImage(related.thumbnail_url)
              return (
                <article key={related.id} className="group cursor-pointer">
                  <Link href={`/${locale}/news/${related.slug}`}>
                    <div className="overflow-hidden rounded-xl mb-4 bg-gray-100 aspect-[16/10] relative">
                      {relImageUrl ? (
                        <Image
                          alt={related.title}
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          src={relImageUrl}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#006672]/10 to-gray-100 flex items-center justify-center">
                          <span className="material-symbols-outlined text-3xl text-teal-text/30">newspaper</span>
                        </div>
                      )}
                    </div>
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full mb-2">
                      {categoryLabels[related.category || ''] || related.category || 'News'}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#00707e] transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                  </Link>
                </article>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
