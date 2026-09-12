import type {
  ContactContent,
  HeaderContent,
  ImageAttributes,
  LabelsContent,
  LanguageContent,
  PortfolioLocale,
  ProfileContent,
  ProjectEntry,
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

type ImageValue = ImageAttributes | ImageAttributes[] | null | undefined;

const normalizeImageList = (value: ImageValue): ImageAttributes[] => {
  const images = Array.isArray(value) ? value : value ? [value] : [];

  return images.filter((image) => Boolean(image?.url));
};

const normalizeImage = (value: ImageValue): ImageAttributes | null =>
  normalizeImageList(value)[0] ?? null;

const normalizeProjects = (projects: ProjectSet | null): ProjectSet | null => {
  if (!projects) {
    return null;
  }

  const normalizedProjects = { ...projects };

  for (let index = 1; index <= 10; index += 1) {
    const key = `Project${index}` as `Project${number}`;
    const project = projects[key];

    if (project) {
      normalizedProjects[key] = {
        ...project,
        Images: normalizeImageList(project.Images),
      } satisfies ProjectEntry;
    }
  }

  return normalizedProjects;
};

// During the migration, support the existing environment values that still
// end in /graphql. Once GraphQL is fully removed, the env values can simply
// point to the Strapi server root.
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL.replace(/\/$/, "");

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${STRAPI_URL}${path}`, { signal });

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
  signal?: AbortSignal,
): Promise<HeaderContent | null> {
  const response = await request<SingleResponse<HeaderContent>>(
    `/api/header?${localeParam(locale)}`,
    signal,
  );

  return response.data;
}

export async function getProfile(
  locale: PortfolioLocale,
  signal?: AbortSignal,
): Promise<ProfileContent | null> {
  const response = await request<SingleResponse<ProfileContent>>(
    `/api/profile?${localeParam(locale)}`,
    signal,
  );

  return response.data;
}

export async function getSkillsTables(
  signal?: AbortSignal,
): Promise<SkillsTableEntry[]> {
  const response = await request<CollectionResponse<SkillsTableEntry>>(
    "/api/skills-tables?sort=Column3:desc&pagination[limit]=100&populate=Column2",
    signal,
  );

  return response.data.map((skill) => ({
    ...skill,
    Column2: normalizeImage(skill.Column2),
  }));
}

export async function getWork(
  locale: PortfolioLocale,
  signal?: AbortSignal,
): Promise<WorkContent | null> {
  const response = await request<SingleResponse<WorkContent>>(
    `/api/work?${localeParam(locale)}`,
    signal,
  );

  return response.data;
}

export async function getLabels(
  locale: PortfolioLocale,
  signal?: AbortSignal,
): Promise<LabelsContent | null> {
  const response = await request<CollectionResponse<LabelsContent>>(
    `/api/labels?${localeParam(locale)}`,
    signal,
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
  signal?: AbortSignal,
): Promise<ProjectSet | null> {
  const response = await request<CollectionResponse<ProjectSet>>(
    `/api/projects?${localeParam(locale)}&${getProjectsPopulateQuery()}`,
    signal,
  );

  return normalizeProjects(response.data[0] ?? null);
}

export async function getContact(
  locale: PortfolioLocale,
  signal?: AbortSignal,
): Promise<ContactContent | null> {
  const response = await request<SingleResponse<ContactContent>>(
    `/api/contact?${localeParam(locale)}`,
    signal,
  );

  return response.data;
}

export async function getReference(
  locale: PortfolioLocale,
  signal?: AbortSignal,
): Promise<ReferenceContent | null> {
  const response = await request<SingleResponse<ReferenceContent>>(
    `/api/reference?${localeParam(locale)}`,
    signal,
  );

  return response.data;
}

export async function getReferenceLists(
  locale: PortfolioLocale,
  signal?: AbortSignal,
): Promise<ReferenceListContent> {
  const response = await request<CollectionResponse<ReferenceListContent>>(
    `/api/reference-lists?${localeParam(locale)}&populate[ReferenceList][populate]=Image`,
    signal,
  );

  const referenceLists = response.data[0] ?? {
    locale,
    ReferenceList: [],
  };

  return {
    ...referenceLists,
    ReferenceList: referenceLists.ReferenceList.map((reference) => ({
      ...reference,
      Image: normalizeImage(reference.Image),
    })),
  };
}

export async function fetchPortfolioContent(
  locale: PortfolioLocale,
  signal?: AbortSignal,
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
    getHeader(locale, signal),
    getProfile(locale, signal),
    getSkillsTables(signal),
    getWork(locale, signal),
    getLabels(locale, signal),
    getProjects(locale, signal),
    getContact(locale, signal),
    getReference(locale, signal),
    getReferenceLists(locale, signal),
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
