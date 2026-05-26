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
      vi: "Bạn sẽ tham gia phát triển các dự án E-commerce và Fintech quy mô lớn cho thị trường Nhật Bản và Global, làm việc trực tiếp với đội ngũ kỹ sư giàu kinh nghiệm từ Fabbi. Công việc bao gồm xây dựng và tối ưu các giao diện người dùng phức tạp, tích hợp API, quản lý state với Redux hoặc Zustand, và đảm bảo hiệu suất ứng dụng đạt trên 90 điểm Lighthouse. Bạn cũng sẽ phối hợp chặt chẽ với team Backend, Design và QA để đảm bảo chất lượng sản phẩm. Các công nghệ chính bao gồm React 18, Next.js 14 (App Router), TypeScript, Tailwind CSS, Storybook và Jest. Ngoài ra, bạn sẽ tham gia code review, viết technical documentation và mentorship cho các junior developer trong team. Môi trường làm việc chuyên nghiệp, sử dụng Agile/Scrum, có cơ hội trao đổi kỹ thuật trực tiếp với khách hàng Nhật Bản qua video call và on-site khi cần thiết.",
      ja: "日本およびグローバル市場向けの、大規模なEコマースおよびフィンテックプロジェクト的开发に参加いただきます。Fabbiのベテランエンジニアチームと直接連携し、複雑なUIの構築と最適化、API統合、Redux/Zustandでの状態管理、アプリケーションのパフォーマンス改善（ Lighthouseスコア90点以上）を担当いただきます。React 18、Next.js 14（App Router）、TypeScript、Tailwind CSS、Storybook、Jestなどの主要テクノロジーを使用します。さらに、コードレビュー、技術ドキュメントの作成、チーム内のジュニア開発者へのメンタリングにも参加いただきます。プロフェッショナルな環境でAgile/Scrumを導入し、必要に応じてビデオ通話およびオンサイトで日本の顧客と直接技術的なやり取りを行う機会もございます。"
    },
    requirements: {
      vi: "Trên 3 năm kinh nghiệm với React, hiểu biết sâu về Next.js và Performance Optimization. Thành thạo TypeScript, HTML5, CSS3 và các framework UI hiện đại. Có kinh nghiệm với RESTful API và GraphQL. Hiểu rõ về Web Performance, Core Web Vitals và cách tối ưu bundle size. Sử dụng được Git, CI/CD pipeline và Docker cơ bản. Tiếng Anh đọc hiểu tài liệu kỹ thuật tốt. Ưu tiên ứng viên có kinh nghiệm với Testing (Jest, Playwright), Design System, hoặc đã làm việc với khách hàng Nhật Bản trước đó.",
      ja: "Reactでの3年以上の経験があり、Next.jsとパフォーマンス最適化について深い理解があること。TypeScript、HTML5、CSS3、最新UIフレームワークの熟练。RESTful APIおよびGraphQLの経験があること。Webパフォーマンス、Core Web Vitals、バンドルサイズの最適化方法への深い理解。Git、CI/CDパイプライン基本的、Dockerの使用経験。技術文書を読み取る十分な英語力。Testing（Jest、Playwright）、Design Systemの経験、または日本顧客との業務経験がある方を優遇いたします。"
    },
    benefits: {
      vi: "Lương thưởng hấp dẫn, review 2 lần/năm, thưởng dự án và thưởng Tết. Làm việc trong môi trường đa quốc gia, giao tiếp trực tiếp với khách hàng Nhật Bản. Cơ hội onsite Nhật Bản từ 1-3 tháng/năm để trao đổi trực tiếp với team khách hàng. Đào tạo chuyên sâu về Frontend, React và Next.js. Hỗ trợ mua sách kỹ thuật, khóa học online (Udemy, Frontend Masters). Bảo hiểm sức khỏe cao cấp, annual health checkup. Du lịch team building hàng năm, monthly birthday party. WFH linh hoạt 2-3 ngày/tuần. Trang thiết bị máy tính MacBook Pro mới nhất.",
      ja: "魅力的な給与とボーナス、年2回のレビュー、システムボーナスと年末ボーナス。多国籍環境での勤務、日本の顧客と直接コミュニケーション。 日本へのオンサイト（年1〜3回、1〜3ヶ月）を活用し、顧客チームと直接交流する機会がございます。Frontend、React、Next.jsの専門研修を提供。技術書やオンラインコース（Udemy、Frontend Masters）の費用を補助。高端医療費保险、年度の人間ドック。年間のチームビルディング旅行、月次の誕生日会。週2〜3日のリモートワーク可能。最 новый MacBook Proを配付。"
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
      vi: "Là cầu nối liên lạc giữa team dev Việt Nam và khách hàng Nhật Bản, bạn sẽ chịu trách nhiệm quản lý tiến độ và chất lượng dự án, translate yêu cầu nghiệp vụ, và đảm bảo communication flow suôn sẻ giữa hai bên. Công việc bao gồm: soạn tài liệu kỹ thuật bằng tiếng Nhật, tổ chức và lead meeting với khách hàng (weekly status, sprint review, DEMO), viết SPEC và user story dựa trên yêu cầu Nhật Bản, theo dõi và báo cáo tiến độ dự án cho cả hai phía, xử lý và escalate issues khi cần thiết. Bạn cần hiểu biết về quy trình phát triển phần mềm (Waterfall, Agile) và các công nghệ web cơ bản để giao tiếp hiệu quả với dev team. Kinh nghiệm với JIRA, Redmine, Confluence là điểm cộng.",
      ja: "ベトナムの開発チームと日本の顧客との間のコミュニケーションの架け橋となり、プロジェクトの進捗と品質を管理いただきます。主な業務は、日本語の技術文書作成、顧客とのミーティングの主催（週次ステータス、スプリントレビュー、デモ）、日本の要件に基づくSPECとユーザーストーリーの作成、両측への進捗報告、問題発生時のエスカレーションです。ソフトウェア開発プロセス（ウォーターフォール、アジャイル）と基本的なWebテクノロジーの知識を持ち、開発チームと効果的にコミュニケーション取れる方が必要です。JIRA、Redmine、Confluenceの経験がある方優遇いたします。"
    },
    requirements: {
      vi: "Tiếng Nhật N2 trở lên (đọc hiểu tài liệu kỹ thuật, viết email business, present trong meeting). Có kinh nghiệm dev hoặc BrSE ít nhất 2 năm. Hiểu biết về quy trình phát triển phần mềm, các framework và ngôn ngữ lập trình phổ biến. Kỹ năng giao tiếp, thuyết trình và đàm phán tốt. Khả năng làm việc dưới áp lực deadline, quản lý nhiều dự án cùng lúc. Ưu tiên có kinh nghiệm onsite tại Nhật Bản hoặc đã làm việc với khách hàng Nhật trực tiếp.",
      ja: "日本語N2以上（技術文書の読解、ビジネスメールの執筆、ミーティングでのプレゼン可能的）。開発またはBrSEとして少なくとも2年の経験。ソフトウェア開発プロセス、一般的なフレームワークとプログラミング言語への理解。コミュニケーション、プレゼン、ネゴシエーションスキル豊か。締め切り前後の压力下で、複数プロジェクト同時進行的管理能力ある方。 日本へのオンサイト経験または日本の顧客との直接業務経験がある方を優遇いたします。"
    },
    benefits: {
      vi: "Hỗ trợ visa, nhà ở, vé máy bay quốc tế khi cần onsite. Môi trường làm việc chuyên nghiệp tại trung tâm Tokyo hoặc Hà Nội. Đào tạo chuyên sâu về BrSE, kỹ năng giao tiếp và quản lý dự án (PMP, Scrum Master). Cơ hội thăng tiến nhanh lên vị trí Project Manager, Account Manager. Phụ cấp ăn trưa, đi lại, điện thoại. Bảo hiểm sức khỏe quốc tế. Du lịch workcation tại Nhật Bản 1-2 lần/năm. Tham gia các seminar và conference về công nghệ, business Nhật-Việt.",
      ja: "ビザ、住宅、国際線の飛行機券のサポート（オンサイト必要時）。東京またはハノイの中心部でのプロフェッショナルな作業環境。BrSE、コミニケーションスキル、プロジェクト管理（PMP、Scrum Master）の専門研修を提供。プロジェクトマネージャー、アカウントマネージャーへの早期昇進の機会がございます。 lunch、通勤、电话の手当、国際的な医療費保险を提供。日本のワークケーション旅行（年1〜2回）、日越技術・ビジネスに関するセミナーやカンファレンスへの参加も可能です。"
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
      vi: "Nghiên cứu và triển khai các mô hình AI nhận diện khuôn mặt, phân tích hình ảnh trong y tế và sản xuất. Bạn sẽ làm việc với các dự án AI thực tế, bao gồm: phát triển mô hình Computer Vision cho bài toán Object Detection, Image Segmentation và Face Recognition; fine-tune các pre-trained model (ResNet, YOLO, EfficientNet) trên dataset riêng; xây dựng pipeline xử lý dữ liệu hình ảnh quy mô lớn (1M+ images); triển khai mô hình lên production sử dụng TensorFlow Serving, TorchServe hoặc Triton Inference Server; tối ưu hóa latency và throughput của model (quantization, pruning, distillation). Bạn cũng sẽ nghiên cứu các paper mới nhất về Vision Transformer, CLIP, SAM và đề xuất ứng dụng vào sản phẩm.",
      ja: "医療や製造における顔認識、画像分析のAIモデルを研究、実装いただきます。実際のAIプロジェクトに対応いただきます：Object Detection、Image Segmentation、Face Recognition向けのComputer Visionモデルの開発；ResNet、YOLO、EfficientNetなどの事前学習済みモデルのファインチューニング（独自データセット）；大規模画像データパイプライン（100万枚以上）の構築；TensorFlow Serving、TorchServe、Triton Inference Serverを使用した本番環境へのモデル デプロイ；量子化、プルーニング蒸留によるモデルのレイテンシとスループットの最適化。さらに、最新のVision Transformer、CLIP、SAMなどの論文を研究し、製品への応用を提案いただきます。"
    },
    requirements: {
      vi: "Có kiến thức tốt về toán học và machine learning, thành thạo Python và các AI framework (PyTorch, TensorFlow). Hiểu biết sâu về Computer Vision: CNN, Object Detection, Image Segmentation, Face Recognition. Kinh nghiệm với Deep Learning frameworks (PyTorch/TensorFlow) ít nhất 2 năm. Biết sử dụng GPU/CUDA để train model, hiểu về model optimization. Có kinh nghiệm deploy model lên cloud (AWS, GCP, Azure). Đọc hiểu paper AI tiếng Anh tốt, khả năng implement từ paper. Ưu tiên có portfolio trên Kaggle, GitHub với các project Computer Vision.",
      ja: " 数学と機械学習の優れた知識、PythonとAIフレームワーク（PyTorch、TensorFlow）の熟疇。Computer Visionの奥深い理解：CNN、Object Detection、Image Segmentation、Face Recognition。Deep Learningフレームワーク（PyTorch/TensorFlow）での2年以上の経験。GPU/CUDAを使用したモデル訓練、モデル最適化への理解。クラウド（AWS、GCP、Azure）へのモデル デプロイの経験。英語のAI論文の読解力、論文からの実装能力ある方。Kaggle、GitHubでのComputer Visionプロジェクトのポートフォリオがある方を優遇いたします。"
    },
    benefits: {
      vi: "Được làm việc trực tiếp với các chuyên gia AI đầu ngành, cơ hội công bố nghiên cứu trên các tạp chí uy tín. Trang bị GPU RTX 4090 hoặc A100 cho local training. Hỗ trợ đăng ký Arxiv, mua sách NLP/CV chuyên ngành. Khóa học chuyên sâu: Deep Learning Specialization (Coursera), Fast.ai. Tham gia AI competition trong và ngoài nước. Phụ cấp nghiên cứu, hỗ trợ chi phí conference (NeurIPS, CVPR, ICCV). Môi trường research-driven, cho phép 20% thời gian cho pet project liên quan AI.",
      ja: "業界をリードするAI専門家と直接協力し、权威ある学術誌への研究発表の機会がございます。ローカル訓練用にGPU RTX 4090またはA100を配备。Arxiv登録费用、 NLP/CV専門書の購入補助。Deep Learning Specialization（ coursera）、Fast.aiなどの専門研修を提供。国内外のAIコンテストへの参加可能。研究手当、学会出席費用（NeurIPS、CVPR、ICCV）の補助。研究主導の環境で、AI関連のペットプロジェクトに劳动時間の20%を充てることも可能でございます。"
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
      vi: "Phát triển smart contract cho sàn giao dịch NFT và nền tảng Carbon Credit Marketplace. Bạn sẽ tham gia vào các dự án Blockchain thực tế: viết smart contract bằng Solidity (ERC-20, ERC-721, ERC-1155), audit code và kiểm tra bảo mật smart contract (Sybil attack, reentrancy, front-running). Phát triển backend service với Node.js/Go để tương tác với blockchain. Tích hợp Web3.js, ethers.js với frontend React/Next.js. Xây dựng và deploy smart contract lên Ethereum, Polygon, BNB Chain. Viết automated test với Foundry, Hardhat, Waffle. Tham gia thiết kế kiến trúc hệ thống blockchain từ đầu, từ whitepaper đến production deployment. Cập nhật xu hướng DeFi, DAO, GameFi và đề xuất tính năng mới cho sản phẩm.",
      ja: "NFT取引所やカーボンクレジットマーケットプレイスプラットフォーム向けのスマートコントラクトを開発いただきます。実際のBlockchainプロジェクトに参加：Solidity（ERC-20、ERC-721、ERC-1155）でのスマートコントラクト開発、コード監査とセキュリティチェック（Sybil攻撃、再入可能性、フロントランニング）。Node.js/Goでのブロックチェーン相互作用するバックエンドサービス開発。Web3.js、ethers.jsとReact/Next.jsフロントエンドの統合。Ethereum、Polygon、BNB Chainへのスマートコントラクトの構築とデプロイ。Foundry、Hardhat、Waffleでの自動化テスト。产品のホワイトペーパーから本番デプロイメントまでのブロックチェーンシステム設計への参加。DeFi、DAO、GameFiのトレンドを更新し、新機能の提案。"
    },
    requirements: {
      vi: "Kinh nghiệm thực chiến với ít nhất 1 dự án blockchain public (Ethereum, Solana, Polygon), hiểu về bảo mật smart contract. Thành thạo Solidity, Web3.js/ethers.js. Biết sử dụng Hardhat, Foundry hoặc Truffle. Hiểu về consensus mechanism (PoS, PoW), EVM, gas optimization. Kinh nghiệm với Rust (Substrate/Anchor) là điểm cộng lớn. Có portfolio trên GitHub với các dự án blockchain mã nguồn mở. Đọc hiểu EIP, BIP, understand DeFi protocols (Uniswap, Aave, OpenSea). Tư duy security-first, luôn cân nhắc attack vector khi viết code.",
      ja: "少なくとも1つのパブリックブロック체인プロジェクト（Ethereum、Solana、Polygon）の实务経験があり、スマートコントラクトのセキュリティについて理解していること。Solidity、Web3.js/ethers.jsの熟疇。Hardhat、Foundry、またはTruffle使用経験。コンセンサスメカニズム（PoS、PoW）、EVM、ガス最適化への理解。Rust（Substrate/Anchor）の経験が大きく加点されます。GitHubでのオープンソースブロックチェー проектовポートフォリオある方。EIP、BIP理解、DeFiプロトコル（Uniswap、Aave、OpenSea）読み解き可能。セキュリティファースト思考で、コード 작성時に常に攻撃ベクトルを考慮できる方。"
    },
    benefits: {
      vi: "Bonus dự án hấp dẫn (thưởng token/coin nếu dự án có ICO/IDO), làm việc remote linh hoạt hoặc hybrid tại Hà Nội/Đà Nẵng. Đào tạo chứng chỉ Blockchain (Certified Blockchain Developer - CBD). Cơ hội tham gia hackathon blockchain, Web3 conference (ETH Denver, Token2049, Vietnam Blockchain Week). Trang bị hardware wallet, testnet token cho development. Hỗ trợ phí Gas khi test dApp trên testnet. Tham gia cộng đồng developer Blockchain Việt Nam và quốc tế. Lộ trình thăng tiến: Junior → Senior → Tech Lead → Architect.",
      ja: "プロジェクトボーナス（ICO/IDO付きプロジェクトはトークン/コインボーナス）、ハノイまたはダナンでのリモートまたはハイブリッド勤務可能。Certified Blockchain Developer - CBD資格研修を提供。ETH Denver、Token2049、Vietnam Blockchain Weekなどのハッカソン、Web3カンファレンス参加の機会がございます。開発用ハードウェアウォレット、テストネットトークン配备。テストネットでのdAppテスト時のガス代補助。ベトナムおよび国際的なBlockchain開発者コミュニティへの参加。キャリアパス：Junior → Senior → Tech Lead → Architect。"
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
      vi: "Năm 2024 đánh dấu cột mốc quan trọng khi Fabbi Holdings tiếp tục được vinh danh tại lễ trao giải Sao Khuê — giải thưởng uy tín nhất trong ngành CNTT Việt Nam. Đây là lần thứ 4 liên tiếp Fabbi nhận được giải thưởng này, một minh chứng cho sự nỗ lực không ngừng của đội ngũ nhân sự trong việc nghiên cứu và phát triển các giải pháp công nghệ cao, đặc biệt là trong lĩnh vực AI và chuyển đổi số.\n\nGiải thưởng Sao Khuê 2024 được tổ chức bởi VINASA với sự tham gia của hơn 500 doanh nghiệp CNTT trên cả nước. Fabbi Holdings đã vượt qua nhiều vòng đánh giá khắt khe về năng lực công nghệ, số lượng và chất lượng dự án đã hoàn thành, cũng như đóng góp cho cộng đồng CNTT Việt Nam.\n\nÔng Nguyễn Văn Minh — Chủ tịch HĐQT Fabbi Holdings — chia sẻ: \"Chúng tôi rất tự hào khi nhận giải thưởng Sao Khuê lần thứ 4 liên tiếp. Thành công này đến từ sự đồng lòng của toàn thể gia đình Fabbi và niềm tin của khách hàng trong suốt thời gian qua. Chúng tôi cam kết sẽ tiếp tục đổi mới, sáng tạo và mang đến những giải pháp công nghệ tốt nhất cho doanh nghiệp Việt Nam và quốc tế.\"\n\nFabbi Holdings được vinh danh ở hạng mục \"Giải pháp chuyển đổi số xuất sắc\" với sản phẩm Fabbi AI Platform — nền tảng AI tự phát triển giúp doanh nghiệp tự động hóa quy trình nghiệp vụ, phân tích dữ liệu và tối ưu hóa vận hành. Nền tảng này đã được triển khai thành công cho hơn 50 doanh nghiệp lớn tại Việt Nam và Nhật Bản, giúp tiết kiệm trung bình 40% chi phí vận hành và tăng 35% hiệu suất lao động.\n\nBên cạnh đó, Fabbi còn gây ấn tượng với dự án Smart Factory cho một tập đoàn sản xuất lớn tại Hải Phòng — hệ thống IoT giám sát nhà máy thông minh với dashboard real-time, cảnh báo tự động và tối ưu năng lượng tiêu thụ giảm 22%. Dự án này đã được đánh giá là một trong những giải pháp Smart Manufacturing tiên tiến nhất Đông Nam Á năm 2024.\n\nLễ trao giải Sao Khuê 2024 có sự tham dự của Bộ trưởng Bộ Thông tin và Truyền thông, lãnh đạo các tỉnh thành và đông đảo đại diện doanh nghiệp CNTT. Fabbi Holdings cũng vinh dự được mời tham gia diễn đàn \"Công nghệ số cho doanh nghiệp Việt\" với bài tham luận về ứng dụng AI trong chuyển đổi số doanh nghiệp vừa và nhỏ.",
      ja: "2024年は、Fabbi HoldingsがベトナムIT業界でもっとも権威のあるサオクエ賞授賞式で4年連続で表彰された重要な年となりました。これは、当社がAIとデジタルトランスフォーメーションの分野での研究開発にまい進してきたスタッフの絶え間ない努力の証です。\n\nサオクエ賞2024はVINASAが主催し、全国から500社以上のIT企業が出席しました。Fabbi Holdingsは、技術力、完成したプロジェクトの 量と品質、ベトナムのITコミュニティへの貢献について、数多くの厳格な評価を乗り越えて選出されました。\n\nFabbi Holdingsのグエン・バン・ミン取締役会議長しみ：「4年連続でサオクエ賞を 受章でき大変光栄に存じます。この成功はFabbiファミリー全員の團結と、これまでお客様からのご信頼の成果です。新規事業、创新を続け、ベトナムと国際社会のために最良の技術ソリューションを提供することを約束いたします。」\n\nFabbi Holdingsは「優秀デジタルトランスフォーメーションソリューション」部門で表彰され、自家開発のFabbi AI Platformで受賞しました。このプラットフォームは、企業の業務自動化、データ分析、運用最適化を支援するAIプラットフォームで、ベトナムと日本で50社以上に導入され、運用コスト平均40%削減、労働生産性35%向上を達成しています。\n\nさらにFabbiは、ハイフォンにある大手製造グループ向けのSmart Factoryプロジェクトでも印象づけました——リアルタイムダッシュボード、自動アラート、能源消費22%削減を実現するスマート工場IoT監視システムです。このプロジェクトは2024年东南亚最具先进技术のSmart Manufacturingソリューションの1つとして評価されました。\n\nサオクエ賞2024授賞式には情報通信大臣、各省・市の指導者、および多くのIT企業代表が出席しました。Fabbi Holdingsはまた、中小企業のAIデジタルトランスフォーメーション適用に関する提言を行い、「ベトナム企業のためのデジタル技術」フォーラムに招待されました。"
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
      vi: "Chương trình Teambuilding 2023 đã diễn ra thành công tốt đẹp với sự tham gia của hơn 300 thành viên từ các văn phòng Hà Nội và Nhật Bản. Đây không chỉ là dịp để nghỉ ngơi mà còn là cơ hội để thắt chặt tình đoàn kết, xây dựng văn hóa doanh nghiệp vững mạnh.\n\nTháng 8 năm 2023, đại gia đình Fabbi đã có mặt tại bãi biển Cửa Lò — một trong những bãi biển đẹp nhất miền Trung Việt Nam — để cùng nhau trải nghiệm 3 ngày 2 đêm đầy ý nghĩa. Chương trình được thiết kế với nhiều hoạt động đa dạng, phù hợp với mọi thành viên từ kỹ sư, designer đến quản lý.\n\nNgày đầu tiên, các thành viên được chia thành 8 đội và tham gia các trò chơi teambuilding như \"Xây tháp cao nhất\", \"Cờ hó giải đố\" và \"Thuyền nano vượt sóng\". Những trò chơi này không chỉ mang tính giải trí mà còn rèn luyện kỹ năng phối hợp, giao tiếp và ra quyết định dưới áp lực — những kỹ năng quan trọng trong môi trường làm việc thực tế.\n\nĐêm Gala Dinner là khoảnh khắc đáng nhớ nhất khi toàn bộ Fabbi family cùng nhau nhảy flashmob, hát karaoke và chia sẻ những câu chuyện cảm động. Đặc biệt, chương trình \"Fabbi Got Talent\" đã để các thành viên phô diễn tài năng từ rap, kịch ngắn đến魔术表演, tạo nên tiếng cười và tiếng vỗ tay không ngớt.\n\nNgày cuối cùng, các đội tham gia leo núi Nghĩa trang và tham quan thắng cảnh địa phương. Buổi tối, tất cả cùng tham gia lễ tạ ơn và kết thúc chuyến đi với lời hứa sẽ tiếp tục đồng hành, cùng nhau xây dựng một Fabbi ngày càng mạnh mẽ hơn.\n\n\"Teambuilding năm nay là một trải nghiệm tuyệt vời. Tôi đã hiểu thêm về đồng nghiệp, học được cách lắng nghe và phối hợp với nhau hiệu quả hơn,\" — chia sẻ của một kỹ sư từ văn phòng Tokyo. Nhiều thành viên cũng cho biết sự kiện này đã giúp họ cảm thấy gắn kết hơn với công ty và đồng nghiệp dù làm việc ở các quốc gia khác nhau.\n\nNăm nay, Fabbi dự kiến tổ chức Teambuilding 2024 tại Okinawa, Nhật Bản — kết hợp giữa hoạt động team building và khám phá văn hóa Nhật Bản, tạo cơ hội cho các thành viên Việt Nam và Nhật Bản gắn kết sâu hơn.",
      ja: "チームビルディング2023プログラムは、ハノイと日本のオフィスから300人以上のメンバーが参加し、大成功を収めました。これは単なる休息の機会ではなく、団結を強め、強力な企業文化を築く機会でもありました。\n\n2023年8月、ベトナム中部の最も美しいビーチの1つであるキャNossa Lò海滩にFabbiファミリーが集結し、意義深い3日間の体験を共有しました。エンジニア、デザイナー、マネージャーまで、あらゆるメンバーに適した多様なアクティビティが用意されていました。\n\n初日は8チームに別れ、「一番高い塔を作ろう」「旗爭い 解謎」「波浪突破舟Nano」などのチームビルディングゲームに参加しました。これらのゲームは単にエンターテインメント目的ではなく、協調、コミュニケーション、压力下での意思決定のスキルを向上させる设计的で、実際の職場環境でも重要なスキルです。\n\nガラディナーは、全Fabbiファミリーがフラッシュモブを踊ったり、カラオケで歌ったり、感動的なストーリーを共有した忘れられない瞬間でした。特に「Fabbi Got Talent」プログラムでは、ラップ、短劇、マジックショーなどの才能披露が行われ笑いと拍手が絶えませんでした。\n\n最終日には各チームが山岳地帯を登山し、現地の景勝地を観光しました。夕方には感謝の儀式を行い、共に更强いFabbiを築いていくという誓いを持って旅を閉じました。\n\n「今年のチームビルディングはとても素晴らしい体験でした。同僚のことをもっと理解し、より効果的に耳を傾け、協力する方法を学びました」と東京のオフィスから参加したエンジニアが共有してくれました。多くのメンバーも、このイベントがどんなに異なる国で働いていても会社と同事への帰属意識を高めてくれたと述べてくれました。\n\n今年はinawa、日本でのチームビルディング2024の開催を予定しています——チームビルディング活動と日本文化の発見を組み合わせ、ベトナムと日本のメンバーがより深く結びつく機会を作りたいと考えています。"
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
      vi: "Fabbi Holdings tự hào là đơn vị tiên phong trong việc thúc đẩy quan hệ hợp tác kinh tế, đặc biệt trong lĩnh vực ICT giữa hai quốc gia Việt Nam và Nhật Bản. Năm 2024, Fabbi đã tích cực mở rộng và củng cố mạng lưới đối tác chiến lược với nhiều tập đoàn lớn tại cả hai quốc gia.\n\nTháng 3/2024, Fabbi ký kết Biên bản ghi nhớ (MoU) hợp tác chiến lược với Công ty TNHH System Intelligence (Tokyo) — đối tác chuyên về giải pháp AI và tự động hóa doanh nghiệp. Theo thỏa thuận, hai bên sẽ cùng phát triển nền tảng Fabbi AI Platform phiên bản Nhật Bản, tích hợp các giải pháp AI của System Intelligence và mở rộng thị trường sang khu vực Đông Nam Á.\n\nCũng trong quý I/2024, Fabbi hợp tác với Đại học Waseda (Tokyo) trong dự án nghiên cứu ứng dụng Computer Vision trong lĩnh vực y tế. Dự án có tổng giá trị 2 tỷ JPY, thời gian thực hiện 24 tháng, với mục tiêu phát triển hệ thống chẩn đoán hình ảnh y tế hỗ trợ bác sĩ trong việc phát hiện sớm bệnh lý từ ảnh X-quang và MRI.\n\nBên cạnh đó, Fabbi đã tham gia Hội nghị kinh tế Việt - Nhật 2024 tại Hà Nội với vai trò diễn giả chính về chủ đề \"Ứng dụng AI trong doanh nghiệp vừa và nhỏ\". Hội nghị thu hút hơn 300 doanh nghiệp từ hai nước, trong đó 50 doanh nghiệp đã đăng ký tìm hiểu về giải pháp của Fabbi sau khi nghe bài tham luận.\n\nĐặc biệt, tháng 6/2024, Fabbi Holdings chính thức trở thành thành viên của JISA (Japan Information Technology Services Industry Association) — hiệp hội ngành công nghiệp IT hàng đầu Nhật Bản. Việc gia nhập JISA mở ra cơ hội lớn cho Fabbi tiếp cận các dự án CNTT quy mô lớn tại Nhật Bản, đồng thời là cơ sở để Fabbi xây dựng uy tín và thương hiệu tại thị trường này.\n\n\"Việc hợp tác với các đối tác Nhật Bản không chỉ giúp Fabbi mở rộng thị trường mà còn nâng cao năng lực công nghệ thông qua việc học hỏi các phương pháp làm việc chuyên nghiệp và tiêu chuẩn chất lượng cao của Nhật Bản,\" — ông Trần Đình Phong, Tổng Giám đốc Fabbi Holdings chia sẻ tại Hội nghị.\n\nNăm 2024, Fabbi dự kiến tăng trưởng 60% doanh thu từ thị trường Nhật Bản, với danh mục dự án bao gồm E-commerce, Fintech, Smart Factory và AI Solutions cho các doanh nghiệp Nhật Bản.",
      ja: "Fabbi Holdingsは、特にベトナムと日本の両国間のICT分野における経済協力関係を促進する先駆者であることを誇りに思っています。2024年、Fabbiは両国の大手企业集团との戦略的パートナーシップネットワークを積極的に拡大・強化してきました。\n\n2024年3月、Fabbiは東京のSystem Intelligence株式会社（AI・企業自動化ソリューション専門）と戦略的協力協定（MoU）に署名しました。協定に基づき、両社は日本市場向けFabbi AI Platformの共同開発、System IntelligenceのAIソリューション統合、東南アジア市場への展開を行います。\n\n2024年第1四半期には також、Fabbiiは東京农业大学と医療分野へのComputer Vision応用に関する研究プロジェクトで協力しました。プロジェクト総額20億円、実施期間24ヶ月、AI支援画像診断システム（X線・MRI画像からの疾患早期発見支援）の開発を目指します。\n\nさらにFabbiは、ハノイで開催された2024年ベトナム・日本経済会議に「中小企業のAI応用」をテーマに基調講演者として参加しました。会议には両国から300社以上が出席し、Fabbiのソリューションについて听完基調演讲後50社が информацииを求めました。\n\n特に2024年6月、Fabbi Holdingsは日本のトップITサービス産業団体であるJISA（Japan Information Technology Services Industry Association）の正会員に正式加入しました。JISA加入により、日本での大規模ICTプロジェクトへのアクセスが開かれ、日本市場での信頼性とブランド構築の基盤になります。\n\n「日本のパートナーとの協力は、日本から学ぶ専門的な勤務 方法や高品質基準を通じて技術を向上させるだけでなく、Fabbiの市場を拡大するのに役立ちます」とFabbii Holdingsのチャン・ディン・フォン最高経営責任者が会議で共有してくれました。\n\n2024年、Fabbiは日本の市場からの売上を60%増加预计しており、Eコマース、Fintech、Smart Factory、日本企業向けAIソリューションを含むプロジェクトポートフォリオを持つています。"
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

