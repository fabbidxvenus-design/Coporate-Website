import Link from 'next/link'
import { Job } from '@/lib/db/types'
import { formatSalary } from '@/lib/utils'

interface RelatedJobsProps {
  jobs: Job[]
  locale: string
  dict: any
}

function RelatedJobCard({ job, locale }: { job: Job; locale: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow">
      <div className="flex gap-4 items-start">
        <div className="w-16 h-16 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
          <i className="fa-solid fa-briefcase text-xl text-teal-text" aria-hidden="true"></i>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 hover:text-teal-text transition-colors">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-dollar-sign w-3 h-3" aria-hidden="true"></i>
              {formatSalary(job.salary_min, job.salary_max)}
            </span>
            {job.location && (
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-map-munger-alt w-3 h-3" aria-hidden="true"></i>
                {job.location === 'HN' ? (locale === 'vi' ? 'Hà Nội' : 'ハノイ') :
                  job.location === 'HCM' ? (locale === 'vi' ? 'Hồ Chí Minh' : 'ホーチミン') :
                  job.location === 'DN' ? (locale === 'vi' ? 'Đà Nẵng' : 'ダナン') :
                  job.location === 'JP' ? 'Japan' : job.location}
              </span>
            )}
          </div>
          {job.employment_type && (
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                {job.employment_type}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
        <Link
          href={`/${locale}/jobs/${job.slug}`}
          className="text-teal-text font-medium text-sm hover:underline flex items-center gap-1"
        >
          {locale === 'vi' ? 'Xem chi tiết' : '詳細を見る'}
          <i className="fa-solid fa-arrow-right w-3 h-3" aria-hidden="true"></i>
        </Link>
      </div>
    </div>
  )
}

export function RelatedJobs({ jobs, locale, dict }: RelatedJobsProps) {
  if (jobs.length === 0) return null

  return (
    <section>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{dict?.jobs?.relatedJobs || (locale === 'vi' ? 'Vị trí tương tự' : '相似的ポジション')}</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
        {jobs.map((job) => (
          <li key={job.id}>
            <RelatedJobCard job={job} locale={locale} />
          </li>
        ))}
      </ul>
    </section>
  )
}