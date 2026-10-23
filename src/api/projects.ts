import type { PortfolioLocale, PortfolioProject, ProjectEntry, ProjectSet } from "../types/portfolio";
import type { ProjectPresentation } from "../config/projects";

interface ProjectDocument {
  documentId: string;
  slug: string;
  name: string;
  locale: string;
  publishedAt: string | null;
  content: ProjectEntry | null;
}
interface ProjectPage {
  data: ProjectDocument[];
  meta: { pagination: { page: number; pageCount: number } };
}
type Request = <T>(path: string, signal?: AbortSignal) => Promise<T>;

export const validProjectUrl = (value: string | null | undefined): string | null => {
  if (!value || value.trim() !== value) return null;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password
      ? url.href : null;
  } catch { return null; }
};

export async function fetchProjectCollection(
  locale: PortfolioLocale, request: Request, signal?: AbortSignal,
): Promise<PortfolioProject[]> {
  const projects: PortfolioProject[] = [];
  const slugs = new Set<string>();
  const documents = new Set<string>();
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const query = new URLSearchParams({ locale, status: "published",
      "populate[content][populate]": "Images", "sort[0]": "slug:asc",
      "pagination[page]": String(page), "pagination[pageSize]": "100" });
    const response = await request<ProjectPage>(`/api/portfolio-projects?${query}`, signal);
    const pagination = response.meta?.pagination;
    if (!Array.isArray(response.data) || !pagination || pagination.page !== page ||
        !Number.isInteger(pagination.pageCount) || pagination.pageCount < 0) {
      throw new Error("Invalid portfolio project pagination");
    }
    for (const row of response.data) {
      // Defense in depth: draft and other-locale data never reach the UI.
      if (!row.publishedAt || row.locale !== locale) continue;
      if (!row.documentId || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.slug) ||
          slugs.has(row.slug) || documents.has(row.documentId)) {
        throw new Error("Missing or duplicate portfolio project identity");
      }
      slugs.add(row.slug); documents.add(row.documentId);
      if (!row.content) continue;
      projects.push({ ...row.content, documentId: row.documentId, slug: row.slug,
        name: row.name, locale, hasHomepage: row.content.hasHomepage === true,
        hasRepository: row.content.hasRepository === true,
        Images: (Array.isArray(row.content.Images) ? row.content.Images : [])
          .filter(image => Boolean(image?.url)),
      });
    }
    hasMore = page < pagination.pageCount;
    page++;
  }
  return projects;
}

export function legacyProjectsToArray(set: ProjectSet | null): PortfolioProject[] {
  if (!set) return [];
  return Object.keys(set).filter(key => /^Project\d+$/.test(key))
    .sort((a, b) => Number(a.slice(7)) - Number(b.slice(7)))
    .flatMap(key => {
      const project = set[key as `Project${number}`];
      return project ? [{ ...project, slug: `legacy-${key.toLowerCase()}`,
        documentId: `legacy-${key}`, locale: set.locale, name: project.Title ?? key,
        // Preserve the former UI policy only inside the legacy adapter.
        hasHomepage: key === "Project11" && project.hasHomepage !== false,
        hasRepository: false, legacy: true,
      }] : [];
    });
}

export function groupProjects(projects: PortfolioProject[], config: ProjectPresentation) {
  const rank = new Map([...config.featuredSlugs, ...config.preferredOrder]
    .filter((slug, index, list) => list.indexOf(slug) === index)
    .map((slug, index) => [slug, index]));
  const ordered = [...projects].sort((a, b) =>
    (rank.get(a.slug) ?? Infinity) - (rank.get(b.slug) ?? Infinity));
  const count = Math.max(0, Math.floor(config.initialVisibleCount));
  return { primary: ordered.slice(0, count), additional: ordered.slice(count) };
}

export function projectLinkUrls(project: PortfolioProject, policy: {
  homepageFlagsReviewed: boolean; legacyHomepageSlugs: readonly string[];
}) {
  return {
    repository: project.hasRepository === true ? validProjectUrl(project.Repository) : null,
    homepage: project.hasHomepage === true && (project.legacy || policy.homepageFlagsReviewed ||
      policy.legacyHomepageSlugs.includes(project.slug)) ? validProjectUrl(project.Homepage) : null,
  };
}
