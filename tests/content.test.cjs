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
const { createStrapi, sectionResult, sortSkills } = require('../src/api/strapi.ts');
test('section failures stay separate from empty/null content', async () => {
  assert.deepEqual(
    await sectionResult(async () => {
      throw Error('offline');
    }),
    { ok: false, error: 'unavailable' },
  );
  assert.deepEqual(await sectionResult(async () => null), { ok: true, data: null });
  const api = createStrapi(async (path) => {
    if (path.includes('header')) throw Error('failed');
    return { data: { locale: 'de', Title: 'Profile' } };
  });
  assert.equal((await sectionResult(() => api.header('de'))).ok, false);
  assert.equal((await sectionResult(() => api.profile('de'))).ok, true);
});
test('localized content rejects wrong locale instead of silently mixing', async () => {
  await assert.rejects(createStrapi(async () => ({ data: { locale: 'en' } })).profile('de'));
  await assert.rejects(createStrapi(async () => ({ data: [{ locale: 'en' }] })).labels('de'));
});
test('shared skills preserve optional icon normalization and known/unknown ordering', async () => {
  let url = '';
  const a = { Column1: 'Z', Column3: 'Other', Column2: null },
    b = { Column1: 'A', Column3: 'Unknown', Column2: [] },
    c = {
      Column1: 'React',
      Column3: 'Frontend',
      Column2: [{ url: '/icon.svg', name: 'icon', alternativeText: null }],
    };
  const rows = await createStrapi(async (path) => {
    url = path;
    return { data: [a, b, c] };
  }).skills();
  assert(!url.includes('locale='));
  assert.equal(rows[1].Column2, null);
  assert.equal(rows[2].Column2.url, '/icon.svg');
  assert.deepEqual(
    sortSkills(rows).map((r) => r.Column1),
    ['React', 'A', 'Z'],
  );
});

const { resolveMedia } = require('../src/api/media.ts');
test('CMS media uses configured origin and refuses unsafe schemes/credentials', () => {
  const image = { name: 'Screenshot', url: '/uploads/screen.webp', alternativeText: null };
  assert.equal(
    resolveMedia(image, 'https://cms.example.test').url,
    'https://cms.example.test/uploads/screen.webp',
  );
  for (const url of ['javascript:alert(1)', 'https://user:pass@example.test/image'])
    assert.equal(resolveMedia({ ...image, url }, 'https://cms.example.test'), null);
});

test('verified live contact contract permits an absent telephone without inventing a destination', async () => {
  const contact = {
    locale: 'de',
    Title: 'Kontakt',
    Subtitle: 'Kontaktbereich',
    Linkedin: 'LinkedIn',
    Telephone: null,
    Email: 'Website',
    ResumeDeveloperText: null,
    ResumeDeveloperLink: null,
    ResumeFullText: null,
    ResumeFullLink: null,
  };
  const api = createStrapi(async () => ({ data: contact }));
  assert.deepEqual(await api.contact('de'), contact);
});

test('normal Strapi client always uses the published collection source', async () => {
  let path;
  const api = createStrapi(async (url) => {
    path = url;
    return { data: [], meta: { pagination: { page: 1, pageCount: 0 } } };
  });
  assert.deepEqual(await api.projects('de'), []);
  assert(path.startsWith('/api/portfolio-projects?'));
  assert(path.includes('status=published'));
  assert(path.includes('locale=de'));
});
