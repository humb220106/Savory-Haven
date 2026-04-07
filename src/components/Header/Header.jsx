import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { UtensilsCrossed, Menu, X } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { logout } from "../../api/authService"
import "./Header.css"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled]             = useState(false)
  const [avatarUrl, setAvatarUrl]               = useState(null)
  const location  = useLocation()
  const navigate  = useNavigate()
  const { user, signOut } = useAuth()

  // Load avatar from localStorage whenever user changes or location changes
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`avatar_${user.id || user.username}`)
      setAvatarUrl(stored || null)
    } else {
      setAvatarUrl(null)
    }
  }, [user, location.pathname])

  const handleLogout = async () => {
    await logout()
    signOut()
    navigate("/login")
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest(".header"))
        setIsMobileMenuOpen(false)
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMobileMenuOpen])

  const close = () => setIsMobileMenuOpen(false)

  return (
    <>
      <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
        <div className="container">
          <div className="header-content">

            {/* Logo */}
            <Link to="/home" className="logo">
              <UtensilsCrossed size={22} color="#c8963e" />
              <span>Savory Haven</span>
            </Link>

            {/* Nav */}
            <nav className={`nav ${isMobileMenuOpen ? "nav-open" : ""}`}>
              <Link to="/home"         className={`nav-link ${isActive("/home")         ? "active" : ""}`} onClick={close}>Home</Link>
              <Link to="/menu"         className={`nav-link ${isActive("/menu")         ? "active" : ""}`} onClick={close}>Menu</Link>
              <Link to="/about"        className={`nav-link ${isActive("/about")        ? "active" : ""}`} onClick={close}>About</Link>
              <Link to="/contact"      className={`nav-link ${isActive("/contact")      ? "active" : ""}`} onClick={close}>Contact</Link>
              <Link to="/reservations" className={`nav-link ${isActive("/reservations") ? "active" : ""}`} onClick={close}>Reservations</Link>
            </nav>

            {/* Actions */}
            <div className="header-actions">
              {user ? (
                <>
                  {user.roles?.includes("Admin") && (
                    <Link to="/admin" className="nav-link admin-link">Admin</Link>
                  )}

                  {/* Profile Avatar */}
                  <Link to="/profile" className="header-avatar" title={`${user.username} — View Profile`}>
                    <div className="header-avatar-circle">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Profile" className="header-avatar-img" />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" className="header-avatar-icon" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="8" r="4" fill="white" />
                          <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        </svg>
                      )}
                    </div>
                  </Link>

                  <button onClick={handleLogout} className="reserve-btn outline-btn">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login"        className="nav-link">Login</Link>
                  <Link to="/reservations" className="reserve-btn">Reserve Table</Link>
                </>
              )}

              <button
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      <div
        className={`mobile-nav-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={close}
      />
    </>
  )
}

export default Header