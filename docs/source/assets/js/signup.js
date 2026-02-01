console.log("✅ signup.js connected successfully!");
const signupForm = document.getElementById("signupForm");

const usernameInput = document.getElementById("signup-username");
const emailInput = document.getElementById("signup-email");
const passwordInput = document.getElementById("signup-password");
const confirmInput = document.getElementById("signup-confirm");

// Load users from storage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Handle signup
signupForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop page reload

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirm = confirmInput.value.trim();

  // Validation
  if (!username || !email || !password || !confirm) {
    alert("Please fill all fields!");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters!");
    return;
  }

  // Check if username exists
  const exists = users.some(u => u.username === username);

  if (exists) {
    alert("Username already exists!");
    return;
  }

  // Save new user
  users.push({
    username: username,
    email: email,
    password: password
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("✅ Account created successfully!");

  // Redirect to login
  window.location.href = "login.html";
});