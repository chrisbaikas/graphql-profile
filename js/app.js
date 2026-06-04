const loginView = document.getElementById("login-view");
const dashboardView = document.getElementById("dashboard-view");

const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");

const errorText = document.getElementById("error");

// check if user is already logged in
const token = localStorage.getItem("token");

if (token) {
  showDashboard();
} else {
  showLogin();
}

function showLogin() {
  loginView.style.display = "block";
  dashboardView.style.display = "none";
}

function showDashboard() {
  loginView.style.display = "none";
  dashboardView.style.display = "block";
}

/* ---------------- LOGIN ---------------- */

if (loginBtn) {
  loginBtn.addEventListener("click", login);
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const credentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch("https://DOMAIN/api/auth/signin", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`
      }
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const token = await response.text();

    localStorage.setItem("token", token);

    if (errorText) errorText.textContent = "";

    showDashboard();

  } catch (err) {
    if (errorText) {
      errorText.textContent = err.message;
    }
  }
}

/* ---------------- LOGOUT ---------------- */

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    showLogin();
  });
}