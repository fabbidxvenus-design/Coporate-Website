import { jobsRepository } from '@/lib/db/repositories/jobs'
import { notFound } from 'next/navigation'
import { sanitizeAndFormatHtml } from '@/lib/sanitize'
import { formatDateAgo } from '@/lib/utils'
import { JobApplyButton } from '@/components/public/JobApplyButton'
import { JobSidebar } from '@/components/public/JobSidebar'
import { RelatedJobs } from '@/components/public/RelatedJobs'
import { getDictionary, Locale } from '@/lib/i18n'

interface PageProps {
  params: Promise<{ slug: string; locale: string }>
}

export const revalidate = 300

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params
  const jobs = await jobsRepository.findAllPublished()
  const job = jobs.find(j => j.slug === slug)

  if (!job) return { title: locale === 'vi' ? 'Không tìm thấy' : '見つかりませんでした' }
  return {
    title: locale === 'vi' ? `${job.title} | Fabbi Tuyển dụng` : `${job.title} | Fabbi 採用`,
    description: job.description?.slice(0, 160) || `${job.title} - Fabbi`,
  }
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug, locale } = await params
  const dict = getDictionary(locale as Locale)

  const jobs = await jobsRepository.findAllPublished()
  const job = jobs.find(j => j.slug === slug)

  if (!job) {
    notFound()
  }

  const relatedJobs = jobs
    .filter(j => j.id !== job.id && (job.location ? j.location === job.location : true))
    .slice(0, 4)

  return (
    <div className="flex-grow pb-20">
      {/* Hero Banner */}
      <div className="w-full h-[300px] md:h-[400px] mt-8 container mx-auto px-4 max-w-[1200px]">
        <img
          src={job.image || '/images/Summer-Trip-2022.jpg'}
          alt={job.title}
          className="w-full h-full rounded-2xl shadow-sm object-cover"
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
          </div>
        </div>
        <JobApplyButton jobTitle={job.title} locale={locale} />
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
              <button aria-label="Share on Facebook" className="text-blue-600 hover:opacity-80 transition-opacity">
                <i className="fa-brands fa-facebook w-5 h-5"></i>
              </button>
              <button aria-label="Share on Twitter" className="text-blue-400 hover:opacity-80 transition-opacity">
                <i className="fa-brands fa-twitter w-5 h-5"></i>
              </button>
              <button aria-label="Share via Email" className="text-gray-600 hover:opacity-80 transition-opacity">
                <i className="fa-solid fa-envelope w-5 h-5"></i>
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
