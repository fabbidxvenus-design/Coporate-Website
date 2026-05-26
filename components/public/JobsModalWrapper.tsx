'use client'

import { useSearchParams, useRouter, usePathname, useParams } from 'next/navigation'
import { GeneralApplyModal } from './GeneralApplyModal'
import { useEffect, useState } from 'react'

export function JobsModalWrapper() {
  const searchParams = useSearchParams()
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const locale = (params?.locale as string) || 'vi'

  useEffect(() => {
    setIsOpen(searchParams.get('apply') === 'true')
  }, [searchParams])

  const handleClose = () => {
    setIsOpen(false)
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.delete('apply')
    const newQuery = newParams.toString()
    router.replace(`${pathname}${newQuery ? `?${newQuery}` : ''}`, { scroll: false })
  }

  return (
    <GeneralApplyModal
      isOpen={isOpen}
      onClose={handleClose}
      locale={locale}
    />
  )
}
