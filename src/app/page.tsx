import { loadPortfolio, siteOrigin } from '@/lib/strapi-server';
import { Portfolio } from '@/components/portfolio';
import type { Metadata } from 'next';
import { parseLocale } from '@/lib/locale';
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const locale = parseLocale((await searchParams).lang),
    origin = await siteOrigin();
  return {
    title:
      locale === 'de'
        ? 'Mark Saville — Webentwicklung & Projekte'
        : 'Mark Saville — Web Development & Projects',
    ...(origin
      ? {
          metadataBase: origin,
          alternates: {
            canonical: locale === 'en' ? '/?lang=en' : '/',
            languages: { de: '/', en: '/?lang=en', 'x-default': '/' },
          },
        }
      : {}),
  };
}
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}) {
  const locale = parseLocale((await searchParams).lang);
  return <Portfolio key={locale} data={await loadPortfolio(locale)} locale={locale} />;
}
