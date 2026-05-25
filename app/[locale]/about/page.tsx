import AboutPage from '../../(public)/about/page'

export default function LocaleAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  return <AboutPage params={params} />
}