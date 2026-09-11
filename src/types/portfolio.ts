export type EntityId = string | number;

export interface ImageAttributes {
  id?: EntityId;
  name: string;
  alternativeText: string | null;
  url: string;
}

export interface LocalizationMeta {
  id?: EntityId;
  locale: string;
}

export interface RichTextChild {
  text: string;
  bold?: boolean;
  type: string;
}

export interface RichTextParagraph {
  type: string;
  children: RichTextChild[];
}

export interface HeaderContent extends LocalizationMeta {
  Button: string;
  Text: RichTextParagraph[];
}

export interface ProfileContent extends LocalizationMeta {
  Title: string;
  Text: string;
  skillsTitle: string;
  tableTech: string;
  tableExpertise: string;
  buttonShow: string;
  buttonHide: string;
}

export interface SkillsTableEntry {
  id?: EntityId;
  Column1: string;
  Column2: ImageAttributes | null;
  Column3: number;
}

export interface WorkContent extends LocalizationMeta {
  Title: string;
  Button: string;
}

export interface LabelsContent extends LocalizationMeta {
  Process: string;
  Description: string;
  Technologies: string;
  Homepage: string;
  Repository: string;
  buttonShow: string;
  buttonHide: string;
}

export interface ProjectEntry {
  id: EntityId;
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

export type ProjectSet = LocalizationMeta & {
  id?: EntityId;
} & Partial<Record<`Project${number}`, ProjectEntry | null>>;

export interface ContactContent extends LocalizationMeta {
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

export interface ReferenceContent extends LocalizationMeta {
  Title: string;
}

export interface ReferenceEntry {
  id: EntityId;
  Quote: RichTextParagraph[];
  Text: string;
  Link: string;
  LinkText: string;
  Image: ImageAttributes | null;
}

export interface ReferenceListContent extends LocalizationMeta {
  id?: EntityId;
  ReferenceList: ReferenceEntry[];
}

export interface LanguageContent {
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

export type PortfolioLocale = "en" | "de";
