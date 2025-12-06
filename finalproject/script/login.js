// login.js - client validation + optional localStorage "remember me"
function initLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  // Prefill email from localStorage
  const last = localStorage.getItem('kings_lastUser');
  if (last) {
    const emailInput = document.getElementById('email');
    if (emailInput && !emailInput.value) emailInput.value = last;
  }

  form.addEventListener('submit', (e) => {
    // basic validation
    const email = document.getElementById('email');
    const pwd = document.getElementById('password');
    if (!email.value || !pwd.value) {
      e.preventDefault();
      alert('Please enter both email and password.');
      return;
    }

    // if remember checked, store email in localStorage
    const remember = document.getElementById('remember');
    if (remember && remember.checked) {
      localStorage.setItem('kings_lastUser', email.value);
    } else {
      localStorage.removeItem('kings_lastUser');
    }

    // form uses GET action to login-action.html so no need to preventDefault
  });
}

export { initLogin };
