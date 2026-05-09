'use client'

import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export default function LoginPage() {
  return (
    <>
      {/* ==================== D1 - Header ==================== */}
      <div className="D D1 D1-short">
        <Navbar />
      </div>

      {/* ==================== D2 - Login Form ==================== */}
      <div className="D D2 D2-auto D2-center">
        <section className="auth-section">
          <div className="auth-card">
            <div className="auth-card-header">
              <img
                src="/InShot_20260507_212731657.jpg"
                alt="Aroyan Logo"
                className="auth-logo"
              />
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Sign in to your Aroyan student portal</p>
            </div>

            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-checkbox-label">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="form-link">Forgot Password?</a>
              </div>

              <button type="submit" className="form-submit-btn">Login</button>
            </form>

            <div className="auth-footer">
              <p>Don&apos;t have an account? <a href="/signup" className="form-link-bold">Sign Up</a></p>
            </div>
          </div>
        </section>
      </div>

      {/* ==================== D3 - Footer ==================== */}
      <Footer />
    </>
  )
}
