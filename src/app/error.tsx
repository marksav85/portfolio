'use client';
import { useSearchParams } from 'next/navigation';
import { messages, parseLocale } from '@/lib/locale';
export default function ErrorBoundary({ reset }: { reset: () => void }) {
  const m = messages[parseLocale(useSearchParams().get('lang'))];
  return (
    <main className="container section">
      <h1>{m.unavailable}</h1>
      <button className="button" onClick={reset}>
        {m.retry}
      </button>
    </main>
  );
}
