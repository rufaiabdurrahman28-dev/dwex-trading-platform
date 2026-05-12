'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: signInError } = await signIn(email, password)

      if (signInError) {
        setError(signInError)
        setLoading(false)
        return
      }

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.')
      setLoading(false)
    }
  }

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
                src="/school-logo.png"
                alt="Aroyan Muslim School"
                className="auth-logo"
              />
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Sign in to your Aroyan school portal</p>
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

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="form-submit-btn"
                disabled={loading || !email || !password}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Signing in...' : 'Login'}
              </button>
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
