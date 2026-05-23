import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import { mockJobs } from '@/lib/mock-data'
import type { Database } from '@/types/database'
import Link from 'next/link'
import { Suspense } from 'react'
import { formatDateAgo, formatSalary, getEmploymentTypeStyle, LOCATION_LABELS, EMPLOYMENT_TYPE_LABELS, formatDateLocal } from '@/lib/utils'

type Job = Database['public']['Tables']['jobs']['Row']

interface PageProps {
  searchParams: Promise<{ q?: string; location?: string; type?: string; page?: string }>
}

export const revalidate = 60

export const metadata = {
  title: 'Tuyển dụng | Fabbi',
  description: 'Khám phá cơ hội nghề nghiệp tại Fabbi - Nơi công nghệ gặp gỡ đổi mới',
}

function buildSearchParams(params: { q?: string; location?: string; type?: string; page?: string }, updates: Record<string, string | undefined>) {
  const merged = { ...params, ...updates }
  const searchParams = new URLSearchParams()
  if (merged.q) searchParams.set('q', merged.q)
  if (merged.location) searchParams.set('location', merged.location)
  if (merged.type) searchParams.set('type', merged.type)
  if (merged.page && merged.page !== '1') searchParams.set('page', merged.page)
  return searchParams.toString()
}

interface JobCardProps {
  job: Job
}

function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <i className="fa-solid fa-briefcase text-3xl text-blue-500"></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 hover:text-[#008b9c] transition-colors cursor-pointer">
              <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <i className="fa-regular fa-calendar"></i>
                {job.published_at ? formatDateAgo(job.published_at) : 'Mới đăng'}
              </span>
              {job.closed_at && (
                <span className="flex items-center gap-1.5">
                  <i className="fa-regular fa-clock"></i>
                  Hết hạn: {formatDateLocal(job.closed_at)}
                </span>
              )}
              {(job.salary_min || job.salary_max) && (
                <span className="flex items-center gap-1.5">
                  <i className="fa-solid fa-dollar-sign"></i>
                  {formatSalary(job.salary_min, job.salary_max)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
          <button className="text-gray-400 hover:text-[#008b9c] p-2">
            <i className="fa-regular fa-bookmark text-xl"></i>
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
          <i className="fa-solid fa-map-pin"></i>
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
          <i className="fa-solid fa-tag"></i> Tag:
          {job.skills.map((tag) => (
            <span key={tag} className="hover:text-[#008b9c] cursor-pointer">{tag}</span>
          ))}
        </div>
      )}
    </div>
  )
}

async function getJobs(searchParams: { q?: string; location?: string; type?: string; page?: string }) {
  const supabase = await createClient()
  const page = parseInt(searchParams.page || '1')
  const limit = 10

  // Use mock data if Supabase is not configured
  if (USE_MOCK_DATA || !supabase) {
    let filteredJobs = mockJobs as Job[]

    // Apply filters
    if (searchParams.q) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(searchParams.q!.toLowerCase())
      )
    }
    if (searchParams.location) {
      filteredJobs = filteredJobs.filter(job => job.location === searchParams.location)
    }
    if (searchParams.type) {
      filteredJobs = filteredJobs.filter(job => job.employment_type === searchParams.type)
    }

    return { jobs: filteredJobs, total: filteredJobs.length, page, limit }
  }

  const offset = (page - 1) * limit
  let query = supabase
    .from('jobs')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (searchParams.q) {
    query = query.ilike('title', `%${searchParams.q}%`)
  }
  if (searchParams.location) {
    query = query.eq('location', searchParams.location)
  }
  if (searchParams.type) {
    query = query.eq('employment_type', searchParams.type)
  }

  const { data, count } = await query

  return { jobs: (data || []) as Job[], total: count || 0, page, limit }
}

function JobsSearchForm({ params }: { params: { q?: string; location?: string } }) {
  return (
    <div className="w-full max-w-3xl bg-white rounded-full shadow-lg p-2 flex flex-col md:flex-row items-center gap-2 relative z-10 border border-gray-100">
      <div className="flex items-center px-4 w-full md:w-48 border-b md:border-b-0 md:border-r border-gray-200 py-2 md:py-0">
        <i className="fa-solid fa-location-dot text-gray-400 mr-2"></i>
        <select
          defaultValue={params.location || ''}
          className="w-full bg-transparent border-none text-gray-600 text-sm focus:ring-0 focus:outline-none appearance-none cursor-pointer"
        >
          <option value="">Tất cả</option>
          <option value="HN">Hà Nội</option>
          <option value="DN">Đà Nẵng</option>
          <option value="HCM">Hồ Chí Minh</option>
          <option value="JP">Japan</option>
        </select>
        <i className="fa-solid fa-chevron-down text-gray-400 text-xs ml-auto"></i>
      </div>
      <div className="flex-grow flex items-center px-4 w-full py-2 md:py-0">
        <form className="w-full" action="/jobs">
          <input
            type="text"
            name="q"
            defaultValue={params.q || ''}
            className="w-full bg-transparent border-none text-sm text-gray-700 placeholder-gray-400 focus:ring-0 focus:outline-none"
            placeholder="Nhập tên công việc tìm kiếm ..."
          />
          {params.location && <input type="hidden" name="location" value={params.location} />}
        </form>
      </div>
      <button
        type="submit"
        formAction="/jobs"
        className="bg-[#008b9c] hover:bg-teal-600 text-white rounded-full px-6 py-2.5 text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap w-full md:w-auto justify-center"
      >
        <i className="fa-solid fa-magnifying-glass"></i> Tìm kiếm
      </button>
    </div>
  )
}

export default async function JobsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { jobs, total, page, limit } = await getJobs(params)
  const totalPages = Math.ceil(total / limit)

  return (
    <>
      {/* Hero Section with Search */}
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
              <span className="text-[#008b9c]">{total} Jobs</span> đang open
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Khám phá cơ hội nghề nghiệp tại Fabbi - Nơi công nghệ gặp gỡ đổi mới
            </p>
          </div>
          <Suspense fallback={
            <div className="w-full max-w-3xl bg-white rounded-full shadow-lg p-2 flex items-center gap-2 border border-gray-100">
              <div className="flex-1 h-10 bg-gray-100 rounded-full animate-pulse"></div>
            </div>
          }>
            <JobsSearchForm params={params} />
          </Suspense>
        </div>
      </section>

      {/* Jobs List & Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Job Listings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Danh sách tuyển dụng</h2>
              {/* Filters */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <Link
                  href={`/jobs${buildSearchParams(params, { type: undefined, page: undefined }) ? '?' + buildSearchParams(params, { type: undefined, page: undefined }) : ''}`}
                  className={`flex items-center gap-2 ${!params.type ? 'font-medium text-gray-700' : ''}`}
                >
                  Tất cả
                </Link>
                <Link
                  href={`/jobs?${buildSearchParams(params, { type: 'Full-time', page: undefined })}`}
                  className={`flex items-center gap-2 ${params.type === 'Full-time' ? 'font-medium text-gray-700' : ''}`}
                >
                  Full Time
                </Link>
                <Link
                  href={`/jobs?${buildSearchParams(params, { type: 'Part-time', page: undefined })}`}
                  className={`flex items-center gap-2 ${params.type === 'Part-time' ? 'font-medium text-gray-700' : ''}`}
                >
                  Part Time
                </Link>
                <Link
                  href={`/jobs?${buildSearchParams(params, { type: 'Freelancer', page: undefined })}`}
                  className={`flex items-center gap-2 ${params.type === 'Freelancer' ? 'font-medium text-gray-700' : ''}`}
                >
                  Freelancer
                </Link>
                <Link
                  href={`/jobs?${buildSearchParams(params, { type: 'Internship', page: undefined })}`}
                  className={`flex items-center gap-2 ${params.type === 'Internship' ? 'font-medium text-gray-700' : ''}`}
                >
                  Internship
                </Link>
              </div>
            </div>

            {/* Job Cards List */}
            <div className="space-y-4">
              {jobs.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl">
                  <i className="fa-solid fa-search text-4xl mb-4"></i>
                  <p>Không tìm thấy công việc phù hợp</p>
                </div>
              ) : (
                jobs.map((job) => <JobCard key={job.id} job={job} />)
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {page > 1 ? (
                  <Link
                    href={`/jobs?${buildSearchParams(params, { page: String(page - 1) })}`}
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
                      href={`/jobs?${buildSearchParams(params, { page: String(p) })}`}
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
                    href={`/jobs?${buildSearchParams(params, { page: String(totalPages) })}`}
                    className="w-8 h-8 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium flex items-center justify-center transition-colors"
                  >
                    {totalPages}
                  </Link>
                )}
                {page < totalPages ? (
                  <Link
                    href={`/jobs?${buildSearchParams(params, { page: String(page + 1) })}`}
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

          {/* Right Column: Sidebar */}
          <aside className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Liên kết</h2>
              <p className="text-gray-500 text-sm mb-4">
                Theo dõi Fabbi trên các nền tảng mạng xã hội để cập nhật tin tuyển dụng mới nhất.
              </p>
              {/* Facebook Widget */}
              <div className="bg-gray-900 rounded-xl overflow-hidden relative shadow-md mb-6">
                <img
                  alt="Facebook Cover"
                  className="w-full h-32 object-cover opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAN9dC-wn9qjRznU2QKp9O2nXOE6RcqpRU4HnhImQ-u9x0UfiumrYcSFIY7n8NQ-Ay0v1nVK-hvgt0Wf1dLPTPWmzG5BwhTdvzGbhXdDacbHqRuQyRq1qF5x-LE93HgK8HzqgRqBC7Aj-M2c8yOmkstMLB728aslhoWBC6eE9l63SqufRNp_Of2OPYRGpNGNHSz4jgumuyWenbK0_RKrB07B2S_PkRza7-bc3XOLGB9a8o67icmfuoL9q-TSoyf010UVZJ4zXxEBs9"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-white p-1">
                    <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.9803 30.6865C18.6657 32.5594 24.7865 29.4624 26.6593 23.777C28.5322 18.0916 25.4352 11.9708 19.7498 10.098C14.0644 8.22513 7.94357 11.3221 6.07073 17.0075C4.19789 22.6929 7.2949 28.8137 12.9803 30.6865Z" fill="#008B9C"/>
                      <path d="M10.7486 9.87329C13.2052 10.6823 15.8492 9.34444 16.6582 6.88785C17.4673 4.43126 16.1294 1.78726 13.6728 0.978233C11.2162 0.169207 8.5722 1.50707 7.76317 3.96366C6.95415 6.42025 8.292 9.06426 10.7486 9.87329Z" fill="#F47F35"/>
                      <path d="M2.37895 19.9888C3.89675 20.4886 5.5303 19.662 6.03009 18.1442C6.52989 16.6264 5.70327 14.9929 4.18546 14.4931C2.66766 13.9933 1.03411 14.8199 0.534313 16.3377C0.0345163 17.8555 0.861139 19.489 2.37895 19.9888Z" fill="#F47F35"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Fabbi JSC</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-700">
                        <i className="fa-brands fa-facebook"></i> Like Page
                      </button>
                      <span className="text-gray-300 text-xs">100K Likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">Quick link</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-gray-600 hover:text-[#008b9c] transition-colors">Trang chủ</Link></li>
                <li><Link href="/about" className="text-gray-600 hover:text-[#008b9c] transition-colors">Về Fabbi</Link></li>
                <li><Link href="/news" className="text-gray-600 hover:text-[#008b9c] transition-colors">Tin tức</Link></li>
                <li><Link href="/apply" className="text-gray-600 hover:text-[#008b9c] transition-colors">Ứng tuyển</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}