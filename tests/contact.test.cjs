const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, file) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText,
    file,
  );
const { createContactHandler } = require('../src/lib/contact-server.ts');
const config = {
  CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
  RESEND_API_KEY: 'test-only',
  CONTACT_FROM: 'Portfolio <sender@example.test>',
  CONTACT_TO: 'owner@example.test',
};
const valid = {
  name: ' Visitor ',
  email: 'visitor@example.test',
  message: '<script>alert(1)</script>\nHello',
};
function request(body = valid, headers = {}, method = 'POST') {
  return new Request('https://portfolio.example.test/api/contact', {
    method,
    headers: {
      'cf-connecting-ip': '192.0.2.1',
      origin: 'https://portfolio.example.test',
      'content-type': 'application/json',
      ...headers,
    },
    ...(method === 'POST' ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}),
  });
}
test('valid normalized plain-text delivery with fixed server headers', async () => {
  let calls = 0;
  const handler = createContactHandler(config, async (url, options) => {
    calls++;
    assert.equal(url, 'https://api.resend.com/emails');
    const email = JSON.parse(options.body);
    assert.equal(email.reply_to, valid.email);
    assert.deepEqual(email.to, [config.CONTACT_TO]);
    assert.equal(email.html, undefined);
    assert(email.text.includes('Name: Visitor\n'));
    assert(email.text.includes(valid.message));
    assert(options.signal);
    return Response.json({ id: 'mock' });
  });
  assert.equal((await handler(request())).status, 200);
  assert.equal(calls, 1);
});
test('invalid requests never reach delivery', async () => {
  const handler = createContactHandler(config, () => {
    throw Error('must not send');
  });
  for (const body of [
    {},
    { ...valid, email: 'invalid' },
    { ...valid, name: 'x'.repeat(101) },
    { ...valid, message: 'x'.repeat(5001) },
    { ...valid, name: 'a\r\nBcc: bad' },
    { ...valid, to: 'attacker' },
    { ...valid, honeypot: 'bot' },
    '{',
    null,
    [],
  ])
    assert.equal((await handler(request(body))).status, 400);
  assert.equal((await handler(request('x'.repeat(32769)))).status, 413);
  assert.equal((await handler(request(valid, { origin: 'https://evil.test' }))).status, 403);
  assert.equal((await handler(request(valid, { origin: '' }))).status, 403);
  assert.equal((await handler(request(valid, { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await handler(request(valid, {}, 'GET'))).status, 405);
});
test('configuration, rejection, malformed acceptance and network/timeout fail safely', async () => {
  assert.equal((await createContactHandler({})(request())).status, 503);
  for (const deliver of [
    async () => new Response('private error', { status: 429 }),
    async () => Response.json({}),
    async () => {
      throw new DOMException('private', 'TimeoutError');
    },
    async () => {
      throw Error('network');
    },
  ]) {
    const response = await createContactHandler(config, deliver)(request());
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { ok: false });
  }
  assert.equal(
    (
      await createContactHandler({ ...config, CONTACT_ALLOWED_ORIGIN: 'https://other.test' })(
        request(),
      )
    ).status,
    403,
  );
});

test('three attempts per identity/window; 429 never sends and ignores spoofed forwarding headers', async () => {
  let now = 0,
    sends = 0;
  const counters = new Map();
  const limiter = {
    limit: async ({ key }) => {
      const bucket = `${Math.floor(now / 60000)}:${key}`;
      const count = (counters.get(bucket) || 0) + 1;
      counters.set(bucket, count);
      return { success: count <= 3 };
    },
  };
  const handler = createContactHandler({ ...config, CONTACT_RATE_LIMITER: limiter }, async () => {
    sends++;
    return Response.json({ id: 'mock' });
  });
  for (let i = 0; i < 3; i++) assert.equal((await handler(request())).status, 200);
  const blocked = await handler(
    request(valid, { 'x-forwarded-for': '192.0.2.99', 'x-real-ip': '192.0.2.98' }),
  );
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get('retry-after'), '60');
  assert.deepEqual(await blocked.json(), { ok: false });
  assert.equal(sends, 3);
  assert.equal((await handler(request(valid, { 'cf-connecting-ip': '192.0.2.2' }))).status, 200);
  now = 60000;
  assert.equal((await handler(request())).status, 200);
});
test('missing identity/binding, exceptions and unusable results fail closed', async () => {
  let sends = 0;
  const deliver = async () => {
    sends++;
    return Response.json({ id: 'mock' });
  };
  for (const binding of [
    undefined,
    {
      limit: async () => {
        throw Error('unavailable');
      },
    },
    { limit: async () => ({}) },
  ]) {
    assert.equal(
      (await createContactHandler({ ...config, CONTACT_RATE_LIMITER: binding }, deliver)(request()))
        .status,
      503,
    );
  }
  for (const ip of ['', 'garbage'])
    assert.equal(
      (
        await createContactHandler(
          config,
          deliver,
        )(request(valid, { 'cf-connecting-ip': ip, 'x-forwarded-for': '192.0.2.1' }))
      ).status,
      503,
    );
  assert.equal(sends, 0);
});
test('cheap invalid requests do not consume delivery quota; provider failures do', async () => {
  let counted = 0;
  const handler = createContactHandler(
    {
      ...config,
      CONTACT_RATE_LIMITER: {
        limit: async () => {
          counted++;
          return { success: counted <= 3 };
        },
      },
    },
    async () => new Response(null, { status: 500 }),
  );
  for (const r of [
    request('{'),
    request(valid, { origin: 'https://evil.test' }),
    request({ ...valid, honeypot: 'bot' }),
  ])
    assert((await handler(r)).status < 500);
  assert.equal(counted, 0);
  for (let i = 0; i < 3; i++) assert.equal((await handler(request())).status, 502);
  assert.equal((await handler(request())).status, 429);
});
