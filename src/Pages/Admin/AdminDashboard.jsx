import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import {
  adminGetStats,
  adminGetDishes,
  adminGetCategories,
  adminCreateDish,
  adminUpdateDish,
  adminDeleteDish,
  adminGetReservations,
  adminUpdateReservationStatus,
} from "../../api/adminService"
import "./AdminDashboard.css"

const TABS = ["Dashboard", "Dishes", "Reservations", "Users"]

const EMPTY_DISH = {
  name: "", description: "", price: "", categoryId: "",
  ingredients: "", cookingTime: "", chef: "", calories: "",
  primaryImage: "", isPopular: false, isFeatured: false, isActive: true,
}

const STATUS_COLORS = {
  Pending:   "#f59e0b",
  Confirmed: "#10b981",
  Cancelled: "#ef4444",
  Completed: "#6366f1",
  NoShow:    "#9ca3af",
}

const AdminDashboard = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Dashboard")

  // Stats
  const [stats, setStats] = useState(null)

  // Dishes
  const [dishes, setDishes] = useState([])
  const [categories, setCategories] = useState([])
  const [dishForm, setDishForm] = useState(EMPTY_DISH)
  const [editingDish, setEditingDish] = useState(null)
  const [showDishForm, setShowDishForm] = useState(false)
  const [dishSearch, setDishSearch] = useState("")

  // Reservations
  const [reservations, setReservations] = useState([])
  const [resFilter, setResFilter] = useState("All")

  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    if (!user?.roles?.includes("Admin")) {
      navigate("/login")
    }
  }, [user])

  useEffect(() => {
    if (activeTab === "Dashboard") loadStats()
    if (activeTab === "Dishes") { loadDishes(); loadCategories() }
    if (activeTab === "Reservations") loadReservations()
  }, [activeTab])

  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(""), 3000) }

  const loadStats = async () => {
    try { const d = await adminGetStats(); setStats(d) } catch { setStats(null) }
  }

  const loadDishes = async () => {
    setLoading(true)
    try { setDishes(await adminGetDishes()) } catch (e) { flash(e.message) }
    setLoading(false)
  }

  const loadCategories = async () => {
    try { setCategories(await adminGetCategories()) } catch {}
  }

  const loadReservations = async () => {
    setLoading(true)
    try { setReservations(await adminGetReservations()) } catch (e) { flash(e.message) }
    setLoading(false)
  }

  // ── Dish CRUD ──────────────────────────────────────────────────────────────
  const handleDishChange = (e) => {
    const { name, value, type, checked } = e.target
    setDishForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }))
  }

  const handleDishSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...dishForm, price: parseFloat(dishForm.price) }
      if (editingDish) {
        await adminUpdateDish(editingDish.id, payload)
        flash("Dish updated ✓")
      } else {
        await adminCreateDish(payload)
        flash("Dish created ✓")
      }
      setShowDishForm(false)
      setEditingDish(null)
      setDishForm(EMPTY_DISH)
      loadDishes()
    } catch (err) {
      flash(err.message)
    }
    setLoading(false)
  }

  const handleEditDish = (dish) => {
    setDishForm({
      name: dish.name, description: dish.description, price: dish.price,
      categoryId: dish.categoryId, ingredients: dish.ingredients ?? "",
      cookingTime: dish.cookingTime ?? "", chef: dish.chef ?? "",
      calories: dish.calories ?? "", primaryImage: dish.primaryImage ?? "",
      isPopular: dish.isPopular, isFeatured: dish.isFeatured, isActive: dish.isActive,
    })
    setEditingDish(dish)
    setShowDishForm(true)
  }

  const handleDeleteDish = async (id) => {
    if (!window.confirm("Delete this dish?")) return
    try { await adminDeleteDish(id); flash("Dish deleted"); loadDishes() }
    catch (err) { flash(err.message) }
  }

  const handleResStatus = async (id, status) => {
    try {
      await adminUpdateReservationStatus(id, status)
      flash(`Reservation marked as ${status}`)
      loadReservations()
    } catch (err) { flash(err.message) }
  }

  const filteredDishes = dishes.filter((d) =>
    d.name.toLowerCase().includes(dishSearch.toLowerCase())
  )

  const filteredRes = resFilter === "All"
    ? reservations
    : reservations.filter((r) => r.status === resFilter)

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <span>🍽️</span>
          <div>
            <h3>Savory Haven</h3>
            <small>Admin Panel</small>
          </div>
        </div>
        <nav className="sidebar-nav">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`sidebar-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "Dashboard"    && "📊 "}
              {tab === "Dishes"       && "🍴 "}
              {tab === "Reservations" && "📅 "}
              {tab === "Users"        && "👥 "}
              {tab}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="admin-user-info">
            <div className="avatar">{user?.username?.[0]?.toUpperCase() ?? "A"}</div>
            <div>
              <div className="admin-name">{user?.username}</div>
              <div className="admin-role">Administrator</div>
            </div>
          </div>
          <button
            className="logout-btn"
            onClick={() => { signOut(); navigate("/login") }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        {msg && <div className="admin-flash">{msg}</div>}

        {/* ── DASHBOARD ── */}
        {activeTab === "Dashboard" && (
          <div>
            <h1 className="page-title">Dashboard</h1>
            <div className="stats-grid">
              {[
                { label: "Total Reservations", value: stats?.totalReservations ?? "—", icon: "📅", color: "#6366f1" },
                { label: "Pending",             value: stats?.pendingReservations ?? "—", icon: "⏳", color: "#f59e0b" },
                { label: "Total Dishes",        value: stats?.totalDishes ?? "—",         icon: "🍴", color: "#10b981" },
                { label: "Active Users",        value: stats?.activeUsers ?? "—",         icon: "👥", color: "#c8963e" },
              ].map((s) => (
                <div key={s.label} className="stat-card" style={{ borderLeft: `4px solid ${s.color}` }}>
                  <div className="stat-icon">{s.icon}</div>
                  <div>
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <button className="action-btn primary" onClick={() => setActiveTab("Dishes")}>
                  ➕ Add New Dish
                </button>
                <button className="action-btn secondary" onClick={() => setActiveTab("Reservations")}>
                  📅 View Reservations
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── DISHES ── */}
        {activeTab === "Dishes" && (
          <div>
            <div className="section-header">
              <h1 className="page-title">Menu Dishes</h1>
              <button
                className="add-btn"
                onClick={() => { setShowDishForm(true); setEditingDish(null); setDishForm(EMPTY_DISH) }}
              >
                ➕ Add Dish
              </button>
            </div>

            <input
              className="search-input"
              placeholder="Search dishes…"
              value={dishSearch}
              onChange={(e) => setDishSearch(e.target.value)}
            />

            {/* Dish form */}
            {showDishForm && (
              <div className="form-card">
                <h2>{editingDish ? "Edit Dish" : "Add New Dish"}</h2>
                <form onSubmit={handleDishSubmit} className="dish-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name *</label>
                      <input name="name" value={dishForm.name} onChange={handleDishChange} required />
                    </div>
                    <div className="form-group">
                      <label>Price ($) *</label>
                      <input type="number" step="0.01" name="price" value={dishForm.price} onChange={handleDishChange} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category *</label>
                      <select name="categoryId" value={dishForm.categoryId} onChange={handleDishChange} required>
                        <option value="">Select category</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Chef</label>
                      <input name="chef" value={dishForm.chef} onChange={handleDishChange} placeholder="Chef name" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description *</label>
                    <textarea name="description" value={dishForm.description} onChange={handleDishChange} rows={3} required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Ingredients</label>
                      <input name="ingredients" value={dishForm.ingredients} onChange={handleDishChange} />
                    </div>
                    <div className="form-group">
                      <label>Cooking Time</label>
                      <input name="cookingTime" value={dishForm.cookingTime} onChange={handleDishChange} placeholder="e.g. 20 minutes" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Calories</label>
                      <input name="calories" value={dishForm.calories} onChange={handleDishChange} placeholder="e.g. 450 cal" />
                    </div>
                    <div className="form-group">
                      <label>Primary Image URL</label>
                      <input name="primaryImage" value={dishForm.primaryImage} onChange={handleDishChange} placeholder="https://…" />
                    </div>
                  </div>
                  <div className="checkbox-row">
                    <label><input type="checkbox" name="isPopular"  checked={dishForm.isPopular}  onChange={handleDishChange} /> Popular</label>
                    <label><input type="checkbox" name="isFeatured" checked={dishForm.isFeatured} onChange={handleDishChange} /> Featured</label>
                    <label><input type="checkbox" name="isActive"   checked={dishForm.isActive}   onChange={handleDishChange} /> Active</label>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="save-btn" disabled={loading}>
                      {loading ? "Saving…" : editingDish ? "Update Dish" : "Create Dish"}
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => { setShowDishForm(false); setEditingDish(null) }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Dishes table */}
            {loading ? (
              <p className="loading-text">Loading dishes…</p>
            ) : (
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDishes.map((dish) => (
                      <tr key={dish.id}>
                        <td>
                          <img
                            src={dish.primaryImage || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=60&fit=crop"}
                            alt={dish.name}
                            className="dish-thumb"
                          />
                        </td>
                        <td>
                          <strong>{dish.name}</strong>
                          {dish.isPopular && <span className="badge popular">★ Popular</span>}
                          {dish.isFeatured && <span className="badge featured">Featured</span>}
                        </td>
                        <td>{dish.category?.name ?? "—"}</td>
                        <td>${Number(dish.price).toFixed(2)}</td>
                        <td>
                          <span className={`status-badge ${dish.isActive ? "active" : "inactive"}`}>
                            {dish.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <button className="edit-btn" onClick={() => handleEditDish(dish)}>Edit</button>
                          <button className="delete-btn" onClick={() => handleDeleteDish(dish.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                    {filteredDishes.length === 0 && (
                      <tr><td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "#888" }}>No dishes found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── RESERVATIONS ── */}
        {activeTab === "Reservations" && (
          <div>
            <h1 className="page-title">Reservations</h1>
            <div className="filter-row">
              {["All", "Pending", "Confirmed", "Cancelled", "Completed"].map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${resFilter === f ? "active" : ""}`}
                  onClick={() => setResFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            {loading ? (
              <p className="loading-text">Loading reservations…</p>
            ) : (
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Guest</th>
                      <th>Contact</th>
                      <th>Date & Time</th>
                      <th>Guests</th>
                      <th>Occasion</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRes.map((r) => (
                      <tr key={r.id}>
                        <td><strong>{r.firstName} {r.lastName}</strong></td>
                        <td>
                          <div>{r.email}</div>
                          <div style={{ color: "#888", fontSize: "0.85rem" }}>{r.phone}</div>
                        </td>
                        <td>
                          <div>{new Date(r.reservationDate).toLocaleDateString()}</div>
                          <div style={{ color: "#888", fontSize: "0.85rem" }}>{r.timeSlot}</div>
                        </td>
                        <td>{r.guestCount}</td>
                        <td>{r.occasion || "—"}</td>
                        <td>
                          <span
                            className="res-status"
                            style={{ background: STATUS_COLORS[r.status] + "22", color: STATUS_COLORS[r.status] }}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td>
                          {r.status === "Pending" && (
                            <>
                              <button className="confirm-btn" onClick={() => handleResStatus(r.id, "Confirmed")}>Confirm</button>
                              <button className="reject-btn"  onClick={() => handleResStatus(r.id, "Cancelled")}>Cancel</button>
                            </>
                          )}
                          {r.status === "Confirmed" && (
                            <>
                              <button className="complete-btn" onClick={() => handleResStatus(r.id, "Completed")}>Complete</button>
                              <button className="reject-btn"   onClick={() => handleResStatus(r.id, "Cancelled")}>Cancel</button>
                            </>
                          )}
                          {(r.status === "Cancelled" || r.status === "Completed") && (
                            <span style={{ color: "#aaa", fontSize: "0.85rem" }}>Done</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filteredRes.length === 0 && (
                      <tr><td colSpan={7} style={{ textAlign: "center", padding: "2rem", color: "#888" }}>No reservations found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── USERS (placeholder) ── */}
        {activeTab === "Users" && (
          <div>
            <h1 className="page-title">Users</h1>
            <p style={{ color: "#888" }}>Connect to <code>/admin/users</code> endpoint to list registered users.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard