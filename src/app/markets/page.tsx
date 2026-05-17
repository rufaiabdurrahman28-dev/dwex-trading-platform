'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

/* ── Types ── */
type Category = 'All' | 'Forex' | 'Stocks' | 'Crypto' | 'Commodities' | 'Indices' | 'ETFs' | 'Synthetics'
type Phase = 'All Phases' | 'Deriv Phase' | 'Wise Phase' | 'Eversend Phase'

/* ── Mock assets ── */
const assets = [
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0842, change: -0.12, category: 'Forex' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', price: 1.2654, change: 0.08, category: 'Forex' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: 154.32, change: -0.34, category: 'Forex' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', price: 0.8821, change: 0.15, category: 'Forex' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', price: 0.6532, change: 0.22, category: 'Forex' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', price: 1.3645, change: -0.08, category: 'Forex' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'NZD/USD', name: 'New Zealand Dollar / US Dollar', price: 0.6012, change: 0.31, category: 'Forex' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'EUR/GBP', name: 'Euro / British Pound', price: 0.8568, change: -0.05, category: 'Forex' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'USD/NGN', name: 'US Dollar / Nigerian Naira', price: 1620.50, change: 0.42, category: 'Forex' as Category, phase: 'Eversend Phase' as Phase },
  { symbol: 'GBP/NGN', name: 'British Pound / Nigerian Naira', price: 2052.30, change: 0.38, category: 'Forex' as Category, phase: 'Eversend Phase' as Phase },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.72, change: 1.23, category: 'Stocks' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -0.87, category: 'Stocks' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 176.42, change: 0.65, category: 'Stocks' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 425.30, change: 0.44, category: 'Stocks' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 186.54, change: 1.12, category: 'Stocks' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.28, change: 2.34, category: 'Stocks' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 502.30, change: -0.23, category: 'Stocks' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'BTC/USD', name: 'Bitcoin / US Dollar', price: 67245.30, change: 2.14, category: 'Crypto' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'ETH/USD', name: 'Ethereum / US Dollar', price: 3521.80, change: 1.87, category: 'Crypto' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'SOL/USD', name: 'Solana / US Dollar', price: 172.30, change: 3.42, category: 'Crypto' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'XRP/USD', name: 'Ripple / US Dollar', price: 0.5234, change: -1.23, category: 'Crypto' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'DOGE/USD', name: 'Dogecoin / US Dollar', price: 0.1642, change: 4.56, category: 'Crypto' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'ADA/USD', name: 'Cardano / US Dollar', price: 0.4521, change: -0.78, category: 'Crypto' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'XAU/USD', name: 'Gold / US Dollar', price: 2341.50, change: 0.45, category: 'Commodities' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'XAG/USD', name: 'Silver / US Dollar', price: 29.42, change: -0.32, category: 'Commodities' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'WTI/USD', name: 'Crude Oil WTI', price: 78.54, change: 1.23, category: 'Commodities' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'NATGAS', name: 'Natural Gas', price: 2.345, change: -2.14, category: 'Commodities' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'SPX500', name: 'S&P 500 Index', price: 5278.40, change: 0.56, category: 'Indices' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'NAS100', name: 'NASDAQ 100 Index', price: 18452.30, change: 0.78, category: 'Indices' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'DJI30', name: 'Dow Jones 30', price: 39142.50, change: 0.34, category: 'Indices' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'UK100', name: 'FTSE 100 Index', price: 8245.60, change: -0.12, category: 'Indices' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: 527.84, change: 0.56, category: 'ETFs' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust', price: 452.30, change: 0.78, category: 'ETFs' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'GLD', name: 'SPDR Gold Shares', price: 218.54, change: 0.45, category: 'ETFs' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'VTI', name: 'Vanguard Total Stock Market', price: 263.20, change: 0.32, category: 'ETFs' as Category, phase: 'Wise Phase' as Phase },
  { symbol: 'VOLX10', name: 'Volatility 10 Index', price: 3245.67, change: 0.12, category: 'Synthetics' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'VOLX25', name: 'Volatility 25 Index', price: 4521.34, change: -0.45, category: 'Synthetics' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'VOLX75', name: 'Volatility 75 Index', price: 8234.56, change: 1.23, category: 'Synthetics' as Category, phase: 'Deriv Phase' as Phase },
  { symbol: 'VOLX100', name: 'Volatility 100 Index', price: 12456.78, change: 0.89, category: 'Synthetics' as Category, phase: 'Deriv Phase' as Phase },
]

const categories: Category[] = ['All', 'Forex', 'Stocks', 'Crypto', 'Commodities', 'Indices', 'ETFs', 'Synthetics']
const phases: Phase[] = ['All Phases', 'Deriv Phase', 'Wise Phase', 'Eversend Phase']

function MiniSparkline({ up }: { up: boolean }) {
  const points = up
    ? 'M0,20 L5,18 L10,15 L15,16 L20,12 L25,10 L30,8 L35,6 L40,4'
    : 'M0,4 L5,6 L10,8 L15,7 L20,12 L25,14 L30,16 L35,18 L40,20'
  return (
    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="flex-shrink-0">
      <path d={points} stroke={up ? '#00D4AA' : '#FF4D6A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export default function MarketsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category>('All')
  const [phase, setPhase] = useState<Phase>('All Phases')
  const [page, setPage] = useState(1)
  const perPage = 12

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      const matchSearch = a.symbol.toLowerCase().includes(search.toLowerCase()) || a.name.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === 'All' || a.category === category
      const matchPhase = phase === 'All Phases' || a.phase === phase
      return matchSearch && matchCategory && matchPhase
    })
  }, [search, category, phase])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice(0, page * perPage)

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Markets</h1>
          <p className="text-slate-400">Explore 1,500+ assets across all trading phases</p>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search assets by name or symbol..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="pl-10 bg-white/[0.06] border-white/[0.08] text-white placeholder:text-slate-500"
            />
          </div>
          <Select value={phase} onValueChange={(v) => { setPhase(v as Phase); setPage(1) }}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white/[0.06] border-white/[0.08] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#162D50] border-white/[0.08]">
              {phases.map((p) => (
                <SelectItem key={p} value={p} className="text-white focus:bg-white/[0.08] focus:text-white">{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1) }}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                category === cat
                  ? 'bg-[#00D4AA] text-[#0A1628]'
                  : 'bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.1]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Asset Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {paged.map((asset, i) => (
            <motion.div
              key={asset.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
            >
              <Link href={`/trade/${encodeURIComponent(asset.symbol)}`}>
                <Card className="bg-[#162D50] border-white/[0.06] card-hover rounded-xl cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-sm group-hover:text-[#00D4AA] transition-colors">
                          {asset.symbol}
                        </h3>
                        <p className="text-xs text-slate-500 truncate max-w-[140px]">{asset.name}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-[10px] px-1.5 py-0 border-0',
                          asset.change >= 0 ? 'bg-[#00D4AA]/10 text-[#00D4AA]' : 'bg-[#FF4D6A]/10 text-[#FF4D6A]'
                        )}
                      >
                        {asset.change >= 0 ? (
                          <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                        ) : (
                          <TrendingDown className="w-2.5 h-2.5 mr-0.5" />
                        )}
                        {asset.change >= 0 ? '+' : ''}{asset.change}%
                      </Badge>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="font-mono font-semibold text-lg">
                        {asset.price >= 1000 ? asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : asset.price.toFixed(asset.price < 1 ? 4 : 2)}
                      </span>
                      <MiniSparkline up={asset.change >= 0} />
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.06]">
                      <span className="text-[10px] text-slate-500">{asset.category}</span>
                      <span className="text-[10px] text-slate-500">{asset.phase}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Load More / Empty */}
        {paged.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No assets found matching your criteria.</p>
          </div>
        )}
        {paged.length < filtered.length && (
          <div className="text-center">
            <Button
              onClick={() => setPage(page + 1)}
              variant="outline"
              className="border-white/[0.12] text-white hover:bg-white/[0.06]"
            >
              Load More ({filtered.length - paged.length} remaining)
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Results count */}
        <p className="text-center text-slate-500 text-sm mt-4">
          Showing {paged.length} of {filtered.length} assets
        </p>
      </div>
    </div>
  )
}
