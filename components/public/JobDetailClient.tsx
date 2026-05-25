'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Job } from '@/lib/db/types'

interface JobDetailClientProps {
  job: Job
  children: React.ReactNode
}

const ApplicationModal = dynamic(
  () => import('@/components/public/ApplicationModal').then(m => m.ApplicationModal),
  {
    loading: () => null,
  }
)

export function JobDetailClient({ job, children }: JobDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {children}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={job.title}
      />
    </>
  )
}