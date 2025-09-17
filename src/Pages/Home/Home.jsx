import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Utensils, ChefHat, Landmark } from "lucide-react";
import "./Home.css";

const restaurantData = {
  heroSlides: [
    {
      id: 1,
      title: "Authentic Flavors, Unforgettable Experience",
      subtitle: "Discover culinary excellence with fresh ingredients and traditional recipes",
      cta: "View Menu",
      background: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop"
    },
    {
      id: 2,
      title: "Farm to Table Excellence",
      subtitle: "Fresh, locally sourced ingredients prepared by expert chefs",
      cta: "Our Story",
      background: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop"
    },
    {
      id: 3,
      title: "Perfect for Every Occasion",
      subtitle: "From intimate dinners to special celebrations",
      cta: "Make Reservation",
      background: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&h=800&fit=crop"
    }
  ],
  features: [
    {
      id: 1,
      icon: <Utensils size={32} />,
      title: "Fresh Ingredients",
      description: "Locally sourced, premium quality ingredients prepared daily",
      link: "/menu"
    },
    {
      id: 2,
      icon: <ChefHat size={32} />,
      title: "Expert Chefs",
      description: "Award-winning chefs with years of culinary expertise",
      link: "/chefs"
    },
    {
      id: 3,
      icon: <Landmark size={32} />,
      title: "Elegant Atmosphere",
      description: "Beautiful ambiance perfect for any dining occasion",
      link: "/gallery"
    },
  ],
  aboutSection: {
    badge: "Since 2015",
    title: "Our Culinary Journey",
    paragraphs: [
      "Founded with a passion for exceptional cuisine, our restaurant has been serving the community with authentic flavors and memorable dining experiences for over 8 years.",
      "We believe in the power of fresh, locally-sourced ingredients combined with time-honored cooking techniques to create dishes that tell a story."
    ],
    stats: [
      {
        number: "8+",
        label: "Years"
      },
      {
        number: "50K+",
        label: "Happy Customers"
      },
      {
        number: "15+",
        label: "Awards"
      }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
      alt: "Restaurant interior"
    }
  },
  signatureDishes: [
    {
      id: 1,
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with seasonal vegetables",
      price: "$28",
      image: "/images/Grilled Salmon.jpeg",
      category: "seafood"
    },
    {
      id: 2,
      name: "Ribeye Steak",
      description: "Prime cut with garlic mashed potatoes",
      price: "$35",
      image: "/images/Ribeye Steak.jpg",
      category: "meat"
    },
    {
      id: 3,
      name: "Pasta Primavera",
      description: "House-made pasta with fresh garden vegetables",
      price: "$22",
      image: "/images/PastaPrimavera.jpg",
      category: "pasta"
    },
       {
      id: 4,
      name: "Provençal Herb Poulet",
      description: "House-made pasta with fresh garden vegetables",
      price: "$22",
      image: "/images/Provençal Herb Poulet.jpeg",
      category: "pasta"
    }
  ],
  testimonials: [
    {
      id: 1,
      name: "Sarah Johnson",
      review: "Absolutely incredible dining experience! The food was exceptional and the service was impeccable.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      memberSince: "2022"
    },
    {
      id: 2,
      name: "Michael Chen",
      review: "Best restaurant in town! The atmosphere is perfect for special occasions.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      memberSince: "2021"
    },
    {
      id: 3,
      name: "Emily Davis",
      review: "Fresh ingredients, creative dishes, and wonderful staff. Highly recommend!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      memberSince: "2023"
    }
  ],
  ctaSection: {
    title: "Ready for an Unforgettable Dining Experience?",
    description: "Reserve your table today and discover why we're the city's favorite restaurant.",
    primaryButton: {
      text: "Make Reservation",
      link: "/reservations"
    },
    secondaryButton: {
      text: "View Menu",
      link: "/menu"
    },
    features: ["Fresh ingredients daily", "Award-winning chefs", "Perfect for any occasion"]
  },
  sectionHeaders: {
    features: {
      title: "Why Choose Our Restaurant?",
      subtitle: "Experience exceptional dining with our commitment to quality, service, and atmosphere"
    },
    menu: {
      title: "Signature Dishes",
      subtitle: "A taste of our most beloved creations"
    },
    testimonials: {
      title: "What Our Guests Say",
      subtitle: ""
    }
  },
  navigation: {
    links: [
      { text: "Home", path: "/" },
      { text: "Menu", path: "/menu" },
      { text: "About", path: "/about" },
      { text: "Reservations", path: "/reservations" },
      { text: "Contact", path: "/contact" }
    ]
  },
  restaurantInfo: {
    name: "Bella Vista Restaurant",
    tagline: "Authentic Flavors, Unforgettable Experience",
    phone: "(555) 123-4567",
    email: "info@bellavista.com",
    address: {
      street: "123 Culinary Street",
      city: "Food City",
      state: "FC",
      zip: "12345"
    },
    hours: {
      monday: "5:00 PM - 10:00 PM",
      tuesday: "5:00 PM - 10:00 PM",
      wednesday: "5:00 PM - 10:00 PM",
      thursday: "5:00 PM - 10:00 PM",
      friday: "5:00 PM - 11:00 PM",
      saturday: "4:00 PM - 11:00 PM",
      sunday: "4:00 PM - 9:00 PM"
    },
    socialMedia: {
      facebook: "https://facebook.com/bellavista",
      instagram: "https://instagram.com/bellavista",
      twitter: "https://twitter.com/bellavista"
    }
  }
};




const Home = () => {
   const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const { heroSlides, features, aboutSection, signatureDishes, testimonials, ctaSection, sectionHeaders } =
    restaurantData

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  // Stats animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 })

    const statsSection = document.querySelector(".stats")
    if (statsSection) observer.observe(statsSection)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="restaurant-home">
      {/* Hero Section */}
      <section className="hero-slider">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.background})` }}
          >
            <div className="hero-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
              <div className="hero-actions">
                <Link to="/menu" className="btn-primary">
                  {slide.cta}
                </Link>
                <Link to="/reservations" className="btn-outline">
                  Make Reservation
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`slide-indicator ${index === currentSlide ? "active" : ""}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="section section-light" data-aos="fade-up">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{sectionHeaders.features.title}</h2>
            <p className="section-subtitle">{sectionHeaders.features.subtitle}</p>
          </div>

          <div className="features-grid" data-aos="fade-up" data-aos-delay="100">
            {features.map((feature) => (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section" data-aos="fade-up" data-aos-delay="100"> 
        <div className="container">
          <div className="about-grid">
            <div>
              <div className="about-badge">{aboutSection.badge}</div>
              <h2 className="section-title">{aboutSection.title}</h2>
              {aboutSection.paragraphs.map((paragraph, index) => (
                <p key={index} className="about-text">
                  {paragraph}
                </p>
              ))}

              <div className="stats-row" >
                {aboutSection.stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn-primary">
                Learn More About Us
              </Link>
            </div>

            <div className="about-image">
              <img src={aboutSection.image.src || "/placeholder.svg"} alt={aboutSection.image.alt} />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="section section-light" data-aos="fade-up" data-aos-delay="100">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{sectionHeaders.menu.title}</h2>
            <p className="section-subtitle">{sectionHeaders.menu.subtitle}</p>
          </div>

          <div className="menu-grid">
            {signatureDishes.map((dish) => (
              <div key={dish.id} className="menu-card">
                <img src={dish.image || "/placeholder.svg"} alt={dish.name} />
                <div className="menu-card-content">
                  <div className="menu-card-header">
                    <h3 className="menu-item-name">{dish.name}</h3>
                    <span className="menu-item-price">{dish.price}</span>
                  </div>
                  <p className="menu-item-description">{dish.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="menu-cta">
            <Link to="/menu" className="btn-primary">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" data-aos="fade-up" data-aos-delay="100">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{sectionHeaders.testimonials.title}</h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">
                      ★
                    </span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.review}"</p>
                <h4 className="testimonial-author">{testimonial.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-dark">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">{ctaSection.title}</h2>
            <p className="cta-description">{ctaSection.description}</p>

            <div className="cta-actions">
              <Link to={ctaSection.primaryButton.link} className="btn-primary btn-large">
                {ctaSection.primaryButton.text}
              </Link>
              <Link to={ctaSection.secondaryButton.link} className="btn-outline btn-large">
                {ctaSection.secondaryButton.text}
              </Link>
            </div>

            <div className="cta-features">
              {ctaSection.features.map((feature, index) => (
                <div key={index} className="cta-feature">
                  <span className="check">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
