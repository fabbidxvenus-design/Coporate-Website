import { JobCard } from '@/components/public/JobCard'
import { Job } from '@/lib/db/types'

interface RelatedJobsProps {
  jobs: Job[]
  locale: string
  dict: any
}

export function RelatedJobs({ jobs, locale, dict }: RelatedJobsProps) {
  if (jobs.length === 0) return null

  return (
    <section className="pt-6" data-purpose="related-jobs">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{dict?.jobs?.relatedJobs || (locale === 'vi' ? 'Các job tuyển khác' : '他の求人')}</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            slug={job.slug}
            title={job.title}
            company="Fabbi"
            location={job.location || ''}
            salary={job.salary_min ? `${job.salary_min} - ${job.salary_max} VND` : undefined}
            employmentType={job.employment_type || undefined}
            skills={job.tags}
            postedDays={job.published_at ? Math.floor((Date.now() - new Date(job.published_at).getTime()) / (1000 * 60 * 60 * 24)) : 0}
            locale={locale}
          />
        ))}
      </div>
    </section>
  )
}