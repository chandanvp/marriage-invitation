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
  const l2 = document.createElement('span'); l2.className = 'dear-line'; l2.textContent = 'you are warmly invited to the wedding of';
  $('#dear').append(l1, nm, l2);
  $('#endguest').textContent = `Dear ${guest},`; $('#endguest').hidden = false;
}

/* ---------- scenery generators ---------- */
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
  setTimeout(() => { document.body.classList.add('open'); document.body.classList.remove('sealed'); scroller.removeAttribute('inert'); scroller.focus({ preventScroll: true }); placeFirefly(0); }, 2000 * t);
  setTimeout(() => $('#envelope').remove(), 4200 * t);
}
seal.addEventListener('click', openEnvelope);
window.addEventListener('keydown', e => { if (!opened && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openEnvelope(); } });
/* deep link: ?open=1 skips the envelope, ?p=N lands on page N (0-based) */
if (qs.get('open') === '1') {
  opened = true; document.body.classList.add('open'); document.body.classList.remove('sealed'); scroller.removeAttribute('inert'); $('#envelope').remove();
  const p = Math.min(N - 1, Math.max(0, parseInt(qs.get('p') || '0', 10) || 0));
  if (p) { scroller.style.scrollBehavior = 'auto'; pages[p].scrollIntoView(); setTimeout(() => scroller.style.scrollBehavior = '', 50); }
  setTimeout(() => placeFirefly(p), 50);
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

/* ---------- share ---------- */
$('#share').onclick = async () => {
  const url = SITE; const data = { title: 'Ananya & Chandan — Wedding Invitation', text: 'You are invited! 3 & 4 December 2026, Davanagere.', url };
  if (navigator.share) { try { await navigator.share(data); } catch (e) { } }
  else { try { await navigator.clipboard.writeText(url); $('#share').textContent = 'Link copied'; setTimeout(() => $('#share').textContent = 'Share invite', 1800); } catch (e) { } }
};
})();
