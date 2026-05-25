import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { CmsSidebar } from '@/components/cms/CmsSidebar'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This will redirect to login if not authenticated as admin
  const user = await requireAdmin()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <CmsSidebar userEmail={user.email} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}