import Link from 'next/link'
import { getDictionary, Locale } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

export default async function ApplySuccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = getDictionary(locale as Locale)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {dict.apply.successTitle}
        </h1>
        <p className="text-gray-600 mb-8">
          {dict.apply.successMessage}
        </p>
        <Link
          href={`/${locale}/jobs`}
          className="inline-flex items-center justify-center px-6 py-3 bg-pink-600 hover:bg-pink-700 hover:text-white font-semibold rounded-lg transition-colors"
        >
          {dict.apply.viewMoreJobs || (locale === 'vi' ? 'Xem thêm cơ hội khác' : '他の機会を見る')}
        </Link>
      </div>
    </section>
  )
}