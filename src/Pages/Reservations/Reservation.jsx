// src/Pages/Reservations/Reservation.jsx
// ─ Submits the form to POST /api/reservations via createReservation()
// ─ Shows success/error feedback. All CSS unchanged.

import { useState } from "react"
import { Link } from "react-router-dom"
import { ParkingCircle, Wifi, Accessibility, CreditCard, Gift, Users } from "lucide-react"
import "./Reservation.css"
import reservationData from "./Reservation.json"
import { createReservation } from "../../api/reservationService"

const ICON_MAP = { parking: ParkingCircle, wifi: Wifi, accessibility: Accessibility, "credit-card": CreditCard, gift: Gift, group: Users }

const EMPTY_FORM = {
  firstName: "", lastName: "", email: "", phone: "",
  date: "", time: "",
  guests: reservationData.formFields.guests.defaultValue,
  occasion: "", specialRequests: "",
}

const Reservation = () => {
  const [formData,      setFormData]      = useState(EMPTY_FORM)
  const [isSubmitting,  setIsSubmitting]  = useState(false)
  const [successMsg,    setSuccessMsg]    = useState("")
  const [errorMsg,      setErrorMsg]      = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMsg("")
    setErrorMsg("")

    try {
      await createReservation(formData)
      setSuccessMsg("Your reservation request has been received! We will confirm by email within a few hours.")
      setFormData(EMPTY_FORM)
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again or call us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="reservation-page">

      {/* Hero */}
      <section className="reservation-hero">
        <div className="hero-image-container">
          <img src={reservationData.images?.hero || "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop"} alt="Savory Haven" className="hero-image" />
          <div className="hero-overlay" />
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{reservationData.content.hero.title}</h1>
            <p className="hero-subtitle">{reservationData.content.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="reservation-form-section">
        <div className="container">
          <div className="reservation-content">
            <div className="form-container">
              <h2 className="form-title">{reservationData.content.form.title}</h2>
              <p className="form-subtitle">{reservationData.content.form.subtitle}</p>

              {successMsg && <div className="success-message">{successMsg}</div>}
              {errorMsg   && (
                <div className="error-message" style={{ background:"#fff0f0", border:"1px solid #f5c6cb", color:"#721c24", padding:"0.75rem 1rem", borderRadius:"6px", marginBottom:"1rem" }}>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="reservation-form">

                <div className="form-row">
                  {["firstName","lastName"].map((field) => (
                    <div className="form-group" key={field}>
                      <label htmlFor={field}>{reservationData.formFields[field].label}{reservationData.formFields[field].required && " *"}</label>
                      <input type={reservationData.formFields[field].type} id={field} name={field} value={formData[field]} onChange={handleInputChange} required={reservationData.formFields[field].required} />
                    </div>
                  ))}
                </div>

                <div className="form-row">
                  {["email","phone"].map((field) => (
                    <div className="form-group" key={field}>
                      <label htmlFor={field}>{reservationData.formFields[field].label}{reservationData.formFields[field].required && " *"}</label>
                      <input type={reservationData.formFields[field].type} id={field} name={field} value={formData[field]} onChange={handleInputChange} required={reservationData.formFields[field].required} />
                    </div>
                  ))}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">{reservationData.formFields.date.label} *</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} min={today} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">{reservationData.formFields.time.label} *</label>
                    <select id="time" name="time" value={formData.time} onChange={handleInputChange} required>
                      <option value="">{reservationData.formFields.time.placeholder}</option>
                      {reservationData.reservation.timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="guests">{reservationData.formFields.guests.label} *</label>
                    <select id="guests" name="guests" value={formData.guests} onChange={handleInputChange} required>
                      {[...Array(reservationData.reservation.maxGuests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? "Guest" : "Guests"}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="occasion">{reservationData.formFields.occasion.label}</label>
                    <select id="occasion" name="occasion" value={formData.occasion} onChange={handleInputChange}>
                      <option value="">{reservationData.formFields.occasion.placeholder}</option>
                      {reservationData.reservation.occasions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="specialRequests">{reservationData.formFields.specialRequests.label}</label>
                  <textarea id="specialRequests" name="specialRequests" value={formData.specialRequests} onChange={handleInputChange} rows={reservationData.formFields.specialRequests.rows} placeholder={reservationData.formFields.specialRequests.placeholder} />
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting…" : "Request Reservation"}
                </button>
              </form>
            </div>

            {/* Sidebar info */}
            <div className="reservation-info">
              <div className="info-card">
                <h3>Reservation Policies</h3>
                <ul>{reservationData.reservation.policies.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
              <div className="info-card">
                <h3>Contact Information</h3>
                <div className="contact-item"><strong>Phone:</strong> {reservationData.restaurant.contact.phone}</div>
                <div className="contact-item"><strong>Email:</strong> {reservationData.restaurant.contact.email}</div>
                <div className="contact-item">
                  <strong>Address:</strong> {reservationData.restaurant.contact.address.street}<br />
                  {reservationData.restaurant.contact.address.city}, {reservationData.restaurant.contact.address.state} {reservationData.restaurant.contact.address.zipCode}
                </div>
              </div>
              <div className="info-card">
                <h3>Hours of Operation</h3>
                {reservationData.restaurant.hoursDisplay.map((s, i) => (
                  <div key={i} className="hours-item"><span>{s.days}:</span><span>{s.hours}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="additional-info-section">
        <div className="container">
          <div className="info-grid">
            {reservationData.services.map((service, index) => {
              const Icon = ICON_MAP[service.icon] || null
              return (
                <div key={index} className="info-item">
                  <div className="info-icon">{Icon && <Icon size={32} />}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="reservation-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">{reservationData.content.cta.title}</h2>
            <p className="cta-description">{reservationData.content.cta.description}</p>
            <div className="cta-buttons">
              <Link to="/contact" className="secondary-button">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reservation
