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
const { publicSeoOrigin, sitemapEntries, socialMetadata } = require('../src/lib/seo.ts');
const site = 'https://portfolio.example.test';

test('sitemap contains only the two canonical pages with reciprocal language alternates', () => {
  const entries = sitemapEntries(publicSeoOrigin(site, 'production'));
  assert.deepEqual(
    entries.map((entry) => entry.url),
    [site + '/', site + '/?lang=en'],
  );
  for (const entry of entries) {
    assert.deepEqual(entry.alternates.languages, {
      de: site + '/',
      en: site + '/?lang=en',
      'x-default': site + '/',
    });
    assert.deepEqual(Object.keys(entry).sort(), ['alternates', 'url']);
  }
});

test('staging, platform hostnames and invalid configuration publish no sitemap or social URLs', () => {
  for (const [url, environment] of [
    [site, 'staging'],
    [site, undefined],
    [undefined, 'production'],
    ['invalid', 'production'],
    ['ftp://portfolio.example.test', 'production'],
    ['https://user:password@portfolio.example.test', 'production'],
    ['https://portfolio.example.workers.dev', 'production'],
    ['https://legacy.pages.dev', 'production'],
  ]) {
    const origin = publicSeoOrigin(url, environment);
    assert.equal(origin, undefined);
    assert.deepEqual(sitemapEntries(origin), []);
    assert.deepEqual(socialMetadata('en', origin), {});
  }
});

test('social cards use localized copy, canonical URLs and the existing branded image', () => {
  const origin = publicSeoOrigin(site + '/ignored?query=1', 'production');
  const png = fs.readFileSync(require.resolve('../public/images/social/social-preview.png'));
  for (const [locale, path, ogLocale, alternate] of [
    ['de', '/', 'de_DE', 'en_US'],
    ['en', '/?lang=en', 'en_US', 'de_DE'],
  ]) {
    const { openGraph, twitter } = socialMetadata(locale, origin);
    assert.equal(openGraph.url, site + path);
    assert.equal(openGraph.type, 'website');
    assert.equal(openGraph.locale, ogLocale);
    assert.deepEqual(openGraph.alternateLocale, [alternate]);
    assert.equal(twitter.card, 'summary_large_image');
    assert.equal(twitter.title, openGraph.title);
    assert.equal(twitter.description, openGraph.description);
    assert.deepEqual(twitter.images, openGraph.images);
    assert.equal(openGraph.images[0].url, site + '/images/social/social-preview.png');
    assert.equal(openGraph.images[0].width, png.readUInt32BE(16));
    assert.equal(openGraph.images[0].height, png.readUInt32BE(20));
    assert(openGraph.images[0].alt);
  }
  assert.notEqual(
    socialMetadata('de', origin).openGraph.description,
    socialMetadata('en', origin).openGraph.description,
  );
});
