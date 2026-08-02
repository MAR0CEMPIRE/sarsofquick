// Menú móvil: abrir/cerrar y cerrar al pulsar un enlace
const menuToggleBtn = document.getElementById('menuToggleBtn');
const mainNav = document.getElementById('mainNav');

menuToggleBtn.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggleBtn.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggleBtn.setAttribute('aria-expanded', 'false');
  });
});

// Pestañas de la carta
const menuTabs = document.querySelectorAll('.menu-tab');
menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuTabs.forEach(t => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('is-active'));
    document.getElementById('panel-' + tab.dataset.tab).classList.add('is-active');
  });
});

// Estado "Abierto ahora / Cerrado", según el horario real
function updateStatus() {
  const now = new Date();
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const t = (h, m) => h * 60 + m;
  let open = false;

  if (day === 1) {
    open = false;
  } else if (day === 2 || day === 3 || day === 4) {
    open = (mins >= t(13, 0) && mins <= t(16, 30)) || (mins >= t(20, 0) && mins <= t(23, 0));
  } else {
    open = (mins >= t(13, 0) && mins <= t(16, 30)) || (mins >= t(20, 0) && mins <= t(23, 30));
  }

  const pill = document.getElementById('statusPill');
  const text = document.getElementById('statusText');

  if (open) {
    pill.classList.remove('is-closed');
    text.textContent = 'Abierto ahora';
  } else {
    pill.classList.add('is-closed');
    text.textContent = 'Cerrado ahora mismo';
  }
}

updateStatus();
setInterval(updateStatus, 60000);

// Actualiza dinámicamente el año en el footer
document.getElementById('year').textContent = new Date().getFullYear();