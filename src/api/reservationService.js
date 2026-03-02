// src/api/reservationService.js
// Matches: POST /api/reservations
import { apiPost } from "./apiClient";

export async function createReservation(formData) {
  // Maps frontend form field names to backend Reservation entity fields
  return await apiPost("/reservations", {
    firstName:       formData.firstName,
    lastName:        formData.lastName,
    email:           formData.email,
    phone:           formData.phone,
    reservationDate: formData.date,        // form "date"    → entity "reservationDate"
    timeSlot:        formData.time,        // form "time"    → entity "timeSlot"
    guestCount:      Number(formData.guests), // form "guests" → entity "guestCount"
    occasion:        formData.occasion    || null,
    specialRequests: formData.specialRequests || null,
  });
}
