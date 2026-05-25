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
    console.error('[Public] Unhandled error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Đã xảy ra lỗi</h1>
        <p className="text-gray-600 mb-6">
          Trang này không thể tải. Vui lòng thử lại hoặc quay về trang chủ.
        </p>
        <button
          onClick={reset}
          className="bg-[#006672] hover:bg-[#005560] text-white px-6 py-3 rounded-lg transition-colors"
        >
          Thử lại
        </button>
      </div>
    </div>
  )
}