// SkillsSpark Authentication and Redirect System
// ---------------------------------------------

// Load user database from localStorage
let users = JSON.parse(localStorage.getItem("ss_users") || "{}");

// Signup handler
document.getElementById("signupForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const age = document.getElementById("signupAge").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value.trim();

  if (users[email]) {
    showAuthMessage("User already exists! Try logging in.", "danger");
    return;
  }

  users[email] = { name, age, email, password, progress: 0, courses: [] };
  localStorage.setItem("ss_users", JSON.stringify(users));

  localStorage.setItem("ss_current", email); // set logged-in user
  showAuthMessage("Signup successful! Redirecting to home...", "success");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
});

// Login handler
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value.trim();

  if (!users[email]) {
    showAuthMessage("User not found! Please sign up.", "danger");
    return;
  }

  if (users[email].password !== password) {
    showAuthMessage("Incorrect password!", "danger");
    return;
  }

  localStorage.setItem("ss_current", email); // login success
  showAuthMessage("Login successful! Redirecting to home...", "success");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
});

// Utility to show messages
function showAuthMessage(message, type) {
  const msgBox = document.getElementById("authMessage");
  if (!msgBox) return;
  msgBox.style.display = "block";
  msgBox.className = `mt-3 text-center text-${type}`;
  msgBox.textContent = message;
}

// ---------------------------------------------
// Navbar Logic (Run on every page)
// ---------------------------------------------
const navLoginBtn = document.getElementById("navLoginBtn");
const welcomeUser = document.getElementById("welcomeUser");
const logoutBtn = document.getElementById("logoutBtn");

const currentUserEmail = localStorage.getItem("ss_current");

if (currentUserEmail && users[currentUserEmail]) {
  const user = users[currentUserEmail];

  // Replace login button with user's name
  if (navLoginBtn) {
    navLoginBtn.style.display = "none";
  }

  if (welcomeUser) {
    welcomeUser.textContent = `Hi, ${user.name}`;
    welcomeUser.style.display = "inline";
  }

  if (logoutBtn) {
    logoutBtn.style.display = "inline-block";
  }
}

// Logout
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("ss_current");
  window.location.href = "index.html";
});
