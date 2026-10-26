// Explicit opt-in integration check. Never part of deterministic npm test.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
require.extensions['.ts'] = (module, file) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(file, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText,
    file,
  );
const { createStrapi, sortSkills } = require('../src/api/strapi.ts');
const { groupProjects, projectLinkUrls } = require('../src/api/projects.ts');
const { projectPresentation, projectLinks } = require('../src/config/projects.ts');

test('explicit read-only real Strapi and local Workers integration in EN/DE', async () => {
  assert(
    process.env.PORTFOLIO_LIVE_TEST_URL,
    'Set PORTFOLIO_LIVE_TEST_URL to an existing local preview to authorize this read-only integration test',
  );
  process.loadEnvFile('.env.local');
  assert.equal(process.env.PORTFOLIO_FIXTURES, 'false');
  const origin = new URL(process.env.STRAPI_URL);
  assert(!origin.username && !origin.password);
  const request = async (path) => {
    assert(!path.includes('reference'), 'References must not be requested');
    const r = await fetch(new URL(path, origin), {
      headers: process.env.STRAPI_API_TOKEN
        ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
        : {},
    });
    assert.equal(r.status, 200, 'Required REST request failed');
    return r.json();
  };
  const api = createStrapi(request);
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const summary = {
    locales: {},
    mediaRequestsFailed: 0,
    pageErrors: [],
    apiRequestsFromBrowser: 0,
    axeViolations: 0,
  };
  const output = 'docs/2-development--output/strapi-integration-validation';
  fs.mkdirSync(output, { recursive: true });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.on('pageerror', (e) => summary.pageErrors.push(e.name));
    page.on('request', (r) => {
      const u = new URL(r.url());
      if (u.origin === origin.origin && u.pathname.startsWith('/api/'))
        summary.apiRequestsFromBrowser++;
    });
    page.on('response', (r) => {
      if (r.request().resourceType() === 'image' && r.status() >= 400)
        summary.mediaRequestsFailed++;
    });
    for (const locale of ['de', 'en']) {
      const [header, profile, work, labels, contact, projects, skills] = await Promise.all([
        api.header(locale),
        api.profile(locale),
        api.work(locale),
        api.labels(locale),
        api.contact(locale),
        api.projects(locale),
        api.skills(),
      ]);
      for (const record of [header, profile, work, labels, contact])
        assert.equal(record.locale, locale);
      assert(Array.isArray(header.Text));
      assert.equal(typeof profile.Text, 'string');
      assert.equal(contact.Telephone, null);
      assert.equal(projects.length, 12);
      assert.equal(new Set(projects.map((p) => p.documentId)).size, projects.length);
      assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
      for (const slug of projectPresentation.preferredOrder)
        assert(
          projects.some((p) => p.slug === slug),
          'Configured slug missing',
        );
      const groups = groupProjects(projects, projectPresentation);
      // Force real pagination instead of assuming one page is sufficient.
      let pageNumber = 1,
        pageCount = 1;
      const paged = [];
      do {
        const data = await request(
          `/api/portfolio-projects?locale=${locale}&status=published&pagination[pageSize]=5&pagination[page]=${pageNumber}`,
        );
        assert.equal(data.meta.pagination.page, pageNumber);
        pageCount = data.meta.pagination.pageCount;
        paged.push(...data.data);
        pageNumber++;
      } while (pageNumber <= pageCount);
      assert.equal(paged.length, projects.length);
      assert.equal(new Set(paged.map((row) => row.documentId)).size, projects.length);
      assert(paged.every((row) => row.publishedAt && row.locale === locale));
      const sorted = sortSkills(skills);
      const href = process.env.PORTFOLIO_LIVE_TEST_URL + (locale === 'en' ? '/?lang=en' : '/');
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(href);
      await page.locator('.project-card').first().waitFor();
      assert.equal(await page.locator('html').getAttribute('lang'), locale);
      assert.equal(await page.locator('.fixture-banner').count(), 0);
      assert.equal(await page.locator('.notice.error').count(), 0);
      assert.equal(await page.locator('.project-card').count(), groups.primary.length);
      assert.deepEqual(
        await page.locator('.project-card h3').allTextContents(),
        groups.primary.map((p) => p.Title),
      );
      assert.equal(await page.locator('.biography').innerText(), profile.Text);
      assert.deepEqual(
        await page
          .locator('.skill-group li')
          .evaluateAll((nodes) => nodes.map((n) => n.innerText.trim())),
        sorted.map((row) => row.Column1),
      );
      assert.equal(
        await page.locator('.skill-group img').count(),
        skills.filter((row) => row.Column2).length,
      );
      if (groups.additional.length) await page.locator('.reveal button').click();
      assert.equal(await page.locator('.project-card').count(), projects.length);
      for (let index = 0; index < projects.length; index++) {
        const project = [...groups.primary, ...groups.additional][index];
        const trigger = page.locator('.project-card').nth(index).locator('.details-button');
        await trigger.click();
        const dialog = page.getByRole('dialog');
        await dialog.waitFor();
        assert.equal(await dialog.locator('.modal-title').innerText(), project.Title);
        assert.equal(
          await dialog.locator('.gallery-thumbnails button').count(),
          project.Images.length,
        );
        if (project.Images.length > 1) {
          await page.keyboard.press('ArrowRight');
          assert.equal(
            await dialog.locator('.original-link').getAttribute('href'),
            new URL(project.Images[1].url, origin).href,
          );
        }
        const urls = projectLinkUrls(project, projectLinks);
        assert.equal(
          await dialog.locator('.project-actions a').count(),
          Number(!!urls.homepage) + Number(!!urls.repository),
        );
        await page.keyboard.press('Escape');
        await dialog.waitFor({ state: 'detached' });
        await page.waitForFunction(() =>
          document.activeElement?.classList.contains('details-button'),
        );
      }
      for (const family of [
        'Inter Variable',
        'Plus Jakarta Sans Variable',
        'JetBrains Mono Variable',
      ]) {
        assert(
          await page.evaluate(async (name) => {
            const faces = await document.fonts.load(`16px "${name}"`);
            return faces.length > 0 && faces.every((face) => face.status === 'loaded');
          }, family),
          `Font failed to load: ${family}`,
        );
      }
      await page.locator('.portrait img').scrollIntoViewIfNeeded();
      await page.locator('.portrait img').evaluate((img) => img.decode());
      for (const img of await page.locator('main img').all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate((el) => el.decode());
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: `${output}/homepage-${locale}-desktop.png`, fullPage: true });
      await page.locator('.details-button').first().click();
      await page.getByRole('dialog').waitFor();
      await page.screenshot({ path: `${output}/modal-${locale}-desktop.png` });
      await page.keyboard.press('Escape');
      for (const width of [390, 768]) {
        await page.setViewportSize({ width, height: 844 });
        assert(await page.locator('body').evaluate((el) => el.scrollWidth <= innerWidth));
        await page.locator('.details-button').first().click();
        const dialog = page.getByRole('dialog');
        await dialog.waitFor();
        assert(await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth));
        await page.keyboard.press('Escape');
      }
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: `${output}/homepage-${locale}-mobile.png`, fullPage: true });
      const audit = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      summary.axeViolations += audit.violations.length;
      assert.deepEqual(
        audit.violations.map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
        [],
      );
      summary.locales[locale] = {
        projects: projects.length,
        skills: skills.length,
        screenshotSlots: projects.reduce((n, p) => n + p.Images.length, 0),
        paginationPages: pageCount,
        optionalProjectActions: projects.reduce((n, p) => {
          const u = projectLinkUrls(p, projectLinks);
          return n + Number(!!u.homepage) + Number(!!u.repository);
        }, 0),
      };
    }
    await page.goto(process.env.PORTFOLIO_LIVE_TEST_URL + '/#work');
    await page.getByRole('link', { name: 'EN', exact: true }).click();
    await page.waitForURL('**/?lang=en#work');
    await page.locator('.project-card').first().waitFor();
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    assert.deepEqual(summary.pageErrors, []);
    assert.equal(summary.mediaRequestsFailed, 0);
    assert.equal(summary.apiRequestsFromBrowser, 0);
    fs.writeFileSync(`${output}/summary.json`, JSON.stringify(summary, null, 2) + '\n');
    console.log(
      'Verified genuine sections, projects, media, pagination, skills and interactions in both locales.',
    );
  } finally {
    await browser.close();
  }
});
