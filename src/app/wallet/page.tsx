'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  CreditCard,
  Building2,
  Smartphone,
  Bitcoin,
  Copy,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

/* ── Mock Data ── */
const balanceOverview = {
  total: 205000,
  available: 145000,
  inPositions: 50000,
  pending: 10000,
}

const phaseBalances = [
  { name: 'Deriv Phase', balance: 125000, currency: 'NGN', change: 2.5 },
  { name: 'Wise Phase', balance: 50000, currency: 'NGN', change: -0.8 },
  { name: 'Eversend Phase', balance: 30000, currency: 'NGN', change: 1.2 },
]

const transactions = [
  { id: 1, date: '2024-01-15 14:32', type: 'Deposit', phase: 'Deriv Phase', amount: 50000, status: 'completed' },
  { id: 2, date: '2024-01-15 10:15', type: 'Trade Profit', phase: 'Deriv Phase', amount: 3500, status: 'completed' },
  { id: 3, date: '2024-01-14 18:42', type: 'Withdrawal', phase: 'Wise Phase', amount: -20000, status: 'completed' },
  { id: 4, date: '2024-01-14 09:00', type: 'Transfer', phase: 'Deriv → Wise', amount: -15000, status: 'completed' },
  { id: 5, date: '2024-01-13 16:20', type: 'Deposit', phase: 'Eversend Phase', amount: 30000, status: 'completed' },
  { id: 6, date: '2024-01-13 12:00', type: 'Trade Loss', phase: 'Wise Phase', amount: -1200, status: 'completed' },
  { id: 7, date: '2024-01-12 14:00', type: 'Deposit', phase: 'Deriv Phase', amount: 25000, status: 'pending' },
  { id: 8, date: '2024-01-11 10:30', type: 'Withdrawal', phase: 'Eversend Phase', amount: -5000, status: 'failed' },
]

const paymentMethods = [
  { id: 'bank', label: 'Bank Transfer', icon: Building2 },
  { id: 'paystack', label: 'Paystack', icon: CreditCard },
  { id: 'ussd', label: 'USSD', icon: Smartphone },
  { id: 'crypto', label: 'Crypto', icon: Bitcoin },
]

const formatNaira = (amount: number) => `₦${Math.abs(amount).toLocaleString()}`

export default function WalletPage() {
  const [depositPhase, setDepositPhase] = useState('Deriv Phase')
  const [depositAmount, setDepositAmount] = useState('')
  const [depositMethod, setDepositMethod] = useState('bank')
  const [withdrawPhase, setWithdrawPhase] = useState('Deriv Phase')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawBank, setWithdrawBank] = useState('')
  const [transferFrom, setTransferFrom] = useState('Deriv Phase')
  const [transferTo, setTransferTo] = useState('Wise Phase')
  const [transferAmount, setTransferAmount] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Wallet</h1>
          <p className="text-slate-400">Manage your funds across all trading phases</p>
        </motion.div>

        {/* Balance Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#162D50] border-white/[0.06] col-span-1 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#00D4AA]/10 flex items-center justify-center">
                  <WalletIcon className="w-5 h-5 text-[#00D4AA]" />
                </div>
                <span className="text-sm text-slate-400">Total Balance</span>
              </div>
              <p className="text-3xl font-bold font-mono text-[#00D4AA]">{formatNaira(balanceOverview.total)}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#162D50] border-white/[0.06]">
            <CardContent className="p-6">
              <span className="text-sm text-slate-400">Available</span>
              <p className="text-xl font-bold font-mono mt-1">{formatNaira(balanceOverview.available)}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#162D50] border-white/[0.06]">
            <CardContent className="p-6">
              <span className="text-sm text-slate-400">In Positions</span>
              <p className="text-xl font-bold font-mono mt-1 text-[#F5A623]">{formatNaira(balanceOverview.inPositions)}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#162D50] border-white/[0.06]">
            <CardContent className="p-6">
              <span className="text-sm text-slate-400">Pending</span>
              <p className="text-xl font-bold font-mono mt-1 text-slate-400">{formatNaira(balanceOverview.pending)}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Phase Balances */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {phaseBalances.map((pb) => (
            <Card key={pb.name} className="bg-[#162D50] border-white/[0.06] card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">{pb.name}</h3>
                  <Badge variant="outline" className={cn('text-[10px] px-1.5 border-0', pb.change >= 0 ? 'bg-[#00D4AA]/10 text-[#00D4AA]' : 'bg-[#FF4D6A]/10 text-[#FF4D6A]')}>
                    {pb.change >= 0 ? '+' : ''}{pb.change}%
                  </Badge>
                </div>
                <p className="text-2xl font-bold font-mono">{formatNaira(pb.balance)}</p>
                <p className="text-xs text-slate-500 mt-1">{pb.currency}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Deposit / Withdraw / Transfer Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <Tabs defaultValue="deposit">
            <TabsList className="bg-[#162D50] border border-white/[0.06] mb-6">
              <TabsTrigger value="deposit" className="data-[state=active]:bg-[#00D4AA] data-[state=active]:text-[#0A1628]">
                <ArrowDownLeft className="w-4 h-4 mr-1.5" /> Deposit
              </TabsTrigger>
              <TabsTrigger value="withdraw" className="data-[state=active]:bg-[#FF4D6A] data-[state=active]:text-white">
                <ArrowUpRight className="w-4 h-4 mr-1.5" /> Withdraw
              </TabsTrigger>
              <TabsTrigger value="transfer" className="data-[state=active]:bg-[#F5A623] data-[state=active]:text-[#0A1628]">
                <ArrowLeftRight className="w-4 h-4 mr-1.5" /> Transfer
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Deposit */}
              <TabsContent value="deposit" className="mt-0">
                <Card className="bg-[#162D50] border-white/[0.06]">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-lg">Deposit Funds</h3>
                    <div>
                      <label className="text-xs text-slate-500 mb-1.5 block">Select Phase</label>
                      <Select value={depositPhase} onValueChange={setDepositPhase}>
                        <SelectTrigger className="bg-white/[0.06] border-white/[0.08] text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#162D50] border-white/[0.08]">
                          <SelectItem value="Deriv Phase" className="text-white focus:bg-white/[0.08]">Deriv Phase</SelectItem>
                          <SelectItem value="Wise Phase" className="text-white focus:bg-white/[0.08]">Wise Phase</SelectItem>
                          <SelectItem value="Eversend Phase" className="text-white focus:bg-white/[0.08]">Eversend Phase</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1.5 block">Amount (NGN)</label>
                      <Input type="number" placeholder="Enter amount" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white font-mono" />
                      <div className="flex gap-2 mt-2">
                        {[5000, 10000, 25000, 50000].map((amt) => (
                          <button key={amt} onClick={() => setDepositAmount(amt.toString())} className="px-3 py-1 rounded text-xs bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.1] transition">
                            ₦{amt.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1.5 block">Payment Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        {paymentMethods.map((pm) => {
                          const Icon = pm.icon
                          return (
                            <button
                              key={pm.id}
                              onClick={() => setDepositMethod(pm.id)}
                              className={cn(
                                'flex items-center gap-2 p-3 rounded-lg border text-sm transition',
                                depositMethod === pm.id
                                  ? 'border-[#00D4AA]/30 bg-[#00D4AA]/5 text-white'
                                  : 'border-white/[0.06] bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.06]'
                              )}
                            >
                              <Icon className="w-4 h-4" />
                              {pm.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Bank details display */}
                    {depositMethod === 'bank' && (
                      <Card className="bg-white/[0.04] border-white/[0.06]">
                        <CardContent className="p-4 space-y-2">
                          <p className="text-xs text-slate-500 mb-2">Bank Transfer Details</p>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Bank</span>
                            <span className="font-medium">Wema Bank</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Account Number</span>
                            <div className="flex items-center gap-1">
                              <span className="font-mono font-medium">7825301056</span>
                              <button onClick={handleCopy} className="text-slate-400 hover:text-[#00D4AA] transition">
                                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-[#00D4AA]" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Account Name</span>
                            <span className="font-medium">DWEX Technologies Ltd</span>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Button className="w-full bg-[#00D4AA] hover:bg-[#00A888] text-[#0A1628] font-bold py-6 rounded-xl glow-dwex-strong">
                      Deposit {depositAmount ? `₦${parseInt(depositAmount).toLocaleString()}` : 'Funds'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Withdraw */}
              <TabsContent value="withdraw" className="mt-0">
                <Card className="bg-[#162D50] border-white/[0.06]">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-lg">Withdraw Funds</h3>
                    <div>
                      <label className="text-xs text-slate-500 mb-1.5 block">From Phase</label>
                      <Select value={withdrawPhase} onValueChange={setWithdrawPhase}>
                        <SelectTrigger className="bg-white/[0.06] border-white/[0.08] text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#162D50] border-white/[0.08]">
                          <SelectItem value="Deriv Phase" className="text-white focus:bg-white/[0.08]">Deriv Phase (₦125,000)</SelectItem>
                          <SelectItem value="Wise Phase" className="text-white focus:bg-white/[0.08]">Wise Phase (₦50,000)</SelectItem>
                          <SelectItem value="Eversend Phase" className="text-white focus:bg-white/[0.08]">Eversend Phase (₦30,000)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1.5 block">Amount (NGN)</label>
                      <Input type="number" placeholder="Enter amount" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white font-mono" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1.5 block">Bank Account</label>
                      <Input placeholder="Enter account number" value={withdrawBank} onChange={(e) => setWithdrawBank(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white font-mono" />
                    </div>
                    <Card className="bg-white/[0.04] border-white/[0.06]">
                      <CardContent className="p-3 flex items-center justify-between text-sm">
                        <span className="text-slate-400">Withdrawal Fee</span>
                        <span className="font-mono font-medium">₦100</span>
                      </CardContent>
                    </Card>
                    <Button className="w-full bg-[#FF4D6A] hover:bg-[#E63E57] text-white font-bold py-6 rounded-xl">
                      Withdraw {withdrawAmount ? `₦${parseInt(withdrawAmount).toLocaleString()}` : 'Funds'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Transfer */}
              <TabsContent value="transfer" className="mt-0">
                <Card className="bg-[#162D50] border-white/[0.06]">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-lg">Transfer Between Phases</h3>
                    <div>
                      <label className="text-xs text-slate-500 mb-1.5 block">From Phase</label>
                      <Select value={transferFrom} onValueChange={setTransferFrom}>
                        <SelectTrigger className="bg-white/[0.06] border-white/[0.08] text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#162D50] border-white/[0.08]">
                          <SelectItem value="Deriv Phase" className="text-white focus:bg-white/[0.08]">Deriv Phase (₦125,000)</SelectItem>
                          <SelectItem value="Wise Phase" className="text-white focus:bg-white/[0.08]">Wise Phase (₦50,000)</SelectItem>
                          <SelectItem value="Eversend Phase" className="text-white focus:bg-white/[0.08]">Eversend Phase (₦30,000)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#F5A623]/10 flex items-center justify-center">
                        <ArrowLeftRight className="w-5 h-5 text-[#F5A623]" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1.5 block">To Phase</label>
                      <Select value={transferTo} onValueChange={setTransferTo}>
                        <SelectTrigger className="bg-white/[0.06] border-white/[0.08] text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#162D50] border-white/[0.08]">
                          <SelectItem value="Deriv Phase" className="text-white focus:bg-white/[0.08]">Deriv Phase</SelectItem>
                          <SelectItem value="Wise Phase" className="text-white focus:bg-white/[0.08]">Wise Phase</SelectItem>
                          <SelectItem value="Eversend Phase" className="text-white focus:bg-white/[0.08]">Eversend Phase</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1.5 block">Amount (NGN)</label>
                      <Input type="number" placeholder="Enter amount" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white font-mono" />
                    </div>
                    <Card className="bg-white/[0.04] border-white/[0.06]">
                      <CardContent className="p-3 flex items-center justify-between text-sm">
                        <span className="text-slate-400">Transfer Fee</span>
                        <span className="font-mono font-medium text-[#00D4AA]">Free</span>
                      </CardContent>
                    </Card>
                    <Button className="w-full bg-[#F5A623] hover:bg-[#E09420] text-[#0A1628] font-bold py-6 rounded-xl">
                      Transfer {transferAmount ? `₦${parseInt(transferAmount).toLocaleString()}` : 'Funds'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>

        {/* Transaction History */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-xl font-bold mb-4">Transaction History</h2>
          <Card className="bg-[#162D50] border-white/[0.06] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-3 px-4 text-xs text-slate-500 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-xs text-slate-500 font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-xs text-slate-500 font-medium">Phase</th>
                    <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">Amount</th>
                    <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="py-3 px-4 text-xs text-slate-400">{tx.date}</td>
                      <td className="py-3 px-4 font-medium text-xs">{tx.type}</td>
                      <td className="py-3 px-4 text-xs text-slate-400">{tx.phase}</td>
                      <td className={cn('py-3 px-4 text-right font-mono font-medium text-xs', tx.amount >= 0 ? 'text-[#00D4AA]' : 'text-[#FF4D6A]')}>
                        {tx.amount >= 0 ? '+' : ''}{formatNaira(tx.amount)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Badge variant="outline" className={cn('text-[10px] px-1.5 border-0',
                          tx.status === 'completed' ? 'bg-[#00D4AA]/10 text-[#00D4AA]' :
                          tx.status === 'pending' ? 'bg-[#F5A623]/10 text-[#F5A623]' :
                          'bg-[#FF4D6A]/10 text-[#FF4D6A]'
                        )}>
                          {tx.status === 'completed' && <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />}
                          {tx.status === 'pending' && <Clock className="w-2.5 h-2.5 mr-0.5" />}
                          {tx.status === 'failed' && <AlertCircle className="w-2.5 h-2.5 mr-0.5" />}
                          {tx.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
