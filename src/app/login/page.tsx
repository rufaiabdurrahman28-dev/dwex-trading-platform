'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate login
    setTimeout(() => {
      setLoading(false)
      window.location.href = '/dashboard'
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-bold text-lg text-black mx-auto mb-4">9M</div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 mt-1">Log in to your 9mach Trade account</p>
        </div>

        <form onSubmit={handleLogin} className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5 space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 text-black font-bold py-4 rounded-xl hover:bg-emerald-600 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don&apos;t have an account? <Link href="/signup" className="text-emerald-400 hover:text-emerald-300">Sign up free</Link>
        </p>
      </div>
    </div>
  )
}
