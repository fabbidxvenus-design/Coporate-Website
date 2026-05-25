import { jobsRepository } from '@/lib/db/repositories/jobs'
import { newsRepository } from '@/lib/db/repositories/news'
import Link from 'next/link'
import { JobCard } from '@/components/public/JobCard'
import { NewsCard } from '@/components/public/NewsCard'
import { getDictionary, Locale } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

export default async function HomePage({ params }: { params?: Promise<{ locale?: string }> }) {
  const resolvedParams = await params
  const locale = ((resolvedParams?.locale as string) || 'vi') as Locale
  const dict = getDictionary(locale === undefined ? 'vi' : locale)

  // Get dynamic jobs and news
  const allJobs = await jobsRepository.findAllPublished()
  const featuredJobs = allJobs.slice(0, 3)

  const allNews = await newsRepository.findAllPublished()
  const latestNews = allNews
    .filter(n => n.id.startsWith(locale === 'ja' ? 'ja-' : 'vi-'))
    .slice(0, 3)

  const heroTitle = dict?.home?.heroTitle || 'Fabbi - Công nghệ cho tương lai'
  const heroParts = heroTitle.includes(' - ') ? heroTitle.split(' - ') : [heroTitle, '']

  const services = [
    {
      icon: 'groups',
      title: locale === 'vi' ? 'Tuyển dụng nhân sự IT' : 'IT人材採用',
      description:
        locale === 'vi'
          ? 'Cung ứng nguồn nhân lực IT chất lượng cao, đáp ứng chính xác yêu cầu dự án và văn hóa doanh nghiệp.'
          : 'プロジェクトの要件や企业文化に正確に対応する、高品質なIT人材を提供します。',
      link: `/${locale}/it-recruitment`,
    },
    {
      icon: 'code',
      title: locale === 'vi' ? 'Phát triển phần mềm' : 'ソフトウェア開発',
      description:
        locale === 'vi'
          ? 'Xây dựng ứng dụng web, mobile và hệ thống doanh nghiệp theo yêu cầu với quy trình chuẩn Agile.'
          : 'アジャイルプロセスに基づき、Web、モバイル、および企业向けシステムを開発します。',
      link: `/${locale}/business-application-development-vn`,
    },
    {
      icon: 'lightbulb',
      title: locale === 'vi' ? 'Tư vấn giải pháp AI' : 'AIソリューションコンサルティング',
      description:
        locale === 'vi'
          ? 'Đồng hành chuyển đổi số, tối ưu hóa quy trình nghiệp vụ thông qua việc áp dụng công nghệ AI tiên tiến.'
          : '最先端 của AI 技術を活用し、デジタルトランスフォーメーションとビジネスプロセスの最適化を支援します。',
      link: `/${locale}/service-ai-system-development-vn`,
    },
    {
      icon: 'dataset',
      title: locale === 'vi' ? 'Dịch vụ CRM' : 'CRMサービス',
      description:
        locale === 'vi'
          ? 'Triển khai giải pháp CRM tùy chỉnh, giúp doanh nghiệp quản lý khách hàng và tăng trưởng doanh thu hiệu quả.'
          : '企业が顧客を管理し、収益を効率的に成長させるためのカスタムCRMソリューションを導入します。',
      link: `/${locale}/service-crm-solutions-vn`,
    },
    {
      icon: 'currency_exchange',
      title: locale === 'vi' ? 'Blockchain' : 'ブロックチェーン',
      description:
        locale === 'vi'
          ? 'Phát triển các ứng dụng dựa trên công nghệ Blockchain, đảm bảo tính bảo mật và minh bạch cao.'
          : '高いセキュリティと透明性を保証する、ブロックチェーン技術に基づいたアプリケーションを開発します。',
      link: `/${locale}/service-blockchain-development-vn`,
    },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section aria-labelledby="hero-heading" className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            src="/images/409187962_843743124422591_5358432708356068022_n.jpg"
          />
        </div>
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col items-start justify-center">
            <h1 id="hero-heading" className="text-5xl font-bold text-white max-w-3xl leading-tight mb-6">
            {heroParts[0]} -{' '}
            <span className="text-teal-text hover:text-pink transition-colors cursor-default">{heroParts[1]}</span>
          </h1>
          <p className="text-lg text-white max-w-2xl mb-8">
            {dict?.home?.heroSubtitle || ''}
          </p>
          <div className="flex gap-4">
            <Link
              href={`/${locale}/jobs`}
              className="bg-pink-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-pink-700 transition-colors shadow-sm"
            >
              {dict?.home?.exploreJobs || (locale === 'vi' ? 'Khám phá việc làm' : '求人を見る')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="bg-transparent border border-teal-text text-teal-text px-6 py-3 rounded-lg text-sm font-semibold hover:border-pink hover:text-pink hover:bg-pink-50 transition-colors"
            >
              {dict?.nav?.contact || 'Liên hệ'}
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section aria-label="Thống kê công ty" className="w-full bg-surface py-12 border-b border-outline-variant/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-outline-variant/30">
            <div className="flex flex-col items-center py-4 md:py-0">
              <span className="text-5xl font-bold text-teal-text mb-2">10+</span>
              <span className="text-base text-on-surface-variant font-medium uppercase tracking-wider">
                {locale === 'vi' ? 'Năm kinh nghiệm' : '年の経験'}
              </span>
            </div>
            <div className="flex flex-col items-center py-4 md:py-0">
              <span className="text-5xl font-bold text-teal-text mb-2">500+</span>
              <span className="text-base text-on-surface-variant font-medium uppercase tracking-wider">
                {locale === 'vi' ? 'Dự án hoàn thành' : '完了したプロジェクト'}
              </span>
            </div>
            <div className="flex flex-col items-center py-4 md:py-0">
              <span className="text-5xl font-bold text-teal-text mb-2">1000+</span>
              <span className="text-base text-on-surface-variant font-medium uppercase tracking-wider">
                {locale === 'vi' ? 'Nhân sự tài năng' : '優秀な人材'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section aria-labelledby="featured-jobs-heading" className="w-full py-16 bg-surface-container-lowest border-y border-outline-variant/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 id="featured-jobs-heading" className="text-3xl font-bold text-on-background mb-2">
                {dict?.home?.latestJobs || (locale === 'vi' ? 'Việc làm nổi bật' : '注目の求人')}
              </h2>
              <p className="text-base text-on-surface-variant">
                {locale === 'vi' ? 'Khám phá những cơ hội nghề nghiệp tốt nhất tuần này.' : '今週の最高のキャリア機会をご覧ください。'}
              </p>
            </div>
            <Link
              href={`/${locale}/jobs`}
              aria-label="Xem tất cả việc làm nổi bật"
              className="text-teal-text hover:text-pink text-sm font-semibold hidden md:flex items-center gap-1 hover:underline transition-colors"
            >
              {dict?.home?.viewAllJobs || (locale === 'vi' ? 'Xem tất cả' : 'すべて見る')}{' '}
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {featuredJobs.map((job) => (
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
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link
              href={`/${locale}/jobs`}
              className="inline-block bg-surface-container border border-outline-variant px-6 py-2 rounded-lg text-sm font-semibold text-on-surface-variant"
            >
              {dict?.home?.viewAllJobs || (locale === 'vi' ? 'Xem tất cả' : 'すべて見る')}
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section aria-labelledby="latest-news-heading" className="w-full py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 id="latest-news-heading" className="text-3xl font-bold text-on-background mb-2">
                {dict?.home?.latestNews || (locale === 'vi' ? 'Tin tức mới' : '最新ニュース')}
              </h2>
              <p className="text-base text-on-surface-variant">
                {locale === 'vi' ? 'Cập nhật những hoạt động và sự kiện nổi bật từ Fabbi.' : 'Fabbiの主な活動やイベントの最新情報をお届けします。'}
              </p>
            </div>
            <Link
              href={`/${locale}/news`}
              aria-label="Xem tất cả tin tức"
              className="text-teal-text hover:text-pink text-sm font-semibold hidden md:flex items-center gap-1 hover:underline transition-colors"
            >
              {dict?.home?.viewAllNews || (locale === 'vi' ? 'Xem tất cả' : 'すべて見る')}{' '}
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((news) => (
              <NewsCard
                key={news.id}
                id={news.id}
                slug={news.slug}
                title={news.title}
                excerpt={news.excerpt}
                imageUrl={news.thumbnail_url || 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800'}
                category={news.category || 'News'}
                date={news.published_at ? new Date(news.published_at).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'ja-JP', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                locale={locale}
                readMore={dict?.news?.readMore || (locale === 'vi' ? 'Đọc thêm' : '続きを読む')}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
