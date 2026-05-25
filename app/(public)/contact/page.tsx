import { getDictionary, Locale } from '@/lib/i18n';
import { ContactForm } from '@/components/public/ContactForm';

export const dynamic = 'force-dynamic';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="bg-[#fbf9f8] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1b1c1c] mb-4">
              {dict.contact.title}
            </h1>
            <p className="text-gray-600 mb-12">
              {locale === 'vi'
                ? 'Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy điền thông tin vào mẫu dưới đây.'
                : '私たちはいつでもあなたの声を聞き、サポートする準備ができています。 以下のフォームに情報を入力してください。'}
            </p>

            <ContactForm
              locale={locale}
              dict={{
                name: dict.contact.name,
                email: dict.contact.email,
                phone: dict.contact.phone,
                company: dict.contact.company,
                subject: dict.contact.subject,
                message: dict.contact.message,
                send: dict.cta.send,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
