// container3d.js
// Procedural shipping container viewer for the Container Alliance quote builder.
// ES module. Expects an importmap for 'three' (r160) and 'three/addons/'.
//
// API: createContainer3D(host) -> { update(state), setView(name), setCut(on),
//   setFrame(px), getAddons(), moveAddon(id, {side, t}), getLength(), validate(), dispose() }
//
// state.lengthFt (10..53, default 20) rebuilds the body at real length: rib
// spacing stays constant, doors keep their size, 8ft x 8.5ft section stays.
// Every add-on lives in the `addons` placement map (side + normalized t along
// the length) and cuts a real opening in the wall/roof so the interior shows.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { clearanceFor, spacingBetween, validateLayout } from './calc/clearances.js';

const MODELS = new URL('./models/', import.meta.url).href;

// Brand
const NAVY = '#174984';
const SLATE = '#70797E';
const ORANGE = '#FF810F';
const STEEL = '#8a8f94';

// Container section (meters): 8ft wide, 8ft 6in tall. Length comes from state.
const FT = 0.3048;
const W = 2.44;  // width along Z
const H = 2.59;  // height along Y
const T = 0.05;  // wall thickness
const RIB = 0.22; // rib pitch along the length
const MIN_FT = 10, MAX_FT = 53;

const DUR = 0.3; // seconds for toggle tweens
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v) => Math.max(0, Math.min(1, v));

const DEFAULT_STATE = {
  qty: 1,
  lengthFt: 20,
  paintColor: NAVY,
  mods: {
    customDoors: false, hvac: false, paint: false, cutting: false, electrical: false,
    flooring: false, security: false, skylights: false, ventilation: false, windows: false,
  },
  conditions: { lockBox: false, doorsBothEnds: false },
};

// Add-on placements. side: 'front' (+Z long wall), 'back' (-Z long wall) or 'roof'.
// t: 0..1 along the length (0 = rear end, 1 = door end). w/h: opening footprint,
// y: center height on walls. cut: whether the body gets a hole there.
// mod: which state.mods key enables it.
const DEFAULT_ADDONS = {
  window1:  { type: 'window',   mod: 'windows',     side: 'front', t: 0.22, w: 0.9,  h: 1.2,  y: 1.45, cut: true },
  window2:  { type: 'window',   mod: 'windows',     side: 'front', t: 0.46, w: 0.9,  h: 1.2,  y: 1.45, cut: true },
  door:     { type: 'door',     mod: 'customDoors', side: 'front', t: 0.02, w: 0.92, h: 2.08, y: 1.12, cut: true },
  gate:     { type: 'gate',     mod: 'cutting',     side: 'front', t: 0.82, w: 1.8,  h: 2.0,  y: 1.15, cut: true },
  light:    { type: 'light',    mod: 'electrical',  side: 'front', t: 0.14, w: 0.3,  h: 2.4,  y: 1.2,  cut: false },
  hvac:     { type: 'hvac',     mod: 'hvac',        side: 'back',  t: 0.6,  w: 1.0,  h: 0.6,  y: 1.15, cut: false },
  vent1:    { type: 'vent',     mod: 'ventilation', side: 'front', t: 0.68, w: 0.46, h: 0.32, y: 2.28, cut: true },
  vent2:    { type: 'vent',     mod: 'ventilation', side: 'back',  t: 0.3,  w: 0.46, h: 0.32, y: 2.28, cut: true },
  vent3:    { type: 'vent',     mod: 'ventilation', side: 'back',  t: 0.85, w: 0.46, h: 0.32, y: 2.28, cut: true },
  sky1:     { type: 'skylight', mod: 'skylights',   side: 'roof',  t: 0.3,  w: 1.3,  h: 1.0,  y: 0,    cut: true },
  sky2:     { type: 'skylight', mod: 'skylights',   side: 'roof',  t: 0.7,  w: 1.3,  h: 1.0,  y: 0,    cut: true },
};

function makeWoodTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const ctx = c.getContext('2d');
  const rows = 8, ph = c.height / rows;
  for (let i = 0; i < rows; i++) {
    const y = i * ph;
    const base = 168 + ((i * 37) % 36);
    ctx.fillStyle = `rgb(${base},${(base * 0.66) | 0},${(base * 0.40) | 0})`;
    ctx.fillRect(0, y, c.width, ph);
    ctx.strokeStyle = 'rgba(80,42,16,0.28)';
    ctx.lineWidth = 1;
    for (let k = 0; k < 6; k++) {
      const yy = y + 4 + k * 4.5 + ((i * 13 + k * 7) % 4);
      ctx.beginPath();
      ctx.moveTo(0, yy);
      for (let x = 0; x <= c.width; x += 24) {
        ctx.lineTo(x, yy + Math.sin(x / 70 + i * 1.7 + k) * 1.8);
      }
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(40,20,8,0.65)';
    ctx.fillRect(0, y + ph - 2, c.width, 2);
    const off = (i * 197) % c.width;
    ctx.fillRect(off, y, 2, ph);
    ctx.fillRect((off + 256) % c.width, y, 2, ph);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 1);
  tex.anisotropy = 4;
  return tex;
}

function makePlywoodTexture() {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#d9c49b';
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 90; i++) {
    const y = (i * 61) % 512;
    ctx.strokeStyle = `rgba(120,88,40,${0.05 + (i % 5) * 0.025})`;
    ctx.lineWidth = 1 + (i % 3);
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 512; x += 32) ctx.lineTo(x, y + Math.sin(x / 90 + i) * 6);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}

function makeSoftDiscTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
  g.addColorStop(0, 'rgba(23,73,132,0.22)');
  g.addColorStop(0.6, 'rgba(23,73,132,0.08)');
  g.addColorStop(1, 'rgba(23,73,132,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createContainer3D(host) {
  // ---------- renderer / scene ----------
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.localClippingEnabled = true;
  const canvas = renderer.domElement;
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.outline = 'none';
  host.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
  camera.position.set(7.5, 4.6, 8.2);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, H / 2, 0);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 6;
  controls.maxDistance = 18;
  controls.minPolarAngle = 0.35;
  controls.maxPolarAngle = Math.PI / 2 - 0.06;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.7;
  controls.update();

  // ---------- lights ----------
  const hemi = new THREE.HemisphereLight(0xe8f0ff, 0x9aa3a8, 1.4);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 2.6);
  sun.position.set(6, 11, 5);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 60;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.3;
  pmrem.dispose();
  const rim = new THREE.DirectionalLight(0xffd2a6, 1.3);
  rim.position.set(-7, 5, -8);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xdfe9ff, 0.5);
  fill.position.set(-6, 4, -4);
  scene.add(fill);

  // ---------- resource tracking ----------
  const geoCache = new Map();
  const materials = [];
  const textures = [];
  const boxGeo = (w, h, d) => {
    const key = `${w.toFixed(4)}|${h.toFixed(4)}|${d.toFixed(4)}`;
    let g = geoCache.get(key);
    if (!g) { g = new THREE.BoxGeometry(w, h, d); geoCache.set(key, g); }
    return g;
  };
  const cylGeo = (r, h, seg = 12) => {
    const key = `cyl|${r}|${h.toFixed(4)}|${seg}`;
    let g = geoCache.get(key);
    if (!g) { g = new THREE.CylinderGeometry(r, r, h, seg); geoCache.set(key, g); }
    return g;
  };
  const mat = (opts) => { const m = new THREE.MeshStandardMaterial(opts); materials.push(m); return m; };
  const phys = (opts) => { const m = new THREE.MeshPhysicalMaterial(opts); materials.push(m); return m; };

  const woodTex = makeWoodTexture(); textures.push(woodTex);
  const plyTex = makePlywoodTexture(); textures.push(plyTex);
  const discTex = makeSoftDiscTexture(); textures.push(discTex);

  // ---------- materials ----------
  const bodyMat = phys({ color: STEEL, roughness: 0.5, metalness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.35, sheen: 0.25, sheenColor: new THREE.Color(0xbfd4ff), side: THREE.DoubleSide });
  bodyMat.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace('#include <opaque_fragment>',
      'float fres = pow(1.0 - saturate(dot(normalize(vViewPosition), normal)), 3.0);\n' +
      'outgoingLight += vec3(0.55, 0.7, 1.0) * fres * 0.22;\n#include <opaque_fragment>');
  };
  const frameMat = mat({ color: STEEL, roughness: 0.55, metalness: 0.35 });
  const slateMat = mat({ color: SLATE, roughness: 0.65, metalness: 0.35 });
  const darkMat = mat({ color: '#3a4147', roughness: 0.8, metalness: 0.3 });
  const blackMat = mat({ color: '#1c1f22', roughness: 0.45, metalness: 0.5 });
  const orangeMat = mat({ color: ORANGE, roughness: 0.5, metalness: 0.1 });
  const whiteMat = mat({ color: '#f2f4f5', roughness: 0.5, metalness: 0.05 });
  const brassMat = mat({ color: '#d9a74a', roughness: 0.35, metalness: 0.8 });
  const glassMat = phys({ color: '#eaf4f8', roughness: 0.04, metalness: 0, transmission: 0.9, thickness: 0.03, ior: 1.5, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.4, transparent: true, side: THREE.DoubleSide });
  const bulbMat = mat({ color: '#fff3d6', emissive: '#ffcf7a', emissiveIntensity: 1.6, roughness: 0.4 });
  const plankMat = mat({ map: woodTex, roughness: 0.6, metalness: 0.0, transparent: true, opacity: 0 });
  plankMat.userData.baseOpacity = 1;
  const subfloorMat = mat({ map: woodTex, color: '#8c7357', roughness: 0.9, metalness: 0.0 });
  const plyMat = mat({ map: plyTex, roughness: 0.9, metalness: 0.0, side: THREE.DoubleSide });
  const ceilMat = mat({ color: '#e4e6e3', roughness: 0.85, metalness: 0.05, side: THREE.DoubleSide });
  const stripMat = mat({ color: '#fff8ea', emissive: '#fff1d2', emissiveIntensity: 1.8, roughness: 0.5 });
  const curtainMat = mat({ color: '#a7b0b5', roughness: 0.6, metalness: 0.4 });
  const gateMat = mat({ color: '#f4f2ee', roughness: 0.38, metalness: 0.25 });
  const grooveMat = mat({ color: '#d6d3cd', roughness: 0.5, metalness: 0.2 });
  const glowMat = new THREE.MeshBasicMaterial({ color: '#ffcc66', transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false });
  materials.push(glowMat);
  const shadowMat = new THREE.ShadowMaterial({ opacity: 0.26 });
  materials.push(shadowMat);
  const discMat = new THREE.MeshBasicMaterial({ map: discTex, transparent: true, depthWrite: false });
  materials.push(discMat);

  const bodyTargetColor = new THREE.Color(STEEL);
  const frameTargetColor = new THREE.Color(STEEL).multiplyScalar(0.72);
  frameMat.color.copy(frameTargetColor);

  // ---------- helpers ----------
  function mesh(geo, material, x = 0, y = 0, z = 0, shadow = true) {
    const m = new THREE.Mesh(geo, material);
    m.position.set(x, y, z);
    m.castShadow = shadow;
    m.receiveShadow = shadow;
    return m;
  }
  const box = (w, h, d, material, x, y, z) => mesh(boxGeo(w, h, d), material, x, y, z);

  // A w x h panel in the XY plane, `depth` thick (centered on z=0), with
  // rectangular holes [{cx, cy, w, h}] in panel-local coordinates.
  const ownedGeos = new Set(); // non-cached geometries rebuilt per body
  function cutPanel(w, h, holes, depth) {
    const s = new THREE.Shape();
    s.moveTo(-w / 2, -h / 2); s.lineTo(w / 2, -h / 2); s.lineTo(w / 2, h / 2); s.lineTo(-w / 2, h / 2); s.closePath();
    for (const o of holes) {
      const x0 = Math.max(-w / 2 + 0.02, o.cx - o.w / 2), x1 = Math.min(w / 2 - 0.02, o.cx + o.w / 2);
      const y0 = Math.max(-h / 2 + 0.02, o.cy - o.h / 2), y1 = Math.min(h / 2 - 0.02, o.cy + o.h / 2);
      if (x1 - x0 < 0.02 || y1 - y0 < 0.02) continue;
      const p = new THREE.Path();
      p.moveTo(x0, y0); p.lineTo(x1, y0); p.lineTo(x1, y1); p.lineTo(x0, y1); p.closePath();
      s.holes.push(p);
    }
    const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 1 });
    g.translate(0, 0, -depth / 2);
    g.computeVertexNormals();
    ownedGeos.add(g);
    return g;
  }

  // Toggle tween system: scale (default) or opacity, eased over DUR seconds.
  const toggles = [];
  function makeToggle(group, on = false, mode = 'scale') {
    const t = { group, v: on ? 1 : 0, target: on ? 1 : 0, mode };
    toggles.push(t);
    applyToggle(t);
    return t;
  }
  function applyToggle(t) {
    const e = easeOut(clamp01(t.v));
    t.group.visible = t.v > 0.0005;
    if (t.mode === 'scale') {
      t.group.scale.setScalar(Math.max(e, 0.001));
    } else if (t.mode === 'scaleY') {
      t.group.scale.set(1, Math.max(e, 0.001), 1);
    } else {
      t.group.traverse((o) => {
        if (o.isMesh && o.material && o.material.transparent) {
          o.material.opacity = e * (o.material.userData.baseOpacity ?? 1);
        }
      });
    }
  }
  function setToggle(t, on) { if (t) t.target = on ? 1 : 0; }
  function dropToggle(t) { const i = toggles.indexOf(t); if (i >= 0) toggles.splice(i, 1); }

  // ---------- ground ----------
  const ground = mesh(new THREE.PlaneGeometry(80, 80), shadowMat, 0, 0, 0, false);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  const disc = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), discMat);
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = 0.002;
  disc.renderOrder = -1;
  scene.add(disc);

  // keeps z <= cutPlane.constant (see setCut)
  const cutPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 10);

  // ---------- state ----------
  let state = structuredClone(DEFAULT_STATE);
  const addons = structuredClone(DEFAULT_ADDONS);
  let L = 20 * FT;

  // placement -> world x for an add-on (keeps the opening clear of the corner posts)
  function addonX(a) {
    const margin = clearanceFor(a).corner;
    const span = Math.max(0, L - 2 * margin - a.w);
    return -L / 2 + margin + a.w / 2 + clamp01(a.t) * span;
  }
  const addonEnabled = (a) => !!state.mods[a.mod];

  // ---------- placement geometry (clamping + overlap avoidance) ----------
  // Corner margin and spacing come from each item's clearance zone (calc/clearances.js).
  function xRange(a) {
    const m = clearanceFor(a).corner;
    return [-L / 2 + m + a.w / 2, L / 2 - m - a.w / 2];
  }
  function xToT(a, x) {
    const [lo, hi] = xRange(a);
    return hi > lo ? clamp01((x - lo) / (hi - lo)) : 0;
  }
  function yOverlap(a, b) {
    if (a.side === 'roof') return true;
    const gap = spacingBetween(a, b);
    return a.y - a.h / 2 < b.y + b.h / 2 + gap && b.y - b.h / 2 < a.y + a.h / 2 + gap;
  }
  // Nearest free center x for add-on `id` on `side` near `desired`, or null if
  // nothing fits. Other enabled add-ons on that side are obstacles.
  function freeX(id, side, desired) {
    const a = addons[id];
    const [lo, hi] = xRange(a);
    if (hi < lo) return null;
    const blocks = [];
    for (const [k, b] of Object.entries(addons)) {
      if (k === id || b.side !== side || !addonEnabled(b) || !yOverlap({ ...a, side }, b)) continue;
      if (clearanceFor(a).blocks === false || clearanceFor(b).blocks === false) continue;
      const bx = addonX(b);
      const gap = spacingBetween({ ...a, side }, b);
      blocks.push([bx - b.w / 2 - gap - a.w / 2, bx + b.w / 2 + gap + a.w / 2]);
    }
    const eps = 1e-6;
    const isFree = (x) => x >= lo - eps && x <= hi + eps && !blocks.some(([b0, b1]) => x > b0 + eps && x < b1 - eps);
    const x = THREE.MathUtils.clamp(desired, lo, hi);
    if (isFree(x)) return x;
    let best = null, bd = Infinity;
    for (const c of [lo, hi, ...blocks.flat()]) {
      if (!isFree(c)) continue;
      const d = Math.abs(c - desired);
      if (d < bd) { bd = d; best = c; }
    }
    return best;
  }
  // Re-clamp every enabled add-on after a length or mod change (keeps t, nudges
  // only what would overlap).
  function resolveAll() {
    for (const [id, a] of Object.entries(addons)) {
      if (!addonEnabled(a)) continue;
      const x = freeX(id, a.side, addonX(a));
      if (x != null) a.t = xToT(a, x);
    }
  }

  // ---------- builders ----------
  function buildDoorEnd(withLocks) {
    // Group origin at the door end, on the ground, centered on Z. Doors face +X.
    const g = new THREE.Group();
    const panelW = W / 2 - 0.12;
    const panelH = H - 0.25;
    const hingeZ = W / 2 - 0.1;

    function door(sign) {
      const d = new THREE.Group();
      d.position.set(0, 0, sign * hingeZ);
      const cz = -sign * panelW / 2;
      d.add(box(0.06, panelH, panelW, bodyMat, 0, H / 2, cz));
      for (let i = 0; i < 4; i++) {
        const z = cz + (i - 1.5) * (panelW / 4.4);
        d.add(box(0.04, panelH - 0.35, 0.07, bodyMat, 0.05, H / 2, z));
      }
      const bars = [cz - 0.26, cz + 0.26];
      for (const bz of bars) {
        d.add(mesh(cylGeo(0.028, H - 0.45, 10), slateMat, 0.1, H / 2, bz));
        d.add(box(0.08, 0.06, 0.1, darkMat, 0.07, 0.28, bz));
        d.add(box(0.08, 0.06, 0.1, darkMat, 0.07, H - 0.3, bz));
        d.add(box(0.08, 0.06, 0.1, darkMat, 0.07, H / 2, bz));
        d.add(box(0.05, 0.05, 0.3, orangeMat, 0.14, 1.12, bz + (bz < cz ? 0.13 : -0.13)));
      }
      return d;
    }

    const left = door(+1);
    const right = door(-1);
    g.add(left, right);
    g.add(box(0.1, H, 0.1, frameMat, -0.02, H / 2, W / 2 - 0.05));
    g.add(box(0.1, H, 0.1, frameMat, -0.02, H / 2, -(W / 2 - 0.05)));
    g.add(box(0.08, 0.16, W, frameMat, -0.01, H - 0.08, 0));
    g.add(box(0.08, 0.16, W, frameMat, -0.01, 0.1, 0));

    let lockBoxToggle = null, padlockToggle = null;
    if (withLocks) {
      const cz = -panelW / 2;
      const lb = new THREE.Group();
      lb.position.set(0.12, 1.3, cz);
      lb.add(box(0.14, 0.26, 0.34, slateMat, 0, 0, 0));
      lb.add(box(0.15, 0.04, 0.36, darkMat, 0, 0.12, 0));
      lb.add(box(0.03, 0.08, 0.08, orangeMat, 0.08, -0.03, 0));
      left.add(lb);
      lockBoxToggle = makeToggle(lb, false);

      const pl = new THREE.Group();
      pl.position.set(0.13, 0.98, cz - 0.26);
      pl.add(box(0.1, 0.13, 0.11, brassMat, 0, 0, 0));
      const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.013, 8, 16, Math.PI), slateMat);
      shackle.position.set(0, 0.06, 0);
      shackle.rotation.y = Math.PI / 2;
      shackle.castShadow = true;
      pl.add(shackle);
      pl.add(box(0.02, 0.1, 0.03, slateMat, 0, 0.05, 0.05));
      pl.add(box(0.02, 0.1, 0.03, slateMat, 0, 0.05, -0.05));
      left.add(pl);
      padlockToggle = makeToggle(pl, false);
    }
    return { group: g, left, right, lockBoxToggle, padlockToggle };
  }

  // openings per side for the current state: [{x, y, w, h}] in world x / height y
  // The hole follows the add-on's scale-in tween so both appear together.
  const addonProgress = (id) => easeOut(clamp01(addonNodes[id] ? addonNodes[id].toggle.v : (addonEnabled(addons[id]) ? 1 : 0)));
  function openingsFor(side) {
    const out = [];
    for (const [id, a] of Object.entries(addons)) {
      if (!a.cut || a.side !== side) continue;
      const e = addonProgress(id);
      if (e < 0.02) continue;
      out.push({ x: addonX(a), y: a.y, w: (a.w - 0.06) * e, h: (a.h - 0.06) * e });
    }
    return out;
  }

  function addRibsAlongX(parent, z, openings) {
    const x0 = -L / 2 + 0.33, x1 = L / 2 - 0.33;
    const yTop = H - 0.15, yBot = 0.15;
    for (let x = x0; x <= x1 + 1e-6; x += RIB) {
      const hit = openings.find((o) => x > o.x - o.w / 2 - 0.04 && x < o.x + o.w / 2 + 0.04);
      if (!hit) { parent.add(box(0.1, H - 0.3, 0.04, bodyMat, x, H / 2, z)); continue; }
      const above = yTop - (hit.y + hit.h / 2), below = (hit.y - hit.h / 2) - yBot;
      if (above > 0.03) parent.add(box(0.1, above, 0.04, bodyMat, x, yTop - above / 2, z));
      if (below > 0.03) parent.add(box(0.1, below, 0.04, bodyMat, x, yBot + below / 2, z));
    }
  }

  function buildBody(withInterior) {
    const g = new THREE.Group();
    const parts = { lights: [] };
    const front = withInterior ? openingsFor('front') : [];
    const back = withInterior ? openingsFor('back') : [];
    const roof = withInterior ? openingsFor('roof') : [];
    const wallH = H - 0.2;
    const toLocal = (o) => ({ cx: o.x, cy: o.y - H / 2, w: o.w, h: o.h });

    // floor slab + subfloor
    g.add(box(L, 0.12, W, darkMat, 0, 0.06, 0));
    const sub = mesh(new THREE.PlaneGeometry(L - 0.2, W - 0.2), subfloorMat, 0, 0.121, 0);
    sub.rotation.x = -Math.PI / 2; sub.castShadow = false;
    ownedGeos.add(sub.geometry);
    g.add(sub);

    // roof with skylight holes (shape y maps to world -z after the rotation)
    const roofM = mesh(cutPanel(L, W, roof.map((o) => ({ cx: o.x, cy: 0, w: o.w, h: o.h })), T), bodyMat, 0, H - T / 2, 0);
    roofM.rotation.x = -Math.PI / 2;
    g.add(roofM);

    // long walls
    g.add(mesh(cutPanel(L, wallH, back.map(toLocal), T), bodyMat, 0, H / 2, -(W / 2 - T / 2)));
    g.add(mesh(cutPanel(L, wallH, front.map(toLocal), T), bodyMat, 0, H / 2, (W / 2 - T / 2)));
    addRibsAlongX(g, -(W / 2 + 0.02), back);
    addRibsAlongX(g, (W / 2 + 0.02), front);

    // end wall (-X), with ribs, as a toggleable group (goes away for doors on both ends)
    const endWall = new THREE.Group();
    endWall.position.set(-(L / 2 - T / 2), H / 2, 0);
    endWall.add(box(T, wallH, W, bodyMat, 0, 0, 0));
    for (let z = -W / 2 + 0.3; z <= W / 2 - 0.3 + 1e-6; z += RIB) {
      endWall.add(box(0.04, H - 0.3, 0.1, bodyMat, -0.045, 0, z));
    }
    if (withInterior) endWall.add(box(0.02, wallH - 0.1, W - 0.3, plyMat, T / 2 + 0.012, 0, 0));
    g.add(endWall);
    parts.endWall = endWall;

    // interior: plywood lining with the same holes, ceiling, strip lights
    if (withInterior) {
      const iw = L - 0.3, ih = wallH - 0.1, iz = W / 2 - T - 0.012;
      g.add(mesh(cutPanel(iw, ih, back.map(toLocal), 0.02), plyMat, 0, H / 2, -iz));
      g.add(mesh(cutPanel(iw, ih, front.map(toLocal), 0.02), plyMat, 0, H / 2, iz));
      // 4ft panel seams
      for (let x = -L / 2 + 1.22; x < L / 2 - 0.3; x += 1.22) {
        g.add(box(0.012, ih, 0.008, darkMat, x, H / 2, iz - 0.014));
        g.add(box(0.012, ih, 0.008, darkMat, x, H / 2, -iz + 0.014));
      }
      const ceil = mesh(cutPanel(iw, W - 0.3, roof.map((o) => ({ cx: o.x, cy: 0, w: o.w, h: o.h })), 0.02), ceilMat, 0, H - T - 0.012, 0);
      ceil.rotation.x = -Math.PI / 2;
      g.add(ceil);
      const n = Math.max(1, Math.round(L / 2.4));
      for (let i = 0; i < n; i++) {
        const x = -L / 2 + (L / n) * (i + 0.5);
        g.add(box(0.9, 0.03, 0.12, stripMat, x, H - T - 0.04, 0));
        const pl = new THREE.PointLight('#ffe9c8', 2.2, 5.5, 2);
        pl.position.set(x, H - 0.3, 0);
        g.add(pl);
        parts.lights.push(pl);
      }
    }

    // frame rails
    const r = 0.13;
    for (const y of [0.06, H - 0.06]) {
      g.add(box(L, r, r, frameMat, 0, y, W / 2 - 0.06));
      g.add(box(L, r, r, frameMat, 0, y, -(W / 2 - 0.06)));
      g.add(box(r, r, W, frameMat, L / 2 - 0.06, y, 0));
      g.add(box(r, r, W, frameMat, -(L / 2 - 0.06), y, 0));
    }
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      g.add(box(0.12, H, 0.12, frameMat, sx * (L / 2 - 0.06), H / 2, sz * (W / 2 - 0.06)));
    }
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) for (const y of [0.1, H - 0.1]) {
      g.add(box(0.21, 0.21, 0.21, darkMat, sx * (L / 2 - 0.1), y, sz * (W / 2 - 0.1)));
    }

    // door end (+X)
    const doors = buildDoorEnd(withInterior);
    doors.group.position.x = L / 2 - 0.03;
    g.add(doors.group);
    parts.doors = doors;

    // second door end (-X), hidden by default
    const doors2 = buildDoorEnd(false);
    doors2.group.rotation.y = Math.PI;
    const d2wrap = new THREE.Group();
    d2wrap.position.set(-(L / 2 - 0.03), H / 2, 0);
    doors2.group.position.set(0, -H / 2, 0);
    d2wrap.add(doors2.group);
    g.add(d2wrap);
    parts.doors2 = doors2;
    parts.doors2Wrap = d2wrap;

    return { group: g, parts };
  }

  // ---------- add-on builders (origin at the wall surface, +Z outward) ----------
  function buildWindow(a) {
    // Tall black steel-frame casement with a 2 x 3 mullion grid, sill and drip cap.
    const g = new THREE.Group();
    const w = a.w, h = a.h, fd = 0.1, ft = 0.055;
    g.add(box(w, ft, fd, blackMat, 0, h / 2 - ft / 2, 0.02));
    g.add(box(w, ft, fd, blackMat, 0, -h / 2 + ft / 2, 0.02));
    g.add(box(ft, h, fd, blackMat, -w / 2 + ft / 2, 0, 0.02));
    g.add(box(ft, h, fd, blackMat, w / 2 - ft / 2, 0, 0.02));
    const iw = w - 2 * ft, ih = h - 2 * ft;
    g.add(box(0.03, ih, 0.05, blackMat, 0, 0, 0.02));
    for (const k of [-1 / 6, 1 / 6]) g.add(box(iw, 0.025, 0.05, blackMat, 0, k * ih * 2, 0.02));
    const glass = mesh(new THREE.PlaneGeometry(iw, ih), glassMat, 0, 0, 0.02, false);
    ownedGeos.add(glass.geometry);
    g.add(glass);
    g.add(box(w + 0.12, 0.05, 0.16, slateMat, 0, -h / 2 - 0.025, 0.05));   // sill
    g.add(box(w + 0.1, 0.045, 0.12, slateMat, 0, h / 2 + 0.03, 0.04));     // drip cap
    // interior trim
    g.add(box(w + 0.08, 0.04, 0.03, whiteMat, 0, -h / 2 - 0.02, -T - 0.03));
    return g;
  }

  function buildDoor(a) {
    // Steel personnel door with a half-lite so the interior reads through it.
    const g = new THREE.Group();
    const w = a.w, h = a.h;
    g.add(box(w, 0.06, 0.1, slateMat, 0, h / 2 - 0.03, 0.02));
    g.add(box(0.06, h, 0.1, slateMat, -w / 2 + 0.03, 0, 0.02));
    g.add(box(0.06, h, 0.1, slateMat, w / 2 - 0.03, 0, 0.02));
    const lw = w - 0.14, lh = h - 0.1;
    const lite = { w: lw - 0.2, h: 0.78 };
    const leafGeo = cutPanel(lw, lh, [{ cx: 0, cy: 0.42, w: lite.w, h: lite.h }], 0.05);
    g.add(mesh(leafGeo, frameMat, 0, -0.03, 0.03));
    const glass = mesh(new THREE.PlaneGeometry(lite.w, lite.h), glassMat, 0, 0.39, 0.03, false);
    ownedGeos.add(glass.geometry);
    g.add(glass);
    g.add(box(lite.w + 0.06, 0.03, 0.07, blackMat, 0, 0.39 + lite.h / 2, 0.03));
    g.add(box(lite.w + 0.06, 0.03, 0.07, blackMat, 0, 0.39 - lite.h / 2, 0.03));
    g.add(box(0.03, lite.h, 0.07, blackMat, -lite.w / 2 - 0.015, 0.39, 0.03));
    g.add(box(0.03, lite.h, 0.07, blackMat, lite.w / 2 + 0.015, 0.39, 0.03));
    g.add(box(lw - 0.2, 0.55, 0.012, bodyMat, 0, -0.6, 0.06));              // lower inset panel
    const handle = mesh(cylGeo(0.02, 0.16, 8), orangeMat, lw / 2 - 0.1, -0.05, 0.08);
    handle.rotation.x = Math.PI / 2;
    g.add(handle);
    g.add(box(0.03, 0.03, 0.08, orangeMat, lw / 2 - 0.1, -0.05, 0.09));
    g.add(box(w + 0.06, 0.06, 0.14, slateMat, 0, h / 2 + 0.03, 0.05));      // drip cap
    g.add(box(w, 0.03, 0.08, darkMat, 0, -h / 2 + 0.015, 0.02));            // threshold
    return g;
  }

  function buildGate(a) {
    // Rolling storefront gate, curtain lowered a third so the bay reads open.
    const ow = a.w, oh = a.h;
    const g = new THREE.Group();
    const hd = 0.26, hh = 0.3;
    const prof = new THREE.Shape();
    prof.moveTo(0, 0); prof.lineTo(hd - 0.08, 0); prof.lineTo(hd, 0.08); prof.lineTo(hd, hh); prof.lineTo(0, hh); prof.closePath();
    const hGeo = new THREE.ExtrudeGeometry(prof, { depth: ow + 0.22, bevelEnabled: true, bevelSize: 0.008, bevelThickness: 0.008, bevelSegments: 2 });
    hGeo.translate(0, 0, -(ow + 0.22) / 2);
    ownedGeos.add(hGeo);
    const housing = new THREE.Mesh(hGeo, gateMat);
    housing.rotation.y = -Math.PI / 2;
    housing.position.set(0, oh / 2 - 0.02, 0);
    g.add(housing);
    for (const sx of [-1, 1]) g.add(box(0.07, oh, 0.09, gateMat, sx * (ow / 2 + 0.035), 0, 0.05));
    const drop = oh * 0.36;
    const n = Math.round(drop / 0.055), sh = drop / n;
    for (let i = 0; i < n; i++) {
      const y = oh / 2 - 0.02 - sh * (i + 0.5);
      g.add(box(ow, sh * 0.82, 0.025, gateMat, 0, y, 0.05));
      g.add(box(ow, sh * 0.18, 0.018, grooveMat, 0, y - sh * 0.5, 0.045));
    }
    g.add(box(ow + 0.02, 0.05, 0.05, gateMat, 0, oh / 2 - 0.02 - drop, 0.055)); // bottom bar
    g.add(box(ow + 0.12, 0.08, 0.1, darkMat, 0, oh / 2 - 0.02, -0.1));         // interior lintel
    g.add(box(ow + 0.1, 0.03, 0.15, orangeMat, 0, oh / 2 + 0.14, 0.06));
    g.traverse((m) => { if (m.isMesh) { m.castShadow = m.receiveShadow = true; } });
    return g;
  }

  const lamp = new THREE.PointLight('#ffd9a0', 0, 2.6, 2);
  function buildLight() {
    // Conduit + exterior fixture (electrical). Origin at the wall, y = a.y.
    const g = new THREE.Group();
    const y0 = -1.2;
    g.add(mesh(cylGeo(0.02, 1.95, 8), slateMat, 0, y0 + 1.25, 0.07));
    g.add(box(0.14, 0.18, 0.08, slateMat, 0, y0 + 1.3, 0.09));
    g.add(box(0.1, 0.12, 0.01, orangeMat, 0, y0 + 1.3, 0.135));
    g.add(box(0.06, 0.06, 0.06, slateMat, 0, y0 + 0.3, 0.07));
    g.add(box(0.04, 0.04, 0.22, slateMat, 0, y0 + 2.3, 0.14));
    g.add(box(0.2, 0.08, 0.2, slateMat, 0, y0 + 2.28, 0.26));
    g.add(box(0.13, 0.025, 0.13, bulbMat, 0, y0 + 2.235, 0.26));
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), glowMat);
    glow.position.set(0, y0 + 2.2, 0.26);
    g.add(glow);
    lamp.position.set(0, y0 + 2.12, 0.32);
    g.add(lamp);
    return g;
  }

  function buildHvac() {
    // Procedural mini-split; the ac-unit OBJ replaces it once loaded.
    const g = new THREE.Group();
    const proc = new THREE.Group();
    proc.add(box(0.6, 0.26, 0.2, whiteMat, 0, 0, 0.12));
    proc.add(box(0.56, 0.04, 0.03, slateMat, 0, -0.08, 0.23));
    for (let i = 0; i < 5; i++) proc.add(box(0.03, 0.14, 0.01, slateMat, -0.22 + i * 0.11, 0.03, 0.225));
    proc.add(box(0.06, 0.2, 0.06, darkMat, 0.2, -0.22, 0.05));
    proc.add(box(0.7, 0.03, 0.26, slateMat, 0, 0.145, 0.13));
    g.add(proc);
    g.userData.proc = proc;
    return g;
  }

  function buildVent() {
    const v = new THREE.Group();
    v.add(box(0.46, 0.32, 0.05, slateMat, 0, 0, 0.025));
    v.add(box(0.05, 0.3, 0.06, slateMat, -0.205, 0, 0.03));
    v.add(box(0.05, 0.3, 0.06, slateMat, 0.205, 0, 0.03));
    for (let i = -1; i <= 1; i++) {
      const slat = box(0.4, 0.05, 0.03, slateMat, 0, i * 0.085, 0.06);
      slat.rotation.x = 0.55;
      v.add(slat);
    }
    // interior grille frame
    v.add(box(0.5, 0.36, 0.02, whiteMat, 0, 0, -T - 0.03));
    for (let i = -2; i <= 2; i++) v.add(box(0.44, 0.012, 0.02, blackMat, 0, i * 0.065, -T - 0.035));
    return v;
  }

  function buildSkylight(a) {
    // Origin on the roof surface, local +Y up, opening a.w (x) by a.h (z).
    const s = new THREE.Group();
    const w = a.w, d = a.h, ft = 0.06;
    s.add(box(w, 0.12, ft, slateMat, 0, 0.06, d / 2 - ft / 2));
    s.add(box(w, 0.12, ft, slateMat, 0, 0.06, -d / 2 + ft / 2));
    s.add(box(ft, 0.12, d, slateMat, w / 2 - ft / 2, 0.06, 0));
    s.add(box(ft, 0.12, d, slateMat, -w / 2 + ft / 2, 0.06, 0));
    const glass = mesh(new THREE.PlaneGeometry(w - 2 * ft, d - 2 * ft), glassMat, 0, 0.11, 0, false);
    glass.rotation.x = -Math.PI / 2;
    ownedGeos.add(glass.geometry);
    s.add(glass);
    s.add(box(0.03, 0.03, d - 2 * ft, blackMat, 0, 0.115, 0));
    return s;
  }

  // ---------- add-on instances ----------
  const addonNodes = {}; // id -> { group, toggle }
  const builders = { window: buildWindow, door: buildDoor, gate: buildGate, light: buildLight, hvac: buildHvac, vent: buildVent, skylight: buildSkylight };
  const addonRoot = new THREE.Group();
  scene.add(addonRoot);
  for (const [id, a] of Object.entries(addons)) {
    const group = builders[a.type](a);
    group.traverse((m) => { if (m.isMesh && m.castShadow === undefined) m.castShadow = true; });
    group.userData.addonId = id;
    addonRoot.add(group);
    addonNodes[id] = { group, toggle: makeToggle(group, false) };
  }
  function placeAddon(id) {
    const a = addons[id], node = addonNodes[id];
    if (!a || !node) return;
    const x = addonX(a);
    if (a.side === 'roof') {
      node.group.position.set(x, H, 0);
      node.group.rotation.set(0, 0, 0);
    } else {
      const s = a.side === 'back' ? -1 : 1;
      node.group.position.set(x, a.y, s * W / 2);
      node.group.rotation.set(0, s < 0 ? Math.PI : 0, 0);
    }
  }
  function placeAll() { for (const id of Object.keys(addons)) placeAddon(id); }

  // ---------- body (rebuilt on length / opening changes) ----------
  let main = null, P = null;
  let endWallToggle = null, doors2Toggle = null;
  const extras = []; // qty > 1 bodies
  const extraToggles = [];
  let bodyKey = '';

  function disposeOwned(root) {
    root.traverse((o) => {
      if (o.isMesh && ownedGeos.has(o.geometry)) { o.geometry.dispose(); ownedGeos.delete(o.geometry); }
    });
  }

  function currentBodyKey() {
    let holes = '';
    for (const [id, a] of Object.entries(addons)) {
      if (!a.cut) continue;
      const e = addonProgress(id);
      if (e < 0.02) continue;
      holes += `${id}:${a.side}:${a.t.toFixed(4)}:${e.toFixed(3)},`;
    }
    return `${L.toFixed(4)}|${holes}`;
  }

  // extra containers for qty > 1 (beside, then stacked); only depend on the length
  let extrasKey = '';
  function rebuildExtras() {
    const key = L.toFixed(4);
    if (key === extrasKey) return;
    extrasKey = key;
    const prev = extraToggles.map((t) => ({ v: t.v, target: t.target }));
    for (const t of extraToggles) dropToggle(t);
    for (const ex of extras) { disposeOwned(ex.group); scene.remove(ex.group); }
    extras.length = 0; extraToggles.length = 0;
    for (const pos of [[0, 0, -(W + 0.45)], [0, H + 0.02, -(W + 0.45)]]) {
      const ex = buildBody(false);
      ex.group.position.set(...pos);
      scene.add(ex.group);
      extras.push(ex);
      extraToggles.push(makeToggle(ex.group, false));
    }
    extraToggles.forEach((t, i) => { if (prev[i]) { t.v = prev[i].v; t.target = prev[i].target; applyToggle(t); } });
  }

  let floorToggle = null, plankMesh = null;
  function rebuildBody() {
    rebuildExtras();
    const key = currentBodyKey();
    if (key === bodyKey) return;
    bodyKey = key;
    // carry tween values across the rebuild so nothing pops
    const keep = (t) => (t ? { v: t.v, target: t.target } : null);
    const prev = main ? {
      endWall: keep(endWallToggle), doors2: keep(doors2Toggle),
      lockBox: keep(P.doors.lockBoxToggle), padlock: keep(P.doors.padlockToggle),
      floor: keep(floorToggle),
    } : null;
    const rightRot = main ? P.doors.right.rotation.y : 0;
    const right2Rot = main ? P.doors2.right.rotation.y : 0;

    if (main) {
      for (const t of [endWallToggle, doors2Toggle, P.doors.lockBoxToggle, P.doors.padlockToggle, floorToggle]) dropToggle(t);
      disposeOwned(main.group); scene.remove(main.group);
    }

    main = buildBody(true);
    P = main.parts;
    scene.add(main.group);
    endWallToggle = makeToggle(P.endWall, true, 'scale');
    doors2Toggle = makeToggle(P.doors2Wrap, false, 'scale');
    P.doors.right.rotation.y = rightRot;
    P.doors2.right.rotation.y = right2Rot;

    // Flooring: finished planks fading in over the subfloor
    plankMesh = new THREE.Mesh(new THREE.PlaneGeometry(L - 0.24, W - 0.24), plankMat);
    ownedGeos.add(plankMesh.geometry);
    plankMesh.rotation.x = -Math.PI / 2;
    plankMesh.position.set(0, 0.126, 0);
    plankMesh.receiveShadow = true;
    woodTex.repeat.set(Math.max(1, Math.round(L / 3)), 1);
    main.group.add(plankMesh);
    floorToggle = makeToggle(plankMesh, false, 'opacity');

    if (prev) {
      const restore = (t, k) => { if (t && k) { t.v = k.v; t.target = k.target; applyToggle(t); } };
      restore(endWallToggle, prev.endWall); restore(doors2Toggle, prev.doors2);
      restore(P.doors.lockBoxToggle, prev.lockBox); restore(P.doors.padlockToggle, prev.padlock);
      restore(floorToggle, prev.floor);
    }

    // scene extents that follow the length
    disc.scale.set(L + 4, W + 4, 1);
    const ext = L / 2 + 4;
    sun.shadow.camera.left = -ext; sun.shadow.camera.right = ext;
    sun.shadow.camera.top = ext; sun.shadow.camera.bottom = -ext;
    sun.shadow.camera.updateProjectionMatrix();
    controls.minDistance = Math.max(5, L * 0.7);
    controls.maxDistance = Math.max(18, L * 3);
    for (const m of materials) if (m !== shadowMat && m !== discMat) { m.clippingPlanes = [cutPlane]; m.clipShadows = true; }
    placeAll();
  }

  // ---------- scanned models (models/) ----------
  const bytes = new Map();
  const report = () => {
    let done = 0, total = 0;
    for (const [d, t] of bytes.values()) { done += d; total += t; }
    host.dispatchEvent(new CustomEvent('ca-loading', { detail: { done, total, finished: [...bytes.values()].every(([d, t]) => t && d >= t) } }));
  };
  const track = (loader) => {
    const load = loader.load.bind(loader);
    loader.load = (url, onLoad, _p, onError) => {
      bytes.set(url, [0, 0]);
      load(url, (r) => { const b = bytes.get(url); b[0] = b[1] = Math.max(b[1], 1); report(); onLoad(r); },
        (e) => { if (e.lengthComputable || e.total) bytes.set(url, [e.loaded, e.total || e.loaded]); report(); },
        (err) => { bytes.set(url, [1, 1]); report(); onError && onError(err); });
    };
    return loader;
  };
  const texLoader = new THREE.TextureLoader();
  const loadTex = (url, srgb = true) => {
    const t = texLoader.load(url);
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    textures.push(t);
    return t;
  };
  function fitInto(obj, sx, sy, sz) {
    const b = new THREE.Box3().setFromObject(obj), size = b.getSize(new THREE.Vector3());
    obj.scale.set(sx / size.x, sy / size.y, sz / size.z);
    const b2 = new THREE.Box3().setFromObject(obj), c = b2.getCenter(new THREE.Vector3());
    obj.position.set(-c.x, -b2.min.y, -c.z);
  }
  const shadowAll = (o) => o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });

  // Wall mounted AC unit replaces the procedural mini-split for the HVAC option.
  track(new OBJLoader()).load(MODELS + 'ac-unit/ac-unit.obj', (obj) => {
    if (disposed) return;
    const byName = {};
    for (const n of ['GalvanizedSteelDirt', 'MetalPaintedWhite', 'MetalRoughGray']) {
      byName[n] = mat({ map: loadTex(MODELS + `ac-unit/${n}.jpg`), roughness: 0.55, metalness: n === 'MetalPaintedWhite' ? 0.1 : 0.6 });
      byName[n].clippingPlanes = [cutPlane];
    }
    obj.traverse((m) => {
      if (!m.isMesh) return;
      const pick = (mm) => byName[Object.keys(byName).find((k) => (mm?.name || '').includes(k))] || byName.MetalRoughGray;
      m.material = Array.isArray(m.material) ? m.material.map(pick) : pick(m.material);
    });
    fitInto(obj, 0.95, 0.5, 0.56);
    shadowAll(obj);
    const g = addonNodes.hvac.group;
    g.userData.proc.visible = false;
    obj.position.y -= 0.25; obj.position.z += 0.3;
    g.add(obj);
    const shelf = box(1.0, 0.04, 0.62, slateMat, 0, -0.27, 0.31);
    const strutL = box(0.04, 0.04, 0.7, slateMat, -0.42, -0.5, 0.3); strutL.rotation.x = -0.6;
    const strutR = strutL.clone(); strutR.position.x = 0.42;
    g.add(shelf, strutL, strutR);
  }, undefined, (e) => console.warn('AC model unavailable', e));

  // ---------- views + lateral cut ----------
  const targetView = { target: new THREE.Vector3(0, H / 2, 0), radius: 11.5 };
  let fitUntil = 0;
  const VIEWS = {
    iso:   new THREE.Vector3(7.5, 4.6, 8.2),
    side:  new THREE.Vector3(0, 0.9, 10),
    doors: new THREE.Vector3(10, 1.2, 0.4),
    rear:  new THREE.Vector3(-10, 1.2, 0.4),
    top:   new THREE.Vector3(0.01, 10, 0.6),
  };
  const viewDir = new THREE.Vector3();
  let viewUntil = 0;
  function setView(name) {
    const d = VIEWS[name];
    if (!d) return;
    viewDir.copy(d).normalize();
    controls.autoRotate = false;
    controls.minPolarAngle = name === 'top' ? 0.01 : 0.35;
    viewUntil = performance.now() + 900;
    fitUntil = performance.now() + 700;
  }
  let cutTarget = 10;
  function setCut(on) {
    cutTarget = on ? 0.02 : W;
  }

  let doorOpen = 0, doorOpenTarget = 0;
  let door2Open = 0, door2OpenTarget = 0;

  function applyState() {
    const m = state.mods, c = state.conditions;
    L = THREE.MathUtils.clamp(Number(state.lengthFt) || 20, MIN_FT, MAX_FT) * FT;
    resolveAll();
    rebuildBody();
    placeAll();
    bodyTargetColor.set(m.paint ? (state.paintColor || NAVY) : STEEL);
    frameTargetColor.copy(bodyTargetColor).multiplyScalar(0.72);
    for (const [id, a] of Object.entries(addons)) setToggle(addonNodes[id].toggle, addonEnabled(a));
    setToggle(floorToggle, !!m.flooring);
    doorOpenTarget = (m.flooring || m.electrical) ? 1 : 0;
    door2OpenTarget = c.doorsBothEnds ? 1 : 0;
    setToggle(P.doors.lockBoxToggle, !!(m.security || c.lockBox));
    setToggle(P.doors.padlockToggle, !!m.security);
    setToggle(endWallToggle, !c.doorsBothEnds);
    setToggle(doors2Toggle, !!c.doorsBothEnds);
    const qty = Math.max(1, Math.floor(Number(state.qty) || 1));
    setToggle(extraToggles[0], qty >= 2);
    setToggle(extraToggles[1], qty >= 3);
    // framing follows the length and the stack
    const tz = qty >= 2 ? -(W + 0.45) / 2 : 0;
    const ty = qty >= 3 ? H * 0.95 : H / 2;
    const base = qty >= 3 ? 14.5 : qty === 2 ? 13 : 11.5;
    const r = base * Math.max(1, Math.pow(L / 6.1, 0.85));
    if (Math.abs(targetView.radius - r) > 1e-3 || Math.abs(targetView.target.z - tz) > 1e-3 || Math.abs(targetView.target.y - ty) > 1e-3) {
      targetView.target.set(0, ty, tz);
      targetView.radius = r;
      fitUntil = performance.now() + 700;
    }
  }

  function update(next) {
    next = next || {};
    state = {
      qty: next.qty ?? state.qty,
      lengthFt: next.lengthFt ?? state.lengthFt,
      paintColor: next.paintColor ?? state.paintColor,
      mods: { ...state.mods, ...(next.mods || {}) },
      conditions: { ...state.conditions, ...(next.conditions || {}) },
    };
    applyState();
  }

  // ---------- add-on placement API ----------
  function getAddons() {
    const out = {};
    for (const [id, a] of Object.entries(addons)) {
      out[id] = { ...a, enabled: addonEnabled(a), x: addonX(a), lengthM: L };
    }
    return out;
  }
  // Place add-on `id` on `side` as close to center x `desiredX` as the clamps
  // allow. Returns true when the placement changed.
  function placeAt(id, side, desiredX) {
    const a = addons[id];
    if (!a) return false;
    if (side !== a.side) {
      const wall = side === 'front' || side === 'back';
      if (a.side === 'roof' || !wall) return false; // roof add-ons stay on the roof
    }
    const x = freeX(id, side, desiredX);
    if (x == null) return false;
    const t = xToT(a, x);
    if (side === a.side && Math.abs(t - a.t) < 1e-6) return false;
    a.side = side; a.t = t;
    placeAddon(id);
    return true;
  }
  function emitMoved(id) {
    const a = addons[id];
    host.dispatchEvent(new CustomEvent('ca-addon-moved', { detail: { id, side: a.side, t: a.t } }));
  }
  function moveAddon(id, where) {
    const a = addons[id];
    if (!a || !where) return false;
    const side = where.side || a.side;
    const t = (where.t != null && Number.isFinite(Number(where.t))) ? clamp01(Number(where.t)) : a.t;
    const [lo, hi] = xRange(a);
    const ok = placeAt(id, side, lo + t * (hi - lo));
    if (ok) { rebuildBody(); emitMoved(id); }
    return ok;
  }
  const getLength = () => ({ ft: L / FT, m: L });
  const validate = () => validateLayout(getAddons(), L / FT);

  // ---------- direct manipulation: hover + drag add-ons on the container ----------
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const bodyBox = new THREE.Box3();
  const hitPt = new THREE.Vector3();
  const wallPlane = new THREE.Plane();
  const DRAG_PX = 6;
  let hoverId = null;
  let hoverPos = null; // last pointer position while not dragging (raycast in frame)
  let drag = null;     // { id, pointerId, x0, y0, active, grabDx }
  const hiCache = new Map();
  function hiMat(m) {
    if (!m || !('emissive' in m)) return m;
    let h = hiCache.get(m);
    if (!h) {
      h = m.clone();
      h.emissive = new THREE.Color(ORANGE);
      h.emissiveIntensity = 0.22;
      h.onBeforeCompile = m.onBeforeCompile;
      materials.push(h);
      hiCache.set(m, h);
    }
    if (h.color && m.color) h.color.copy(m.color);
    h.clippingPlanes = m.clippingPlanes;
    return h;
  }
  function setHighlight(id, on) {
    const node = addonNodes[id];
    if (!node) return;
    node.group.traverse((o) => {
      if (!o.isMesh) return;
      if (on) {
        if (o.userData.origMat) return;
        o.userData.origMat = o.material;
        o.material = Array.isArray(o.material) ? o.material.map(hiMat) : hiMat(o.material);
      } else if (o.userData.origMat) {
        o.material = o.userData.origMat;
        o.userData.origMat = null;
      }
    });
  }
  function setHover(id) {
    if (id === hoverId) return;
    if (hoverId) setHighlight(hoverId, false);
    hoverId = id;
    if (hoverId) setHighlight(hoverId, true);
    canvas.style.cursor = drag && drag.active ? 'grabbing' : (hoverId ? 'grab' : '');
  }
  function toNdc(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  }
  const draggable = (id) => { const n = addonNodes[id]; return n && n.toggle.target === 1 && n.toggle.v > 0.5; };
  function pickAddon(e) {
    toNdc(e);
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects(addonRoot.children, true);
    for (const h of hits) {
      let o = h.object;
      while (o && o.parent !== addonRoot) o = o.parent;
      const id = o && o.userData.addonId;
      if (id && draggable(id)) return { id, point: h.point };
    }
    return null;
  }
  // Where on the container the pointer is: { side, x } or null.
  function pointerOnBody(e, a) {
    toNdc(e);
    raycaster.setFromCamera(ndc, camera);
    const ray = raycaster.ray;
    if (a.side === 'roof') {
      wallPlane.set(new THREE.Vector3(0, 1, 0), -H);
      return ray.intersectPlane(wallPlane, hitPt) ? { side: 'roof', x: hitPt.x } : null;
    }
    bodyBox.min.set(-L / 2, 0, -W / 2); bodyBox.max.set(L / 2, H, W / 2);
    if (ray.intersectBox(bodyBox, hitPt)) {
      const eps = 1e-3;
      if (Math.abs(hitPt.z - W / 2) < eps) return { side: 'front', x: hitPt.x };
      if (Math.abs(hitPt.z + W / 2) < eps) return { side: 'back', x: hitPt.x };
      // entered through an end or the roof: slide along the current wall
    }
    const s = a.side === 'back' ? -1 : 1;
    wallPlane.set(new THREE.Vector3(0, 0, s), -s * W / 2);
    if (!ray.intersectPlane(wallPlane, hitPt)) return null; // pointer looks away from the wall
    const x = hitPt.x;
    // Past a corner: wrap onto the other long wall at the same end. flipLock
    // stops it bouncing back until the pointer is over the body again.
    if (drag) {
      if (Math.abs(x) <= L / 2) drag.flipLock = false;
      else if (!drag.flipLock && Math.abs(x) > L / 2 + 0.25) {
        drag.flipLock = true;
        return { side: a.side === 'front' ? 'back' : 'front', x: Math.sign(x) * L / 2 };
      }
    }
    return { side: a.side, x };
  }
  function onPointerDown(e) {
    if (e.target !== canvas || drag) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const hit = pickAddon(e);
    if (!hit) return;
    e.stopPropagation(); // keep OrbitControls out of this gesture
    e.preventDefault();
    const a = addons[hit.id];
    const under = pointerOnBody(e, a);
    drag = { id: hit.id, pointerId: e.pointerId, x0: e.clientX, y0: e.clientY, active: false, grabDx: under ? addonX(a) - under.x : 0, moved: false };
    try { canvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    setHover(hit.id);
  }
  function onPointerMove(e) {
    if (!drag) { hoverPos = { clientX: e.clientX, clientY: e.clientY }; return; }
    if (e.pointerId !== drag.pointerId) return;
    if (!drag.active) {
      if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < DRAG_PX) return;
      drag.active = true;
      controls.autoRotate = false;
      controls.enabled = false;
      canvas.style.cursor = 'grabbing';
    }
    e.preventDefault();
    const a = addons[drag.id];
    const under = pointerOnBody(e, a);
    if (!under) return;
    const dx = under.side === a.side ? drag.grabDx : 0;
    if (placeAt(drag.id, under.side, under.x + dx)) { drag.moved = true; emitMoved(drag.id); }
    // the body re-cuts in frame() (rAF-coalesced through the body key)
  }
  function endDrag(e) {
    if (!drag || (e && e.pointerId !== drag.pointerId)) return;
    const d = drag;
    drag = null;
    try { canvas.releasePointerCapture(d.pointerId); } catch { /* ignore */ }
    controls.enabled = true;
    if (d.active) {
      rebuildBody();
      if (d.moved) emitMoved(d.id);
    }
    canvas.style.cursor = hoverId ? 'grab' : '';
    if (e) hoverPos = { clientX: e.clientX, clientY: e.clientY };
  }
  function onPointerLeave() { if (!drag) { hoverPos = null; setHover(null); } }
  // capture on the host so this runs before OrbitControls' canvas listener
  host.addEventListener('pointerdown', onPointerDown, { capture: true });
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);
  canvas.addEventListener('pointerleave', onPointerLeave);
  function updateHover() {
    if (drag || !hoverPos) return;
    const hit = pickAddon(hoverPos);
    setHover(hit ? hit.id : null);
    hoverPos = null;
  }

  // ---------- animation ----------
  const _dir = new THREE.Vector3();
  function step(dt) {
    for (const t of toggles) {
      if (t.v !== t.target) {
        t.v = t.target > t.v ? Math.min(t.target, t.v + dt / DUR) : Math.max(t.target, t.v - dt / DUR);
        applyToggle(t);
      }
    }
    // door swing (right leaf, hinge at -Z, swings outward with +rotation)
    if (doorOpen !== doorOpenTarget) {
      doorOpen = doorOpenTarget > doorOpen ? Math.min(doorOpenTarget, doorOpen + dt / 0.6) : Math.max(doorOpenTarget, doorOpen - dt / 0.6);
      P.doors.right.rotation.y = easeOut(doorOpen) * 2.1;
    }
    if (door2Open !== door2OpenTarget) {
      door2Open = door2OpenTarget > door2Open ? Math.min(door2OpenTarget, door2Open + dt / 0.6) : Math.max(door2OpenTarget, door2Open - dt / 0.6);
      P.doors2.right.rotation.y = easeOut(door2Open) * 1.9;
    }
    const k = 1 - Math.exp(-dt * 11);
    if (!bodyMat.color.equals(bodyTargetColor)) {
      bodyMat.color.lerp(bodyTargetColor, k);
      frameMat.color.lerp(frameTargetColor, k);
      if (colorDist(bodyMat.color, bodyTargetColor) < 0.002) {
        bodyMat.color.copy(bodyTargetColor);
        frameMat.color.copy(frameTargetColor);
      }
    }
    const e = easeOut(clamp01(addonNodes.light.toggle.v));
    lamp.intensity = 1.8 * e;
    glowMat.opacity = 0.32 * e;
    if (cutPlane.constant !== cutTarget) {
      const kc = 1 - Math.exp(-dt * 7);
      cutPlane.constant += (cutTarget - cutPlane.constant) * kc;
      if (Math.abs(cutPlane.constant - cutTarget) < 0.002) cutPlane.constant = cutTarget;
    }
    const now = performance.now();
    if (now < viewUntil) {
      _dir.subVectors(camera.position, controls.target);
      const r = _dir.length();
      _dir.normalize().lerp(viewDir, 1 - Math.exp(-dt * 7)).normalize();
      camera.position.copy(controls.target).addScaledVector(_dir, r);
    }
    const kt = 1 - Math.exp(-dt * 6);
    controls.target.lerp(targetView.target, kt);
    if (now < fitUntil) {
      _dir.subVectors(camera.position, controls.target);
      const r = _dir.length();
      const nr = r + (targetView.radius - r) * kt;
      camera.position.copy(controls.target).addScaledVector(_dir.normalize(), nr);
    }
  }
  function colorDist(a, b) {
    return Math.abs(a.r - b.r) + Math.abs(a.g - b.g) + Math.abs(a.b - b.b);
  }

  const clock = new THREE.Clock();
  let raf = 0;
  let disposed = false;
  function frame() {
    if (disposed) return;
    raf = requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.1);
    step(dt);
    if (drag && !draggable(drag.id)) endDrag(null);
    if (hoverId && !draggable(hoverId)) setHover(null);
    updateHover();
    rebuildBody(); // no-op unless an opening is tweening or an add-on moved
    controls.update();
    renderer.render(scene, camera);
  }

  // ---------- resize ----------
  let rightInset = 0;
  function resize() {
    const w = Math.max(1, host.clientWidth);
    const h = Math.max(1, host.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const free = w - rightInset;
    camera.zoom = rightInset ? THREE.MathUtils.clamp((free / w) * (w / h) * 0.95, 0.7, 1.8) : Math.min(1.25, Math.max(0.85, w / h * 0.9));
    if (rightInset) camera.setViewOffset(w, h, w / 2 - free * 0.36, 0, w, h);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }
  function setFrame(px) { rightInset = Math.max(0, px || 0); resize(); }
  const ro = new ResizeObserver(() => resize());
  ro.observe(host);
  resize();

  // ---------- init ----------
  applyState();
  for (const t of toggles) { t.v = t.target; applyToggle(t); }
  bodyMat.color.copy(bodyTargetColor);
  frameMat.color.copy(frameTargetColor);
  doorOpen = doorOpenTarget; P.doors.right.rotation.y = easeOut(doorOpen) * 2.1;
  door2Open = door2OpenTarget; P.doors2.right.rotation.y = easeOut(door2Open) * 1.9;
  fitUntil = 0;
  controls.target.copy(targetView.target);
  const initDir = camera.position.clone().sub(targetView.target).normalize();
  camera.position.copy(targetView.target).addScaledVector(initDir, targetView.radius);
  controls.update();
  frame();

  // ---------- dispose ----------
  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(raf);
    ro.disconnect();
    host.removeEventListener('pointerdown', onPointerDown, { capture: true });
    canvas.removeEventListener('pointermove', onPointerMove);
    canvas.removeEventListener('pointerup', endDrag);
    canvas.removeEventListener('pointercancel', endDrag);
    canvas.removeEventListener('pointerleave', onPointerLeave);
    controls.dispose();
    const cached = new Set(geoCache.values());
    scene.traverse((o) => {
      if (o.isMesh && o.geometry && !cached.has(o.geometry)) o.geometry.dispose();
    });
    for (const g of cached) g.dispose();
    for (const m of materials) m.dispose();
    for (const t of textures) t.dispose();
    envTex.dispose();
    renderer.dispose();
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
  }

  return { update, setView, setCut, setFrame, getAddons, moveAddon, getLength, validate, dispose };
}

export default createContainer3D;
