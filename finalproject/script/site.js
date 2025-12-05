// site.js — shared tiny utilities for pages
// sets the footer year wherever an element with id="year" exists
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
