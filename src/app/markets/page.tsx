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
import { allAssets, assetCategories, phases, searchAssets, getAssetsByCategory, getAssetsByPhase, type AssetCategory, type AssetPhase } from '@/lib/assets'

function MiniSparkline({ up }: { up: boolean }) {
  const points = up
    ? 'M0,20 L5,18 L10,15 L15,16 L20,12 L25,10 L30,8 L35,6 L40,4'
    : 'M0,4 L5,6 L10,8 L15,7 L20,12 L25,14 L30,16 L35,18 L40,20'
  return (
    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="flex-shrink-0">
      <path d={points} stroke={up ? '#00A88A' : '#E63950'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export default function MarketsPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<AssetCategory | 'all'>('all')
  const [phase, setPhase] = useState<AssetPhase | 'all'>('all')
  const [page, setPage] = useState(1)
  const perPage = 50

  const filtered = useMemo(() => {
    let result = allAssets
    if (search) {
      result = searchAssets(search)
    }
    if (category !== 'all') {
      result = result.filter(a => a.category === category)
    }
    if (phase !== 'all') {
      result = result.filter(a => a.phases.includes(phase))
    }
    return result
  }, [search, category, phase])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice(0, page * perPage)

  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    if (price < 0.001) return price.toFixed(8)
    if (price < 1) return price.toFixed(4)
    return price.toFixed(2)
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">Markets</h1>
          <p className="text-gray-500">Explore {allAssets.length.toLocaleString()}+ assets across all trading phases</p>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search assets by name or symbol..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
            />
          </div>
          <Select value={phase} onValueChange={(v) => { setPhase(v as AssetPhase | 'all'); setPage(1) }}>
            <SelectTrigger className="w-full sm:w-[200px] bg-white border-gray-200 text-gray-900">
              <SelectValue placeholder="All Phases" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="all" className="text-gray-900 focus:bg-gray-50">All Phases</SelectItem>
              {phases.map((p) => (
                <SelectItem key={p.id} value={p.name} className="text-gray-900 focus:bg-gray-50">{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => { setCategory('all'); setPage(1) }}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
              category === 'all'
                ? 'bg-[#00A88A] text-white'
                : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'
            )}
          >
            All ({allAssets.length.toLocaleString()})
          </button>
          {assetCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setCategory(cat.id as AssetCategory); setPage(1) }}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                category === cat.id
                  ? 'bg-[#00A88A] text-white'
                  : 'bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200'
              )}
            >
              {cat.icon} {cat.name} ({cat.count})
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
              transition={{ delay: Math.min(i * 0.02, 0.5), duration: 0.3 }}
            >
              <Link href={`/trade/${encodeURIComponent(asset.symbol)}`}>
                <Card className="bg-white border-gray-200 hover:border-[#00A88A]/30 card-hover rounded-xl cursor-pointer group shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-sm group-hover:text-[#00A88A] transition-colors text-gray-900">
                          {asset.symbol}
                        </h3>
                        <p className="text-xs text-gray-400 truncate max-w-[140px]">{asset.name}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-[10px] px-1.5 py-0 border-0',
                          asset.change >= 0 ? 'bg-[#00A88A]/10 text-[#00A88A]' : 'bg-[#E63950]/10 text-[#E63950]'
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
                      <span className="font-mono font-semibold text-lg text-gray-900">
                        {formatPrice(asset.price)}
                      </span>
                      <MiniSparkline up={asset.change >= 0} />
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <span className="text-[10px] text-gray-400 capitalize">{asset.category}</span>
                      <span className="text-[10px] text-gray-400">{asset.phases[0]}</span>
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
            <p className="text-gray-400 text-lg">No assets found matching your criteria.</p>
          </div>
        )}
        {paged.length < filtered.length && (
          <div className="text-center">
            <Button
              onClick={() => setPage(page + 1)}
              variant="outline"
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Load More ({(filtered.length - paged.length).toLocaleString()} remaining)
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Results count */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Showing {paged.length.toLocaleString()} of {filtered.length.toLocaleString()} assets
        </p>
      </div>
    </div>
  )
}
