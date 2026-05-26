import { notFound } from 'next/navigation'
import { jobsRepository } from '@/lib/db/repositories/jobs'
import JobForm from '@/components/admin/JobForm'
import { requireAdmin } from '@/lib/auth'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditJobPage({ params }: PageProps) {
  await requireAdmin()
  const { id } = await params

  const job = await jobsRepository.findById(id)
  if (!job) notFound()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Chỉnh sửa công việc: {job.title}</h1>
      <JobForm job={job} isEdit={true} />
    </div>
  )
}
