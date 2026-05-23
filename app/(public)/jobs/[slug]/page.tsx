import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import { mockJobs } from '@/lib/mock-data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Database } from '@/types/database'
import { sanitizeAndFormatHtml } from '@/lib/sanitize'
import { formatDateAgo, formatDateLocal } from '@/lib/utils'
import { JobSidebar } from '@/components/public/JobSidebar'
import { RelatedJobs } from '@/components/public/RelatedJobs'
import { getDictionary, Locale } from '@/lib/i18n'

export const revalidate = 300

type Job = Database['public']['Tables']['jobs']['Row']

interface PageProps {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params
  const job = await getJob(slug)
  if (!job) return { title: locale === 'vi' ? 'Không tìm thấy' : '見つかりませんでした' }
  return {
    title: locale === 'vi' ? `${job.title} | Fabbi Tuyển dụng` : `${job.title} | Fabbi 採用`,
    description: job.description?.slice(0, 160) || `${job.title} - Fabbi`,
  }
}

async function getJob(slug: string): Promise<Job | null> {
  const supabase = await createClient()

  if (USE_MOCK_DATA || !supabase) {
    return (mockJobs as Job[]).find(job => job.slug === slug) || null
  }

  const { data } = await supabase
    .from('jobs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return data as Job | null
}

async function getRelatedJobs(currentId: string, location?: string): Promise<Job[]> {
  const supabase = await createClient()

  if (USE_MOCK_DATA || !supabase) {
    let related = (mockJobs as Job[]).filter(job => job.id !== currentId)
    if (location) {
      related = related.filter(job => job.location === location)
    }
    return related.slice(0, 4)
  }

  let query = supabase
    .from('jobs')
    .select('*')
    .eq('status', 'published')
    .neq('id', currentId)
    .limit(4)

  if (location) {
    query = query.eq('location', location)
  }

  const { data } = await query
  return (data || []) as Job[]
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug, locale } = await params
  const dict = getDictionary(locale as Locale)
  const job = await getJob(slug)

  if (!job) {
    notFound()
  }

  const relatedJobs = await getRelatedJobs(job.id, job.location || undefined)

  return (
    <div className="flex-grow pb-20">
      {/* Hero Banner */}
      <div className="w-full h-[300px] md:h-[400px] mt-8 container mx-auto px-4 max-w-[1200px]">
        <div
          className="w-full h-full rounded-2xl shadow-sm bg-gradient-to-br from-[#006672]/10 via-gray-100 to-[#006672]/20"
          style={{ minHeight: '300px' }}
        />
      </div>

      {/* Job Header Info */}
      <div className="container mx-auto px-4 max-w-[1200px] mt-8 mb-8 border-b border-gray-200 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{job.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <i className="fa-regular fa-calendar w-4 h-4"></i>
              {locale === 'vi' ? 'Ngày đăng' : '投稿日'}: {job.published_at ? formatDateAgo(job.published_at) : (locale === 'vi' ? 'Mới đăng' : '新規投稿')}
            </span>
            {job.closed_at && (
              <span className="flex items-center gap-1.5">
                <i className="fa-regular fa-clock w-4 h-4"></i>
                {locale === 'vi' ? 'Ngày hết hạn ứng tuyển' : '応募期限'}: {formatDateLocal(job.closed_at)}
              </span>
            )}
          </div>
        </div>
        <Link
          href={`/${locale}/apply?job=${job.slug}`}
          className="bg-[#006672] hover:bg-[#005560] hover:text-white font-medium py-3 px-8 rounded-lg flex items-center gap-2 transition-colors shrink-0"
        >
          <i className="fa-solid fa-check-circle w-5 h-5"></i>
          {locale === 'vi' ? 'NỘP HỒ SƠ' : '応募する'}
        </Link>
      </div>

      {/* Main Grid Layout */}
      <div className="container mx-auto px-4 max-w-[1200px] grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Job Details */}
        <div className="lg:col-span-2 space-y-10">
          {/* Section: Mô tả công việc */}
          {job.description && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{locale === 'vi' ? 'Mô tả công việc' : '職務内容'}</h2>
              <div
                className="text-gray-600 leading-relaxed text-[15px] prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(job.description) }}
              />
            </section>
          )}

          {/* Section: Yêu cầu công việc */}
          {job.requirements && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{locale === 'vi' ? 'Yêu cầu công việc' : '応募要件'}</h2>
              <div
                className="text-gray-600 leading-relaxed text-[15px] prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(job.requirements) }}
              />
            </section>
          )}

          {/* Section: Quyền lợi */}
          {job.benefits && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{locale === 'vi' ? 'Quyền lợi' : '福利厚生'}</h2>
              <div
                className="text-gray-600 leading-relaxed text-[15px] prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: sanitizeAndFormatHtml(job.benefits) }}
              />
            </section>
          )}

          {/* Action Bar */}
          <div className="flex items-center justify-between py-6 border-t border-b border-gray-100">
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
              <i className="fa-solid fa-bookmark w-4 h-4"></i>
              Save Job
            </button>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="">Share this job:</span>
              <button className="text-blue-600 hover:opacity-80 transition-opacity">
                <i className="fa-brands fa-facebook w-5 h-5"></i>
              </button>
              <button className="text-blue-400 hover:opacity-80 transition-opacity">
                <i className="fa-brands fa-twitter w-5 h-5"></i>
              </button>
            </div>
          </div>

          {/* Section: Related Jobs */}
          {relatedJobs.length > 0 && <RelatedJobs jobs={relatedJobs} locale={locale} dict={dict} />}
        </div>

        {/* Right Column: Sidebar */}
        <JobSidebar job={job} locale={locale} dict={dict} />
      </div>
    </div>
  )
}