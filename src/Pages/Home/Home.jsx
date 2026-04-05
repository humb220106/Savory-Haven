import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  UtensilsCrossed, ChefHat, Leaf, Star, ArrowRight,
  ChevronLeft, ChevronRight, Clock, MapPin, Phone, Quote
} from "lucide-react"
import "./Home.css"

const SLIDES = [
  {
    id: 1,
    title: "Authentic Flavors,",
    highlight: "Unforgettable Experience",
    subtitle: "Discover culinary excellence with fresh ingredients and traditional recipes",
    bg: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&h=900&fit=crop",
  },
  {
    id: 2,
    title: "Farm to Table",
    highlight: "Excellence",
    subtitle: "Fresh, locally sourced ingredients prepared by our expert chefs every day",
    bg: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&h=900&fit=crop",
  },
  {
    id: 3,
    title: "Perfect for Every",
    highlight: "Occasion",
    subtitle: "From intimate dinners to grand celebrations, we make every moment special",
    bg: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1400&h=900&fit=crop",
  },
]

const FEATURES = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "Locally sourced, premium quality ingredients prepared fresh daily from trusted farms.",
  },
  {
    icon: ChefHat,
    title: "Expert Chefs",
    description: "Award-winning chefs with decades of culinary expertise across world cuisines.",
  },
  {
    icon: UtensilsCrossed,
    title: "Elegant Dining",
    description: "A beautiful, warm ambiance crafted to make every dining occasion memorable.",
  },
]

const DISHES = [
  { id: 1, name: "Grilled Salmon",        description: "Fresh Atlantic salmon with seasonal vegetables",  price: "$28", image: "/images/Grilled Salmon.jpeg" },
  { id: 2, name: "Ribeye Steak",          description: "Prime cut with garlic mashed potatoes",           price: "$35", image: "/images/Ribeye Steak.jpg" },
  { id: 3, name: "Pasta Primavera",       description: "House-made pasta with fresh garden vegetables",   price: "$22", image: "/images/PastaPrimavera.jpg" },
  { id: 4, name: "Provençal Herb Poulet", description: "Classic French herb chicken with roasted veg",   price: "$26", image: "/images/Provençal Herb Poulet.jpeg" },
]

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Food Blogger",
    review: "Absolutely incredible dining experience! The food was exceptional and the service was impeccable. One of the best meals of my life.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Guest",
    review: "Best restaurant in town! The atmosphere is perfect for special occasions. We come here for every anniversary.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Food Critic",
    review: "Fresh ingredients, creative dishes, and wonderful staff. The menu changes with the seasons beautifully.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
]

const STATS = [
  { number: "8+",   label: "Years of Excellence" },
  { number: "50K+", label: "Happy Guests"         },
  { number: "15+",  label: "Awards Won"           },
  { number: "4.9",  label: "Average Rating"       },
]

const Home = () => {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setSlide((p) => (p + 1) % SLIDES.length), 5000)
    return () => clearInterval(t)
  }, [])

  const prevSlide = () => setSlide((p) => (p - 1 + SLIDES.length) % SLIDES.length)
  const nextSlide = () => setSlide((p) => (p + 1) % SLIDES.length)

  return (
    <div className="home">

      {/* ── Hero ── */} 
      <section className="home-hero">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`home-slide ${i === slide ? "active" : ""}`}
            style={{ backgroundImage: `url(${s.bg})` }}
          >
            <div className="home-slide-overlay" />
            <div className="home-slide-content">
              <div className="home-hero-badge">
                <Star size={14} fill="#c8963e" color="#c8963e" />
                Fine Dining Since 2015
                <Star size={14} fill="#c8963e" color="#c8963e" />
              </div>
              <h1>
                {s.title}<br />
                <span className="home-hero-highlight">{s.highlight}</span>
              </h1>
              <p>{s.subtitle}</p>
              <div className="home-hero-btns">
                <Link to="/menu" className="home-btn-primary">
                  Explore Menu <ArrowRight size={18} />
                </Link>
                <Link to="/reservations" className="home-btn-outline">
                  Reserve a Table
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button className="home-slide-prev" onClick={prevSlide}><ChevronLeft size={22} /></button>
        <button className="home-slide-next" onClick={nextSlide}><ChevronRight size={22} /></button>

        {/* Dots */}
        <div className="home-slide-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`home-dot ${i === slide ? "active" : ""}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>

        {/* Quick info bar */}
        <div className="home-info-bar">
          <div className="home-info-item">
            <Clock size={16} color="#c8963e" />
            <span>Mon–Sun: 12PM – 11PM</span>
          </div>
          <div className="home-info-divider" />
          <div className="home-info-item">
            <MapPin size={16} color="#c8963e" />
            <span>123 Culinary Street, Downtown</span>
          </div>
          <div className="home-info-divider" />
          <div className="home-info-item">
            <Phone size={16} color="#c8963e" />
            <span>(555) 123-4567</span>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="home-section home-features-section">
        <div className="home-container">
          <div className="home-section-header">
            <span className="home-eyebrow">Why Choose Us</span>
            <h2>An Experience Like No Other</h2>
            <p>We combine passion, skill, and the finest ingredients to create meals that linger in memory.</p>
          </div>
          <div className="home-features-grid">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="home-feature-card">
                <div className="home-feature-icon">
                  <Icon size={28} color="#c8963e" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="home-stats-section">
        <div className="home-container">
          <div className="home-stats-grid">
            {STATS.map(({ number, label }) => (
              <div key={label} className="home-stat">
                <div className="home-stat-number">{number}</div>
                <div className="home-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="home-section">
        <div className="home-container">
          <div className="home-about-grid">
            <div className="home-about-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&h=500&fit=crop"
                alt="Restaurant interior"
              />
              <div className="home-about-img-badge">
                <UtensilsCrossed size={20} color="#c8963e" />
                <span>Est. 2015</span>
              </div>
            </div>
            <div className="home-about-text">
              <span className="home-eyebrow">Our Story</span>
              <h2>A Culinary Journey of Passion</h2>
              <p>
                Founded with a passion for exceptional cuisine, Savory Haven has been serving the community with
                authentic flavors and memorable dining experiences for over 8 years.
              </p>
              <p>
                We believe in the power of fresh, locally-sourced ingredients combined with time-honored cooking
                techniques to create dishes that tell a story and bring people together.
              </p>
              <Link to="/about" className="home-btn-primary" style={{ display: "inline-flex", marginTop: "1rem" }}>
                Our Full Story <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Signature Dishes ── */}
      <section className="home-section home-dishes-section">
        <div className="home-container">
          <div className="home-section-header">
            <span className="home-eyebrow">Our Menu</span>
            <h2>Signature Dishes</h2>
            <p>A taste of our most beloved creations, crafted with love and precision.</p>
          </div>
          <div className="home-dishes-grid">
            {DISHES.map((dish) => (
              <div key={dish.id} className="home-dish-card">
                <div className="home-dish-img">
                  <img src={dish.image} alt={dish.name} />
                  <div className="home-dish-price">{dish.price}</div>
                </div>
                <div className="home-dish-body">
                  <h3>{dish.name}</h3>
                  <p>{dish.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link to="/menu" className="home-btn-primary">
              View Full Menu <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="home-section home-testimonials-section">
        <div className="home-container">
          <div className="home-section-header">
            <span className="home-eyebrow">Testimonials</span>
            <h2>What Our Guests Say</h2>
          </div>
          <div className="home-testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="home-testimonial-card">
                <Quote size={28} color="#c8963e" style={{ opacity: 0.4 }} />
                <p className="home-testimonial-text">{t.review}</p>
                <div className="home-testimonial-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#c8963e" color="#c8963e" />
                  ))}
                </div>
                <div className="home-testimonial-author">
                  <img src={t.image} alt={t.name} />
                  <div>
                    <div className="home-testimonial-name">{t.name}</div>
                    <div className="home-testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="home-cta-section">
        <div className="home-cta-overlay" />
        <div className="home-container home-cta-content">
          <span className="home-eyebrow" style={{ color: "#c8963e" }}>Book Now</span>
          <h2>Ready for an Unforgettable<br />Dining Experience?</h2>
          <p>Reserve your table today and discover why we're the city's favourite restaurant.</p>
          <div className="home-cta-btns">
            <Link to="/reservations" className="home-btn-primary">
              Make a Reservation <ArrowRight size={18} />
            </Link>
            <Link to="/menu" className="home-btn-outline">
              View Menu
            </Link>
          </div>
          <div className="home-cta-checks">
            {["Fresh ingredients daily", "Award-winning chefs", "Perfect for any occasion"].map((f) => (
              <span key={f} className="home-cta-check">
                <Star size={13} fill="#c8963e" color="#c8963e" /> {f}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home