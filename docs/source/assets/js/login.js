console.log("✅ login.js connected successfully!");

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Load saved users
let users = JSON.parse(localStorage.getItem("users")) || [];

// Handle login
loginForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop page refresh

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Validation
  if (username === "" || password === "") {
    alert("Please fill all fields!");
    return;
  }

  // Find user
  const user = users.find(u =>
    u.username === username &&
    u.password === password
  );

  if (user) {

    // Save login session
    localStorage.setItem("currentUser", username);

    alert("✅ Login Successful!");

    // Go to dashboard
    window.location.href = "index.html";

  } else {

    alert("❌ Invalid username or password!");

  }
});