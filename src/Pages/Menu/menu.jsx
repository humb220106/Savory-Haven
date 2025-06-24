import { useState } from "react"
import { Link } from "react-router-dom"
import "./menu.css"
import menuData from "./menu.json";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("italian")
  const [selectedItem, setSelectedItem] = useState(null)

  const currentItems = menuData.items[activeCategory] || []

  const openModal = (item) => {
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal()
    }
  }

  return (
    <div className="text-menu">
      {/* Header with Restaurant Story */}
      <header className="menu-header">
        <div className="header-hero">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop"
            alt="Restaurant interior"
            className="header-image"
          />
        </div>
      </header>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="container">
          <h2 className="section-title">Our Culinary Philosophy</h2>
          <div className="philosophy-grid">
            <div className="philosophy-item">
              <div className="philosophy-image">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
                  alt="Farm fresh ingredients"
                />
              </div>
              <div className="philosophy-content">
                <h3>Farm to Table Excellence</h3>
                <p>
                  We believe that exceptional cuisine begins with exceptional ingredients. Our relationships with local
                  farmers ensure that every component of your meal is fresh, sustainable, and bursting with natural
                  flavor.
                </p>
              </div>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-image">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
                  alt="Chef preparing food"
                />
              </div>
              <div className="philosophy-content">
                <h3>Artisanal Craftsmanship</h3>
                <p>
                  Every dish is a work of art, crafted by skilled chefs who have dedicated their lives to the culinary
                  arts. Our kitchen is where tradition meets innovation, enhanced by modern creativity.
                </p>
              </div>
            </div>
            <div className="philosophy-item">
              <div className="philosophy-image">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop"
                  alt="Seasonal ingredients"
                />
              </div>
              <div className="philosophy-content">
                <h3>Seasonal Inspiration</h3>
                <p>
                  Our menu evolves with the seasons, reflecting the natural rhythm of the earth and the peak flavors of
                  each time of year. Each season brings new discoveries and renewed excitement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Navigation */}
      <nav className="menu-navigation">
        <div className="container">
          <h2 className="nav-title">Explore Our Menu</h2>
          <p className="nav-description">
            Journey through the world's finest cuisines, each prepared with authentic techniques and premium
            ingredients.
          </p>
          <div className="category-links">
            {menuData.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-link ${activeCategory === category.id ? "active" : ""}`}
              >
                <span className="category-number">
                  {String(menuData.categories.indexOf(category) + 1).padStart(2, "0")}
                </span>
                <div className="category-info">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">
                    {category.id === "italian" &&
                      "Authentic Italian flavors with house-made pasta and traditional recipes"}
                    {category.id === "asian" && "Pan-Asian cuisine featuring fresh ingredients and bold flavors"}
                    {category.id === "french" &&
                      "Classic French techniques with modern presentation and seasonal ingredients"}
                    {category.id === "american" &&
                      "Contemporary American dishes with locally sourced premium ingredients"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Current Category Introduction */}
      <section className="category-intro">
        <div className="container">
          <div className="intro-content">
            <h2 className="category-title">{menuData.categories.find((cat) => cat.id === activeCategory)?.name}</h2>
            <div className="category-description-full">
              {activeCategory === "italian" && (
                <p>
                  Experience the rich culinary heritage of Italy with our authentic dishes prepared using traditional
                  techniques and the finest imported ingredients. From handmade pasta to wood-fired specialties.
                </p>
              )}
              {activeCategory === "asian" && (
                <p>
                  Discover the diverse flavors of Asia through our carefully curated selection of dishes that celebrate
                  the culinary traditions of Japan, China, Thailand, and beyond.
                </p>
              )}
              {activeCategory === "french" && (
                <p>
                  Indulge in the elegance of French cuisine with our classically trained chefs who bring centuries of
                  culinary tradition to every plate with modern flair and seasonal ingredients.
                </p>
              )}
              {activeCategory === "american" && (
                <p>
                  Savor contemporary American cuisine that celebrates local ingredients and innovative cooking
                  techniques, creating dishes that are both familiar and exciting.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="menu-items">
        <div className="container">
          <div className="items-list">
            {currentItems.map((item, index) => (
              <article key={item.id} className="menu-item" onClick={() => openModal(item)}>
                <div className="item-image">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
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
                      <div className="popular-indicator">
                        <span>★ Guest Favorite</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="text-modal">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <div className="modal-image-section">
              <img src={selectedItem.image || "/placeholder.svg"} alt={selectedItem.name} />
            </div>
            <div className="modal-text-section">
              <div className="modal-header">
                <h2 className="modal-title">{selectedItem.name}</h2>
                <span className="modal-price">{selectedItem.price}</span>
              </div>

              <div className="modal-description">
                <p>{selectedItem.description}</p>
              </div>

              <div className="modal-details-grid">
                <div className="modal-detail">
                  <h4>Preparation Details</h4>
                  <p>
                    <strong>Chef:</strong> {selectedItem.chef}
                  </p>
                  <p>
                    <strong>Time:</strong> {selectedItem.cookingTime}
                  </p>
                  <p>
                    <strong>Calories:</strong> {selectedItem.calories}
                  </p>
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

      {/* Reservations & Contact */}
      <section className="reservations-section">
        <div className="container">
          <div className="reservations-content">
            <div className="reservations-text">
              <h2 className="section-title">Join Us for an Unforgettable Evening</h2>
              <p>
                We invite you to experience the passion, creativity, and hospitality that define Bella Vista. Whether
                you're planning an intimate dinner or a special celebration, we're here to make your evening
                extraordinary.
              </p>
              <div className="cta-buttons">
                <Link to="/reservations" className="primary-button">
                  Make a Reservation
                </Link>
                <Link to="/contact" className="secondary-button">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="reservations-image">
              <img
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop"
                alt="Restaurant dining room"
              />
            </div>
          </div>
          <div className="contact-info">
            <div className="contact-item">
              <h4>Reservations</h4>
              <p>Phone: (555) 123-4567</p>
              <p>Email: reservations@bellavista.com</p>
            </div>
            <div className="contact-item">
              <h4>Hours</h4>
              <p>Tue-Thu: 5:00 PM - 10:00 PM</p>
              <p>Fri-Sat: 5:00 PM - 11:00 PM</p>
              <p>Sun: 4:00 PM - 9:00 PM</p>
            </div>
            <div className="contact-item">
              <h4>Location</h4>
              <p>123 Culinary Street</p>
              <p>Food City, FC 12345</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Menu
