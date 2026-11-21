// Sliding underline for the top nav.
// - Hover/focus: the underline glides to that link, then back to the current page's link.
// - Page change: the new page starts the underline where the last page left it and slides it over.
// Without JS, the plain CSS underline on the current link is used instead.
(() => {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;
  const wrap = nav.querySelector('.site-nav__links');
  const links = [...wrap.querySelectorAll('.site-nav__link')];
  const current = wrap.querySelector('[aria-current="page"]');
  const KEY = 'siteNavIndicator';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const bar = document.createElement('span');
  bar.className = 'site-nav__indicator';
  bar.setAttribute('aria-hidden', 'true');
  wrap.appendChild(bar);
  nav.classList.add('has-indicator');

  let active = null; // link the underline is currently under (null = hidden)

  function place(el, animate) {
    bar.classList.toggle('is-animated', animate && !reduceMotion.matches);
    active = el;
    if (!el) {
      bar.style.opacity = '0';
      return;
    }
    bar.style.opacity = '1';
    bar.style.width = el.offsetWidth + 'px';
    bar.style.transform = 'translateX(' + el.offsetLeft + 'px)';
  }

  // Remember where the underline is right now, so the next page can start from there.
  function save() {
    try {
      const b = bar.getBoundingClientRect();
      const w = wrap.getBoundingClientRect();
      sessionStorage.setItem(KEY, JSON.stringify({
        x: b.left - w.left,
        w: b.width,
        o: parseFloat(getComputedStyle(bar).opacity) || 0,
        t: Date.now()
      }));
    } catch (e) { /* storage unavailable: the next page just won't animate in */ }
  }

  function readSaved() {
    try {
      const s = JSON.parse(sessionStorage.getItem(KEY) || 'null');
      sessionStorage.removeItem(KEY);
      return s && Date.now() - s.t < 10000 ? s : null;
    } catch (e) {
      return null;
    }
  }

  function start() {
    const from = readSaved();
    if (!from || reduceMotion.matches) {
      place(current, false);
      return;
    }
    // Jump to where the previous page left off, then slide to this page's link.
    bar.classList.remove('is-animated');
    bar.style.opacity = String(from.o);
    bar.style.width = from.w + 'px';
    bar.style.transform = 'translateX(' + from.x + 'px)';
    bar.getBoundingClientRect(); // commit the start position so the change below animates
    place(current, true);
  }

  // On phones the links live in the full-screen menu and the underline is hidden,
  // so hover/focus/tap there shouldn't move it.
  const phoneMenu = window.matchMedia('(max-width: 767.98px)');
  const sliding = () => !(phoneMenu.matches && nav.classList.contains('has-js'));

  links.forEach((a) => {
    a.addEventListener('mouseenter', () => { if (sliding()) place(a, true); });
    a.addEventListener('focus', () => { if (sliding()) place(a, true); });
    a.addEventListener('click', (e) => {
      // Downloads and new-tab clicks don't leave the page
      if (!sliding() || a.hasAttribute('download') || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      save();
      place(a, true);
    });
  });
  wrap.addEventListener('mouseleave', () => { if (sliding()) place(current, true); });
  wrap.addEventListener('focusout', (e) => {
    if (sliding() && !wrap.contains(e.relatedTarget)) place(current, true);
  });
  const home = nav.querySelector('.site-nav__home');
  if (home) home.addEventListener('click', () => { if (sliding()) save(); });

  // Keep it lined up when the layout changes
  window.addEventListener('resize', () => place(active, false));
  phoneMenu.addEventListener('change', () => place(current, false));
  // Coming back via the browser's back button can restore a stale position
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) place(current, false);
  });

  // Wait briefly for the web font so link widths are final before measuring.
  // If the font arrives later, nudge the underline to the final width.
  let started = false;
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 100))]).then(() => {
    started = true;
    start();
  });
  fontsReady.then(() => {
    if (started) place(active, true);
  });
})();

// Mobile menu (below 768px): the button opens a full-screen overlay with the nav links.
// Without JS, the `has-js` class never gets added and phones keep the inline links.
(() => {
  const nav = document.querySelector('.site-nav');
  const toggle = nav && nav.querySelector('.site-nav__toggle');
  const menu = nav && nav.querySelector('#site-menu');
  if (!toggle || !menu) return;

  const mobile = window.matchMedia('(max-width: 767.98px)');
  const root = document.documentElement;
  nav.classList.add('has-js');

  const isOpen = () => nav.classList.contains('is-open');
  const focusables = () => [...nav.querySelectorAll('.site-nav__home, .site-nav__link, .site-nav__toggle')];

  function open() {
    nav.classList.add('is-open');
    root.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    const first = menu.querySelector('.site-nav__link');
    if (first) first.focus({ preventScroll: true });
  }

  function close(returnFocus) {
    if (!isOpen()) return;
    nav.classList.remove('is-open');
    root.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    if (returnFocus) toggle.focus({ preventScroll: true });
  }

  toggle.addEventListener('click', () => (isOpen() ? close(true) : open()));

  // Tapping a link closes the menu (Resume downloads and stays on the page)
  menu.addEventListener('click', (e) => {
    if (e.target.closest('.site-nav__link')) close(false);
  });

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      close(true);
      return;
    }
    // Keep Tab inside the open menu
    if (e.key === 'Tab') {
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Growing past the mobile breakpoint closes the menu
  mobile.addEventListener('change', (e) => {
    if (!e.matches) close(false);
  });
  // Coming back with the Back button shouldn't show a stale open menu
  window.addEventListener('pageshow', () => close(false));
})();
