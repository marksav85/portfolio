const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const ts = require('typescript');

async function indexingResponse(env, url, suppliedPolicy = 'false') {
  const file = require.resolve('../src/middleware.ts');
  const compiled = new Module(file, module);
  compiled.require = (name) => {
    if (name === 'cloudflare:workers') return { env };
    if (name === 'next/server')
      return {
        NextResponse: {
          next: ({ request }) => ({ headers: new Headers(), forwarded: request.headers }),
        },
      };
    throw new Error(`Unexpected dependency: ${name}`);
  };
  compiled._compile(
    ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText,
    file,
  );
  return compiled.exports.middleware({
    headers: new Headers({ 'x-portfolio-noindex': suppliedPolicy }),
    nextUrl: new URL(url),
  });
}

test('only the configured production origin permits indexing, regardless of supplied policy', async () => {
  const production = {
    DEPLOYMENT_ENV: 'production',
    SITE_URL: 'https://portfolio.example.test',
  };
  for (const lang of ['de', 'en']) {
    const response = await indexingResponse(
      production,
      `https://portfolio.example.test/?lang=${lang}`,
      'true',
    );
    assert.equal(response.headers.get('X-Robots-Tag'), null);
    assert.equal(response.forwarded.get('x-portfolio-noindex'), 'false');
    assert.equal(response.forwarded.get('x-portfolio-locale'), lang);
  }
  for (const [env, url] of [
    [production, 'https://portfolio-production.example.workers.dev/?lang=en'],
    [production, 'https://portfolio.example.test.attacker.test/'],
    [production, 'http://portfolio.example.test/'],
    [{ ...production, DEPLOYMENT_ENV: 'staging' }, production.SITE_URL],
    [{ ...production, DEPLOYMENT_ENV: undefined }, production.SITE_URL],
    [{ ...production, SITE_URL: undefined }, production.SITE_URL],
    [{ ...production, SITE_URL: 'invalid' }, production.SITE_URL],
  ]) {
    const response = await indexingResponse(env, url);
    assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
    assert.equal(response.forwarded.get('x-portfolio-noindex'), 'true');
  }
});
