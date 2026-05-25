import Page from '../(public)/page'

export default function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  return <Page params={params} />
}