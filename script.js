'use strict';

/* El número es fijo: los parámetros de la URL nunca cambian el destinatario. */
function buildConsultationMessage({ name, service, zone, message }) {
  return [
    'Hola, te contacto desde tu web.',
    '',
    `Nombre: ${name.trim()}`,
    `Servicio: ${service.trim()}`,
    `Zona: ${zone.trim()}`,
    '',
    message.trim()
  ].join('\n');
}

const year = document.getElementById('currentYear');
if (year) year.textContent = new Date().getFullYear();

const burger = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const header = document.getElementById('header');

function setMenu(open) {
  burger.classList.toggle('active', open);
  mobileMenu.classList.toggle('active', open);
  mobileMenu.inert = !open;
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  document.body.style.overflow = open ? 'hidden' : '';
}

burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (burger.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') {
    setMenu(false);
    burger.focus();
  } else if (event.key === 'Tab') {
    const links = [...mobileMenu.querySelectorAll('a')];
    const first = burger;
    const last = links[links.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) setMenu(false);
});

const updateHeader = () => header.classList.toggle('header--scrolled', window.scrollY > 24);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const form = document.getElementById('contactForm');
form.addEventListener('submit', event => {
  const data = {
    name: document.getElementById('contactName').value,
    service: document.getElementById('contactService').value,
    zone: document.getElementById('contactZone').value,
    message: document.getElementById('contactMessage').value
  };
  // HTML required no rechaza campos compuestos sólo por espacios.
  for (const [key, id] of [['name', 'contactName'], ['message', 'contactMessage']]) {
    const input = document.getElementById(id);
    input.setCustomValidity(data[key].trim() ? '' : 'Completá este campo para preparar tu consulta.');
    if (!input.checkValidity()) {
      event.preventDefault();
      input.reportValidity();
      return;
    }
  }
  document.getElementById('whatsappText').value = buildConsultationMessage(data);
  document.getElementById('formStatus').textContent = 'Se abrirá WhatsApp. Revisá el mensaje y tocá Enviar para completar tu consulta.';
  // Envío nativo GET a wa.me: evita ventanas bloqueadas y no simula entrega.
});
['contactName', 'contactMessage'].forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener('input', () => input.setCustomValidity(''));
});

/* Fotos por hotlink con alternativa local si el CDN no responde. */
document.querySelectorAll('[data-stock-image]').forEach(image => {
  const useFallback = () => {
    if (image.dataset.fallbackUsed) return;
    image.dataset.fallbackUsed = 'true';
    image.src = image.dataset.fallbackSrc;
    image.alt = 'Ilustración de referencia de servicios técnicos';
  };
  image.addEventListener('error', useFallback);
  if (image.complete && image.naturalWidth === 0) useFallback();
});

/* Entradas al hacer scroll, sin ocultar el contenido con CSS ni bloquearlo sin JS. */
(() => {
  const toggle = document.getElementById('motionToggle');
  const label = document.getElementById('motionLabel');
  const root = document.documentElement;
  const reduced = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  const targets = [...document.querySelectorAll('.hero__content, .hero__visual, .section-header, .services__category, .steps li, .coverage__card, .location-note, .faq details, .contact__info, .contact__form-wrap')];
  const active = new Set();
  let paused = false;
  let observer;

  function configureMotion() {
    if (observer) observer.disconnect();
    active.forEach(animation => animation.cancel());
    active.clear();
    const enabled = !paused && !(reduced && reduced.matches);
    root.classList.toggle('motion-enabled', enabled);
    toggle.hidden = Boolean(reduced && reduced.matches);
    toggle.setAttribute('aria-pressed', String(paused));
    label.textContent = paused ? 'Activar animaciones' : 'Pausar animaciones';
    if (!enabled || !('IntersectionObserver' in window)) return;
    observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (typeof entry.target.animate !== 'function') return;
        const animation = entry.target.animate(
          [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 650, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'none' }
        );
        active.add(animation);
        const release = () => active.delete(animation);
        animation.onfinish = release;
        animation.oncancel = release;
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });
    targets.forEach(target => observer.observe(target));
  }

  toggle.addEventListener('click', () => {
    paused = !paused;
    configureMotion();
  });
  if (reduced && typeof reduced.addEventListener === 'function') reduced.addEventListener('change', configureMotion);
  configureMotion();
})();
