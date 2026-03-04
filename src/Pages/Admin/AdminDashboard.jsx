import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import {
  LayoutDashboard, UtensilsCrossed, CalendarDays, Users,
  LogOut, Plus, Search, Edit2, Trash2, Check, X,
  ChefHat, Clock, Flame, Star, TrendingUp, AlertCircle,
  CheckCircle, XCircle, RefreshCw
} from "lucide-react"
import {
  adminGetStats, adminGetDishes, adminGetCategories,
  adminCreateDish, adminUpdateDish, adminDeleteDish,
  adminGetReservations, adminUpdateReservationStatus, adminGetUsers,
} from "../../api/adminService"
import "./AdminDashboard.css"

const TABS = [
  { key: "Dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { key: "Dishes",       label: "Dishes",       icon: UtensilsCrossed },
  { key: "Reservations", label: "Reservations", icon: CalendarDays    },
  { key: "Users",        label: "Users",        icon: Users           },
]

const EMPTY_DISH = {
  name: "", description: "", price: "", categoryId: "",
  ingredients: "", cookingTime: "", chef: "", calories: "",
  primaryImage: "", isPopular: false, isFeatured: false, isActive: true,
}

const STATUS_COLORS = {
  Pending:   { bg: "#fef3c7", color: "#d97706" },
  Confirmed: { bg: "#d1fae5", color: "#065f46" },
  Cancelled: { bg: "#fee2e2", color: "#991b1b" },
  Completed: { bg: "#ede9fe", color: "#5b21b6" },
  NoShow:    { bg: "#f3f4f6", color: "#6b7280" },
}

const AdminDashboard = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Dashboard")

  const [stats,        setStats]        = useState(null)
  const [dishes,       setDishes]       = useState([])
  const [categories,   setCategories]   = useState([])
  const [dishForm,     setDishForm]     = useState(EMPTY_DISH)
  const [editingDish,  setEditingDish]  = useState(null)
  const [showDishForm, setShowDishForm] = useState(false)
  const [dishSearch,   setDishSearch]   = useState("")
  const [reservations, setReservations] = useState([])
  const [resFilter,    setResFilter]    = useState("All")
  const [users,        setUsers]        = useState([])
  const [userSearch,   setUserSearch]   = useState("")
  const [loading,      setLoading]      = useState(false)
  const [msg,          setMsg]          = useState({ text: "", type: "success" })

  useEffect(() => {
    if (!user?.roles?.includes("Admin")) navigate("/login")
  }, [user])

  useEffect(() => {
    if (activeTab === "Dashboard")    loadStats()
    if (activeTab === "Dishes")       { loadDishes(); loadCategories() }
    if (activeTab === "Reservations") loadReservations()
    if (activeTab === "Users")        loadUsers()
  }, [activeTab])

  const flash = (text, type = "success") => {
    setMsg({ text, type })
    setTimeout(() => setMsg({ text: "", type: "success" }), 3000)
  }

  const loadStats        = async () => { try { setStats(await adminGetStats()) }         catch { setStats(null) } }
  const loadDishes       = async () => { setLoading(true); try { setDishes(await adminGetDishes()) }       catch (e) { flash(e.message, "error") } setLoading(false) }
  const loadCategories   = async () => { try { setCategories(await adminGetCategories()) } catch {} }
  const loadReservations = async () => { setLoading(true); try { setReservations(await adminGetReservations()) } catch (e) { flash(e.message, "error") } setLoading(false) }
  const loadUsers        = async () => { setLoading(true); try { setUsers(await adminGetUsers()) }         catch (e) { flash(e.message, "error") } setLoading(false) }

  const handleDishChange = (e) => {
    const { name, value, type, checked } = e.target
    setDishForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }))
  }

  const handleDishSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...dishForm, price: parseFloat(dishForm.price) }
      if (editingDish) { await adminUpdateDish(editingDish.id, payload); flash("Dish updated successfully") }
      else             { await adminCreateDish(payload);                  flash("Dish created successfully") }
      setShowDishForm(false); setEditingDish(null); setDishForm(EMPTY_DISH); loadDishes()
    } catch (err) { flash(err.message, "error") }
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
    setEditingDish(dish); setShowDishForm(true)
  }

  const handleDeleteDish = async (id) => {
    if (!window.confirm("Delete this dish?")) return
    try { await adminDeleteDish(id); flash("Dish deleted"); loadDishes() }
    catch (err) { flash(err.message, "error") }
  }

  const handleResStatus = async (id, status) => {
    try { await adminUpdateReservationStatus(id, status); flash(`Reservation ${status}`); loadReservations() }
    catch (err) { flash(err.message, "error") }
  }

  const filteredDishes = dishes.filter((d) => d.name.toLowerCase().includes(dishSearch.toLowerCase()))
  const filteredRes    = resFilter === "All" ? reservations : reservations.filter((r) => r.status === resFilter)
  const filteredUsers  = users.filter((u) =>
    u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  )

  return (
    <div className="adm-layout">

      {/* ── Sidebar ── */}
      <aside className="adm-sidebar">
        <div className="adm-logo">
          <div className="adm-logo-icon"><UtensilsCrossed size={22} color="#c8963e" /></div>
          <div>
            <div className="adm-logo-title">Savory Haven</div>
            <div className="adm-logo-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="adm-nav">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`adm-nav-btn ${activeTab === key ? "active" : ""}`}
              onClick={() => setActiveTab(key)}
            >
              <Icon size={18} />
              <span>{label}</span>
              {key === "Reservations" && stats?.pendingReservations > 0 && (
                <span className="adm-badge">{stats.pendingReservations}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          <div className="adm-user-row">
            <div className="adm-avatar">{user?.username?.[0]?.toUpperCase() ?? "A"}</div>
            <div>
              <div className="adm-uname">{user?.username}</div>
              <div className="adm-urole">Administrator</div>
            </div>
          </div>
          <button className="adm-logout" onClick={() => { signOut(); navigate("/login") }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="adm-main">

        {/* Flash */}
        {msg.text && (
          <div className={`adm-flash ${msg.type}`}>
            {msg.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {msg.text}
          </div>
        )}

        {/* ══ DASHBOARD ══ */}
        {activeTab === "Dashboard" && (
          <div className="adm-section">
            <div className="adm-page-header">
              <div>
                <h1>Dashboard</h1>
                <p>Welcome back, {user?.username}! Here's what's happening.</p>
              </div>
            </div>

            <div className="adm-stats-grid">
              {[
                { label: "Total Reservations", value: stats?.totalReservations ?? "—", icon: CalendarDays,   color: "#6366f1", bg: "#eef2ff" },
                { label: "Pending",             value: stats?.pendingReservations ?? "—", icon: AlertCircle, color: "#f59e0b", bg: "#fffbeb" },
                { label: "Total Dishes",        value: stats?.totalDishes ?? "—",         icon: UtensilsCrossed, color: "#10b981", bg: "#ecfdf5" },
                { label: "Active Users",        value: stats?.activeUsers ?? "—",         icon: Users,       color: "#c8963e", bg: "#fef9f0" },
              ].map(({ label, value, icon: Icon, color, bg }) => (
                <div key={label} className="adm-stat-card" style={{ "--accent": color, "--accent-bg": bg }}>
                  <div className="adm-stat-icon-wrap">
                    <Icon size={22} color={color} />
                  </div>
                  <div className="adm-stat-info">
                    <div className="adm-stat-value">{value}</div>
                    <div className="adm-stat-label">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="adm-quick-section">
              <h2>Quick Actions</h2>
              <div className="adm-quick-btns">
                <button className="adm-quick-btn primary" onClick={() => { setActiveTab("Dishes"); setShowDishForm(true) }}>
                  <Plus size={18} /> Add New Dish
                </button>
                <button className="adm-quick-btn secondary" onClick={() => setActiveTab("Reservations")}>
                  <CalendarDays size={18} /> View Reservations
                </button>
                <button className="adm-quick-btn secondary" onClick={() => setActiveTab("Users")}>
                  <Users size={18} /> Manage Users
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ DISHES ══ */}
        {activeTab === "Dishes" && (
          <div className="adm-section">
            <div className="adm-page-header">
              <div>
                <h1>Menu Dishes</h1>
                <p>{dishes.length} dishes in your menu</p>
              </div>
              <button className="adm-add-btn" onClick={() => { setShowDishForm(true); setEditingDish(null); setDishForm(EMPTY_DISH) }}>
                <Plus size={18} /> Add Dish
              </button>
            </div>

            <div className="adm-search-bar">
              <Search size={16} color="#999" />
              <input placeholder="Search dishes…" value={dishSearch} onChange={(e) => setDishSearch(e.target.value)} />
            </div>

            {showDishForm && (
              <div className="adm-form-card">
                <div className="adm-form-header">
                  <h2>{editingDish ? "Edit Dish" : "Add New Dish"}</h2>
                  <button className="adm-form-close" onClick={() => { setShowDishForm(false); setEditingDish(null) }}>
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleDishSubmit} className="adm-form">
                  <div className="adm-form-row">
                    <div className="adm-form-group">
                      <label>Dish Name *</label>
                      <input name="name" value={dishForm.name} onChange={handleDishChange} required placeholder="e.g. Spaghetti Carbonara" />
                    </div>
                    <div className="adm-form-group">
                      <label>Price ($) *</label>
                      <input type="number" step="0.01" name="price" value={dishForm.price} onChange={handleDishChange} required placeholder="0.00" />
                    </div>
                  </div>
                  <div className="adm-form-row">
                    <div className="adm-form-group">
                      <label>Category *</label>
                      <select name="categoryId" value={dishForm.categoryId} onChange={handleDishChange} required>
                        <option value="">Select category</option>
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="adm-form-group">
                      <label>Chef</label>
                      <input name="chef" value={dishForm.chef} onChange={handleDishChange} placeholder="Chef name" />
                    </div>
                  </div>
                  <div className="adm-form-group">
                    <label>Description *</label>
                    <textarea name="description" value={dishForm.description} onChange={handleDishChange} rows={3} required placeholder="Describe the dish…" />
                  </div>
                  <div className="adm-form-row">
                    <div className="adm-form-group">
                      <label>Ingredients</label>
                      <input name="ingredients" value={dishForm.ingredients} onChange={handleDishChange} placeholder="e.g. Pasta, eggs, bacon…" />
                    </div>
                    <div className="adm-form-group">
                      <label>Cooking Time</label>
                      <input name="cookingTime" value={dishForm.cookingTime} onChange={handleDishChange} placeholder="e.g. 20 minutes" />
                    </div>
                  </div>
                  <div className="adm-form-row">
                    <div className="adm-form-group">
                      <label>Calories</label>
                      <input name="calories" value={dishForm.calories} onChange={handleDishChange} placeholder="e.g. 450 cal" />
                    </div>
                    <div className="adm-form-group">
                      <label>Image URL</label>
                      <input name="primaryImage" value={dishForm.primaryImage} onChange={handleDishChange} placeholder="https://…" />
                    </div>
                  </div>
                  <div className="adm-checkbox-row">
                    {[
                      { name: "isPopular",  label: "⭐ Popular"  },
                      { name: "isFeatured", label: "🔥 Featured" },
                      { name: "isActive",   label: "✓ Active"   },
                    ].map(({ name, label }) => (
                      <label key={name} className="adm-checkbox">
                        <input type="checkbox" name={name} checked={dishForm[name]} onChange={handleDishChange} />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="adm-form-actions">
                    <button type="submit" className="adm-save-btn" disabled={loading}>
                      {loading ? <RefreshCw size={16} className="spin" /> : <Check size={16} />}
                      {editingDish ? "Update Dish" : "Create Dish"}
                    </button>
                    <button type="button" className="adm-cancel-btn" onClick={() => { setShowDishForm(false); setEditingDish(null) }}>
                      <X size={16} /> Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {loading ? (
              <div className="adm-loading"><RefreshCw size={24} className="spin" color="#c8963e" /><p>Loading…</p></div>
            ) : (
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Dish</th>
                      <th>Category</th>
                      <th>Chef</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDishes.map((dish) => (
                      <tr key={dish.id}>
                        <td>
                          <div className="adm-dish-cell">
                            <img
                              src={dish.primaryImage || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=60&fit=crop"}
                              alt={dish.name}
                              className="adm-dish-thumb"
                            />
                            <div>
                              <div className="adm-dish-name">{dish.name}</div>
                              <div className="adm-dish-badges">
                                {dish.isPopular  && <span className="adm-chip gold"><Star size={10} /> Popular</span>}
                                {dish.isFeatured && <span className="adm-chip purple"><Flame size={10} /> Featured</span>}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{dish.category?.name ?? "—"}</td>
                        <td>
                          {dish.chef
                            ? <span className="adm-chef"><ChefHat size={14} color="#c8963e" /> {dish.chef}</span>
                            : "—"}
                        </td>
                        <td><strong>${Number(dish.price).toFixed(2)}</strong></td>
                        <td>
                          <span className={`adm-status-chip ${dish.isActive ? "green" : "red"}`}>
                            {dish.isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
                            {dish.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <div className="adm-action-btns">
                            <button className="adm-edit-btn" onClick={() => handleEditDish(dish)}><Edit2 size={14} /></button>
                            <button className="adm-del-btn"  onClick={() => handleDeleteDish(dish.id)}><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredDishes.length === 0 && (
                      <tr><td colSpan={6} className="adm-empty-row"><UtensilsCrossed size={28} color="#ddd" /><p>No dishes found</p></td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ══ RESERVATIONS ══ */}
        {activeTab === "Reservations" && (
          <div className="adm-section">
            <div className="adm-page-header">
              <div>
                <h1>Reservations</h1>
                <p>{reservations.length} total reservations</p>
              </div>
            </div>

            <div className="adm-filter-row">
              {["All", "Pending", "Confirmed", "Cancelled", "Completed"].map((f) => (
                <button key={f} className={`adm-filter-btn ${resFilter === f ? "active" : ""}`} onClick={() => setResFilter(f)}>
                  {f}
                  {f !== "All" && (
                    <span className="adm-filter-count">
                      {reservations.filter(r => r.status === f).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="adm-loading"><RefreshCw size={24} className="spin" color="#c8963e" /><p>Loading…</p></div>
            ) : (
              <div className="adm-table-wrap">
                <table className="adm-table">
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
                    {filteredRes.map((r) => {
                      const sc = STATUS_COLORS[r.status] ?? STATUS_COLORS.Pending
                      return (
                        <tr key={r.id}>
                          <td>
                            <div className="adm-guest-cell">
                              <div className="adm-guest-avatar">{r.firstName?.[0]?.toUpperCase()}</div>
                              <strong>{r.firstName} {r.lastName}</strong>
                            </div>
                          </td>
                          <td>
                            <div>{r.email}</div>
                            <div style={{ color: "#aaa", fontSize: "0.82rem" }}>{r.phone}</div>
                          </td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{new Date(r.reservationDate).toLocaleDateString()}</div>
                            <div style={{ color: "#aaa", fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                              <Clock size={12} /> {r.timeSlot}
                            </div>
                          </td>
                          <td>
                            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                              <Users size={14} color="#c8963e" /> {r.guestCount}
                            </span>
                          </td>
                          <td>{r.occasion || "—"}</td>
                          <td>
                            <span className="adm-res-status" style={{ background: sc.bg, color: sc.color }}>
                              {r.status}
                            </span>
                          </td>
                          <td>
                            <div className="adm-action-btns">
                              {r.status === "Pending" && (
                                <>
                                  <button className="adm-confirm-btn" onClick={() => handleResStatus(r.id, "Confirmed")} title="Confirm">
                                    <Check size={14} />
                                  </button>
                                  <button className="adm-del-btn" onClick={() => handleResStatus(r.id, "Cancelled")} title="Cancel">
                                    <X size={14} />
                                  </button>
                                </>
                              )}
                              {r.status === "Confirmed" && (
                                <>
                                  <button className="adm-complete-btn" onClick={() => handleResStatus(r.id, "Completed")} title="Complete">
                                    <CheckCircle size={14} />
                                  </button>
                                  <button className="adm-del-btn" onClick={() => handleResStatus(r.id, "Cancelled")} title="Cancel">
                                    <X size={14} />
                                  </button>
                                </>
                              )}
                              {(r.status === "Cancelled" || r.status === "Completed") && (
                                <span style={{ color: "#ccc", fontSize: "0.8rem" }}>—</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                    {filteredRes.length === 0 && (
                      <tr><td colSpan={7} className="adm-empty-row"><CalendarDays size={28} color="#ddd" /><p>No reservations found</p></td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ══ USERS ══ */}
        {activeTab === "Users" && (
          <div className="adm-section">
            <div className="adm-page-header">
              <div>
                <h1>Users</h1>
                <p>{users.length} registered user{users.length !== 1 ? "s" : ""}</p>
              </div>
            </div>

            <div className="adm-search-bar">
              <Search size={16} color="#999" />
              <input placeholder="Search by username or email…" value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />
            </div>

            {loading ? (
              <div className="adm-loading"><RefreshCw size={24} className="spin" color="#c8963e" /><p>Loading…</p></div>
            ) : (
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Joined</th>
                      <th>Last Login</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id}>
                        <td>
                          <div className="adm-user-cell">
                            <div className="adm-user-avatar">{u.username?.[0]?.toUpperCase()}</div>
                            <strong>{u.username}</strong>
                          </div>
                        </td>
                        <td>{u.email}</td>
                        <td>{u.phoneNumber || "—"}</td>
                        <td>
                          {u.roles?.map((role) => (
                            <span key={role} className={`adm-chip ${role === "Admin" ? "purple" : "gold"}`}>
                              {role}
                            </span>
                          ))}
                        </td>
                        <td>{u.createdAt  ? new Date(u.createdAt).toLocaleDateString()  : "—"}</td>
                        <td>{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : "Never"}</td>
                        <td>
                          <span className={`adm-status-chip ${u.isActive ? "green" : "red"}`}>
                            {u.isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
                            {u.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr><td colSpan={7} className="adm-empty-row"><Users size={28} color="#ddd" /><p>No users found</p></td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard