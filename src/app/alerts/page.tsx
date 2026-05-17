'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Plus, Trash2, TrendingUp, TrendingDown, ArrowUp, ArrowDown, Search, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

const activeAlerts = [
  { id: 1, symbol: 'BTC/USD', targetPrice: 70000, direction: 'Above', currentPrice: 67245.30, phase: 'Deriv Phase' },
  { id: 2, symbol: 'EUR/USD', targetPrice: 1.0800, direction: 'Below', currentPrice: 1.0842, phase: 'Deriv Phase' },
  { id: 3, symbol: 'XAU/USD', targetPrice: 2400, direction: 'Above', currentPrice: 2341.50, phase: 'Deriv Phase' },
  { id: 4, symbol: 'AAPL', targetPrice: 195, direction: 'Above', currentPrice: 189.72, phase: 'Wise Phase' },
  { id: 5, symbol: 'ETH/USD', targetPrice: 3400, direction: 'Below', currentPrice: 3521.80, phase: 'Deriv Phase' },
]

const triggeredAlerts = [
  { id: 6, symbol: 'SOL/USD', targetPrice: 170, direction: 'Above', triggeredPrice: 170.45, triggeredAt: '2024-01-15 14:32', phase: 'Deriv Phase' },
  { id: 7, symbol: 'GBP/USD', targetPrice: 1.2700, direction: 'Above', triggeredPrice: 1.2703, triggeredAt: '2024-01-14 10:15', phase: 'Deriv Phase' },
  { id: 8, symbol: 'TSLA', targetPrice: 250, direction: 'Below', triggeredPrice: 249.80, triggeredAt: '2024-01-13 16:20', phase: 'Wise Phase' },
]

const symbols = ['BTC/USD','ETH/USD','SOL/USD','EUR/USD','GBP/USD','XAU/USD','AAPL','TSLA','NVDA','SPX500']

export default function AlertsPage() {
  const [alertSymbol, setAlertSymbol] = useState('')
  const [alertPrice, setAlertPrice] = useState('')
  const [alertDirection, setAlertDirection] = useState('Above')
  const [alertPhase, setAlertPhase] = useState('Deriv Phase')
  const [symbolSearch, setSymbolSearch] = useState('')
  const [showSymbolList, setShowSymbolList] = useState(false)

  const filteredSymbols = symbols.filter((s) => s.toLowerCase().includes(symbolSearch.toLowerCase()))

  return (
    <div className="min-h-screen pt-20 pb-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">Price Alerts</h1>
          <p className="text-gray-500">Get notified when assets reach your target prices</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <Card className="bg-white border-gray-200 rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 rounded-lg bg-[#00A88A]/10 flex items-center justify-center"><Plus className="w-4 h-4 text-[#00A88A]" /></div><h2 className="font-bold text-gray-900">Create Alert</h2></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative"><label className="text-xs text-gray-400 mb-1.5 block">Symbol</label><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" /><Input placeholder="Search symbol..." value={symbolSearch || alertSymbol} onChange={(e) => { setSymbolSearch(e.target.value); setShowSymbolList(true) }} onFocus={() => setShowSymbolList(true)} className="pl-9 bg-white border-gray-200 text-gray-900 text-sm" />{showSymbolList && (<div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-40 overflow-y-auto">{filteredSymbols.map((s) => (<button key={s} onClick={() => { setAlertSymbol(s); setSymbolSearch(''); setShowSymbolList(false) }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-gray-900">{s}</button>))}</div>)}</div></div>
                <div><label className="text-xs text-gray-400 mb-1.5 block">Target Price</label><Input type="number" placeholder="0.00" value={alertPrice} onChange={(e) => setAlertPrice(e.target.value)} className="bg-white border-gray-200 text-gray-900 font-mono text-sm" /></div>
                <div><label className="text-xs text-gray-400 mb-1.5 block">Direction</label><Select value={alertDirection} onValueChange={setAlertDirection}><SelectTrigger className="bg-white border-gray-200 text-gray-900 text-sm"><SelectValue /></SelectTrigger><SelectContent className="bg-white border-gray-200"><SelectItem value="Above" className="text-gray-900 focus:bg-gray-50"><div className="flex items-center gap-1.5"><ArrowUp className="w-3.5 h-3.5 text-[#00A88A]" />Above</div></SelectItem><SelectItem value="Below" className="text-gray-900 focus:bg-gray-50"><div className="flex items-center gap-1.5"><ArrowDown className="w-3.5 h-3.5 text-[#E63950]" />Below</div></SelectItem></SelectContent></Select></div>
                <div><label className="text-xs text-gray-400 mb-1.5 block">Phase</label><Select value={alertPhase} onValueChange={setAlertPhase}><SelectTrigger className="bg-white border-gray-200 text-gray-900 text-sm"><SelectValue /></SelectTrigger><SelectContent className="bg-white border-gray-200"><SelectItem value="Deriv Phase" className="text-gray-900 focus:bg-gray-50">Deriv Phase</SelectItem><SelectItem value="Wise Phase" className="text-gray-900 focus:bg-gray-50">Wise Phase</SelectItem><SelectItem value="Eversend Phase" className="text-gray-900 focus:bg-gray-50">Eversend Phase</SelectItem></SelectContent></Select></div>
                <div className="flex items-end"><Button className="w-full bg-[#00A88A] hover:bg-[#008F74] text-white font-bold py-2.5"><Bell className="w-4 h-4 mr-1.5" />Create Alert</Button></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs defaultValue="active">
            <TabsList className="bg-gray-100 border border-gray-200 mb-4">
              <TabsTrigger value="active" className="data-[state=active]:bg-[#00A88A] data-[state=active]:text-white">Active ({activeAlerts.length})</TabsTrigger>
              <TabsTrigger value="triggered" className="data-[state=active]:bg-[#00A88A] data-[state=active]:text-white">Triggered ({triggeredAlerts.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-0">
              <Card className="bg-white border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Symbol</th><th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Direction</th><th className="text-right py-3 px-4 text-xs text-gray-400 font-medium">Target Price</th><th className="text-right py-3 px-4 text-xs text-gray-400 font-medium">Current Price</th><th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Phase</th><th className="text-center py-3 px-4 text-xs text-gray-400 font-medium">Status</th><th className="text-right py-3 px-4 text-xs text-gray-400 font-medium">Action</th></tr></thead>
                  <tbody>{activeAlerts.map((alert) => (<tr key={alert.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{alert.symbol}</td>
                    <td className="py-3 px-4"><div className="flex items-center gap-1">{alert.direction === 'Above' ? <ArrowUp className="w-3.5 h-3.5 text-[#00A88A]" /> : <ArrowDown className="w-3.5 h-3.5 text-[#E63950]" />}<span className={cn('text-xs font-medium', alert.direction === 'Above' ? 'text-[#00A88A]' : 'text-[#E63950]')}>{alert.direction}</span></div></td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-gray-900">{alert.targetPrice >= 1000 ? alert.targetPrice.toLocaleString() : alert.targetPrice.toFixed(alert.targetPrice < 1 ? 4 : 2)}</td>
                    <td className="py-3 px-4 text-right font-mono text-gray-700">{alert.currentPrice >= 1000 ? alert.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }) : alert.currentPrice.toFixed(alert.currentPrice < 1 ? 4 : 2)}</td>
                    <td className="py-3 px-4 text-xs text-gray-500">{alert.phase}</td>
                    <td className="py-3 px-4 text-center"><Badge variant="outline" className="text-[10px] px-1.5 border-0 bg-[#00A88A]/10 text-[#00A88A]"><Bell className="w-2.5 h-2.5 mr-0.5" />Active</Badge></td>
                    <td className="py-3 px-4 text-right"><button className="p-1.5 rounded hover:bg-[#E63950]/10 transition"><Trash2 className="w-4 h-4 text-[#E63950]" /></button></td>
                  </tr>))}</tbody>
                </table></div>
              </Card>
            </TabsContent>

            <TabsContent value="triggered" className="mt-0">
              <Card className="bg-white border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Symbol</th><th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Direction</th><th className="text-right py-3 px-4 text-xs text-gray-400 font-medium">Target</th><th className="text-right py-3 px-4 text-xs text-gray-400 font-medium">Triggered At</th><th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Phase</th><th className="text-center py-3 px-4 text-xs text-gray-400 font-medium">Status</th></tr></thead>
                  <tbody>{triggeredAlerts.map((alert) => (<tr key={alert.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{alert.symbol}</td>
                    <td className="py-3 px-4"><div className="flex items-center gap-1">{alert.direction === 'Above' ? <TrendingUp className="w-3.5 h-3.5 text-[#00A88A]" /> : <TrendingDown className="w-3.5 h-3.5 text-[#E63950]" />}<span className={cn('text-xs font-medium', alert.direction === 'Above' ? 'text-[#00A88A]' : 'text-[#E63950]')}>{alert.direction}</span></div></td>
                    <td className="py-3 px-4 text-right font-mono text-gray-700">{alert.targetPrice >= 1000 ? alert.targetPrice.toLocaleString() : alert.targetPrice.toFixed(alert.targetPrice < 1 ? 4 : 2)}</td>
                    <td className="py-3 px-4 text-right font-mono text-xs text-gray-700">{alert.triggeredPrice >= 1000 ? alert.triggeredPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }) : alert.triggeredPrice.toFixed(alert.triggeredPrice < 1 ? 4 : 2)}</td>
                    <td className="py-3 px-4 text-xs text-gray-500">{alert.phase}</td>
                    <td className="py-3 px-4 text-center"><Badge variant="outline" className="text-[10px] px-1.5 border-0 bg-[#E5940A]/10 text-[#E5940A]"><CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />Triggered</Badge></td>
                  </tr>))}</tbody>
                </table></div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
