// FOOTER YEAR
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu handled centrally in scripts/menu.js

// SET TIMESTAMP (try to set immediately; also ensure it's set again on submit)
const tsInput = document.getElementById("timestamp");
if (tsInput) tsInput.value = new Date().toISOString();

// MEMBERSHIP CARDS ANIMATION
const cards = document.querySelectorAll('.card');
cards.forEach((card, i) => {
  setTimeout(() => {
    card.classList.add('show');
  }, i * 200);
});

// MODAL FUNCTIONALITY
const modals = document.querySelectorAll('.modal');
const modalLinks = document.querySelectorAll('.card a');
const closeBtns = document.querySelectorAll('.close');

modalLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const modalId = link.parentElement.dataset.modal;
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    // make focusable and move focus for accessibility
    const content = modal.querySelector('.modal-content');
    if (content) {
      content.setAttribute('tabindex', '-1');
      // save trigger to return focus later
      modal.__trigger = link;
      content.focus();
    }
  });
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.modal');
    if (modal) {
      modal.style.display = 'none';
      // return focus to trigger
      if (modal.__trigger) modal.__trigger.focus();
    }
  });
});

window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

// Handle keyboard interactions for modals: Escape to close, trap focus
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModal = Array.from(document.querySelectorAll('.modal')).find(m => m.style.display === 'block');
    if (openModal) {
      openModal.style.display = 'none';
      if (openModal.__trigger) openModal.__trigger.focus();
    }
  }
});

// Basic focus trap when modal is open
function trapFocus(modal) {
  const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const nodes = Array.from(modal.querySelectorAll(focusableSelectors)).filter(n => n.offsetParent !== null);
  if (nodes.length === 0) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];

  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

// Attach trapFocus when showing modals
modals.forEach(modal => {
  const observer = new MutationObserver(() => {
    if (modal.style.display === 'block') {
      trapFocus(modal);
    }
  });
  observer.observe(modal, { attributes: true, attributeFilter: ['style'] });
});

// Ensure timestamp is set when the form is submitted (works if earlier code errored)
const form = document.getElementById('join-form');
if (form) {
  form.addEventListener('submit', () => {
    const ts = document.getElementById('timestamp');
    if (ts) ts.value = new Date().toISOString();
    // No preventDefault here — allow the normal navigation to thankyou.html
  });
}
