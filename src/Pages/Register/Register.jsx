import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { UtensilsCrossed, User, Mail, Phone, Lock, ArrowRight, Eye, EyeOff } from "lucide-react"
import { register } from "../../api/authService"
import "./Register.css"

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: "", email: "", password: "", phoneNumber: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      await register(form)
      navigate("/login")
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      {/* Left Panel */}
      <div className="auth-left">
        <img
          src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&h=1200&fit=crop"
          alt="Fine dining"
          className="auth-bg-img"
        />
        <div className="auth-left-overlay" />
        <div className="auth-left-content">
          <UtensilsCrossed size={40} color="#c8963e" />
          <h2>Join Savory Haven</h2>
          <p>Create your account and unlock exclusive dining experiences, reservations, and more.</p>
          <div className="auth-left-perks">
            <div className="auth-perk">✓ Easy table reservations</div>
            <div className="auth-perk">✓ Exclusive member offers</div>
            <div className="auth-perk">✓ Priority booking</div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-form-wrap">

          <Link to="/" className="auth-back">← Back to Home</Link>

          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Join us for an unforgettable dining experience</p>
          </div>

          {error && (
            <div className="auth-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label>Username</label>
              <div className="auth-input-wrap">
                <User size={18} color="#999" className="auth-input-icon" />
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Email Address</label>
              <div className="auth-input-wrap">
                <Mail size={18} color="#999" className="auth-input-icon" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Phone Number</label>
              <div className="auth-input-wrap">
                <Phone size={18} color="#999" className="auth-input-icon" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="+1 555 000 0000"
                />
              </div>
            </div>

            <div className="auth-field">
              <label>Password</label>
              <div className="auth-input-wrap">
                <Lock size={18} color="#999" className="auth-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} color="#999" /> : <Eye size={18} color="#999" />}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <span className="auth-spinner" />
              ) : (
                <>Create Account <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register