import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import { mockJobs } from '@/lib/mock-data'
import type { Database } from '@/types/database'
import Link from 'next/link'
import { Suspense } from 'react'
import { formatDateAgo, formatSalary, getEmploymentTypeStyle, LOCATION_LABELS, EMPLOYMENT_TYPE_LABELS, formatDateLocal } from '@/lib/utils'
import { getDictionary, Locale } from '@/lib/i18n'
import { JobCard } from '@/components/public/JobCard'

type Job = Database['public']['Tables']['jobs']['Row']

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string; location?: string; type?: string; page?: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'vi' ? 'Tuyển dụng | Fabbi' : '採用情報 | Fabbi',
    description: locale === 'vi'
      ? 'Khám phá cơ hội nghề nghiệp tại Fabbi - Nơi công nghệ gặp gỡ đổi mới'
      : 'Fabbiでのキャリア機会を探る - テクノロジーがイノベーションと出会う場所',
  }
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

function JobsSearchForm({ params, locale, dict }: { params: { q?: string; location?: string }, locale: string, dict: any }) {
  return (
    <div className="w-full max-w-3xl bg-white rounded-full shadow-lg p-2 flex flex-col md:flex-row items-center gap-2 relative z-10 border border-gray-100">
      <div className="flex items-center px-4 w-full md:w-48 border-b md:border-b-0 md:border-r border-gray-200 py-2 md:py-0">
        <i className="fa-solid fa-location-dot text-gray-400 mr-2"></i>
        <select
          defaultValue={params.location || ''}
          aria-label={dict.jobs.allLocations}
          className="w-full bg-transparent border-none text-gray-600 text-sm focus:ring-0 focus:outline-none appearance-none cursor-pointer"
        >
          <option value="">{dict.jobs.allLocations}</option>
          <option value="HN">Hà Nội</option>
          <option value="DN">Đà Nẵng</option>
          <option value="HCM">Hồ Chí Minh</option>
          <option value="JP">Japan</option>
        </select>
        <i className="fa-solid fa-chevron-down text-gray-400 text-xs ml-auto"></i>
      </div>
      <div className="flex-grow flex items-center px-4 w-full py-2 md:py-0">
        <form className="w-full" action={`/${locale}/jobs`}>
          <input
            type="text"
            name="q"
            defaultValue={params.q || ''}
            className="w-full bg-transparent border-none text-sm text-gray-700 placeholder-gray-400 focus:ring-0 focus:outline-none"
            placeholder={dict.jobs.searchPlaceholder}
          />
          {params.location && <input type="hidden" name="location" value={params.location} />}
        </form>
      </div>
      <button
        type="submit"
        formAction={`/${locale}/jobs`}
        className="bg-[#006672] text-white hover:bg-[#005560] rounded-full px-6 py-2.5 text-sm font-bold transition-colors flex items-center gap-2 whitespace-nowrap w-full md:w-auto justify-center"
      >
        <i className="fa-solid fa-magnifying-glass"></i> {dict.jobs.searchButton}
      </button>
    </div>
  )
}

export default async function JobsPage({ params, searchParams }: PageProps) {
  const { locale } = await params
  const sParams = await searchParams
  const dict = getDictionary(locale as Locale)
  const { jobs, total, page, limit } = await getJobs(sParams)
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
              <span className="text-teal-text">{total} Jobs</span> {locale === 'vi' ? 'đang open' : '募集中'}
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              {locale === 'vi'
                ? 'Khám phá cơ hội nghề nghiệp tại Fabbi - Nơi công nghệ gặp gỡ đổi mới'
                : 'Fabbiでのキャリア機会を探る - テクノロジーがイノベーションと出会う場所'}
            </p>
          </div>
          <Suspense fallback={
            <div className="w-full max-w-3xl bg-white rounded-full shadow-lg p-2 flex items-center gap-2 border border-gray-100">
              <div className="flex-1 h-10 bg-gray-100 rounded-full animate-pulse"></div>
            </div>
          }>
            <JobsSearchForm params={sParams} locale={locale} dict={dict} />
          </Suspense>
        </div>
      </section>

      {/* Jobs List & Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Job Listings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">{dict.jobs.title}</h2>
              {/* Filters */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <Link
                  href={`/${locale}/jobs${buildSearchParams(sParams, { type: undefined, page: undefined }) ? '?' + buildSearchParams(sParams, { type: undefined, page: undefined }) : ''}`}
                  className={`flex items-center gap-2 ${!sParams.type ? 'font-medium text-gray-700' : 'text-gray-600 hover:text-teal-text'}`}
                >
                  {dict.jobs.allCategories}
                </Link>
                <Link
                  href={`/${locale}/jobs?${buildSearchParams(sParams, { type: 'Full-time', page: undefined })}`}
                  className={`flex items-center gap-2 ${sParams.type === 'Full-time' ? 'font-medium text-gray-700' : 'text-gray-600 hover:text-teal-text'}`}
                >
                  Full Time
                </Link>
                <Link
                  href={`/${locale}/jobs?${buildSearchParams(sParams, { type: 'Part-time', page: undefined })}`}
                  className={`flex items-center gap-2 ${sParams.type === 'Part-time' ? 'font-medium text-gray-700' : 'text-gray-600 hover:text-teal-text'}`}
                >
                  Part Time
                </Link>
                <Link
                  href={`/${locale}/jobs?${buildSearchParams(sParams, { type: 'Freelancer', page: undefined })}`}
                  className={`flex items-center gap-2 ${sParams.type === 'Freelancer' ? 'font-medium text-gray-700' : 'text-gray-600 hover:text-teal-text'}`}
                >
                  Freelancer
                </Link>
                <Link
                  href={`/${locale}/jobs?${buildSearchParams(sParams, { type: 'Internship', page: undefined })}`}
                  className={`flex items-center gap-2 ${sParams.type === 'Internship' ? 'font-medium text-gray-700' : 'text-gray-600 hover:text-teal-text'}`}
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
                  <p>{dict.jobs.emptyState}</p>
                </div>
              ) : (
                jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    company="Fabbi"
                    location={job.location || 'HN'}
                    salary={job.salary_min && job.salary_max ? `${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()} ${job.currency || '$'}` : undefined}
                    employmentType={job.employment_type || ''}
                    skills={job.skills || []}
                    postedDays={Math.floor((Date.now() - new Date(job.published_at || job.created_at).getTime()) / (1000 * 60 * 60 * 24))}
                    locale={locale}
                  />
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                {page > 1 ? (
                  <Link
                    href={`/${locale}/jobs?${buildSearchParams(sParams, { page: String(page - 1) })}`}
                    className="text-gray-600 hover:text-teal-text text-sm font-medium px-2 transition-colors"
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
                      href={`/${locale}/jobs?${buildSearchParams(sParams, { page: String(p) })}`}
                      className={`w-8 h-8 rounded text-sm font-medium flex items-center justify-center transition-colors ${
                        p === page
                          ? 'bg-[#006672] text-white'
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
                    href={`/${locale}/jobs?${buildSearchParams(sParams, { page: String(totalPages) })}`}
                    className="w-8 h-8 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium flex items-center justify-center transition-colors"
                  >
                    {totalPages}
                  </Link>
                )}
                {page < totalPages ? (
                  <Link
                    href={`/${locale}/jobs?${buildSearchParams(sParams, { page: String(page + 1) })}`}
                    className="text-gray-600 hover:text-teal-text text-sm font-medium px-2 transition-colors"
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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{dict.footer.followUs}</h2>
              <p className="text-gray-500 text-sm mb-4">
                {locale === 'vi'
                  ? 'Theo dõi Fabbi trên các nền tảng mạng xã hội để cập nhật tin tuyển dụng mới nhất.'
                  : 'Fabbiをソーシャルメディアプラットフォームでフォローして、最新の採用情報を入手してください。'}
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
                      <path d="M12.9803 30.6865C18.6657 32.5594 24.7865 29.4624 26.6593 23.777C28.5322 18.0916 25.4352 11.9708 19.7498 10.098C14.0644 8.22513 7.94357 11.3221 6.07073 17.0075C4.19789 22.6929 7.2949 28.8137 12.9803 30.6865Z" fill="#006672"/>
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
              <h3 className="font-bold text-gray-800 mb-4">{dict.footer.quickLinks}</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href={`/${locale}`} className="text-gray-600 hover:text-teal-text transition-colors">{dict.nav.home}</Link></li>
                <li><Link href={`/${locale}/about`} className="text-gray-600 hover:text-teal-text transition-colors">{dict.nav.about}</Link></li>
                <li><Link href={`/${locale}/news`} className="text-gray-600 hover:text-teal-text transition-colors">{dict.nav.news}</Link></li>
                <li><Link href={`/${locale}/apply`} className="text-gray-600 hover:text-teal-text transition-colors">{dict.apply.title}</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}