'use client'

import { useEffect, useRef, type KeyboardEvent } from 'react'
import { ContactForm } from '@/components/public/ContactForm'
import type { Locale } from '@/lib/i18n'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
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
    (element) => element.offsetParent !== null
  )
}

export function ContactModal({ isOpen, onClose, locale, dict }: ContactModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      previouslyFocused.current?.focus()
      previouslyFocused.current = null
      return
    }

    previouslyFocused.current = document.activeElement as HTMLElement
    closeButtonRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !modalRef.current) return

      const focusableElements = getFocusableElements(modalRef.current)
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 modal-overlay-enter"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl modal-content-enter"
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-md bg-gray-100 p-2 text-gray-500 transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <svg
            aria-hidden="true"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
          >
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
          </svg>
        </button>

        <div className="overflow-y-auto p-8 md:p-12">
          <div className="mb-8 text-center">
            <h2 id="contact-modal-title" className="mb-3 text-3xl font-bold text-gray-900">
              {locale === 'vi' ? 'Ứng tuyển ngay nào' : dict.title}
            </h2>
            <p className="text-gray-600">
              {locale === 'vi'
                ? 'Hãy điền thông tin của bạn và gửi cho nhà tuyển dụng'
                : '応募情報を入力して採用担当者へ送信してください'}
            </p>
          </div>

          <ContactForm
            locale={locale}
            dict={{
              name: dict.name,
              email: dict.email,
              phone: dict.phone,
              company: dict.company,
              subject: dict.subject,
              message: dict.message,
              send: locale === 'vi' ? 'Ứng Tuyển' : dict.send,
            }}
          />
        </div>
      </div>
    </div>
  )
}
