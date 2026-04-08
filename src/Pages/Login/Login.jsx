import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { UtensilsCrossed, User, Lock, ArrowRight, Eye, EyeOff, Star, Coffee, Flame, Leaf } from "lucide-react"
import { login } from "../../api/authService"
import { useAuth } from "../../context/AuthContext"
import "./Login.css"

const Login = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [form, setForm] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const data = await login(form.username, form.password)
      signIn(data.user)
      const roles = data.user?.roles ?? []
      if (roles.includes("Admin")) navigate("/admin")
      else navigate("/home")
    } catch (err) {
      setError(err.message || "Invalid username or password.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      {/* Left Panel — Image */}
      <div className="auth-left">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=1200&fit=crop"
          alt="Restaurant"
          className="auth-bg-img"
        />
        <div className="auth-left-overlay" />
        <div className="auth-left-content">
          <UtensilsCrossed size={40} color="#c8963e" />
          <h2>Savory Haven</h2>
          <p>Experience the finest dining, crafted with passion and served with elegance.</p>
          <div className="auth-left-tags">
        <span><Coffee size={14} /> Italian</span>
        <span><Flame size={14} /> Asian</span>
        <span><Leaf size={14} /> French</span>
        <span><Star size={14} /> American</span>
      </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="auth-right">
        <div className="auth-form-wrap">

          {/* Back to home */}
          <Link to="/" className="auth-back">
            ← Back to Home
          </Link>

          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your Savory Haven account</p>
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
                  placeholder="Enter your username"
                  required
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
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>

          {/* <div className="auth-hint">
            <Lock size={12} color="#bbb" />
            <small>Admin: <strong>Admin</strong> / <strong>Admin123</strong></small>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Login