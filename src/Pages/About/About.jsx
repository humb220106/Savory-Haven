import { Link } from "react-router-dom"
import "./About.css"
import AboutData from "./About.json";

const { stats, values, timeline, team } = AboutData;

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-image-container">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop"
            alt="Savory Haven Restaurant interior"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Our Story</h1>
            <p className="hero-subtitle">A journey of passion, tradition, and culinary excellence that began in 2015</p>
          </div>
        </div>
      </section>

      {/* Restaurant Story */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2 className="section-title">The Savory Haven Story</h2>
              <p className="story-paragraph">
                Savory Haven Restaurant was born from a simple yet profound vision: to create a dining sanctuary where
                exceptional cuisine meets warm hospitality. Founded in 2015 by Chef Maria Rodriguez, our restaurant has
                grown from a small neighborhood gem to a celebrated culinary destination.
              </p>
              <p className="story-paragraph">
                What started as Chef Maria's dream to share her Mediterranean heritage has evolved into a culinary
                journey that celebrates the finest ingredients and time-honored techniques. We've carefully assembled a
                team of passionate professionals, each bringing their unique expertise to create an unparalleled dining
                experience.
              </p>
              <p className="story-paragraph">
                Today, Savory Haven stands as a testament to the power of passion, dedication, and the belief that great
                food brings people together. Every dish we serve tells a story, every ingredient is chosen with care,
                and every guest becomes part of our extended family.
              </p>
            </div>
            <div className="story-image">
              <img
                src="about.jpg"
                alt="Restaurant atmosphere"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">The principles that guide everything we do at Savory Haven</p>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          <p className="section-subtitle">Milestones that have shaped Savory Haven into what it is today</p>
          <div className="timeline">
            {timeline.map((event, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{event.year}</div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{event.title}</h3>
                  <p className="timeline-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Culinary Team</h2>
          <p className="section-subtitle">The talented professionals who bring our culinary vision to life</p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} />
                </div>
                <div className="team-content">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-title">{member.title}</p>
                  <p className="team-bio">{member.bio}</p>
                  <div className="team-specialties">
                    <h4>Specialties:</h4>
                    <ul>
                      {member.specialties.map((specialty, idx) => (
                        <li key={idx}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="container">
          <div className="philosophy-content">
            <div className="philosophy-text">
              <h2 className="section-title">Our Culinary Philosophy</h2>
              <p className="philosophy-paragraph">
                At Savory Haven, we believe that exceptional cuisine is born from the marriage of tradition and
                innovation. Our chefs honor the time-tested techniques passed down through generations while embracing
                modern culinary science and creativity.
              </p>
              <p className="philosophy-paragraph">
                We source our ingredients from local farms and trusted suppliers who share our commitment to quality and
                sustainability. Every dish is prepared with meticulous attention to detail, ensuring that each bite
                delivers an unforgettable experience.
              </p>
              <p className="philosophy-paragraph">
                Our menu represents a culinary journey that celebrates fresh, seasonal ingredients and authentic
                flavors. This approach allows us to offer something special for every palate while maintaining the
                highest standards of quality and authenticity.
              </p>
            </div>
            <div className="philosophy-image">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop"
                alt="Chef preparing food"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Experience Savory Haven</h2>
            <p className="cta-description">
              Join us for an unforgettable culinary journey. Whether you're celebrating a special occasion or simply
              seeking an exceptional meal, we're here to create memories that will last a lifetime.
            </p>
            <div className="cta-buttons">
              <Link to="/reservations" className="primary-button">
                Make a Reservation
              </Link>
              <Link to="/menu" className="secondary-button">
                View Our Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
