import type {
  ContactContent,
  HeaderContent,
  ProfileContent,
  WorkContent,
  LabelsContent,
  SkillsTableEntry,
  PortfolioLocale,
  ImageAttributes,
} from '../types/portfolio';
import { fetchProjectCollection } from './projects';
export type Request = <T>(path: string, signal?: AbortSignal) => Promise<T>;
type Single<T> = { data: T | null };
type Collection<T> = { data: T[] };
export type SectionResult<T> = { ok: true; data: T } | { ok: false; error: 'unavailable' };
type CmsSection = 'header' | 'profile' | 'work' | 'projects' | 'skills' | 'labels' | 'contact';
class StrapiHttpError extends Error {
  constructor(readonly status: number) {
    super('Strapi unavailable');
  }
}
export async function readStrapiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) throw new StrapiHttpError(response.status);
  return response.json() as Promise<T>;
}
export async function sectionResult<T>(
  load: () => Promise<T>,
  section?: CmsSection,
): Promise<SectionResult<T>> {
  try {
    return { ok: true, data: await load() };
  } catch (error) {
    // Only server callers supply section context. Never serialize the error or request.
    if (section)
      console.error({
        event: 'strapi_section_failed',
        section,
        classification:
          error instanceof StrapiHttpError
            ? 'http'
            : error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name)
              ? 'timeout_or_abort'
              : error instanceof SyntaxError
                ? 'invalid_json'
                : error instanceof TypeError
                  ? 'network_or_configuration'
                  : 'content_or_configuration',
        ...(error instanceof StrapiHttpError ? { status: error.status } : {}),
      });
    return { ok: false, error: 'unavailable' };
  }
}
export function normalizeImage(value: ImageAttributes | ImageAttributes[] | null | undefined) {
  return (
    (Array.isArray(value) ? value : value ? [value] : []).find((image) => Boolean(image?.url)) ??
    null
  );
}
export function createStrapi(request: Request) {
  const single = async <T>(path: string, locale: PortfolioLocale): Promise<T | null> => {
    const response = await request<Single<T>>(`${path}?locale=${locale}`);
    if (!response || !('data' in response)) throw new Error('Missing Strapi data');
    if (
      response.data &&
      typeof response.data === 'object' &&
      'locale' in response.data &&
      response.data.locale !== locale
    )
      throw new Error('Incorrect Strapi locale');
    return response.data;
  };
  return {
    header: (locale: PortfolioLocale) => single<HeaderContent>('/api/header', locale),
    profile: (locale: PortfolioLocale) => single<ProfileContent>('/api/profile', locale),
    work: (locale: PortfolioLocale) => single<WorkContent>('/api/work', locale),
    contact: (locale: PortfolioLocale) => single<ContactContent>('/api/contact', locale),
    labels: async (locale: PortfolioLocale) => {
      const response = await request<Collection<LabelsContent>>(`/api/labels?locale=${locale}`);
      if (!Array.isArray(response.data)) throw new Error('Invalid labels');
      const labels = response.data[0] ?? null;
      if (labels?.locale && labels.locale !== locale) throw new Error('Incorrect labels locale');
      return labels;
    },
    skills: async (): Promise<SkillsTableEntry[]> => {
      const response = await request<Collection<SkillsTableEntry>>(
        '/api/skills-tables?pagination[limit]=100&populate=Column2',
      );
      if (!Array.isArray(response.data)) throw new Error('Invalid skills');
      return response.data.map((row) => ({ ...row, Column2: normalizeImage(row.Column2) }));
    },
    projects: (locale: PortfolioLocale) => fetchProjectCollection(locale, request),
  };
}
export function sortSkills(rows: SkillsTableEntry[]) {
  const rank: Record<string, number> = { Frontend: 1, 'Backend & CMS': 2, 'Data & Platforms': 3 };
  return [...rows].sort(
    (a, b) =>
      (rank[a.Column3] ?? 99) - (rank[b.Column3] ?? 99) || a.Column1.localeCompare(b.Column1),
  );
}
