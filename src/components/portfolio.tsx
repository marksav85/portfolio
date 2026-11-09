'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import type { PortfolioData } from '@/lib/strapi-server';
import type { PortfolioLocale, PortfolioProject } from '@/types/portfolio';
import { messages, localeHref } from '@/lib/locale';
import { groupProjects } from '@/api/projects';
import { sortSkills } from '@/api/strapi';
import { projectPresentation } from '@/config/projects';
import { Section } from '@/components/ui/section';
import { ContactForm } from '@/components/contact-form';
import { ProjectDialog } from '@/components/project-dialog';
import { ProjectCard } from '@/components/project-card';
import { Media, RichText } from '@/components/portfolio-content';

export const professionalLinks = {
  github: 'https://github.com/marksav85',
  linkedin: 'https://linkedin.com/in/mark-saville',
  website: 'https://marksavilledesigns.com',
};
export function Portfolio({ data, locale }: { data: PortfolioData; locale: PortfolioLocale }) {
  const m = messages[locale];
  const [menu, setMenu] = useState(false);
  const [more, setMore] = useState(false);
  const revealButton = useRef<HTMLButtonElement>(null);
  const collapsing = useRef(false);
  useLayoutEffect(() => {
    if (!collapsing.current) return;
    collapsing.current = false;
    const button = revealButton.current;
    button?.focus({ preventScroll: true });
    button?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }, [more]);
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
  const open = (project: PortfolioProject, image: number, event: MouseEvent<HTMLButtonElement>) =>
    setSelection({ project, image, trigger: event.currentTarget });
  function languageLink(event: MouseEvent<HTMLAnchorElement>, target: PortfolioLocale) {
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
            <img
              className="brand-mark"
              src="/images/branding/brand-logo.webp"
              width={40}
              height={40}
              alt=""
              decoding="async"
            />
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
          <div className="project-grid" id="project-grid">
            {visible.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale}
                labels={labels}
                onOpen={open}
              />
            ))}
          </div>
          {groups.additional.length > 0 && (
            <div className="reveal">
              <button
                className="button secondary mono"
                ref={revealButton}
                aria-expanded={more}
                aria-controls="project-grid"
                onClick={() => {
                  collapsing.current = more;
                  setMore(!more);
                }}
              >
                {more ? m.showLess : `${work?.Button || m.showMore} (${groups.additional.length})`}{' '}
                {more ? '↑' : '↓'}
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
