async function loadGames() {
  const response = await fetch("https://www.freetogame.com/api/games");
  const games = await response.json();
  console.log(games); // Inspect the data
  // Render games dynamically into your page
}
loadGames();
