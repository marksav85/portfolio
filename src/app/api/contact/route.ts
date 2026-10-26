import { createContactHandler } from '@/lib/contact-server';
export async function POST(request: Request) {
  const { env } = await import('cloudflare:workers');
  return createContactHandler(env)(request);
}
