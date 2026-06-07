
const form = document.getElementById("login-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "admin" && password === "admin123") {
    window.location.href = "./main.html"; 
  } else {
    alert("Invalid Credentials");
  }
});

