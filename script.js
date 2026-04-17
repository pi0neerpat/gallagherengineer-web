(function () {
  'use strict';

  // UTC clock in nav
  const clock = document.getElementById('clock');
  if (clock) {
    const tick = () => {
      clock.textContent = new Date().toISOString().slice(11, 19) + ' UTC';
    };
    tick();
    setInterval(tick, 1000);
  }

  // Sticky nav shadow on scroll
  const nav = document.getElementById('tnav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('tnav--scrolled', window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Reveal-on-scroll
  const revealTargets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  // Scribular preview wave bars — 40 bars with sine-based heights
  document.querySelectorAll('[data-wave]').forEach((wave) => {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 40; i++) {
      const span = document.createElement('span');
      const h = 20 + Math.abs(Math.sin(i * 0.6)) * 60;
      const o = 0.4 + Math.abs(Math.sin(i * 0.4)) * 0.6;
      span.style.height = h + '%';
      span.style.background = 'var(--accent-1)';
      span.style.opacity = String(o);
      frag.appendChild(span);
    }
    wave.appendChild(frag);
  });

  // Character counters on form fields
  document.querySelectorAll('[data-counter]').forEach((counter) => {
    const field = counter.closest('.tfield');
    if (!field) return;
    const input = field.querySelector('.tfield__input');
    if (!input) return;
    const max = counter.getAttribute('data-max') || '0';
    const update = () => { counter.textContent = input.value.length + '/' + max; };
    input.addEventListener('input', update);
    update();
  });

  // Contact form: show "sent" state + open mailto
  const form = document.getElementById('tform');
  if (form) {
    const fields = form.querySelector('.tform__fields');
    const sent = form.querySelector('.tform__sent');
    const reset = form.querySelector('[data-reset]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const subject = (data.get('subject') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      const body = 'From: ' + name + ' <' + email + '>\n\n' + message;
      const href = 'mailto:hello@gallagherengineer.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      window.location.href = href;

      if (fields) fields.hidden = true;
      if (sent) sent.hidden = false;
    });

    if (reset) {
      reset.addEventListener('click', () => {
        form.reset();
        document.querySelectorAll('[data-counter]').forEach((c) => {
          const max = c.getAttribute('data-max') || '0';
          c.textContent = '0/' + max;
        });
        if (fields) fields.hidden = false;
        if (sent) sent.hidden = true;
      });
    }
  }
})();
