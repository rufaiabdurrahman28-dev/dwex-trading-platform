'use client'

import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export default function SignupPage() {
  return (
    <>
      {/* ==================== D1 - Header ==================== */}
      <div className="D D1 D1-short">
        <Navbar />
      </div>

      {/* ==================== D2 - Sign Up Form ==================== */}
      <div className="D D2 D2-auto D2-center">
        <section className="auth-section">
          <div className="auth-card auth-card-wide">
            <div className="auth-card-header">
              <img
                src="/InShot_20260507_212731657.jpg"
                alt="Aroyan Logo"
                className="auth-logo"
              />
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle">Join Aroyan Muslim School today</p>
            </div>

            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="form-input"
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-input"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="signupEmail" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="signupEmail"
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  className="form-input"
                  placeholder="+234 XXX XXX XXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role" className="form-label">I am a...</label>
                <select id="role" className="form-input form-select" required>
                  <option value="">Select your role</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent / Guardian</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="program" className="form-label">Preferred Program</label>
                <select id="program" className="form-input form-select" required>
                  <option value="">Select a program</option>
                  <option value="hifz">Hifz Program (Full-Time)</option>
                  <option value="academic">Full-Time Academic Program</option>
                  <option value="saturday">Saturday Madrasah</option>
                  <option value="sunday">Sunday Madrasah</option>
                </select>
              </div>

              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="signupPassword" className="form-label">Password</label>
                  <input
                    type="password"
                    id="signupPassword"
                    className="form-input"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-input"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>

              <label className="form-checkbox-label">
                <input type="checkbox" className="form-checkbox" required />
                <span>I agree to the terms and conditions of Aroyan Muslim School</span>
              </label>

              <button type="submit" className="form-submit-btn">Create Account</button>
            </form>

            <div className="auth-footer">
              <p>Already have an account? <a href="/login" className="form-link-bold">Login</a></p>
            </div>
          </div>
        </section>
      </div>

      {/* ==================== D3 - Footer ==================== */}
      <Footer />
    </>
  )
}
