import Page from '../../../(public)/apply/success/page'

export default function LocaleApplySuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  return <Page params={params} />
}