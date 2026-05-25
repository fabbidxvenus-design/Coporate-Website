import Link from 'next/link'
import { Job } from '@/lib/db/types'
import { formatDateAgo } from '@/lib/utils'

interface RelatedJobsProps {
  jobs: Job[]
  locale: string
  dict: any
}

function RelatedJobCard({ job, locale }: { job: Job; locale: string }) {
  return (
    <Link
      href={`/${locale}/jobs/${job.slug}`}
      className="group flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(0,139,156,0.08)] transition-all duration-200"
    >
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
        <i className="fa-solid fa-briefcase text-xl text-blue-500"></i>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 group-hover:text-pink transition-colors line-clamp-1">{job.title}</h4>
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
          {job.location && (
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-map-pin" aria-hidden="true"></i>
              {job.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <i className="fa-regular fa-calendar" aria-hidden="true"></i>
            {job.published_at ? formatDateAgo(job.published_at) : (locale === 'vi' ? 'Mới đăng' : '新規投稿')}
          </span>
        </div>
      </div>
      <i className="fa-solid fa-chevron-right text-gray-400 shrink-0 group-hover:text-pink transition-colors" aria-hidden="true"></i>
    </Link>
  )
}

export function RelatedJobs({ jobs, locale, dict }: RelatedJobsProps) {
  if (jobs.length === 0) return null

  return (
    <section className="pt-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{dict?.jobs?.relatedJobs || 'Related Jobs'}</h2>
      <div className="space-y-4" role="list" aria-label="Related jobs">
        {jobs.map((job) => (
          <RelatedJobCard key={job.id} job={job} locale={locale} />
        ))}
      </div>
    </section>
  )
}