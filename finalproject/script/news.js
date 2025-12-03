// app.js (ES Module) — Week 6 Compliant
// Handles: fetch JSON, render 15+ items, localStorage, modal, DOM events

// DOM references
const grid = document.querySelector(".grid");
const detailModal = document.getElementById("detail-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");

// LOCAL STORAGE — save last visit time
localStorage.setItem("qiyi_lastVisit", new Date().toISOString());

// Fetch & render items
async function loadGames() {
  try {
    const res = await fetch("data/news.json");

    if (!res.ok) {
      throw new Error("Failed to fetch JSON: " + res.status);
    }

    const data = await res.json();

    // Ensure at least 15 items using array method
    const items = [...data];
    while (items.length < 15) {
      items.push(...data);
    }
    const limited = items.slice(0, 15);

    renderGrid(limited);

  } catch (err) {
    console.error("Error fetching JSON:", err);
    grid.innerHTML = `<p class="error-inline">Could not load game data.</p>`;
  }
}

function renderGrid(items) {
  grid.innerHTML = items
    .map((game, i) => {
      return `
        <article class="tile" aria-labelledby="t-${i}">
          <img src="${game.image}" alt="${game.title} cover" loading="lazy" width="400" height="220">
          <h4 id="t-${i}">${game.title}</h4>
          <p class="meta">${game.genre} • ${game.price}</p>
          <button class="btn-outline more-btn" data-idx="${i}">Details</button>
        </article>
      `;
    })
    .join("");

  // Attach modal handlers
  document.querySelectorAll(".more-btn").forEach(btn => {
    btn.addEventListener("click", event => {
      const idx = event.target.getAttribute("data-idx");
      const game = items[idx];
      openModal(game);
    });
  });
}

// MODAL HANDLERS
function openModal(game) {
  modalTitle.textContent = game.title;
  modalDesc.innerHTML = `
      <strong>Genre:</strong> ${game.genre}<br>
      <strong>Platform:</strong> ${game.platform}<br>
      <strong>Price:</strong> ${game.price}
  `;
  detailModal.showModal();
}

document.getElementById("modal-close").addEventListener("click", () => {
  detailModal.close();
});

// Escape key closes modal
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && detailModal.open) detailModal.close();
});

// LOAD DATA
loadGames();
