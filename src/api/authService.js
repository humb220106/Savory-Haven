// src/api/authService.js
// Matches: POST /api/auth/register | login | logout | refresh
import { apiPost } from "./apiClient";

export async function register(userData) {
  // { username, email, password, phoneNumber }
  return await apiPost("/auth/register", userData);
}

export async function login(username, password) {
  const data = await apiPost("/auth/login", { username, password });
  localStorage.setItem("accessToken",  data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("user",         JSON.stringify(data.user));
  return data;
}

export async function logout() {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    await apiPost("/auth/logout", { refreshToken });
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
}

export async function refreshAccessToken() {
  const token = localStorage.getItem("refreshToken");
  const data  = await apiPost("/auth/refresh", { refreshToken: token });
  localStorage.setItem("accessToken",  data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  return data;
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isLoggedIn() {
  return !!localStorage.getItem("accessToken");
}

export function isAdmin() {
  const user = getCurrentUser();
  return user?.roles?.includes("Admin") ?? false;
}
