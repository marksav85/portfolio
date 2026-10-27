import type { MetadataRoute } from 'next';
import { publicSiteOrigin } from '@/lib/strapi-server';
import { sitemapEntries } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return sitemapEntries(await publicSiteOrigin());
}
