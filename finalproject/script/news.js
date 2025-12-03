// Minimal JS for news page
document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("news-grid");
  const loading = document.querySelector(".loading");
  const errorMsg = document.querySelector(".error-msg");
  const modal = document.getElementById("news-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");
  const modalClose = document.getElementById("modal-close");

  try {
    loading.style.display = "block";
    const res = await fetch("news.json");
    const news = await res.json();
    loading.style.display = "none";

    news.forEach(item => {
      const card = document.createElement("div");
      card.className = "game-card"; // uses your 3D panel style
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <p class="meta">${item.category} • ${item.date}</p>
      `;
      card.addEventListener("click", () => {
        modalTitle.textContent = item.title;
        modalContent.textContent = item.content;
        modal.showModal();
      });
      grid.appendChild(card);
    });

  } catch (err) {
    loading.style.display = "none";
    errorMsg.style.display = "block";
    console.error(err);
  }

  // modal close
  modalClose.addEventListener("click", () => modal.close());

  // nav toggle
  const btn = document.getElementById('nav-toggle');
  const menu = document.getElementById('primary-menu');
  btn?.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    menu?.toggleAttribute('hidden');
  });

  // year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
