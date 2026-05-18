/* ═══════════════════════════════════════════
   VIRA — Interações
════════════════════════════════════════════ */

// ─── Navbar: blur ao rolar ───────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ─── Menu hamburger mobile ───────────────────
(function initHamburger() {
  const btn = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');

  btn.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);
  });

  // Fecha ao clicar em um link
  menu.querySelectorAll('.navbar__mobile-link, .navbar__mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    });
  });
})();

// ─── Animações de entrada com IntersectionObserver ───
(function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Respeita o delay CSS inline (--delay) ou sequencial por filhos
          const delay = entry.target.style.getPropertyValue('--delay') || '0s';
          entry.target.style.transitionDelay = delay;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

// ─── Contador animado do Hero ─────────────────
(function initCounter() {
  const counterEl = document.getElementById('counter');
  if (!counterEl) return;

  const target = 47;
  const duration = 1800;
  const startTime = performance.now();

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(easeOut(progress) * target);
    counterEl.textContent = value;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  // Inicia após um pequeno delay para deixar o hero aparecer
  setTimeout(() => requestAnimationFrame(tick), 600);
})();

// ─── Botão flutuante WhatsApp (aparece após 3s) ───
(function initWhatsappFab() {
  const fab = document.getElementById('whatsappFab');
  if (!fab) return;

  setTimeout(() => fab.classList.add('visible'), 3000);
})();

// ─── Scroll suave para links âncora ──────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = document.getElementById('navbar').offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();
