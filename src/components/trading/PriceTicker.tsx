'use client'

import { useEffect, useState } from 'react'

const tickerData = [
  { symbol: 'BTC/USD', price: '67,542.30', change: '+2.34%', up: true },
  { symbol: 'ETH/USD', price: '3,891.15', change: '+1.87%', up: true },
  { symbol: 'EUR/USD', price: '1.0842', change: '-0.12%', up: false },
  { symbol: 'AAPL', price: '189.72', change: '+0.95%', up: true },
  { symbol: 'USD/NGN', price: '1,550.00', change: '+0.45%', up: true },
  { symbol: 'SOL/USD', price: '178.34', change: '+5.21%', up: true },
  { symbol: 'GOLD', price: '2,345.60', change: '+0.34%', up: true },
  { symbol: 'S&P 500', price: '5,234.18', change: '+0.67%', up: true },
  { symbol: 'GBP/USD', price: '1.2634', change: '+0.23%', up: true },
  { symbol: 'TSLA', price: '248.50', change: '+2.34%', up: true },
]

export default function PriceTicker() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prev => prev - 1)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#0D1B2E] border-b border-[#1E2D4A] overflow-hidden h-10 flex items-center">
      <div className="flex whitespace-nowrap" style={{ transform: `translateX(${offset}px)` }}>
        {[...tickerData, ...tickerData, ...tickerData].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-6 text-sm">
            <span className="text-gray-500 font-medium">{item.symbol}</span>
            <span className="text-white font-semibold font-mono">${item.price}</span>
            <span className={item.up ? 'text-[#00D4AA] font-mono font-medium' : 'text-[#FF4D6A] font-mono font-medium'}>{item.change}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
