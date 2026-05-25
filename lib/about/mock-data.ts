import { AboutContent } from './types'

export const mockAboutData: Record<'vi' | 'ja', AboutContent> = {
  vi: {
    title: 'Về Fabbi',
    heroImage: '/images/Teambuilding1-scaled.jpg',
    intro: 'Fabbi là công ty công nghệ tiên phong trong việc xây dựng giải pháp số hóa doanh nghiệp tại Việt Nam và khu vực Đông Nam Á. Chúng tôi kết nối nhân tài công nghệ với các cơ hội phát triển đột phá.',
    companyDescription: 'Chúng tôi kết nối nhân tài công nghệ với các cơ hội phát triển đột phá tại Việt Nam và khu vực.',
    ourStory: {
      title: 'Về chúng tôi',
      paragraphs: [
        'Fabbi được thành lập năm 2018 với sứ mệnh đồng hành cùng doanh nghiệp trong hành trình chuyển đổi số. Chúng tôi tin rằng công nghệ là chìa khóa để tạo ra giá trị bền vững.',
        'Với đội ngũ kỹ sư tài năng và tầm nhìn đổi mới, Fabbi luôn hướng tới việc tạo ra những sản phẩm công nghệ có ý nghĩa, giải quyết các vấn đề thực tế của khách hàng.',
        'Chúng tôi không chỉ xây dựng phần mềm — chúng tôi xây dựng mối quan hệ lâu dài dựa trên sự tin tưởng và chất lượng.'
      ],
      image: '/images/Summer-Trip-2022.jpg'
    },
    stats: [
      { value: '2018', label: 'Thành lập' },
      { value: '5', label: 'Chi nhánh' },
      { value: '300+', label: 'Dự án' },
      { value: '200+', label: 'Nhân viên' }
    ],
    activities: [
      { id: 'travel', icon: '🌍', label: 'Du lịch', description: 'Fabbi tổ chức các chuyến du lịch team building hàng năm, tạo cơ hội để mọi người kết nối và thư giãn ngoài công việc. Đây là dịp để chúng tôi cùng nhau tạo ra những kỷ niệm đáng nhớ.', imageUrl: '/images/Teambuilding-scaled.jpg', active: true },
      { id: 'womens-day', icon: '💖', label: "Women's day", description: 'Ngày tôn vinh những người phụ nữ tuyệt vời tại Fabbi. Chúng tôi luôn dành tặng những món quà và lời chúc ý nghĩa nhất tới các chị em.', imageUrl: '/images/A7408522-scaled.jpg', active: false },
      { id: 'mens-day', icon: '👔', label: "Men's day", description: 'Không chỉ phái đẹp, các "cánh mày râu" tại Fabbi cũng được chăm sóc đặc biệt trong ngày của mình với những hoạt động gắn kết đầy bất ngờ.', imageUrl: '/images/A7408427-scaled.jpg', active: false },
      { id: 'year-end', icon: '🎉', label: 'Year end party', description: 'Bữa tiệc cuối năm ấm cúng, nơi chúng tôi nhìn lại hành trình 1 năm đã qua, vinh danh những cá nhân xuất sắc và chào đón năm mới rực rỡ.', imageUrl: '/images/Tet-2024.jpg', active: false },
      { id: 'health', icon: '🩺', label: 'Khám sức khỏe', description: 'Sức khỏe nhân viên là tài sản quý giá nhất. Fabbi định kỳ tổ chức khám sức khỏe tổng quát để đảm bảo mọi người luôn có thể trạng tốt nhất.', imageUrl: '/images/Hop-tac-CN-VN-HK-2024.jpg', active: false },
      { id: 'radio', icon: '📻', label: 'Radio nội bộ', description: 'Kênh kết nối âm nhạc và tâm tình, nơi các thành viên Fabbi chia sẻ câu chuyện và sở thích cá nhân qua sóng radio nội bộ.', imageUrl: '/images/Sao-Khue-2024.jpg', active: false },
      { id: 'sports', icon: '⚽', label: 'Thể thao', description: 'Giải bóng đá, cầu lông thường niên thúc đẩy tinh thần rèn luyện thể chất và gắn kết giữa các phòng ban.', imageUrl: '/images/DETECH-II-1-scaled.jpg', active: false },
      { id: 'mise', icon: '☕', label: 'Góc Mise', description: 'Không gian thư giãn nhẹ nhàng, nơi nhân viên có thể thưởng thức café, trò chuyện và trao đổi kiến thức.', imageUrl: '/images/Ca-chut-cho-Ffee.jpg', active: false },
      { id: 'happy-hour', icon: '🍻', label: 'Happy hour', description: 'Những giờ phút giải lao cuối tuần đầy hứng khởi, giúp nhân viên giải tỏa căng thẳng sau những giờ làm việc tập trung.', imageUrl: '/images/DETECH-II-2-scaled-e1730455520606.jpg', active: false }
    ],
    whyChoose: {
      title: 'Vì sao nên chọn Fabbi',
      description: 'Fabbi cung cấp môi trường làm việc lý tưởng with nhiều cơ hội phát triển.',
      bubbleSender: 'Tôi đang tìm kiếm cơ hội việc làm mới...',
      bubbleReceiver: 'Chào bạn! Hãy gửi CV cho chúng tôi nhé',
      employeeImage: '/images/Mr-LinhNV.png'
    },
    highlights: [
      { title: 'Thu nhập cạnh tranh', description: 'Chúng tôi cung cấp mức lương hấp dẫn cùng các gói phúc lợi toàn diện, đảm bảo thu nhập xứng đáng với năng lực của bạn.' },
      { title: 'Môi trường làm việc', description: 'Văn phòng hiện đại, không gian mở và thân thiện, khuyến khích sáng tạo và hợp tác.' },
      { title: 'Công nghệ đa dạng và bắt kịp xu thế', description: 'Cơ hội làm việc với các công nghệ mới nhất, tham gia dự án đa dạng từ startup đến enterprise.' },
      { title: 'BLD quan tâm tới con người', description: 'Ban lãnh đạo luôn lắng nghe và tạo điều kiện tốt nhất để mỗi nhân viên phát triển.' },
      { title: 'Chú trọng Đào tạo và phát triển con người', description: 'Ngân sách học tập không giới hạn, chương trình mentorship và cơ hội thăng tiến rõ ràng.' }
    ],
    cta: {
      title: 'Sẵn sàng gia nhập Fabbi?',
      subtitle: 'Khám phá các cơ hội việc làm hấp dẫn tại Fabbi ngay hôm nay.',
      buttonLabel: 'Xem tất cả cơ hội'
    }
  },
  ja: {
    title: 'Fabbiについて',
    heroImage: '/images/Teambuilding1-scaled.jpg',
    intro: 'Fabbiは、ベトナムおよび東南アジアにおける企業のデジタルトランスフォーメーションソリューション構築の先駆的なテクノロジー企業です。私たちは、テクノロジー人材を画期的な開発機会へと繋ぎます。',
    companyDescription: '私たちは、テクノロジー人材を画期的な開発機会へと繋ぎます。',
    ourStory: {
      title: '当社について',
      paragraphs: [
        'Fabbiは、デジタルトランスフォーメーションの旅において企業に寄り添うという使命を持って2018年に設立されました。私たちは、テクノロジーが持続可能な価値を創造するための鍵であると信じています。',
        '才能あるエンジニアチームと革新的なビジョンを持って, Fabbiは常に, 顧客の実際の課題を解決する意味のあるテクノロジー製品の創造を目指しています。',
        '私たちは単にソフトウェアを構築するのではなく、信頼と品質に基づいた長期的な関係を構築します。'
      ],
      image: '/images/Summer-Trip-2022.jpg'
    },
    stats: [
      { value: '2018', label: '設立' },
      { value: '5', label: '拠点' },
      { value: '300+', label: 'プロジェクト' },
      { value: '200+', label: '従業員数' }
    ],
    activities: [
      { id: 'travel', icon: '🌍', label: '旅行', description: 'Fabbiは毎年チームビルディング旅行を企画し、仕事以外の場所でみんなが繋がり、リラックスできる機会を作っています。これは、私たちが一緒に思い出深い記憶を作る機会です。', imageUrl: '/images/Teambuilding-scaled.jpg', active: true },
      { id: 'womens-day', icon: '💖', label: "Women's day", description: '国際女性の日を祝う特別なイベントです。', imageUrl: '/images/A7408522-scaled.jpg', active: false },
      { id: 'mens-day', icon: '👔', label: "Men's day", description: '男性社員のための日です。', imageUrl: '/images/A7408427-scaled.jpg', active: false },
      { id: 'year-end', icon: '🎉', label: 'Year end party', description: '1年間の成果を祝う忘年会です。', imageUrl: '/images/Tet-2024.jpg', active: false },
      { id: 'health', icon: '🩺', label: '健康診断', description: '従業員の健康をサポートする定期健診です。', imageUrl: '/images/Hop-tac-CN-VN-HK-2024.jpg', active: false },
      { id: 'radio', icon: '📻', label: '社内ラジオ', description: '社員のストーリーを共有する社内ラジオチャンネルです。', imageUrl: '/images/Sao-Khue-2024.jpg', active: false },
      { id: 'sports', icon: '⚽', label: 'スポーツ', description: '仕事後のスポーツ活動です。', imageUrl: '/images/DETECH-II-1-scaled.jpg', active: false },
      { id: 'mise', icon: '☕', label: 'Miseコーナー', description: 'コーヒーと楽しい会話のためのリラックススペースです。', imageUrl: '/images/Ca-chut-cho-Ffee.jpg', active: false },
      { id: 'happy-hour', icon: '🍻', label: 'Happy hour', description: '同僚との週末の楽しい時間です。', imageUrl: '/images/DETECH-II-2-scaled-e1730455520606.jpg', active: false }
    ],
    whyChoose: {
      title: 'Fabbiを選ぶ理由',
      description: 'Fabbiは、多くの開発機会がある理想的な労働環境を提供します。',
      bubbleSender: '新しい仕事の機会を探しています...',
      bubbleReceiver: 'こんにちは！履歴書を送ってください',
      employeeImage: '/images/Mr-LinhNV.png'
    },
    highlights: [
      { title: '競争力のある収入', description: '魅力的な給与と包括的な福利厚生パッケージを提供し、あなたの能力に見合った収入を保証します。' },
      { title: '労働環境', description: '現代的なオフィス、オープンでフレンドリーな空間、創造性と協力を奨励します。' },
      { title: '多様なテクノロジーとトレンドの把握', description: '最新のテクノロジーに触れる機会、スタートアップからエンタープライズまで多様なプロジェクトへの参加。' },
      { title: '経営陣による人間中心の配慮', description: '経営陣は常に耳を傾け、各従業員が成長するための最良の条件を整えています。' },
      { title: 'トレーニングと人材育成への重点', description: '無制限の学習予算、メンターシッププログラム、明確な昇進の機会。' }
    ],
    cta: {
      title: 'Fabbiに参加する準備はできましたか？',
      subtitle: '今日、Fabbiで魅力的な仕事の機会を探しましょう。',
      buttonLabel: 'すべての機会を見る'
    }
  }
}
