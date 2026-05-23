import Link from 'next/link'

const activities = [
  { id: 'travel', icon: '🌍', label: 'Du lịch', active: true },
  { id: 'womens-day', icon: '💖', label: "Women's day", active: false },
  { id: 'mens-day', icon: '👔', label: "Men's day", active: false },
  { id: 'year-end', icon: '🎉', label: 'Year end party', active: false },
  { id: 'health', icon: '🩺', label: 'Khám sức khỏe', active: false },
  { id: 'radio', icon: '📻', label: 'Radio nội bộ', active: false },
  { id: 'sports', icon: '⚽', label: 'Thể thao', active: false },
  { id: 'mise', icon: '☕', label: 'Góc Mise', active: false },
  { id: 'happy-hour', icon: '🍻', label: 'Happy hour', active: false },
]

const highlights = [
  {
    title: 'Thu nhập cạnh tranh',
    description:
      'Chúng tôi cung cấp mức lương hấp dẫn cùng các gói phúc lợi toàn diện, đảm bảo thu nhập xứng đáng với năng lực của bạn.',
    active: true,
  },
  {
    title: 'Môi trường làm việc',
    description:
      'Văn phòng hiện đại, không gian mở và thân thiện, khuyến khích sáng tạo và hợp tác.',
    active: false,
  },
  {
    title: 'Công nghệ đa dạng và bắt kịp xu thế',
    description:
      'Cơ hội làm việc với các công nghệ mới nhất, tham gia dự án đa dạng từ startup đến enterprise.',
    active: false,
  },
  {
    title: 'BLD quan tâm tới con người',
    description:
      'Ban lãnh đạo luôn lắng nghe và tạo điều kiện tốt nhất để mỗi nhân viên phát triển.',
    active: false,
  },
  {
    title: 'Chú trọng Đào tạo và phát triển con người',
    description:
      'Ngân sách học tập không giới hạn, chương trình mentorship và cơ hội thăng tiến rõ ràng.',
    active: false,
  },
]

const stats = [
  { value: '2018', label: 'Thành lập' },
  { value: '5', label: 'Chi nhánh' },
  { value: '300+', label: 'Dự án' },
  { value: '200+', label: 'Nhân viên' },
]

export default function AboutPage() {
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
          <h1 className="text-5xl font-bold text-white">Về Fabbi</h1>
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
              <h3 className="text-4xl font-bold text-[#008b9c] mb-2">
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
            <h2 className="text-4xl font-bold mb-4">About Our Company</h2>
            <p className="text-gray-600 leading-relaxed">
              Fabbi là công ty công nghệ tiên phong trong việc xây dựng giải pháp
              số hóa doanh nghiệp tại Việt Nam và khu vực Đông Nam Á. Chúng tôi
              kết nối nhân tài công nghệ với các cơ hội phát triển đột phá.
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
              <h3 className="text-3xl font-bold mb-6">Về chúng tôi</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Fabbi được thành lập năm 2018 với sứ mệnh đồng hành cùng doanh
                  nghiệp trong hành trình chuyển đổi số. Chúng tôi tin rằng công
                  nghệ là chìa khóa để tạo ra giá trị bền vững.
                </p>
                <p>
                  Với đội ngũ kỹ sư tài năng và tầm nhìn đổi mới, Fabbi luôn
                  hướng tới việc tạo ra những sản phẩm công nghệ có ý nghĩa, giải
                  quyết các vấn đề thực tế của khách hàng.
                </p>
                <p>
                  Chúng tôi không chỉ xây dựng phần mềm — chúng tôi xây dựng mối
                  quan hệ lâu dài dựa trên sự tin tưởng và chất lượng.
                </p>
              </div>
              <button className="mt-8 border border-[#008b9c] text-[#008b9c] font-medium py-2 px-8 rounded-full hover:bg-[#008b9c] hover:text-white transition">
                Xem Thêm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Các hoạt động nổi bật</h2>
            <p className="text-gray-600">
              Cùng khám phá những hoạt động thú vị tại Fabbi.
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
                      ? 'bg-white text-[#008b9c] font-medium shadow-sm'
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
              <h3 className="text-2xl font-bold text-[#008b9c] mb-4">
                Du lịch
              </h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Fabbi tổ chức các chuyến du lịch team building hàng năm, tạo
                cơ hội để mọi người kết nối và thư giãn ngoài công việc. Đây là
                dịp để chúng tôi cùng nhau tạo ra những kỷ niệm đáng nhớ.
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
              I'm looking for a New Job Opportunity...
            </div>
            <div className="absolute top-32 right-10 bg-[#008b9c] p-4 rounded-xl shadow-md text-sm text-white max-w-[180px] z-20">
              Hi! Please send us your CV
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Vì sao nên chọn Fabbi</h2>
            <p className="text-gray-600 mb-8">
              Fabbi cung cấp môi trường làm việc lý tưởng với nhiều cơ hội phát
              triển.
            </p>
            <div className="space-y-4">
              {highlights.map((item, idx) => (
                <div
                  key={item.title}
                  className={`border rounded-lg overflow-hidden ${
                    item.active ? 'bg-white shadow-sm' : 'bg-white'
                  }`}
                >
                  <button
                    className={`w-full flex justify-between items-center p-4 font-medium text-left transition ${
                      item.active
                        ? 'bg-[#008b9c] text-white'
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
      <section className="py-16 bg-[#008b9c]">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sẵn sàng gia nhập Fabbi?
          </h2>
          <p className="text-white/80 mb-8">
            Khám phá các cơ hội việc làm hấp dẫn tại Fabbi ngay hôm nay.
          </p>
          <Link
            href="/jobs"
            className="inline-block bg-white text-[#008b9c] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Xem việc làm
          </Link>
        </div>
      </section>
    </div>
  )
}