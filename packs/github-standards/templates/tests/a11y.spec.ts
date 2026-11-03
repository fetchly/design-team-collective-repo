import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = ['/', '/about', '/contact']; // edit per repo

for (const path of pages) {
  test(`a11y ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).analyze();
    expect(results.violations).toEqual([]);
  });

  test(`reduced motion ${path}`, async ({ browser }) => {
    const page = await (await browser.newContext({ reducedMotion: 'reduce' })).newPage();
    await page.goto(path);
    const moving = await page.evaluate(() =>
      document.getAnimations().filter(a => a.playState === 'running' && (a.effect?.getTiming().duration as number) > 200).length);
    expect(moving).toBe(0);
  });
}
