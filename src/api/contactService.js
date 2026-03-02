// src/api/contactService.js
// Matches: POST /api/contact
import { apiPost } from "./apiClient";

export async function sendContactMessage(formData) {
  return await apiPost("/contact", {
    name:    formData.name,
    email:   formData.email,
    phone:   formData.phone   || null,
    subject: formData.subject,
    message: formData.message,
  });
}
