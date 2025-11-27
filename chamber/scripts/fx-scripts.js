//  Update Footer Date Automatically
document.querySelector(".modification").textContent = document.lastModified;

// Directory menu is handled centrally in scripts/menu.js

//  Fetch and Display Members from JSON
async function loadMembers() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayMembers(members) {
  const cardsContainer = document.getElementById("cards");
  cardsContainer.innerHTML = "";

  // Only show the first 8 members for assignment
  members.slice(0, 8).forEach((member, idx) => {
    const card = document.createElement("div");
    card.className = `directory-card card${idx+1}`;
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="120">
      <h3>${member.name}</h3>
      <p class="card-desc">${member.description || 'A leading VFX studio/artist in Nigeria.'}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="card-btn">Learn More</a>
      <p><strong>${member.membership} Member</strong></p>
    `;
    cardsContainer.appendChild(card);
  });

  // Animate cards when they appear
  const cards = document.querySelectorAll(".directory-card");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  cards.forEach(card => observer.observe(card));
}

//Grid/List View Toggle
const gridButton = document.getElementById("grid-toggle");
const listButton = document.getElementById("list-toggle");
const cardsContainer = document.getElementById("cards");

gridButton.addEventListener("click", () => {
  cardsContainer.classList.add("grid-view");
  cardsContainer.classList.remove("list-view");
  gridButton.classList.add("active-view");
  listButton.classList.remove("active-view");
});

listButton.addEventListener("click", () => {
  cardsContainer.classList.add("list-view");
  cardsContainer.classList.remove("grid-view");
  listButton.classList.add("active-view");
  gridButton.classList.remove("active-view");
});

// Load Members When Page is Ready
document.addEventListener("DOMContentLoaded", loadMembers);
