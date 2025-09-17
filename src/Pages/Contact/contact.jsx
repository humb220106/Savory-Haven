import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Map as MapIcon
} from "lucide-react"
import "./contact.css"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const contactMethods = [
    {
      icon: <Phone size={28} />,
      title: "Phone",
      primary: "(555) 123-4567",
      secondary: "Available daily 4:00 PM - 11:00 PM",
      action: "tel:+15551234567",
    },
    {
      icon: <Mail size={28} />,
      title: "Email",
      primary: "info@savoryhaven.com",
      secondary: "We respond within 24 hours",
      action: "mailto:info@savoryhaven.com",
    },
    {
      icon: <MapPin size={28} />,
      title: "Location",
      primary: "123 Culinary Street",
      secondary: "Downtown District, City 12345",
      action: "https://maps.google.com",
    },
    {
      icon: <Clock size={28} />,
      title: "Hours",
      primary: "Mon-Thu: 5PM-10PM",
      secondary: "Fri-Sat: 5PM-11PM, Sun: 4PM-9PM",
      action: null,
    },
  ]

  const subjects = [
    "General Inquiry",
    "Reservation Question",
    "Private Events",
    "Catering Services",
    "Feedback",
    "Press Inquiry",
    "Other",
  ]

  const faqs = [
    {
      question: "Do you take walk-ins?",
      answer:
        "Yes, we welcome walk-ins based on availability. However, we recommend making a reservation to guarantee your table, especially during peak hours and weekends.",
    },
    {
      question: "Do you offer private dining?",
      answer:
        "We have a private dining room that accommodates up to 20 guests. Perfect for special occasions, business dinners, or intimate celebrations. Contact us for details and pricing.",
    },
    {
      question: "Can you accommodate dietary restrictions?",
      answer:
        "Yes, we're happy to accommodate various dietary needs including vegetarian, vegan, gluten-free, and specific allergies. Please inform us when making your reservation or speak with your server.",
    },
    {
      question: "Do you offer catering services?",
      answer:
        "Yes, we provide catering services for events of all sizes. From intimate gatherings to large corporate events, our team can create a customized menu for your special occasion.",
    },
    {
      question: "Is there parking available?",
      answer:
        "We offer complimentary valet parking for our guests. Street parking and nearby public parking garages are also available within a short walking distance.",
    },
  ]

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
      setSubmitMessage(
        "Thank you for your message! We'll get back to you within 24 hours. For urgent matters, please call us directly.",
      )
      setIsSubmitting(false)
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 2000)
  }

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-image-container">
          <img
            src="https://images.unsplash.com/photo-1552566090-a4c64d4e4506?w=1200&h=600&fit=crop"
            alt="Savory Haven restaurant exterior"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Get in Touch</h1>
            <p className="hero-subtitle">
              We'd love to hear from you. Contact us for reservations, inquiries, or just to say hello.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="contact-methods-section">
        <div className="container">
          <div className="contact-methods-grid">
            {contactMethods.map((method, index) => (
              <div key={index} className="contact-method-card">
                <div className="method-icon">{method.icon}</div>
                <h3 className="method-title">{method.title}</h3>
                <div className="method-primary">
                  {method.action ? (
                    <a href={method.action} className="method-link">
                      {method.primary}
                    </a>
                  ) : (
                    method.primary
                  )}
                </div>
                <div className="method-secondary">{method.secondary}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-content">
            <div className="form-container">
              <h2 className="form-title">Send Us a Message</h2>
              <p className="form-subtitle">
                Have a question or special request? Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              {submitMessage && <div className="success-message">{submitMessage}</div>}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
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
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            <div className="contact-info">
              <div className="info-card">
                <h3>Visit Our Restaurant</h3>
                <div className="address-info">
                  <p>
                    <strong>Savory Haven</strong>
                  </p>
                  <p>123 Culinary Street</p>
                  <p>Downtown District, City 12345</p>
                  <p>United States</p>
                </div>
                <div className="directions">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="directions-link"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div className="info-card">
                <h3>Operating Hours</h3>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>Monday - Thursday</span>
                    <span>5:00 PM - 10:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Friday - Saturday</span>
                    <span>5:00 PM - 11:00 PM</span>
                  </div>
                  <div className="hours-item">
                    <span>Sunday</span>
                    <span>4:00 PM - 9:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="#" className="social-link">
                    <span className="social-icon"><Facebook size={20} /></span>
                    Facebook
                  </a>
                  <a href="#" className="social-link">
                    <span className="social-icon"><Instagram size={20} /></span>
                    Instagram
                  </a>
                  <a href="#" className="social-link">
                    <span className="social-icon"><Twitter size={20} /></span>
                    Twitter
                  </a>
                  <a href="#" className="social-link">
                    <span className="social-icon"><Linkedin size={20} /></span>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2 className="section-title">Find Us</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-content">
                <div className="map-icon"><MapIcon size={32} /></div>
                <h3>Interactive Map</h3>
                <p>123 Culinary Street, Downtown District</p>
                <p>Located in the heart of the culinary district, easily accessible by public transport and car.</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="map-link">
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Dine With Us?</h2>
            <p className="cta-description">
              Experience exceptional cuisine and warm hospitality at Savory Haven. Make your reservation today and join
              us for an unforgettable dining experience.
            </p>
            <div className="cta-buttons">
              <Link to="/reservation" className="primary-button">
                Make a Reservation
              </Link>
              <Link to="/menu" className="secondary-button">
                View Our Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
