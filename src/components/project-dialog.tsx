'use client';
import { useState } from 'react';
import type { PortfolioLocale, PortfolioProject, LabelsContent } from '@/types/portfolio';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { messages } from '@/lib/locale';
import { RichText, Media, ExternalActions } from '@/components/portfolio';
export function ProjectDialog({
  selection,
  locale,
  labels,
  onClose,
}: {
  selection: { project: PortfolioProject; image: number; trigger: HTMLElement };
  locale: PortfolioLocale;
  labels: LabelsContent | null;
  onClose: () => void;
}) {
  const { project } = selection,
    m = messages[locale],
    images = project.Images;
  const [active, setActive] = useState(Math.max(0, Math.min(selection.image, images.length - 1)));
  const image = images[active];
  const original = image && /^(https?:\/\/|\/[^/])/.test(image.url) ? image.url : null;
  function step(direction: number) {
    if (images.length > 1)
      setActive((index) => (index + direction + images.length) % images.length);
  }
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          selection.trigger.focus();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            step(-1);
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            step(1);
          }
        }}
      >
        <header className="modal-header">
          <p className="eyebrow">
            {m.work} <span aria-hidden="true"> / </span>
            <span className="muted">{project.Title}</span>
          </p>
          <DialogClose className="modal-close" aria-label={m.close}>
            <span className="mono">ESC</span> ×
          </DialogClose>
        </header>
        <div className="modal-grid">
          <section className="modal-media" aria-label={m.moreImages}>
            {image ? (
              <>
                <div className="active-image">
                  <Media key={image.url} image={image} locale={locale} />
                  <p className="image-counter mono" aria-live="polite" aria-atomic="true">
                    {m.image} {active + 1} {m.of} {images.length}
                  </p>
                  {images.length > 1 && (
                    <>
                      <button
                        className="gallery-arrow previous"
                        aria-label={m.previous}
                        onClick={() => step(-1)}
                      >
                        ‹
                      </button>
                      <button
                        className="gallery-arrow next"
                        aria-label={m.next}
                        onClick={() => step(1)}
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
                <div className="gallery-bottom">
                  <div className="gallery-thumbnails">
                    {images.map((item, index) => (
                      <button
                        key={`${item.url}-${index}`}
                        className="thumbnail"
                        aria-label={`${m.image} ${index + 1}`}
                        aria-current={index === active ? 'true' : undefined}
                        onClick={() => setActive(index)}
                      >
                        <Media image={item} locale={locale} />
                      </button>
                    ))}
                  </div>
                  {original && (
                    <a
                      className="mono original-link"
                      href={original}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {m.original} ↗
                    </a>
                  )}
                </div>
              </>
            ) : (
              <div className="no-cover">{m.noImages}</div>
            )}
          </section>
          <section className="modal-copy" tabIndex={0} aria-label={project.Title || project.name}>
            <div>
              <DialogTitle className="modal-title">{project.Title || project.name}</DialogTitle>
              <DialogDescription className="muted modal-description">
                {project.Intro || m.missingDetails}
              </DialogDescription>
              {project.Technologies && (
                <div className="modal-technologies">
                  <h3 className="eyebrow muted">{labels?.Technologies || m.technologies}</h3>
                  <p className="tech mono">{project.Technologies}</p>
                </div>
              )}
              <h3 className="eyebrow">{labels?.Process || m.process}</h3>
              <div className="process-copy muted">
                {project.TextBlock?.some((block) =>
                  block.children?.some((child) => child.type === 'text' && child.text),
                ) ? (
                  <RichText blocks={project.TextBlock} />
                ) : (
                  <p>{m.missingDetails}</p>
                )}
              </div>
            </div>
            <ExternalActions project={project} locale={locale} labels={labels} />
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
