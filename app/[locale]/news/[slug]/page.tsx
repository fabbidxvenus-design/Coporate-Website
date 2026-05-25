import Page from '../../../(public)/news/[slug]/page'

export default function LocaleNewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  return <Page params={params} />
}