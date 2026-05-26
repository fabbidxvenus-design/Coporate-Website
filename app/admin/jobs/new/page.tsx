import JobForm from '@/components/admin/JobForm'
import { requireAdmin } from '@/lib/auth'

export default async function NewJobPage() {
  await requireAdmin()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Job</h1>
      <JobForm />
    </div>
  )
}
