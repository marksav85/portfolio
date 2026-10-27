import type { MetadataRoute } from 'next';
import { publicSiteOrigin } from '@/lib/strapi-server';

export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = await publicSiteOrigin();
  return {
    rules: { userAgent: '*', allow: '/' },
    ...(origin ? { sitemap: new URL('/sitemap.xml', origin).href } : {}),
  };
}
