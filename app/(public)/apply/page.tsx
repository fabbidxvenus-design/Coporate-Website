import dynamicImport from 'next/dynamic'
import { jobsRepository } from '@/lib/db/repositories/jobs'
import { Job } from '@/lib/db/types'

export const dynamic = 'force-dynamic'

interface ApplyPageProps {
  params: Promise<{ locale: string }>
}

async function getJobs(): Promise<Job[]> {
  return await jobsRepository.findAllPublished()
}

const ApplyForm = dynamicImport(() => import('@/components/public/ApplyForm'), {
  loading: () => <div className="animate-pulse bg-gray-100 rounded-xl h-96" />,
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'vi' ? 'Ứng tuyển | Fabbi' : '応募 | Fabbi',
    description: locale === 'vi'
      ? 'Gửi hồ sơ ứng tuyển đến Fabbi - Nơi công nghệ gặp gỡ đổi mới'
      : 'Fabbiへの応募書類を送信 - テクノロジーがイノベーションと出会う場所',
  }
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { locale } = await params
  const jobs = await getJobs()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section aria-label="Biểu mẫu ứng tuyển" className="max-w-2xl mx-auto">
        <ApplyForm jobs={jobs} locale={locale} />
      </section>
    </div>
  )
}