/*Minimal JS (). This handles: nav toggle & dialog*/
  
    (function () {
      // navigation toggle
      const btn = document.getElementById('nav-toggle');
      const menu = document.getElementById('primary-menu');
      if (btn && menu) {
        btn.addEventListener('click', function () {
          const expanded = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', String(!expanded));
          if (menu.hasAttribute('hidden')) {
            menu.removeAttribute('hidden');
          } else {
            menu.setAttribute('hidden', '');
          }
        });
      }

      // modal demo
      const modal = document.getElementById('detail-modal');
      const open = document.getElementById('details-open');
      const close = document.getElementById('modal-close');
      if (open && modal) {
        open.addEventListener('click', () => modal.showModal());
      }
      if (close) close.addEventListener('click', () => modal.close());

      // set year
      const year = document.getElementById('year');
      if (year) year.textContent = new Date().getFullYear();
    })();