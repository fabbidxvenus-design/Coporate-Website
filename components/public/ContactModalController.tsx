'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ContactModal } from '@/components/public/ContactModal'
import type { Locale } from '@/lib/i18n'

interface ContactModalControllerProps {
  locale: Locale
  dict: {
    title: string
    name: string
    email: string
    phone: string
    company: string
    subject: string
    message: string
    send: string
  }
}

export function ContactModalController({ locale, dict }: ContactModalControllerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(searchParams.get('contact') === '1')
  }, [searchParams])

  const closeModal = () => {
    setIsOpen(false)
    router.replace(pathname, { scroll: false })
  }

  return <ContactModal isOpen={isOpen} onClose={closeModal} locale={locale} dict={dict} />
}
