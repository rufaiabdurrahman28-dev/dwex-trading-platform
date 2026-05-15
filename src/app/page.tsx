'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const marketData = [
  { symbol: 'BTC/USD', price: '67,542.30', change: '+2.34%', up: true },
  { symbol: 'ETH/USD', price: '3,891.15', change: '+1.87%', up: true },
  { symbol: 'EUR/USD', price: '1.0842', change: '-0.12%', up: false },
  { symbol: 'AAPL', price: '189.72', change: '+0.95%', up: true },
  { symbol: 'USD/NGN', price: '1,550.00', change: '+0.45%', up: true },
  { symbol: 'SOL/USD', price: '178.34', change: '+5.21%', up: true },
]

const features = [
  {
    icon: '📈',
    title: '1,500+ Assets',
    desc: 'Trade Forex, Stocks, Crypto, Commodities, Indices & ETFs from one platform'
  },
  {
    icon: '📊',
    title: 'Live Charts',
    desc: 'Professional TradingView charts with real-time price data and technical indicators'
  },
  {
    icon: '💰',
    title: 'Nigerian Wallet',
    desc: 'Deposit & withdraw in Naira (₦) via Paystack, bank transfer, USSD & crypto'
  },
  {
    icon: '🔄',
    title: 'Instant Transfer',
    desc: 'Send & receive money instantly between 9mach Trade users — zero fees'
  },
  {
    icon: '🔔',
    title: 'Price Alerts',
    desc: 'Set custom price alerts on any of 1,500+ assets and never miss an opportunity'
  },
  {
    icon: '🛡️',
    title: 'Secure & Verified',
    desc: 'KYC verification, transaction PIN, 2FA and bank-grade security for your funds'
  },
]

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [tickerOffset, setTickerOffset] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setTickerOffset(prev => prev - 1)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-bold text-sm">9M</div>
              <span className="text-xl font-bold">9mach <span className="text-emerald-400">Trade</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#markets" className="text-sm text-gray-400 hover:text-white transition">Markets</a>
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition">Pricing</a>
              <a href="#about" className="text-sm text-gray-400 hover:text-white transition">About</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm text-gray-400 hover:text-white transition px-3 py-2">Log In</Link>
              <Link href="/signup" className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-sm px-5 py-2 rounded-lg transition">Start Trading</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Price Ticker */}
      <div className="mt-16 bg-[#111118] border-b border-white/5 overflow-hidden h-10 flex items-center">
        <div className="flex whitespace-nowrap" style={{ transform: `translateX(${tickerOffset}px)` }}>
          {[...marketData, ...marketData, ...marketData].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-6 text-sm">
              <span className="text-gray-500">{item.symbol}</span>
              <span className="font-medium">${item.price}</span>
              <span className={item.up ? 'text-emerald-400' : 'text-red-400'}>{item.change}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-sm font-medium">Live Trading — 1,500+ Assets</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Trade Smart,<br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Trade Global</span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
              The most powerful trading platform for Forex, Stocks, Crypto & more. 
              Deposit in Naira ₦, trade globally. Built for Nigerians, designed for the world.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-lg px-8 py-4 rounded-xl transition w-full sm:w-auto">
                Open Free Account
              </Link>
              <a href="#features" className="border border-white/10 hover:border-white/30 text-white font-medium text-lg px-8 py-4 rounded-xl transition w-full sm:w-auto">
                Explore Features →
              </a>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
              <span>✅ No deposit fees</span>
              <span>✅ Instant execution</span>
              <span>✅ 24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Market Preview */}
      <section id="markets" className="py-20 bg-[#0d0d15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-2">Live Markets</h2>
          <p className="text-gray-500 text-center mb-12">Real-time prices from global markets</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketData.map((item, i) => (
              <div key={i} className="bg-[#1a1a2e] rounded-xl p-5 border border-white/5 hover:border-emerald-500/30 transition cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-lg">{item.symbol}</span>
                  <span className={`text-sm font-medium px-2 py-0.5 rounded ${item.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {item.change}
                  </span>
                </div>
                <div className="text-2xl font-bold mb-2">${item.price}</div>
                <div className="h-12 flex items-end gap-0.5">
                  {Array.from({ length: 20 }, (_, j) => {
                    const height = 15 + Math.random() * 85
                    const isUp = j > 14 ? item.up : !item.up
                    return (
                      <div
                        key={j}
                        className={`flex-1 rounded-sm ${isUp ? 'bg-emerald-500/60' : 'bg-red-500/60'}`}
                        style={{ height: `${height}%` }}
                      />
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/dashboard" className="text-emerald-400 hover:text-emerald-300 font-medium transition">
              View All 1,500+ Assets →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-2">Everything You Need to Trade</h2>
          <p className="text-gray-500 text-center mb-12">Professional tools for every trader</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-[#1a1a2e] rounded-xl p-6 border border-white/5 hover:border-emerald-500/30 transition group">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '1,500+', label: 'Tradeable Assets' },
              { value: '₦0', label: 'Deposit Fees' },
              { value: '24/7', label: 'Market Support' },
              { value: '100K+', label: 'Active Traders' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-1">{s.value}</div>
                <div className="text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-[#0d0d15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-2">Simple Pricing</h2>
          <p className="text-gray-500 text-center mb-12">Start free, upgrade when you&apos;re ready</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Free', price: '$0', period: 'forever', features: ['20 AI messages/day', '1 project', '1 app hosted', '50MB database', 'Basic charts'], highlight: false },
              { name: 'Pro', price: '$29.99', period: '/month', features: ['5,000 AI messages/day', 'Unlimited projects', '20 apps hosted', '10GB database', 'Advanced charts', 'Price alerts', 'Priority support'], highlight: true },
              { name: 'Business', price: '$99.99', period: '/month', features: ['Unlimited everything', 'Unlimited apps', 'Unlimited DB', 'Team access', 'API access', 'White-label', 'Dedicated support'], highlight: false },
            ].map((plan, i) => (
              <div key={i} className={`rounded-xl p-6 border ${plan.highlight ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-[#1a1a2e] border-white/5'}`}>
                {plan.highlight && <div className="text-emerald-400 text-sm font-bold mb-2">⭐ MOST POPULAR</div>}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-emerald-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition ${plan.highlight ? 'bg-emerald-500 text-black hover:bg-emerald-600' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-gray-400 text-lg mb-8">Join thousands of traders on 9mach Trade. Deposit in Naira, trade globally.</p>
          <Link href="/signup" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-lg px-10 py-4 rounded-xl transition">
            Create Free Account →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d0d15] border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center font-bold text-xs text-black">9M</div>
                <span className="font-bold">9mach Trade</span>
              </div>
              <p className="text-gray-500 text-sm">Trade Smart, Trade Global</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Markets</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition">Forex</a></li>
                <li><a href="#" className="hover:text-white transition">Stocks</a></li>
                <li><a href="#" className="hover:text-white transition">Crypto</a></li>
                <li><a href="#" className="hover:text-white transition">Commodities</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Risk Disclosure</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 text-center text-gray-600 text-sm">
            © 2026 9mach Trade. All rights reserved. Trading involves risk.
          </div>
        </div>
      </footer>
    </div>
  )
}
