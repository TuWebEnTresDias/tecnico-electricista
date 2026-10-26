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
