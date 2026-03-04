import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { UtensilsCrossed, Clock, ChefHat, Flame, Star, X, Search } from "lucide-react"
import "./menu.css"
import { getCategories, getDishesByCategory } from "../../api/menuService"

function normalise(dish) {
  return {
    ...dish,
    image:   dish.primaryImage ?? "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    popular: dish.isPopular,
    price:   `$${Number(dish.price).toFixed(2)}`,
  }
}

const CATEGORY_ICONS = {
  italian:  "🍝",
  asian:    "🥢",
  french:   "🥖",
  american: "🍔",
}

const Menu = () => {
  const [categories,     setCategories]     = useState([])
  const [currentItems,   setCurrentItems]   = useState([])
  const [activeCategory, setActiveCategory] = useState("")
  const [selectedItem,   setSelectedItem]   = useState(null)
  const [loadingCats,    setLoadingCats]    = useState(true)
  const [loadingDishes,  setLoadingDishes]  = useState(false)
  const [error,          setError]          = useState("")
  const [search,         setSearch]         = useState("")

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data)
        if (data.length > 0) setActiveCategory(data[0].slug)
      })
      .catch(() => setError("Could not load menu. Please try again later."))
      .finally(() => setLoadingCats(false))
  }, [])

  useEffect(() => {
    if (!activeCategory) return
    setLoadingDishes(true)
    setSearch("")
    getDishesByCategory(activeCategory)
      .then((data) => setCurrentItems(data))
      .catch(() => setError("Could not load dishes."))
      .finally(() => setLoadingDishes(false))
  }, [activeCategory])

  const filtered = currentItems.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loadingCats) return (
    <div className="menu-loading">
      <UtensilsCrossed size={40} color="#c8963e" />
      <p>Loading menu…</p>
    </div>
  )

  if (error) return (
    <div className="menu-loading">
      <p style={{ color: "red" }}>{error}</p>
    </div>
  )

  return (
    <div className="menu-page">

      {/* ── Hero ── */}
      <section className="menu-hero">
        <div className="menu-hero-overlay" />
        <div className="menu-hero-content">
          <UtensilsCrossed size={48} color="#c8963e" />
          <h1>Our Menu</h1>
          <p>Fresh ingredients, bold flavors, unforgettable dishes</p>
        </div>
      </section>

      {/* ── Category Tabs ── */}
      <section className="menu-tabs-section">
        <div className="menu-container">
          <div className="menu-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`menu-tab ${activeCategory === cat.slug ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.slug)}
              >
                <span className="tab-icon">{CATEGORY_ICONS[cat.slug] ?? "🍽️"}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* ── Search ── */}
          <div className="menu-search">
            <Search size={18} color="#999" />
            <input
              type="text"
              placeholder="Search dishes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ── Dishes Grid ── */}
      <section className="menu-dishes-section">
        <div className="menu-container">
          {loadingDishes ? (
            <div className="menu-loading">
              <UtensilsCrossed size={32} color="#c8963e" />
              <p>Loading dishes…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="menu-empty">
              <UtensilsCrossed size={48} color="#ccc" />
              <p>No dishes found</p>
            </div>
          ) : (
            <div className="dishes-grid">
              {filtered.map((rawItem) => {
                const item = normalise(rawItem)
                return (
                  <div
                    key={item.id}
                    className="dish-card"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="dish-card-image">
                      <img src={item.image} alt={item.name} />
                      {item.popular && (
                        <div className="dish-popular-badge">
                          <Star size={12} fill="#fff" color="#fff" />
                          <span>Popular</span>
                        </div>
                      )}
                    </div>
                    <div className="dish-card-body">
                      <div className="dish-card-top">
                        <h3 className="dish-name">{item.name}</h3>
                        <span className="dish-price">{item.price}</span>
                      </div>
                      <p className="dish-desc">{item.description}</p>
                      <div className="dish-meta">
                        {item.chef && (
                          <span className="dish-meta-item">
                            <ChefHat size={14} color="#c8963e" />
                            {item.chef}
                          </span>
                        )}
                        {item.cookingTime && (
                          <span className="dish-meta-item">
                            <Clock size={14} color="#c8963e" />
                            {item.cookingTime}
                          </span>
                        )}
                        {item.calories && (
                          <span className="dish-meta-item">
                            <Flame size={14} color="#c8963e" />
                            {item.calories}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="menu-cta">
        <div className="menu-container">
          <h2>Ready to Dine With Us?</h2>
          <p>Book your table and enjoy these dishes in person</p>
          <Link to="/reservations" className="menu-cta-btn">Reserve a Table</Link>
        </div>
      </section>

      {/* ── Modal ── */}
      {selectedItem && (
        <div className="dish-modal-overlay" onClick={(e) => { if (e.target.classList.contains("dish-modal-overlay")) setSelectedItem(null) }}>
          <div className="dish-modal">
            <button className="dish-modal-close" onClick={() => setSelectedItem(null)}>
              <X size={22} />
            </button>
            <div className="dish-modal-image">
              <img src={selectedItem.image} alt={selectedItem.name} />
              {selectedItem.popular && (
                <div className="dish-popular-badge">
                  <Star size={12} fill="#fff" color="#fff" />
                  <span>Popular</span>
                </div>
              )}
            </div>
            <div className="dish-modal-body">
              <div className="dish-modal-header">
                <h2>{selectedItem.name}</h2>
                <span className="dish-modal-price">{selectedItem.price}</span>
              </div>
              <p className="dish-modal-desc">{selectedItem.description}</p>

              <div className="dish-modal-meta">
                {selectedItem.chef && (
                  <div className="modal-meta-item">
                    <ChefHat size={18} color="#c8963e" />
                    <div>
                      <small>Chef</small>
                      <p>{selectedItem.chef}</p>
                    </div>
                  </div>
                )}
                {selectedItem.cookingTime && (
                  <div className="modal-meta-item">
                    <Clock size={18} color="#c8963e" />
                    <div>
                      <small>Cook Time</small>
                      <p>{selectedItem.cookingTime}</p>
                    </div>
                  </div>
                )}
                {selectedItem.calories && (
                  <div className="modal-meta-item">
                    <Flame size={18} color="#c8963e" />
                    <div>
                      <small>Calories</small>
                      <p>{selectedItem.calories}</p>
                    </div>
                  </div>
                )}
              </div>

              {selectedItem.ingredients && (
                <div className="dish-modal-ingredients">
                  <h4>Ingredients</h4>
                  <p>{selectedItem.ingredients}</p>
                </div>
              )}

              <Link to="/reservations" className="dish-modal-reserve" onClick={() => setSelectedItem(null)}>
                Reserve a Table
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Menu