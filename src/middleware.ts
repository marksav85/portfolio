import { NextResponse, type NextRequest } from 'next/server';
export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  const { env } = await import('cloudflare:workers');
  let indexable = false;
  try {
    indexable =
      env.DEPLOYMENT_ENV === 'production' &&
      Boolean(env.SITE_URL) &&
      new URL(env.SITE_URL!).origin === request.nextUrl.origin;
  } catch {
    // Missing or invalid canonical configuration must keep the site unindexed.
  }
  // Overwrite client-supplied values before forwarding the indexing policy to metadata.
  headers.set('x-portfolio-noindex', String(!indexable));
  headers.set(
    'x-portfolio-locale',
    request.nextUrl.searchParams.get('lang') === 'en' ? 'en' : 'de',
  );
  const response = NextResponse.next({ request: { headers } });
  if (!indexable) response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}
export const config = { matcher: ['/:path*'] };
