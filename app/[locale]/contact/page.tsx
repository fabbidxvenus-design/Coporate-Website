import Page from '../../(public)/contact/page'

export default function LocaleContactPage({ params }: { params: Promise<{ locale: string }> }) {
  return <Page params={params} />
}