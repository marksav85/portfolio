import type { PortfolioLocale, PortfolioProject, SkillsTableEntry } from '@/types/portfolio';
import type { SectionResult } from '@/api/strapi';
const ok = <T>(data: T): SectionResult<T> => ({ ok: true, data });
// Synthetic contract fixtures, never a production fallback. Explicit opt-in only.
export function fixtureContent(locale: PortfolioLocale) {
  const de = locale === 'de';
  const images = [
    '/images/fixtures/image-1.svg',
    '/images/fixtures/image-2.svg',
    '/images/fixtures/image-3.svg',
  ];
  const projects: PortfolioProject[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    documentId: `fixture-${i + 1}`,
    slug: `fixture-${i + 1}`,
    name: `Fixture ${i + 1}`,
    locale,
    Title: `${de ? 'Testprojekt' : 'Test project'} ${i + 1}`,
    Intro: de
      ? 'Gekennzeichnete Entwicklungsdaten zur Prüfung von Layout, langen Beschreibungen und bestehenden Inhaltsverträgen.'
      : 'Labelled development data for verifying layout, long descriptions and the existing content contracts.',
    Text: ['client', 'personal', 'business', 'backend', 'data-analysis', 'Legacy text'][i] ?? null,
    Technologies: 'TypeScript · React · Strapi REST',
    hasHomepage: false,
    hasRepository: false,
    Homepage: null,
    Repository: null,
    TextBlock: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: (de
              ? 'Entwicklungsbeispiel — kein echtes Portfolio-Projekt. '
              : 'Development example — not a real portfolio project. '
            ).repeat(i === 0 ? 24 : 3),
            bold: false,
          },
        ],
      },
    ],
    Images:
      i === 6
        ? []
        : images.slice(0, i === 7 ? 1 : 3).map((url, index) => ({
            id: index,
            name: 'Fixture image',
            url,
            alternativeText: de
              ? 'Synthetisches Bild als Layout-Test'
              : 'Synthetic image used for layout testing',
            width: 640,
            height: 800,
          })),
  }));
  const skills: SkillsTableEntry[] = [
    'Frontend',
    'Backend & CMS',
    'Data & Platforms',
    'Other',
  ].flatMap((area, index) =>
    Array.from({ length: 3 }, (_, i) => ({
      id: index * 3 + i,
      Column1: `${area} fixture ${i + 1}`,
      Column2: null,
      Column3: area,
    })),
  );
  return {
    header: ok({
      locale,
      Button: '',
      Text: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: de
                ? 'Webanwendungen mit durchdachter Architektur und klaren Oberflächen.'
                : 'Web applications with considered architecture and clear interfaces.',
            },
          ],
        },
      ],
    }),
    profile: ok({
      locale,
      Title: de ? 'Hintergrund & Philosophie' : 'Background & Philosophy',
      Text: (de
        ? 'Gekennzeichneter Beispieltext für die Entwicklungsansicht. '
        : 'Labelled example text for the development preview. '
      ).repeat(8),
      skillsTitle: de ? 'Technische Fähigkeiten' : 'Technical Skills',
      tableTech: 'Technology',
      tableArea: 'Area',
      buttonShow: de ? 'Fähigkeiten anzeigen' : 'Show skills',
      buttonHide: de ? 'Fähigkeiten ausblenden' : 'Hide skills',
    }),
    work: ok({
      locale,
      Title: de ? 'Ausgewählte Projekte' : 'Selected Work',
      Button: de ? 'Weitere Projekte anzeigen' : 'Show more projects',
    }),
    projects: ok(projects),
    skills: ok(skills),
    labels: ok({
      locale,
      Process: de ? 'Entwicklungsprozess' : 'Engineering Process',
      Description: de ? 'Beschreibung' : 'Description',
      Technologies: de ? 'Technologien' : 'Technologies',
      Homepage: de ? 'Website' : 'Live Website',
      Repository: 'Repository',
      buttonShow: de ? 'Details anzeigen' : 'View details',
      buttonHide: de ? 'Schließen' : 'Close',
    }),
    contact: ok({
      locale,
      Title: de ? 'Lassen Sie uns sprechen' : 'Let’s Start a Conversation',
      Subtitle: de
        ? 'Kontaktbereich — Entwicklungsansicht.'
        : 'Contact section — development preview.',
      Linkedin: 'LinkedIn',
      Telephone: '',
      Email: '',
      ResumeFullText: null,
      ResumeFullLink: null,
      ResumeDeveloperText: null,
      ResumeDeveloperLink: null,
    }),
  };
}
