// Centralized accessible menu toggle for the site
document.addEventListener('DOMContentLoaded', () => {
  // Header menu (used on index.html, discover.html)
  const headerMenuBtn = document.getElementById('menu-btn');
  const headerNav = document.getElementById('main-nav');

  if (headerMenuBtn && headerNav) {
    headerMenuBtn.setAttribute('aria-expanded', 'false');

    headerMenuBtn.addEventListener('click', () => {
      const isOpen = headerNav.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
      headerMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // keyboard support for Enter / Space
    headerMenuBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        headerMenuBtn.click();
      }
    });
  }

  // Directory menu (used on directory.html) - button id is "menu"
  const dirMenuBtn = document.getElementById('menu');
  const dirNavList = document.querySelector('.list');
  if (dirMenuBtn && dirNavList) {
    dirMenuBtn.setAttribute('aria-expanded', 'false');

    dirMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dirNavList.classList.toggle('open');
      dirMenuBtn.textContent = isOpen ? '✖' : '☰';
      dirMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    dirMenuBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dirMenuBtn.click();
      }
    });
  }
});