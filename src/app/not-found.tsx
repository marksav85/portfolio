import { headers } from 'next/headers';
import { localeHref, parseLocale } from '@/lib/locale';
export default async function NotFound() {
  const locale = parseLocale((await headers()).get('x-portfolio-locale'));
  return (
    <main className="container section">
      <h1>404</h1>
      <p>{locale === 'de' ? 'Seite nicht gefunden' : 'Page not found'}</p>
      <a className="button" href={localeHref(locale)}>
        {locale === 'de' ? 'Zur Startseite' : 'Home'}
      </a>
    </main>
  );
}
