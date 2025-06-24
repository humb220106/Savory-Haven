import { useState } from "react"
import { Link } from "react-router-dom"
import "./Reservation.css"
import reservationData from "./Reservation.json"

const Reservation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: reservationData.formFields.guests.defaultValue,
    occasion: "",
    specialRequests: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage(reservationData.content.form.successMessage)
      setIsSubmitting(false)
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: reservationData.formFields.guests.defaultValue,
        occasion: "",
        specialRequests: "",
      })
    }, 2000)
  }

  // Get today's date for min date attribute
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="reservation-page">
      {/* Hero Section */}
      <section className="reservation-hero">
        <div className="hero-image-container">
          <img
            src={reservationData.images.hero || "/placeholder.svg"}
            alt={reservationData.images.heroAlt}
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{reservationData.content.hero.title}</h1>
            <p className="hero-subtitle">{reservationData.content.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section className="reservation-form-section">
        <div className="container">
          <div className="reservation-content">
            <div className="form-container">
              <h2 className="form-title">{reservationData.content.form.title}</h2>
              <p className="form-subtitle">{reservationData.content.form.subtitle}</p>

              {submitMessage && <div className="success-message">{submitMessage}</div>}

              <form onSubmit={handleSubmit} className="reservation-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">
                      {reservationData.formFields.firstName.label}
                      {reservationData.formFields.firstName.required && " *"}
                    </label>
                    <input
                      type={reservationData.formFields.firstName.type}
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required={reservationData.formFields.firstName.required}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">
                      {reservationData.formFields.lastName.label}
                      {reservationData.formFields.lastName.required && " *"}
                    </label>
                    <input
                      type={reservationData.formFields.lastName.type}
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required={reservationData.formFields.lastName.required}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">
                      {reservationData.formFields.email.label}
                      {reservationData.formFields.email.required && " *"}
                    </label>
                    <input
                      type={reservationData.formFields.email.type}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required={reservationData.formFields.email.required}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">
                      {reservationData.formFields.phone.label}
                      {reservationData.formFields.phone.required && " *"}
                    </label>
                    <input
                      type={reservationData.formFields.phone.type}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required={reservationData.formFields.phone.required}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">
                      {reservationData.formFields.date.label}
                      {reservationData.formFields.date.required && " *"}
                    </label>
                    <input
                      type={reservationData.formFields.date.type}
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={today}
                      required={reservationData.formFields.date.required}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">
                      {reservationData.formFields.time.label}
                      {reservationData.formFields.time.required && " *"}
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required={reservationData.formFields.time.required}
                    >
                      <option value="">{reservationData.formFields.time.placeholder}</option>
                      {reservationData.reservation.timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="guests">
                      {reservationData.formFields.guests.label}
                      {reservationData.formFields.guests.required && " *"}
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      required={reservationData.formFields.guests.required}
                    >
                      {[...Array(reservationData.reservation.maxGuests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="occasion">{reservationData.formFields.occasion.label}</label>
                    <select id="occasion" name="occasion" value={formData.occasion} onChange={handleInputChange}>
                      <option value="">{reservationData.formFields.occasion.placeholder}</option>
                      {reservationData.reservation.occasions.map((occasion) => (
                        <option key={occasion} value={occasion}>
                          {occasion}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="specialRequests">{reservationData.formFields.specialRequests.label}</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={reservationData.formFields.specialRequests.rows}
                    placeholder={reservationData.formFields.specialRequests.placeholder}
                  ></textarea>
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Request Reservation"}
                </button>
              </form>
            </div>

            <div className="reservation-info">
              <div className="info-card">
                <h3>Reservation Policies</h3>
                <ul>
                  {reservationData.reservation.policies.map((policy, index) => (
                    <li key={index}>{policy}</li>
                  ))}
                </ul>
              </div>

              <div className="info-card">
                <h3>Contact Information</h3>
                <div className="contact-item">
                  <strong>Phone:</strong> {reservationData.restaurant.contact.phone}
                </div>
                <div className="contact-item">
                  <strong>Email:</strong> {reservationData.restaurant.contact.email}
                </div>
                <div className="contact-item">
                  <strong>Address:</strong> {reservationData.restaurant.contact.address.street}
                  <br />
                  {reservationData.restaurant.contact.address.city}, {reservationData.restaurant.contact.address.state}{" "}
                  {reservationData.restaurant.contact.address.zipCode}
                </div>
              </div>

              <div className="info-card">
                <h3>Hours of Operation</h3>
                {reservationData.restaurant.hoursDisplay.map((schedule, index) => (
                  <div key={index} className="hours-item">
                    <span>{schedule.days}:</span>
                    <span>{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="additional-info-section">
        <div className="container">
          <div className="info-grid">
            {reservationData.services.map((service, index) => (
              <div key={index} className="info-item">
                <div className="info-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="reservation-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">{reservationData.content.cta.title}</h2>
            <p className="cta-description">{reservationData.content.cta.description}</p>
            <div className="cta-buttons">
              <Link to="/contact" className="secondary-button">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reservation
