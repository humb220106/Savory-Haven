import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { register } from "../../api/authService"
import "./Register.css"

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: "", email: "", password: "", phoneNumber: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

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
    <div className="register-page">
      <div className="register-card">
        <div className="register-brand">
          <span>🍽️</span>
          <h1>Savory Haven</h1>
        </div>
        <h2>Create Account</h2>
        <p className="register-sub">Join us for an unforgettable experience</p>

        {error && <div className="register-error">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} required placeholder="johndoe" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="+1 555 000 0000" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="••••••••" />
          </div>
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default Register