'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface JobsFilterProps {
  currentType?: string
  locale: string
}

export function JobsFilter({ currentType, locale }: JobsFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (type: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString())
    if (type) params.set('type', type)
    else params.delete('type')
    params.delete('page')
    router.push(`/${locale}/jobs?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
      {[
        { value: 'Freelancer', label: 'Freelancer', checked: currentType === 'Freelancer' },
        { value: 'Internship', label: 'Internship', checked: currentType === 'Internship' },
        { value: 'Full-time', label: 'Full Time', checked: currentType === 'Full-time' },
        { value: 'Part-time', label: 'Part Time', checked: currentType === 'Part-time' },
      ].map(({ value, label, checked }) => (
        <label key={value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
            checked={checked}
            onChange={(e) => handleFilterChange(e.target.checked ? value : undefined)}
          />
          <span className={checked ? 'font-medium text-gray-700' : ''}>{label}</span>
        </label>
      ))}
    </div>
  )
}
