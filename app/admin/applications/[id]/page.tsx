import { requireAdmin } from '@/lib/auth'
import ApplicationDetail from '@/components/admin/ApplicationDetail'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  return {
    title: `Chi tiết đơn ứng tuyển | Fabbi CMS`,
  }
}

export default async function ApplicationDetailPage({ params }: PageProps) {
  await requireAdmin()
  const { id } = await params

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 bg-[#fbf9f8]">
        <ApplicationDetail id={id} />
      </div>
    </div>
  )
}