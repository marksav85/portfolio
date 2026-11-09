import { useState } from 'react';
import type { ReactNode } from 'react';
import type {
  ImageAttributes,
  PortfolioLocale,
  PortfolioProject,
  RichTextChild,
  RichTextParagraph,
} from '@/types/portfolio';
import { messages } from '@/lib/locale';
import { projectLinkUrls } from '@/api/projects';
import { projectLinks } from '@/config/projects';

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
