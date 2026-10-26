import { NextResponse, type NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set(
    'x-portfolio-locale',
    request.nextUrl.searchParams.get('lang') === 'en' ? 'en' : 'de',
  );
  return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ['/'] };
