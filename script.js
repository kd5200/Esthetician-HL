(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  document.addEventListener('DOMContentLoaded', () => {
    initYear();
    initMobileNav();
    initHeaderScroll();
    initSmoothCloseNav();
    initHeroVideo();
    initReveal();
    initContactForm();
  });

  function initYear() {
    const y = $('#year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function initMobileNav() {
    const toggle = $('#navToggle');
    const links = $('#navLinks');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  function initSmoothCloseNav() {
    const links = $('#navLinks');
    const toggle = $('#navToggle');
    if (!links) return;
    $$('a', links).forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        if (toggle) toggle.classList.remove('open');
      });
    });
  }

  function initHeaderScroll() {
    const header = $('#siteHeader');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initHeroVideo() {
    const video = $('.hero-banner__video');
    if (!video) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      video.pause();
      video.removeAttribute('autoplay');
      return;
    }

    const play = () => {
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener('loadeddata', play, { once: true });
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        video.pause();
      } else if (!reduceMotion) {
        play();
      }
    });
  }

  function initReveal() {
    const selectors = [
      '.hero-panel',
      '.welcome-copy', '.welcome-img',
      '.section-head',
      '.service-card', '.expect-step', '.tip-card',
      '.quote blockquote',
      '.contact-info', '.contact-form'
    ];
    const targets = $$(selectors.join(','));
    targets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${Math.min(i * 40, 240)}ms`;
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => io.observe(el));
  }

  function initContactForm() {
    const form = $('#contactForm');
    const status = $('#formStatus');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.className = 'form-status';
      status.textContent = '';

      const name = $('#name').value.trim();
      const email = $('#email').value.trim();
      const message = $('#message').value.trim();

      if (!name || !email || !message) {
        status.classList.add('error');
        status.textContent = 'Please fill in your name, email, and message.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.classList.add('error');
        status.textContent = 'Please enter a valid email address.';
        return;
      }

      // Frontend-only demo: replace with real endpoint (Formspree, Netlify, etc.)
      status.classList.add('success');
      status.textContent = 'Thank you! Hajime will be in touch within 24–48 hours.';
      form.reset();
    });
  }
})();
