'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import TradingNav from '@/components/trading/TradingNav'
import TradingFooter from '@/components/trading/TradingFooter'
import PhaseSelector from '@/components/trading/PhaseSelector'
import { allAssets, categoryLabels, categoryIcons, getCategoryCounts, type Asset } from '@/lib/assets'

type Category = Asset['category']
const categories: Category[] = ['forex', 'stocks', 'crypto', 'commodities', 'indices', 'etfs', 'synthetics']

export default function Dashboard() {
  const searchParams = useSearchParams()
  const catParam = searchParams.get('cat') as Category | null
  const [activeCategory, setActiveCategory] = useState<Category>(catParam && categories.includes(catParam) ? catParam : 'crypto')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50

  const counts = useMemo(() => getCategoryCounts(), [])

  const filteredAssets = useMemo(() => {
    return allAssets
      .filter(a => a.category === activeCategory)
      .filter(a =>
        a.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  }, [activeCategory, searchQuery])

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage)
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-[#0A1628] flex flex-col">
      <TradingNav />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full mt-16">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#0D1B2E] rounded-xl p-5 border border-[#1E2D4A]">
            <p className="text-gray-500 text-sm mb-1">Portfolio Value</p>
            <p className="text-2xl font-bold text-white">₦1,250,000</p>
            <p className="text-sm text-gray-500">$806.45 USD</p>
          </div>
          <div className="bg-[#0D1B2E] rounded-xl p-5 border border-[#1E2D4A]">
            <p className="text-gray-500 text-sm mb-1">Today&apos;s P&L</p>
            <p className="text-2xl font-bold text-[#00D4AA]">+₦34,500</p>
            <p className="text-sm text-[#00D4AA]">+2.84%</p>
          </div>
          <div className="bg-[#0D1B2E] rounded-xl p-5 border border-[#1E2D4A]">
            <p className="text-gray-500 text-sm mb-1">Wallet Balance</p>
            <p className="text-2xl font-bold text-white">₦250,000</p>
            <Link href="/wallet" className="text-sm text-[#00D4AA] hover:text-[#00B894] transition">Deposit →</Link>
          </div>
        </div>

        {/* Phase Selector + Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <PhaseSelector />
          <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md">
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }}
              className="w-full bg-[#0A1628] border border-[#1E2D4A] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#00D4AA] focus:ring-2 focus:ring-[#00D4AA]/20 transition"
            />
          </div>
        </div>

        {/* Market Categories */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setCurrentPage(1) }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                activeCategory === cat
                  ? 'bg-[#00D4AA] text-[#0A1628]'
                  : 'bg-[#0D1B2E] text-gray-400 border border-[#1E2D4A] hover:border-[#00D4AA]/30'
              }`}
            >
              {categoryIcons[cat]} {categoryLabels[cat]}
              <span className="ml-1 text-xs opacity-70">({counts[cat] || 0})</span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredAssets.length)} of {filteredAssets.length} {categoryLabels[activeCategory]} assets
          </p>
          <p className="text-sm text-gray-400">
            {allAssets.length} total assets across all categories
          </p>
        </div>

        {/* Asset List */}
        <div className="space-y-2">
          {paginatedAssets.map((asset, i) => (
            <Link
              key={`${asset.symbol}-${i}`}
              href={`/trade/${asset.slug}`}
              className="flex items-center justify-between bg-[#0D1B2E] rounded-xl p-4 border border-[#1E2D4A] hover:border-[#00D4AA]/30 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1E2D4A] flex items-center justify-center text-xs font-bold text-[#00D4AA]">
                  {asset.symbol.substring(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-white">{asset.symbol}</p>
                  <p className="text-xs text-gray-500">{asset.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">${asset.price.toLocaleString()}</p>
                <p className={`text-sm ${asset.change >= 0 ? 'text-[#00D4AA]' : 'text-[#FF4D6A]'}`}>
                  {asset.change >= 0 ? '+' : ''}{asset.change}%
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-[#0D1B2E] border border-[#1E2D4A] text-sm text-gray-400 hover:border-[#00D4AA]/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i
              if (page > totalPages || page < 1) return null
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                    currentPage === page
                      ? 'bg-[#00D4AA] text-[#0A1628]'
                      : 'bg-[#0D1B2E] border border-[#1E2D4A] text-gray-400 hover:border-[#00D4AA]/30'
                  }`}
                >
                  {page}
                </button>
              )
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="text-gray-400">...</span>
            )}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="w-10 h-10 rounded-lg text-sm font-medium bg-[#0D1B2E] border border-[#1E2D4A] text-gray-400 hover:border-[#00D4AA]/30 transition"
              >
                {totalPages}
              </button>
            )}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg bg-[#0D1B2E] border border-[#1E2D4A] text-sm text-gray-400 hover:border-[#00D4AA]/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        )}
      </main>

      <TradingFooter />
    </div>
  )
}
