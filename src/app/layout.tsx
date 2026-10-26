import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { parseLocale } from '@/lib/locale';
import './globals.css';
export const metadata: Metadata = {
  title: 'Mark Saville — Full-Stack Web Developer',
  description: 'Mark Saville — Web development, projects and technical skills.',
  icons: { icon: '/logo-set--blue/favicon.ico', apple: '/logo-set--blue/apple-touch-icon.png' },
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = parseLocale((await headers()).get('x-portfolio-locale'));
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
