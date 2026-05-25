'use client'

import { useState, useEffect, useRef, type KeyboardEvent } from 'react'

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  jobTitle: string
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

export function ApplicationModal({ isOpen, onClose, jobTitle }: ApplicationModalProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  // Return focus on close
  useEffect(() => {
    if (!isOpen && previouslyFocused.current) {
      previouslyFocused.current.focus()
      previouslyFocused.current = null
    }
  }, [isOpen])

  // Initial focus on first focusable element
  useEffect(() => {
    if (isOpen && modalRef.current) {
      previouslyFocused.current = document.activeElement as HTMLElement
      const focusable = getFocusableElements(modalRef.current)
      if (focusable.length > 0) {
        focusable[0].focus()
      } else {
        closeButtonRef.current?.focus()
      }
    }
  }, [isOpen])

  // Focus trap
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key !== 'Tab') return

      const modal = modalRef.current
      if (!modal) return

      const focusable = getFocusableElements(modal)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSuccess(true)
    setLoading(false)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      aria-hidden="false"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white rounded-2xl shadow-xl w-full max-w-[600px] overflow-hidden relative m-4 z-10"
      >
        <div className="absolute top-4 right-4">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="min-w-11 min-h-11 flex items-center justify-center rounded bg-gray-200 hover:bg-gray-300 text-gray-600 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-10 md:px-12 md:py-12">
          {success ? (
            <div role="status" aria-live="polite" className="text-center py-10">
              <h2 id="modal-title" className="text-2xl font-bold text-gray-900 mb-4">Ứng tuyển thành công!</h2>
              <p className="text-gray-600">Cảm ơn bạn đã quan tâm. Chúng tôi sẽ sớm liên hệ lại.</p>
              <button
                onClick={onClose}
                className="mt-6 bg-primary text-white px-6 py-2 rounded-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Đóng
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 id="modal-title" className="text-3xl font-bold text-gray-900 mb-2">Ứng tuyển job này</h2>
                <p className="text-gray-500 text-sm">Hãy điền thông tin của bạn và gửi cho nhà tuyển dụng</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5" aria-label={`Ứng tuyển ${jobTitle}`} noValidate>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1" htmlFor="modal-fullName">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    id="modal-fullName"
                    placeholder="Nhập họ và tên ..."
                    required
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1" htmlFor="modal-email">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    id="modal-email"
                    placeholder="Nhập email..."
                    required
                    type="email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1" htmlFor="modal-phone">Số điện thoại</label>
                  <input
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    id="modal-phone"
                    placeholder="Nhập số điện thoại..."
                    type="tel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1" htmlFor="modal-message">Tin nhắn cho chúng tôi</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 resize-none"
                    id="modal-message"
                    placeholder="Nhập tin nhắn bạn muốn nhắn gửi..."
                    rows={4}
                  />
                </div>
                <div>
                  <label htmlFor="modal-cv" className="block text-sm font-medium text-gray-900 mb-1">Upload CV</label>
                  <label htmlFor="modal-cv" className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-gray-100 transition-colors group">
                    <svg className="h-6 w-6 text-gray-400 mb-2 group-hover:text-primary" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <span className="text-sm text-gray-500">Upload CV (pdf, docx, doc)</span>
                    <input
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      id="modal-cv"
                      name="cv_file"
                      type="file"
                    />
                  </label>
                </div>
                <div className="pt-4 flex justify-center">
                  <button
                    className="w-full sm:w-[280px] bg-primary text-white px-6 py-3 rounded-[8px] font-semibold hover:bg-primary-800 transition-colors disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Đang gửi...' : 'Ứng Tuyển'}
                  </button>
                </div>
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    Bạn cần hỗ trợ? <a className="text-gray-900 font-medium hover:underline" href="mailto:recruitment@fabbi.vn">Contact Us</a>
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
