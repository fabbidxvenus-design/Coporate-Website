import Page from '../../(public)/apply/page'

export default function LocaleApplyPage({ params }: { params: Promise<{ locale: string }> }) {
  return <Page params={params} />
}