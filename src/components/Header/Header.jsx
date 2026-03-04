import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils, faBars } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "../../context/AuthContext"
import { logout } from "../../api/authService"
import "./Header.css"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    await logout()
    signOut()
    navigate("/")
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".header")) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMobileMenuOpen])

  return (
    <>
      <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <FontAwesomeIcon icon={faUtensils} />
              <span>Savory Haven</span>
            </Link>

            <nav className={`nav ${isMobileMenuOpen ? "nav-open" : ""}`}>
              <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/menu" className={`nav-link ${isActive("/menu") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
              <Link to="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              <Link to="/reservations" className={`nav-link ${isActive("/reservations") ? "active" : ""}`} onClick={() => setIsMobileMenuOpen(false)}>Reservations</Link>
            </nav>

            <div className="header-actions">
              {user ? (
                <>
                  {user.roles?.includes("Admin") && (
                    <Link to="/admin" className="nav-link" style={{ color: "#c8963e", fontWeight: 700 }}>
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="reserve-btn"
                    style={{ background: "transparent", border: "1px solid #c8963e", color: "#c8963e" }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/reservations" className="reserve-btn">Reserve Table</Link>
                </>
              )}
              <button
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`mobile-nav-overlay ${isMobileMenuOpen ? "open" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}

export default Header