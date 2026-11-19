// node --test showcase/container-alliance/quote-builder/calc/
import test from 'node:test';
import assert from 'node:assert/strict';
import { containerSize, validateLayout, freeIntervals, spacingBetween, clearanceFor, FT, REF } from './clearances.js';

const win = (x, extra = {}) => ({ type: 'window', side: 'front', x, y: 1.45, w: 0.9, h: 1.2, cut: true, ...extra });

test('20 ft interior matches the common ISO figures', () => {
  const s = containerSize(20);
  assert.ok(Math.abs(s.inside.length - 5.936) < 0.05);
  assert.ok(Math.abs(s.inside.width - 2.348) < 0.01);
  assert.ok(Math.abs(s.inside.height - 2.393) < 0.01);
  assert.ok(s.floorArea > 13.5 && s.floorArea < 14.5);
  assert.ok(s.volume > 32 && s.volume < 35);
});

test('40 ft and custom lengths scale, custom clamps to 10..53 ft', () => {
  assert.ok(containerSize(40).floorArea > 2 * containerSize(20).floorArea);
  assert.equal(containerSize(5).lengthFt, 10);
  assert.equal(containerSize(80).lengthFt, 53);
});

test('clean layout passes', () => {
  assert.deepEqual(validateLayout({ a: win(-1), b: win(1) }, 20).filter((v) => v.level === 'error'), []);
});

test('overlap and too-close openings are errors', () => {
  const v = validateLayout({ a: win(0), b: win(0.5) }, 20);
  assert.ok(v.some((x) => x.rule === 'overlap'));
  const need = spacingBetween(win(0), win(1));
  const v2 = validateLayout({ a: win(0), b: win(0.9 + need / 2) }, 20);
  assert.ok(v2.some((x) => x.rule === 'spacing'));
});

test('openings at different heights do not block each other', () => {
  const vent = { type: 'vent', side: 'front', x: 0, y: 2.28, w: 0.46, h: 0.32, cut: true };
  const low = win(0, { y: 0.8, h: 0.6 });
  assert.equal(validateLayout({ vent, low }, 20).filter((v) => v.rule === 'overlap').length, 0);
});

test('corner and edge violations', () => {
  const L = 20 * FT;
  const v = validateLayout({ a: win(L / 2 - 0.5) }, 20);
  assert.ok(v.some((x) => x.rule === 'corner'));
  const v2 = validateLayout({ a: win(0, { y: 2.4 }) }, 20);
  assert.ok(v2.some((x) => x.rule === 'edge'));
});

test('interior zones: two facing door swings block the aisle, door + window does not', () => {
  const door = { type: 'door', side: 'front', x: 0, y: 1.12, w: 0.92, h: 2.08, cut: true };
  const v = validateLayout({ door, door2: { ...door, side: 'back' } }, 20);
  assert.ok(v.some((x) => x.rule === 'interior'));
  const v2 = validateLayout({ door, w2: win(0, { side: 'back' }) }, 20);
  assert.ok(!v2.some((x) => x.rule === 'interior'));
});

test('doors and roll-up openings may reach the floor', () => {
  const door = { type: 'door', side: 'front', x: 0, y: 1.12, w: 0.92, h: 2.08, cut: true };
  assert.ok(!validateLayout({ door }, 20).some((x) => x.rule === 'edge'));
});

test('free intervals shrink around existing openings by the spacing rule', () => {
  const L = 20 * FT;
  const free = freeIntervals({ a: win(0) }, 'front', 0.9, L);
  assert.equal(free.length, 2);
  const s = spacingBetween(win(0), win(0));
  assert.ok(Math.abs(free[0][1] - (-0.45 - s - 0.45)) < 1e-9);
});

test('every clearance rule resolves to a number from the reference data', () => {
  for (const type of ['door', 'gate', 'window', 'hvac', 'vent', 'skylight', 'light']) {
    const c = clearanceFor({ type, w: 1, h: 1, cut: true });
    for (const k of ['corner', 'edge', 'spacing']) assert.equal(typeof c[k], 'number', `${type}.${k}`);
  }
  assert.ok(Object.keys(REF.rules).length > 0);
});

test('interior light strip does not block wall cuts', () => {
  const light = { type: 'light', side: 'front', x: 0, y: 1.2, w: 0.3, h: 2.4, cut: false };
  assert.ok(!validateLayout({ light, a: win(0) }, 20).some((x) => x.level === 'error'));
});
