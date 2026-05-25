import Page from '../../(public)/jobs/page'

interface LocaleJobsPageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string; location?: string; type?: string; page?: string }>
}

export default function LocaleJobsPage(props: LocaleJobsPageProps) {
  return <Page params={props.params} searchParams={props.searchParams} />
}