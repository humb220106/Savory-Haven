import React, { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Header from "./components/Header/Header"
import ScrollToTop from "./components/ScrollToTop"
import Home           from "./Pages/Home/Home"
import Menu           from "./Pages/Menu/menu"
import About          from "./Pages/About/About"
import Reservation    from "./Pages/Reservations/Reservation"
import Contact        from "./Pages/Contact/contact"
import Login          from "./Pages/Login/Login"
import Register       from "./Pages/Register/Register"
import AdminDashboard from "./Pages/Admin/AdminDashboard"
import Landing        from "./Pages/Landing/Landing"
import Profile        from "./Pages/Profile/Profile"
import AOS from "aos"
import "aos/dist/aos.css"

// Guard: only Admin can access /admin
function AdminRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!user.roles?.includes("Admin")) return <Navigate to="/" replace />
  return children
}

// Guard: must be logged in to access /profile
function PrivateRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"             element={<Landing />} />
      <Route path="/home"         element={<><Header /><Home /></>} />
      <Route path="/menu"         element={<><Header /><Menu /></>} />
      <Route path="/about"        element={<><Header /><About /></>} />
      <Route path="/reservations" element={<><Header /><Reservation /></>} />
      <Route path="/contact"      element={<><Header /><Contact /></>} />
      <Route path="/login"        element={<Login />} />
      <Route path="/register"     element={<Register />} />
      <Route path="/admin"        element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/profile"      element={<PrivateRoute><Header /><Profile /></PrivateRoute>} />
      <Route path="*"             element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  useEffect(() => { AOS.init({ duration: 1000 }) }, [])
  return (
    <AuthProvider>
      <ScrollToTop behavior="auto" />
      <AppRoutes />
    </AuthProvider>
  )
}

export default App