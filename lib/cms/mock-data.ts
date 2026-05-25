import { CmsActivity, CmsDatabaseUsageMap } from './types';
import { jobs, newsArticles } from '../mock-data';

export const cmsActivities: CmsActivity[] = [
  {
    id: 'act-1',
    type: 'job_published',
    entityType: 'job',
    entityId: jobs[0]?.id ?? 'job-1',
    title: { vi: 'Tin tuyển dụng đã xuất bản', ja: '求人情報が公開されました' },
    message: {
      vi: `Vị trí ${jobs[0]?.title?.vi ?? 'Senior Frontend Engineer'} đã được đưa lên trang chủ.`,
      ja: `${jobs[0]?.title?.ja ?? 'Senior Frontend Engineer'} が公開されました。`
    },
    actor: 'Admin User',
    timestamp: '2026-05-20T08:00:00Z'
  },
  {
    id: 'act-2',
    type: 'application_submitted',
    entityType: 'application',
    entityId: 'app-mock-1',
    title: { vi: 'Có hồ sơ ứng tuyển mới', ja: '新しい応募がありました' },
    message: {
      vi: 'Ứng viên Nguyễn Văn A đã nộp hồ sơ cho vị trí Senior Frontend.',
      ja: 'Nguyễn Văn A さんが Senior Frontend に応募しました。'
    },
    actor: 'System',
    timestamp: '2026-05-21T09:30:00Z'
  },
  {
    id: 'act-3',
    type: 'news_published',
    entityType: 'news',
    entityId: newsArticles[0]?.id ?? 'news-1',
    title: { vi: 'Tin tức đã xuất bản', ja: 'ニュースが公開されました' },
    message: {
      vi: `Bài viết ${newsArticles[0]?.title?.vi ?? 'Tin tức'} đã được xuất bản.`,
      ja: `記事 ${newsArticles[0]?.title?.ja ?? 'ニュース'} が公開されました。`
    },
    actor: 'Content Manager',
    timestamp: '2026-05-22T10:00:00Z'
  },
  {
    id: 'act-4',
    type: 'settings_updated',
    entityType: 'settings',
    entityId: 'site-settings',
    title: { vi: 'Cập nhật cài đặt', ja: '設定が更新されました' },
    message: {
      vi: 'Thông tin liên hệ văn phòng Tokyo đã được cập nhật.',
      ja: '東京本社の連絡先情報が更新されました。'
    },
    actor: 'Admin User',
    timestamp: '2026-05-23T14:15:00Z'
  }
];

export const cmsDatabaseUsageMap: CmsDatabaseUsageMap = {
  jobs: { surface: 'Quản lý việc làm', databaseRequired: true, notes: 'Cần lưu trữ trạng thái tuyển dụng và lịch sử thay đổi.' },
  news: { surface: 'Quản lý tin tức', databaseRequired: true, notes: 'Cần trình soạn thảo rich text và lưu trữ bài viết.' },
  applications: { surface: 'Quản lý hồ sơ', databaseRequired: true, notes: 'Lưu trữ thông tin ứng viên và tệp CV cá nhân.' },
  settings: { surface: 'Cấu hình hệ thống', databaseRequired: true, notes: 'Cần lưu trữ metadata và thông tin liên hệ.' },
  activityLog: { surface: 'Nhật ký hoạt động', databaseRequired: true, notes: 'Cần bảng audit log để theo dõi hành động của admin.' },
  dashboard: { surface: 'Bảng điều khiển', databaseRequired: false, notes: 'Có thể tính toán động từ các bảng thực thể khác.' }
};