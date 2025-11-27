// Site-wide utilities: footer year and last-visit message
document.addEventListener('DOMContentLoaded', () => {
  // Footer year (if present)
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Last visit message
  const visitMsg = document.getElementById('visit-message');
  if (!visitMsg) return;
  const lastVisit = localStorage.getItem('lastVisit');
  const now = new Date();
  if (lastVisit) {
    const last = new Date(lastVisit);
    const diffTime = Math.abs(now - last);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      visitMsg.textContent = 'Welcome back! You last visited today.';
    } else if (diffDays === 1) {
      visitMsg.textContent = 'Welcome back! It has been 1 day since your last visit.';
    } else {
      visitMsg.textContent = `Welcome back! It has been ${diffDays} days since your last visit.`;
    }
  } else {
    visitMsg.textContent = 'Welcome! This is your first visit.';
  }
  localStorage.setItem('lastVisit', now);
});
