'use client'

import { useState } from 'react'
import { ApplicationModal } from '@/components/public/ApplicationModal'

interface JobApplyButtonProps {
  jobTitle: string
  locale: string
  variant?: 'header' | 'sidebar'
}

export function JobApplyButton({ jobTitle, locale, variant = 'header' }: JobApplyButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const label = variant === 'header'
    ? locale === 'vi' ? 'NỘP HỒ SƠ' : '応募する'
    : locale === 'vi' ? 'Ứng tuyển ngay' : '今すぐ応募'
  const iconClass = variant === 'header' ? 'fa-solid fa-check-circle' : 'fa-solid fa-paper-plane'
  const buttonClass = variant === 'header'
    ? 'bg-[#008B9C] hover:bg-[#00707e] text-white font-medium py-3 px-8 rounded-lg flex items-center gap-2 transition-colors shrink-0'
    : 'w-full bg-[#008B9C] hover:bg-[#00707e] text-white font-medium py-3 px-6 rounded-[8px] flex items-center justify-center gap-2 transition-colors'

  return (
    <>
      <button
        type="button"
        className={buttonClass}
        aria-label={`${locale === 'vi' ? 'Ứng tuyển' : '応募'} ${jobTitle}`}
        onClick={() => setIsModalOpen(true)}
      >
        <i className={`${iconClass} w-5 h-5`} aria-hidden="true"></i>
        {label}
      </button>
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={jobTitle}
      />
    </>
  )
}
