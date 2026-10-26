import { NextResponse, type NextRequest } from 'next/server';
export async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(
    'x-portfolio-locale',
    request.nextUrl.searchParams.get('lang') === 'en' ? 'en' : 'de',
  );
  const response = NextResponse.next({ request: { headers } });
  const { env } = await import('cloudflare:workers');
  if (env.DEPLOYMENT_ENV === 'staging') response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}
export const config = { matcher: ['/:path*'] };
