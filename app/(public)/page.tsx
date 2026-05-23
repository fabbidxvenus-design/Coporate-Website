import Link from 'next/link'
import { JobCard } from '@/components/public/JobCard'
import { NewsCard } from '@/components/public/NewsCard'

// Sample data for development - will be replaced with Supabase queries
const featuredJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer (ReactJS)',
    company: 'Fabbi JSC',
    location: 'Hà Nội',
    salary: 'Upto $2500',
    employmentType: 'Full-time',
    skills: ['ReactJS', 'TypeScript'],
    postedDays: 2,
    isHot: true,
  },
  {
    id: '2',
    title: 'Bridge System Engineer (BrSE)',
    company: 'Fabbi Japan',
    location: 'Tokyo, Japan',
    salary: 'Thương lượng',
    employmentType: 'Full-time',
    skills: ['Japanese N2', 'Management'],
    postedDays: 3,
    isHot: false,
  },
  {
    id: '3',
    title: 'Backend Developer (NodeJS/AWS)',
    company: 'Fabbi JSC',
    location: 'Hồ Chí Minh',
    salary: 'Upto $2000',
    employmentType: 'Full-time',
    skills: ['NodeJS', 'AWS'],
    postedDays: 5,
    isHot: false,
  },
]

const latestNews = [
  {
    id: '1',
    title: 'Lễ tổng kết Quý 1/2024: Bước đà vững chắc cho những mục tiêu mới',
    excerpt:
      'Vừa qua, Fabbi đã tổ chức thành công buổi lễ tổng kết Quý 1/2024 với sự tham gia của toàn thể CBNV.',
    category: 'Sự kiện',
    date: '15 Tháng 5, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
  },
  {
    id: '2',
    title: 'Chia sẻ kiến thức: Tối ưu hóa hiệu năng ứng dụng React quy mô lớn',
    excerpt:
      'Buổi seminar chia sẻ những kỹ thuật tiên tiến để tối ưu hóa render, quản lý state và cải thiện trải nghiệm người dùng.',
    category: 'Tech Talk',
    date: '10 Tháng 5, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
  },
  {
    id: '3',
    title: 'Sôi động giải bóng đá giao hữu Fabbi Championship 2024',
    excerpt:
      'Giải đấu thường niên nhằm nâng cao tinh thần thể thao, rèn luyện sức khỏe và thắt chặt tình đoàn kết.',
    category: 'Đời sống',
    date: '05 Tháng 5, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1521898284481-a5ec348cb555?w=800',
  },
]

const services = [
  {
    icon: 'groups',
    title: 'Tuyển dụng nhân sự IT',
    description:
      'Cung ứng nguồn nhân lực IT chất lượng cao, đáp ứng chính xác yêu cầu dự án và văn hóa doanh nghiệp.',
  },
  {
    icon: 'code',
    title: 'Phát triển phần mềm',
    description:
      'Xây dựng ứng dụng web, mobile và hệ thống doanh nghiệp theo yêu cầu với quy trình chuẩn Agile.',
  },
  {
    icon: 'lightbulb',
    title: 'Tư vấn giải pháp',
    description:
      'Đồng hành chuyển đổi số, tối ưu hóa quy trình nghiệp vụ thông qua việc áp dụng công nghệ tiên tiến.',
  },
]

export default function HomePage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section aria-labelledby="hero-heading" className="relative w-full h-[600px] flex items-center justify-center bg-surface-container-low overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20"
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/90 to-surface/40"></div>
        </div>
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col items-start justify-center">
          <h1 id="hero-heading" className="text-5xl font-bold text-on-background max-w-3xl leading-tight mb-6">
            Tiên phong giải pháp công nghệ &amp;{' '}
            <span className="text-primary">nhân sự hàng đầu</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mb-8">
            Kết nối nhân tài IT với những cơ hội phát triển đột phá. Cung cấp
            giải pháp phần mềm toàn diện cho doanh nghiệp của bạn.
          </p>
          <div className="flex gap-4">
            <Link
              href="/jobs"
              className="bg-primary text-on-primary px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#008190] transition-colors shadow-sm"
            >
              Khám phá cơ hội
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border border-outline text-primary px-6 py-3 rounded-lg text-sm font-semibold hover:bg-surface-container transition-colors"
            >
              Liên hệ ngay
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section aria-label="Thống kê công ty" className="w-full bg-surface py-12 border-b border-outline-variant/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-outline-variant/30">
            <div className="flex flex-col items-center py-4 md:py-0">
              <span className="text-5xl font-bold text-primary mb-2">10+</span>
              <span className="text-base text-on-surface-variant font-medium uppercase tracking-wider">
                Năm kinh nghiệm
              </span>
            </div>
            <div className="flex flex-col items-center py-4 md:py-0">
              <span className="text-5xl font-bold text-primary mb-2">500+</span>
              <span className="text-base text-on-surface-variant font-medium uppercase tracking-wider">
                Dự án hoàn thành
              </span>
            </div>
            <div className="flex flex-col items-center py-4 md:py-0">
              <span className="text-5xl font-bold text-primary mb-2">1000+</span>
              <span className="text-base text-on-surface-variant font-medium uppercase tracking-wider">
                Nhân sự tài năng
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section aria-labelledby="services-heading" className="w-full py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 id="services-heading" className="text-3xl font-bold text-on-background mb-4">
              Dịch vụ của chúng tôi
            </h2>
            <p className="text-base text-on-surface-variant max-w-2xl mx-auto">
              Giải pháp toàn diện đáp ứng mọi nhu cầu công nghệ và nhân sự của
              doanh nghiệp.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-surface rounded-xl p-8 border border-outline-variant/50 hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 rounded-lg bg-[#008190]/10 flex items-center justify-center mb-6 group-hover:bg-[#008190]/20 transition-colors">
                  <span className="material-symbols-outlined text-primary text-3xl" aria-hidden="true">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-on-background mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  href="#"
                  aria-label={`Tìm hiểu thêm về ${service.title}`}
                  className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Tìm hiểu thêm{' '}
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">
                    arrow_forward
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section aria-labelledby="featured-jobs-heading" className="w-full py-16 bg-surface-container-lowest border-y border-outline-variant/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 id="featured-jobs-heading" className="text-3xl font-bold text-on-background mb-2">
                Việc làm nổi bật
              </h2>
              <p className="text-base text-on-surface-variant">
                Khám phá những cơ hội nghề nghiệp tốt nhất tuần này.
              </p>
            </div>
            <Link
              href="/jobs"
              aria-label="Xem tất cả việc làm nổi bật"
              className="text-primary text-sm font-semibold hidden md:flex items-center gap-1 hover:underline"
            >
              Xem tất cả{' '}
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link
              href="/jobs"
              className="inline-block bg-surface-container border border-outline-variant px-6 py-2 rounded-lg text-sm font-semibold text-on-surface-variant"
            >
              Xem tất cả việc làm
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
                Tin tức mới nhất
              </h2>
              <p className="text-base text-on-surface-variant">
                Cập nhật những hoạt động và sự kiện nổi bật từ Fabbi.
              </p>
            </div>
            <Link
              href="/news"
              aria-label="Xem tất cả tin tức"
              className="text-primary text-sm font-semibold hidden md:flex items-center gap-1 hover:underline"
            >
              Tất cả tin tức{' '}
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((news) => (
              <NewsCard key={news.id} {...news} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}