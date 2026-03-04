import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { login } from "../../api/authService"
import { useAuth } from "../../context/AuthContext"
import "./Login.css"

const Login = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [form, setForm] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const data = await login(form.username, form.password)
      signIn(data.user)
      const roles = data.user?.roles ?? []
      if (roles.includes("Admin")) {
        navigate("/admin")
      } else {
        navigate("/")
      }
    } catch (err) {
      setError(err.message || "Invalid username or password.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <span className="brand-icon">🍽️</span>
          <h1>Savory Haven</h1>
        </div>
        <h2>Welcome Back</h2>
        <p className="login-sub">Sign in to your account</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <div className="login-hint">
          <small>Admin: <strong>Admin</strong> / <strong>Admin123</strong></small>
        </div>
      </div>
    </div>
  )
}

export default Login