const form = document.getElementById("login-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin123") {

    alert("Login Successful");

    window.location.href = "main.html";

  } else {
    alert("Invalid Credentials");
  }
});

