// script/menul.js

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("menu");
  const yearSpan = document.getElementById("year");

  // Toggle menu
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !isExpanded);
    menu.hidden = isExpanded;
  });

  // Auto-update footer year
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
