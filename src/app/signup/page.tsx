'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import type { Role, Section } from '@/lib/types'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export default function SignupPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<Role | ''>('')
  const [section, setSection] = useState<Section>('primary')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!role) {
      setError('Please select your role')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const { error: signUpError } = await signUp(email, password, fullName, role as Role, section)

      if (signUpError) {
        setError(signUpError)
        setLoading(false)
        return
      }

      setSuccess('Account created! Please check your email to confirm your account, then login.')
      setLoading(false)
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.')
      setLoading(false)
    }
  }

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
                src="/school-logo.png"
                alt="Aroyan Muslim School"
                className="auth-logo"
              />
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle">Join Aroyan Muslim School today</p>
            </div>

            {error && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '14px',
                fontWeight: 500,
                background: 'rgba(220, 53, 69, 0.08)',
                border: '1px solid rgba(220, 53, 69, 0.25)',
                color: '#dc3545',
              }}>
                {error}
              </div>
            )}

            {success && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '14px',
                fontWeight: 500,
                background: 'rgba(45, 95, 63, 0.08)',
                border: '1px solid rgba(45, 95, 63, 0.25)',
                color: '#2D5F3F',
              }}>
                {success}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="signupEmail" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="signupEmail"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role" className="form-label">I am a...</label>
                <select
                  id="role"
                  className="form-input form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role | '')}
                  required
                  disabled={loading}
                >
                  <option value="">Select your role</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent / Guardian</option>
                  <option value="teacher">Teacher</option>
                  <option value="manager" disabled>Management (Contact school)</option>
                </select>
                {role === 'manager' && (
                  <p style={{ fontSize: '13px', color: '#C9A961', margin: '6px 0 0', fontWeight: 500 }}>
                    Management accounts are created by the admin only. Contact the school if you need a management account.
                  </p>
                )}
              </div>

              {role && role !== 'manager' && (
                <div className="form-group">
                  <label htmlFor="section" className="form-label">Section</label>
                  <select
                    id="section"
                    className="form-input form-select"
                    value={section}
                    onChange={(e) => setSection(e.target.value as Section)}
                    required
                    disabled={loading}
                  >
                    <option value="nursery">Nursery</option>
                    <option value="primary">Primary</option>
                    <option value="jss">JSS</option>
                    <option value="sss">SSS</option>
                  </select>
                </div>
              )}

              <div className="form-row-2col">
                <div className="form-group">
                  <label htmlFor="signupPassword" className="form-label">Password</label>
                  <input
                    type="password"
                    id="signupPassword"
                    className="form-input"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-input"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="form-submit-btn"
                disabled={loading || !fullName || !email || !password || !role}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
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
