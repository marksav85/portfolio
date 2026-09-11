import type {
  ContactContent,
  HeaderContent,
  LabelsContent,
  LanguageContent,
  PortfolioLocale,
  ProfileContent,
  ProjectSet,
  ReferenceContent,
  ReferenceListContent,
  SkillsTableEntry,
  WorkContent,
} from "../types/portfolio";

interface SingleResponse<T> {
  data: T | null;
  meta?: unknown;
}

interface CollectionResponse<T> {
  data: T[];
  meta?: unknown;
}

// During the migration, support the existing environment values that still
// end in /graphql. Once GraphQL is fully removed, the env values can simply
// point to the Strapi server root.
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL.replace(/\/$/, "");

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${STRAPI_URL}${path}`);

  if (!response.ok) {
    throw new Error(
      `Strapi request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<T>;
}

const localeParam = (locale: PortfolioLocale) =>
  `locale=${encodeURIComponent(locale)}`;

export async function getHeader(
  locale: PortfolioLocale,
): Promise<HeaderContent | null> {
  const response = await request<SingleResponse<HeaderContent>>(
    `/api/header?${localeParam(locale)}`,
  );

  return response.data;
}

export async function getProfile(
  locale: PortfolioLocale,
): Promise<ProfileContent | null> {
  const response = await request<SingleResponse<ProfileContent>>(
    `/api/profile?${localeParam(locale)}`,
  );

  return response.data;
}

export async function getSkillsTables(): Promise<SkillsTableEntry[]> {
  const response = await request<CollectionResponse<SkillsTableEntry>>(
    "/api/skills-tables?sort=Column3:desc&pagination[limit]=100&populate=Column2",
  );

  return response.data;
}

export async function getWork(
  locale: PortfolioLocale,
): Promise<WorkContent | null> {
  const response = await request<SingleResponse<WorkContent>>(
    `/api/work?${localeParam(locale)}`,
  );

  return response.data;
}

export async function getLabels(
  locale: PortfolioLocale,
): Promise<LabelsContent | null> {
  const response = await request<CollectionResponse<LabelsContent>>(
    `/api/labels?${localeParam(locale)}`,
  );

  return response.data[0] ?? null;
}

function getProjectsPopulateQuery(): string {
  return Array.from(
    { length: 10 },
    (_, index) => `populate[Project${index + 1}][populate]=Images`,
  ).join("&");
}

export async function getProjects(
  locale: PortfolioLocale,
): Promise<ProjectSet | null> {
  const response = await request<CollectionResponse<ProjectSet>>(
    `/api/projects?${localeParam(locale)}&${getProjectsPopulateQuery()}`,
  );

  return response.data[0] ?? null;
}

export async function getContact(
  locale: PortfolioLocale,
): Promise<ContactContent | null> {
  const response = await request<SingleResponse<ContactContent>>(
    `/api/contact?${localeParam(locale)}`,
  );

  return response.data;
}

export async function getReference(
  locale: PortfolioLocale,
): Promise<ReferenceContent | null> {
  const response = await request<SingleResponse<ReferenceContent>>(
    `/api/reference?${localeParam(locale)}`,
  );

  return response.data;
}

export async function getReferenceLists(
  locale: PortfolioLocale,
): Promise<ReferenceListContent> {
  const response = await request<CollectionResponse<ReferenceListContent>>(
    `/api/reference-lists?${localeParam(locale)}&populate[ReferenceList][populate]=Image`,
  );

  return (
    response.data[0] ?? {
      locale,
      ReferenceList: [],
    }
  );
}

export async function fetchPortfolioContent(
  locale: PortfolioLocale,
): Promise<LanguageContent> {
  const [
    header,
    profile,
    skillsTables,
    work,
    labels,
    projects,
    contact,
    reference,
    referenceLists,
  ] = await Promise.all([
    getHeader(locale),
    getProfile(locale),
    getSkillsTables(),
    getWork(locale),
    getLabels(locale),
    getProjects(locale),
    getContact(locale),
    getReference(locale),
    getReferenceLists(locale),
  ]);

  return {
    header,
    profile,
    skillsTables,
    work,
    labels,
    projects,
    contact,
    reference,
    referenceLists,
  };
}
