import { requireAdmin } from '@/lib/auth'
import SettingsForm from '@/components/admin/SettingsForm'

export const metadata = {
  title: 'Cài đặt | Fabbi CMS',
}

export default async function SettingsPage() {
  await requireAdmin()

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cài đặt</h1>
        <p className="text-gray-500 mt-1">Quản lý thông tin và cấu hình trang web</p>
      </div>

      <SettingsForm />
    </div>
  )
}