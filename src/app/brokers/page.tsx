'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Layers,
  Link2,
  Unlink,
  CheckCircle2,
  Clock,
  Lock,
  Shield,
  ArrowRight,
  Zap,
  Globe,
  Banknote,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

/* ── Mock Data ── */
const availableBrokers = [
  {
    id: 'deriv',
    name: 'Deriv Phase',
    description: 'Forex, Synthetics, Crypto',
    assets: '200+',
    connected: true,
    balance: '₦125,000',
    kycRequired: false,
    icon: Zap,
    color: '#00D4AA',
  },
  {
    id: 'wise',
    name: 'Wise Phase',
    description: 'Fiat transfers, Multi-currency',
    assets: '50+',
    connected: true,
    balance: '₦50,000',
    kycRequired: false,
    icon: Globe,
    color: '#33DDBB',
  },
  {
    id: 'eversend',
    name: 'Eversend Phase',
    description: 'African currencies, Wallet',
    assets: '30+',
    connected: true,
    balance: '₦30,000',
    kycRequired: true,
    icon: Banknote,
    color: '#F5A623',
  },
  {
    id: 'octa',
    name: 'OctaFX Phase',
    description: 'Forex, Commodities',
    assets: '70+',
    connected: false,
    comingSoon: false,
    kycRequired: false,
    icon: Layers,
    color: '#9F7AEA',
  },
  {
    id: 'xm',
    name: 'XM Phase',
    description: 'Forex, CFDs, Stocks',
    assets: '100+',
    connected: false,
    comingSoon: false,
    kycRequired: true,
    icon: Layers,
    color: '#4299E1',
  },
  {
    id: 'exness',
    name: 'Exness Phase',
    description: 'Forex, Metals, Energies',
    assets: '120+',
    connected: false,
    comingSoon: true,
    icon: Layers,
    color: '#6B7280',
  },
  {
    id: 'icmarkets',
    name: 'IC Markets Phase',
    description: 'Forex, CFDs, Crypto',
    assets: '90+',
    connected: false,
    comingSoon: true,
    icon: Layers,
    color: '#6B7280',
  },
  {
    id: 'fbs',
    name: 'FBS Phase',
    description: 'Forex, Metals, Indices',
    assets: '60+',
    connected: false,
    comingSoon: true,
    icon: Layers,
    color: '#6B7280',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
}

export default function BrokersPage() {
  const [connectingId, setConnectingId] = useState<string | null>(null)

  const handleConnect = (id: string) => {
    setConnectingId(id)
    setTimeout(() => setConnectingId(null), 1500)
  }

  const connectedBrokers = availableBrokers.filter((b) => b.connected)
  const disconnectedBrokers = availableBrokers.filter((b) => !b.connected)

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Trading Phases</h1>
          <p className="text-slate-400 text-lg max-w-2xl">
            Each connected broker creates a trading phase with unique assets and rates. Connect your brokers to start trading.
          </p>
        </motion.div>

        {/* Explanation Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <Card className="bg-[#162D50] border-[#00D4AA]/20">
            <CardContent className="p-5 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00D4AA]/10 flex items-center justify-center flex-shrink-0">
                <Layers className="w-5 h-5 text-[#00D4AA]" />
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1">How Trading Phases Work</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A &ldquo;Phase&rdquo; is created when you connect a broker account to DWEX. Each phase gives you access to that broker&apos;s
                  assets, pricing, and execution. You can have multiple phases active simultaneously and transfer positions between them.
                  DWEX aggregates all your phases into one unified trading interface.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Connected Phases */}
        {connectedBrokers.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00D4AA]" />
              Connected Phases ({connectedBrokers.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {connectedBrokers.map((broker, i) => {
                const Icon = broker.icon
                return (
                  <motion.div key={broker.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
                    <Card className="bg-[#162D50] border-white/[0.06] card-hover">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${broker.color}15` }}>
                              <Icon className="w-5 h-5" style={{ color: broker.color }} />
                            </div>
                            <div>
                              <h3 className="font-bold text-sm">{broker.name}</h3>
                              <p className="text-xs text-slate-500">{broker.description}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-[10px] px-1.5 border-0 bg-[#00D4AA]/10 text-[#00D4AA]">
                            Connected
                          </Badge>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Assets</span>
                            <span className="font-mono font-medium">{broker.assets}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500">Balance</span>
                            <span className="font-mono font-semibold text-[#00D4AA]">{broker.balance}</span>
                          </div>
                          {broker.kycRequired && (
                            <div className="flex items-center gap-1 text-xs text-[#F5A623]">
                              <Shield className="w-3 h-3" />
                              Additional KYC required
                            </div>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-[#FF4D6A]/20 text-[#FF4D6A] hover:bg-[#FF4D6A]/10 hover:text-[#FF4D6A] text-xs"
                        >
                          <Unlink className="w-3.5 h-3.5 mr-1" />
                          Disconnect
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Available Brokers */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-slate-400" />
            Available Brokers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {disconnectedBrokers.map((broker, i) => {
              const Icon = broker.icon
              return (
                <motion.div key={broker.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
                  <Card className="bg-[#162D50] border-white/[0.06] card-hover h-full">
                    <CardContent className="p-5 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${broker.color}15` }}>
                            <Icon className="w-5 h-5" style={{ color: broker.color }} />
                          </div>
                          <div>
                            <h3 className="font-bold text-sm">{broker.name}</h3>
                            <p className="text-xs text-slate-500">{broker.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline" className="text-[10px] px-1.5 border-white/[0.08] text-slate-400">
                          {broker.assets} assets
                        </Badge>
                        {broker.kycRequired && (
                          <Badge variant="outline" className="text-[10px] px-1.5 border-[#F5A623]/20 text-[#F5A623]">
                            <Shield className="w-2.5 h-2.5 mr-0.5" /> KYC
                          </Badge>
                        )}
                      </div>
                      <div className="mt-auto">
                        {broker.comingSoon ? (
                          <Button
                            size="sm"
                            className="w-full bg-white/[0.04] text-slate-500 cursor-not-allowed text-xs"
                            disabled
                          >
                            <Lock className="w-3.5 h-3.5 mr-1" />
                            Coming Soon
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleConnect(broker.id)}
                            className="w-full bg-[#00D4AA]/10 text-[#00D4AA] hover:bg-[#00D4AA] hover:text-[#0A1628] text-xs font-semibold transition-all"
                            disabled={connectingId === broker.id}
                          >
                            {connectingId === broker.id ? (
                              <>
                                <Clock className="w-3.5 h-3.5 mr-1 animate-spin" />
                                Connecting...
                              </>
                            ) : (
                              <>
                                <Link2 className="w-3.5 h-3.5 mr-1" />
                                Connect
                                <ArrowRight className="w-3.5 h-3.5 ml-1" />
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
