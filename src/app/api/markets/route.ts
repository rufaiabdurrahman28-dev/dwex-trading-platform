import { NextResponse } from 'next/server'

// Mock market data for API
const marketAssets = [
  { symbol: 'EUR/USD', price: 1.0842, change: -0.12, category: 'Forex' },
  { symbol: 'GBP/USD', price: 1.2654, change: 0.23, category: 'Forex' },
  { symbol: 'USD/JPY', price: 154.32, change: 0.45, category: 'Forex' },
  { symbol: 'USD/NGN', price: 1550.00, change: 0.65, category: 'Forex' },
  { symbol: 'BTC/USD', price: 67542.30, change: 2.34, category: 'Crypto' },
  { symbol: 'ETH/USD', price: 3891.15, change: 1.87, category: 'Crypto' },
  { symbol: 'SOL/USD', price: 178.34, change: 5.21, category: 'Crypto' },
  { symbol: 'AAPL', price: 189.72, change: 0.95, category: 'Stocks' },
  { symbol: 'MSFT', price: 415.56, change: 1.23, category: 'Stocks' },
  { symbol: 'NVDA', price: 875.28, change: 3.21, category: 'Stocks' },
  { symbol: 'XAU/USD', price: 2345.67, change: 0.34, category: 'Commodities' },
  { symbol: 'SPX500', price: 5234.56, change: 0.67, category: 'Indices' },
]

export async function GET() {
  return NextResponse.json({
    assets: marketAssets,
    timestamp: new Date().toISOString(),
  })
}
