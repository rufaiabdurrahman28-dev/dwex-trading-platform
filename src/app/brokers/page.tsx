'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, Link2, Unlink, CheckCircle2, Clock, Lock, Shield, ArrowRight, Zap, Globe, Banknote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { phases } from '@/lib/assets'

const iconMap: Record<string, React.ElementType> = { deriv: Zap, wise: Globe, eversend: Banknote }

const connectedPhaseIds = ['deriv', 'wise', 'eversend']

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }) }

export default function BrokersPage() {
  const [connectingId, setConnectingId] = useState<string | null>(null)

  const handleConnect = (id: string) => { setConnectingId(id); setTimeout(() => setConnectingId(null), 1500) }

  const connectedPhases = phases.filter(p => connectedPhaseIds.includes(p.id))
  const availablePhases = phases.filter(p => !connectedPhaseIds.includes(p.id))

  return (
    <div className="min-h-screen pt-20 pb-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">Trading Phases</h1>
          <p className="text-gray-500 text-lg max-w-2xl">Each connected broker creates a trading phase with unique assets and rates. Connect your brokers to start trading.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <Card className="bg-white border-[#00A88A]/20 shadow-sm">
            <CardContent className="p-5 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00A88A]/10 flex items-center justify-center flex-shrink-0"><Layers className="w-5 h-5 text-[#00A88A]" /></div>
              <div>
                <h3 className="font-bold text-sm mb-1 text-gray-900">How Trading Phases Work</h3>
                <p className="text-xs text-gray-500 leading-relaxed">A &ldquo;Phase&rdquo; is created when you connect a broker account to DWEX. Each phase gives you access to that broker&apos;s assets, pricing, and execution. You can have multiple phases active simultaneously and transfer positions between them.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900"><CheckCircle2 className="w-5 h-5 text-[#00A88A]" />Connected Phases ({connectedPhases.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {connectedPhases.map((phase, i) => {
              const Icon = iconMap[phase.id] || Layers
              return (
                <motion.div key={phase.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
                  <Card className="bg-white border-gray-200 card-hover shadow-sm">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${phase.color}15` }}><Icon className="w-5 h-5" style={{ color: phase.color }} /></div>
                          <div><h3 className="font-bold text-sm text-gray-900">{phase.name}</h3><p className="text-xs text-gray-400">{phase.description}</p></div>
                        </div>
                        <Badge variant="outline" className="text-[10px] px-1.5 border-0 bg-[#00A88A]/10 text-[#00A88A]">Connected</Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-xs"><span className="text-gray-400">Assets</span><span className="font-mono font-medium text-gray-900">{phase.assetCount}+</span></div>
                        <div className="flex justify-between text-xs"><span className="text-gray-400">Balance</span><span className="font-mono font-semibold text-[#00A88A]">₦125,000</span></div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full border-[#E63950]/20 text-[#E63950] hover:bg-[#E63950]/10 text-xs"><Unlink className="w-3.5 h-3.5 mr-1" />Disconnect</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900"><Link2 className="w-5 h-5 text-gray-400" />Available Brokers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {availablePhases.map((phase, i) => (
              <motion.div key={phase.id} variants={fadeUp} initial="hidden" animate="visible" custom={i}>
                <Card className="bg-white border-gray-200 card-hover h-full shadow-sm">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${phase.color}15` }}><Layers className="w-5 h-5" style={{ color: phase.color }} /></div>
                        <div><h3 className="font-bold text-sm text-gray-900">{phase.name}</h3><p className="text-xs text-gray-400">{phase.description}</p></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" className="text-[10px] px-1.5 border-gray-200 text-gray-500">{phase.assetCount}+ assets</Badge>
                    </div>
                    <div className="mt-auto">
                      {phase.status === 'coming' ? (
                        <Button size="sm" className="w-full bg-gray-100 text-gray-400 cursor-not-allowed text-xs" disabled><Lock className="w-3.5 h-3.5 mr-1" />Coming Soon</Button>
                      ) : (
                        <Button size="sm" onClick={() => handleConnect(phase.id)} className="w-full bg-[#00A88A]/10 text-[#00A88A] hover:bg-[#00A88A] hover:text-white text-xs font-semibold transition-all" disabled={connectingId === phase.id}>
                          {connectingId === phase.id ? <><Clock className="w-3.5 h-3.5 mr-1 animate-spin" />Connecting...</> : <><Link2 className="w-3.5 h-3.5 mr-1" />Connect<ArrowRight className="w-3.5 h-3.5 ml-1" /></>}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
