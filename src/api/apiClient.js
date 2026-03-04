export const API_BASE = "/api";

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

  // Token expired
  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
    return;
  }

  // No content responses
  if (response.status === 204 || response.status === 205) return null;

  // Safely parse — backend might return empty body on some endpoints
  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      // Backend returned non-JSON (e.g. plain text message)
      if (!response.ok) throw new Error(text || "Something went wrong");
      return text;
    }
  }

  if (!response.ok) {
    // Handle ASP.NET validation error shape: { errors: { field: ["msg"] } }
    if (data?.errors) {
      const messages = Object.values(data.errors).flat().join(" ");
      throw new Error(messages);
    }
    throw new Error(data?.message || data?.title || "Something went wrong");
  }

  return data;
}

export const apiGet    = (endpoint)       => request(endpoint, { method: "GET" });
export const apiPost   = (endpoint, body) => request(endpoint, { method: "POST",   body: JSON.stringify(body) });
export const apiPut    = (endpoint, body) => request(endpoint, { method: "PUT",    body: JSON.stringify(body) });
export const apiDelete = (endpoint)       => request(endpoint, { method: "DELETE" });