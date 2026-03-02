// src/Pages/Menu/menu.jsx
// ─ Loads categories and dishes from the live API.
// ─ Falls back gracefully to loading/error states.
// ─ All CSS and modal logic unchanged from original.

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./menu.css"
import { getCategories, getDishesByCategory } from "../../api/menuService"

const CATEGORY_DESCRIPTIONS = {
  italian:  "Experience the rich culinary heritage of Italy with authentic dishes prepared using traditional techniques and the finest imported ingredients.",
  asian:    "Discover the diverse flavors of Asia through our carefully curated selection of dishes celebrating the culinary traditions of Japan, China, Thailand, and beyond.",
  french:   "Indulge in the elegance of French cuisine with our classically trained chefs bringing centuries of culinary tradition to every plate.",
  american: "Savor contemporary American cuisine that celebrates local ingredients and innovative cooking techniques.",
}

// Normalise backend field names to what the template uses
function normalise(dish) {
  return {
    ...dish,
    image:   dish.primaryImage ?? "/placeholder.svg",
    popular: dish.isPopular,
    price:   `$${Number(dish.price).toFixed(0)}`,
  }
}

const Menu = () => {
  const [categories,     setCategories]     = useState([])
  const [currentItems,   setCurrentItems]   = useState([])
  const [activeCategory, setActiveCategory] = useState("")
  const [selectedItem,   setSelectedItem]   = useState(null)
  const [loadingCats,    setLoadingCats]    = useState(true)
  const [loadingDishes,  setLoadingDishes]  = useState(false)
  const [error,          setError]          = useState("")

  // Load categories once on mount
  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data)
        if (data.length > 0) setActiveCategory(data[0].slug)
      })
      .catch(() => setError("Could not load menu categories. Please try again later."))
      .finally(() => setLoadingCats(false))
  }, [])

  // Load dishes whenever the active category changes
  useEffect(() => {
    if (!activeCategory) return
    setLoadingDishes(true)
    getDishesByCategory(activeCategory)
      .then((data) => setCurrentItems(data))
      .catch(() => setError("Could not load dishes."))
      .finally(() => setLoadingDishes(false))
  }, [activeCategory])

  const openModal        = (item) => setSelectedItem(item)
  const closeModal       = ()     => setSelectedItem(null)
  const handleModalClick = (e)    => { if (e.target.classList.contains("modal-overlay")) closeModal() }

  if (loadingCats) return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"60vh" }}>
      <p style={{ fontSize:"1.2rem", color:"#666" }}>Loading menu…</p>
    </div>
  )

  if (error) return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"60vh" }}>
      <p style={{ color:"red", fontSize:"1.1rem" }}>{error}</p>
    </div>
  )

  const activeCategoryName = categories.find((c) => c.slug === activeCategory)?.name ?? ""

  return (
    <div className="text-menu">

      {/* Hero */}
      <header className="menu-header">
        <div className="header-hero">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop"
            alt="Restaurant interior"
            className="header-image"
          />
        </div>
      </header>

      {/* Philosophy */}
      <section className="philosophy-section">
        <div className="container">
          <h2 className="section-title">Our Culinary Philosophy</h2>
          <div className="philosophy-grid">
            {[
              { src: "Farm to Table Excellence.jpg",  alt: "Farm fresh ingredients",  title: "Farm to Table Excellence",  text: "We believe that exceptional cuisine begins with exceptional ingredients. Our relationships with local farmers ensure that every component of your meal is fresh, sustainable, and bursting with natural flavor." },
              { src: "Artisanal Craftsmanship.jpg",   alt: "Chef preparing food",     title: "Artisanal Craftsmanship",   text: "Every dish is a work of art, crafted by skilled chefs who have dedicated their lives to the culinary arts. Our kitchen is where tradition meets innovation." },
              { src: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop", alt: "Seasonal ingredients", title: "Seasonal Inspiration", text: "Our menu evolves with the seasons, reflecting the natural rhythm of the earth and the peak flavors of each time of year." },
            ].map((p) => (
              <div key={p.title} className="philosophy-item">
                <div className="philosophy-image"><img src={p.src} alt={p.alt} /></div>
                <div className="philosophy-content"><h3>{p.title}</h3><p>{p.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <nav className="menu-navigation">
        <div className="container">
          <h2 className="nav-title">Explore Our Menu</h2>
          <p className="nav-description">Journey through the world's finest cuisines, each prepared with authentic techniques and premium ingredients.</p>
          <div className="category-links">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.slug)}
                className={`category-link ${activeCategory === category.slug ? "active" : ""}`}
              >
                <span className="category-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="category-info">
                  <h3 className="category-name">{category.icon} {category.name}</h3>
                  <p className="category-description">
                    {CATEGORY_DESCRIPTIONS[category.slug] ?? "Discover our delicious selection."}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Category intro */}
      <section className="category-intro">
        <div className="container">
          <div className="intro-content">
            <h2 className="category-title">{activeCategoryName}</h2>
            <div className="category-description-full">
              <p>{CATEGORY_DESCRIPTIONS[activeCategory] ?? ""}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dishes */}
      <section className="menu-items">
        <div className="container">
          {loadingDishes ? (
            <p style={{ textAlign:"center", padding:"2rem", color:"#666" }}>Loading dishes…</p>
          ) : (
            <div className="items-list">
              {currentItems.map((rawItem, index) => {
                const item = normalise(rawItem)
                return (
                  <article key={item.id} className="menu-item" onClick={() => openModal(item)}>
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-number">{String(index + 1).padStart(2, "0")}</div>
                    <div className="item-content">
                      <div className="item-header">
                        <h3 className="item-name">{item.name}</h3>
                        <span className="item-price">{item.price}</span>
                      </div>
                      <p className="item-description">{item.description}</p>
                      <div className="item-details">
                        <div className="detail-group">
                          <span className="detail-label">Chef:</span>
                          <span className="detail-value">{item.chef}</span>
                        </div>
                        <div className="detail-group">
                          <span className="detail-label">Time:</span>
                          <span className="detail-value">{item.cookingTime}</span>
                        </div>
                        {item.popular && (
                          <div className="popular-indicator"><span>★ Guest Favorite</span></div>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="text-modal">
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-image-section">
              <img src={selectedItem.image} alt={selectedItem.name} />
            </div>
            <div className="modal-text-section">
              <div className="modal-header">
                <h2 className="modal-title">{selectedItem.name}</h2>
                <span className="modal-price">{selectedItem.price}</span>
              </div>
              <div className="modal-description"><p>{selectedItem.description}</p></div>
              <div className="modal-details-grid">
                <div className="modal-detail">
                  <h4>Preparation Details</h4>
                  <p><strong>Chef:</strong> {selectedItem.chef}</p>
                  <p><strong>Time:</strong> {selectedItem.cookingTime}</p>
                  <p><strong>Calories:</strong> {selectedItem.calories}</p>
                </div>
                <div className="modal-detail">
                  <h4>Ingredients</h4>
                  <p>{selectedItem.ingredients}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="reservations-section">
        <div className="container">
          <div className="reservations-content">
            <div className="reservations-text">
              <h2 className="section-title">Join Us for an Unforgettable Evening</h2>
              <p>We invite you to experience the passion, creativity, and hospitality that define Savory Haven.</p>
              <div className="cta-buttons">
                <Link to="/reservations" className="primary-button">Make a Reservation</Link>
                <Link to="/contact"      className="secondary-button">Contact Us</Link>
              </div>
            </div>
            <div className="reservations-image">
              <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop" alt="Restaurant dining room" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Menu
