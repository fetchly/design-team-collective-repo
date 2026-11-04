#!/usr/bin/env node
// Before/after screenshots for a PR. Needs: npm i -D playwright && npx playwright install chromium
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const a = Object.fromEntries(process.argv.slice(2).join(' ').split('--').filter(Boolean).map(s => { const [k, ...v] = s.trim().split(' '); return [k, v.join(' ') || true]; }));
if (!a.after) { console.error('usage: capture.mjs --before <url> --after <url> [--paths "/,/x/"] [--widths 1440,390] [--selector css] [--dark] [--out dir] [--wait ms]'); process.exit(1); }
const paths = (a.paths || '/').split(',').map(s => s.trim());
const widths = String(a.widths || '1440,390').split(',').map(Number);
const out = a.out || '.pr-shots'; mkdirSync(out, { recursive: true });
const schemes = a.dark ? ['light', 'dark'] : ['light'];
const sides = [['before', a.before], ['after', a.after]].filter(([, u]) => u && u !== true);
const browser = await chromium.launch();
for (const [side, base] of sides) for (const p of paths) for (const w of widths) for (const scheme of schemes) {
  const page = await browser.newPage({ viewport: { width: w, height: w < 600 ? 844 : 900 }, colorScheme: scheme, reducedMotion: 'reduce' });
  const url = base.replace(/\/$/, '') + p;
  await page.goto(url, { waitUntil: 'networkidle' }).catch(() => page.goto(url));
  await page.waitForTimeout(Number(a.wait || 800));
  const slug = (p.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home');
  const name = `${out}/${side}-${slug}-${w}${scheme === 'dark' ? '-dark' : ''}`;
  if (a.selector && a.selector !== true) { const el = page.locator(a.selector).first(); if (await el.count()) await el.screenshot({ path: `${name}-crop.png` }); }
  await page.screenshot({ path: `${name}.png`, fullPage: true });
  console.log(name + '.png');
  await page.close();
}
await browser.close();
