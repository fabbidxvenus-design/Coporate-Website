import { jobsRepository } from '@/lib/db/repositories/jobs'
import { newsRepository } from '@/lib/db/repositories/news'
import Link from 'next/link'
import { Suspense } from 'react'
import { getDictionary, Locale } from '@/lib/i18n'
import { JobCard } from '@/components/public/JobCard'
import { JobsFilter } from '@/components/public/JobsFilter'

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
        className="bg-[#008B9C] hover:bg-[#00707e] text-white rounded-full px-6 py-2.5 text-sm font-bold transition-colors flex items-center gap-2 whitespace-nowrap w-full md:w-auto justify-center"
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

  // Directly use repository
  const jobs = await jobsRepository.findAllPublished()
  // Basic filtering for this migration stage
  let filteredJobs = jobs
  if (sParams.q) {
    filteredJobs = filteredJobs.filter(j => j.title.toLowerCase().includes(sParams.q!.toLowerCase()))
  }
  if (sParams.location) {
    filteredJobs = filteredJobs.filter(j => j.location === sParams.location)
  }
  if (sParams.type) {
    filteredJobs = filteredJobs.filter(j => j.employment_type === sParams.type)
  }

  const total = filteredJobs.length
  const limit = 10
  const page = parseInt(sParams.page || '1')
  const totalPages = Math.ceil(total / limit)
  const paginatedJobs = filteredJobs.slice((page - 1) * limit, page * limit)

  return (
    <>
      {/* Hero Section with Search */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div
          className="rounded-3xl overflow-hidden relative flex flex-col items-center py-20 px-4 md:px-8"
          style={{
            backgroundImage: 'url("/images/412191366_846458190817751_1761241903598864399_n.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="text-center max-w-2xl relative z-10 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-[#008B9C]">{total} Jobs</span> {locale === 'vi' ? 'đang open' : '募集中'}
            </h1>
            <p className="text-white text-sm md:text-base opacity-90">
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
              <JobsFilter currentType={sParams.type} locale={locale} />
            </div>

            {/* Job Cards List */}
            <div className="space-y-4">
              {paginatedJobs.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-white rounded-xl">
                  <i className="fa-solid fa-search text-4xl mb-4"></i>
                  <p>{dict.jobs.emptyState}</p>
                </div>
              ) : (
                paginatedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    slug={job.slug}
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
                    className="text-gray-600 hover:text-[#00707e] text-sm font-medium px-2 transition-colors"
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
                          ? 'bg-[#008B9C] text-white'
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
                    className="text-gray-600 hover:text-[#008B9C] text-sm font-medium px-2 transition-colors"
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
          <div className="space-y-8" aria-label="Sidebar">
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
                  <div>
                    <img src="/images/Logo-Fabbi-White.svg" alt="Fabbi JSC" className="h-10 w-auto" />
                    <div className="flex items-center gap-2 mt-1">
                      <button className="bg-blue-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-700">
                        <i className="fa-brands fa-facebook"></i> Like Page
                      </button>
                      <span className="text-gray-300 text-xs">100K Likes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facebook Feed Posts */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-800 text-sm">Fabbi Universe</h3>
                  <p className="text-xs text-gray-500 mb-2">8 tháng 3 lúc 20:00</p>
                  <p className="text-sm text-gray-700 line-clamp-3">LOVELY MOMENT | FABBI GIRLS, YOU ARE MY SWEET HEART...</p>
                  <a href="#" className="text-primary text-sm hover:underline">Xem thêm</a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4">{dict.footer.quickLinks}</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href={`/${locale}`} className="text-gray-600 hover:text-[#00707e] transition-colors">{dict.nav.home}</Link></li>
                <li><Link href={`/${locale}/about`} className="text-gray-600 hover:text-[#00707e] transition-colors">{dict.nav.about}</Link></li>
                <li><Link href={`/${locale}/news`} className="text-gray-600 hover:text-[#00707e] transition-colors">{dict.nav.news}</Link></li>
                <li><Link href={`/${locale}/apply`} className="text-gray-600 hover:text-[#00707e] transition-colors">{dict.apply.title}</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{locale === 'vi' ? 'Chuyên mục ảnh' : 'フォトセクション'}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-64 rounded-xl overflow-hidden shadow-sm">
            <img src="/images/409187962_843743124422591_5358432708356068022_n.jpg" alt="Work culture" className="w-full h-full object-cover" />
          </div>
          <div className="h-64 rounded-xl overflow-hidden shadow-sm">
            <img src="/images/409394328_843742617755975_2920894524434245918_n.jpg" alt="Team meeting" className="w-full h-full object-cover" />
          </div>
          <div className="h-64 rounded-xl overflow-hidden shadow-sm">
            <img src="/images/409845294_843742774422626_8818933704017811449_n.jpg" alt="Office space" className="w-full h-full object-cover" />
          </div>
          <div className="h-64 rounded-xl overflow-hidden shadow-sm">
            <img src="/images/411652522_846458160817754_3403469319257241473_n.jpg" alt="Team activity" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{locale === 'vi' ? 'Tìm kiếm công việc theo Location' : 'ロケーションで仕事を探す'}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
             <div className="h-64 rounded-xl overflow-hidden mb-4">
               <img src="/images/Vietnam-Summit.jpg" alt="Hà Nội" className="w-full h-full object-cover" />
             </div>
             <h3 className="text-xl font-bold text-gray-800">Hà Nội</h3>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
             <div className="h-64 rounded-xl overflow-hidden mb-4">
               <img src="/images/SEMINAR-JP-LOGO-26.jpg" alt="Japan" className="w-full h-full object-cover" />
             </div>
             <h3 className="text-xl font-bold text-gray-800">Japan</h3>
          </div>
        </div>
      </section>

      {/* Floating Bell */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 bg-orange-100 rounded-full shadow-lg flex items-center justify-center text-orange-500 text-2xl hover:bg-orange-200 transition-colors z-50"
        aria-label="Notifications"
      >
        <i className="fa-solid fa-bell"></i>
      </button>
    </>
  )
}
