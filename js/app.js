/**
 * UsecoelhoBr – app.js
 * Landing page: FAQ accordion, hamburger menu e injeção de links da loja.
 */

/* =============================================
   LINKS DA LOJA (Nuvemshop)
   Lê NUVEMSHOP_URL definido em js/config.js e
   preenche todos os elementos com class="store-link".
   ============================================= */
function initStoreLinks() {
  const base = (typeof NUVEMSHOP_URL !== 'undefined') ? NUVEMSHOP_URL : '#';
  document.querySelectorAll('.store-link').forEach(el => {
    const path = el.dataset.storePath || '';
    el.href = base + path;
    el.target = '_blank';
    el.rel = 'noopener';
  });
}

/* =============================================
   FAQ
   ============================================= */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question')?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* =============================================
   HAMBURGER MENU
   ============================================= */
function initHamburger() {
  const ham = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');
  if (!ham || !nav) return;
  ham.addEventListener('click', () => {
    const expanded = ham.getAttribute('aria-expanded') === 'true';
    ham.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false');
  }));
}

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  initStoreLinks();
  initFAQ();
  initHamburger();
});

