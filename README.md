# Fabbi Corporate Website

Website công ty Fabbi Holdings — hệ thống website giới thiệu doanh nghiệp, tuyển dụng IT, và tin tức với đa ngôn ngữ (Tiếng Việt / 日本語).

## Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3 với design system token tùy chỉnh
- **Database**: PostgreSQL (`postgres` driver) + SQLite/JSON mock data cho local dev
- **Testing**: Vitest (unit) + Playwright (e2e + audit)
- **Validation**: Zod
- **Sanitization**: sanitize-html / isomorphic-dompurify

## Mục lục

- [Tổng quan cấu trúc](#tổng-quan-cấu-trúc)
- [Cài đặt](#cài-đặt)
- [Biến môi trường](#biến-môi-trường)
- [Chạy ứng dụng](#chạy-ứng-dụng)
- [Cơ chế Mock Data vs Database](#cơ-chế-mock-data-vs-database)
- [Đa ngôn ngữ (i18n)](#đa-ngôn-ngữ-i18n)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Các trang chính](#các-trang-chính)
- [Testing](#testing)
- [Linting & Type Check](#linting--type-check)
- [Quy ước commit](#quy-ước-commit)
- [Design System](#design-system)

---

## Tổng quan cấu trúc

Dự án chia thành 3 phân vùng chính qua route group:

| Route Group | Mục đích | Auth |
|-------------|----------|------|
| `(public)/` | Trang công khai: Home, Jobs, News, About, Apply | Không cần |
| `[locale]/` | Phiên bản locale (vi/ja) tương đương `(public)` | Không cần |
| `admin/` | CMS quản trị: quản lý tin tức, job, ứng tuyển | Cần login |

Middleware (`middleware.ts`) tự động detect và redirect request vào đúng locale segment (`/vi/` hoặc `/ja/`), đảm bảo mọi URL public luôn có prefix locale.

## Cài đặt

### Yêu cầu

- Node.js >= 18
- pnpm (khuyên dùng) hoặc npm/yarn
- PostgreSQL 15+ (tùy chọn, mặc định dùng mock data)

### Các bước

```bash
# 1. Clone repo
git clone https://github.com/fabbidxvenus-design/Coporate-Website.git
cd Coporate_Website

# 2. Cài đặt dependencies
pnpm install

# 3. Copy và chỉnh sửa biến môi trường
cp .env.example .env.local
# Chỉnh sửa .env.local nếu cần (xem phần Biến môi trường)

# 4. Khởi chạy dev server
pnpm dev
```

## Biến môi trường

```bash
# Database
DATABASE_URL=postgres://user:password@localhost:5432/dbname

# Chế độ dữ liệu (true = mock, false = database)
USE_MOCK_DATA=true

# URL site cho metadata
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Mock login: admin@example.com / mock-admin-local-only
```

### Credentials (mock mode)

Khi `USE_MOCK_DATA=true`, truy cập CMS admin qua:

- **Email**: `admin@fabbi.vn`
- **Password**: `admin123`

## Chạy ứng dụng

```bash
# Development
pnpm dev              # http://localhost:3000

# Production build
pnpm build
pnpm start            # production server

# Database migrations (khi USE_MOCK_DATA=false)
pnpm db:migrate

# Database seed (khi USE_MOCK_DATA=false)
pnpm db:seed
```

## Cơ chế Mock Data vs Database

Dự án hỗ trợ 2 chế độ dữ liệu, controlled qua biến `USE_MOCK_DATA` trong `.env.local`:

| Mode | `USE_MOCK_DATA` | Data Source | Khi nào dùng |
|------|----------------|-------------|--------------|
| **Mock** | `true` | SQLite/JSON files trong `lib/db/` | Dev local, CI, demo |
| **Database** | `false` | PostgreSQL (Supabase) | Production |

### Cách hoạt động

Data source được resolve tại thời điểm call (call-time flag evaluation):

```
lib/config/data-source.ts
  └── USE_MOCK_DATA=true  → dùng mock repositories (lib/cms/mock-data.ts)
  └── USE_MOCK_DATA=false → dùng DB repositories (lib/db/repositories/*.ts)
```

> **Nguyên tắc**: Không bao giờ import trực tiếp mock data ở tầng repository. Luôn qua `data-source.ts` để đảm bảo flag được evaluate đúng lúc call.

### Chuyển đổi Mock → Database

1. Đặt `USE_MOCK_DATA=false`
2. Điền `DATABASE_URL` hợp lệ
3. Chạy `pnpm db:migrate` (tạo schema)
4. Chạy `pnpm db:seed` (import crawled content)
5. Restart server

## Đa ngôn ngữ (i18n)

Dự án hỗ trợ **Tiếng Việt (vi)** và **Tiếng Nhật (ja)**.

### Cách hoạt động

- URL structure: `/vi/` hoặc `/ja/`
- Middleware tự động redirect `/` → `/vi/` hoặc `/ja/` (theo Accept-Language header)
- Dictionary files: `lib/i18n/` chứa `vi.ts` và `ja.ts`
- Sử dụng: `getDictionary(locale)` trong Server Components

### Thêm key mới

```typescript
// lib/i18n/vi.ts
export const vi = {
  nav: {
    home: 'Trang chủ',
    jobs: 'Tuyển dụng',
    // thêm key mới ở đây
  },
}

// lib/i18n/ja.ts
export const ja = {
  nav: {
    home: 'ホーム',
    jobs: '採用',
    // thêm key tương ứng ở đây
  },
}
```

### Locale switcher

Header có 2 button VN / JP cho phép chuyển đổi locale ngay trên giao diện, giữ nguyên pathname hiện tại.

## Cấu trúc thư mục

```
Coporate_Website/
├── app/
│   ├── (public)/                  # Public pages (no locale prefix)
│   │   ├── page.tsx               # Homepage
│   │   ├── about/page.tsx         # About Fabbi
│   │   ├── jobs/page.tsx          # Job listing
│   │   ├── jobs/[slug]/page.tsx   # Job detail
│   │   ├── news/page.tsx          # News listing
│   │   ├── news/[slug]/page.tsx   # News article
│   │   ├── apply/page.tsx         # Application form
│   │   └── apply/success/page.tsx # Success page
│   ├── [locale]/                  # Locale pages (vi/ja)
│   │   └── ...                    # Mirror structure của (public)
│   ├── admin/                     # CMS admin
│   │   ├── page.tsx               # Admin dashboard
│   │   ├── jobs/page.tsx          # Manage jobs
│   │   ├── news/page.tsx          # Manage news
│   │   ├── news/[id]/edit/        # Edit news
│   │   ├── applications/          # View applications
│   │   └── settings/              # Site settings
│   ├── api/                       # API routes
│   │   ├── auth/                  # Authentication
│   │   ├── contact/              # Contact form
│   │   ├── jobs/                 # Jobs CRUD
│   │   └── settings/             # Settings
│   ├── login/page.tsx            # Admin login
│   └── layout.tsx                # Root layout
├── components/
│   ├── public/                   # Public-facing components
│   │   ├── PublicHeader.tsx      # Header + locale switcher
│   │   ├── PublicFooter.tsx      # Footer
│   │   ├── JobCard.tsx           # Job listing card
│   │   ├── NewsCard.tsx          # News card
│   │   ├── JobApplyButton.tsx    # Apply button
│   │   ├── ApplyForm.tsx         # Application form
│   │   ├── ContactModal.tsx      # Contact modal
│   │   └── ...
│   ├── admin/                    # Admin components
│   │   ├── AdminJobsClient.tsx   # Jobs management table
│   │   └── ArticleForm.tsx       # News editor
│   ├── about/
│   │   └── ActivityTabs.tsx      # About page tabs
│   └── ui/                       # Shared UI primitives
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       └── Badge.tsx
├── lib/
│   ├── i18n/                     # i18n dictionaries
│   │   ├── index.ts
│   │   ├── vi.ts
│   │   └── ja.ts
│   ├── db/                       # Database layer
│   │   ├── connection.ts         # Postgres connection
│   │   ├── init.ts               # Schema initialization
│   │   ├── migrate.ts            # Migrations
│   │   ├── seed.ts               # Seed from crawled data
│   │   ├── types.ts              # DB types
│   │   ├── json.ts               # JSON utilities
│   │   ├── crawl-parser.ts       # Parse crawled HTML
│   │   └── repositories/         # Data access layer
│   │       ├── jobs.ts
│   │       ├── news.ts
│   │       ├── about.ts
│   │       ├── applications.ts
│   │       ├── contact.ts
│   │       └── settings.ts
│   ├── cms/                      # CMS data layer
│   │   ├── data-source.ts        # Data source resolver
│   │   ├── mock-data.ts          # Mock data definitions
│   │   └── types.ts              # CMS types
│   ├── config/
│   │   └── data-source.ts        # USE_MOCK_DATA flag reader
│   ├── auth.ts                   # Auth utilities
│   ├── mock-data.ts              # General mock data
│   ├── utils.ts                  # Helpers (dict keys, etc.)
│   ├── sanitize.ts               # HTML sanitization
│   ├── constants.ts              # Constants
│   └── validation/               # Zod schemas
│       └── contact.ts
├── public/
│   └── images/                   # Static images (logos, photos)
├── tests/                        # Test suites
│   ├── e2e/                      # Playwright E2E tests
│   ├── audit/                    # Audit/smoke tests
│   ├── unit/                    # Vitest unit tests
│   └── i18n/                    # i18n routing tests
├── middleware.ts                 # Locale routing middleware
├── tailwind.config.ts           # Design tokens & theme
├── next.config.mjs              # Next.js config
├── .env.example                 # Env template
└── package.json
```

## Các trang chính

### Public Pages

| Route | Mô tả |
|-------|-------|
| `/vi/` hoặc `/ja/` | Homepage — hero, dịch vụ, tin nổi bật, footer |
| `/vi/about` | Giới thiệu công ty, tầm nhìn, sứ mệnh, hoạt động |
| `/vi/jobs` | Danh sách việc làm, filter theo location/kỹ năng |
| `/vi/jobs/[slug]` | Chi tiết việc làm, nút ứng tuyển, job liên quan |
| `/vi/news` | Tin tức công ty, sidebar category filter |
| `/vi/news/[slug]` | Chi tiết bài viết |
| `/vi/apply` | Form ứng tuyển (job title, info, CV upload) |
| `/vi/contact` | Contact modal |

### Admin CMS

| Route | Mô tả |
|-------|-------|
| `/login` | Login page |
| `/admin` | Dashboard |
| `/admin/jobs` | CRUD jobs |
| `/admin/news` | CRUD tin tức |
| `/admin/news/[id]/edit` | Edit bài viết |
| `/admin/applications` | Xem danh sách ứng viên |
| `/admin/settings` | Cấu hình site (company name, contact info) |

### API Routes

| Route | Method | Mô tả |
|-------|--------|-------|
| `/api/auth/login` | POST | Admin login |
| `/api/auth/signout` | POST | Logout |
| `/api/contact` | POST | Submit contact form |
| `/api/jobs` | GET/POST | List/create jobs |
| `/api/jobs/[id]` | GET/PUT/DELETE | CRUD single job |
| `/api/news` | GET/POST | List/create news |
| `/api/news/[id]` | GET/PUT/DELETE | CRUD single article |
| `/api/settings` | GET/PUT | Get/update site settings |

## Testing

```bash
# Chạy tất cả tests (Vitest + Playwright)
pnpm test              # vitest
pnpm test:e2e          # playwright e2e
pnpm test:audit        # playwright audit/smoke tests

# Với Playwright (cài đặt browsers lần đầu)
npx playwright install
```

### Cấu trúc test

- **`tests/e2e/`** — Playwright E2E tests: core flows, audits, button screens
- **`tests/audit/`** — Smoke/audit tests: accessibility, responsive, dead buttons, mock data
- **`tests/unit/`** — Vitest unit tests: validation, utilities
- **`tests/i18n/`** — Routing và i18n locale tests

### Test với mock data

Để chạy tests với mock data (không cần database):

```bash
USE_MOCK_DATA=true pnpm test
```

## Linting & Type Check

```bash
# ESLint
pnpm lint

# TypeScript
pnpm type-check
```

## Quy ước commit

Dự án dùng **Conventional Commits**:

```
<type>: <description>

[optional body]
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

## Design System

### Màu sắc (Tailwind tokens)

| Token | Hex | Sử dụng |
|-------|-----|---------|
| `primary` | `#008B9C` | CTA buttons, links, accents |
| `primary-700` | `#00707E` | Hover states |
| `pink` | `#E91E63` | Brand accent |
| `surface` | `#FBF9F8` | Background |

### Typography

- Font chính: system stack
- Scale dùng `clamp()` cho responsive

### Component Guidelines

- Header: cố định top, `h-20`, shadow nhẹ
- Footer: `bg-primary`, logo + contact info + social links
- Card: `rounded-2xl`, `shadow-sm`, `border border-gray-100`
- Image: luôn set `width` + `height` để tránh CLS

## License

Private — All rights reserved.