// Real workerd limiter simulation with synthetic configuration and no outbound delivery.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const { Miniflare, convertV4MiniflareOptions } = require('miniflare');
test('workerd native binding enforces contact threshold without outbound email', async () => {
  const config = ts.parseConfigFileTextToJson(
    'wrangler.jsonc',
    fs.readFileSync('wrangler.jsonc', 'utf8'),
  ).config;
  const binding = config.ratelimits.find((item) => item.name === 'CONTACT_RATE_LIMITER');
  assert.deepEqual(binding.simple, { limit: 3, period: 60 });
  const source =
    fs.readFileSync('src/lib/contact.ts', 'utf8') +
    '\n' +
    fs
      .readFileSync('src/lib/contact-server.ts', 'utf8')
      .replace("import { validateContact } from './contact';", '');
  const script =
    ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    }).outputText +
    `
let calls = 0;
export default { async fetch(request, env) {
  if (new URL(request.url).pathname === '/calls') return Response.json({ calls });
  return createContactHandler({ ...env, RESEND_API_KEY: 'synthetic', CONTACT_FROM: 'sender@example.test', CONTACT_TO: 'recipient@example.test' }, async () => { calls++; return Response.json({ id: 'mock' }); })(request);
} };`;
  const worker = new Miniflare(
    convertV4MiniflareOptions({
      workers: [
        {
          name: 'contact-test',
          modules: true,
          script,
          compatibilityDate: config.compatibility_date,
          compatibilityFlags: config.compatibility_flags,
          ratelimits: {
            CONTACT_RATE_LIMITER: { namespace_id: binding.namespace_id, simple: binding.simple },
          },
        },
      ],
    }),
  );
  try {
    const submit = (ip) =>
      worker.dispatchFetch('https://portfolio.example.test/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Origin: 'https://portfolio.example.test',
          'CF-Connecting-IP': ip,
        },
        body: JSON.stringify({
          name: 'Test',
          email: 'visitor@example.test',
          message: 'Local binding simulation',
        }),
      });
    for (let i = 0; i < 3; i++) assert.equal((await submit('192.0.2.10')).status, 200);
    const blocked = await submit('192.0.2.10');
    assert.equal(blocked.status, 429);
    assert.equal(blocked.headers.get('retry-after'), '60');
    assert.equal((await submit('192.0.2.11')).status, 200);
    assert.equal(
      (await (await worker.dispatchFetch('https://portfolio.example.test/calls')).json()).calls,
      4,
    );
  } finally {
    await worker.dispose();
  }
});
