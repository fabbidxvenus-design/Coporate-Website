import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import { mockJobs } from '@/lib/mock-data'
import type { Database } from '@/types/database'
import dynamicImport from 'next/dynamic'

export const dynamic = 'force-dynamic'

type Job = Database['public']['Tables']['jobs']['Row']

interface ApplyPageProps {
  params: Promise<{ locale: string }>
}

async function getJobs(): Promise<Job[]> {
  const supabase = await createClient()

  if (USE_MOCK_DATA || !supabase) {
    return mockJobs as Job[]
  }

  const { data } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  return (data || []) as Job[]
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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section aria-label="Biểu mẫu ứng tuyển" className="max-w-2xl mx-auto">
        <ApplyForm jobs={jobs} locale={locale} />
      </section>
    </main>
  )
}