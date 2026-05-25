/**
 * Comprehensive Mock Data for Fabbi Corporate Website
 * Based on crawled content from Fabbi Holdings
 */

export interface Translation {
  vi: string;
  ja: string;
}

export interface Job {
  id: string;
  slug: string;
  title: Translation;
  department: Translation;
  location: Translation;
  employment_type: Translation;
  salary_range: Translation;
  skills: string[];
  description: Translation;
  requirements: Translation;
  benefits: Translation;
  status: 'published' | 'closed';
  published_at: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: Translation;
  excerpt: Translation;
  body: Translation;
  cover_image: string;
  category: Translation;
  tags: string[];
  status: 'published' | 'draft';
  author: Translation;
  published_at: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: Translation;
  client: Translation;
  summary: Translation;
  problem?: Translation;
  solution?: Translation;
  technologies: string[];
  cover_image: string;
  status: 'completed' | 'in-progress';
  year: number;
}

export const siteSettings = {
  companyName: { vi: "Fabbi Holdings", ja: "Fabbi Holdings" },
  slogan: { vi: "Chạm đến tương lai bằng công nghệ", ja: "テクノロジーで未来に触れる" },
  founded: "2018-03-18",
  headcount: "300+",
  contactEmail: "sales@fabbi.com.vn",
  contactPhone: "+84 24 6259 3637",
  socialLinks: {
    facebook: "https://www.facebook.com/fabbiholdings",
    twitter: "https://twitter.com/fabbiholdings",
    linkedin: "https://www.linkedin.com/company/fabbi-holdings-co-ltd/",
    tiktok: "https://www.tiktok.com/@fabbiholdings"
  },
  offices: [
    {
      id: "office-hn",
      name: { vi: "Trụ sở Hà Nội", ja: "ハノイ本社" },
      address: {
        vi: "Tầng 11, Detech Tower II, 107 Nguyễn Phong Sắc, Cầu Giấy, Hà Nội",
        ja: "ハノイ、カウザイ区、グエン・フォン・サック 107、デテック・タワー II、11階"
      },
      phone: "+84 24 6259 3637"
    },
    {
      id: "office-tokyo",
      name: { vi: "Trụ sở Tokyo", ja: "東京本社" },
      address: {
        vi: "Tầng 11, Tòa nhà WTC Annex, 2-3-8 Hamamatsucho, Quận Minato, Tokyo, Nhật Bản",
        ja: "東京都港区浜松町2-3-8、WTC Annexビル、11階"
      },
      phone: "+81 03-6806-0790"
    }
  ]
};

export const aboutContent = {
  heroTitle: { vi: "Lời chào từ Chủ tịch", ja: "代表メッセージ" },
  heroSubtitle: {
    vi: "Fabbi khởi nguồn từ chỉ 4 thành viên – và một chữ “khát vọng”.",
    ja: "Fabbiはわずか4人のメンバーと「志」から始まりました。"
  },
  vision: {
    vi: "Trở thành tập đoàn công nghệ toàn cầu, nơi hội tụ khát vọng, sáng tạo và công nghệ để kiến tạo giá trị bền vững.",
    ja: "志、創造性、テクノロジーが集結し、持続可能な価値を創造するグローバル・テクノロジー・グループになる。"
  },
  mission: {
    vi: "Fabbi tạo ra các giải pháp công nghệ sáng tạo để giúp khách hàng phát triển, đội ngũ trưởng thành, và xã hội tiến về phía trước.",
    ja: "Fabbiは革新的なテクノロジーソリューションを創造し、顧客の成長、チームの成熟、そして社会の進歩を支援します。"
  },
  values: [
    {
      key: "aspiration",
      title: { vi: "Khát vọng", ja: "志" },
      description: { vi: "Dám mơ lớn, không chấp nhận giới hạn.", ja: "大きな夢を持ち、限界を受け入れない。" }
    },
    {
      key: "breakthrough",
      title: { vi: "Đột phá", ja: "突破口" },
      description: { vi: "Sáng tạo không ngừng, khác biệt để tạo giá trị.", ja: "常に革新し、価値を生み出すために差別化する。" }
    },
    {
      key: "speed",
      title: { vi: "Tốc độ", ja: "スピード" },
      description: { vi: "Quyết đoán, Kịp thời.", ja: "決断力があり、タイムリーである。" }
    },
    {
      key: "dedication",
      title: { vi: "Tận tâm", ja: "献身" },
      description: { vi: "Hết lòng với khách hàng và đồng đội.", ja: "顧客とチームメイトに全力を尽くす。" }
    },
    {
      key: "sustainability",
      title: { vi: "Bền vững", ja: "持続可能性" },
      description: { vi: "Xây giá trị lâu dài, phát triển có trách nhiệm.", ja: "長期的な価値を築き、責任を持って発展する。" }
    }
  ]
};

export const jobs: Job[] = [
  {
    id: "job-1",
    slug: "senior-frontend-engineer-react",
    title: { vi: "Senior Frontend Engineer (React/Next.js)", ja: "シニアフロントエンドエンジニア (React/Next.js)" },
    department: { vi: "Engineering", ja: "エンジニアリング" },
    location: { vi: "Hà Nội, Việt Nam", ja: "ベトナム、ハノイ" },
    employment_type: { vi: "Full-time", ja: "正社員" },
    salary_range: { vi: "2000$ - 3500$", ja: "2000$ - 3500$" },
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    description: {
      vi: "Tham gia phát triển các dự án E-commerce và Fintech quy mô lớn cho thị trường Nhật Bản và Global.",
      ja: "日本およびグローバル市場向けの、大規模なEコマースおよびフィンテックプロジェクトの開発に参加します。"
    },
    requirements: {
      vi: "Trên 3 năm kinh nghiệm với React, hiểu biết sâu về Next.js và Performance Optimization.",
      ja: "Reactで3年以上の経験があり、Next.jsとパフォーマンス最適化について深い理解があること。"
    },
    benefits: {
      vi: "Lương thưởng hấp dẫn, làm việc trong môi trường đa quốc gia, cơ hội onsite Nhật Bản.",
      ja: "魅力的な給与とボーナス、多国籍な環境での勤務、日本でのオンサイトの機会。"
    },
    status: "published",
    published_at: "2026-05-20T08:00:00Z"
  },
  {
    id: "job-2",
    slug: "brse-bridge-software-engineer-ja",
    title: { vi: "Bridge Software Engineer (BrSE) - N1/N2", ja: "ブリッジSE (BrSE) - N1/N2" },
    department: { vi: "Business", ja: "ビジネス" },
    location: { vi: "Tokyo, Japan", ja: "日本、東京" },
    employment_type: { vi: "Full-time", ja: "正社員" },
    salary_range: { vi: "4M - 7M JPY / Year", ja: "年収 400万 - 700万円" },
    skills: ["Japanese N1/N2", "Software Engineering", "Project Management"],
    description: {
      vi: "Cầu nối liên lạc giữa team dev Việt Nam và khách hàng Nhật Bản, quản lý tiến độ và chất lượng dự án.",
      ja: "ベトナムの開発チームと日本の顧客との間のコミュニケーションの架け橋となり、プロジェクトの進捗と品質を管理します。"
    },
    requirements: {
      vi: "Tiếng Nhật N2 cứng trở lên, có kinh nghiệm dev hoặc BrSE ít nhất 2 năm.",
      ja: "日本語N2以上、開発またはBrSEとして少なくとも2年の経験があること。"
    },
    benefits: {
      vi: "Hỗ trợ visa, nhà ở, vé máy bay. Môi trường làm việc chuyên nghiệp tại trung tâm Tokyo.",
      ja: "ビザ、住宅、航空券のサポート。東京中心部でのプロフェッショナルな作業環境。"
    },
    status: "published",
    published_at: "2026-05-18T09:00:00Z"
  },
  {
    id: "job-3",
    slug: "ai-engineer-computer-vision",
    title: { vi: "AI Engineer (Computer Vision)", ja: "AIエンジニア (コンピュータビジョン)" },
    department: { vi: "AI R&D", ja: "AI研究開発" },
    location: { vi: "Hà Nội, Việt Nam", ja: "ベトナム、ハノイ" },
    employment_type: { vi: "Full-time", ja: "正社員" },
    salary_range: { vi: "Thỏa thuận", ja: "応相談" },
    skills: ["Python", "PyTorch", "OpenCV", "Deep Learning"],
    description: {
      vi: "Nghiên cứu và triển khai các mô hình AI nhận diện khuôn mặt, phân tích hình ảnh trong y tế và sản xuất.",
      ja: "医療や製造における顔認識、画像分析のAIモデルを研究し、実装します。"
    },
    requirements: {
      vi: "Có kiến thức tốt về toán học và machine learning, thành thạo Python và các AI framework.",
      ja: "数学と機械学習の優れた知識、PythonとAIフレームワークの習熟。"
    },
    benefits: {
      vi: "Được làm việc trực tiếp với các chuyên gia AI đầu ngành, cơ hội công bố nghiên cứu.",
      ja: "業界をリードするAI専門家と直接協力し、研究を発表する機会。"
    },
    status: "published",
    published_at: "2026-05-22T10:00:00Z"
  },
  {
    id: "job-4",
    slug: "blockchain-developer-solidity",
    title: { vi: "Blockchain Developer (Solidity/Rust)", ja: "ブロックチェーン開発者 (Solidity/Rust)" },
    department: { vi: "Engineering", ja: "エンジニアリング" },
    location: { vi: "Đà Nẵng, Việt Nam", ja: "ベトナム、ダナン" },
    employment_type: { vi: "Full-time", ja: "正社員" },
    salary_range: { vi: "2500$ - 4500$", ja: "2500$ - 4500$" },
    skills: ["Solidity", "Rust", "Web3.js", "Ethereum/Polygon"],
    description: {
      vi: "Phát triển smart contract cho sàn giao dịch NFT và nền tảng Carbon Credit Marketplace.",
      ja: "NFT取引所やカーボンクレジットマーケットプレイスプラットフォーム向けのスマートコントラクトを開発します。"
    },
    requirements: {
      vi: "Kinh nghiệm thực chiến với ít nhất 1 dự án blockchain public, hiểu về bảo mật smart contract.",
      ja: "少なくとも1つのパブリックブロックチェーンプロジェクトの実務経験があり、スマートコントラクトのセキュリティについて理解していること。"
    },
    benefits: {
      vi: "Bonus dự án hấp dẫn, làm việc remote linh hoạt.",
      ja: "魅力的なプロジェクトボーナス、柔軟なリモートワーク。"
    },
    status: "published",
    published_at: "2026-05-24T14:00:00Z"
  }
];

export const newsArticles: NewsArticle[] = [
  {
    id: "news-1",
    slug: "fabbi-dat-giai-thuong-sao-khue-2024",
    title: {
      vi: "Fabbi Holdings lần thứ 4 liên tiếp nhận giải thưởng Sao Khuê 2024",
      ja: "Fabbi Holdingsが4年連続でサオクエ賞2024を受賞"
    },
    excerpt: {
      vi: "Vượt qua hàng trăm doanh nghiệp CNTT, Fabbi tiếp tục khẳng định vị thế với giải thưởng Sao Khuê cho giải pháp chuyển đổi số xuất sắc.",
      ja: "何百ものIT企業を抑え、Fabbiは優れたデジタルトランスフォーメーションソリューションでサオクエ賞を受賞し、その地位を確立し続けています。"
    },
    body: {
      vi: "Năm 2024 đánh dấu cột mốc quan trọng khi Fabbi Holdings tiếp tục được vinh danh tại lễ trao giải Sao Khuê. Đây là minh chứng cho sự nỗ lực không ngừng của đội ngũ nhân sự trong việc nghiên cứu và phát triển các giải pháp công nghệ cao, đặc biệt là trong lĩnh vực AI và chuyển đổi số.",
      ja: "2024年は、Fabbi Holdingsがサオクエ賞授賞式で引き続き表彰される重要な節目となりました。これは、特にAIとデジタルトランスフォーメーションの分野で、ハイテクソリューションの研究開発における当社のスタッフの絶え間ない努力の証です。"
    },
    cover_image: "/images/Sao-Khue-2024.jpg",
    category: { vi: "Giải thưởng", ja: "アワード" },
    tags: ["Sao Khuê", "Công nghệ", "AI"],
    status: "published",
    author: { vi: "Ban Truyền thông", ja: "広報部" },
    published_at: "2024-04-15T09:00:00Z"
  },
  {
    id: "news-2",
    slug: "teambuilding-2023-vung-chan-troi-moi",
    title: {
      vi: "Teambuilding 2023: Kết nối đam mê, chinh phục đỉnh cao",
      ja: "チームビルディング2023：情熱を繋ぎ、頂点を極める"
    },
    excerpt: {
      vi: "Hành trình Teambuilding đầy cảm xúc của gia đình Fabbi tại bãi biển xanh cát trắng, nơi những trái tim công nghệ cùng hòa chung nhịp đập.",
      ja: "青い海と白い砂浜でのFabbiファミリーの感動的なチームビルディングの旅。そこではテクノロジーの心が一つになります。"
    },
    body: {
      vi: "Chương trình Teambuilding 2023 đã diễn ra thành công tốt đẹp với sự tham gia của hơn 300 thành viên từ các văn phòng Hà Nội và Nhật Bản. Đây không chỉ là dịp để nghỉ ngơi mà còn là cơ hội để thắt chặt tình đoàn kết, xây dựng văn hóa doanh nghiệp vững mạnh.",
      ja: "チームビルディング2023プログラムは、ハノイと日本のオフィスから300人以上のメンバーが参加し、大成功を収めました。これは単なる休息の機会ではなく、団結を強め、強力な企業文化を築く機会でもありました。"
    },
    cover_image: "/images/Teambuilding-scaled.jpg",
    category: { vi: "Văn hóa", ja: "カルチャー" },
    tags: ["Teambuilding", "Văn hóa Fabbi"],
    status: "published",
    author: { vi: "Ban Văn hóa", ja: "文化部" },
    published_at: "2023-08-20T14:30:00Z"
  },
  {
    id: "news-3",
    slug: "hop-tac-chien-luoc-vn-jp-2024",
    title: {
      vi: "Fabbi Holdings tăng cường hợp tác chiến lược công nghệ Việt - Nhật 2024",
      ja: "Fabbi Holdingsが2024年ベトナム・日本技術戦略的パートナーシップを強化"
    },
    excerpt: {
      vi: "Sự kiện kết nối doanh nghiệp Việt Nam - Nhật Bản với sự tham gia của nhiều tập đoàn lớn.",
      ja: "多くの大企業が参加したベトナム・日本企業マッチングイベント。"
    },
    body: {
      vi: "Fabbi Holdings tự hào là đơn vị tiên phong trong việc thúc đẩy quan hệ hợp tác kinh tế, đặc biệt trong lĩnh vực ICT giữa hai quốc gia Việt Nam và Nhật Bản.",
      ja: "Fabbi Holdingsは、特にベトナムと日本の両国間のICT分野における経済協力関係を促進する先駆者であることを誇りに思っています。"
    },
    cover_image: "/images/Hop-tac-CN-VN-HK-2024.jpg",
    category: { vi: "Sự kiện", ja: "イベント" },
    tags: ["Hợp tác", "ICT", "Nhật Bản"],
    status: "published",
    author: { vi: "Ban Truyền thông", ja: "広報部" },
    published_at: "2024-05-10T09:00:00Z"
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "port-1",
    slug: "zenpost-ecommerce-platform",
    title: { vi: "Zenpost - E-commerce Platform", ja: "Zenpost - Eコマースプラットフォーム" },
    client: { vi: "Zenpost Inc.", ja: "Zenpost株式会社" },
    summary: {
      vi: "Nền tảng thương mại điện tử với hệ thống quản lý đơn hàng, kho vận và tích hợp thanh toán toàn cầu.",
      ja: "受注管理、物流、グローバル決済統合を備えたEコマースプラットフォーム。"
    },
    problem: {
      vi: "Khách hàng cần một nền tảng bán hàng online có khả năng mở rộng quy mô nhanh chóng, tích hợp với nhiều cổng thanh toán và hệ thống vận chuyển tại Nhật Bản.",
      ja: "顧客は、迅速に拡張可能で、日本国内の複数の決済ゲートウェイや配送システムと統合できるオンライン販売プラットフォームを必要としていました。"
    },
    solution: {
      vi: "Xây dựng nền tảng e-commerce cloud-native với kiến trúc microservices, hỗ trợ xử lý hàng triệu đơn hàng mỗi ngày, tích hợp Stripe, PayPay và các đơn vị vận chuyển Nhật Bản.",
      ja: "マイクロサービスアーキテクチャを備えたクラウドネイティブのEコマースプラットフォームを構築し、1日あたり数百万件の注文の処理をサポートし、Stripe、PayPay、および日本の配送業者を統合しました。"
    },
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    cover_image: "/images/Zenpost-0-1-1024x532.png",
    status: "completed",
    year: 2023
  },
  {
    id: "port-2",
    slug: "bondbod-social-commerce",
    title: { vi: "Bondbod - Social Commerce App", ja: "Bondbod - ソーシャルコマースアプリ" },
    client: { vi: "Bondbod Vietnam", ja: "Bondbodベトナム" },
    summary: {
      vi: "Ứng dụng thương mại xã hội kết nối người bán và người mua qua các tính năng livestream, chat và đánh giá thông minh.",
      ja: "ライブストリーム、チャット、スマートレビュー機能を通じて売り手と買い手を繋ぐソーシャルコマースアプリ。"
    },
    problem: {
      vi: "Thị trường thương mại xã hội tại Việt Nam đang phát triển nhanh nhưng thiếu nền tảng đủ linh hoạt cho người bán hàng cá nhân.",
      ja: "ベトナムのソーシャルコマース市場は急速に成長していますが、個人の売り手にとって十分に柔軟なプラットフォームが不足しています。"
    },
    solution: {
      vi: "Phát triển ứng dụng di động với tính năng livestream bán hàng tích hợp, hệ thống chatbot AI và cơ chế xếp hạng uy tín người bán.",
      ja: "統合されたライブストリーム販売機能、AIチャットボットシステム、および売り手の評判評価メカニズムを備えたモバイルアプリケーションの開発。"
    },
    technologies: ["React Native", "Go", "PostgreSQL", "Firebase"],
    cover_image: "/images/Bondbod-2-1024x732.png",
    status: "completed",
    year: 2023
  },
  {
    id: "port-3",
    slug: "glams-beauty-tech",
    title: { vi: "Glams - Beauty Tech Platform", ja: "Glams - ビューティーテックプラットフォーム" },
    client: { vi: "Glams Inc.", ja: "Glams株式会社" },
    summary: {
      vi: "Nền tảng công nghệ làm đẹp kết nối thẩm mỹ viên với khách hàng qua đặt lịch thông minh, tư vấn AI và quản lý tồn kho.",
      ja: "スマートな予約、AIコンサルティング、在庫管理を通じて美容師と顧客を繋ぐビューティーテクノロジープラットフォーム。"
    },
    technologies: ["React", "Python", "TensorFlow", "PostgreSQL"],
    cover_image: "/images/Glams-0-1.png",
    status: "completed",
    year: 2024
  },
  {
    id: "port-4",
    slug: "tekko-manufacturing-iot",
    title: { vi: "Tekko - Manufacturing IoT Dashboard", ja: "Tekko - 製造業IoTダッシュボード" },
    client: { vi: "Tekko Corporation", ja: "Tekko株式会社" },
    summary: {
      vi: "Dashboard IoT giám sát nhà máy theo thời gian thực với cảnh báo thông minh và tối ưu hóa năng lượng tiêu thụ.",
      ja: "スマートアラートとエネルギー消費の最適化を備えた、工場監視用リアルタイムIoTダッシュボード。"
    },
    technologies: ["Vue.js", "Python", "InfluxDB", "Grafana"],
    cover_image: "/images/Tekko-0-1.png",
    status: "completed",
    year: 2023
  }
];

