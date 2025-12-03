document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = form.username.value.trim();
    const password = form.password.value.trim();

    if (username && password) {
      alert(`Welcome back, ${username}!`);
      // Here you would normally send data to your server
    } else {
      alert("Please enter both username and password.");
    }
  });
});
