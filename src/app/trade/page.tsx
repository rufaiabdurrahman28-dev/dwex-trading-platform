'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import {
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  X,
  Settings2,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { allAssets, phases, searchAssets, type Asset } from '@/lib/assets'
import { ErrorBoundary } from '@/components/shared/ErrorBoundary'

const popularAssets = allAssets.slice(0, 20)

const openPositions = [
  { id: 1, symbol: 'BTC/USD', type: 'Buy' as const, size: 0.05, entry: 66800.00, current: 67245.30, pnl: 22.27, pnlPct: 0.67, phase: 'Deriv Phase' },
  { id: 2, symbol: 'EUR/USD', type: 'Sell' as const, size: 10000, entry: 1.0865, current: 1.0842, pnl: 23.00, pnlPct: 0.21, phase: 'Deriv Phase' },
  { id: 3, symbol: 'XAU/USD', type: 'Buy' as const, size: 1, entry: 2325.00, current: 2341.50, pnl: 16.50, pnlPct: 0.71, phase: 'Deriv Phase' },
  { id: 4, symbol: 'AAPL', type: 'Buy' as const, size: 5, entry: 187.50, current: 189.72, pnl: 11.10, pnlPct: 1.18, phase: 'Wise Phase' },
]

const pendingOrders = [
  { id: 5, symbol: 'ETH/USD', type: 'Buy Limit', price: 3400.00, size: 0.5, phase: 'Deriv Phase' },
  { id: 6, symbol: 'TSLA', type: 'Sell Stop', price: 240.00, size: 10, phase: 'Wise Phase' },
]

const closedTrades = [
  { id: 7, symbol: 'SOL/USD', type: 'Buy', size: 2, entry: 168.50, exit: 172.30, pnl: 7.60, pnlPct: 2.26, date: '2024-01-15' },
  { id: 8, symbol: 'GBP/USD', type: 'Sell', size: 5000, entry: 1.2680, exit: 1.2654, pnl: 13.00, pnlPct: 0.21, date: '2024-01-15' },
  { id: 9, symbol: 'NVDA', type: 'Buy', size: 2, entry: 870.00, exit: 875.28, pnl: 10.56, pnlPct: 0.61, date: '2024-01-14' },
]

const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D', '1W']
const leverageOptions = [1, 5, 10, 25, 50, 100]

function TradePageContent() {
  const [mounted, setMounted] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState(popularAssets[0])
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy')
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop'>('market')
  const [amount, setAmount] = useState('')
  const [leverage, setLeverage] = useState([2])
  const [stopLoss, setStopLoss] = useState('')
  const [takeProfit, setTakeProfit] = useState('')
  const [phase, setPhase] = useState('Deriv Phase')
  const [activeTab, setActiveTab] = useState('positions')
  const [assetSearch, setAssetSearch] = useState('')
  const [showAssetList, setShowAssetList] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only render after client hydration to avoid mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen pt-16 bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#00A88A]" />
          <p className="text-gray-400 text-sm">Loading trading terminal...</p>
        </div>
      </div>
    )
  }

  const filteredAssets = assetSearch ? searchAssets(assetSearch).slice(0, 20) : popularAssets

  const leveragVal = leverageOptions[leverage[0]] ?? 1
  const estMargin = amount ? (parseFloat(amount) / leveragVal).toFixed(2) : '0.00'

  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    if (price < 1) return price.toFixed(4)
    return price.toFixed(2)
  }

  const activePhases = phases.filter(p => p.status === 'active')

  return (
    <div className="min-h-screen pt-16 bg-white">
      <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
        {/* Left Panel: Asset Info */}
        <div className="lg:w-64 xl:w-72 border-r border-gray-200 bg-gray-50 flex-shrink-0 overflow-hidden">
          <div className="p-4">
            {/* Asset selector */}
            <div className="relative mb-4">
              <button
                onClick={() => setShowAssetList(!showAssetList)}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-white border border-gray-200 hover:border-[#00A88A]/30 transition"
              >
                <div className="text-left">
                  <span className="font-bold text-sm text-gray-900">{selectedAsset.symbol}</span>
                  <span className="text-xs text-gray-400 ml-2 capitalize">{selectedAsset.category}</span>
                </div>
                <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', showAssetList && 'rotate-180')} />
              </button>
              {showAssetList && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <Input
                        placeholder="Search..."
                        value={assetSearch}
                        onChange={(e) => setAssetSearch(e.target.value)}
                        className="pl-8 h-8 text-xs bg-white border-gray-200 text-gray-900"
                      />
                    </div>
                  </div>
                  {filteredAssets.map((asset) => (
                    <button
                      key={asset.symbol}
                      onClick={() => { setSelectedAsset(asset); setShowAssetList(false); setAssetSearch('') }}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 transition',
                        selectedAsset.symbol === asset.symbol && 'bg-[#00A88A]/10'
                      )}
                    >
                      <span className="font-medium text-gray-900">{asset.symbol}</span>
                      <span className={cn('font-mono text-xs', asset.change >= 0 ? 'text-[#00A88A]' : 'text-[#E63950]')}>
                        {asset.change >= 0 ? '+' : ''}{asset.change}%
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Current Price */}
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-1">Current Price</p>
              <p className={cn(
                'text-2xl font-bold font-mono',
                selectedAsset.change >= 0 ? 'text-[#00A88A]' : 'text-[#E63950]'
              )}>
                {formatPrice(selectedAsset.price)}
              </p>
              <div className="flex items-center gap-2 mt-1">
                {selectedAsset.change >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-[#00A88A]" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-[#E63950]" />
                )}
                <span className={cn('text-sm font-mono font-medium', selectedAsset.change >= 0 ? 'text-[#00A88A]' : 'text-[#E63950]')}>
                  {selectedAsset.change >= 0 ? '+' : ''}{selectedAsset.change}%
                </span>
              </div>
            </div>

            {/* Bid/Ask */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-2 rounded-lg bg-[#00A88A]/5 border border-[#00A88A]/10">
                <p className="text-[10px] text-gray-400">BID</p>
                <p className="font-mono font-semibold text-sm text-[#00A88A]">
                  {formatPrice(selectedAsset.price * 0.9998)}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-[#E63950]/5 border border-[#E63950]/10">
                <p className="text-[10px] text-gray-400">ASK</p>
                <p className="font-mono font-semibold text-sm text-[#E63950]">
                  {formatPrice(selectedAsset.price * 1.0002)}
                </p>
              </div>
            </div>

            {/* Spread */}
            <div className="text-center p-2 rounded-lg bg-gray-100 mb-4">
              <p className="text-[10px] text-gray-400">SPREAD</p>
              <p className="font-mono text-sm font-medium text-gray-900">0.4 pips</p>
            </div>

            {/* Quick assets */}
            <div className="space-y-1">
              <p className="text-xs text-gray-400 mb-2">Popular</p>
              {popularAssets.slice(0, 5).map((asset) => (
                <button
                  key={asset.symbol}
                  onClick={() => setSelectedAsset(asset)}
                  className={cn(
                    'w-full flex items-center justify-between px-2 py-1.5 rounded text-xs hover:bg-gray-100 transition',
                    selectedAsset.symbol === asset.symbol && 'bg-[#00A88A]/10'
                  )}
                >
                  <span className="font-medium text-gray-900">{asset.symbol}</span>
                  <span className={cn('font-mono', asset.change >= 0 ? 'text-[#00A88A]' : 'text-[#E63950]')}>
                    {asset.change >= 0 ? '+' : ''}{asset.change}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Chart Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chart header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-gray-900">{selectedAsset.symbol}</span>
              <Badge variant="outline" className={cn(
                'text-[10px] px-1.5 border-0',
                selectedAsset.change >= 0 ? 'bg-[#00A88A]/10 text-[#00A88A]' : 'bg-[#E63950]/10 text-[#E63950]'
              )}>
                {selectedAsset.change >= 0 ? '+' : ''}{selectedAsset.change}%
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  className="px-2 py-1 rounded text-xs font-medium text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition"
                >
                  {tf}
                </button>
              ))}
              <button className="p-1.5 rounded hover:bg-gray-100 transition ml-1">
                <Settings2 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Chart placeholder */}
          <div className="flex-1 relative bg-gray-50 flex items-center justify-center min-h-[300px]">
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`h-${i}`} className="absolute w-full border-t border-gray-300" style={{ top: `${(i + 1) * 12.5}%` }} />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={`v-${i}`} className="absolute h-full border-l border-gray-300" style={{ left: `${(i + 1) * 10}%` }} />
              ))}
            </div>
            <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 1000 400">
              <defs>
                <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00A88A" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00A88A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,300 L50,280 L100,290 L150,250 L200,260 L250,220 L300,230 L350,200 L400,210 L450,180 L500,190 L550,160 L600,170 L650,140 L700,150 L750,120 L800,130 L850,100 L900,110 L950,80 L1000,90" stroke="#00A88A" strokeWidth="2" fill="none" />
              <path d="M0,300 L50,280 L100,290 L150,250 L200,260 L250,220 L300,230 L350,200 L400,210 L450,180 L500,190 L550,160 L600,170 L650,140 L700,150 L750,120 L800,130 L850,100 L900,110 L950,80 L1000,90 L1000,400 L0,400 Z" fill="url(#chartGrad)" />
            </svg>
            <div className="relative z-10 text-center">
              <p className="text-gray-400 text-sm">TradingView Chart</p>
              <p className="text-gray-300 text-xs mt-1">Chart will load here with real-time data</p>
            </div>
          </div>

          {/* Bottom Panel: Positions */}
          <div className="border-t border-gray-200 bg-white max-h-[280px] overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center border-b border-gray-200 px-4">
                <TabsList className="bg-transparent h-9 p-0">
                  <TabsTrigger value="positions" className="text-xs h-9 px-3 data-[state=active]:bg-transparent data-[state=active]:text-[#00A88A] data-[state=active]:border-b-2 data-[state=active]:border-[#00A88A] rounded-none text-gray-500">
                    Open Positions ({openPositions.length})
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="text-xs h-9 px-3 data-[state=active]:bg-transparent data-[state=active]:text-[#00A88A] data-[state=active]:border-b-2 data-[state=active]:border-[#00A88A] rounded-none text-gray-500">
                    Pending ({pendingOrders.length})
                  </TabsTrigger>
                  <TabsTrigger value="closed" className="text-xs h-9 px-3 data-[state=active]:bg-transparent data-[state=active]:text-[#00A88A] data-[state=active]:border-b-2 data-[state=active]:border-[#00A88A] rounded-none text-gray-500">
                    Closed ({closedTrades.length})
                  </TabsTrigger>
                  <TabsTrigger value="history" className="text-xs h-9 px-3 data-[state=active]:bg-transparent data-[state=active]:text-[#00A88A] data-[state=active]:border-b-2 data-[state=active]:border-[#00A88A] rounded-none text-gray-500">
                    History
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="positions" className="mt-0 overflow-y-auto max-h-[220px]">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-100">
                      <th className="text-left py-2 px-4 font-medium">Symbol</th>
                      <th className="text-left py-2 px-2 font-medium">Type</th>
                      <th className="text-right py-2 px-2 font-medium">Size</th>
                      <th className="text-right py-2 px-2 font-medium">Entry</th>
                      <th className="text-right py-2 px-2 font-medium">Current</th>
                      <th className="text-right py-2 px-2 font-medium">P&L</th>
                      <th className="text-right py-2 px-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {openPositions.map((pos) => (
                      <tr key={pos.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-2 px-4 font-medium text-gray-900">{pos.symbol}</td>
                        <td className="py-2 px-2">
                          <Badge variant="outline" className={cn('text-[10px] px-1.5 border-0', pos.type === 'Buy' ? 'bg-[#00A88A]/10 text-[#00A88A]' : 'bg-[#E63950]/10 text-[#E63950]')}>
                            {pos.type}
                          </Badge>
                        </td>
                        <td className="py-2 px-2 text-right font-mono text-gray-700">{pos.size}</td>
                        <td className="py-2 px-2 text-right font-mono text-gray-700">{pos.entry.toFixed(pos.entry < 1 ? 4 : 2)}</td>
                        <td className="py-2 px-2 text-right font-mono text-gray-700">{pos.current.toFixed(pos.current < 1 ? 4 : 2)}</td>
                        <td className={cn('py-2 px-2 text-right font-mono font-medium', pos.pnl >= 0 ? 'text-[#00A88A]' : 'text-[#E63950]')}>
                          {pos.pnl >= 0 ? '+' : ''}{pos.pnl.toFixed(2)} ({pos.pnlPct >= 0 ? '+' : ''}{pos.pnlPct.toFixed(2)}%)
                        </td>
                        <td className="py-2 px-4 text-right">
                          <button className="p-1 rounded hover:bg-[#E63950]/10 transition">
                            <X className="w-3.5 h-3.5 text-[#E63950]" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabsContent>

              <TabsContent value="pending" className="mt-0 overflow-y-auto max-h-[220px]">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-100">
                      <th className="text-left py-2 px-4 font-medium">Symbol</th>
                      <th className="text-left py-2 px-2 font-medium">Type</th>
                      <th className="text-right py-2 px-2 font-medium">Price</th>
                      <th className="text-right py-2 px-2 font-medium">Size</th>
                      <th className="text-right py-2 px-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-2 px-4 font-medium text-gray-900">{order.symbol}</td>
                        <td className="py-2 px-2">
                          <Badge variant="outline" className="text-[10px] px-1.5 border-0 bg-[#E5940A]/10 text-[#E5940A]">
                            {order.type}
                          </Badge>
                        </td>
                        <td className="py-2 px-2 text-right font-mono text-gray-700">{order.price.toFixed(2)}</td>
                        <td className="py-2 px-2 text-right font-mono text-gray-700">{order.size}</td>
                        <td className="py-2 px-4 text-right">
                          <button className="p-1 rounded hover:bg-[#E63950]/10 transition">
                            <X className="w-3.5 h-3.5 text-[#E63950]" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabsContent>

              <TabsContent value="closed" className="mt-0 overflow-y-auto max-h-[220px]">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-400 border-b border-gray-100">
                      <th className="text-left py-2 px-4 font-medium">Symbol</th>
                      <th className="text-left py-2 px-2 font-medium">Type</th>
                      <th className="text-right py-2 px-2 font-medium">Size</th>
                      <th className="text-right py-2 px-2 font-medium">Entry</th>
                      <th className="text-right py-2 px-2 font-medium">Exit</th>
                      <th className="text-right py-2 px-2 font-medium">P&L</th>
                      <th className="text-right py-2 px-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {closedTrades.map((trade) => (
                      <tr key={trade.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="py-2 px-4 font-medium text-gray-900">{trade.symbol}</td>
                        <td className="py-2 px-2">
                          <Badge variant="outline" className={cn('text-[10px] px-1.5 border-0', trade.type === 'Buy' ? 'bg-[#00A88A]/10 text-[#00A88A]' : 'bg-[#E63950]/10 text-[#E63950]')}>
                            {trade.type}
                          </Badge>
                        </td>
                        <td className="py-2 px-2 text-right font-mono text-gray-700">{trade.size}</td>
                        <td className="py-2 px-2 text-right font-mono text-gray-700">{trade.entry.toFixed(trade.entry < 1 ? 4 : 2)}</td>
                        <td className="py-2 px-2 text-right font-mono text-gray-700">{trade.exit.toFixed(trade.exit < 1 ? 4 : 2)}</td>
                        <td className={cn('py-2 px-2 text-right font-mono font-medium', trade.pnl >= 0 ? 'text-[#00A88A]' : 'text-[#E63950]')}>
                          {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                        </td>
                        <td className="py-2 px-4 text-right text-gray-400">{trade.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabsContent>

              <TabsContent value="history" className="mt-0 p-4 text-center text-gray-400 text-xs">
                Full trade history will appear here
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Panel: Order Panel */}
        <div className="lg:w-80 xl:w-96 border-l border-gray-200 bg-gray-50 flex-shrink-0 overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Phase selector */}
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Trading Phase</label>
              <Select value={phase} onValueChange={setPhase}>
                <SelectTrigger className="bg-white border-gray-200 text-gray-900 text-sm w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {activePhases.map((p) => (
                    <SelectItem key={p.id} value={p.name} className="text-gray-900 focus:bg-gray-50">{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Buy/Sell Toggle */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setOrderSide('buy')}
                className={cn(
                  'py-3 rounded-lg font-bold text-sm transition-all',
                  orderSide === 'buy'
                    ? 'bg-[#00A88A] text-white'
                    : 'bg-[#00A88A]/10 text-[#00A88A] hover:bg-[#00A88A]/20'
                )}
              >
                Buy
              </button>
              <button
                onClick={() => setOrderSide('sell')}
                className={cn(
                  'py-3 rounded-lg font-bold text-sm transition-all',
                  orderSide === 'sell'
                    ? 'bg-[#E63950] text-white'
                    : 'bg-[#E63950]/10 text-[#E63950] hover:bg-[#E63950]/20'
                )}
              >
                Sell
              </button>
            </div>

            {/* Order Type */}
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Order Type</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['market', 'limit', 'stop'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={cn(
                      'py-2 rounded-lg text-xs font-medium transition capitalize',
                      orderType === type
                        ? 'bg-gray-200 text-gray-900'
                        : 'bg-gray-100 text-gray-400 hover:text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Amount (USD)</label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white border-gray-200 text-gray-900 font-mono pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">USD</span>
              </div>
            </div>

            {/* Leverage */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-gray-400">Leverage</label>
                <span className="text-xs font-mono font-bold text-[#00A88A]">{leveragVal}x</span>
              </div>
              <Slider
                value={leverage}
                onValueChange={setLeverage}
                max={5}
                step={1}
                className="py-2"
              />
              <div className="flex justify-between mt-1">
                {leverageOptions.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLeverage([leverageOptions.indexOf(l)])}
                    className={cn(
                      'text-[10px] font-mono px-1.5 py-0.5 rounded',
                      leveragVal === l ? 'text-[#00A88A] bg-[#00A88A]/10' : 'text-gray-400'
                    )}
                  >
                    {l}x
                  </button>
                ))}
              </div>
            </div>

            {/* Stop Loss / Take Profit */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Stop Loss</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  className="bg-white border-gray-200 text-gray-900 font-mono text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Take Profit</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  className="bg-white border-gray-200 text-gray-900 font-mono text-sm"
                />
              </div>
            </div>

            {/* Estimated Margin */}
            <Card className="bg-gray-100 border-gray-200">
              <CardContent className="p-3 flex items-center justify-between">
                <span className="text-xs text-gray-400">Est. Margin</span>
                <span className="font-mono text-sm font-semibold text-gray-900">${estMargin}</span>
              </CardContent>
            </Card>

            {/* Open Position Button */}
            <Button
              className={cn(
                'w-full py-6 text-base font-bold rounded-xl transition-all',
                orderSide === 'buy'
                  ? 'bg-[#00A88A] hover:bg-[#008F74] text-white'
                  : 'bg-[#E63950] hover:bg-[#c5303f] text-white'
              )}
            >
              {orderSide === 'buy' ? 'Open Buy Position' : 'Open Sell Position'}
            </Button>

            {/* Order summary */}
            <div className="space-y-1.5 pt-2 border-t border-gray-200">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Symbol</span>
                <span className="font-medium text-gray-900">{selectedAsset.symbol}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Phase</span>
                <span className="font-medium text-gray-900">{phase}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Type</span>
                <span className="font-medium text-gray-900 capitalize">{orderType}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TradePage() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="min-h-screen pt-16 bg-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#00A88A]" />
              <p className="text-gray-400 text-sm">Loading...</p>
            </div>
          </div>
        }
      >
        <TradePageContent />
      </Suspense>
    </ErrorBoundary>
  )
}
