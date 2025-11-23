/*async function loadGames() {
  try {
    const response = await fetch("https://www.freetogame.com/api/games");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const games = await response.json();
    const gameList = document.getElementById("gameList");
    const errorMsg = document.getElementById("errorMsg");

    gameList.innerHTML = "";
    errorMsg.style.display = "none";

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
    document.getElementById("errorMsg").style.display = "block";
  }
}

// Auto-update footer year
document.addEventListener("DOMContentLoaded", () => {
  loadGames();
  document.getElementById("year").textContent = new Date().getFullYear();
});*/
// Updated forgame.js
async function loadGames() {
  const apiUrl = "https://www.freetogame.com/api/games?platform=pc";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/" + apiUrl;

  try {
    let response = await fetch(apiUrl);

    // If direct call fails (CORS or network), retry with proxy
    if (!response.ok) {
      console.warn(`Direct fetch failed (${response.status}), retrying with proxy...`);
      response = await fetch(proxyUrl);
    }

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const games = await response.json();
    const gameList = document.getElementById("gameList");
    const errorMsg = document.getElementById("errorMsg");

    gameList.innerHTML = "";
    errorMsg.style.display = "none";

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
    document.getElementById("errorMsg").style.display = "block";
  }
}

// Auto-update footer year
document.addEventListener("DOMContentLoaded", () => {
  loadGames();
  document.getElementById("year").textContent = new Date().getFullYear();
});

