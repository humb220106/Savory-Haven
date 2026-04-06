import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { User, Mail, Phone, MapPin, Lock, Camera, Save, ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { apiGet, apiPut } from "../../api/apiClient"
import "./Profile.css"

const Profile = () => {
  const { user, signIn } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [activeTab, setActiveTab] = useState("info")
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phoneNumber: "",
    address: "",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
    setSuccess("")
  }

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
    setError("")
    setSuccess("")
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be smaller than 2MB.")
      return
    }
    setAvatar(file)
    setAvatarPreview(URL.createObjectURL(file))
    setError("")
  }

  const getInitials = () => {
    const name = user?.username || "U"
    return name.charAt(0).toUpperCase()
  }

  const handleSaveInfo = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")
    try {
      const updated = await apiPut("/auth/profile", {
        username: form.username,
        phoneNumber: form.phoneNumber,
        address: form.address,
      })
      // Update local user state
      const updatedUser = { ...user, username: form.username }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      signIn(updatedUser)
      setSuccess("Profile updated successfully!")
    } catch (err) {
      setError(err.message || "Failed to update profile.")
    } finally {
      setSaving(false)
    }
  }

  const handleSavePassword = async (e) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New passwords do not match.")
      return
    }
    if (passwordForm.newPassword.length < 6) {
      setError("New password must be at least 6 characters.")
      return
    }
    setSaving(true)
    setError("")
    setSuccess("")
    try {
      await apiPut("/auth/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })
      setSuccess("Password changed successfully!")
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (err) {
      setError(err.message || "Failed to change password.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="profile-page">
      {/* Back button */}
      <button className="profile-back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="profile-container">

        {/* Left — Avatar Card */}
        <div className="profile-sidebar">
          <div className="profile-avatar-card">
            <div className="profile-avatar-wrap">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="profile-avatar-img" />
              ) : (
                <div className="profile-avatar-initials">{getInitials()}</div>
              )}
              <button
                className="profile-avatar-camera"
                onClick={() => fileInputRef.current?.click()}
                title="Change photo"
              >
                <Camera size={16} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </div>

            <h2 className="profile-name">{user?.username}</h2>
            <p className="profile-email">{user?.email}</p>

            <div className="profile-roles">
              {user?.roles?.map((role) => (
                <span key={role} className={`profile-role-badge ${role.toLowerCase()}`}>
                  {role}
                </span>
              ))}
            </div>

            <p className="profile-avatar-hint">Click the camera icon to upload a photo</p>
          </div>
        </div>

        {/* Right — Tabs */}
        <div className="profile-main">

          {/* Tabs */}
          <div className="profile-tabs">
            <button
              className={`profile-tab ${activeTab === "info" ? "active" : ""}`}
              onClick={() => { setActiveTab("info"); setError(""); setSuccess("") }}
            >
              Personal Info
            </button>
            <button
              className={`profile-tab ${activeTab === "password" ? "active" : ""}`}
              onClick={() => { setActiveTab("password"); setError(""); setSuccess("") }}
            >
              Change Password
            </button>
          </div>

          {/* Feedback */}
          {success && (
            <div className="profile-alert success">
              <CheckCircle size={18} />
              {success}
            </div>
          )}
          {error && (
            <div className="profile-alert error">
              ⚠️ {error}
            </div>
          )}

          {/* Personal Info Tab */}
          {activeTab === "info" && (
            <form className="profile-form" onSubmit={handleSaveInfo}>
              <div className="profile-form-grid">

                <div className="profile-field">
                  <label>Username</label>
                  <div className="profile-input-wrap">
                    <User size={18} className="profile-input-icon" />
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      placeholder="Your username"
                    />
                  </div>
                </div>

                <div className="profile-field">
                  <label>Email <span className="profile-field-note">(read only)</span></label>
                  <div className="profile-input-wrap readonly">
                    <Mail size={18} className="profile-input-icon" />
                    <input
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div className="profile-field">
                  <label>Phone Number</label>
                  <div className="profile-input-wrap">
                    <Phone size={18} className="profile-input-icon" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      placeholder="e.g. 08012345678"
                    />
                  </div>
                </div>

                <div className="profile-field full-width">
                  <label>Address</label>
                  <div className="profile-input-wrap">
                    <MapPin size={18} className="profile-input-icon" />
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Your delivery address"
                    />
                  </div>
                </div>

              </div>

              <button type="submit" className="profile-save-btn" disabled={saving}>
                {saving ? <span className="profile-spinner" /> : <><Save size={18} /> Save Changes</>}
              </button>
            </form>
          )}

          {/* Password Tab */}
          {activeTab === "password" && (
            <form className="profile-form" onSubmit={handleSavePassword}>

              {[
                { label: "Current Password", name: "currentPassword", key: "current" },
                { label: "New Password",     name: "newPassword",     key: "new" },
                { label: "Confirm New Password", name: "confirmPassword", key: "confirm" },
              ].map(({ label, name, key }) => (
                <div className="profile-field" key={name}>
                  <label>{label}</label>
                  <div className="profile-input-wrap">
                    <Lock size={18} className="profile-input-icon" />
                    <input
                      type={showPasswords[key] ? "text" : "password"}
                      name={name}
                      value={passwordForm[name]}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="profile-eye-btn"
                      onClick={() => setShowPasswords({ ...showPasswords, [key]: !showPasswords[key] })}
                    >
                      {showPasswords[key] ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              ))}

              <button type="submit" className="profile-save-btn" disabled={saving}>
                {saving ? <span className="profile-spinner" /> : <><Save size={18} /> Update Password</>}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  )
}

export default Profile