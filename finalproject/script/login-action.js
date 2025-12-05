// login-action.js — moved from inline script in login-action.html
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const email = params.get('email') || '';
  if (email) localStorage.setItem('kings_lastUser', email);

  const container = document.getElementById('action');
  if (container) {
    container.innerHTML = `
      <h1>Welcome back</h1>
      <p>Signed in as <strong>${escapeHtml(email)}</strong></p>
      <p><a href="index.html">Return to Home</a></p>`;
  }
});

function escapeHtml(s){
  return s ? s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c])) : '';
}
