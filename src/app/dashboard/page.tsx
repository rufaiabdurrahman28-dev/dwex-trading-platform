'use client'

import { useState } from 'react'
import Link from 'next/link'

const assets = {
  forex: [
    { symbol: 'EUR/USD', price: 1.0842, change: -0.12, vol: '2.3B' },
    { symbol: 'GBP/USD', price: 1.2634, change: 0.23, vol: '1.8B' },
    { symbol: 'USD/JPY', price: 155.42, change: 0.45, vol: '3.1B' },
    { symbol: 'USD/NGN', price: 1550.00, change: 0.78, vol: '890M' },
    { symbol: 'AUD/USD', price: 0.6523, change: -0.34, vol: '1.2B' },
    { symbol: 'USD/CAD', price: 1.3645, change: 0.11, vol: '950M' },
    { symbol: 'EUR/GBP', price: 0.8585, change: -0.08, vol: '780M' },
    { symbol: 'NZD/USD', price: 0.5987, change: -0.22, vol: '540M' },
  ],
  stocks: [
    { symbol: 'AAPL', price: 189.72, change: 0.95, vol: '52M' },
    { symbol: 'TSLA', price: 248.50, change: 2.34, vol: '98M' },
    { symbol: 'GOOGL', price: 174.30, change: -0.67, vol: '28M' },
    { symbol: 'MSFT', price: 425.80, change: 1.12, vol: '22M' },
    { symbol: 'AMZN', price: 185.60, change: 0.89, vol: '45M' },
    { symbol: 'NVDA', price: 875.40, change: 3.45, vol: '120M' },
    { symbol: 'META', price: 495.20, change: 1.23, vol: '18M' },
    { symbol: 'DANGCEM', price: 42.50, change: -1.56, vol: '12M' },
  ],
  crypto: [
    { symbol: 'BTC/USD', price: 67542.30, change: 2.34, vol: '28B' },
    { symbol: 'ETH/USD', price: 3891.15, change: 1.87, vol: '14B' },
    { symbol: 'SOL/USD', price: 178.34, change: 5.21, vol: '3.2B' },
    { symbol: 'BNB/USD', price: 598.70, change: 0.95, vol: '1.8B' },
    { symbol: 'XRP/USD', price: 0.5234, change: -1.23, vol: '2.1B' },
    { symbol: 'ADA/USD', price: 0.4567, change: -0.89, vol: '890M' },
    { symbol: 'DOGE/USD', price: 0.1234, change: 4.56, vol: '1.5B' },
    { symbol: 'AVAX/USD', price: 35.67, change: 2.89, vol: '670M' },
  ],
  commodities: [
    { symbol: 'GOLD', price: 2345.60, change: 0.34, vol: '180B' },
    { symbol: 'SILVER', price: 28.45, change: -0.56, vol: '32B' },
    { symbol: 'OIL (WTI)', price: 78.34, change: 1.23, vol: '45B' },
    { symbol: 'NAT GAS', price: 2.156, change: -2.34, vol: '12B' },
  ],
  indices: [
    { symbol: 'S&P 500', price: 5234.18, change: 0.67, vol: '4.2B' },
    { symbol: 'NASDAQ', price: 16345.72, change: 1.12, vol: '3.8B' },
    { symbol: 'DOW JONES', price: 39142.50, change: 0.34, vol: '2.1B' },
    { symbol: 'FTSE 100', price: 8234.56, change: -0.23, vol: '1.5B' },
  ],
}

type Category = keyof typeof assets

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState<Category>('crypto')
  const [searchQuery, setSearchQuery] = useState('')

  const portfolioValue = 1250000.00
  const dailyPnL = 34500.00
  const dailyPnLPercent = 2.84

  const filteredAssets = assets[activeCategory].filter(a =>
    a.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Top Nav */}
      <nav className="bg-[#0d0d15] border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-bold text-sm text-black">9M</div>
            <span className="text-lg font-bold">9mach <span className="text-emerald-400">Trade</span></span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition">Home</Link>
            <Link href="/wallet" className="text-sm text-gray-400 hover:text-white transition">Wallet</Link>
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">U</div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/5">
            <p className="text-gray-500 text-sm mb-1">Portfolio Value</p>
            <p className="text-2xl font-bold">₦{portfolioValue.toLocaleString()}</p>
            <p className="text-sm text-gray-500">$806.45 USD</p>
          </div>
          <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/5">
            <p className="text-gray-500 text-sm mb-1">Today&apos;s P&L</p>
            <p className="text-2xl font-bold text-emerald-400">+₦{dailyPnL.toLocaleString()}</p>
            <p className="text-sm text-emerald-400">+{dailyPnLPercent}%</p>
          </div>
          <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/5">
            <p className="text-gray-500 text-sm mb-1">Wallet Balance</p>
            <p className="text-2xl font-bold">₦250,000</p>
            <Link href="/wallet" className="text-sm text-emerald-400 hover:text-emerald-300 transition">Deposit →</Link>
          </div>
        </div>

        {/* Mini Chart Placeholder */}
        <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Portfolio Performance</h3>
            <div className="flex gap-2">
              {['1D', '1W', '1M', '3M', '1Y'].map(period => (
                <button key={period} className="text-xs px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition">{period}</button>
              ))}
            </div>
          </div>
          <div className="h-48 flex items-end gap-1">
            {Array.from({ length: 48 }, (_, i) => {
              const height = 30 + Math.sin(i * 0.3) * 20 + Math.random() * 30
              return (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-emerald-500/40 to-emerald-500/10 rounded-t"
                  style={{ height: `${height}%` }}
                />
              )
            })}
          </div>
        </div>

        {/* Market Categories */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {(Object.keys(assets) as Category[]).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-black'
                  : 'bg-[#1a1a2e] text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
              <span className="ml-1 text-xs opacity-60">({assets[cat].length})</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a2e] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 transition"
          />
        </div>

        {/* Asset List */}
        <div className="space-y-2">
          {filteredAssets.map((asset, i) => (
            <Link
              key={i}
              href={`/trade/${asset.symbol.replace('/', '-').replace(' ', '-')}`}
              className="flex items-center justify-between bg-[#1a1a2e] rounded-xl p-4 border border-white/5 hover:border-emerald-500/30 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold">
                  {asset.symbol.substring(0, 2)}
                </div>
                <div>
                  <p className="font-semibold">{asset.symbol}</p>
                  <p className="text-xs text-gray-500">Vol: {asset.vol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${asset.price.toLocaleString()}</p>
                <p className={`text-sm ${asset.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {asset.change >= 0 ? '+' : ''}{asset.change}%
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
