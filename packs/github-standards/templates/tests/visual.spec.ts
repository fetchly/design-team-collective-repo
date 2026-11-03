import { test, expect } from '@playwright/test';

const pages = ['/', '/about']; // edit per repo
const widths = [375, 768, 1440];

for (const path of pages) for (const width of widths) for (const scheme of ['light', 'dark'] as const) {
  test(`visual ${path} ${width} ${scheme}`, async ({ browser }) => {
    const page = await (await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme, reducedMotion: 'reduce' })).newPage();
    await page.goto(path);
    await expect(page).toHaveScreenshot({ fullPage: true, maxDiffPixelRatio: 0.01 });
  });
}
