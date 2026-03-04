import { apiGet, apiPost, apiPut, apiDelete } from "./apiClient"

// ── Dishes ────────────────────────────────────────────────────────────────────
export const adminGetDishes       = ()         => apiGet("/admin/dishes")
export const adminCreateDish      = (body)     => apiPost("/admin/dishes", body)
export const adminUpdateDish      = (id, body) => apiPut(`/admin/dishes/${id}`, body)
export const adminDeleteDish      = (id)       => apiDelete(`/admin/dishes/${id}`)
export const adminToggleDish      = (id)       => apiPut(`/admin/dishes/${id}/toggle-active`)

// ── Categories ────────────────────────────────────────────────────────────────
export const adminGetCategories   = ()         => apiGet("/admin/categories")

// ── Reservations ──────────────────────────────────────────────────────────────
export const adminGetReservations = ()         => apiGet("/admin/reservations")
export const adminUpdateReservationStatus = (id, status) =>
  apiPut(`/admin/reservations/${id}/status`, { status })

// ── Users ─────────────────────────────────────────────────────────────────────
export const adminGetUsers        = ()         => apiGet("/admin/users")

// ── Dashboard Stats ───────────────────────────────────────────────────────────
export const adminGetStats        = ()         => apiGet("/admin/stats")