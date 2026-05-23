'use client'

import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database'
import { formatDateAgo, formatSalary, getEmploymentTypeStyle, LOCATION_LABELS, EMPLOYMENT_TYPE_LABELS, formatDateLocal } from '@/lib/utils'

type Job = Database['public']['Tables']['jobs']['Row']

interface JobsSearchProps {
  initialJobs: Job[]
  location: string
  query: string
}

function JobsSearch({ initialJobs, location: initialLocation, query: initialQuery }: JobsSearchProps) {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState(initialQuery)
  const [selectedLocation, setSelectedLocation] = useState(initialLocation)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchInput) params.set('q', searchInput)
    if (selectedLocation) params.set('location', selectedLocation)
    router.push(`/jobs${params.toString() ? '?' + params.toString() : ''}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <form role="search" aria-label="Tìm việc làm" className="w-full max-w-3xl bg-white rounded-full shadow-lg p-2 flex flex-col md:flex-row items-center gap-2 relative z-10 border border-gray-100" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
      <label htmlFor="job-location" className="sr-only">Địa điểm</label>
      <div className="flex items-center px-4 w-full md:w-48 border-b md:border-b-0 md:border-r border-gray-200 py-2 md:py-0">
        <i className="fa-solid fa-location-dot text-gray-400 mr-2" aria-hidden="true"></i>
        <select
          id="job-location"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full bg-transparent border-none text-gray-600 text-sm focus-visible:ring-2 focus-visible:ring-[#008b9c] focus-visible:ring-offset-2 appearance-none cursor-pointer"
        >
          <option value="">Tất cả</option>
          <option value="HN">Hà Nội</option>
          <option value="DN">Đà Nẵng</option>
          <option value="HCM">Hồ Chí Minh</option>
          <option value="JP">Japan</option>
        </select>
        <i className="fa-solid fa-chevron-down text-gray-400 text-xs ml-auto" aria-hidden="true"></i>
      </div>
      <label htmlFor="job-search" className="sr-only">Từ khóa công việc</label>
      <div className="flex-grow flex items-center px-4 w-full py-2 md:py-0">
        <input
          id="job-search"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none text-sm text-gray-700 placeholder-gray-400 focus-visible:ring-2 focus-visible:ring-[#008b9c] focus-visible:ring-offset-2"
          placeholder="Nhập tên công việc tìm kiếm ..."
        />
      </div>
      <button
        type="submit"
        className="bg-[#008b9c] hover:bg-teal-600 text-white rounded-full px-6 py-2.5 text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap w-full md:w-auto justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008b9c]"
      >
        <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i> Tìm kiếm
      </button>
    </form>
  )
}

interface JobCardProps {
  job: Job
}

function JobListCard({ job }: JobCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <i className="fa-solid fa-briefcase text-3xl text-blue-500" aria-hidden="true"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 hover:text-[#008b9c] transition-colors cursor-pointer">
              <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <i className="fa-regular fa-calendar" aria-hidden="true"></i>
                {job.published_at ? formatDateAgo(job.published_at) : 'Mới đăng'}
              </span>
              {job.closed_at && (
                <span className="flex items-center gap-1.5">
                  <i className="fa-regular fa-clock" aria-hidden="true"></i>
                  Hết hạn: {formatDateLocal(job.closed_at)}
                </span>
              )}
              {(job.salary_min || job.salary_max) && (
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-dollar-sign" aria-hidden="true"></i>
                  {formatSalary(job.salary_min, job.salary_max)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
          <button className="text-gray-400 hover:text-[#008b9c] p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008b9c] rounded" aria-label={`Lưu việc ${job.title}`}>
            <i className="fa-regular fa-bookmark text-xl" aria-hidden="true"></i>
          </button>
          <Link
            href={`/jobs/${job.slug}`}
            className="bg-[#008b9c] hover:bg-teal-600 text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors w-full md:w-auto text-center"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
      {job.location && (
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
          <i className="fa-solid fa-map-pin" aria-hidden="true"></i>
          {LOCATION_LABELS[job.location] || job.location}
        </div>
      )}
      {job.employment_type && (
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEmploymentTypeStyle(job.employment_type)}`}>
            {job.employment_type}
          </span>
        </div>
      )}
      {job.skills && job.skills.length > 0 && (
        <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <i className="fa-solid fa-tag" aria-hidden="true"></i> Tag:
          {job.skills.map((tag) => (
            <span key={tag} className="hover:text-[#008b9c] cursor-pointer">{tag}</span>
          ))}
        </div>
      )}
    </div>
  )
}

interface JobsContentProps {
  jobs: Job[]
}

function JobsContent({ jobs }: JobsContentProps) {
  return (
    <div className="space-y-4">
      {jobs.length === 0 ? (
        <div role="status" aria-live="polite" className="text-center py-12 text-gray-500">
          <i className="fa-solid fa-search text-4xl mb-4" aria-hidden="true"></i>
          <p>Không tìm thấy công việc phù hợp</p>
        </div>
      ) : (
        jobs.map((job) => <JobListCard key={job.id} job={job} />)
      )}
    </div>
  )
}

export default function JobsSearchSection({ initialJobs, location, query }: JobsSearchProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div
        className="rounded-3xl overflow-hidden relative flex flex-col items-center py-16 px-4 md:px-8"
        style={{
          backgroundColor: '#E6F7FA',
          backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC7wQy0pvL3l450Ue5ausCEMcD9ObKYu-XuoyY4ODl7m0WNoZipT9yOwLSNGjJSzpojo6R1JA0KJxDmSxrGIwxlY4dUVLj8r6fQrSlvPowxP8jvNKDdh_dRMTnuo7_j8e41BtwxUfej0mUJCzRS4ys7Xk6Skwv1RV_bs_eebktDwID3C9IPeHYEabba6Z-LwFoWgjB1l95UoNan-w2n0iPL9Rwk3rKhIOMLJoQbo6zDVs4YxJhTabqXpfVM8p7Y09zQYxixAzNmkuwl")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center max-w-2xl relative z-10 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            <span className="text-[#008b9c]">{initialJobs.length} Jobs</span> đang open
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Khám phá cơ hội nghề nghiệp tại Fabbi - Nơi công nghệ gặp gỡ đổi mới
          </p>
        </div>
        <JobsSearch initialJobs={initialJobs} location={location} query={query} />
      </div>
    </section>
  )
}

export { JobsContent, JobListCard }