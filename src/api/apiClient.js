// src/api/apiClient.js
// ─────────────────────────────────────────────────────────────────────────────
// All API calls go through here. Handles:
//   • Base URL (matches your backend launchSettings.json port 7222)
//   • Auto-attaches JWT token to every request
//   • Handles 401 token-expired by clearing auth and redirecting to /login
// ─────────────────────────────────────────────────────────────────────────────

export const API_BASE = "/api";  // Vite proxy forwards this to https://localhost:7222/api

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // Token expired — clear auth and go to login
  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
    return;
  }

  // 204 No Content — nothing to parse
  if (response.status === 204) return null;

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.title || "Something went wrong");
  }

  return data;
}

export const apiGet    = (endpoint)       => request(endpoint, { method: "GET" });
export const apiPost   = (endpoint, body) => request(endpoint, { method: "POST",  body: JSON.stringify(body) });
export const apiPut    = (endpoint, body) => request(endpoint, { method: "PUT",   body: JSON.stringify(body) });
export const apiDelete = (endpoint)       => request(endpoint, { method: "DELETE" });
