// src/Pages/Contact/contact.jsx
// ─ Submits to POST /api/contact via sendContactMessage()

import { useState } from "react"
import { Link } from "react-router-dom"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import "./contact.css"
import { sendContactMessage } from "../../api/contactService"

const SUBJECTS = ["General Inquiry","Reservation","Private Events","Feedback","Catering","Other"]

const CONTACT_METHODS = [
  { icon: <Phone size={28} />,  title: "Phone",    primary: "(555) 123-4567",      secondary: "Available daily 4:00 PM - 11:00 PM", action: "tel:+15551234567" },
  { icon: <Mail size={28} />,   title: "Email",    primary: "info@savoryhaven.com", secondary: "We respond within 24 hours",          action: "mailto:info@savoryhaven.com" },
  { icon: <MapPin size={28} />, title: "Location", primary: "123 Culinary Street",  secondary: "Downtown District, City 12345",        action: "https://maps.google.com" },
  { icon: <Clock size={28} />,  title: "Hours",    primary: "Mon-Thu: 5PM-10PM",    secondary: "Fri-Sat: 5PM-11PM, Sun: 4PM-9PM",     action: null },
]

const EMPTY = { name:"", email:"", phone:"", subject:"", message:"" }

const Contact = () => {
  const [formData,     setFormData]     = useState(EMPTY)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg,   setSuccessMsg]   = useState("")
  const [errorMsg,     setErrorMsg]     = useState("")

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
      await sendContactMessage(formData)
      setSuccessMsg("Thank you for your message! We'll get back to you within 24 hours. For urgent matters, please call us directly.")
      setFormData(EMPTY)
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <div className="hero-image-container">
          <img src="https://images.unsplash.com/photo-1552566090-a4c64d4e4506?w=1200&h=600&fit=crop" alt="Savory Haven" className="hero-image" />
          <div className="hero-overlay" />
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Get in Touch</h1>
            <p className="hero-subtitle">We'd love to hear from you. Contact us for reservations, inquiries, or just to say hello.</p>
          </div>
        </div>
      </section>

      {/* Contact method cards */}
      <section className="contact-methods-section">
        <div className="container">
          <div className="contact-methods-grid">
            {CONTACT_METHODS.map((m, i) => (
              <div key={i} className="contact-method-card">
                <div className="method-icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p className="method-primary">{m.primary}</p>
                <p className="method-secondary">{m.secondary}</p>
                {m.action && <a href={m.action} className="method-link">Connect</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-content">
            <div className="form-container">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>

              {successMsg && <div className="success-message">{successMsg}</div>}
              {errorMsg   && (
                <div style={{ background:"#fff0f0", border:"1px solid #f5c6cb", color:"#721c24", padding:"0.75rem 1rem", borderRadius:"6px", marginBottom:"1rem" }}>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required>
                    <option value="">Select a subject</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={6} required placeholder="Tell us how we can help…" />
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            </div>

            <div className="contact-sidebar">
              <div className="social-card">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="#" className="social-link"><Facebook size={20} /> Facebook</a>
                  <a href="#" className="social-link"><Instagram size={20} /> Instagram</a>
                  <a href="#" className="social-link"><Twitter size={20} /> Twitter</a>
                  <a href="#" className="social-link"><Linkedin size={20} /> LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
