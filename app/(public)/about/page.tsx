import Link from 'next/link'
import { getDictionary, Locale } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = getDictionary(locale as Locale)

  const activities = [
    { id: 'travel', icon: '🌍', label: locale === 'vi' ? 'Du lịch' : '旅行', active: true },
    { id: 'womens-day', icon: '💖', label: "Women's day", active: false },
    { id: 'mens-day', icon: '👔', label: "Men's day", active: false },
    { id: 'year-end', icon: '🎉', label: 'Year end party', active: false },
    { id: 'health', icon: '🩺', label: locale === 'vi' ? 'Khám sức khỏe' : '健康診断', active: false },
    { id: 'radio', icon: '📻', label: locale === 'vi' ? 'Radio nội bộ' : '社内ラジオ', active: false },
    { id: 'sports', icon: '⚽', label: locale === 'vi' ? 'Thể thao' : 'スポーツ', active: false },
    { id: 'mise', icon: '☕', label: locale === 'vi' ? 'Góc Mise' : 'Miseコーナー', active: false },
    { id: 'happy-hour', icon: '🍻', label: 'Happy hour', active: false },
  ]

  const highlights = [
    {
      title: locale === 'vi' ? 'Thu nhập cạnh tranh' : '競争力のある収入',
      description:
        locale === 'vi'
          ? 'Chúng tôi cung cấp mức lương hấp dẫn cùng các gói phúc lợi toàn diện, đảm bảo thu nhập xứng đáng với năng lực của bạn.'
          : '魅力的な給与と包括的な福利厚生パッケージを提供し、あなたの能力に見合った収入を保証します。',
      active: true,
    },
    {
      title: locale === 'vi' ? 'Môi trường làm việc' : '労働環境',
      description:
        locale === 'vi'
          ? 'Văn phòng hiện đại, không gian mở và thân thiện, khuyến khích sáng tạo và hợp tác.'
          : '現代的なオフィス、オープンでフレンドリーな空間、創造性と協力を奨励します。',
      active: false,
    },
    {
      title: locale === 'vi' ? 'Công nghệ đa dạng và bắt kịp xu thế' : '多様なテクノロジーとトレンドの把握',
      description:
        locale === 'vi'
          ? 'Cơ hội làm việc với các công nghệ mới nhất, tham gia dự án đa dạng từ startup đến enterprise.'
          : '最新のテクノロジーに触れる機会、スタートアップからエンタープライズまで多様なプロジェクトへの参加。',
      active: false,
    },
    {
      title: locale === 'vi' ? 'BLD quan tâm tới con người' : '経営陣による人間中心の配慮',
      description:
        locale === 'vi'
          ? 'Ban lãnh đạo luôn lắng nghe và tạo điều kiện tốt nhất để mỗi nhân viên phát triển.'
          : '経営陣は常に耳を傾け、各従業員が成長するための最良の条件を整えています。',
      active: false,
    },
    {
      title: locale === 'vi' ? 'Chú trọng Đào tạo và phát triển con người' : 'トレーニングと人材育成への重点',
      description:
        locale === 'vi'
          ? 'Ngân sách học tập không giới hạn, chương trình mentorship và cơ hội thăng tiến rõ ràng.'
          : '無制限の学習予算、メンターシッププログラム、明確な昇進の機会。',
      active: false,
    },
  ]

  const stats = [
    { value: '2018', label: locale === 'vi' ? 'Thành lập' : '設立' },
    { value: '5', label: locale === 'vi' ? 'Chi nhánh' : '拠点' },
    { value: '300+', label: locale === 'vi' ? 'Dự án' : 'プロジェクト' },
    { value: '200+', label: locale === 'vi' ? 'Nhân viên' : '従業員' },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <img
          alt="Team"
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">{dict.about.title}</h1>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="container mx-auto px-6 lg:px-20 -mt-20 relative z-10">
        <div className="bg-white rounded-xl shadow-lg py-10 px-8 flex flex-wrap justify-between items-center text-center">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`w-1/2 md:w-1/4 mb-6 md:mb-0 ${
                idx < stats.length - 1 ? 'border-r border-gray-100' : ''
              }`}
            >
              <h3 className="text-4xl font-bold text-teal-text mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Our Company Section */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">{locale === 'vi' ? 'Về Fabbi' : 'Fabbiについて'}</h2>
            <p className="text-gray-600 leading-relaxed">
              {locale === 'vi'
                ? 'Fabbi là công ty công nghệ tiên phong trong việc xây dựng giải pháp số hóa doanh nghiệp tại Việt Nam và khu vực Đông Nam Á. Chúng tôi kết nối nhân tài công nghệ với các cơ hội phát triển đột phá.'
                : 'Fabbiは、ベトナムおよび東南アジアにおける企業のデジタルトランスフォーメーションソリューション構築の先駆的なテクノロジー企業です。私たちは、テクノロジー人材を画期的な開発機会へと繋ぎます。'}
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <img
                alt="Company Event"
                className="rounded-2xl w-full object-cover h-[500px]"
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-3xl font-bold mb-6">{locale === 'vi' ? 'Về chúng tôi' : '当社について'}</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  {locale === 'vi'
                    ? 'Fabbi được thành lập năm 2018 với sứ mệnh đồng hành cùng doanh nghiệp trong hành trình chuyển đổi số. Chúng tôi tin rằng công nghệ là chìa khóa để tạo ra giá trị bền vững.'
                    : 'Fabbiは、デジタルトランスフォーメーションの旅において企業に寄り添うという使命を持って2018年に設立されました。私たちは、テクノロジーが持続可能な価値を創造するための鍵であると信じています。'}
                </p>
                <p>
                  {locale === 'vi'
                    ? 'Với đội ngũ kỹ sư tài năng và tầm nhìn đổi mới, Fabbi luôn hướng tới việc tạo ra những sản phẩm công nghệ có ý nghĩa, giải quyết các vấn đề thực tế của khách hàng.'
                    : '才能あるエンジニアチームと革新的なビジョンを持って、Fabbiは常に、顧客の実際の inúmer問題を解決する意味のあるテクノロジー製品の創造を目指しています。'}
                </p>
                <p>
                  {locale === 'vi'
                    ? 'Chúng tôi không chỉ xây dựng phần mềm — chúng tôi xây dựng mối quan hệ lâu dài dựa trên sự tin tưởng và chất lượng.'
                    : '私たちは単にソフトウェアを構築するのではなく、信頼と品質に基づいた長期的な関係を構築します。'}
                </p>
              </div>
              <button className="mt-8 border border-[#006672] text-teal-text font-medium py-2 px-8 rounded-full hover:bg-[#006672] hover:text-white transition">
                {locale === 'vi' ? 'Xem Thêm' : 'もっと見る'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{locale === 'vi' ? 'Các hoạt động nổi bật' : '主な活動'}</h2>
            <p className="text-gray-600">
              {locale === 'vi' ? 'Cùng khám phá những hoạt động thú vị tại Fabbi.' : 'Fabbiでの興味深い活動を一緒に探検しましょう。'}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Tabs */}
            <div className="w-full lg:w-1/4 bg-[#e6f4f5] rounded-xl p-4 flex flex-col space-y-2">
              {activities.map((activity) => (
                <button
                  key={activity.id}
                  className={`flex items-center space-x-3 w-full p-4 rounded-lg text-left transition ${
                    activity.active
                      ? 'bg-white text-teal-text font-medium shadow-sm'
                      : 'text-gray-600 hover:bg-white/50'
                  }`}
                >
                  <span className="w-6 h-6 flex items-center justify-center text-xs">
                    {activity.icon}
                  </span>
                  <span>{activity.label}</span>
                </button>
              ))}
            </div>
            {/* Content Area */}
            <div className="w-full lg:w-3/4 bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-teal-text mb-4">
                {locale === 'vi' ? 'Du lịch' : '旅行'}
              </h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {locale === 'vi'
                  ? 'Fabbi tổ chức các chuyến du lịch team building hàng năm, tạo cơ hội để mọi người kết nối và thư giãn ngoài công việc. Đây là dịp để chúng tôi cùng nhau tạo ra những kỷ niệm đáng nhớ.'
                  : 'Fabbiは毎年チームビルディング旅行を企画し、仕事以外の場所でみんなが繋がり、リラックスできる機会を作っています。これは、私たちが一緒に思い出深い記憶を作る機会です。'}
              </p>
              <div className="relative">
                <img
                  alt="Travel"
                  className="w-full rounded-xl object-cover h-[350px]"
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Fabbi Section */}
      <section className="py-24 bg-[#e6f4f5]/30 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 relative">
            <img
              alt="Employee"
              className="w-full max-w-md mx-auto relative z-10"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600"
            />
            <div className="absolute top-10 right-0 bg-white p-4 rounded-xl shadow-md text-sm text-gray-600 max-w-[200px] z-20">
              {locale === 'vi' ? 'Tôi đang tìm kiếm cơ hội việc làm mới...' : '新しい仕事の機会を探しています...'}
            </div>
            <div className="absolute top-32 right-10 bg-[#006672] p-4 rounded-xl shadow-md text-sm text-white max-w-[180px] z-20">
              {locale === 'vi' ? 'Chào bạn! Hãy gửi CV cho chúng tôi nhé' : 'こんにちは！履歴書を送ってください'}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">{locale === 'vi' ? 'Vì sao nên chọn Fabbi' : 'Fabbiを選ぶ理由'}</h2>
            <p className="text-gray-600 mb-8">
              {locale === 'vi' ? 'Fabbi cung cấp môi trường làm việc lý tưởng với nhiều cơ hội phát triển.' : 'Fabbiは、多くの開発機会がある理想的な労働環境を提供します。'}
            </p>
            <div className="space-y-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className={`border rounded-lg overflow-hidden ${
                    item.active ? 'bg-white shadow-sm' : 'bg-white'
                  }`}
                >
                  <button
                    className={`w-full flex justify-between items-center p-4 font-medium text-left transition ${
                      item.active
                        ? 'bg-[#006672] text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{item.title}</span>
                    <svg
                      className={`w-5 h-5 ${item.active ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M19 9l-7 7-7-7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  </button>
                  {item.active && (
                    <div className="p-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                      {item.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#006672]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {locale === 'vi' ? 'Sẵn sàng gia nhập Fabbi?' : 'Fabbiに参加する準備はできましたか？'}
          </h2>
          <p className="text-white/80 mb-8">
            {locale === 'vi' ? 'Khám phá các cơ hội việc làm hấp dẫn tại Fabbi ngay hôm nay.' : '今日、Fabbiで魅力的な仕事の機会を探しましょう。'}
          </p>
          <Link
            href={`/${locale}/jobs`}
            className="inline-block bg-white text-teal-text px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            {dict.home.viewAllJobs}
          </Link>
        </div>
      </section>
    </div>
  )
}