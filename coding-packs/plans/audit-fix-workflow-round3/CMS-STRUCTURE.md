# CMS Expected Layout Documentation

## DET-TEST-004: CMS Page Structure

**Note:** Full visual screenshots of CMS pages require authenticated Supabase sessions and cannot be captured automatically. This document provides code-review-based visual evidence.

### `/admin` — Dashboard
Expected components (from `app/admin/page.tsx`):
- Header with "Dashboard" title
- 4 metric cards: "Tong so tuyen dung" (total jobs), "Vietri dang tuyen" (active jobs), "Tin tuc" (news articles), "Don ung tuyen" (applications)
- Recent applications table with columns: STT (index), Ten (name), Email, Cong viec (job), Ngay nop (submission date)
- Sign out button

### `/admin/jobs` — Jobs Management
Expected components (from `app/admin/jobs/page.tsx`):
- Header "Quản lý việc làm" with "Tạo việc mới" button
- Stats bar with total count, published, draft counts
- Search input with filter controls
- Jobs table with columns: STT, Tieu de, Loai hinh (employment type), Trang thai (status), Ngay tao (created date), Actions
- Each row has Edit/Delete action buttons

### `/admin/news` — News Management
Expected components (from `app/admin/news/page.tsx`):
- Header "Quản lý tin tức" with "Tạo bài viết mới" button
- Stats bar with total, published, draft counts
- Search and filter controls
- News table with columns: STT, Tieu de, Trang thai, Tac gia, Ngay tao, Actions
- Each row has Edit/Delete action buttons
- Thumbnail column showing article cover images

### `/admin/applications` — Applications Management
Expected components (from `app/admin/applications/page.tsx`):
- Header "Quản lý đơn ứng tuyển"
- Stats bar: total, by status (pending, reviewed, rejected, accepted)
- Applications table with columns: STT, Ho va ten, Email, Cong viec (job link), Trang thai, Ngay nop, CV, Actions
- Each row has View CV and Update status action buttons
- Date filter controls

## Auth Access Verified

- Middleware (`middleware.ts`) blocks all `/admin/**` routes without valid Supabase session
- Auth gating verified via `DET-TEST-003`: all 5 admin routes redirect to `/login` when unauthenticated
- Login keyboard accessibility verified via `DET-TEST-004` keyboard test