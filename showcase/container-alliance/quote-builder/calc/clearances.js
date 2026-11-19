// calc/clearances.js
// Container layout math for the quote builder: interior size, add-on
// clearance zones, placement validity and spacing. Pure functions, no three.js,
// so the same code runs in the browser and under `node --test`.
//
// Coordinates match container3d.js (meters):
//   x along the length, -L/2 = rear end, +L/2 = door end
//   y up from the base (ground), roof line at H
//   z across the width, front wall at +W/2, back wall at -W/2
// Add-on shape (what container3d keeps): { type, side: 'front'|'back'|'roof',
//   x (center), y (center, walls), w, h, cut, enabled }

import REF from '../knowledge/neufert-clearances.json' with { type: 'json' };

export { REF };
export const FT = 0.3048;
export const W = 2.44;   // outside width
export const H = 2.59;   // outside height

// Steel shell allowances (engineering assumptions for a standard dry box,
// not Neufert): side wall ~46 mm with corrugation, end frame + doors ~80 mm
// each, floor stack (cross members + 28 mm plywood) ~150 mm, roof ~47 mm.
// These reproduce the common ISO interior of 5.90 x 2.35 x 2.39 m for 20 ft.
export const SHELL = { side: 0.046, end: 0.08, floor: 0.15, roof: 0.047 };
export const CORNER_POST = 0.36;
export const HVAC = { side: 0.3, front: 0.6 }; // typical AC unit service clearances (manufacturer guidance, not Neufert) // keep cuts clear of corner posts / door frame

// Neufert: people walking need >= 10% more than the standing widths (book p. 21).
export const passWidth = () => r('circulation.single_person') * 1.1;

const r = (key) => {
  const v = REF.rules[key];
  if (!v) throw new Error(`neufert-clearances.json: missing rule "${key}"`);
  return v.value_m;
};

// ---------- interior ----------
export function containerSize(lengthFt) {
  const ft = Math.min(53, Math.max(10, Number(lengthFt) || 20));
  const L = ft * FT;
  const inner = {
    length: L - 2 * SHELL.end,
    width: W - 2 * SHELL.side,
    height: H - SHELL.floor - SHELL.roof,
  };
  return {
    lengthFt: ft,
    outside: { length: L, width: W, height: H },
    inside: inner,
    floorArea: inner.length * inner.width,           // m²
    volume: inner.length * inner.width * inner.height, // m³
    // what is left after a central aisle along the length
    furnishableWidth: Math.max(0, inner.width - passWidth()),
    // 16-24 m³ of room per adult with natural air change, assuming a >= 2.5 m ceiling (book p. 24).
    // A container is lower, so take the conservative 24 m³ end.
    adultsByAirVolume: Math.floor((inner.length * inner.width * inner.height) / 24),
    // 1/8 of floor area gives about 45 lux: coarse work only; fine work needs ~0.42 (book p. 103)
    daylightWindowAreaCoarse: (inner.length * inner.width) / 8,
  };
}

// ---------- clearance zones per item type ----------
// surface: steel to keep around a wall/roof opening (edge = to base/roof line,
//   spacing = to the next opening; corner = to the end frames)
// inside / outside: depth of the zone in front of the item, w = zone width
// Values pull from the Neufert reference where it applies; structural steel
// margins are flagged `basis: 'structural'`.
export function clearanceFor(a) {
  const steelGap = 0.2;   // structural: room for two framing members between framed cuts
  const steelEdge = 0.15; // structural: keep top/bottom rails intact
  const base = { corner: CORNER_POST, edge: a.cut ? steelEdge : 0.05, spacing: a.cut ? steelGap : 0.1, basis: 'structural' };
  switch (a.type) {
    case 'door':
      return { ...base, toFloor: true,
        inside: { depth: a.w, w: a.w, kind: 'swing arc', basis: 'door.swing_equals_leaf' },
        outside: { depth: r('stair.landing_depth'), w: a.w + 0.3, kind: 'landing' },
        minWidth: r('door.clear_opening_wood_frame') };
    case 'gate':
      return { ...base, toFloor: true,
        inside: { depth: passWidth(), w: a.w, kind: 'approach' },
        outside: { depth: r('stair.landing_depth'), w: a.w, kind: 'approach' } };
    case 'window':
      return { ...base,
        inside: { depth: r('circulation.single_person'), w: a.w, kind: 'standing space at the window' },
        sillMin: r('window.sill_height_low_view') };
    case 'hvac':
      // manufacturer-typical split/window AC service space (not Neufert)
      return { ...base, spacing: Math.max(base.spacing, HVAC.side),
        outside: { depth: HVAC.front, w: a.w + 2 * HVAC.side, kind: 'service + airflow', basis: 'manufacturer' } };
    case 'vent':
      return { ...base, inside: { depth: 0.1, w: a.w, kind: 'airflow' } };
    case 'skylight':
      return { ...base, corner: Math.max(CORNER_POST, 0.3), spacing: Math.max(base.spacing, 0.4) };
    case 'light':
      // interior surface fixture: never blocks wall cuts or exterior units
      return { ...base, blocks: false, toFloor: true, spacing: 0.05, edge: 0, inside: { depth: 0.1, w: a.w, kind: 'fixture' } };
    default:
      return base;
  }
}

// ---------- geometry helpers ----------
const span = (a) => [a.x - a.w / 2, a.x + a.w / 2];
const vspan = (a) => (a.side === 'roof' ? [-a.h / 2, a.h / 2] : [a.y - a.h / 2, a.y + a.h / 2]);
const gap1D = ([a0, a1], [b0, b1]) => Math.max(b0 - a1, a0 - b1); // < 0 = overlap

/** Minimum center-to-edge clearance between two add-ons on the same surface. */
export function spacingBetween(a, b) {
  return Math.max(clearanceFor(a).spacing, clearanceFor(b).spacing);
}

/** Allowed x range for an add-on's center on a container of length L. */
export function xRange(a, L) {
  const c = clearanceFor(a).corner;
  return [-L / 2 + c + a.w / 2, L / 2 - c - a.w / 2];
}

/** Do two add-ons on the same surface share height (so they block each other along x)? */
export function sameBand(a, b, extra = 0) {
  if (a.side === 'roof') return true;
  return gap1D(vspan(a), vspan(b)) < extra;
}

// ---------- validation ----------
// Returns [{ level: 'error'|'warn', ids:[...], rule, message, value, limit }].
export function validateLayout(addons, lengthFt) {
  const size = containerSize(lengthFt);
  const L = size.outside.length;
  const list = Object.entries(addons).filter(([, a]) => a.enabled !== false).map(([id, a]) => ({ id, ...a }));
  const out = [];
  const push = (level, ids, rule, message, value, limit) => out.push({ level, ids, rule, message, value, limit });

  for (const a of list) {
    const c = clearanceFor(a);
    const [lo, hi] = xRange(a, L);
    if (a.x < lo - 1e-6 || a.x > hi + 1e-6) {
      const d = Math.min(a.x - a.w / 2 + L / 2, L / 2 - a.x - a.w / 2);
      push('error', [a.id], 'corner', `${a.id} is ${mm(d)} from an end frame (needs ${mm(c.corner)})`, d, c.corner);
    }
    if (a.side !== 'roof') {
      const [y0, y1] = vspan(a);
      if (!c.toFloor && y0 < c.edge - 1e-6) push('error', [a.id], 'edge', `${a.id} bottom edge ${mm(y0)} above base (needs ${mm(c.edge)})`, y0, c.edge);
      if (H - y1 < c.edge - 1e-6) push('error', [a.id], 'edge', `${a.id} top edge ${mm(H - y1)} below roof line (needs ${mm(c.edge)})`, H - y1, c.edge);
      if (c.sillMin != null && y0 - SHELL.floor < c.sillMin - 1e-6)
        push('warn', [a.id], 'sill', `${a.id} sill ${mm(y0 - SHELL.floor)} above the floor, below the ${mm(c.sillMin)} low-view sill Neufert shows: check fall guarding`, y0 - SHELL.floor, c.sillMin);
    } else if ((W - a.h) / 2 < c.edge - 1e-6) {
      push('error', [a.id], 'edge', `${a.id} too close to the roof's long edge`, (W - a.h) / 2, c.edge);
    }
    if (c.minWidth != null && a.w < c.minWidth - 1e-6)
      push('warn', [a.id], 'width', `${a.id} clear width ${mm(a.w)}, narrower than a standard ${mm(c.minWidth)} Neufert door`, a.w, c.minWidth);
  }

  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const a = list[i], b = list[j];
      const ca = clearanceFor(a), cb = clearanceFor(b);
      if (ca.blocks === false || cb.blocks === false) continue;
      const dx = gap1D(span(a), span(b));
      // same surface: steel between openings
      if (a.side === b.side) {
        const need = spacingBetween(a, b);
        if (sameBand(a, b, need) && dx < need - 1e-6)
          push('error', [a.id, b.id], dx < 0 ? 'overlap' : 'spacing',
            dx < 0 ? `${a.id} overlaps ${b.id}` : `${a.id} and ${b.id} are ${mm(dx)} apart (needs ${mm(need)})`, dx, need);
      }
      // opposite long walls: interior zones meeting across the width
      if ((a.side === 'front' && b.side === 'back') || (a.side === 'back' && b.side === 'front')) {
        const za = ca.inside, zb = cb.inside;
        if (za && zb && dx < 0) {
          const left = size.inside.width - za.depth - zb.depth;
          const need = passWidth();
          if (left < need - 1e-6)
            push('warn', [a.id, b.id], 'interior', `${a.id} ${za.kind} and ${b.id} ${zb.kind} leave ${mm(Math.max(0, left))} to pass (Neufert: ${mm(need)})`, left, need);
        }
      }
      // same wall, outside zones overlapping (e.g. AC service space in front of a door)
      if (a.side === b.side && a.side !== 'roof' && ca.outside && cb.outside) {
        const ga = [a.x - ca.outside.w / 2, a.x + ca.outside.w / 2], gb = [b.x - cb.outside.w / 2, b.x + cb.outside.w / 2];
        if (gap1D(ga, gb) < 0 && !(a.type === b.type))
          push('warn', [a.id, b.id], 'exterior', `${a.id} ${ca.outside.kind} overlaps ${b.id} ${cb.outside.kind} outside`, gap1D(ga, gb), 0);
      }
    }
  }
  return out;
}

/** Free x intervals for a new item of width w on a surface (for spacing UI). */
export function freeIntervals(addons, side, w, L, probe = { type: 'window', cut: true, y: 1.45, h: 1.2 }) {
  const a = { ...probe, side, w };
  let [lo, hi] = xRange(a, L);
  const blocks = Object.values(addons)
    .filter((b) => b.enabled !== false && b.side === side && clearanceFor(b).blocks !== false && sameBand(a, b, spacingBetween(a, b)))
    .map((b) => { const s = spacingBetween(a, b); return [b.x - b.w / 2 - s - w / 2, b.x + b.w / 2 + s + w / 2]; })
    .sort((p, q) => p[0] - q[0]);
  const free = [];
  let cur = lo;
  for (const [b0, b1] of blocks) {
    if (b0 > cur) free.push([cur, Math.min(b0, hi)]);
    cur = Math.max(cur, b1);
    if (cur >= hi) break;
  }
  if (cur < hi) free.push([cur, hi]);
  return free.filter(([p, q]) => q >= p);
}

const mm = (m) => `${Math.round(m * 1000)} mm`;
