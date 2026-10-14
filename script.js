const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    menuToggle.setAttribute('aria-expanded', String(aberto));
    menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    menuToggle.textContent = aberto ? '×' : '☰';
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('aberto');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));
}
document.getElementById('ano').textContent = new Date().getFullYear();
