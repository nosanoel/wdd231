// ===============================
// Load Games from FreeToGame API
// ===============================

async function loadGames() {
  const apiUrl = "https://www.freetogame.com/api/games?platform=pc";
  const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(apiUrl);

  const gameList = document.getElementById("gameList");
  const errorMsg = document.getElementById("errorMsg");
  const loading = document.getElementById("loading");

  // Show loading spinner
  loading.style.display = "block";
  errorMsg.style.display = "none";
  gameList.innerHTML = "";

  try {
    // Use proxy (the API does not support browser CORS)
    const response = await fetch(proxyUrl);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const games = await response.json();

    // Hide loading spinner
    loading.style.display = "none";

    // Render games
    games.slice(0, 20).forEach(game => {
      const card = document.createElement("div");
      card.className = "game-card";

      card.innerHTML = `
        <img src="${game.thumbnail}" alt="${game.title}">
        <h3>${game.title}</h3>
        <p>${game.genre} | ${game.platform}</p>
      `;

      gameList.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading games:", error);

    // Hide loading spinner & show error
    loading.style.display = "none";
    errorMsg.style.display = "block";
    errorMsg.textContent = "Failed to load games. Please try again later.";
  }
}

// ===============================
// Auto-update footer year + Load
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  loadGames();
  document.getElementById("year").textContent = new Date().getFullYear();
});
