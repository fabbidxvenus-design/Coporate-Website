'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const rawRedirect = searchParams.get('redirect') || '/admin'
  const errorParam = searchParams.get('error')

  const isValidRedirect = rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')
  const redirectTo = isValidRedirect ? rawRedirect : '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(
    errorParam === 'unauthorized'
      ? 'Bạn không có quyền truy cập trang này.'
      : null
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Đăng nhập thất bại')
        setLoading(false)
        return
      }

      router.push(redirectTo)
      router.refresh()
    } catch {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fbf9f8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center mb-4" aria-label="Fabbi home">
            <Image
              src="/images/Logo-Fabbi.svg"
              alt="Fabbi Logo"
              width={200}
              height={70}
              className="h-16 w-auto object-contain"
              priority
            />
          </Link>
          <p className="text-gray-600">Đăng nhập để quản lý nội dung</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700 font-mono">
            <span className="font-semibold">Dev credentials:</span> admin@fabbi.vn / admin123
          </div>

          {error && (
            <div role="alert" className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006672] focus-visible:ring-offset-2 focus-visible:border-transparent transition-shadow"
                placeholder="admin@fabbi.vn"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#006672] focus-visible:ring-offset-2 focus-visible:border-transparent transition-shadow"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#006672] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#007a8d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006672]"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          <Link href="/" className="text-teal-text hover:underline">
            ← Quay về trang chủ
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div aria-live="polite" aria-busy="true" className="min-h-screen bg-[#fbf9f8] flex items-center justify-center px-4">
        <div className="animate-pulse">Đang tải...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}