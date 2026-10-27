import { createStrapi, sectionResult } from '@/api/strapi';
import type { PortfolioLocale } from '@/types/portfolio';
import { resolveMedia } from '@/api/media';
import { fixtureContent } from '@/lib/fixtures';
import { publicSeoOrigin } from '@/lib/seo';

// Imported only by server routes. Credentials never cross the client boundary.
async function serverConfig() {
  const { env } = await import('cloudflare:workers');
  return env;
}
export async function loadPortfolio(locale: PortfolioLocale) {
  const env = await serverConfig();
  if (env.PORTFOLIO_FIXTURES === 'true') return { ...fixtureContent(locale), fixture: true };
  const request = async <T>(path: string): Promise<T> => {
    if (!env.STRAPI_URL) throw new Error('STRAPI_URL is required');
    const origin = new URL(env.STRAPI_URL);
    if (!['http:', 'https:'].includes(origin.protocol) || origin.username || origin.password)
      throw new Error('Invalid Strapi origin');
    const response = await fetch(`${origin.href.replace(/\/$/, '')}${path}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
      headers: env.STRAPI_API_TOKEN ? { Authorization: `Bearer ${env.STRAPI_API_TOKEN}` } : {},
    });
    if (!response.ok) throw new Error('Strapi unavailable');
    return response.json() as Promise<T>;
  };
  const api = createStrapi(request);
  const [header, profile, work, projects, skills, labels, contact] = await Promise.all([
    sectionResult(() => api.header(locale)),
    sectionResult(() => api.profile(locale)),
    sectionResult(() => api.work(locale)),
    sectionResult(() => api.projects(locale)),
    sectionResult(() => api.skills()),
    sectionResult(() => api.labels(locale)),
    sectionResult(() => api.contact(locale)),
  ]);
  if (env.STRAPI_URL) {
    if (projects.ok)
      projects.data = projects.data.map((project) => ({
        ...project,
        Images: project.Images.flatMap((image) => {
          const resolved = resolveMedia(image, env.STRAPI_URL!);
          return resolved ? [resolved] : [];
        }),
      }));
    if (skills.ok)
      skills.data = skills.data.map((row) => ({
        ...row,
        Column2: row.Column2 ? resolveMedia(row.Column2, env.STRAPI_URL!) : null,
      }));
  }
  return { header, profile, work, projects, skills, labels, contact, fixture: false };
}
export type PortfolioData = Awaited<ReturnType<typeof loadPortfolio>>;

export async function siteOrigin() {
  const { SITE_URL } = await serverConfig();
  if (!SITE_URL) return undefined;
  try {
    const url = new URL(SITE_URL);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password
      ? new URL(url.origin)
      : undefined;
  } catch {
    return undefined;
  }
}

export async function isStaging() {
  return (await serverConfig()).DEPLOYMENT_ENV === 'staging';
}

export async function publicSiteOrigin() {
  const env = await serverConfig();
  return publicSeoOrigin(env.SITE_URL, env.DEPLOYMENT_ENV);
}
