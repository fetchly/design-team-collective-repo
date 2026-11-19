// blueprint.js
// Placement measurements and a 2D orthographic blueprint for the quote builder.
//
// Every add-on is measured on the container's OUTSIDE surface, from the
// opening (or mount) edges:
//   walls: rear end face -> near edge, near edge -> door end face,
//          base (ground) -> bottom edge, top edge -> roof line, width x height
//   roof:  rear end -> near edge, near edge -> door end,
//          each long side edge -> opening, length x depth
// Body section matches container3d.js: 2.44 m wide, 2.59 m tall.

export const W = 2.44;
export const H = 2.59;

const NAMES = {
  window: 'Window', door: 'Personnel door', gate: 'Roll-up opening', light: 'Light strip',
  hvac: 'AC unit', vent: 'Vent', skylight: 'Skylight',
};
const SIDES = { front: 'Front wall', back: 'Back wall', roof: 'Roof' };

// ---------- units ----------
export function fmt(m, unit) {
  if (unit === 'mm') return `${Math.round(m * 1000).toLocaleString('en-US')} mm`;
  const eighths = Math.round((m / 0.0254) * 8);
  const ft = Math.floor(eighths / 96);
  const rem = eighths - ft * 96;
  const inch = Math.floor(rem / 8);
  const frac = rem % 8;
  const f = frac ? ` ${frac / gcd(frac, 8)}/${8 / gcd(frac, 8)}` : '';
  return ft ? `${ft}′ ${inch}${f}″` : `${inch}${f}″`;
}
const gcd = (a, b) => (b ? gcd(b, a % b) : a);

// ---------- measurements ----------
// addons: viewer.getAddons() output (x is the world center, -L/2 = rear end).
export function measure(addons, L) {
  const rows = [];
  let n = 0;
  for (const [id, a] of Object.entries(addons)) {
    if (!a.enabled) continue;
    n++;
    const fromRear = a.x - a.w / 2 + L / 2;
    const r = {
      id, n, type: a.type, name: NAMES[a.type] || a.type, side: a.side, sideName: SIDES[a.side],
      cut: a.cut, w: a.w, h: a.h, fromRear, fromDoor: L - fromRear - a.w,
      centerFromRear: fromRear + a.w / 2,
    };
    if (a.side === 'roof') {
      r.fromFrontEdge = r.fromBackEdge = (W - a.h) / 2;
    } else {
      r.fromBase = a.y - a.h / 2;
      r.fromRoof = H - (a.y + a.h / 2);
      r.centerFromBase = a.y;
    }
    rows.push(r);
  }
  return rows;
}

export function tableHTML(rows, unit) {
  if (!rows.length) return '<p class="spec-empty">Turn on a modification to see its placement.</p>';
  const u = (m) => fmt(m, unit);
  return `<table class="spec"><thead><tr><th>#</th><th>Add-on</th><th>Size (W × H)</th><th>From rear end</th><th>From door end</th><th>From base / side</th><th>To roof / side</th></tr></thead><tbody>${rows.map((r) => `
    <tr><td><span class="tag">${r.n}</span></td>
    <td><b>${r.name}</b><small>${r.sideName} · ${r.cut ? 'cut opening' : 'surface mount'}</small></td>
    <td>${u(r.w)} × ${u(r.h)}</td>
    <td>${u(r.fromRear)}</td><td>${u(r.fromDoor)}</td>
    <td>${r.side === 'roof' ? u(r.fromFrontEdge) + '<small>front edge</small>' : u(r.fromBase) + '<small>base to bottom edge</small>'}</td>
    <td>${r.side === 'roof' ? u(r.fromBackEdge) + '<small>back edge</small>' : u(r.fromRoof) + '<small>top edge to roof</small>'}</td></tr>`).join('')}
  </tbody></table>`;
}

// ---------- 2D drawing (SVG, units = mm) ----------
export function blueprintSVG(rows, L, unit) {
  const mm = (m) => m * 1000;
  const Lm = mm(L), Wm = mm(W), Hm = mm(H);
  const fs = Math.max(95, Lm / 62);         // text size
  const sw = fs / 11;                        // stroke
  const rowGap = fs * 2.1;                   // spacing between dimension rows
  const pad = fs * 6;
  const u = (m) => fmt(m / 1000, unit);
  let out = '';
  let y0 = pad;

  const line = (x1, y1, x2, y2, cls = 'dim') => `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  const text = (x, y, s, anchor = 'middle', cls = 'dt', rot = 0) =>
    `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''}>${s}</text>`;
  const tick = (x, y) => line(x - fs * 0.35, y + fs * 0.35, x + fs * 0.35, y - fs * 0.35, 'tick');
  // horizontal dimension at height y, extension lines from yRef
  function dimH(x1, x2, y, yRef, label) {
    if (Math.abs(x2 - x1) < 1) return '';
    return line(x1, yRef, x1, y + fs * 0.4, 'ext') + line(x2, yRef, x2, y + fs * 0.4, 'ext') +
      line(x1, y, x2, y) + tick(x1, y) + tick(x2, y) + text((x1 + x2) / 2, y - fs * 0.35, label);
  }
  function dimV(y1, y2, x, xRef, label) {
    if (Math.abs(y2 - y1) < 1) return '';
    const dir = Math.sign(x - xRef) || 1;
    return line(xRef, y1, x + dir * fs * 0.4, y1, 'ext') + line(xRef, y2, x + dir * fs * 0.4, y2, 'ext') +
      line(x, y1, x, y2) + tick(x, y1) + tick(x, y2) + text(x - fs * 0.35, (y1 + y2) / 2, label, 'middle', 'dt', -90);
  }

  // one view: rect of size Lm x depth, add-on boxes, dimension chains
  function view(title, depth, items, opts) {
    const top = y0 + fs * 2.2;
    let s = text(0, y0 + fs, title, 'start', 'vt');
    s += text(0, top - fs * 0.3, opts.leftEnd, 'start', 'end') + text(Lm, top - fs * 0.3, opts.rightEnd, 'end', 'end');
    s += `<rect class="body" x="0" y="${top}" width="${Lm}" height="${depth}"/>`;
    // corrugation hint
    for (let x = 220; x < Lm - 100; x += 220) s += line(x, top, x, top + depth, 'rib');
    const bottom = top + depth;
    items.forEach((r, i) => {
      const x1 = opts.mirror ? Lm - mm(r.fromRear) - mm(r.w) : mm(r.fromRear);
      const x2 = x1 + mm(r.w);
      // y in drawing: walls measure from base (bottom); roof from front edge (bottom of plan)
      const b = opts.roof ? mm(r.fromFrontEdge) : mm(r.fromBase);
      const yb = bottom - b, yt = yb - mm(r.h);
      s += `<rect class="${r.cut ? 'cut' : 'mount'}" x="${x1}" y="${yt}" width="${x2 - x1}" height="${yb - yt}"/>`;
      s += `<circle class="tagc" cx="${(x1 + x2) / 2}" cy="${(yt + yb) / 2}" r="${fs * 0.7}"/>` +
        text((x1 + x2) / 2, (yt + yb) / 2 + fs * 0.35, r.n, 'middle', 'tagt');
      // horizontal chain under the view: rear end -> edge, then width
      const yd = bottom + rowGap * (i + 1);
      const rearX = opts.mirror ? Lm : 0;
      const nearX = opts.mirror ? x2 : x1;
      s += dimH(Math.min(rearX, nearX), Math.max(rearX, nearX), yd, bottom, `${r.n}: ${u(mm(r.fromRear))}`);
      s += dimH(x1, x2, yd, yb, u(mm(r.w)));
      // vertical: base -> bottom edge, then height (just left of the box)
      const xv = x1 - fs * 1.1;
      s += dimV(yb, bottom, xv, x1, u(b));
      s += dimV(yt, yb, xv, x1, u(mm(r.h)));
    });
    // overall length (above) + overall depth (right)
    s += dimH(0, Lm, top - fs * 1.6, top, `${u(Lm)} overall`);
    s += dimV(top, bottom, Lm + fs * 1.6, Lm, u(depth));
    out += s;
    y0 = bottom + rowGap * (items.length + 1) + fs * 2.5;
  }

  const on = (side) => rows.filter((r) => r.side === side);
  view('ROOF PLAN', Wm, on('roof'), { roof: true, leftEnd: 'REAR END', rightEnd: 'DOOR END ▸' });
  view('FRONT WALL · ELEVATION', Hm, on('front'), { leftEnd: 'REAR END', rightEnd: 'DOOR END ▸' });
  view('BACK WALL · ELEVATION (seen from outside)', Hm, on('back'), { mirror: true, leftEnd: '◂ DOOR END', rightEnd: 'REAR END' });

  const vbW = Lm + pad * 2, vbH = y0 + pad * 0.4;
  return `<svg class="bp" viewBox="${-pad} 0 ${vbW} ${vbH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="2D blueprint of the container with add-on placements"
    style="--fs:${fs}px;--sw:${sw}px">${out}</svg>`;
}
