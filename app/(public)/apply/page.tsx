import { createClient, USE_MOCK_DATA } from '@/lib/supabase/server'
import { mockJobs } from '@/lib/mock-data'
import type { Database } from '@/types/database'
import dynamic from 'next/dynamic'

const ApplyForm = dynamic(() => import('@/components/public/ApplyForm'), {
  loading: () => <div className="animate-pulse bg-gray-100 rounded-xl h-96" />,
})

type Job = Database['public']['Tables']['jobs']['Row']

export const metadata = {
  title: 'Ứng tuyển | Fabbi',
  description: 'Gửi hồ sơ ứng tuyển đến Fabbi - Nơi công nghệ gặp gỡ đổi mới',
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

export default async function ApplyPage() {
  const jobs = await getJobs()

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section aria-label="Biểu mẫu ứng tuyển" className="max-w-2xl mx-auto">
        <ApplyForm jobs={jobs} />
      </section>
    </main>
  )
}