import type { MouseEvent } from 'react';
import type { LabelsContent, PortfolioLocale, PortfolioProject } from '@/types/portfolio';
import { messages, projectTypeLabel } from '@/lib/locale';
import { ExternalActions, Media } from '@/components/portfolio-content';

export function ProjectCard({
  project,
  locale,
  labels,
  onOpen,
}: {
  project: PortfolioProject;
  locale: PortfolioLocale;
  labels: LabelsContent | null;
  onOpen: (project: PortfolioProject, image: number, event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const m = messages[locale];
  const typeLabel = projectTypeLabel(project.Text, locale);

  return (
    <article className="project-card panel">
      {project.Images[0] ? (
        <button
          className="project-cover"
          onClick={(event) => onOpen(project, 0, event)}
          aria-label={`${labels?.buttonShow || m.details}: ${project.Title ?? project.name}`}
        >
          <Media image={project.Images[0]} locale={locale} />
        </button>
      ) : (
        <div className="no-cover muted">{m.noImages}</div>
      )}
      <div className="project-body">
        <h3>{project.Title}</h3>
        {typeLabel && <p className="project-type mono muted">{typeLabel}</p>}
        {project.Intro && <p className="muted project-intro">{project.Intro}</p>}
        {project.Images.length > 0 && (
          <div className="thumbnail-row">
            {project.Images.slice(0, 3).map((image, index) => (
              <button
                key={`${image.url}-${index}`}
                className="thumbnail"
                onClick={(event) => onOpen(project, index, event)}
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
        <button className="details-button mono" onClick={(event) => onOpen(project, 0, event)}>
          {labels?.buttonShow || m.details}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </article>
  );
}
