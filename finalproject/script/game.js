// Loads JSON into a specific grid on games.html
export async function loadGamesInto(id) {
  const box = document.getElementById(id);
  try {
    const res = await fetch("data/game.json");
    const games = await res.json();

    box.innerHTML = games
      .map(g => `
        <article class="tile">
          <img src="${g.image}" alt="${g.title} cover" loading="lazy">
          <h4>${g.title}</h4>
          <p>${g.genre} • ${g.price}</p>
        </article>
      `)
      .join("");
  } catch (err) {
    box.innerHTML = `<p style="color:#f44">Could not load games.</p>`;
  }
}
