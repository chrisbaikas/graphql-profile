/* ---------------- CONFIG ---------------- */
// Zone01 platform domain. Used for both auth (signin) and GraphQL.
const DOMAIN = "platform.zone01.gr";
const SIGNIN_URL = `https://${DOMAIN}/api/auth/signin`;
const GRAPHQL_URL = `https://${DOMAIN}/api/graphql-engine/v1/graphql`;

const loginView = document.getElementById("login-view");
const dashboardView = document.getElementById("dashboard-view");

const loginForm = document.getElementById("login-form");
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

if (loginForm) {
  loginForm.addEventListener("submit", login);
}

async function login(event) {
  if (event) event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const credentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch(SIGNIN_URL, {
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