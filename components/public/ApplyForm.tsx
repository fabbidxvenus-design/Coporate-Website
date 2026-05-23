'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Database } from '@/types/database'
import { getDictionary, Locale } from '@/lib/i18n'

type Job = Database['public']['Tables']['jobs']['Row']

interface ApplyFormProps {
  jobs: Job[]
  defaultJobId?: string
  locale: string
}

export default function ApplyForm({ jobs, defaultJobId, locale }: ApplyFormProps) {
  const router = useRouter()
  const dict = getDictionary(locale as Locale)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    job_id: defaultJobId || '',
    full_name: '',
    email: '',
    phone: '',
    portfolio_url: '',
    message: '',
  })

  const [cvFile, setCvFile] = useState<File | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!formData.full_name) errors.full_name = locale === 'vi' ? 'Họ và tên là bắt buộc' : '氏名は必須です'
    if (!formData.email) {
      errors.email = locale === 'vi' ? 'Email là bắt buộc' : 'メールアドレスは必須です'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = locale === 'vi' ? 'Email không hợp lệ' : '無効なメールアドレスです'
    }
    if (!formData.phone) errors.phone = locale === 'vi' ? 'Số điện thoại là bắt buộc' : '電話番号は必須です'
    if (!cvFile) errors.cv_file = locale === 'vi' ? 'CV là bắt buộc' : '履歴書は必須です'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors(prev => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCvFile(file)
      setFileName(file.name)
      if (formErrors.cv_file) {
        setFormErrors(prev => {
          const next = { ...prev }
          delete next.cv_file
          return next
        })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setError(null)

    try {
      const submitData = new FormData()
      submitData.append('full_name', formData.full_name)
      submitData.append('email', formData.email)
      submitData.append('phone', formData.phone)
      submitData.append('portfolio_url', formData.portfolio_url)
      submitData.append('message', formData.message)
      if (formData.job_id) {
        submitData.append('job_id', formData.job_id)
      }
      if (cvFile) {
        submitData.append('cv_file', cvFile)
      }

      const res = await fetch('/api/applications', {
        method: 'POST',
        body: submitData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit application')
      }

      router.push(`/${locale}/apply/success`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 bg-[#fbf9f8]">
        <div className="max-w-[600px] mx-auto space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{dict.apply.form.title || (locale === 'vi' ? 'Ứng tuyển ngay nào' : '今すぐ応募')}</h1>
            <p className="text-gray-500 mt-1">{dict.apply.form.subtitle || (locale === 'vi' ? 'Hãy điền thông tin của bạn và gửi cho nhà tuyển dụng' : 'あなたの情報を入力して採用担当者に送信してください')}</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {error && (
                <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Position Select */}
              <div>
                <label htmlFor="job_id" className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.apply.form.position}
                </label>
                <div className="relative">
                  <select
                    id="job_id"
                    name="job_id"
                    value={formData.job_id}
                    onChange={handleChange}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg text-base focus-visible:border-[#006672] focus-visible:ring-1 focus-visible:ring-[#006672] sm:text-sm appearance-none bg-white"
                  >
                    <option value="">{locale === 'vi' ? 'Chọn vị trí' : '職種を選択'}</option>
                    {jobs.map(job => (
                      <option key={job.id} value={job.id}>{job.title}</option>
                    ))}
                  </select>
                  <span aria-hidden="true" className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.apply.form.fullName} <span className="text-red-500">*</span>
                </label>
                <input
                  id="full_name"
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  aria-invalid={!!formErrors.full_name}
                  aria-describedby={formErrors.full_name ? 'full_name-error' : undefined}
                  className={`w-full px-4 py-3 border rounded-lg text-base sm:text-sm placeholder-gray-400 focus-visible:border-[#006672] focus-visible:ring-1 focus-visible:ring-[#006672] ${formErrors.full_name ? 'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400' : 'border-gray-300'}`}
                  placeholder={locale === 'vi' ? 'Nhập họ và tên ...' : '氏名を入力してください ...'}
                />
                {formErrors.full_name && <p id="full_name-error" className="mt-1 text-sm text-red-600">{formErrors.full_name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.apply.form.email} <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 border rounded-lg text-base sm:text-sm placeholder-gray-400 focus-visible:border-[#006672] focus-visible:ring-1 focus-visible:ring-[#006672] ${formErrors.email ? 'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400' : 'border-gray-300'}`}
                  placeholder={locale === 'vi' ? 'Nhập email...' : 'メールアドレスを入力してください...'}
                />
                {formErrors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.apply.form.phone} <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  aria-invalid={!!formErrors.phone}
                  aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                  className={`w-full px-4 py-3 border rounded-lg text-base sm:text-sm placeholder-gray-400 focus-visible:border-[#006672] focus-visible:ring-1 focus-visible:ring-[#006672] ${formErrors.phone ? 'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400' : 'border-gray-300'}`}
                  placeholder={locale === 'vi' ? 'Nhập số điện thoại...' : '電話番号を入力してください...'}
                />
                {formErrors.phone && <p id="phone-error" className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.apply.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus-visible:border-[#006672] focus-visible:ring-1 focus-visible:ring-[#006672] sm:text-sm placeholder-gray-400 resize-none"
                  placeholder={locale === 'vi' ? 'Nhập tin nhắn bạn muốn nhắn gửi...' : 'メッセージを入力してください...'}
                />
              </div>

              {/* Upload CV */}
              <div>
                <span id="cv_file-label" className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.apply.form.upload} <span className="text-red-500">*</span>
                </span>
                <label
                  htmlFor="cv_file"
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors group ${formErrors.cv_file ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                  style={!formErrors.cv_file ? {
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23CBD5E1FF' stroke-width='2' stroke-dasharray='8%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                    borderRadius: '8px'
                  } : {}}
                >
                  <div className="space-y-2 text-center flex items-center justify-center gap-3">
                    <svg className={`group-hover:text-teal-text ${formErrors.cv_file ? 'text-red-500' : 'text-gray-400'}`} aria-hidden="true" focusable="false" fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" x2="12" y1="3" y2="15"></line>
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <span>{fileName || (locale === 'vi' ? 'Tải lên CV (pdf, docx, doc)' : '履歴書をアップロード (pdf, docx, doc)')}</span>
                    </div>
                  </div>
                </label>
                <input
                  id="cv_file"
                  accept=".pdf,.doc,.docx"
                  className="sr-only"
                  name="cv_file"
                  type="file"
                  onChange={handleFileChange}
                  required
                  aria-invalid={!!formErrors.cv_file}
                  aria-describedby={formErrors.cv_file ? 'cv_file-error' : 'cv_file-hint'}
                />
                {formErrors.cv_file && <p id="cv_file-error" className="mt-1 text-sm text-red-600">{formErrors.cv_file}</p>}
                <p id="cv_file-hint" className="text-xs text-gray-500 mt-1">{locale === 'vi' ? 'PDF, DOC, DOCX - Tối đa 5MB' : 'PDF, DOC, DOCX - 最大5MB'}</p>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[240px] flex justify-center items-center gap-2 py-3.5 px-8 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-[#006672] hover:bg-[#005560] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006672] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting && (
                    <svg aria-hidden="true" className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isSubmitting ? dict.apply.submitting : dict.apply.submit}
                </button>
              </div>

              {/* Contact Support */}
              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  {locale === 'vi' ? 'Bạn cần hỗ trợ?' : 'サポートが必要ですか？'} <a className="font-medium text-gray-900 hover:text-teal-text transition-colors" href="mailto:recruitment@fabbi.vn">Contact Us</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}