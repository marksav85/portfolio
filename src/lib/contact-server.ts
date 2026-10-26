import { isIP } from 'node:net';
import { validateContact } from './contact';
export type ContactRateLimiter = {
  limit(options: { key: string }): Promise<{ success: boolean }>;
};
export type ContactConfig = {
  CONTACT_RATE_LIMITER?: ContactRateLimiter;
  RESEND_API_KEY?: string;
  CONTACT_FROM?: string;
  CONTACT_TO?: string;
  CONTACT_ALLOWED_ORIGIN?: string;
};
const maxBody = 32768;
const reply = (status: number) =>
  Response.json(
    { ok: status === 200 },
    {
      status,
      headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': '60' } : {}) },
    },
  );
export function createContactHandler(config: ContactConfig, deliver: typeof fetch = fetch) {
  return async (request: Request) => {
    if (request.method !== 'POST')
      return new Response(null, { status: 405, headers: { Allow: 'POST' } });
    const origin = request.headers.get('origin');
    const allowed = config.CONTACT_ALLOWED_ORIGIN || new URL(request.url).origin;
    if (origin !== allowed || request.headers.get('sec-fetch-site') === 'cross-site')
      return reply(403);
    if (
      request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json'
    )
      return reply(415);
    if (Number(request.headers.get('content-length')) > maxBody) return reply(413);
    let body: unknown;
    try {
      const reader = request.body?.getReader();
      if (!reader) return reply(400);
      const chunks: Uint8Array[] = [];
      let size = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > maxBody) {
          await reader.cancel();
          return reply(413);
        }
        chunks.push(value);
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.length;
      }
      body = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    } catch {
      return reply(400);
    }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(400);
    const data = body as Record<string, unknown>;
    if (
      Object.keys(data).some((key) => !['name', 'email', 'message', 'honeypot'].includes(key)) ||
      !['name', 'email', 'message'].every((key) => typeof data[key] === 'string') ||
      (data.honeypot !== undefined && (typeof data.honeypot !== 'string' || data.honeypot !== ''))
    )
      return reply(400);
    const { values, errors } = validateContact(
      data as { name: string; email: string; message: string },
    );
    if (Object.keys(errors).length) return reply(400);
    // CF-Connecting-IP is trusted only at direct Cloudflare ingress. Never use X-Forwarded-For.
    // Fail closed in local preview too; tests inject identities and a simulated binding.
    const ip = request.headers.get('cf-connecting-ip');
    if (!ip || !isIP(ip) || !config.CONTACT_RATE_LIMITER) return reply(503);
    try {
      const result = await config.CONTACT_RATE_LIMITER.limit({ key: `portfolio-contact:${ip}` });
      if (typeof result?.success !== 'boolean') return reply(503);
      if (!result.success) return reply(429);
    } catch {
      return reply(503);
    }
    const { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } = config;
    if (!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO || /[\r\n]/.test(CONTACT_FROM + CONTACT_TO))
      return reply(503);
    try {
      const response = await deliver('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify({
          from: CONTACT_FROM,
          to: [CONTACT_TO],
          reply_to: values.email,
          subject: 'New portfolio contact message',
          text: `Portfolio contact form\n\nName: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`,
        }),
      });
      if (!response.ok) return reply(502);
      const result = (await response.json()) as { id?: unknown };
      return typeof result.id === 'string' && result.id ? reply(200) : reply(502);
    } catch {
      return reply(502);
    }
  };
}
