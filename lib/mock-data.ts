/**
 * Comprehensive Mock Data for Fabbi Corporate Website
 * Consolidated from crawl artifacts in coding-packs/crawlings/processed/
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
  image?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: Translation;
  excerpt: Translation;
  body: Translation;
  cover_image: string;
  content_images?: string[];
  category: string; // Changed to string for easier mapping to categoryLabels
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

export interface Activity {
  id: string;
  title: Translation;
  icon: string;
  description: Translation;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: Translation;
  slug: string;
}

export interface LeaderItem {
  id: string;
  name: Translation;
  title: Translation;
  image: string;
}

export interface Office {
  id: string;
  name: Translation;
  address: Translation;
  phone: string;
}

export interface SiteSettings {
  companyName: Translation;
  slogan: Translation;
  founded: string;
  representative: {
    name: Translation;
    title: Translation;
  };
  headcount: string;
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    tiktok: string;
  };
  offices: Office[];
}

export const siteSettings: SiteSettings = {
  companyName: { vi: "Fabbi Holdings", ja: "Fabbi Holdings" },
  slogan: { vi: "Chạm đến tương lai bằng công nghệ", ja: "テクノロジーで未来に触れる" },
  founded: "2018-03-18",
  representative: {
    name: { vi: "Vũ Văn Tư", ja: "武 文思 (SABI VU)" },
    title: { vi: "Chủ tịch kiêm Tổng giám đốc", ja: "代表取締役会長兼CEO" }
  },
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
        ja: "Tầng 11, Detech Tower II, 107 Nguyễn Phong Sắc, Cầu Giấy, Hà Nội"
      },
      phone: "+84 24 6259 3637"
    },
    {
      id: "office-tokyo",
      name: { vi: "Trụ sở Tokyo", ja: "東京本社" },
      address: {
        vi: "Tầng 11, Tòa nhà WTC Annex, 2-3-8 Hamamatsucho, Quận Minato, Tokyo, Nhật Bản",
        ja: "〒105-0013 東京都港区海岸1-2-3 汐留芝離宮ビルディング 21階"
      },
      phone: "+81 03-6806-0790"
    }
  ]
};

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
      ja: "数百のIT企業の中から、Fabbiは優れたデジタルトランスフォーメーションソリューションでサオクエ賞を受賞し、その地位を改めて証明しました。"
    },
    body: {
      vi: "Fabbi Holdings vinh dự đón nhận giải thưởng Sao Khuê 2024, khẳng định vị thế tiên phong trong lĩnh vực chuyển đổi số và AI tại Việt Nam. Đây là kết quả của nỗ lực không ngừng nghỉ trong việc nghiên cứu và phát triển giải pháp công nghệ.\n\nGiải thưởng Sao Khuê là sự ghi nhận xứng đáng cho sự tận tâm của đội ngũ Fabbi trong việc mang đến giá trị thực tiễn cho khách hàng. Chúng tôi cam kết sẽ tiếp tục sáng tạo, đồng hành cùng doanh nghiệp trong hành trình số hóa.\n\nTrong tương lai, Fabbi sẽ tiếp tục tập trung vào các giải pháp AI tự động hóa và Smart Manufacturing, hướng tới mục tiêu trở thành tập đoàn công nghệ toàn cầu.",
      ja: "Fabbi Holdingsはサオクエ賞2024を受賞し、ベトナムにおけるデジタルトランスフォーメーションとAI分野でのパイオニアとしての地位を確固たるものにしました。これは、テクノロジーソリューションの研究開発における絶え間ない努力の結果です。\n\nサオクエ賞は、お客様に実践的な価値を提供するためのFabbiチームの献身に対する当然の評価です。私たちは引き続き革新を続け、企業のデジタル化の旅に寄り添うことを約束します。\n\n将来的には、FabbiはAI自動化ソリューションとスマートマニュファクチャリングに引き続き注力し、グローバルテクノロジーグループを目指します。"
    },
    cover_image: "/images/Sao-Khue-2024.jpg",
    category: "giai_thuong",
    tags: ["Sao Khuê", "Công nghệ"],
    status: "published",
    author: { vi: "Ban Truyền thông", ja: "広報部" },
    published_at: "2024-04-15T09:00:00Z"
  },
  {
    id: "news-2",
    slug: "nguoi-fabbi-tieu-bieu-q1",
    title: {
      vi: "Người Fabbi tiêu biểu Quý 1",
      ja: "第1四半期のFabbiの人々"
    },
    excerpt: {
      vi: "Vinh danh những gương mặt xuất sắc.",
      ja: "優秀なFabbiのメンバーを表彰。"
    },
    body: {
      vi: "Vinh danh những gương mặt xuất sắc đã có đóng góp to lớn cho Fabbi trong Quý 1. Họ không chỉ là những nhân viên giỏi mà còn là những tấm gương về sự nhiệt huyết và tinh thần học hỏi không ngừng.\n\nĐại diện Ban Nhân sự cho biết: 'Chúng tôi rất tự hào về sự phát triển của các bạn. Sự đóng góp của các bạn chính là động lực để Fabbi vươn xa hơn trên bản đồ công nghệ khu vực.'\n\nBuổi vinh danh không chỉ trao thưởng mà còn là dịp để chia sẻ về những dự án đầy thách thức đã vượt qua. Fabbi luôn tạo môi trường để nhân viên tỏa sáng và phát huy tài năng.",
      ja: "第1四半期にFabbiに多大な貢献をした優秀なメンバーを表彰します。彼らは優れた従業員であるだけでなく、熱意と絶え間ない学習精神の模範でもあります。\n\n人事部は次のように述べています。「私たちは皆さんの成長を非常に誇りに思います。皆さんの貢献こそが、Fabbiが地域のテクノロジーマップ上でさらに飛躍するための原動力です。」\n\n表彰式は単なる授与だけでなく、困難なプロジェクトを乗り越えた経験を共有する機会でもあります。Fabbiは常に、従業員が輝き、才能を発揮できる環境を作り続けています。"
    },
    cover_image: "/images/Mr-LinhNV.png",
    category: "nguoi_fabbi",
    tags: ["Người Fabbi"],
    status: "published",
    author: { vi: "Ban Nhân sự", ja: "人事部" },
    published_at: "2024-05-20T09:00:00Z"
  },
  {
    id: "news-3",
    slug: "hoat-dong-teambuilding-he-2024",
    title: {
      vi: "Teambuilding hè 2024 tại Đà Nẵng",
      ja: "ダナンでのサマーチームビルディング2024"
    },
    excerpt: {
      vi: "Kết nối sức mạnh tại bãi biển Đà Nẵng.",
      ja: "ダナンのビーチで結束を深める。"
    },
    body: {
      vi: "Chuyến đi Teambuilding tại Đà Nẵng đã để lại nhiều kỷ niệm khó quên. Với các hoạt động team building đầy năng lượng trên bãi biển Mỹ Khê, chúng tôi đã cùng nhau vượt qua những thử thách cam go.\n\nKhông chỉ là những trò chơi vận động, chương trình còn là dịp để các bộ phận giao lưu, thấu hiểu nhau hơn. Từ những cuộc thi nhỏ đến đêm Gala Dinner ấm cúng, tinh thần đồng đội đã được đẩy lên cao trào.\n\n'Đà Nẵng không chỉ đẹp bởi cảnh sắc mà còn đẹp bởi sự gắn kết mà chúng tôi tạo ra ở đây,' một thành viên chia sẻ. Chuyến đi này chắc chắn sẽ là nguồn năng lượng mới để tất cả chúng tôi bắt đầu những dự án lớn sắp tới.",
      ja: "ダナンでのチームビルディング旅行は、忘れられない思い出をたくさん残しました。ミーケビーチでのエネルギッシュなチームビルディング活動を通じて、私たちは困難な課題を一緒に乗り越えました。\n\n単なる運動ゲームだけでなく、各部署が交流し、お互いをより深く理解する機会にもなりました。小さな競技から温かいガラディナーまで、チームスピリットは最高潮に達しました。\n\n「ダナンはその景色だけでなく、私たちがここで築いた絆によっても美しいです」とメンバーの一人が語りました。この旅行は、私たちが今後の大きなプロジェクトを開始するための新しいエネルギー源になることは間違いありません。"
    },
    cover_image: "/images/Teambuilding-scaled.jpg",
    category: "cac_hoat_dong",
    tags: ["Teambuilding"],
    status: "published",
    author: { vi: "Ban Văn hóa", ja: "文化部" },
    published_at: "2024-05-25T09:00:00Z"
  },
  {
    id: "news-4",
    slug: "chuyen-nguoi-fabbi-dev-vuon-minh",
    title: {
      vi: "Chuyện Người Fabbi: Hành trình từ Fresher đến Senior",
      ja: "Fabbiの人々の物語：フレッシャーからシニアへの道のり"
    },
    excerpt: {
      vi: "Lắng nghe chia sẻ từ các bạn lập trình viên đã gắn bó và trưởng thành cùng Fabbi.",
      ja: "Fabbiと共に歩み、成長してきたプログラマーたちの声をお聞きください。"
    },
    body: {
      vi: "Hành trình phát triển tại Fabbi không bao giờ là một đường thẳng đơn giản. Đó là sự kết hợp giữa đào tạo bài bản, mentorship từ những anh chị đi trước và cơ hội được thử sức thực tế ngay từ những ngày đầu.\n\nTừ những dòng code đầu tiên còn nhiều bỡ ngỡ, các bạn Fresher đã nhanh chóng trở thành những nhân tố chủ chốt. Tại Fabbi, chúng tôi không chỉ làm việc, chúng tôi cùng nhau lớn lên. Mỗi thử thách trong dự án là một bài học đắt giá, và mỗi thành công là niềm tự hào chung của cả đội ngũ.\n\nChúng tôi tiếp tục tìm kiếm những tài năng mới, những con người khao khát được chinh phục công nghệ. Nếu bạn đang tìm kiếm một nơi không chỉ để 'làm việc' mà là để 'phát triển', Fabbi chính là nhà.",
      ja: "Fabbiでの成長の旅は、決して単純な一直線ではありません。体系的なトレーニング、先輩からのメンターシップ、そして入社当初からの実践的な機会の組み合わせです。\n\n初めてのコードに戸惑っていたフレッシャーたちは、すぐに重要な戦力へと成長しました。Fabbiでは、私たちは単に仕事をするだけでなく、共に成長していきます。プロジェクトにおけるすべての課題は価値ある教訓であり、すべての成功はチーム全体の誇りです。\n\n私たちは、テクノロジーを征服しようと意欲を持つ新しい才能を常に探し求めています。単に「仕事」をするだけでなく、「成長」できる場所を探しているなら、Fabbiこそがその場所です。"
    },
    cover_image: "/images/Hop-tac-CN-VN-HK-2024.jpg",
    category: "nguoi_fabbi",
    tags: ["Người Fabbi", "Career"],
    status: "published",
    author: { vi: "Ban Nhân sự", ja: "人事部" },
    published_at: "2024-05-10T09:00:00Z"
  }
];

export const jobs: Job[] = [
  {
    id: "job-1",
    slug: "senior-fullstack-developer",
    title: { vi: "Senior Fullstack Developer", ja: "シニアフルスタック開発者" },
    department: { vi: "Engineering", ja: "エンジニアリング" },
    location: { vi: "Hà Nội / Hybrid", ja: "ハノイ / ハイブリッド" },
    employment_type: { vi: "Toàn thời gian", ja: "正社員" },
    salary_range: { vi: "35.000.000 - 55.000.000 VND", ja: "35,000,000 - 55,000,000 VND" },
    skills: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
    description: {
      vi: "Fabbi đang tìm kiếm Senior Fullstack Developer tham gia xây dựng các nền tảng web quy mô lớn cho khách hàng Nhật Bản và Việt Nam. Bạn sẽ làm việc trực tiếp với BA, PM, designer và đội backend/frontend để biến yêu cầu nghiệp vụ thành sản phẩm ổn định, dễ mở rộng và có trải nghiệm người dùng tốt.\n\nVai trò này phù hợp với ứng viên đã từng dẫn dắt module hoặc team nhỏ, có khả năng nhìn vấn đề từ cả góc độ kỹ thuật lẫn sản phẩm. Bạn không chỉ viết code mà còn tham gia review kiến trúc, tối ưu hiệu năng, chuẩn hóa luồng phát triển và hỗ trợ các thành viên junior phát triển kỹ năng.\n\nTrong các dự án thực tế, bạn sẽ được tham gia từ giai đoạn phân tích yêu cầu, thiết kế API, xây dựng UI, tích hợp hệ thống, triển khai CI/CD đến vận hành sau release. Fabbi ưu tiên cách làm rõ ràng, minh bạch, có trách nhiệm với chất lượng sản phẩm và tác động thực tế đến khách hàng.",
      ja: "Fabbiでは、日本およびベトナムのお客様向けに大規模なWebプラットフォームを構築するシニアフルスタック開発者を募集しています。BA、PM、デザイナー、バックエンド・フロントエンドチームと連携し、業務要件を安定性と拡張性の高いプロダクトへ落とし込んでいただきます。\n\nこのポジションは、モジュールや小規模チームのリード経験があり、技術とプロダクトの両面から課題を捉えられる方に適しています。実装だけでなく、アーキテクチャレビュー、パフォーマンス改善、開発フローの標準化、ジュニアメンバーの育成にも関わります。\n\n要件分析、API設計、UI構築、システム連携、CI/CD、リリース後の運用まで、実プロジェクトの幅広い工程に参加できます。"
    },
    requirements: {
      vi: "Tối thiểu 4 năm kinh nghiệm phát triển web application với JavaScript/TypeScript. Thành thạo React hoặc Next.js, có kinh nghiệm xây dựng component có khả năng tái sử dụng và tối ưu hiệu năng render.\n\nCó kinh nghiệm thiết kế REST API hoặc GraphQL, làm việc với cơ sở dữ liệu quan hệ như PostgreSQL/MySQL và hiểu các nguyên tắc transaction, indexing, migration. Biết cách debug vấn đề production, đọc log, phân tích nguyên nhân gốc và đưa ra phương án khắc phục bền vững.\n\nƯu tiên ứng viên từng làm việc với khách hàng Nhật, có khả năng đọc hiểu tài liệu tiếng Anh hoặc tiếng Nhật, quen với Agile/Scrum, code review và quy trình release có kiểm soát. Tư duy ownership, giao tiếp rõ ràng và chủ động làm rõ yêu cầu là bắt buộc.",
      ja: "JavaScript/TypeScriptを用いたWebアプリケーション開発経験4年以上。ReactまたはNext.jsに精通し、再利用可能なコンポーネント設計とレンダリングパフォーマンス改善の経験があること。\n\nREST APIまたはGraphQLの設計経験、PostgreSQL/MySQLなどのリレーショナルデータベースの利用経験、transaction・indexing・migrationへの理解が必要です。\n\n日本のお客様との開発経験、英語または日本語ドキュメントの読解力、Agile/Scrum、コードレビュー、管理されたリリースプロセスの経験がある方を歓迎します。"
    },
    benefits: {
      vi: "Mức lương cạnh tranh theo năng lực, review định kỳ và thưởng theo hiệu quả dự án. Môi trường làm việc hybrid linh hoạt, thiết bị làm việc đầy đủ, cơ hội tham gia dự án lớn với khách hàng Nhật Bản.\n\nĐược đào tạo kỹ thuật, ngoại ngữ, kỹ năng quản lý dự án; có lộ trình phát triển lên Tech Lead, Solution Architect hoặc Engineering Manager. Bảo hiểm, khám sức khỏe, du lịch, teambuilding và các hoạt động nội bộ được tổ chức thường xuyên.",
      ja: "能力に応じた競争力のある給与、定期評価、プロジェクト成果に応じた報酬があります。柔軟なハイブリッド勤務、十分な作業環境、日本のお客様との大規模プロジェクトに参加する機会があります。\n\n技術、語学、プロジェクト管理の研修を受けられ、Tech Lead、Solution Architect、Engineering Managerへのキャリアパスがあります。"
    },
    status: "published",
    published_at: "2024-06-01T09:00:00Z",
    image: "/images/Hop-tac-CN-VN-HK-2024.jpg"
  },
  {
    id: "job-2",
    slug: "business-analyst-japanese-market",
    title: { vi: "Business Analyst - Japanese Market", ja: "ビジネスアナリスト（日本市場）" },
    department: { vi: "Business Analysis", ja: "ビジネス分析" },
    location: { vi: "Hà Nội", ja: "ハノイ" },
    employment_type: { vi: "Toàn thời gian", ja: "正社員" },
    salary_range: { vi: "25.000.000 - 45.000.000 VND", ja: "25,000,000 - 45,000,000 VND" },
    skills: ["Business Analysis", "Japanese N2", "Agile", "Figma", "SQL", "Documentation"],
    description: {
      vi: "Business Analyst tại Fabbi đóng vai trò cầu nối giữa khách hàng Nhật Bản và đội phát triển tại Việt Nam. Bạn sẽ tiếp nhận nhu cầu kinh doanh, phân tích quy trình hiện tại, đề xuất luồng nghiệp vụ tối ưu và chuyển hóa thành tài liệu rõ ràng để đội kỹ thuật triển khai chính xác.\n\nCông việc bao gồm tổ chức workshop với khách hàng, viết requirement, user story, acceptance criteria, wireframe, hỗ trợ QA xây dựng test case và đồng hành cùng PM trong quá trình quản lý thay đổi. Đây là vị trí có ảnh hưởng trực tiếp đến chất lượng sản phẩm vì mọi quyết định phân tích đều tác động đến trải nghiệm cuối cùng của người dùng.\n\nBạn sẽ được làm việc trong môi trường đa văn hóa, tiếp xúc thường xuyên với khách hàng Nhật, học cách vận hành dự án chuẩn offshore và phát triển năng lực tư vấn giải pháp.",
      ja: "Fabbiのビジネスアナリストは、日本のお客様とベトナム開発チームをつなぐ重要な役割を担います。ビジネス要件を把握し、現行業務を分析し、最適な業務フローを提案し、開発チームが正確に実装できる明確なドキュメントへ落とし込みます。\n\nお客様とのワークショップ、要件定義、ユーザーストーリー、受入条件、ワイヤーフレーム作成、QAのテストケース作成支援、変更管理などを担当します。\n\n多文化環境で日本のお客様と日常的に連携し、オフショア開発とソリューション提案力を伸ばせるポジションです。"
    },
    requirements: {
      vi: "Có ít nhất 2 năm kinh nghiệm Business Analyst trong dự án phần mềm. Giao tiếp tiếng Nhật tương đương N2 trở lên, có khả năng làm việc trực tiếp với khách hàng qua meeting, chat và tài liệu.\n\nThành thạo viết tài liệu yêu cầu, user story, flow diagram, wireframe và acceptance criteria. Hiểu vòng đời phát triển phần mềm, biết cách phối hợp với developer, tester, designer và PM để xử lý thay đổi yêu cầu.\n\nƯu tiên ứng viên có nền tảng kỹ thuật, từng làm dự án web/mobile, hiểu SQL cơ bản, biết đọc API spec và có tư duy phân tích hệ thống. Cần cẩn thận, logic, chủ động hỏi rõ vấn đề và có khả năng diễn đạt mạch lạc.",
      ja: "ソフトウェア開発プロジェクトでのBA経験2年以上。N2相当以上の日本語力を持ち、会議、チャット、ドキュメントを通じてお客様と直接コミュニケーションできること。\n\n要件定義書、ユーザーストーリー、フロー図、ワイヤーフレーム、受入条件の作成に慣れていること。ソフトウェア開発ライフサイクルを理解し、開発者、テスター、デザイナー、PMと連携できること。\n\n技術バックグラウンド、Web/モバイル案件経験、基本的なSQL、API仕様理解がある方を歓迎します。"
    },
    benefits: {
      vi: "Cơ hội làm việc trực tiếp với khách hàng Nhật Bản, phát triển tiếng Nhật chuyên ngành và kỹ năng tư vấn nghiệp vụ. Lộ trình phát triển lên Senior BA, Product Owner hoặc Project Manager.\n\nThu nhập cạnh tranh, thưởng dự án, hỗ trợ chứng chỉ, lớp học nội bộ, bảo hiểm đầy đủ, nghỉ phép năm, du lịch công ty và môi trường trẻ trung, hỗ trợ nhau trong công việc.",
      ja: "日本のお客様と直接働き、専門的な日本語力と業務コンサルティング力を高める機会があります。Senior BA、Product Owner、Project Managerへのキャリアパスがあります。\n\n競争力のある給与、プロジェクトボーナス、資格支援、社内研修、保険、年次休暇、社員旅行などがあります。"
    },
    status: "published",
    published_at: "2024-06-05T09:00:00Z",
    image: "/images/Fabbi-x-CMC-1.jpg"
  },
  {
    id: "job-3",
    slug: "ai-engineer-computer-vision",
    title: { vi: "AI Engineer - Computer Vision", ja: "AIエンジニア - コンピュータビジョン" },
    department: { vi: "AI Lab", ja: "AIラボ" },
    location: { vi: "Hà Nội / Remote", ja: "ハノイ / リモート" },
    employment_type: { vi: "Toàn thời gian", ja: "正社員" },
    salary_range: { vi: "40.000.000 - 70.000.000 VND", ja: "40,000,000 - 70,000,000 VND" },
    skills: ["Python", "PyTorch", "OpenCV", "MLOps", "Computer Vision", "Docker"],
    description: {
      vi: "AI Engineer tại Fabbi tham gia nghiên cứu và triển khai các giải pháp Computer Vision cho nhà máy, bán lẻ, logistics và kiểm định chất lượng. Bạn sẽ xây dựng pipeline từ thu thập dữ liệu, gán nhãn, huấn luyện mô hình, đánh giá, tối ưu inference đến triển khai thực tế trên cloud hoặc edge device.\n\nCác bài toán có thể bao gồm phát hiện lỗi sản phẩm, nhận diện đối tượng, OCR, tracking, phân tích hành vi hoặc tự động hóa kiểm tra hình ảnh. Bạn sẽ phối hợp với khách hàng để hiểu bối cảnh vận hành, chuyển mục tiêu kinh doanh thành metric kỹ thuật và đảm bảo mô hình hoạt động ổn định trong môi trường thực tế.\n\nFabbi khuyến khích cách làm thực dụng: mô hình tốt không chỉ nằm ở accuracy mà còn ở tốc độ, chi phí, khả năng vận hành và khả năng giải thích cho khách hàng.",
      ja: "FabbiのAIエンジニアは、製造、小売、物流、品質検査向けのComputer Visionソリューションの研究・実装に携わります。データ収集、アノテーション、モデル学習、評価、推論最適化、クラウドまたはエッジデバイスへの導入まで担当します。\n\n不良検知、物体認識、OCR、トラッキング、行動分析、画像検査自動化などの課題に取り組みます。\n\nFabbiでは、accuracyだけでなく、速度、コスト、運用性、説明可能性を重視した実用的なAI開発を大切にしています。"
    },
    requirements: {
      vi: "Có ít nhất 2 năm kinh nghiệm với Python và một framework ML như PyTorch hoặc TensorFlow. Hiểu các kiến trúc phổ biến trong Computer Vision như CNN, YOLO, segmentation, OCR hoặc transformer-based vision models.\n\nCó kinh nghiệm xử lý dữ liệu ảnh, augmentation, đánh giá mô hình, tối ưu inference và đóng gói mô hình bằng Docker/API. Biết sử dụng Git, Linux, notebook, logging thí nghiệm và có thói quen ghi lại kết quả để so sánh có hệ thống.\n\nƯu tiên ứng viên từng triển khai mô hình lên production, có kinh nghiệm MLOps, ONNX/TensorRT, cloud GPU hoặc edge device. Khả năng đọc paper, thử nghiệm nhanh và giải thích trade-off rõ ràng là lợi thế lớn.",
      ja: "PythonおよびPyTorchまたはTensorFlowなどのMLフレームワーク経験2年以上。CNN、YOLO、segmentation、OCR、TransformerベースのVision Modelなどへの理解が必要です。\n\n画像データ処理、augmentation、モデル評価、推論最適化、Docker/APIによるモデル提供の経験があること。Git、Linux、notebook、実験ログを扱えること。\n\nProduction導入、MLOps、ONNX/TensorRT、クラウドGPU、エッジデバイス経験がある方を歓迎します。"
    },
    benefits: {
      vi: "Được làm các bài toán AI có dữ liệu và ngữ cảnh thực tế, có cơ hội thử nghiệm công nghệ mới và tham gia xây dựng năng lực AI Lab của Fabbi. Ngân sách học tập, chia sẻ kỹ thuật nội bộ và hỗ trợ tham gia hội thảo/chứng chỉ phù hợp.\n\nChế độ lương thưởng cạnh tranh, làm việc linh hoạt, bảo hiểm đầy đủ, review năng lực định kỳ và cơ hội phát triển thành AI Lead hoặc Solution Consultant.",
      ja: "実データと実業務に基づくAI課題に取り組み、新技術を試しながらFabbi AI Labの能力構築に参加できます。学習予算、社内技術共有、カンファレンス・資格支援があります。\n\n競争力のある給与、柔軟な勤務、保険、定期評価、AI LeadまたはSolution Consultantへの成長機会があります。"
    },
    status: "published",
    published_at: "2024-06-10T09:00:00Z",
    image: "/images/Zenpost-0-1-1024x532.png"
  }
];

export const aboutContent = {
  heroTitle: { vi: "Về Fabbi", ja: "Fabbiについて" },
  heroSubtitle: {
    vi: "Đồng hành cùng doanh nghiệp trong hành trình chuyển đổi số bằng công nghệ, con người và tinh thần trách nhiệm.",
    ja: "テクノロジー、人材、責任感を通じて企業のDXを支援します。"
  },
  vision: {
    vi: "Trở thành tập đoàn công nghệ toàn cầu, tạo ra các sản phẩm và dịch vụ có giá trị bền vững cho khách hàng, nhân viên và cộng đồng.",
    ja: "お客様、社員、社会に持続的な価値を提供するグローバルテクノロジーグループを目指します。"
  },
  mission: {
    vi: "Kết nối năng lực kỹ thuật Việt Nam với tiêu chuẩn vận hành quốc tế, giúp khách hàng giải quyết bài toán kinh doanh bằng giải pháp phần mềm thực tiễn.",
    ja: "ベトナムの技術力と国際的な運用基準を結びつけ、実用的なソフトウェアソリューションでお客様の課題解決を支援します。"
  },
  values: [
    {
      key: "customer-success",
      title: { vi: "Thành công của khách hàng", ja: "顧客の成功" },
      description: { vi: "Chúng tôi đo chất lượng bằng tác động thực tế mà sản phẩm tạo ra cho khách hàng.", ja: "私たちはプロダクトがお客様にもたらす実際の価値で品質を測ります。" }
    },
    {
      key: "continuous-growth",
      title: { vi: "Không ngừng phát triển", ja: "継続的な成長" },
      description: { vi: "Fabbi khuyến khích học hỏi, chia sẻ và cải tiến từng ngày trong mọi dự án.", ja: "Fabbiはすべてのプロジェクトで学習、共有、改善を大切にします。" }
    },
    {
      key: "ownership",
      title: { vi: "Tinh thần làm chủ", ja: "オーナーシップ" },
      description: { vi: "Mỗi thành viên chủ động chịu trách nhiệm với cam kết, chất lượng và kết quả cuối cùng.", ja: "各メンバーが約束、品質、最終成果に責任を持ちます。" }
    }
  ]
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "port-1",
    slug: "zenpost-ecommerce-platform",
    title: { vi: "Zenpost - E-commerce Platform", ja: "Zenpost - Eコマースプラットフォーム" },
    client: { vi: "Zenpost Inc.", ja: "Zenpost株式会社" },
    summary: {
      vi: "Nền tảng thương mại điện tử với hệ thống quản lý đơn hàng, kho vận và tích hợp thanh toán toàn cầu.",
      ja: "注文管理、物流システム、グローバル決済連携を備えたクラウドネイティブ型Eコマースプラットフォーム。"
    },
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    cover_image: "/images/Zenpost-0-1-1024x532.png",
    status: "completed",
    year: 2023
  }
];

export const activities: Activity[] = [
  {
    id: "du-lich",
    title: { vi: "Du lịch", ja: "旅行" },
    icon: "🌍",
    description: {
      vi: "Fabbi tổ chức các chuyến du lịch team building hàng năm.",
      ja: "Fabbiは毎年チームビルディング旅行を開催しています。"
    },
    image: "/images/Teambuilding-scaled.jpg"
  }
];

export const services: ServiceItem[] = [
  { id: "app-dev", title: { vi: "Phát triển ứng dụng & hệ thống", ja: "業務システム・アプリ開発" }, slug: "business-application-development" },
  { id: "ai", title: { vi: "Trí tuệ nhân tạo", ja: "人工知能アプリケーション開発 (AI)" }, slug: "ai-system-development" }
];

export const leadership: LeaderItem[] = [
  { id: "leader-tu-vu", name: { vi: "VŨ VĂN TƯ", ja: "武 文思 (SABI VU)" }, title: { vi: "Chủ tịch kiêm CEO", ja: "代表取締役会長兼CEO" }, image: "/images/Mr-LinhNV.png" }
];

export function getTranslation(item: Translation | undefined | null, locale: string): string {
  if (!item) return '';
  return item[locale as keyof Translation] || item.vi || '';
}

export const adapters = {
  toDbJob: (job: Job, locale: string): import('./db/types').Job => {
    const salaryMatch = getTranslation(job.salary_range, locale).match(/([\d.]+).*?([\d.]+)/);
    const salaryMin = salaryMatch ? Number(salaryMatch[1].replace(/\./g, '')) : null;
    const salaryMax = salaryMatch ? Number(salaryMatch[2].replace(/\./g, '')) : null;

    return {
      ...job,
      title: getTranslation(job.title, locale),
      description: getTranslation(job.description, locale),
      requirements: getTranslation(job.requirements, locale),
      benefits: getTranslation(job.benefits, locale),
      location: getTranslation(job.location, locale),
      employment_type: 'full-time',
      department: getTranslation(job.department, locale),
      salary_min: salaryMin,
      salary_max: salaryMax,
      currency: 'VND',
      tags: job.skills,
      summary: getTranslation(job.description, locale).split('\n\n')[0],
      views: 0,
      created_at: job.published_at,
      updated_at: job.published_at,
      closed_at: null,
      created_by: null,
      updated_by: null,
    };
  },
  toDbNewsArticle: (article: NewsArticle, locale: string): import('./db/types').NewsArticle => ({
    ...article,
    title: getTranslation(article.title, locale),
    content: getTranslation(article.body, locale),
    excerpt: getTranslation(article.excerpt, locale),
    author_name: getTranslation(article.author, locale),
    author_role: null,
    category: article.category,
    thumbnail_url: article.cover_image,
    content_images: article.content_images || null,
    views: 0,
    created_at: article.published_at,
    updated_at: article.published_at,
  })
};
