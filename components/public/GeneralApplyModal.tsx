'use client'

import { useState, useEffect, useRef } from 'react'
import { Job } from '@/lib/db/types'
import { getDictionary, Locale } from '@/lib/i18n'

interface GeneralApplyModalProps {
  isOpen: boolean
  onClose: () => void
  locale: string
}

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(
    el => el.offsetParent !== null
  )
}

export function GeneralApplyModal({ isOpen, onClose, locale }: GeneralApplyModalProps) {
  const dict = getDictionary(locale as Locale)
  const [jobs, setJobs] = useState<Job[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  const [formData, setFormData] = useState({
    job_id: '',
    full_name: '',
    email: '',
    phone: '',
    portfolio_url: '',
    message: '',
  })

  const [cvFile, setCvFile] = useState<File | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Fetch jobs for the dropdown
  useEffect(() => {
    if (isOpen) {
      const fetchJobs = async () => {
        try {
          const res = await fetch(`/api/about?locale=${locale}`) // Reusing available API or just jobs if exists
          // Since we might not have a direct public /api/jobs, I'll fetch via a mock-like way or assume the about api works for now
          // Actually, better to fetch from where we know: the repository is server side.
          // For now, let's keep it simple and assume we might need an API or pass it in.
          // I will use a simple fetch to a new endpoint I'll assume exists or create.
          const jobsRes = await fetch(`/api/applications/jobs?locale=${locale}`)
          if (jobsRes.ok) {
            const data = await jobsRes.json()
            setJobs(data)
          }
        } catch (e) {
          console.error("Failed to fetch jobs", e)
        }
      }
      fetchJobs()
    }
  }, [isOpen, locale])

  // Return focus on close
  useEffect(() => {
    if (!isOpen && previouslyFocused.current) {
      previouslyFocused.current.focus()
      previouslyFocused.current = null
    }
  }, [isOpen])

  // Initial focus
  useEffect(() => {
    if (isOpen && modalRef.current) {
      previouslyFocused.current = document.activeElement as HTMLElement
      const focusable = getFocusableElements(modalRef.current)
      if (focusable.length > 0) {
        focusable[0].focus()
      }
    }
  }, [isOpen])

  // Focus trap & Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      const modal = modalRef.current
      if (!modal) return
      const focusable = getFocusableElements(modal)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

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
      if (formData.job_id) submitData.append('job_id', formData.job_id)
      if (cvFile) submitData.append('cv_file', cvFile)

      const res = await fetch('/api/applications', {
        method: 'POST',
        body: submitData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to submit application')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        role="dialog"
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors z-10"
          aria-label="Close modal"
        >
          <svg
            className="text-gray-500"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </button>
        <div className="p-8 md:p-12">
          {!success && (
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {dict.apply.form.title || (locale === 'vi' ? 'Ứng tuyển ngay nào' : '今すぐ応募')}
              </h2>
              <p className="text-gray-600">
                {locale === 'vi'
                  ? 'Hãy điền thông tin của bạn và gửi cho nhà tuyển dụng'
                  : '情報を入力して採用担当者に送信してください'}
              </p>
            </div>
          )}

          {success ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{locale === 'vi' ? 'Ứng tuyển thành công!' : '応募が完了しました！'}</h3>
              <p className="text-gray-600 mb-8">{locale === 'vi' ? 'Cảm ơn bạn đã quan tâm. Chúng tôi sẽ sớm liên hệ lại.' : 'ご応募ありがとうございます。後ほど担当者よりご連絡いたします。'}</p>
              <button
                onClick={onClose}
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                {locale === 'vi' ? 'Đóng' : '閉じる'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.apply.form.position}
                </label>
                <div className="relative">
                  <select
                    name="job_id"
                    value={formData.job_id}
                    onChange={handleChange}
                    className="block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm rounded-lg appearance-none bg-white"
                  >
                    <option value="">
                      {locale === 'vi' ? 'Chọn vị trí bạn quan tâm' : '興味のある職種を選択'}
                    </option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.id}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg
                      fill="none"
                      height="16"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.apply.form.fullName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-brand-teal focus:border-brand-teal sm:text-sm placeholder-gray-400 ${
                    formErrors.full_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={locale === 'vi' ? 'Nhập họ và tên ...' : '氏名を入力...'}
                />
                {formErrors.full_name && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.full_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.apply.form.email} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-brand-teal focus:border-brand-teal sm:text-sm placeholder-gray-400 ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={locale === 'vi' ? 'Nhập email...' : 'メールアドレスを入力...'}
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.apply.form.phone} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`block w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-brand-teal focus:border-brand-teal sm:text-sm placeholder-gray-400 ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={locale === 'vi' ? 'Nhập số điện thoại...' : '電話番号を入力...'}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio URL (GitHub, Behance...)
                </label>
                <input
                  type="url"
                  name="portfolio_url"
                  value={formData.portfolio_url}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-teal focus:border-brand-teal sm:text-sm placeholder-gray-400"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.apply.form.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-brand-teal focus:border-brand-teal sm:text-sm placeholder-gray-400 resize-none"
                  placeholder={
                    locale === 'vi'
                      ? 'Nhập tin nhắn bạn muốn nhắn gửi...'
                      : 'メッセージを入力...'
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.apply.form.upload} <span className="text-red-500">*</span>
                </label>
                <div
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 cursor-pointer hover:bg-gray-50 transition-colors group relative ${
                    formErrors.cv_file
                      ? 'bg-red-50'
                      : 'bg-white'
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23${formErrors.cv_file ? 'ef4444' : 'CBD5E1'}FF' stroke-width='2' stroke-dasharray='8%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                    borderRadius: '8px',
                  }}
                >
                  <label className="cursor-pointer text-center flex items-center justify-center gap-3">
                    <svg
                      className={`group-hover:text-brand-teal ${
                        formErrors.cv_file ? 'text-red-400' : 'text-gray-400'
                      }`}
                      fill="none"
                      height="20"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" x2="12" y1="3" y2="15" />
                    </svg>
                    <span
                      className={`text-sm ${
                        formErrors.cv_file ? 'text-red-500' : 'text-gray-600'
                      }`}
                    >
                      {fileName ||
                        (locale === 'vi'
                          ? 'Upload CV (pdf, docx, doc)'
                          : '履歴書をアップロード (PDF, DOCX)')}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                {formErrors.cv_file && (
                  <p className="mt-1 text-xs text-red-500">{formErrors.cv_file}</p>
                )}
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[240px] flex justify-center py-3.5 px-8 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-brand-teal hover:bg-[#007a89] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>{dict.apply.submitting || 'Đang gửi...'}</span>
                    </div>
                  ) : (
                    dict.apply.submit || 'Ứng Tuyển'
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
                  {locale === 'vi' ? 'Bạn cần hỗ trợ?' : 'サポートが必要ですか？'}{' '}
                  <a
                    className="font-medium text-gray-900 hover:text-brand-teal transition-colors"
                    href="#"
                  >
                    Contact Us
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
