'use client'

import { useState, useEffect } from 'react'

interface SettingsFormProps {
  initialData?: Record<string, string>
}

const settingFields = [
  { key: 'company_name', label: 'Tên công ty', type: 'text', placeholder: 'Fabbi JSC' },
  { key: 'company_email', label: 'Email công ty', type: 'email', placeholder: 'contact@fabbi.vn' },
  { key: 'company_phone', label: 'Số điện thoại', type: 'tel', placeholder: '0123 456 789' },
  { key: 'company_address', label: 'Địa chỉ', type: 'text', placeholder: 'Hà Nội, Việt Nam' },
  { key: 'company_website', label: 'Website', type: 'url', placeholder: 'https://fabbi.vn' },
  { key: 'contact_email', label: 'Email liên hệ', type: 'email', placeholder: 'contact@fabbi.vn' },
  { key: 'recruitment_email', label: 'Email tuyển dụng', type: 'email', placeholder: 'recruitment@fabbi.vn' },
  { key: 'social_facebook', label: 'Facebook', type: 'url', placeholder: 'https://facebook.com/fabbi' },
  { key: 'social_linkedin', label: 'LinkedIn', type: 'url', placeholder: 'https://linkedin.com/company/fabbi' },
  { key: 'social_zalo', label: 'Zalo', type: 'text', placeholder: 'ID Zalo' },
]

export default function SettingsForm({ initialData = {} }: SettingsFormProps) {
  const [settings, setSettings] = useState<Record<string, string>>(initialData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const data = await res.json()
          setSettings(data.data || {})
        }
      } catch (err) {
        console.error('Failed to load settings:', err)
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [])

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async (key: string, value: string) => {
    setSaving(true)
    setSuccess(null)
    setError(null)

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save')
      }

      setSuccess(`Đã lưu: ${key}`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi lưu')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#008b9c]"></div>
      </div>
    )
  }

  return (
    <div className="max-w-[800px] mx-auto">
      {success && (
        <div role="status" aria-live="polite" aria-atomic="true" className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-base" aria-hidden="true">check_circle</span>
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div role="alert" aria-live="assertive" className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-base" aria-hidden="true">error</span>
          <span>{error}</span>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Thông tin công ty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settingFields.slice(0, 5).map(field => (
              <div key={field.key}>
                <label htmlFor={`setting-${field.key}`} className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <input
                  id={`setting-${field.key}`}
                  type={field.type}
                  value={settings[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  onBlur={(e) => handleSave(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus-visible:border-[#008b9c] focus-visible:ring-1 focus-visible:ring-[#008b9c] transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Liên hệ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settingFields.slice(5, 7).map(field => (
              <div key={field.key}>
                <label htmlFor={`setting-${field.key}`} className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <input
                  id={`setting-${field.key}`}
                  type={field.type}
                  value={settings[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  onBlur={(e) => handleSave(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus-visible:border-[#008b9c] focus-visible:ring-1 focus-visible:ring-[#008b9c] transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Mạng xã hội</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settingFields.slice(7).map(field => (
              <div key={field.key}>
                <label htmlFor={`setting-${field.key}`} className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                <input
                  id={`setting-${field.key}`}
                  type={field.type}
                  value={settings[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  onBlur={(e) => handleSave(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus-visible:border-[#008b9c] focus-visible:ring-1 focus-visible:ring-[#008b9c] transition-colors"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}