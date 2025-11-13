// vfx.js
// ============
// Script for VFX Chambar Chamber of Commerce site
// Handles: menu, footer year, weather API, and member spotlights

// ====================
// Responsive Menu
// ====================
const menuBtn = document.querySelector('#menu-btn');
const mainNav = document.querySelector('#main-nav');

menuBtn.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  menuBtn.classList.toggle('open');
});

// ====================
// Dynamic Year in Footer
// ====================
document.querySelector('#year').textContent = new Date().getFullYear();

// ====================
// Weather Section
// ====================
// Use OpenWeatherMap API: https://openweathermap.org/forecast5
// Replace "YOUR_API_KEY" 
const apiKey = "YOUR_API_KEY"; 
const city = "Los Angeles"; 
const weatherContainer = document.getElementById("weather-data");

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    );

    if (!response.ok) throw new Error("Weather data unavailable");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherContainer.innerHTML = `<p class="error">Error loading weather data. Please try again later.</p>`;
    console.error(error);
  }
}

function displayWeather(data) {
  // current conditions
  const current = data.list[0];
  const currentTemp = Math.round(current.main.temp);
  const description = current.weather[0].description;
  const icon = current.weather[0].icon;

  // 3-day forecast (1 per day at roughly 24-hour intervals)
  const forecastDays = [8, 16, 24]; // ~24, 48, 72 hrs later
  const forecasts = forecastDays.map(i => {
    const item = data.list[i];
    return {
      date: new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
      desc: item.weather[0].description
    };
  });

  weatherContainer.innerHTML = `
    <div class="current-weather">
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
      <p><strong>${city}</strong></p>
      <p>${currentTemp}°F – ${description}</p>
    </div>
    <div class="forecast">
      ${forecasts
        .map(
          (f) => `
        <div class="forecast-day">
          <p>${f.date}</p>
          <img src="https://openweathermap.org/img/wn/${f.icon}.png" alt="${f.desc}">
          <p>${f.temp}°F</p>
        </div>`
        )
        .join("")}
    </div>
  `;
}

getWeather();

// ====================
// Member Spotlight Section
// ====================

async function loadSpotlights() {
  try {
    const response = await fetch("menber.json");
    if (!response.ok) throw new Error("Error loading member data");
    const members = await response.json();

    // Filter only gold/silver members
    const filtered = members.filter(
      (m) => m.membership.toLowerCase() === "gold" || m.membership.toLowerCase() === "silver"
    );

    // Randomize and select 2–3
    const randomMembers = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.getElementById("spotlight-container");
    container.innerHTML = randomMembers
      .map(
        (m) => `
        <article class="spotlight-card">
          <img src="${m.logo}" alt="${m.name} logo">
          <h3>${m.name}</h3>
          <p><strong>${m.membership} Member</strong></p>
          <p>${m.phone}</p>
          <p>${m.address}</p>
          <a href="${m.website}" target="_blank" rel="noopener">Visit Website</a>
        </article>
      `
      )
      .join("");
  } catch (error) {
    console.error(error);
    document.getElementById("spotlight-container").innerHTML =
      "<p>Error loading member spotlights.</p>";
  }
}

loadSpotlights();
