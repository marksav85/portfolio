// Explicit opt-in, GET-only verification. Never sends contact enquiries.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const base = process.env.STAGING_TEST_URL;
test('staging routing, localized metadata and noindex headers', async () => {
  assert(base, 'Set STAGING_TEST_URL to the staging preview');
  const canonical = process.env.STAGING_CANONICAL_ORIGIN || new URL(base).origin;
  for (const locale of ['de', 'en']) {
    const path = locale === 'en' ? '/?lang=en' : '/';
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200);
    assert.match(response.headers.get('x-robots-tag') || '', /noindex/);
    const html = await response.text();
    assert(html.includes(`lang="${locale}"`));
    assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
    const canonicalHref = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(new URL(canonicalHref).href, new URL(path, canonical).href);
    assert(html.includes(`hrefLang="de"`) || html.includes('hreflang="de"'));
    assert(html.includes(`hrefLang="en"`) || html.includes('hreflang="en"'));
    assert(html.includes('x-default'));
  }
  const missing = await fetch(new URL('/staging-verification-missing-route', base));
  assert.equal(missing.status, 404);
  assert.match(missing.headers.get('x-robots-tag') || '', /noindex/);
});
