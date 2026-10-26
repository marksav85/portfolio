const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const fs = require('node:fs');
const { default: AxeBuilder } = require('@axe-core/playwright');
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:4173';
test('Workers fixture homepage and gallery: responsive EN/DE, keyboard, reveal, locale anchors and zero/one/many media', async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const errors = [];
  try {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    await context.route('**/*', (route) =>
      new URL(route.request().url()).origin === new URL(base).origin
        ? route.continue()
        : route.abort(),
    );
    const page = await context.newPage();
    page.on('pageerror', (e) => errors.push(e.message));
    for (const locale of ['de', 'en'])
      for (const width of [390, 768, 1440]) {
        await page.setViewportSize({ width, height: 950 });
        await page.goto(base + (locale === 'en' ? '/?lang=en' : '/'));
        await page.waitForSelector('.project-card');
        assert.equal(await page.locator('html').getAttribute('lang'), locale);
        assert.equal(await page.locator('.project-card').count(), 6);
        assert.equal(
          await page.locator('body').evaluate((el) => el.scrollWidth <= innerWidth),
          true,
          `Page overflow at ${width}/${locale}`,
        );
        assert.equal(await page.locator('button[type=submit]').isDisabled(), false);
        await page.locator('.reveal button').click();
        assert.equal(await page.locator('.project-card').count(), 8);
        await page.locator('.disclosure').click();
        assert.equal(await page.locator('#skills-content').isVisible(), false);
        await page.locator('.disclosure').click();
        const card = page.locator('.project-card').first();
        const before = await card.boundingBox();
        const trigger = card.locator('.details-button');
        await trigger.click();
        const dialog = page.getByRole('dialog');
        await dialog.waitFor();
        assert.equal(
          await dialog.locator('.image-counter').innerText(),
          locale === 'en' ? 'Image 1 of 3' : 'Bild 1 von 3',
        );
        await page.keyboard.press('ArrowRight');
        assert((await dialog.locator('.image-counter').innerText()).includes('2'));
        assert(
          (await dialog.locator('.original-link').getAttribute('href')).includes('image-2.svg'),
        );
        await dialog.locator('.gallery-thumbnails button').nth(2).click();
        assert((await dialog.locator('.image-counter').innerText()).includes('3'));
        assert.equal(
          await dialog.evaluate((el) => el.scrollWidth <= el.clientWidth),
          true,
          `Dialog overflow at ${width}`,
        );
        for (let i = 0; i < 12; i++) {
          await page.keyboard.press('Tab');
          assert.equal(
            await dialog.evaluate((el) => el.contains(document.activeElement)),
            true,
            'Dialog focus escaped',
          );
        }
        await page.keyboard.press('Escape');
        await dialog.waitFor({ state: 'detached' });
        await page.waitForFunction(() =>
          document.activeElement?.classList.contains('details-button'),
        );
        assert.equal(
          await trigger.evaluate((el) => el === document.activeElement),
          true,
          'Focus not restored',
        );
        assert.equal(
          (await card.boundingBox()).height,
          before.height,
          'Opening details changed card height',
        );
        await page.locator('.project-card').nth(6).locator('.details-button').click();
        await page.getByRole('dialog').waitFor();
        assert.equal(await page.locator('.active-image').count(), 0);
        await page.keyboard.press('Escape');
        await page.locator('.project-card').nth(7).locator('.details-button').click();
        await page.getByRole('dialog').waitFor();
        assert.equal(await page.locator('.gallery-arrow').count(), 0);
        assert((await page.locator('.image-counter').innerText()).includes('1'));
        await page.keyboard.press('Escape');
        if (width === 390) {
          await page.locator('.menu-toggle').click();
          assert.equal(await page.locator('#mobile-nav').isVisible(), true);
          await page.locator('#mobile-nav a[href="#skills"]').click();
          assert.equal(await page.locator('#mobile-nav').count(), 0);
        }
      }
    await page.goto(base + '/#work');
    await page.getByRole('link', { name: 'EN', exact: true }).click();
    await page.waitForURL('**/?lang=en#work');
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    await page.goto(base + '/?lang=invalid');
    assert.equal(await page.locator('html').getAttribute('lang'), 'de');
    fs.mkdirSync('docs/2-development--output/visual-validation', { recursive: true });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(base + '/?lang=en');
    await page.locator('.portrait img').scrollIntoViewIfNeeded();
    await page.locator('.portrait img').evaluate((img) => img.decode());
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: 'docs/2-development--output/visual-validation/homepage-desktop.png',
      fullPage: true,
    });
    await page.locator('.details-button').first().click();
    await page.getByRole('dialog').waitFor();
    await page.screenshot({
      path: 'docs/2-development--output/visual-validation/modal-desktop.png',
    });
    await page.keyboard.press('Escape');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + '/');
    await page.screenshot({
      path: 'docs/2-development--output/visual-validation/homepage-mobile.png',
      fullPage: true,
    });
    await page.locator('.details-button').first().click();
    await page.screenshot({
      path: 'docs/2-development--output/visual-validation/modal-mobile.png',
    });
    await page.keyboard.press('Escape');
    const homepageAudit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    assert.deepEqual(
      homepageAudit.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
      [],
    );
    await page.locator('.details-button').first().click();
    await page.getByRole('dialog').waitFor();
    const modalAudit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    assert.deepEqual(
      modalAudit.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
      [],
    );
    fs.writeFileSync(
      'docs/2-development--output/visual-validation/accessibility.json',
      JSON.stringify(
        {
          homepageViolations: homepageAudit.violations,
          modalViolations: modalAudit.violations,
          automatedOnly: true,
        },
        null,
        2,
      ),
    );
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
});
