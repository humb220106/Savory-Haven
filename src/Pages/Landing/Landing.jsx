import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UtensilsCrossed, Star, Clock, MapPin, ChevronDown } from "lucide-react"
import "./Landing.css"

const Landing = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <div className={`landing-page ${visible ? "visible" : ""}`}>

      {/* Background */}
      <div className="landing-bg">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=900&fit=crop"
          alt="Restaurant"
          className="landing-bg-img"
        />
        <div className="landing-overlay" />
      </div>

      {/* Top bar */}
      <div className="landing-topbar">
        <div className="landing-logo">
          <UtensilsCrossed size={24} color="#c8963e" />
          <span>Savory Haven</span>
        </div>
        <div className="landing-topbar-right">
          <button className="landing-login-btn" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>

      {/* Center content */}
      <div className="landing-center">
        <div className="landing-badge">
          <Star size={14} fill="#c8963e" color="#c8963e" />
          <span>Fine Dining Experience</span>
          <Star size={14} fill="#c8963e" color="#c8963e" />
        </div>

        <h1 className="landing-title">
          Welcome to<br />
          <span className="landing-title-gold">Savory Haven</span>
        </h1>

        <p className="landing-subtitle">
          Where every meal tells a story. Experience the finest cuisines<br />
          crafted with passion, served with elegance.
        </p>

        <div className="landing-stats">
          <div className="landing-stat">
            <span className="stat-number">4.9</span>
            <div className="stat-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="#c8963e" color="#c8963e" />
              ))}
            </div>
            <span className="stat-label">Rating</span>
          </div>
          <div className="landing-stat-divider" />
          <div className="landing-stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Happy Guests</span>
          </div>
          <div className="landing-stat-divider" />
          <div className="landing-stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">Menu Items</span>
          </div>
        </div>

        <div className="landing-buttons">
          <button
            className="landing-btn-primary"
            onClick={() => navigate("/home")}
          >
            Explore Restaurant
          </button>
          <button
            className="landing-btn-secondary"
            onClick={() => navigate("/reservations")}
          >
            Reserve a Table
          </button>
        </div>

        <div className="landing-info">
          <div className="landing-info-item">
            <Clock size={16} color="#c8963e" />
            <span>Mon – Sun: 12:00 PM – 11:00 PM</span>
          </div>
          <div className="landing-info-divider" />
          <div className="landing-info-item">
            <MapPin size={16} color="#c8963e" />
            <span>123 Culinary Street, Downtown</span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="landing-scroll-hint" onClick={() => navigate("/login")}>
        <span>Discover More</span>
        <ChevronDown size={20} color="#c8963e" />
      </div>

    </div>
  )
}

export default Landing