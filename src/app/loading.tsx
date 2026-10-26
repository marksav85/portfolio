import { headers } from 'next/headers';
import { parseLocale } from '@/lib/locale';
export default async function Loading() {
  const locale = parseLocale((await headers()).get('x-portfolio-locale'));
  return (
    <main className="container section" aria-busy="true">
      <p role="status">{locale === 'de' ? 'Inhalte werden geladen…' : 'Loading content…'}</p>
    </main>
  );
}
