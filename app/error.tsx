'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[App] Unhandled error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Đã xảy ra lỗi</h1>
        <p className="text-gray-600 mb-6">
          Đã có lỗi không mong muốn xảy ra. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề tiếp tục.
        </p>
        <button
          onClick={reset}
          className="bg-[#006672] hover:bg-[#007a8d] text-white px-6 py-3 rounded-lg transition-colors"
        >
          Thử lại
        </button>
      </div>
    </div>
  )
}