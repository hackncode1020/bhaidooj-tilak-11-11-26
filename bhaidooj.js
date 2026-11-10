const S = document.querySelector('svg');
const CX = 540, CY = 850, TAU = Math.PI * 2;
document.body.style.background =
  'linear-gradient(#2b0a2e, #0b0620)';

const mk = (tag, a, txt) => {
  const e = document.createElementNS(
    'http://www.w3.org/2000/svg', tag);
  for (const k in a) e.setAttribute(k, a[k]);
  if (txt) e.textContent = txt;
  S.appendChild(e);
  return e;
};
const clamp = x => Math.min(1, Math.max(0, x));
const ease = x => 1 - Math.pow(1 - clamp(x), 3);

// rose curve: r = R * cos(k * angle)
function rose(k, R) {
  let d = '';
  for (let i = 0; i <= 600; i++) {
    const a = i / 600 * TAU;
    const r = R * Math.cos(k * a);
    d += (i ? 'L' : 'M')
      + (CX + r * Math.cos(a)).toFixed(1)
      + ' '
      + (CY + r * Math.sin(a)).toFixed(1);
  }
  return d;
}
const stars = [...Array(40)].map((_, i) =>
  mk('circle', {cx: i * 397 % 1080,
    cy: i * 613 % 1900, r: 2 + i % 3,
    fill: '#fff1c1'}));
const rings = [[8, 410, '#ff5a5f'],
  [6, 330, '#ffd46b'], [5, 260, '#ff8fab'],
  [4, 185, '#ffb347'], [3, 115, '#fff1c1']];
const petals = rings.map(([k, R, c]) =>
  mk('path', {d: rose(k, R), pathLength: 1,
    fill: c, 'fill-opacity': 0, stroke: c,
    'stroke-width': 5, 'stroke-dasharray': 1,
    'stroke-dashoffset': 1}));

// two threads twist into one bond
function strand(ph, c) {
  let d = '';
  for (let y = 1310; y <= 1510; y += 6) {
    const x = CX + 90 * Math.sin(
      (y - 1310) / 24 + ph);
    d += (y < 1311 ? 'M' : 'L') + x + ' ' + y;
  }
  return mk('path', {d, pathLength: 1,
    fill: 'none', stroke: c,
    'stroke-width': 16,
    'stroke-linecap': 'round',
    'stroke-dasharray': 1,
    'stroke-dashoffset': 1});
}
const th = [strand(0, '#ff5a5f'),
  strand(Math.PI, '#ffd46b')];

// tilak + rice grains
const tilak = mk('circle',
  {cx: CX, cy: CY, r: 0, fill: '#e0112b'});
const grains = [...Array(16)].map(() =>
  mk('ellipse', {rx: 8, ry: 14,
    fill: '#fffbe8'}));
const heart =
  'M0 30C-50-5-30-45 0-18C30-45 50-5 0 30Z';
const hearts = [...Array(12)].map((_, i) =>
  mk('path', {d: heart, opacity: 0,
    fill: i % 2 ? '#ff5a5f' : '#ffd46b'}));
const T = {'text-anchor': 'middle',
  'font-family': 'Poppins',
  'font-weight': 800};
const title = mk('text', {...T, x: CX,
  y: 1630, 'font-size': 92,
  fill: '#ffd46b'}, 'HAPPY BHAI DOOJ');
const sub = mk('text', {...T, x: CX,
  y: 1712, 'font-size': 52,
  fill: '#ffe9a8'}, 'for the best brother');

function frame(t) {
  stars.forEach((s, i) =>
    s.setAttribute('opacity', .25 + .75
      * Math.abs(Math.sin(t * 1.5 + i))));
  petals.forEach((p, i) => {
    const s = .3 + i * 1.3;
    p.setAttribute('stroke-dashoffset',
      1 - ease((t - s) / 2));
    p.setAttribute('fill-opacity',
      .3 * ease((t - s - 2) / .8));
    p.setAttribute('transform', 'rotate('
      + t * (i % 2 ? -9 : 9) + ' '
      + CX + ' ' + CY + ')');
  });
  th.forEach((p, i) => p.setAttribute(
    'stroke-dashoffset',
    1 - ease((t - 6.5 - i * .5) / 2)));
  tilak.setAttribute('r', 46
    * ease((t - 8.6) / .8)
    * (1 + .08 * Math.sin(t * 5)));
  grains.forEach((g, i) => {
    const u = ease((t - 9.2 - i * .1) / .4);
    const a = i / 16 * TAU + t * .3;
    g.setAttribute('transform', 'translate('
      + (CX + 94 * Math.cos(a)) + ' '
      + (CY + 94 * Math.sin(a))
      + ') rotate(' + (a * 57.3 + 90)
      + ') scale(' + u + ')');
  });
  hearts.forEach((h, i) => {
    const u = (t - 9.5 - i * .5) / 5;
    const v = u - Math.floor(u);
    h.setAttribute('opacity',
      u < 0 ? 0 : Math.sin(v * Math.PI));
    h.setAttribute('transform', 'translate('
      + (CX + 300 * Math.sin(i * 2.1 + v * 5))
      + ' ' + (1500 - v * 1100)
      + ') scale(' + (.5 + v * .6) + ')');
  });
  title.setAttribute('opacity',
    ease((t - 9.6) / .6));
  sub.setAttribute('opacity',
    ease((t - 10.8) / .6));
}
const t0 = performance.now();
(function loop() {
  frame((performance.now() - t0) / 1000);
  requestAnimationFrame(loop);
})();
