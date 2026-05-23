import Link from 'next/link'

export const metadata = {
  title: 'Ứng tuyển thành công | Fabbi',
}

export default function ApplySuccessPage() {
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
          Đã gửi hồ sơ thành công!
        </h1>
        <p className="text-gray-600 mb-8">
          Cảm ơn bạn đã ứng tuyển. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
        </p>
        <Link
          href="/jobs"
          className="inline-flex items-center justify-center px-6 py-3 bg-[#008b9c] hover:bg-[#007a89] text-white font-semibold rounded-lg transition-colors"
        >
          Xem thêm cơ hội khác
        </Link>
      </div>
    </section>
  )
}