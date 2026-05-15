'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      window.location.href = '/dashboard'
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-bold text-lg text-black mx-auto mb-4">9M</div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-gray-500 mt-1">Start trading on 9mach Trade today</p>
        </div>

        <form onSubmit={handleSignup} className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/5 space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" required className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Phone Number</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+234 800 000 0000" required className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" required className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50" />
          </div>
          <div className="flex items-start gap-2">
            <input type="checkbox" required className="mt-1" />
            <p className="text-xs text-gray-500">I agree to the Terms of Service and acknowledge that trading involves risk.</p>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-emerald-500 text-black font-bold py-4 rounded-xl hover:bg-emerald-600 transition disabled:opacity-50">
            {loading ? 'Creating Account...' : 'Create Free Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <Link href="/login" className="text-emerald-400 hover:text-emerald-300">Log in</Link>
        </p>
      </div>
    </div>
  )
}
