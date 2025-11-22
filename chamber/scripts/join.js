// FOOTER YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// MOBILE MENU TOGGLE
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("main-nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", nav.classList.contains("open"));
});

// SET TIMESTAMP
document.getElementById("timestamp").value = new Date().toISOString();

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
    document.getElementById(modalId).style.display = 'block';
  });
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.parentElement.style.display = 'none';
  });
});

window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});
