'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

/* ── Mock Data ── */
const summary = {
  totalValue: 205000,
  todayPnl: 3200,
  totalPnl: 18400,
  winRate: 68.5,
}

const phaseBreakdown = [
  { name: 'Deriv Phase', balance: 125000, positions: 2, pnl: 12500, pnlPct: 11.1 },
  { name: 'Wise Phase', balance: 50000, positions: 1, pnl: 4200, pnlPct: 9.2 },
  { name: 'Eversend Phase', balance: 30000, positions: 1, pnl: 1700, pnlPct: 6.0 },
]

const holdings = [
  { symbol: 'BTC/USD', phase: 'Deriv Phase', type: 'Buy', size: 0.05, entry: 66800, current: 67245.30, pnl: 22.27, pnlPct: 0.67 },
  { symbol: 'EUR/USD', phase: 'Deriv Phase', type: 'Sell', size: 10000, entry: 1.0865, current: 1.0842, pnl: 23.00, pnlPct: 0.21 },
  { symbol: 'XAU/USD', phase: 'Wise Phase', type: 'Buy', size: 1, entry: 2325, current: 2341.50, pnl: 16.50, pnlPct: 0.71 },
  { symbol: 'AAPL', phase: 'Eversend Phase', type: 'Buy', size: 5, entry: 187.50, current: 189.72, pnl: 11.10, pnlPct: 1.18 },
]

const recentTrades = [
  { symbol: 'SOL/USD', type: 'Buy', size: 2, entry: 168.50, exit: 172.30, pnl: 7.60, pnlPct: 2.26, date: '2024-01-15 14:32', phase: 'Deriv Phase' },
  { symbol: 'GBP/USD', type: 'Sell', size: 5000, entry: 1.2680, exit: 1.2654, pnl: 13.00, pnlPct: 0.21, date: '2024-01-15 10:15', phase: 'Deriv Phase' },
  { symbol: 'NVDA', type: 'Buy', size: 2, entry: 870.00, exit: 875.28, pnl: 10.56, pnlPct: 0.61, date: '2024-01-14 18:42', phase: 'Wise Phase' },
  { symbol: 'ETH/USD', type: 'Buy', size: 0.3, entry: 3500, exit: 3521.80, pnl: 6.54, pnlPct: 0.62, date: '2024-01-14 09:00', phase: 'Deriv Phase' },
  { symbol: 'TSLA', type: 'Sell', size: 5, entry: 252.00, exit: 248.50, pnl: 17.50, pnlPct: 1.39, date: '2024-01-13 16:20', phase: 'Wise Phase' },
  { symbol: 'XAU/USD', type: 'Sell', size: 0.5, entry: 2350, exit: 2325, pnl: 12.50, pnlPct: 1.06, date: '2024-01-13 12:00', phase: 'Wise Phase' },
  { symbol: 'BTC/USD', type: 'Buy', size: 0.02, entry: 66000, exit: 67245.30, pnl: 24.91, pnlPct: 1.89, date: '2024-01-12 14:00', phase: 'Deriv Phase' },
  { symbol: 'SPX500', type: 'Buy', size: 1, entry: 5250, exit: 5278.40, pnl: 28.40, pnlPct: 0.54, date: '2024-01-12 10:30', phase: 'Deriv Phase' },
  { symbol: 'AAPL', type: 'Sell', size: 3, entry: 192.00, exit: 189.72, pnl: 6.84, pnlPct: 1.19, date: '2024-01-11 14:00', phase: 'Eversend Phase' },
  { symbol: 'USD/JPY', type: 'Buy', size: 10000, entry: 153.50, exit: 154.32, pnl: 53.33, pnlPct: 0.53, date: '2024-01-11 09:15', phase: 'Deriv Phase' },
]

const formatNaira = (amount: number) => `₦${Math.abs(amount).toLocaleString()}`

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Portfolio</h1>
          <p className="text-slate-400">Track your performance across all trading phases</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Portfolio Value', value: formatNaira(summary.totalValue), icon: PieChartIcon, color: '#00D4AA' },
            { label: "Today's P&L", value: `+${formatNaira(summary.todayPnl)}`, icon: TrendingUp, color: '#00D4AA', sub: '+1.6%' },
            { label: 'Total P&L', value: `+${formatNaira(summary.totalPnl)}`, icon: ArrowUpRight, color: '#00D4AA', sub: '+9.9%' },
            { label: 'Win Rate', value: `${summary.winRate}%`, icon: Target, color: '#F5A623' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div key={item.label} variants={fadeUp} custom={i}>
                <Card className="bg-[#162D50] border-white/[0.06]">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <span className="text-xs text-slate-500">{item.label}</span>
                    </div>
                    <p className="text-xl font-bold font-mono" style={{ color: item.color }}>{item.value}</p>
                    {item.sub && <p className="text-xs text-[#00D4AA] font-mono mt-0.5">{item.sub}</p>}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Phase Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <h2 className="text-xl font-bold mb-4">Phase Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {phaseBreakdown.map((pb) => (
              <Card key={pb.name} className="bg-[#162D50] border-white/[0.06] card-hover">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-sm mb-3">{pb.name}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">Balance</span>
                      <span className="font-mono font-semibold text-sm">{formatNaira(pb.balance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">Open Positions</span>
                      <span className="font-mono text-sm">{pb.positions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">P&L</span>
                      <span className={cn('font-mono font-semibold text-sm', pb.pnl >= 0 ? 'text-[#00D4AA]' : 'text-[#FF4D6A]')}>
                        {pb.pnl >= 0 ? '+' : ''}{formatNaira(pb.pnl)} ({pb.pnlPct >= 0 ? '+' : ''}{pb.pnlPct}%)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Performance Chart Placeholder */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8">
          <h2 className="text-xl font-bold mb-4">Performance</h2>
          <Card className="bg-[#162D50] border-white/[0.06]">
            <CardContent className="p-6">
              <div className="h-48 relative flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 1000 200">
                  <defs>
                    <linearGradient id="perfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,160 L100,150 L200,140 L300,145 L400,120 L500,110 L600,100 L700,80 L800,70 L900,50 L1000,40" stroke="#00D4AA" strokeWidth="2" fill="none" />
                  <path d="M0,160 L100,150 L200,140 L300,145 L400,120 L500,110 L600,100 L700,80 L800,70 L900,50 L1000,40 L1000,200 L0,200 Z" fill="url(#perfGrad)" />
                </svg>
                <div className="relative z-10 text-center">
                  <p className="text-sm text-slate-400">Portfolio Value Over Time</p>
                  <p className="text-xs text-slate-500 mt-1">Chart will show historical performance</p>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-center mt-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#00D4AA] rounded" /> Portfolio Value</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Holdings & Recent Trades */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Tabs defaultValue="holdings">
            <TabsList className="bg-[#162D50] border border-white/[0.06] mb-4">
              <TabsTrigger value="holdings" className="data-[state=active]:bg-[#00D4AA] data-[state=active]:text-[#0A1628]">
                Holdings ({holdings.length})
              </TabsTrigger>
              <TabsTrigger value="trades" className="data-[state=active]:bg-[#00D4AA] data-[state=active]:text-[#0A1628]">
                Recent Trades
              </TabsTrigger>
            </TabsList>

            <TabsContent value="holdings" className="mt-0">
              <Card className="bg-[#162D50] border-white/[0.06] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="text-left py-3 px-4 text-xs text-slate-500 font-medium">Symbol</th>
                        <th className="text-left py-3 px-4 text-xs text-slate-500 font-medium">Phase</th>
                        <th className="text-left py-3 px-4 text-xs text-slate-500 font-medium">Type</th>
                        <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">Size</th>
                        <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">Entry</th>
                        <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">Current</th>
                        <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">P&L</th>
                        <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">P&L %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holdings.map((h, i) => (
                        <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                          <td className="py-3 px-4 font-medium">{h.symbol}</td>
                          <td className="py-3 px-4 text-xs text-slate-400">{h.phase}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={cn('text-[10px] px-1.5 border-0', h.type === 'Buy' ? 'bg-[#00D4AA]/10 text-[#00D4AA]' : 'bg-[#FF4D6A]/10 text-[#FF4D6A]')}>
                              {h.type}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-xs">{h.size}</td>
                          <td className="py-3 px-4 text-right font-mono text-xs">{h.entry.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          <td className="py-3 px-4 text-right font-mono text-xs">{h.current.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          <td className={cn('py-3 px-4 text-right font-mono font-medium text-xs', h.pnl >= 0 ? 'text-[#00D4AA]' : 'text-[#FF4D6A]')}>
                            {h.pnl >= 0 ? '+' : ''}${h.pnl.toFixed(2)}
                          </td>
                          <td className={cn('py-3 px-4 text-right font-mono font-medium text-xs', h.pnlPct >= 0 ? 'text-[#00D4AA]' : 'text-[#FF4D6A]')}>
                            {h.pnlPct >= 0 ? '+' : ''}{h.pnlPct.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="trades" className="mt-0">
              <Card className="bg-[#162D50] border-white/[0.06] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="text-left py-3 px-4 text-xs text-slate-500 font-medium">Symbol</th>
                        <th className="text-left py-3 px-4 text-xs text-slate-500 font-medium">Type</th>
                        <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">Size</th>
                        <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">P&L</th>
                        <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">P&L %</th>
                        <th className="text-left py-3 px-4 text-xs text-slate-500 font-medium">Phase</th>
                        <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTrades.map((t, i) => (
                        <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                          <td className="py-3 px-4 font-medium text-xs">{t.symbol}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={cn('text-[10px] px-1.5 border-0', t.type === 'Buy' ? 'bg-[#00D4AA]/10 text-[#00D4AA]' : 'bg-[#FF4D6A]/10 text-[#FF4D6A]')}>
                              {t.type}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-xs">{t.size}</td>
                          <td className={cn('py-3 px-4 text-right font-mono font-medium text-xs', t.pnl >= 0 ? 'text-[#00D4AA]' : 'text-[#FF4D6A]')}>
                            {t.pnl >= 0 ? '+' : ''}${t.pnl.toFixed(2)}
                          </td>
                          <td className={cn('py-3 px-4 text-right font-mono font-medium text-xs', t.pnlPct >= 0 ? 'text-[#00D4AA]' : 'text-[#FF4D6A]')}>
                            {t.pnlPct >= 0 ? '+' : ''}{t.pnlPct.toFixed(2)}%
                          </td>
                          <td className="py-3 px-4 text-xs text-slate-400">{t.phase}</td>
                          <td className="py-3 px-4 text-right text-xs text-slate-500">{t.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
