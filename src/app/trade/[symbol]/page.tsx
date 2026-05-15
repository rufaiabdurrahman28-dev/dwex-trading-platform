'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function TradePage() {
  const params = useParams()
  const symbol = (params.symbol as string || 'BTC-USD').replace(/-/g, '/')
  
  const [price, setPrice] = useState(67542.30)
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market')
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')
  const [limitPrice, setLimitPrice] = useState('')
  const [timeframe, setTimeframe] = useState('1H')

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => prev + (Math.random() - 0.48) * 50)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const change = ((price - 67000) / 67000 * 100).toFixed(2)
  const isUp = price >= 67000

  const candleData = Array.from({ length: 30 }, (_, i) => {
    const open = 66000 + Math.random() * 2000
    const close = open + (Math.random() - 0.45) * 800
    const high = Math.max(open, close) + Math.random() * 300
    const low = Math.min(open, close) - Math.random() * 300
    return { open, close, high, low, up: close >= open }
  })

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Top Nav */}
      <nav className="bg-[#0d0d15] border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition">← Back</Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold">
                {symbol.substring(0, 2)}
              </div>
              <div>
                <span className="font-bold">{symbol}</span>
                <span className={`ml-2 text-sm ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isUp ? '+' : ''}{change}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-gray-400">Live</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Chart Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Price Header */}
            <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-3xl font-bold">${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  <span className={`ml-3 text-lg ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isUp ? '▲' : '▼'} {isUp ? '+' : ''}{change}%
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  24h Vol: $28.3B
                </div>
              </div>
              <div className="text-sm text-gray-500">
                ₦{(price * 1550).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (NGN)
              </div>
            </div>

            {/* Timeframes */}
            <div className="flex gap-2">
              {['1m', '5m', '15m', '1H', '4H', '1D', '1W'].map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                    timeframe === tf ? 'bg-emerald-500 text-black' : 'bg-[#1a1a2e] text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Candlestick Chart */}
            <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/5">
              <div className="flex items-end gap-1.5 h-64">
                {candleData.map((candle, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative">
                    {/* Wick */}
                    <div
                      className={`w-px ${candle.up ? 'bg-emerald-500/60' : 'bg-red-500/60'}`}
                      style={{
                        height: `${((candle.high - candle.low) / 3000) * 100}%`,
                        position: 'absolute',
                        bottom: `${((candle.low - 65000) / 3000) * 100}%`,
                      }}
                    />
                    {/* Body */}
                    <div
                      className={`w-full rounded-sm ${candle.up ? 'bg-emerald-500' : 'bg-red-500'}`}
                      style={{
                        height: `${Math.max(Math.abs(candle.close - candle.open) / 20, 2)}px`,
                        position: 'absolute',
                        bottom: `${((Math.min(candle.open, candle.close) - 65000) / 3000) * 100}%`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Order Book */}
            <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/5">
              <h3 className="font-semibold mb-3">Order Book</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Bids (Buy)</p>
                  {Array.from({ length: 8 }, (_, i) => {
                    const bidPrice = price - (i + 1) * 25
                    const size = (Math.random() * 5).toFixed(4)
                    return (
                      <div key={i} className="flex justify-between text-xs py-1 relative">
                        <div className="absolute right-0 top-0 bottom-0 bg-emerald-500/10" style={{ width: `${Math.random() * 80}%` }} />
                        <span className="text-emerald-400 relative z-10">${bidPrice.toFixed(2)}</span>
                        <span className="text-gray-400 relative z-10">{size}</span>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Asks (Sell)</p>
                  {Array.from({ length: 8 }, (_, i) => {
                    const askPrice = price + (i + 1) * 25
                    const size = (Math.random() * 5).toFixed(4)
                    return (
                      <div key={i} className="flex justify-between text-xs py-1 relative">
                        <div className="absolute left-0 top-0 bottom-0 bg-red-500/10" style={{ width: `${Math.random() * 80}%` }} />
                        <span className="text-red-400 relative z-10">${askPrice.toFixed(2)}</span>
                        <span className="text-gray-400 relative z-10">{size}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Order Panel */}
          <div className="space-y-4">
            <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/5">
              {/* Buy/Sell Toggle */}
              <div className="flex mb-4 rounded-lg overflow-hidden">
                <button
                  onClick={() => setSide('buy')}
                  className={`flex-1 py-3 font-semibold text-sm transition ${
                    side === 'buy' ? 'bg-emerald-500 text-black' : 'bg-white/5 text-gray-400'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setSide('sell')}
                  className={`flex-1 py-3 font-semibold text-sm transition ${
                    side === 'sell' ? 'bg-red-500 text-white' : 'bg-white/5 text-gray-400'
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Order Type */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setOrderType('market')}
                  className={`flex-1 py-2 text-xs font-medium rounded transition ${
                    orderType === 'market' ? 'bg-white/10 text-white' : 'text-gray-500'
                  }`}
                >
                  Market
                </button>
                <button
                  onClick={() => setOrderType('limit')}
                  className={`flex-1 py-2 text-xs font-medium rounded transition ${
                    orderType === 'limit' ? 'bg-white/10 text-white' : 'text-gray-500'
                  }`}
                >
                  Limit
                </button>
              </div>

              {/* Amount */}
              <div className="mb-4">
                <label className="text-xs text-gray-500 mb-1 block">Amount (USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              {/* Limit Price */}
              {orderType === 'limit' && (
                <div className="mb-4">
                  <label className="text-xs text-gray-500 mb-1 block">Limit Price (USD)</label>
                  <input
                    type="number"
                    value={limitPrice}
                    onChange={e => setLimitPrice(e.target.value)}
                    placeholder={price.toFixed(2)}
                    className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              )}

              {/* Naira Equivalent */}
              {amount && (
                <div className="bg-[#0d0d15] rounded-lg p-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Naira equivalent</span>
                    <span>₦{(parseFloat(amount) * 1550).toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Quick Amounts */}
              <div className="flex gap-2 mb-4">
                {['10', '50', '100', '500'].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className="flex-1 py-2 text-xs bg-white/5 rounded hover:bg-white/10 transition"
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Submit */}
              <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition ${
                  side === 'buy'
                    ? 'bg-emerald-500 text-black hover:bg-emerald-600'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {side === 'buy' ? 'Buy' : 'Sell'} {symbol.split('/')[0]}
              </button>
            </div>

            {/* Recent Trades */}
            <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/5">
              <h3 className="font-semibold mb-3">Recent Trades</h3>
              <div className="space-y-1">
                {Array.from({ length: 10 }, (_, i) => {
                  const tradePrice = price + (Math.random() - 0.5) * 50
                  const isBuy = Math.random() > 0.45
                  const size = (Math.random() * 2).toFixed(4)
                  const time = `${new Date().getHours()}:${String(new Date().getMinutes() + i).padStart(2, '0')}`
                  return (
                    <div key={i} className="flex justify-between text-xs py-1">
                      <span className={isBuy ? 'text-emerald-400' : 'text-red-400'}>
                        ${tradePrice.toFixed(2)}
                      </span>
                      <span className="text-gray-400">{size}</span>
                      <span className="text-gray-500">{time}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
