/* Ananya & Chandan — "The Sealed Envelope" invite */
(() => {
'use strict';
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const rnd = (a, b) => a + Math.random() * (b - a);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const scroller = $('#scroller'), pages = $$('.page'), N = pages.length;

/* ---------- personalisation (?to=Name or ?guest=Name) ---------- */
const qs = new URLSearchParams(location.search);
let guest = (qs.get('to') || qs.get('guest') || '').replace(/\+/g, ' ').replace(/[<>]/g, '').trim().slice(0, 48);
if (guest) {
  guest = guest.replace(/\s+/g, ' ');
  $('#envguest').textContent = guest;
  $('#dear').innerHTML = '';
  const l1 = document.createElement('span'); l1.className = 'dear-line'; l1.textContent = 'Dear';
  const nm = document.createElement('span'); nm.className = 'guest'; nm.textContent = guest;
  const rl = document.createElement('span'); rl.className = 'guest-rule';
  const l2 = document.createElement('span'); l2.className = 'dear-line'; l2.textContent = 'you are warmly invited to the wedding of';
  $('#dear').append(l1, nm, rl, l2);
  $('#endguest').textContent = `Dear ${guest},`; $('#endguest').hidden = false;
}

/* ---------- scenery generators ---------- */
const SVGNS = 'http://www.w3.org/2000/svg';
function handwrite(host, text, { size = 40, stagger = .07, start = 0 } = {}) {
  const svg = document.createElementNS(SVGNS, 'svg'); svg.setAttribute('class', 'handwrite ' + (host.className || '')); svg.setAttribute('aria-label', text); svg.setAttribute('role', 'img');
  const t = document.createElementNS(SVGNS, 'text'); t.setAttribute('x', '50%'); t.setAttribute('y', size * .78); t.setAttribute('text-anchor', 'middle'); t.setAttribute('font-size', size);
  [...text].forEach((ch, i) => { const sp = document.createElementNS(SVGNS, 'tspan'); sp.textContent = ch; sp.style.setProperty('--dl', (start + i * stagger).toFixed(2) + 's'); t.appendChild(sp); });
  svg.appendChild(t); svg.setAttribute('height', size * 1.15); svg.setAttribute('width', '100%');
  if (host.id) svg.id = host.id;
  host.replaceWith(svg);
  // fit: shrink font if the text is wider than the host
  const fit = () => { try { const w = t.getComputedTextLength(), W = svg.clientWidth || svg.getBoundingClientRect().width; if (w > W * .96 && W) { const k = W * .96 / w; t.setAttribute('font-size', size * k); t.setAttribute('y', size * k * .78); svg.setAttribute('height', size * k * 1.15); } } catch (e) { } };
  (document.fonts ? document.fonts.load(`${size}px "Great Vibes"`).then(fit, fit) : Promise.resolve().then(fit));
  return svg;
}
function writeNames(text) {
  const envSize = Math.min(44, Math.max(26, innerWidth * .07));
  handwrite($('#envguest'), text, { size: envSize, stagger: .06, start: .9 });
}
if (guest) writeNames(guest); else writeNames('our dearest family & friends');
function petals(el, n) { if (!el) return; for (let i = 0; i < n; i++) { const p = document.createElement('i'); p.className = 'petal'; p.style.cssText = `left:${rnd(0, 100)}%;--t:${rnd(10, 18)}s;--dl:${rnd(-18, 0)}s;--sw:${rnd(-60, 60)}px;transform:scale(${rnd(.6, 1.2)})`; el.appendChild(p); } }
function stars(el, n, max) { if (!el) return; for (let i = 0; i < n; i++) { const s = document.createElement('i'); s.className = 'star'; const z = rnd(1, max); s.style.cssText = `left:${rnd(0, 100)}%;top:${rnd(0, 100)}%;width:${z}px;height:${z}px;--t:${rnd(2, 5)}s;--dl:${rnd(0, 4)}s`; el.appendChild(s); } }
function confetti(el) { if (!el) return; for (let i = 0; i < 40; i++) { const c = document.createElement('i'); c.className = 'confetti'; c.style.cssText = `left:${rnd(0, 100)}%;background:${['#F6C9D0', '#E9CF8E', '#CFE3F4', '#D9EBD9', '#C9A05A'][i % 5]};--t:${rnd(5, 9)}s;--dl:${rnd(-9, 0)}s;border-radius:${i % 3 ? 2 : 50}%`; el.appendChild(c); } }
function jasmine(el) { if (!el) return; for (let i = 0; i < 11; i++) { const s = document.createElement('i'); s.className = 'strand'; s.style.cssText = `left:${4 + i * 9.2}%;height:${rnd(12, 26)}vh;--dl:${rnd(-4, 0)}s`; el.appendChild(s); } }
petals($('#envpetals'), 10); petals($('#petals1'), 14); petals($('#petals2'), 8); petals($('#petals3'), 10); petals($('#petals9'), 8);
stars($('#stars5'), 50, 2.2); stars($('#stars9'), 60, 2.2);
confetti($('#confetti')); confetti($('#confetti2'));
jasmine($('#jasmine7'));
for (let i = 0; i < 7; i++) { const l = document.createElement('i'); l.className = 'lantern'; l.style.cssText = `left:${rnd(5, 95)}%;--t:${rnd(14, 22)}s;--dl:${rnd(-22, 0)}s;--sw:${rnd(-40, 40)}px;transform:scale(${rnd(.6, 1.1)})`; $('#lanterns').appendChild(l); }
for (let i = 0; i < 8; i++) { const f = document.createElement('i'); f.className = 'flash'; f.style.cssText = `left:${rnd(5, 95)}%;top:${rnd(20, 80)}%;--dl:${rnd(0, 6)}s`; $('#flashes').appendChild(f); }
(function bulbs() { const wire = $('#wire'), L = wire.getTotalLength(), svg = $('#lightsvg'); for (let i = 1; i <= 14; i++) { const pt = wire.getPointAtLength(L * i / 15); const st = document.createElementNS('http://www.w3.org/2000/svg', 'line'); st.setAttribute('x1', pt.x); st.setAttribute('y1', pt.y); st.setAttribute('x2', pt.x); st.setAttribute('y2', pt.y + 6); st.setAttribute('class', 'wire'); const b = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); b.setAttribute('cx', pt.x); b.setAttribute('cy', pt.y + 10); b.setAttribute('r', 4.5); b.setAttribute('class', 'bulb'); b.style.setProperty('--dl', (i * .37) + 's'); svg.appendChild(st); svg.appendChild(b); } })();
(function sparks() { const s = $('#sparks'); for (let i = 0; i < 18; i++) { const a = rnd(0, Math.PI * 2), r = rnd(50, 120); const e = document.createElement('i'); e.style.cssText = `--sx:${Math.cos(a) * r}px;--sy:${Math.sin(a) * r}px;animation-delay:${rnd(0, .15)}s`; s.appendChild(e); } })();
(function dust() { const d = $('#dust'); for (let i = 0; i < 26; i++) { const e = document.createElement('i'); e.style.cssText = `left:${rnd(0, 100)}%;top:${rnd(5, 100)}%;--t:${rnd(7, 13)}s;--dl:${rnd(-13, 0)}s;transform:scale(${rnd(.5, 1.3)})`; d.appendChild(e); } })();
(function mandala() { /* lotus mandala backdrop for the envelope page */
  const NS = 'http://www.w3.org/2000/svg', s = $('#mandala'); if (!s) return;
  const g = document.createElementNS(NS, 'g'); g.setAttribute('fill', 'none'); g.setAttribute('stroke', 'currentColor'); g.setAttribute('stroke-width', '1'); s.appendChild(g);
  const add = (t, a) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); g.appendChild(e); };
  const petal = (r, deg, w) => { const a = deg * Math.PI / 180, cx = 200, cy = 200, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r, nx = -Math.sin(a) * w / 2, ny = Math.cos(a) * w / 2, bx = cx + Math.cos(a) * r * .25, by = cy + Math.sin(a) * r * .25, mx = Math.cos(a) * r * .4, my = Math.sin(a) * r * .4; add('path', { d: `M${bx} ${by} Q ${bx + nx * 1.6 + mx} ${by + ny * 1.6 + my} ${x} ${y} Q ${bx - nx * 1.6 + mx} ${by - ny * 1.6 + my} ${bx} ${by}z` }); };
  [[190, 20, 0], [150, 16, 11], [110, 12, 0], [72, 8, 22]].forEach(([r, n, o]) => { for (let i = 0; i < n; i++) petal(r, 360 / n * i + o, r * .42); });
  [196, 150, 22].forEach(r => add('circle', { cx: 200, cy: 200, r }));
})();

/* ---------- envelope ---------- */
const env = $('#env'), seal = $('#seal');
let opened = false;
function openEnvelope() {
  if (opened) return; opened = true;
  seal.classList.add('crack'); $('#envhint').style.opacity = 0;
  const t = reduced ? 0 : 1;
  setTimeout(() => env.classList.add('open'), 250 * t);
  setTimeout(() => env.classList.add('fly'), 1700 * t);
  setTimeout(() => { document.body.classList.add('open'); document.body.classList.remove('sealed'); scroller.removeAttribute('inert'); scroller.focus({ preventScroll: true }); placeFirefly(0); coverWrite(); }, 2000 * t);
  setTimeout(() => $('#envelope').remove(), 4200 * t);
}
seal.addEventListener('click', openEnvelope);
window.addEventListener('keydown', e => { if (!opened && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openEnvelope(); } });
/* deep link: ?open=1 skips the envelope, ?p=N lands on page N (0-based) */
if (qs.get('open') === '1') {
  opened = true; document.body.classList.add('open'); document.body.classList.remove('sealed'); scroller.removeAttribute('inert'); $('#envelope').remove();
  const p = Math.min(N - 1, Math.max(0, parseInt(qs.get('p') || '0', 10) || 0));
  if (p) { scroller.style.scrollBehavior = 'auto'; pages[p].scrollIntoView(); setTimeout(() => scroller.style.scrollBehavior = '', 50); }
  setTimeout(() => placeFirefly(p), 50); coverWrite();
}
if (qs.get('demo') === 'open') setTimeout(openEnvelope, 1200);

/* ---------- navigation: jasmine garland ---------- */
const garland = $('#garland');
pages.forEach((pg, i) => {
  const b = document.createElement('button');
  b.innerHTML = `<svg class="bd" viewBox="0 0 20 20"><use href="#bud"/></svg><svg class="bl" viewBox="0 0 40 40"><use href="#jasmine"/></svg><span>${pg.dataset.title}</span>`;
  b.setAttribute('aria-label', pg.dataset.title);
  b.onclick = () => pg.scrollIntoView({ behavior: 'smooth' });
  garland.appendChild(b);
});
const io = new IntersectionObserver(es => {
  es.forEach(e => {
    if (!e.isIntersecting) return;
    pages.forEach(p => p.classList.remove('active')); e.target.classList.add('active');
    const i = pages.indexOf(e.target);
    $$('#garland button').forEach((b, j) => b.classList.toggle('on', i === j));
    garland.style.setProperty('--navcol', getComputedStyle(e.target).color);
    if (document.body.classList.contains('open')) placeFirefly(i);
    if (e.target.classList.contains('pg-venue')) loadMap();
    if (e.target.classList.contains('pg-travel')) loadSpotify();
  });
}, { root: scroller, threshold: .5 });
pages.forEach(p => io.observe(p));
window.addEventListener('keydown', e => {
  if (!opened || $('#calpop').classList.contains('open')) return;
  const i = pages.findIndex(p => p.classList.contains('active'));
  if (['ArrowDown', 'PageDown'].includes(e.key)) { e.preventDefault(); pages[Math.min(N - 1, i + 1)].scrollIntoView(); }
  if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); pages[Math.max(0, i - 1)].scrollIntoView(); }
});
$$('.timeline li').forEach(li => li.onclick = () => { const t = $('.' + li.dataset.go); if (t) t.scrollIntoView({ behavior: 'smooth' }); });

/* ---------- firefly guide ---------- */
const ff = $('#firefly');
function placeFirefly(i) {
  const [x, y] = (pages[i].dataset.fx || '50,50').split(',').map(Number);
  ff.style.left = x + '%'; ff.style.top = y + '%';
  if (reduced) return;
  let k = 0; const tr = setInterval(() => { const b = document.createElement('b'); ff.appendChild(b); setTimeout(() => b.remove(), 1400); if (++k > 14) clearInterval(tr); }, 120);
}

/* ---------- tilt / pointer parallax ---------- */
const root = document.documentElement; let idle = true, t0 = performance.now();
function setTilt(x, y) { root.style.setProperty('--tx', Math.max(-1, Math.min(1, x)).toFixed(3)); root.style.setProperty('--ty', Math.max(-1, Math.min(1, y)).toFixed(3)); }
window.addEventListener('mousemove', e => { idle = false; setTilt((e.clientX / innerWidth - .5) * 2, (e.clientY / innerHeight - .5) * 2); });
function onOrient(e) { if (e.gamma == null) return; idle = false; setTilt(e.gamma / 30, (e.beta - 45) / 30); }
const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
if (isIOS && typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
  const tb = $('#tiltbtn'); tb.style.display = 'block';
  tb.onclick = () => DeviceOrientationEvent.requestPermission().then(r => { if (r === 'granted') { window.addEventListener('deviceorientation', onOrient); tb.remove(); } }).catch(() => tb.remove());
} else { window.addEventListener('deviceorientation', onOrient); }
if (!reduced) (function breathe(t) { if (idle) setTilt(Math.sin((t - t0) / 2600) * .5, Math.cos((t - t0) / 3400) * .3); requestAnimationFrame(breathe); })(t0);

/* ---------- countdown ---------- */
const T = { recep: new Date('2026-12-03T19:30:00+05:30'), muh: new Date('2026-12-04T08:30:00+05:30'), muhEnd: new Date('2026-12-04T09:15:00+05:30') };
const pad = n => String(n).padStart(2, '0');
/* preview helper: ?at=2026-12-03T20:00:00+05:30 freezes the clock at that moment */
const atParam = qs.get('at'), frozen = atParam && !isNaN(new Date(atParam)) ? new Date(atParam) : null;
const now = () => frozen || new Date();
const parts = ms => { ms = Math.abs(ms); return { d: Math.floor(ms / 864e5), h: Math.floor(ms % 864e5 / 36e5), m: Math.floor(ms % 36e5 / 6e4), s: Math.floor(ms % 6e4 / 1e3) }; };
function tick() {
  const n = now(), grid = $('#cdgrid'), main = $('#cdmain'), sub = $('#cdsub'), lbl = $('#cdlabel'); let st;
  if (n < T.recep) { st = 'pre'; const p = parts(T.recep - n); lbl.textContent = 'The celebrations begin in'; grid.style.display = 'flex'; main.style.display = 'none'; $('#dd').textContent = pad(p.d); $('#hh').textContent = pad(p.h); $('#mm').textContent = pad(p.m); $('#ss').textContent = pad(p.s); sub.textContent = 'Reception · Thursday 3 December · 7:30 PM'; }
  else if (n < T.muh) { st = 'recep'; const p = parts(T.muh - n); lbl.textContent = 'Tonight'; grid.style.display = 'none'; main.style.display = 'block'; main.innerHTML = 'Welcome to the<br><span class="script" style="font-size:1.25em">Reception</span> ✨'; sub.textContent = `The muhurtam is in ${p.h}h ${pad(p.m)}m — see you at sunrise`; }
  else if (n < T.muhEnd) { st = 'muh'; lbl.textContent = 'Right now'; grid.style.display = 'none'; main.style.display = 'block'; main.innerHTML = 'The knot is<br>being tied'; sub.textContent = '8:30 – 9:15 AM · Gundi Mahadevappa Kalyana Mandira'; }
  else { st = 'married'; lbl.textContent = 'Happily ever after'; grid.style.display = 'none'; main.style.display = 'block'; main.innerHTML = '<span class="script" style="font-size:1.25em">Ananya &amp; Chandan</span><br>are married 💍'; sub.textContent = 'Thank you for your love and blessings'; }
  if (st !== document.body.dataset.state) {
    document.body.dataset.state = st;
    if (st === 'married') { $('#endmain').textContent = 'Happily ever after'; $('#endsub').textContent = 'Thank you for your love and blessings'; }
  }
}
setInterval(tick, 1000); tick();

/* ---------- Google Calendar ---------- */
const VENUE = 'Gundi Mahadevappa Kalyana Mandira, Dental College Road, MCC B Block, Davanagere 577004';
const SITE = location.origin + location.pathname;
const EV = [
  { id: 'reception', t: 'Reception — Ananya & Chandan', when: 'Thu 3 Dec · 7:30 PM', s: '20261203T140000Z', e: '20261203T173000Z' },
  { id: 'muhurtam', t: 'Muhurtam — Ananya & Chandan', when: 'Fri 4 Dec · 8:30 – 9:15 AM', s: '20261204T030000Z', e: '20261204T034500Z' },
  { id: 'lunch', t: 'Reception & Lunch — Ananya & Chandan', when: 'Fri 4 Dec · 12:30 PM', s: '20261204T070000Z', e: '20261204T103000Z' }];
const gcal = e => `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(e.t)}&dates=${e.s}/${e.e}&location=${encodeURIComponent(VENUE)}&details=${encodeURIComponent('Wedding celebrations of Ananya N Acharya & Chandan V P.\nInvitation: ' + SITE)}&ctz=Asia/Kolkata`;
const GICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="17" rx="3" fill="#fff" stroke="#B8933F"/><path d="M3 9h18" stroke="#B8933F"/><path d="M8 2v4M16 2v4" stroke="#B8933F" stroke-linecap="round"/><text x="12" y="18" font-size="7.5" text-anchor="middle" fill="#4A2E36" font-family="Jost,Arial">04</text></svg>';
$('#calrows').innerHTML = EV.map(e => `<a class="calrow" id="cal-${e.id}" href="${gcal(e)}" target="_blank" rel="noopener"><div><strong>${e.t.split(' — ')[0]}</strong><small>${e.when}</small></div><span class="g">${GICON}Add</span></a>`).join('');
const pop = $('#calpop');
function openCal(focus) { pop.classList.add('open'); const el = focus && $('#cal-' + focus); (el || $('#calclose')).focus(); if (el) { el.style.background = 'rgba(184,147,63,.1)'; setTimeout(() => el.style.background = '', 1500); } }
$$('[data-cal]').forEach(b => b.onclick = () => openCal(b.dataset.cal));
$('#calclose').onclick = () => pop.classList.remove('open');
pop.addEventListener('click', e => { if (e.target === pop) pop.classList.remove('open'); });
window.addEventListener('keydown', e => { if (e.key === 'Escape') pop.classList.remove('open'); });

/* ---------- map (lazy) ---------- */
let mapLoaded = false;
function loadMap() { if (mapLoaded) return; mapLoaded = true; const f = $('#gmap'); f.src = f.dataset.src; }
let spotifyLoaded = false;
function loadSpotify() { if (spotifyLoaded) return; spotifyLoaded = true; const f = $('#spotify'); if (f) f.src = f.dataset.src; }
function coverWrite() { if (coverWrite.done) return; coverWrite.done = true; const g = $('.dear .guest'); if (g) handwrite(g, guest, { size: Math.min(60, Math.max(34, innerWidth * .095)), stagger: .07, start: .4 }); }

/* ---------- share ---------- */
$('#share').onclick = async () => {
  const url = SITE; const data = { title: 'Ananya & Chandan — Wedding Invitation', text: 'You are invited! 3 & 4 December 2026, Davanagere.', url };
  if (navigator.share) { try { await navigator.share(data); } catch (e) { } }
  else { try { await navigator.clipboard.writeText(url); $('#share').textContent = 'Link copied'; setTimeout(() => $('#share').textContent = 'Share invite', 1800); } catch (e) { } }
};

/* ---------- living paintings: animated light layers over each illustration ---------- */
(function living() {
  // positions are % of the 3:2 frame, matched to the artwork
  const SCENES = {
    reception: { bulbs: [[36, 30], [41, 38], [46, 33], [50, 22], [55, 32], [60, 37], [66, 31], [71, 25], [33, 24], [68, 20]], lamps: [[9, 48], [12, 53], [16, 48], [67, 50], [74, 49]], stars: 18, petals: 7, sheen: true },
    muhurtam: { flames: [[21, 60], [33, 56], [74, 58], [82, 62]], sun: [50, 40], rays: [50, 40], petals: 8, sheen: true },
    lunch: { bulbs: [[36, 30], [41, 36], [46, 32], [52, 24], [56, 31], [61, 36], [66, 30], [70, 25]], lamps: [[9, 46], [12, 51], [16, 46]], sun: [78, 8], sparkles: 6, petals: 8, sheen: true },
    venue: { sun: [12, 16], birds: 2, petals: 5, sheen: true }
  };
  $$('.hero.living').forEach(h => {
    const sc = SCENES[h.dataset.living]; if (!sc) return;
    const layer = document.createElement('div'); layer.className = 'fxlayer'; const fx = document.createElement('div'); fx.className = 'fx'; layer.appendChild(fx); h.appendChild(layer);
    const add = (cls, x, y, css = '') => { const e = document.createElement('i'); e.className = cls; e.style.cssText = `left:${x}%;top:${y}%;${css}`; fx.appendChild(e); return e; };
    if (sc.rays) add('ray', 0, 0, `--cx:${sc.rays[0]}%;--cy:${sc.rays[1]}%`);
    if (sc.sun) add('sunglow', sc.sun[0], sc.sun[1]);
    (sc.stars ? [...Array(sc.stars)] : []).forEach(() => { const z = rnd(1, 2.2); add('star', rnd(2, 98), rnd(2, 26), `width:${z}px;height:${z}px;--t:${rnd(2, 5)}s;--dl:${rnd(0, 4)}s;position:absolute`); });
    (sc.lamps || []).forEach(([x, y], i) => add('lamp', x, y, `--t:${rnd(2.6, 3.8)}s;--dl:${-i * .7}s`));
    (sc.bulbs || []).forEach(([x, y], i) => add('bulb', x, y, `--t:${rnd(2, 3.4)}s;--dl:${-i * .43}s`));
    (sc.flames || []).forEach(([x, y], i) => add('flame', x, y, `--dl:${-i * .35}s`));
    [...Array(sc.sparkles || 0)].forEach(() => add('sparkle', rnd(10, 90), rnd(15, 75), `--dl:${rnd(0, 5)}s`));
    [...Array(sc.petals || 0)].forEach(() => { const p = add('petal', rnd(0, 100), -8, `--t:${rnd(9, 15)}s;--dl:${rnd(-15, 0)}s;--sw:${rnd(-40, 40)}px;transform:scale(${rnd(.5, .9)})`); p.style.position = 'absolute'; });
    [...Array(sc.birds || 0)].forEach((_, i) => { const b = document.createElementNS(SVGNS, 'svg'); b.setAttribute('class', 'bird'); b.setAttribute('viewBox', '0 0 26 10'); b.style.cssText = `--dl:${-i * 11}s;top:${14 + i * 9}%;left:-6%;width:${14 - i * 3}px;position:absolute`; b.innerHTML = '<path d="M1 6 q6 -7 12 0 q6 -7 12 0" fill="none" stroke="#8A5F3C" stroke-width="1.2" stroke-linecap="round"/>'; fx.appendChild(b); });
    if (sc.sheen) add('sheen', 0, 0);
  });
})();

/* ---------- save my invite: keepsake card (1080×1920) with the guest's name + QR ---------- */
(function keepsake() {
  const btn = $('#savecard'); if (!btn) return;
  const MY_URL = SITE + (guest ? '?to=' + encodeURIComponent(guest).replace(/%20/g, '+') : '');
  const loadQR = () => new Promise((res, rej) => { if (window.qrcode) return res(); const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js'; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
  const loadImg = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  const BRANCH = 'M4 110 C 50 90 110 70 196 40 M40 96 q 10 -24 24 -16 q -10 12 -24 16 M70 86 q 4 18 20 16 q -6 -12 -20 -16 M100 74 q 10 -24 24 -16 q -10 12 -24 16 M130 64 q 4 18 20 16 q -6 -12 -20 -16 M160 52 q 10 -22 24 -14 q -10 12 -24 14';
  function branch(ctx, x, y, rot, flip, s) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(flip ? -s : s, s); ctx.strokeStyle = '#B8933F'; ctx.lineWidth = 1.6; ctx.lineCap = 'round'; ctx.stroke(new Path2D(BRANCH)); ctx.fillStyle = '#B8933F'; [[58, 78, 1], [118, 58, .8], [176, 40, .65]].forEach(([bx, by, k]) => { for (let a = 0; a < 4; a++) { ctx.beginPath(); ctx.ellipse(bx + Math.cos(a * Math.PI / 2) * 7 * k, by + Math.sin(a * Math.PI / 2) * 7 * k, 5 * k, 2.6 * k, a * Math.PI / 2, 0, 7); ctx.fill(); } }); ctx.restore(); }
  async function build() {
    const W = 1080, H = 1920, cv = document.createElement('canvas'); cv.width = W; cv.height = H; const c = cv.getContext('2d');
    if (document.fonts) await Promise.all(['italic 60px "Playfair Display"', '70px "Great Vibes"', '300 40px "Cormorant Garamond"', '300 30px Jost'].map(f => document.fonts.load(f).catch(() => { })));
    const g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#EBC4C2'); g.addColorStop(.5, '#F6E3E3'); g.addColorStop(1, '#FFF6F3'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    const rg = c.createRadialGradient(W / 2, 520, 50, W / 2, 520, 600); rg.addColorStop(0, 'rgba(255,255,255,.7)'); rg.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = rg; c.fillRect(0, 0, W, H);
    // couple illustration, faded in at the bottom
    try { const im = await loadImg('artwork/couple.jpg'); const ih = 760, iw = ih * im.width / im.height; c.save(); c.globalAlpha = .95; c.drawImage(im, (W - iw) / 2, H - ih - 170, iw, ih); c.restore(); const fg = c.createLinearGradient(0, H - ih - 170, 0, H - ih + 160); fg.addColorStop(0, 'rgba(246,227,227,1)'); fg.addColorStop(1, 'rgba(246,227,227,0)'); c.fillStyle = fg; c.fillRect(0, H - ih - 180, W, 340); const sg = c.createLinearGradient((W - iw) / 2 - 10, 0, (W - iw) / 2 + 140, 0); sg.addColorStop(0, 'rgba(248,232,232,1)'); sg.addColorStop(1, 'rgba(248,232,232,0)'); c.fillStyle = sg; c.fillRect(0, H - ih - 170, (W - iw) / 2 + 140, ih); const sg2 = c.createLinearGradient((W + iw) / 2 + 10, 0, (W + iw) / 2 - 140, 0); sg2.addColorStop(0, 'rgba(250,236,236,1)'); sg2.addColorStop(1, 'rgba(250,236,236,0)'); c.fillStyle = sg2; c.fillRect((W + iw) / 2 - 140, H - ih - 170, W, ih); } catch (e) { }
    // gold frame + botanical corners
    c.strokeStyle = 'rgba(184,147,63,.55)'; c.lineWidth = 2; c.strokeRect(54, 54, W - 108, H - 108);
    branch(c, 40, 190, -.2, true, 1.6); branch(c, W - 40, H - 190, Math.PI - .2, true, 1.6);
    // monogram
    c.save(); c.translate(W / 2, 300); c.strokeStyle = '#8E6B3A'; c.lineWidth = 3; c.beginPath(); c.arc(0, 0, 92, 0, 7); c.stroke(); c.fillStyle = '#8E6B3A'; c.textAlign = 'center'; c.font = '300 126px "Cormorant Garamond", Georgia, serif'; c.fillText('A', -16, 32); c.font = '300 110px "Cormorant Garamond", Georgia, serif'; c.fillText('C', 26, 47); c.restore();
    c.textAlign = 'center'; c.fillStyle = '#8E5F69';
    const caps = (txt, y, px = 26) => { c.font = `300 ${px}px Jost, Arial, sans-serif`; c.fillText(txt.split('').join('\u2009'), W / 2, y); };
    c.fillStyle = '#6B3F4C'; c.font = 'italic 36px "Cormorant Garamond", Georgia, serif'; c.fillText(guest ? 'Dear' : 'With joy in our hearts', W / 2, 470);
    if (guest) { let px = 96; c.font = `300 ${px}px "Great Vibes", cursive`; while (c.measureText(guest).width > 900 && px > 44) { px -= 4; c.font = `300 ${px}px "Great Vibes", cursive`; } c.fillStyle = '#5A2F3C'; c.fillText(guest, W / 2, 580); }
    c.fillStyle = '#8E5F69'; c.font = 'italic 36px "Cormorant Garamond", Georgia, serif'; c.fillText('you are warmly invited to the wedding of', W / 2, guest ? 660 : 540);
    const y0 = guest ? 770 : 650; c.fillStyle = '#5A2F3C'; c.font = 'italic 78px "Playfair Display", Georgia, serif'; c.fillText('Ananya N Acharya', W / 2, y0); c.fillStyle = '#B8933F'; c.font = '300 64px "Great Vibes", cursive'; c.fillText('&', W / 2, y0 + 80); c.fillStyle = '#5A2F3C'; c.font = 'italic 78px "Playfair Display", Georgia, serif'; c.fillText('Chandan V P', W / 2, y0 + 170);
    // rule
    c.strokeStyle = '#B8933F'; c.lineWidth = 2; c.beginPath(); c.moveTo(W / 2 - 60, y0 + 225); c.lineTo(W / 2 + 60, y0 + 225); c.stroke();
    c.fillStyle = '#4A2E36'; caps('03 & 04 DECEMBER 2026', y0 + 290, 30); c.fillStyle = '#8E5F69'; caps('GUNDI MAHADEVAPPA KALYANA MANDIRA · DAVANAGERE', y0 + 335, 20);
    c.fillStyle = '#4A2E36'; c.font = 'italic 34px "Cormorant Garamond", Georgia, serif'; c.fillText('Reception · Thu 3 Dec · 7:30 PM onwards', W / 2, y0 + 400); c.fillText('Muhurtam · Fri 4 Dec · 8:30 – 9:15 AM', W / 2, y0 + 448); c.fillText('Reception & Lunch · Fri 4 Dec · 12:30 PM onwards', W / 2, y0 + 496);
    // QR with the personalised link
    try { await loadQR(); const q = qrcode(0, 'M'); q.addData(MY_URL); q.make(); const n = q.getModuleCount(), S = 150, m = S / n, qx = W / 2 - S / 2, qy = H - 330; c.fillStyle = 'rgba(255,251,247,.92)'; c.beginPath(); c.roundRect(qx - 16, qy - 16, S + 32, S + 32, 18); c.fill(); c.fillStyle = '#4A2E36'; for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) if (q.isDark(r, k)) c.fillRect(qx + k * m, qy + r * m, m + .4, m + .4); c.fillStyle = '#6B3F4C'; caps('SCAN TO OPEN YOUR INVITATION', H - 130, 18); } catch (e) { }
    c.fillStyle = '#8E5F69'; caps('WITH LOVE · ANANYA & CHANDAN', H - 90, 18);
    return cv;
  }
  btn.onclick = async () => {
    btn.classList.add('busy'); const label = btn.textContent; btn.textContent = 'Preparing…';
    try {
      const cv = await build(); const blob = await new Promise(r => cv.toBlob(r, 'image/png'));
      const file = new File([blob], 'Ananya-Chandan-wedding-invite.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: 'Ananya & Chandan — Wedding Invitation' }); } catch (e) { } }
      else { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = file.name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); }
    } finally { btn.classList.remove('busy'); btn.textContent = label; }
  };
  /* preview helper: ?card=1 renders the keepsake card full-screen instead of the site */
  if (qs.get('card') === '1') build().then(cv => { document.body.innerHTML = ''; document.body.style.cssText = 'background:#333;overflow:auto'; cv.style.cssText = 'display:block;margin:0 auto;max-width:100%;height:auto'; document.body.appendChild(cv); });
})();
})();
