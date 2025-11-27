// ==========================
// FOOTER YEAR
// ==========================
document.getElementById('year').textContent = new Date().getFullYear();

// ==========================
// WEATHER SECTION (OpenWeather Forecast API)
// ==========================
const apiKey = "b8870765ca85e83418bd6f2cfa9c2ade";
const city = "benin"; //  
const weatherContainer = document.getElementById("weather-data");

async function getWeather() {
  try {
    // Use the forecast API 
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== "200") {
      weatherContainer.innerHTML = `<p>Weather data unavailable.</p>`;
      return;
    }

    // Current weather = first item
    const current = data.list[0];
    const currentTemp = Math.round(current.main.temp);
    const description = current.weather[0].description;

    // Generate 3-day forecast (one per day)
    const forecast = data.list
      .filter((_, i) => i % 8 === 0) // each 24 hours
      .slice(1, 4); // next 3 days only

    // Insert into HTML
    weatherContainer.innerHTML = `
      <p><strong>Current:</strong> ${currentTemp}°C, ${description}</p>

      <h3>3-Day Forecast</h3>
      <ul>
        ${forecast
          .map(day => `
            <li>
              ${new Date(day.dt_txt).toLocaleDateString([], { weekday: "short" })}:
              ${Math.round(day.main.temp)}°C
            </li>
          `)
          .join("")}
      </ul>
    `;
  } catch (error) {
    weatherContainer.innerHTML = `<p>Weather data unavailable.</p>`;
  }
}

getWeather();

// ==========================
// COMPANY SPOTLIGHT
// ==========================
async function loadSpotlights() {
  const res = await fetch("data/members.json");
  const data = await res.json();

  const goldSilver = data.members.filter(
    (m) => m.membership === "Gold" || m.membership === "Silver"
  );

  const selected = goldSilver
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  const container = document.getElementById("spotlight-container");

  container.innerHTML = selected
    .map(
      (m) => `
      <div class="spotlight">
        <img src="${m.image}" alt="${m.name} logo" />
        <h3>${m.name}</h3>
        <p>${m.membership} Member</p>
        <p>${m.phone}</p>
        <p>${m.address}</p>
        <a href="${m.website}" target="_blank" class="cta-btn">Visit Website</a>
      </div>`
    )
    .join("");
}

loadSpotlights();

// ==========================
// HERO AUTO SLIDESHOW
// ==========================
let heroIndex = 0;
autoHeroSlides();

function autoHeroSlides() {
  const slides = document.querySelectorAll(".hero-slide");

  slides.forEach((slide) => (slide.style.display = "none"));

  heroIndex++;
  if (heroIndex > slides.length) heroIndex = 1;

  slides[heroIndex - 1].style.display = "block";

  setTimeout(autoHeroSlides, 5000);
}
