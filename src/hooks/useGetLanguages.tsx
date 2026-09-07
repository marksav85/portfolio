import { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { useLanguage } from "../context/LanguageContext";

interface Entity<T> { id: string; attributes: T }
interface SingleResponse<T> { data: Entity<T> | null }
interface CollectionResponse<T> { data: Entity<T>[] }

interface ImageAttributes {
  name: string;
  alternativeText: string | null;
  url: string;
}
interface LocalizationMeta { id?: string; locale: string }
interface RichTextChild { text: string; bold?: boolean; type: string }
interface RichTextParagraph { type: string; children: RichTextChild[] }

interface HeaderContent extends LocalizationMeta {
  Button: string;
  Text: RichTextParagraph[];
}
interface ProfileContent extends LocalizationMeta {
  Title: string;
  Text: string;
  skillsTitle: string;
  tableTech: string;
  tableExpertise: string;
  buttonShow: string;
  buttonHide: string;
}
interface SkillsTableEntry {
  id?: string;
  Column1: string;
  Column2: ImageAttributes | null;
  Column3: number;
}
interface WorkContent extends LocalizationMeta { Title: string; Button: string }
interface LabelsContent extends LocalizationMeta {
  Process: string;
  Description: string;
  Technologies: string;
  Homepage: string;
  Repository: string;
  buttonShow: string;
  buttonHide: string;
}
interface ProjectEntry {
  id: string;
  Intro: string | null;
  Text: string | null;
  TextBlock: RichTextParagraph[] | null;
  Title: string | null;
  Technologies: string | null;
  Repository: string | null;
  Homepage: string | null;
  hasHomepage: boolean | null;
  Images: ImageAttributes[];
}
type ProjectSet = LocalizationMeta &
  Partial<Record<`Project${number}`, ProjectEntry | null>>;
interface ContactContent extends LocalizationMeta {
  Title: string;
  Subtitle: string;
  Linkedin: string;
  Telephone: string;
  Email: string;
  ResumeFullText: string | null;
  ResumeFullLink: string | null;
  ResumeDeveloperText: string | null;
  ResumeDeveloperLink: string | null;
}
interface ReferenceContent extends LocalizationMeta { Title: string }
interface ReferenceEntry {
  id: string;
  Quote: RichTextParagraph[];
  Text: string;
  Link: string;
  LinkText: string;
  Image: ImageAttributes | null;
}
interface ReferenceListContent extends LocalizationMeta {
  ReferenceList: ReferenceEntry[];
}
interface LanguageContent {
  header: HeaderContent | null;
  profile: ProfileContent | null;
  skillsTables: SkillsTableEntry[];
  work: WorkContent | null;
  labels: LabelsContent | null;
  projects: ProjectSet | null;
  contact: ContactContent | null;
  reference: ReferenceContent | null;
  referenceLists: ReferenceListContent;
}

type RawProject = Omit<ProjectEntry, "Images"> & {
  Images: CollectionResponse<ImageAttributes>;
};
type RawProjectSet = LocalizationMeta &
  Partial<Record<`Project${number}`, RawProject | null>>;
type RawSkill = Omit<SkillsTableEntry, "Column2"> & {
  Column2: SingleResponse<ImageAttributes>;
};
type RawReference = Omit<ReferenceEntry, "Image"> & {
  Image: SingleResponse<ImageAttributes>;
};
export interface RawLanguageData {
  header: SingleResponse<HeaderContent>;
  profile: SingleResponse<ProfileContent>;
  skillsTables: CollectionResponse<RawSkill>;
  work: SingleResponse<WorkContent>;
  labels: CollectionResponse<LabelsContent>;
  projects: CollectionResponse<RawProjectSet>;
  contact: SingleResponse<ContactContent>;
  reference: SingleResponse<ReferenceContent>;
  referenceLists: CollectionResponse<LocalizationMeta & { ReferenceList: RawReference[] }>;
}

function unwrapEntity<T>(entity: Entity<T> | null): (T & { id: string }) | null {
  return entity ? { ...entity.attributes, id: entity.id } : null;
}
function unwrapCollection<T>(response: CollectionResponse<T>): (T & { id: string })[] {
  return response.data.map((entity) => ({ ...entity.attributes, id: entity.id }));
}

// Components stay flat; only entity and media response envelopes are unwrapped.
export function adaptLanguageData(raw: RawLanguageData): LanguageContent {
  const projectSet = unwrapEntity(raw.projects.data[0] ?? null);
  let projects: ProjectSet | null = null;
  if (projectSet) {
    projects = { id: projectSet.id, locale: projectSet.locale };
    for (let number = 1; number <= 10; number++) {
      const key = `Project${number}` as const;
      const component = projectSet[key];
      if (component) {
        projects[key] = { ...component, Images: unwrapCollection(component.Images) };
      }
    }
  }
  const referenceList = unwrapEntity(raw.referenceLists.data[0] ?? null);
  return {
    header: unwrapEntity(raw.header.data),
    profile: unwrapEntity(raw.profile.data),
    work: unwrapEntity(raw.work.data),
    contact: unwrapEntity(raw.contact.data),
    reference: unwrapEntity(raw.reference.data),
    labels: unwrapEntity(raw.labels.data[0] ?? null),
    projects,
    skillsTables: unwrapCollection(raw.skillsTables).map((skill) => ({
      ...skill, Column2: unwrapEntity(skill.Column2.data),
    })),
    referenceLists: referenceList ? {
      ...referenceList,
      ReferenceList: referenceList.ReferenceList.map((reference) => ({
        ...reference, Image: unwrapEntity(reference.Image.data),
      })),
    } : { locale: raw.header.data?.attributes.locale ?? "", ReferenceList: [] },
  };
}

export const GET_LANGUAGES = gql`
  fragment PortfolioImage on UploadFileEntity {
    id
    attributes { name alternativeText url }
  }
  fragment PortfolioProject on ComponentProjectsProject1 {
    id
    Intro Text TextBlock Title Technologies Repository Homepage hasHomepage
    Images { data { ...PortfolioImage } }
  }
  query GetLanguages($locale: I18NLocaleCode!) {
    header(locale: $locale) {
      data { id attributes { Button Text locale } }
    }
    profile(locale: $locale) {
      data { id attributes {
        Title Text skillsTitle tableTech tableExpertise buttonShow buttonHide locale
      } }
    }
    skillsTables(sort: "Column3:desc", pagination: { limit: 100 }) {
      data { id attributes {
        Column1 Column3 Column2 { data { ...PortfolioImage } }
      } }
    }
    work(locale: $locale) {
      data { id attributes { Title Button locale } }
    }
    labels(locale: $locale) {
      data { id attributes {
        Process Description Technologies Homepage Repository buttonShow buttonHide locale
      } }
    }
    projects(locale: $locale) {
      data { id attributes {
        locale
        Project1 { ...PortfolioProject }
        Project2 { ...PortfolioProject }
        Project3 { ...PortfolioProject }
        Project4 { ...PortfolioProject }
        Project5 { ...PortfolioProject }
        Project6 { ...PortfolioProject }
        Project7 { ...PortfolioProject }
        Project8 { ...PortfolioProject }
        Project9 { ...PortfolioProject }
        Project10 { ...PortfolioProject }
      } }
    }
    contact(locale: $locale) {
      data { id attributes {
        Title Subtitle Linkedin Telephone Email ResumeFullText ResumeFullLink
        ResumeDeveloperText ResumeDeveloperLink locale
      } }
    }
    reference(locale: $locale) {
      data { id attributes { Title locale } }
    }
    referenceLists(locale: $locale) {
      data { id attributes {
        locale
        ReferenceList {
          id Quote Text Link LinkText
          Image { data { ...PortfolioImage } }
        }
      } }
    }
  }
`;

export const useGetLanguages = () => {
  const { selectedLanguage } = useLanguage();
  const locale = selectedLanguage === "german" ? "de" : "en";
  const { data: raw, loading, error } = useQuery<RawLanguageData>(GET_LANGUAGES, {
    variables: { locale },
    fetchPolicy: "cache-and-network",
  });
  const data = useMemo(() => raw ? adaptLanguageData(raw) : null, [raw]);
  return { data, loading, error };
};
