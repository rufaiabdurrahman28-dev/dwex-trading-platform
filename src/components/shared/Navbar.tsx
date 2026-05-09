'use client'

import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">
          <img
            src="/InShot_20260507_212731657.jpg"
            alt="Aroyan Logo"
            className="navbar-logo-brand"
          />
        </a>
      </div>
      <div className="navbar-links">
        <a href="/" className={`nav-link ${isActive('/') && pathname === '/' ? 'nav-link-active' : ''}`}>Home</a>
        <a href="/about" className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}>About</a>
        <a href="/admission" className={`nav-link ${isActive('/admission') ? 'nav-link-active' : ''}`}>Admission</a>
        <a href="/login" className={`nav-link ${isActive('/login') ? 'nav-link-active' : ''}`}>Login</a>
        <a href="/admission" className="nav-cta-btn">Apply for Admission</a>
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
  )
}
