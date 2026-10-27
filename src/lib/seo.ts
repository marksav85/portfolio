import type { Metadata, MetadataRoute } from 'next';
import type { PortfolioLocale } from '@/types/portfolio';

export const localePaths = { de: '/', en: '/?lang=en', 'x-default': '/' } as const;
export const seoContent = {
  de: {
    title: 'Mark Saville — Webentwicklung & Projekte',
    description: 'Mark Saville — Webentwicklung, Projekte und technische Fähigkeiten.',
    locale: 'de_DE',
  },
  en: {
    title: 'Mark Saville — Web Development & Projects',
    description: 'Mark Saville — Web development, projects and technical skills.',
    locale: 'en_US',
  },
} as const;

export function publicSeoOrigin(siteUrl: string | undefined, environment: string | undefined) {
  if (environment !== 'production' || !siteUrl) return undefined;
  try {
    const url = new URL(siteUrl);
    if (
      !['https:', 'http:'].includes(url.protocol) ||
      url.username ||
      url.password ||
      /\.(workers|pages)\.dev$/i.test(url.hostname)
    )
      return undefined;
    return new URL(url.origin);
  } catch {
    return undefined;
  }
}

export function sitemapEntries(origin: URL | undefined): MetadataRoute.Sitemap {
  if (!origin) return [];
  const languages = Object.fromEntries(
    Object.entries(localePaths).map(([locale, path]) => [locale, new URL(path, origin).href]),
  );
  return (['de', 'en'] as const).map((locale) => ({
    url: languages[locale],
    alternates: { languages },
  }));
}

export function socialMetadata(
  locale: PortfolioLocale,
  origin: URL | undefined,
): Pick<Metadata, 'openGraph' | 'twitter'> {
  if (!origin) return {};
  const content = seoContent[locale];
  const image = {
    url: new URL('/images/social/social-preview.png', origin).href,
    width: 1731,
    height: 909,
    alt:
      locale === 'de'
        ? 'Mark Saville Designs — Webentwicklungsportfolio'
        : 'Mark Saville Designs — Web Development Portfolio',
  };
  return {
    openGraph: {
      type: 'website',
      siteName: 'Mark Saville — Portfolio',
      title: content.title,
      description: content.description,
      url: new URL(localePaths[locale], origin).href,
      locale: content.locale,
      alternateLocale: [seoContent[locale === 'de' ? 'en' : 'de'].locale],
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: [image],
    },
  };
}
