// ===============================
// Load Games from FreeToGame API
// ===============================

async function loadGames() {
  const apiUrl = "https://www.freetogame.com/api/games?platform=pc"; 
  
   

  
  // Use Codetabs proxy (more stable than allorigins)
  const proxyUrl = "https://api.codetabs.com/v1/proxy?quest=" + encodeURIComponent(apiUrl);

  const gameList = document.getElementById("gameList");
  const errorMsg = document.getElementById("errorMsg");
  const loading = document.getElementById("loading");

  // Show loading spinner
  loading.style.display = "block";
  errorMsg.style.display = "none";
  gameList.innerHTML = "";

  
  try {
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
        <a href="${game.game_url}" target="_blank">Play Now</a>
      `;

      gameList.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading games:", error);
  
    errorMsg.textContent = "⚠️  Failed to load games. Please try again later.";
  }
}

// ===============================
// Auto-update footer year + Load
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  loadGames();
  document.getElementById("year").textContent = new Date().getFullYear();
});
 