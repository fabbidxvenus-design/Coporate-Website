import Link from 'next/link'
import type { Database } from '@/types/database'
import { formatDateAgo } from '@/lib/utils'

type Job = Database['public']['Tables']['jobs']['Row']

interface RelatedJobsProps {
  jobs: Job[]
}

interface RelatedJobCardProps {
  job: Job
}

function RelatedJobCard({ job }: RelatedJobCardProps) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="group flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-[#008b9c]/30 hover:shadow-[0_4px_20px_rgba(0,139,156,0.08)] transition-all duration-200"
    >
      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
        <i className="fa-solid fa-briefcase text-xl text-blue-500"></i>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 group-hover:text-[#008b9c] transition-colors line-clamp-1">{job.title}</h4>
        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
          {job.location && (
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-map-pin" aria-hidden="true"></i>
              {job.location}
            </span>
          )}
          <span className="flex items-center gap-1">
            <i className="fa-regular fa-calendar" aria-hidden="true"></i>
            {job.published_at ? formatDateAgo(job.published_at) : 'Mới đăng'}
          </span>
        </div>
      </div>
      <i className="fa-solid fa-chevron-right text-gray-400 shrink-0 group-hover:text-[#008b9c] transition-colors" aria-hidden="true"></i>
    </Link>
  )
}

export function RelatedJobs({ jobs }: RelatedJobsProps) {
  if (jobs.length === 0) return null

  return (
    <section className="pt-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Các Job đang tuyển khác</h2>
      <div className="space-y-4" role="list" aria-label="Related jobs">
        {jobs.map((job) => (
          <RelatedJobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  )
}