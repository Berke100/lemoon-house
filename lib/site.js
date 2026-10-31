// Lemoon House — all page behaviour in plain DOM code.
// Dependencies are passed in, so the same file runs inside Next.js (npm gsap)
// and as a standalone page (gsap from a CDN).

const FRAME_COUNT = 241;
const VIDEO_SECONDS = 10;
const CHAPTERS = 4;
const PORTRAIT_LIMIT = 0.85; // viewport w/h at or below this → video fills the screen

const pad = (n, l = 2) => String(n).padStart(l, '0');
const frameSrc = (i) => `frames/f${pad(i + 1, 3)}.webp`;

export function initSite(gsap, ScrollTrigger) {
  const ac = new AbortController();
  const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, { signal: ac.signal, ...(opts || {}) });
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cleanups = [() => ac.abort()];

  initNav(on, $, $$, reduceMotion);
  initReveal(cleanups, $$);
  initBooking(on, $);
  initContact(on, $);
  initDocs(on, $, $$);
  initMobileBar(on, $);

  const canvas = $('#stage-canvas');
  const canScrub = !!(canvas && canvas.getContext && canvas.getContext('2d') && gsap && ScrollTrigger);

  // The tour is driven only by the visitor's own scrolling, so it stays on with reduced motion;
  // only decorative motion is reduced. The static layout is the fallback when scrubbing can't run.
  if (!canScrub) {
    root.classList.add('is-static');
    cleanups.push(initRooms({ on, $, $$, reduce: reduceMotion }));
    return () => cleanups.forEach((fn) => fn());
  }

  const tour = initTour({ gsap, ScrollTrigger, on, $, $$, root, reduceMotion });
  cleanups.push(tour);
  // created after the tour so the two pinned sections stack in page order
  cleanups.push(initRooms({ on, $, $$, gsap, ScrollTrigger, reduce: reduceMotion }));
  return () => cleanups.forEach((fn) => fn());
}

/* ------------------------------------------------------------------ */
/* Scroll-scrubbed tour                                                */
/* ------------------------------------------------------------------ */
function initTour({ gsap, ScrollTrigger, on, $, $$, root, reduceMotion }) {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const stageWrap = $('#stage-wrap');
  const stage = $('#stage');
  const canvas = $('#stage-canvas');
  const ctx = canvas.getContext('2d');
  const poster = $('#stage-poster');
  const loader = $('#loader');
  const loaderFill = $('#loader-fill');
  const loaderText = $('#loader-text');
  const hint = $('#hint');
  const fade = $('#stage-fade');
  const chapters = $$('.chapter');
  const railItems = $$('.rail__item');
  const railFills = $$('.rail__fill');
  const tcTime = $('#tc-time');

  /* ---- frame loading: coarse to fine, so scrubbing works early ---- */
  const images = new Array(FRAME_COUNT);
  const ready = new Uint8Array(FRAME_COUNT);
  const order = [];
  const seen = new Set();
  const push = (i) => { if (i < FRAME_COUNT && !seen.has(i)) { seen.add(i); order.push(i); } };
  push(0);
  for (let i = 0; i < FRAME_COUNT; i += 12) push(i);
  push(FRAME_COUNT - 1);
  const firstPass = order.length;
  const firstSet = new Set(order);
  for (let step of [4, 2, 1]) for (let i = 0; i < FRAME_COUNT; i += step) push(i);

  let loadedCount = 0;
  let firstPassDone = 0;
  let failed = 0;
  let cursor = 0;
  let destroyed = false;
  let loaderDone = false;

  const finishLoader = () => {
    if (loaderDone) return;
    loaderDone = true;
    loader.classList.add('is-done');
    ScrollTrigger.refresh();
  };

  const loadNext = () => {
    if (destroyed || cursor >= order.length) return;
    const i = order[cursor++];
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      if (destroyed) return;
      images[i] = img;
      ready[i] = 1;
      loadedCount++;
      if (firstSet.has(i)) firstPassDone++;
      const pct = Math.min(100, Math.round((firstPassDone / firstPass) * 100));
      loaderFill.style.transform = `scaleX(${pct / 100})`;
      loaderText.textContent = `Tur hazırlanıyor · %${pct}`;
      if (firstPassDone >= firstPass) finishLoader();
      if (Math.abs(i - current) < Math.abs(shown - current) || shown < 0) draw(current, true);
      loadNext();
    };
    img.onerror = () => {
      failed++;
      if (i === 0 || failed > 12) fallbackToStatic();
      loadNext();
    };
    img.src = frameSrc(i);
  };
  for (let k = 0; k < 6; k++) loadNext();
  const safety = setTimeout(() => { if (ready[0]) finishLoader(); }, 9000);

  function fallbackToStatic() {
    if (destroyed) return;
    root.classList.add('is-static');
    loader.classList.add('is-done');
    teardown();
    ScrollTrigger.refresh();
  }

  const nearest = (i) => {
    if (ready[i]) return i;
    for (let d = 1; d < FRAME_COUNT; d++) {
      if (i - d >= 0 && ready[i - d]) return i - d;
      if (i + d < FRAME_COUNT && ready[i + d]) return i + d;
    }
    return -1;
  };

  /* ---- drawing ---- */
  let current = 0;
  let shown = -1;
  let cw = 0, ch = 0, dpr = 1;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cw = stage.clientWidth;
    ch = stage.clientHeight;
    canvas.width = Math.round(cw * dpr);
    canvas.height = Math.round(ch * dpr);
    draw(current, true);
  };

  function draw(i, force) {
    current = i;
    const n = nearest(i);
    if (n < 0 || (!force && n === shown)) return;
    const img = images[n];
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const W = canvas.width, H = canvas.height;
    // always fill the screen edge to edge (no letterbox, no blurred side panels)
    const s = Math.max(W / iw, H / ih);
    const dw = iw * s, dh = ih * s;
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
    shown = n;
    if (!poster.hidden) poster.hidden = true;
  }

  resize();
  on(window, 'resize', () => { resize(); });

  /* ---- timeline ---- */
  const state = { f: 0 };
  let hintGone = false;
  let activeChapter = 0;

  const updateUI = (p) => {
    const a = Math.min(CHAPTERS - 1, Math.floor(p * CHAPTERS + 1e-6));
    if (a !== activeChapter) {
      activeChapter = a;
      railItems.forEach((el, i) => {
        el.classList.toggle('is-active', i === a);
        if (i === a) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current');
      });
      chapters.forEach((el, i) => el.setAttribute('aria-hidden', i === a ? 'false' : 'true'));
    }
    railFills.forEach((el, i) => {
      const local = Math.min(1, Math.max(0, p * CHAPTERS - i));
      el.style.transform = `scaleY(${local})`;
    });
    const t = p * VIDEO_SECONDS;
    tcTime.textContent = `00:${pad(Math.floor(t))}.${Math.floor((t % 1) * 10)}`;
    if (!hintGone && p > 0.004) { hintGone = true; hint.classList.add('is-hidden'); }
  };

  const scrollLength = () => Math.round(window.innerHeight * (stage.clientWidth / stage.clientHeight <= PORTRAIT_LIMIT ? 5 : 6));

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    onUpdate: () => updateUI(tl.progress()),
    scrollTrigger: {
      trigger: stageWrap,
      start: 'top top',
      end: () => '+=' + scrollLength(),
      pin: true,
      scrub: reduceMotion ? true : 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.to(state, { f: FRAME_COUNT - 1, duration: 1, onUpdate: () => draw(Math.round(state.f)) }, 0);

  const SEG = 1 / CHAPTERS;
  const T = 0.035;
  chapters.forEach((el, i) => {
    if (i > 0) tl.fromTo(el, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: T, ease: 'power2.out', immediateRender: false }, i * SEG - 0.004);
    if (i < CHAPTERS - 1) tl.to(el, { autoAlpha: 0, y: -18, duration: T, ease: 'power1.in' }, (i + 1) * SEG - T - 0.004);
  });
  // closing: the last chapter steps back, the room dissolves into the page
  tl.to(chapters[CHAPTERS - 1], { autoAlpha: 0, y: -18, duration: 0.03, ease: 'power1.in' }, 0.955);
  tl.to(fade, { opacity: 1, duration: 0.06 }, 0.94);
  tl.to('#rail, .timecode', { autoAlpha: 0, duration: 0.03 }, 0.96);

  /* ---- rail navigation ---- */
  railItems.forEach((el, i) => {
    on(el, 'click', () => {
      const st = tl.scrollTrigger;
      const p = [0, 0.31, 0.56, 0.86][i];
      window.scrollTo({ top: st.start + p * (st.end - st.start), behavior: 'smooth' });
    });
  });

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => !destroyed && ScrollTrigger.refresh());

  function teardown() {
    if (destroyed) return;
    destroyed = true;
    clearTimeout(safety);
    if (tl.scrollTrigger) tl.scrollTrigger.kill(true);
    tl.kill();
  }
  return teardown;
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
function initNav(on, $, $$, reduceMotion) {
  const nav = $('#nav');
  const toggle = $('#nav-toggle');
  const overview = $('#genel-bakis');
  if (!nav) return;

  const setMode = () => {
    const solid = overview.getBoundingClientRect().top <= nav.offsetHeight + 1;
    nav.classList.toggle('nav--solid', solid);
    nav.classList.toggle('nav--over', !solid);
  };
  setMode();
  on(window, 'scroll', setMode, { passive: true });
  on(window, 'resize', setMode);

  const close = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menüyü aç');
  };
  on(toggle, 'click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  });
  on(document, 'keydown', (e) => { if (e.key === 'Escape') close(); });

  // in-page links: smooth, without touching the address bar
  $$('a[href^="#"]').forEach((a) => {
    on(a, 'click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = id && document.getElementById(id);
      if (!target) { e.preventDefault(); return; }
      e.preventDefault();
      close();
      const top = id === 'kesfet' ? 0 : target.getBoundingClientRect().top + window.scrollY - (id === 'genel-bakis' ? 0 : nav.offsetHeight - 1);
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
      if (id !== 'kesfet') {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
}

/* ------------------------------------------------------------------ */
/* Soft reveal of content blocks (only for blocks below the fold)       */
/* ------------------------------------------------------------------ */
function initReveal(cleanups, $$) {
  if (!('IntersectionObserver' in window)) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js-reveal');
  // Only blocks that start below the fold are hidden; everything on screen at load stays visible.
  const below = (el) => el.getBoundingClientRect().top > window.innerHeight;
  const els = $$('.reveal').filter(below);
  if (!reduce) els.forEach((el) => el.classList.add('is-pending'));
  const io = new IntersectionObserver((entries) => {
    // blocks that arrive together come in one after another
    entries.filter((en) => en.isIntersecting).forEach((en, i) => {
      en.target.style.transitionDelay = `${Math.min(i, 5) * 90}ms`;
      en.target.classList.remove('is-pending');
      en.target.dispatchEvent(new CustomEvent('revealed'));
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  els.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
  initRatings(cleanups, $$, below, reduce);
}

/* ratings: numbers count up, rings and bars fill as the section comes into view */
function initRatings(cleanups, $$, below, reduce) {
  const section = document.getElementById('degerlendirmeler');
  if (!section || reduce || !below(section)) return;
  const values = $$('#degerlendirmeler .score__value');
  const arcs = $$('#degerlendirmeler .score__arc');
  const fills = $$('#degerlendirmeler .dist-bars__fill');
  const fmt = (v) => v.toFixed(1).replace('.', ',');
  values.forEach((el) => { el.textContent = fmt(0); });
  if (!values.length) return;
  arcs.forEach((el) => { el.style.strokeDashoffset = '100'; });
  fills.forEach((el) => { el.style.width = '0%'; });

  const countUp = (el, delay) => {
    const target = Number(el.dataset.v);
    const start = performance.now() + delay;
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - start) / dur));
      el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  // each score card animates when it comes into view
  const io = new IntersectionObserver((entries) => {
    // also settle cards the visitor jumped past (e.g. via the menu)
    entries.filter((e) => e.isIntersecting || e.boundingClientRect.bottom < 0).forEach((e, i) => {
      io.unobserve(e.target);
      const delay = 150 + i * 90;
      if (e.target.classList.contains('dist-bars')) {
        e.target.querySelectorAll('.dist-bars__fill').forEach((el, k) => {
          el.style.transition = `width 1.2s cubic-bezier(.2,.7,.2,1) ${delay + k * 80}ms`;
          el.style.width = `${el.dataset.w}%`;
        });
        return;
      }
      const arc = e.target.querySelector('.score__arc');
      arc.style.transition = `stroke-dashoffset 1.5s cubic-bezier(.2,.7,.2,1) ${delay}ms`;
      arc.style.strokeDashoffset = String(100 - Number(arc.dataset.p));
      countUp(e.target.querySelector('.score__value'), delay);
    });
  }, { threshold: 0.35 });
  $$('#degerlendirmeler .score, #degerlendirmeler .dist-bars').forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
}

/* ------------------------------------------------------------------ */
/* Gallery lightbox                                                    */
/* ------------------------------------------------------------------ */
/* Rooms: the gallery as a walk through the house                      */
/* ------------------------------------------------------------------ */
function initRooms({ on, $, $$, gsap, ScrollTrigger, reduce }) {
  const section = $('#galeri');
  if (!section) return () => {};
  const data = JSON.parse($('#rooms-data').textContent);
  const viewport = $('#rooms-viewport');
  const track = $('#rooms-track');
  const tabsBox = $('.rooms__tabs');
  const tabs = $$('.tab');
  const bar = $('#rooms-bar');
  const rooms = $$('.room').map((el) => ({
    el,
    imgs: Array.from(el.querySelectorAll('.room__stage img')),
    thumbs: Array.from(el.querySelectorAll('.thumb')),
    counter: el.querySelector('[data-room-index]'),
    idx: 0,
  }));
  const n = rooms.length;
  let active = 0;
  let timer = null;
  let visible = false;
  let hovering = false;
  let pinST = null;

  /* ---- live photos: the active room slowly cycles through its pictures ---- */
  const show = (r, k) => {
    const s = rooms[r];
    k = (k + s.imgs.length) % s.imgs.length;
    if (k === s.idx) return;
    s.imgs[s.idx].classList.remove('is-on');
    s.imgs[k].classList.add('is-on');
    s.thumbs.forEach((t, i) => t.classList.toggle('is-on', i === k));
    s.counter.textContent = pad(k + 1);
    s.idx = k;
  };
  const stop = () => { clearInterval(timer); timer = null; };
  const play = () => {
    stop();
    if (reduce || !visible || hovering || rooms[active].imgs.length < 2) return;
    timer = setInterval(() => show(active, rooms[active].idx + 1), 3400);
  };
  const setActive = (i) => {
    i = Math.max(0, Math.min(n - 1, i));
    if (i === active) return;
    active = i;
    tabs.forEach((t, k) => {
      t.classList.toggle('is-active', k === i);
      t.setAttribute('aria-selected', k === i ? 'true' : 'false');
    });
    const tab = tabs[i];
    if (tabsBox.scrollWidth > tabsBox.clientWidth) tabsBox.scrollTo({ left: tab.offsetLeft - 20, behavior: reduce ? 'auto' : 'smooth' });
    play();
  };

  rooms.forEach((s, r) => {
    s.thumbs.forEach((t, k) => on(t, 'click', () => { if (r !== active) setActive(r); show(r, k); play(); }));
    const frame = s.el.querySelector('.room__frame');
    on(frame, 'mouseenter', () => { hovering = true; stop(); });
    on(frame, 'mouseleave', () => { hovering = false; play(); });
  });

  const io = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) play(); else stop();
  }, { threshold: 0.2 });
  io.observe(section);

  /* ---- moving between rooms ---- */
  const goTo = (i) => {
    if (pinST) {
      const p = n > 1 ? i / (n - 1) : 0;
      window.scrollTo({ top: pinST.start + p * (pinST.end - pinST.start) + 2, behavior: reduce ? 'auto' : 'smooth' });
    } else {
      const el = rooms[i].el;
      viewport.scrollTo({ left: el.offsetLeft - (viewport.clientWidth - el.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
    }
  };
  tabs.forEach((t, i) => on(t, 'click', () => { goTo(i); setActive(i); }));

  // swipe mode (phones, or when scroll animation is unavailable)
  on(viewport, 'scroll', () => {
    if (pinST) return;
    const max = viewport.scrollWidth - viewport.clientWidth;
    const p = max > 0 ? viewport.scrollLeft / max : 0;
    bar.style.transform = `scaleX(${p})`;
    const mid = viewport.scrollLeft + viewport.clientWidth / 2;
    let best = 0, bestD = Infinity;
    rooms.forEach((s, i) => {
      const d = Math.abs(s.el.offsetLeft + s.el.offsetWidth / 2 - mid);
      if (d < bestD) { bestD = d; best = i; }
    });
    setActive(best);
  }, { passive: true });

  // desktop: the section pins and vertical scrolling walks sideways through the rooms
  let mm = null;
  if (gsap && ScrollTrigger) {
    mm = gsap.matchMedia();
    mm.add('(min-width: 900px)', () => {
      section.classList.add('rooms--pinned');
      // each room has its own stop, centred on screen; scrolling settles on the nearest room
      const centre = (i) => -(rooms[i].el.offsetLeft + rooms[i].el.offsetWidth / 2 - viewport.clientWidth / 2);
      const span = () => Math.abs(centre(n - 1) - centre(0));
      const tween = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + Math.round(span() * 1.05),
          pin: true,
          scrub: reduce ? true : 0.5,
          invalidateOnRefresh: true,
          snap: { snapTo: 'labels', inertia: false, duration: { min: 0.25, max: 0.7 }, delay: 0.08, ease: 'power2.inOut' },
          onUpdate: (self) => {
            bar.style.transform = `scaleX(${self.progress})`;
            setActive(Math.round(self.progress * (n - 1)));
          },
        },
      });
      tween.set(track, { x: () => centre(0) }, 0).addLabel('r0', 0);
      for (let i = 1; i < n; i++) tween.to(track, { x: () => centre(i), duration: 1 }).addLabel('r' + i);
      pinST = tween.scrollTrigger;
      ScrollTrigger.refresh();
      return () => {
        pinST = null;
        section.classList.remove('rooms--pinned');
        gsap.set(track, { clearProps: 'transform' });
      };
    });
  }

  /* ---- lightbox: one room at a time ---- */
  const dlg = $('#lightbox');
  const lbImg = $('#lb-img');
  const cap = $('#lb-caption');
  const count = $('#lb-count');
  const strip = $('#lb-thumbs');
  let list = [];
  let pos = 0;
  let room = null;
  let opener = null;
  const showLb = (p) => {
    pos = (p + list.length) % list.length;
    const it = list[pos];
    lbImg.style.opacity = '0';
    const pre = new Image();
    pre.onload = () => { lbImg.src = it.src; lbImg.alt = it.alt; lbImg.style.opacity = '1'; };
    pre.src = it.src;
    cap.textContent = room.name;
    count.textContent = `${pos + 1} / ${list.length}`;
    Array.from(strip.children).forEach((b, i) => {
      b.classList.toggle('is-on', i === pos);
      if (i === pos) b.scrollIntoView({ block: 'nearest', inline: 'center' });
    });
    [1, -1].forEach((d) => { const nx = list[(pos + d + list.length) % list.length]; if (nx) new Image().src = nx.src; });
  };
  const openLb = (id, from) => {
    room = data.find((d) => d.id === id);
    if (!room) return;
    list = room.photos;
    opener = from;
    strip.textContent = '';
    if (list.length > 1) {
      list.forEach((ph, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `${i + 1}. fotoğraf`);
        const im = document.createElement('img');
        im.src = ph.src.replace('gallery/', 'gallery/k/');
        im.alt = '';
        b.append(im);
        b.addEventListener('click', () => showLb(i));
        strip.append(b);
      });
    }
    const r = rooms.findIndex((s) => s.el.dataset.room === id);
    showLb(r >= 0 ? rooms[r].idx : 0);
    stop();
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  };
  const closeLb = () => { if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open'); };
  on(dlg, 'close', () => { document.body.style.overflow = ''; if (opener) opener.focus({ preventScroll: true }); play(); });
  $$('[data-room-open]').forEach((b) => on(b, 'click', () => openLb(b.dataset.roomOpen, b)));
  on($('#lb-close'), 'click', closeLb);
  on($('#lb-prev'), 'click', () => showLb(pos - 1));
  on($('#lb-next'), 'click', () => showLb(pos + 1));
  on(dlg, 'keydown', (e) => {
    if (e.key === 'ArrowRight') showLb(pos + 1);
    if (e.key === 'ArrowLeft') showLb(pos - 1);
  });
  on(dlg, 'click', (e) => { if (e.target === dlg || e.target.classList.contains('lightbox__stage')) closeLb(); });
  let sx = null;
  on(dlg, 'pointerdown', (e) => { sx = e.clientX; });
  on(dlg, 'pointerup', (e) => {
    if (sx == null) return;
    const dx = e.clientX - sx;
    sx = null;
    if (Math.abs(dx) > 50) showLb(pos + (dx < 0 ? 1 : -1));
  });

  return () => { stop(); io.disconnect(); if (mm) mm.revert(); };
}

/* ------------------------------------------------------------------ */
/* Booking (no prices or availability are invented)                     */
/* ------------------------------------------------------------------ */
function toISO(d) { return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function fromISO(s) { if (!s) return null; const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
const fmt = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
const fmtShort = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short' });

export function nightsBetween(a, b) {
  if (!a || !b) return 0;
  const ms = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  return Math.round(ms / 86400000);
}

const MAX_GUESTS = 3;

export function airbnbUrl(base, { checkin, checkout, adults, children }) {
  const q = new URLSearchParams();
  if (checkin && checkout) { q.set('check_in', checkin); q.set('check_out', checkout); }
  q.set('adults', String(adults));
  if (children > 0) q.set('children', String(children));
  q.set('guests', String(adults + children));
  return `${base}?${q.toString()}`;
}

function initBooking(on, $) {
  const form = $('#booking-form');
  if (!form) return;
  const base = form.dataset.listing;
  const inEl = $('#checkin');
  const outEl = $('#checkout');
  const nightsEl = $('#sum-nights');
  const guestsEl = $('#sum-guests');
  const note = $('#booking-note');
  const btn = $('#airbnb-btn');
  const count = { adults: 2, children: 0 };
  const min = { adults: 1, children: 0 };

  const today = new Date();
  inEl.min = toISO(today);
  outEl.min = toISO(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));

  const problem = () => {
    const a = fromISO(inEl.value), b = fromISO(outEl.value);
    if (!a && !b) return null;
    if (!a || !b) return 'Lütfen hem giriş hem çıkış tarihini seçin ya da ikisini de boş bırakın.';
    if (a < fromISO(toISO(new Date()))) return 'Giriş tarihi bugünden önce olamaz.';
    if (nightsBetween(a, b) < 1) return 'Çıkış tarihi, giriş tarihinden en az bir gün sonra olmalı.';
    return null;
  };

  const render = () => {
    for (const k of ['adults', 'children']) {
      $('#' + k).textContent = String(count[k]);
      form.querySelector(`[data-step="${k}"][data-dir="-1"]`).disabled = count[k] <= min[k];
      form.querySelector(`[data-step="${k}"][data-dir="1"]`).disabled = count.adults + count.children >= MAX_GUESTS;
    }
    const total = count.adults + count.children;
    guestsEl.textContent = `${total} misafir · en fazla ${MAX_GUESTS}`;
    const a = fromISO(inEl.value), b = fromISO(outEl.value);
    const n = nightsBetween(a, b);
    nightsEl.textContent = n > 0 ? `${fmtShort.format(a)} – ${fmtShort.format(b)} · ${n} gece` : 'Tarih seçilmedi';
    const ok = !problem();
    btn.href = airbnbUrl(base, {
      checkin: ok ? inEl.value : '', checkout: ok ? outEl.value : '', adults: count.adults, children: count.children,
    });
    btn.firstChild.textContent = n > 0 && ok ? 'Bu tarihlerle Airbnb’de rezervasyon yap ' : 'Airbnb’de rezervasyon yap ';
    note.hidden = true;
  };

  on(inEl, 'change', () => {
    const a = fromISO(inEl.value);
    if (a) {
      outEl.min = toISO(new Date(a.getFullYear(), a.getMonth(), a.getDate() + 1));
      if (outEl.value && fromISO(outEl.value) <= a) outEl.value = '';
    }
    render();
  });
  on(outEl, 'change', render);
  form.querySelectorAll('[data-step]').forEach((el) => on(el, 'click', () => {
    const k = el.dataset.step, d = Number(el.dataset.dir);
    const next = count[k] + d;
    if (next < min[k] || (d > 0 && count.adults + count.children >= MAX_GUESTS)) return;
    count[k] = next;
    render();
  }));
  on(form, 'submit', (e) => e.preventDefault());
  on(btn, 'click', (e) => {
    const p = problem();
    if (p) {
      e.preventDefault();
      note.hidden = false;
      note.classList.add('note--error');
      note.textContent = p;
    }
  });

  render();
}

/* ------------------------------------------------------------------ */
/* Contact form (preview — not wired to an inbox yet)                   */
/* ------------------------------------------------------------------ */
// Inside a frame (e.g. a preview) a mailto:/tel: link would replace the page with a blank screen,
// so there they open in a new browsing context instead.
const FRAMED = (() => { try { return window.self !== window.top; } catch (_) { return true; } })();

function fixAppLinks() {
  if (!FRAMED) return;
  document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach((a) => {
    a.target = '_blank';
    a.rel = 'noopener';
  });
}

// Shows the prepared message with an "open in mail app" link and a copy button,
// instead of sending the visitor away from the page.
function offerMail(note, to, subject, body, lead) {
  const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.hidden = false;
  note.classList.remove('note--error');
  note.textContent = '';
  const p = document.createElement('p');
  p.textContent = `${lead} Mesajınızı e-posta uygulamanızda açabilir ya da kopyalayıp ${to} adresine gönderebilirsiniz.`;
  const row = document.createElement('div');
  row.className = 'note__actions';
  const open = document.createElement('a');
  open.className = 'btn btn--primary';
  open.href = href;
  open.textContent = 'E-posta uygulamasında aç';
  if (FRAMED) { open.target = '_blank'; open.rel = 'noopener'; }
  const copy = document.createElement('button');
  copy.type = 'button';
  copy.className = 'btn btn--ghost';
  copy.textContent = 'Mesajı kopyala';
  copy.addEventListener('click', async () => {
    const text = `Kime: ${to}\nKonu: ${subject}\n\n${body}`;
    try { await navigator.clipboard.writeText(text); copy.textContent = 'Kopyalandı'; }
    catch (_) { copy.textContent = 'Kopyalanamadı, adrese elle yazın'; }
  });
  row.append(open, copy);
  note.append(p, row);
}

function initContact(on, $) {
  fixAppLinks();
  const form = $('#contact-form');
  if (!form) return;
  const note = $('#contact-note');
  const to = form.dataset.email;
  document.querySelectorAll('[data-copy]').forEach((btn) => on(btn, 'click', async () => {
    const text = btn.dataset.copy;
    const done = (msg) => { btn.textContent = msg; setTimeout(() => { btn.textContent = 'Kopyala'; }, 1600); };
    try { await navigator.clipboard.writeText(text); done('Kopyalandı'); }
    catch (_) {
      const r = document.createRange(); r.selectNodeContents(btn.previousElementSibling);
      const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r); done('Seçildi');
    }
  }));
  on(form, 'submit', (e) => {
    e.preventDefault();
    const name = form.elements.name.value.trim();
    const contact = form.elements.contact.value.trim();
    const msg = form.elements.message.value.trim();
    note.hidden = false;
    if (!name || !contact || !msg) {
      note.classList.add('note--error');
      note.textContent = 'Lütfen adınızı, iletişim bilginizi ve mesajınızı yazın.';
      return;
    }
    const subject = `Lemoon House – ${name}`;
    const body = `${msg}\n\n${name}\n${contact}`;
    offerMail(note, to, subject, body, 'Mesajınız hazır.');
  });
}

/* ------------------------------------------------------------------ */
/* Kurumsal documents (dialogs) and payment notification               */
/* ------------------------------------------------------------------ */
function initDocs(on, $, $$) {
  let opener = null;
  const openDoc = (id, from) => {
    const dlg = document.getElementById(`doc-${id}`);
    if (!dlg) return;
    $$('dialog.doc[open]').forEach((d) => d.close());
    opener = from || opener;
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    dlg.querySelector('.doc__body').scrollTop = 0;
    document.body.style.overflow = 'hidden';
  };
  $$('[data-doc-open]').forEach((b) => on(b, 'click', (e) => { e.preventDefault(); openDoc(b.dataset.docOpen, b); }));
  $$('dialog.doc').forEach((dlg) => {
    on(dlg.querySelector('[data-doc-close]'), 'click', () => dlg.close());
    on(dlg, 'click', (e) => { if (e.target === dlg) dlg.close(); });
    on(dlg, 'close', () => {
      if (!document.querySelector('dialog[open]')) document.body.style.overflow = '';
      if (opener && !document.querySelector('dialog.doc[open]')) opener.focus();
    });
  });
  // direct links such as /#mesafeli-satis open the matching document
  const fromHash = () => { const id = location.hash.slice(1); if (id && document.getElementById(`doc-${id}`)) openDoc(id); };
  fromHash();
  on(window, 'hashchange', fromHash);

  const form = $('#pay-form');
  if (!form) return;
  const note = $('#pay-note');
  on(form, 'submit', (e) => {
    e.preventDefault();
    const first = form.elements.first.value.trim();
    const last = form.elements.last.value.trim();
    const res = form.elements.res.value.trim();
    note.hidden = false;
    if (!first || !last || !res) {
      note.classList.add('note--error');
      note.textContent = 'Lütfen adınızı, soyadınızı ve rezervasyon numaranızı yazın.';
      return;
    }
    const to = form.dataset.email;
    const body = `Ad Soyad: ${first} ${last}\nRezervasyon no: ${res}\n\nHavale/EFT ödememi yaptım.`;
    offerMail(note, to, `Ödeme bildirimi – ${res}`, body, 'Ödeme bildiriminiz hazır.');
  });
}

/* ------------------------------------------------------------------ */
/* Phones: sticky booking bar                                          */
/* ------------------------------------------------------------------ */
function initMobileBar(on, $) {
  const bar = $('#mbar');
  const intro = $('#genel-bakis');
  const booking = $('#rezervasyon');
  const footer = document.querySelector('.footer');
  if (!bar || !intro) return;
  bar.hidden = false;
  const update = () => {
    const vh = window.innerHeight;
    const started = intro.getBoundingClientRect().top < vh * 0.6;
    const b = booking.getBoundingClientRect();
    const inBooking = b.top < vh * 0.75 && b.bottom > vh * 0.25;
    const atFooter = footer.getBoundingClientRect().top < vh;
    const dialogOpen = !!document.querySelector('dialog[open]');
    bar.classList.toggle('is-away', !started || inBooking || atFooter || dialogOpen);
  };
  update();
  on(window, 'scroll', update, { passive: true });
  on(window, 'resize', update);
  document.addEventListener('toggle', update, true);
  setInterval(update, 800);
}
