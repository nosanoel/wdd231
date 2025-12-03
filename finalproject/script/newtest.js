// -------------------------
// Mobile Navigation
// -------------------------
const navToggle = document.getElementById("nav-toggle");
const primaryMenu = document.getElementById("primary-menu");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));

  primaryMenu.hidden = !primaryMenu.hidden;
});


// -------------------------
// Modal Elements
// -------------------------
const modal = document.getElementById("news-modal");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");

modalClose.addEventListener("click", () => modal.close());


// -------------------------
// Load JSON Dynamically
// Required by rubric: async + try/catch
// -------------------------
async function loadNews() {
  const grid = document.getElementById("news-grid");
  const loading = document.querySelector(".loading");
  const errorMsg = document.querySelector(".error-msg");

  loading.style.display = "block";

  try {
    const res = await fetch("data/news.json");
    if (!res.ok) throw new Error("JSON not found");

    const news = await res.json();

    // store in localStorage (required by rubric)
    localStorage.setItem("latestNews", JSON.stringify(news));

    loading.style.display = "none";

    // template literals + array methods
    grid.innerHTML = news.map(item => `
      <article class="game-card"
        data-title="${item.title}"
        data-content="${item.content}">
        
        <img src="${item.image}" alt="${item.title}" loading="lazy">

        <h3>${item.title}</h3>
        <p>${item.summary}</p>

        <p class="card-meta">
          ${new Date(item.date).toLocaleDateString()} • ${item.category}
        </p>
      </article>
    `).join("");

    // modal click event
    document.querySelectorAll(".game-card").forEach(card => {
      card.addEventListener("click", () => {
        modalTitle.textContent = card.dataset.title;
        modalContent.textContent = card.dataset.content;
        modal.showModal();
      });
    });

  } catch (err) {
    console.error(err);
    loading.style.display = "none";
    errorMsg.style.display = "block";
  }
}

loadNews();
