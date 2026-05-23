import { PublicHeader } from '@/components/public/PublicHeader';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div lang={locale}>
      <PublicHeader />
      {children}
    </div>
  );
}
