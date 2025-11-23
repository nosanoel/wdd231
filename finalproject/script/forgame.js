async function loadGames() {
  try {
    const response = await fetch("https://www.freetogame.com/api/games");
    const games = await response.json();

    const gameList = document.getElementById("gameList");
    gameList.innerHTML = "";

    games.slice(0, 20).forEach(game => { // limit to 20 for speed
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
  }
}

document.addEventListener("DOMContentLoaded", loadGames);
