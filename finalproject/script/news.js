document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("news-grid");
  const loading = document.querySelector(".loading");
  const errorMsg = document.querySelector(".error-msg");
  const categoryFilter = document.getElementById("category-filter");
  const searchInput = document.getElementById("search-input");
  let news = [];
  let currentIndex = 0;
  const pageSize = 3; // number of articles per scroll

  // Fetch news
  try {
    loading.style.display = "block";
    const res = await fetch("data/news.json");
    news = await res.json();
    loading.style.display = "none";
    renderNext();
  } catch (err) {
    loading.style.display = "none";
    errorMsg.style.display = "block";
    console.error(err);
  }

  function renderNext() {
    const filtered = filterNews();
    const nextItems = filtered.slice(currentIndex, currentIndex + pageSize);
    nextItems.forEach(item => {
      const card = document.createElement("div");
      card.className = "game-card";
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <p class="meta">${item.category} • ${item.date}</p>
      `;
      card.addEventListener("click", () => {
        window.location.href = `article.html?title=${encodeURIComponent(item.title)}`;
      });
      grid.appendChild(card);
    });
    currentIndex += pageSize;
  }

  function filterNews() {
    const category = categoryFilter.value.toLowerCase();
    const search = searchInput.value.toLowerCase();
    return news.filter(item => {
      return (!category || item.category.toLowerCase() === category)
        && (!search || item.title.toLowerCase().includes(search) || item.summary.toLowerCase().includes(search));
    });
  }

  // Infinite scroll
  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      renderNext();
    }
  });

  // Filters
  categoryFilter.addEventListener("change", () => {
    grid.innerHTML = "";
    currentIndex = 0;
    renderNext();
  });
  searchInput.addEventListener("input", () => {
    grid.innerHTML = "";
    currentIndex = 0;
    renderNext();
  });

  // Sticky header nav toggle
  const btn = document.getElementById('nav-toggle');
  const menu = document.getElementById('primary-menu');
  btn?.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    menu?.toggleAttribute('hidden');
  });

  // Year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
