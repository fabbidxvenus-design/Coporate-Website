import { redirect } from 'next/navigation'

export default async function LocaleContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  redirect(`/${locale}/apply`)
}
