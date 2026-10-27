import { loadPortfolio, siteOrigin, isStaging, publicSiteOrigin } from '@/lib/strapi-server';
import { Portfolio } from '@/components/portfolio';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { parseLocale } from '@/lib/locale';
import { localePaths, seoContent, socialMetadata } from '@/lib/seo';
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string | string[] }>;
}): Promise<Metadata> {
  const locale = parseLocale((await searchParams).lang),
    origin = await siteOrigin();
  return {
    ...((await isStaging()) || (await headers()).get('x-portfolio-noindex') !== 'false'
      ? { robots: { index: false, follow: false } }
      : {}),
    title: seoContent[locale].title,
    description: seoContent[locale].description,
    ...socialMetadata(locale, await publicSiteOrigin()),
    ...(origin
      ? {
          metadataBase: origin,
          alternates: {
            canonical: localePaths[locale],
            languages: localePaths,
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
