import Page from '../../(public)/news/page'

interface LocaleNewsPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string; category?: string; page?: string }>
}

export default function LocaleNewsPage(props: LocaleNewsPageProps) {
  return <Page params={props.params} searchParams={props.searchParams} />
}