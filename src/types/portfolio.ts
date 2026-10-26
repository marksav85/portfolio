export type EntityId = string | number;

export interface ImageAttributes {
  id?: EntityId;
  name: string;
  alternativeText: string | null;
  url: string;
  width?: number | null;
  height?: number | null;
}

export interface LocalizationMeta {
  id?: EntityId;
  locale: string;
}

export interface RichTextChild {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
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
  tableArea: string;
  buttonShow: string;
  buttonHide: string;
}

export interface SkillsTableEntry {
  id?: EntityId;
  Column1: string;
  Column2: ImageAttributes | null;
  Column3: string;
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
  hasRepository?: boolean | null;
  Images: ImageAttributes[];
}

export interface PortfolioProject extends ProjectEntry {
  documentId: string;
  slug: string;
  name: string;
  locale: string;
  legacy?: boolean;
}

export type ProjectSet = LocalizationMeta & {
  id?: EntityId;
} & Partial<Record<`Project${number}`, ProjectEntry | null>>;

export interface ContactContent extends LocalizationMeta {
  Title: string;
  Subtitle: string;
  Linkedin: string;
  Telephone: string | null;
  Email: string;
  ResumeFullText: string | null;
  ResumeFullLink: string | null;
  ResumeDeveloperText: string | null;
  ResumeDeveloperLink: string | null;
}

export type PortfolioLocale = 'en' | 'de';
