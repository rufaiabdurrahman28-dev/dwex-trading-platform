'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Feature cards slide-in animation with IntersectionObserver
    const cards = document.querySelectorAll('.feature-card')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement
            const cardIndex = Array.from(cards).indexOf(card)
            setTimeout(() => {
              card.classList.add('slide-in-visible')
            }, cardIndex * 200)
            observer.unobserve(card)
          }
        })
      },
      { threshold: 0.2 }
    )

    cards.forEach((card) => observer.observe(card))

    return () => {
      cards.forEach((card) => observer.unobserve(card))
    }
  }, [])

  return (
    <>
      {/* ==================== D1 - Header + Hero ==================== */}
      <div className="D D1">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="navbar-brand">Aroyan</div>
          <div className="navbar-links">
            <a href="home.atmo" className="nav-link">Home</a>
            <a href="about.atmo" className="nav-link">About</a>
            <a href="admission.atmo" className="nav-link">Admission</a>
            <a href="login.atmo" className="nav-link">Login</a>
            <a href="admission.atmo" className="nav-cta-btn">Apply for Admission</a>
          </div>
          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => {
              const links = document.querySelector('.navbar-links')
              links?.classList.toggle('mobile-open')
            }}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <img
            src="/InShot_20260507_212731657.png"
            alt="Aroyan Logo"
            className="aroyan-logo"
          />
          <h1 className="hero-headline">Aroyan Muslim School</h1>
          <h2 className="hero-subheadline">Quranic Memorization & Western Education Combined</h2>
          <p className="hero-intro">
            Aroyan is a Muslim school dedicated to Quranic memorization and Islamic disciplines
            alongside Western education. We provide a conducive learning environment for students
            to grow academically and spiritually through our Saturday and Sunday Madrasah programs.
          </p>
          <div className="hero-cta-buttons">
            <a href="login.atmo" className="cta-btn cta-btn-outline">Login</a>
            <a href="signup.atmo" className="cta-btn cta-btn-filled">Sign Up</a>
          </div>
        </section>
      </div>

      {/* ==================== D2 - Feature Cards ==================== */}
      <div className="D D2">
        <section className="features-section">
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-svg">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </div>
            <h3 className="feature-title">Quranic Memorization</h3>
            <p className="feature-desc">
              Our dedicated Hifz program guides students through the complete memorization of the
              Holy Quran with certified Islamic scholars, ensuring proper Tajweed and deep understanding
              of the sacred text.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-svg">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </div>
            <h3 className="feature-title">Saturday & Sunday Madrasah</h3>
            <p className="feature-desc">
              Our weekend Madrasah program offers flexible learning for students who attend
              conventional schools during the week, providing comprehensive Islamic education
              on Saturdays and Sundays.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-svg">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3 className="feature-title">Academic Excellence</h3>
            <p className="feature-desc">
              We blend rigorous Western academic curriculum with Islamic studies, producing
              well-rounded students who excel in both spheres and are prepared for future
              academic and professional challenges.
            </p>
          </div>
        </section>
      </div>

      {/* ==================== D3 - Footer ==================== */}
      <div className="D D3">
        <footer className="footer">
          <div className="footer-about">
            <h4 className="footer-heading">About Us</h4>
            <p className="footer-text">
              Aroyan Muslim School is committed to nurturing students with strong Islamic values
              while providing quality Western education.
            </p>
          </div>

          <div className="social-icons">
            <a
              href="https://wa.me/YOUR_SCHOOL_NUMBER"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon whatsapp"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.003 2h-.006C8.266 2 2 8.264 2 16c0 3.066 1.01 5.9 2.72 8.16L2.96 27.16l3.204-1.024A13.94 13.94 0 0 0 16.003 30C23.734 30 30 23.734 30 16S23.734 2 16.003 2zm8.104 21.384c-.34.96-1.684 1.76-2.752 1.996-.74.16-1.704.284-4.952-1.064-4.156-1.724-6.832-5.944-7.04-6.216-.2-.272-1.66-2.212-1.66-4.22s1.048-2.996 1.416-3.408c.34-.38.74-.476.988-.476.248 0 .496.004.712.012.228.01.536-.088.84.64.312.74 1.06 2.588 1.152 2.776.092.188.156.408.032.656-.124.252-.188.408-.376.628-.188.22-.396.492-.564.66-.188.188-.384.392-.164.768.22.376.98 1.612 2.104 2.612 1.448 1.288 2.668 1.688 3.044 1.876.376.188.596.16.816-.096.22-.26.94-1.096 1.192-1.472.252-.376.5-.312.844-.188.344.124 2.184 1.032 2.56 1.22.376.188.628.28.72.436.092.156.092.904-.248 1.864z" fill="#25D366"/>
              </svg>
            </a>
            <a
              href="https://t.me/YOUR_SCHOOL_CHANNEL"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon telegram"
              aria-label="Telegram"
            >
              <svg viewBox="0 0 32 32" width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm6.768 9.588l-2.18 10.264c-.16.72-.588.896-1.192.556l-3.296-2.428-1.588 1.528c-.176.176-.324.324-.664.324l.236-3.36 6.18-5.584c.272-.236-.056-.368-.416-.132l-7.64 4.808-3.288-1.024c-.716-.224-.732-.716.148-1.06l12.856-4.956c.592-.216 1.108.144.916 1.068z" fill="#0088cc"/>
              </svg>
            </a>
          </div>

          <p className="footer-contact">Contact: info@aroyanschool.edu | +234-XXX-XXX-XXXX</p>
          <p className="footer-copyright">&copy; 2026 Aroyan Muslim School</p>
        </footer>
      </div>
    </>
  )
}
