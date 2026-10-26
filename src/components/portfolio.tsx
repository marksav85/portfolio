'use client';
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { PortfolioData } from '@/lib/strapi-server';
import type {
  PortfolioLocale,
  RichTextParagraph,
  RichTextChild,
  ImageAttributes,
  PortfolioProject,
} from '@/types/portfolio';
import { messages, localeHref } from '@/lib/locale';
import { groupProjects, projectLinkUrls } from '@/api/projects';
import { sortSkills } from '@/api/strapi';
import { projectPresentation, projectLinks } from '@/config/projects';
import { Section } from '@/components/ui/section';
import { ContactForm } from '@/components/contact-form';
import { ProjectDialog } from '@/components/project-dialog';

export const professionalLinks = {
  github: 'https://github.com/marksav85',
  linkedin: 'https://linkedin.com/in/mark-saville',
  website: 'https://marksavilledesigns.com',
};
function markedText(child: RichTextChild, key: number) {
  let text: ReactNode = child.text;
  if (child.bold) text = <strong>{text}</strong>;
  if (child.italic) text = <em>{text}</em>;
  if (child.underline) text = <u>{text}</u>;
  if (child.strikethrough) text = <s>{text}</s>;
  if (child.code) text = <code>{text}</code>;
  return <span key={key}>{text}</span>;
}
export function RichText({ blocks }: { blocks: RichTextParagraph[] | null }) {
  return (
    <>
      {blocks?.map((block, index) => (
        <p key={index}>
          {block.children?.filter((child) => child.type === 'text').map(markedText)}
        </p>
      ))}
    </>
  );
}
export function Media({
  image,
  className,
  locale,
}: {
  image: ImageAttributes;
  className?: string;
  locale: PortfolioLocale;
}) {
  const [failed, setFailed] = useState(false);
  // Allow relative CMS media only after the server has resolved the actual CMS origin.
  const safe = /^(https?:\/\/|\/[^/])/.test(image.url);
  if (failed || !safe)
    return (
      <span className={`image-failure ${className ?? ''}`}>
        {messages[locale].imageUnavailable}
      </span>
    );
  return (
    <img
      src={image.url}
      alt={image.alternativeText ?? ''}
      width={image.width && image.width > 0 ? image.width : undefined}
      height={image.height && image.height > 0 ? image.height : undefined}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
export function ExternalActions({
  project,
  locale,
  labels,
}: {
  project: PortfolioProject;
  locale: PortfolioLocale;
  labels?: { Homepage: string; Repository: string } | null;
}) {
  const urls = projectLinkUrls(project, projectLinks),
    m = messages[locale];
  return (
    <div className="project-actions">
      {urls.homepage && (
        <a className="button" href={urls.homepage} target="_blank" rel="noopener noreferrer">
          {labels?.Homepage || m.website} ↗
        </a>
      )}
      {urls.repository && (
        <a
          className="button secondary"
          href={urls.repository}
          target="_blank"
          rel="noopener noreferrer"
        >
          {labels?.Repository || m.repository} ↗
        </a>
      )}
    </div>
  );
}
export function Portfolio({ data, locale }: { data: PortfolioData; locale: PortfolioLocale }) {
  const m = messages[locale];
  const [menu, setMenu] = useState(false);
  const [more, setMore] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(true);
  const [selection, setSelection] = useState<{
    project: PortfolioProject;
    image: number;
    trigger: HTMLElement;
  } | null>(null);
  const profile = data.profile.ok ? data.profile.data : null,
    work = data.work.ok ? data.work.data : null,
    labels = data.labels.ok ? data.labels.data : null,
    contact = data.contact.ok ? data.contact.data : null;
  const projects = data.projects.ok ? data.projects.data : [];
  const groups = groupProjects(projects, projectPresentation);
  const visible = more ? [...groups.primary, ...groups.additional] : groups.primary;
  const skills = sortSkills(data.skills.ok ? data.skills.data : []);
  const known = ['Frontend', 'Backend & CMS', 'Data & Platforms'];
  const skillGroups = [
    ...known.map((area) => ({ area, rows: skills.filter((row) => row.Column3 === area) })),
    {
      area: locale === 'de' ? 'Weitere Bereiche' : 'Other areas',
      rows: skills.filter((row) => !known.includes(row.Column3)),
    },
  ].filter((group) => group.rows.length);
  const open = (
    project: PortfolioProject,
    image: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => setSelection({ project, image, trigger: event.currentTarget });
  function languageLink(event: React.MouseEvent<HTMLAnchorElement>, target: PortfolioLocale) {
    event.currentTarget.href = localeHref(target, window.location.hash);
  }
  const notice = (ok: boolean, empty = false) =>
    !ok ? (
      <div role="status" className="notice error">
        <p>{m.unavailable}</p>
        <a className="button secondary" href={localeHref(locale)}>
          {m.retry}
        </a>
      </div>
    ) : empty ? (
      <p className="muted">{m.empty}</p>
    ) : null;
  return (
    <>
      <a className="button skip-link" href="#main">
        {m.skip}
      </a>
      <header className="site-header">
        <div className="container header-row">
          <a className="brand" href={localeHref(locale)}>
            <span className="brand-mark">MS</span>
            <span>
              <strong>Mark Saville</strong>
              <small>{m.role}</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label={m.menu}>
            {(['work', 'about', 'skills', 'contact'] as const).map((id) => (
              <a key={id} href={`#${id}`}>
                {m[id]}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <nav aria-label="Language / Sprache" className="locale-control">
              {(['en', 'de'] as const).map((code) => (
                <a
                  key={code}
                  href={localeHref(code)}
                  hrefLang={code}
                  aria-current={code === locale ? 'page' : undefined}
                  onClick={(event) => languageLink(event, code)}
                >
                  {code.toUpperCase()}
                </a>
              ))}
            </nav>
            <a className="button header-cta" href="#contact">
              {m.getInTouch}
            </a>
            <button
              className="menu-toggle"
              aria-expanded={menu}
              aria-controls="mobile-nav"
              onClick={() => setMenu(!menu)}
              aria-label={m.menu}
            >
              {menu ? '×' : '☰'}
            </button>
          </div>
        </div>
        {menu && (
          <nav id="mobile-nav" className="mobile-nav" aria-label={m.menu}>
            {(['work', 'about', 'skills', 'contact'] as const).map((id) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {m[id]}
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="main" className="container">
        {data.fixture && (
          <p className="fixture-banner" role="status">
            {m.fixture}
          </p>
        )}
        <section className="hero" aria-labelledby="hero-title">
          <div className="role-badge mono">
            <span aria-hidden="true" /> {m.role}
          </div>
          <p className="eyebrow">Mark Saville</p>
          <h1 id="hero-title">Mark Saville</h1>
          {data.header.ok && data.header.data ? (
            <div className="hero-intro">
              <RichText blocks={data.header.data.Text} />
            </div>
          ) : (
            notice(data.header.ok, true)
          )}
          <div className="hero-actions">
            <a className="button" href="#work">
              {m.explore} ↓
            </a>
            <a className="button secondary" href="#contact">
              {m.getInTouch} ↗
            </a>
          </div>
          <div className="social-row mono">
            <a href={professionalLinks.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a href={professionalLinks.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a href={professionalLinks.website} target="_blank" rel="noopener noreferrer">
              Mark Saville Designs ↗
            </a>
          </div>
        </section>
        <Section id="work" eyebrow={m.portfolio} title={work?.Title || m.work}>
          {notice(data.work.ok)}
          {notice(data.projects.ok, projects.length === 0)}
          <div className="project-grid">
            {visible.map((project) => (
              <article key={project.slug} className="project-card panel">
                {project.Images[0] ? (
                  <button
                    className="project-cover"
                    onClick={(event) => open(project, 0, event)}
                    aria-label={`${labels?.buttonShow || m.details}: ${project.Title ?? project.name}`}
                  >
                    <Media image={project.Images[0]} locale={locale} />
                  </button>
                ) : (
                  <div className="no-cover muted">{m.noImages}</div>
                )}
                <div className="project-body">
                  <h3>{project.Title}</h3>
                  {project.Intro && <p className="muted project-intro">{project.Intro}</p>}
                  {project.Images.length > 0 && (
                    <div className="thumbnail-row">
                      {project.Images.slice(0, 3).map((image, index) => (
                        <button
                          key={`${image.url}-${index}`}
                          className="thumbnail"
                          onClick={(event) => open(project, index, event)}
                          aria-label={`${m.image} ${index + 1}: ${project.Title ?? project.name}`}
                        >
                          <Media image={image} locale={locale} />
                        </button>
                      ))}
                      <span className="mono muted">
                        {project.Images.length} {locale === 'de' ? 'Bilder' : 'images'}
                      </span>
                    </div>
                  )}
                  {project.Technologies && <p className="tech mono">{project.Technologies}</p>}
                  <ExternalActions project={project} locale={locale} labels={labels} />
                  <button
                    className="details-button mono"
                    onClick={(event) => open(project, 0, event)}
                  >
                    {labels?.buttonShow || m.details}
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
          {!more && groups.additional.length > 0 && (
            <div className="reveal">
              <button
                className="button secondary mono"
                aria-expanded={false}
                onClick={() => setMore(true)}
              >
                {work?.Button || m.showMore} ({groups.additional.length}) ↓
              </button>
            </div>
          )}
        </Section>
        <Section id="about" eyebrow={m.background} title={profile?.Title || m.about}>
          {notice(data.profile.ok, !profile)}
          {profile && (
            <div className="profile-grid">
              <div className="portrait panel">
                <img
                  src="/images/profile/profile-photo-640x800.webp"
                  srcSet="/images/profile/profile-photo-640x800.webp 640w, /images/profile/profile-photo-960x1200.webp 960w"
                  sizes="(max-width: 767px) 90vw, 420px"
                  width="640"
                  height="800"
                  alt="Mark Saville"
                  loading="lazy"
                />
              </div>
              <div className="biography panel">
                <p>{profile.Text}</p>
              </div>
            </div>
          )}
        </Section>
        <Section id="skills" eyebrow={m.capabilities} title={profile?.skillsTitle || m.skills}>
          {notice(data.skills.ok, skills.length === 0)}
          {skills.length > 0 && (
            <>
              <button
                className="disclosure mono"
                aria-expanded={skillsOpen}
                aria-controls="skills-content"
                onClick={() => setSkillsOpen(!skillsOpen)}
              >
                {skillsOpen
                  ? profile?.buttonHide || m.hideSkills
                  : profile?.buttonShow || m.showSkills}{' '}
                {skillsOpen ? '−' : '+'}
              </button>
              <div id="skills-content" hidden={!skillsOpen}>
                <div className="skills-grid">
                  {skillGroups.map((group) => (
                    <div className="skill-group panel" key={group.area}>
                      <h3>{group.area}</h3>
                      <ul>
                        {group.rows.map((row, index) => (
                          <li key={row.id ?? `${row.Column1}-${index}`}>
                            {row.Column2 && <Media image={row.Column2} locale={locale} />}
                            <span>
                              {row.Column1}
                              {!known.includes(row.Column3) && (
                                <small className="muted">{row.Column3}</small>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </Section>
        <Section id="contact" eyebrow={m.contact} title={contact?.Title || m.conversation}>
          {notice(data.contact.ok)}
          {contact?.Subtitle && <p className="contact-subtitle muted">{contact.Subtitle}</p>}
          <div className="contact-grid">
            <aside className="contact-links panel">
              <p className="eyebrow">
                {locale === 'de' ? 'Profile & Kontakt' : 'Profiles & contact'}
              </p>
              <a href={professionalLinks.website} target="_blank" rel="noopener noreferrer">
                Mark Saville Designs ↗
              </a>
              <a href={professionalLinks.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
              <a href={professionalLinks.linkedin} target="_blank" rel="noopener noreferrer">
                {contact?.Linkedin || 'LinkedIn'} ↗
              </a>
            </aside>
            <ContactForm locale={locale} />
          </div>
        </Section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-row">
            <div>
              <h3>Mark Saville</h3>
              <p className="muted">{m.role}</p>
            </div>
            <div className="social-row mono">
              <a href={professionalLinks.github}>GitHub</a>
              <a href={professionalLinks.linkedin}>LinkedIn</a>
              <a href={professionalLinks.website}>Mark Saville Designs</a>
            </div>
          </div>
          <div className="footer-row mono muted">
            <p>© {new Date().getFullYear()} Mark Saville</p>
            <a href="#hero-title">{m.backTop} ↑</a>
          </div>
        </div>
      </footer>
      {selection && (
        <ProjectDialog
          key={selection.project.slug}
          selection={selection}
          locale={locale}
          labels={labels}
          onClose={() => setSelection(null)}
        />
      )}
    </>
  );
}
