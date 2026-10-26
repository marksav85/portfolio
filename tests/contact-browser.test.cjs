const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:4173';
test('EN/DE mobile/desktop contact validation, retry, pending, duplicate protection and success', async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    for (const locale of ['de', 'en'])
      for (const width of [390, 1440]) {
        const context = await browser.newContext({ viewport: { width, height: 950 } });
        const page = await context.newPage();
        let calls = 0;
        let release;
        await page.route('**/api/contact', async (route) => {
          calls++;
          if (calls === 1) return route.fulfill({ status: 429, json: { ok: false } });
          await new Promise((resolve) => {
            release = resolve;
          });
          await route.fulfill({ json: { ok: true } });
        });
        await page.goto(base + (locale === 'en' ? '/?lang=en' : '/'));
        const form = page.locator('.contact-form');
        const button = form.locator('button');
        await button.click();
        assert.equal(await form.locator('[aria-invalid=true]').count(), 3);
        assert.equal(
          await page.locator('#contact-name').evaluate((el) => el === document.activeElement),
          true,
        );
        await page.locator('#contact-name').fill('Test Visitor');
        await page.locator('#contact-email').fill('bad');
        await page.locator('#contact-message').fill('Test message');
        await button.click();
        assert.equal(calls, 0);
        await page.locator('#contact-email').fill('visitor@example.test');
        await button.click();
        await page.waitForFunction(
          () =>
            document
              .querySelector('.contact-form [role=status]')
              .textContent.includes('60 seconds') ||
            document
              .querySelector('.contact-form [role=status]')
              .textContent.includes('60 Sekunden'),
        );
        assert.equal(await page.locator('#contact-message').inputValue(), 'Test message');
        await button.click();
        await page.waitForFunction(
          () => document.querySelector('.contact-form').getAttribute('aria-busy') === 'true',
        );
        assert(await button.isDisabled());
        await form.evaluate((el) => {
          el.requestSubmit();
          el.requestSubmit();
        });
        assert.equal(calls, 2);
        release();
        await page.waitForFunction(() => document.querySelector('#contact-message').value === '');
        assert(
          (await form.locator('[role=status]').innerText()).includes(
            locale === 'en' ? 'accepted' : 'angenommen',
          ),
        );
        assert.equal(
          await page.locator('body').evaluate((el) => el.scrollWidth <= innerWidth),
          true,
        );
        assert.deepEqual(
          (await new AxeBuilder({ page }).include('.contact-form').analyze()).violations,
          [],
        );
        await context.close();
      }
  } finally {
    await browser.close();
  }
});
