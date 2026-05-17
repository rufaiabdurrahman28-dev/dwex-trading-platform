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
import { phases } from '@/lib/assets'

const balanceOverview = { total: 205000, available: 145000, inPositions: 50000, pending: 10000 }

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

  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">Wallet</h1>
          <p className="text-gray-500">Manage your funds across all trading phases</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-gray-200 shadow-sm col-span-1 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#00A88A]/10 flex items-center justify-center"><WalletIcon className="w-5 h-5 text-[#00A88A]" /></div>
                <span className="text-sm text-gray-500">Total Balance</span>
              </div>
              <p className="text-3xl font-bold font-mono text-[#00A88A]">{formatNaira(balanceOverview.total)}</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 shadow-sm"><CardContent className="p-6"><span className="text-sm text-gray-500">Available</span><p className="text-xl font-bold font-mono mt-1 text-gray-900">{formatNaira(balanceOverview.available)}</p></CardContent></Card>
          <Card className="bg-white border-gray-200 shadow-sm"><CardContent className="p-6"><span className="text-sm text-gray-500">In Positions</span><p className="text-xl font-bold font-mono mt-1 text-[#E5940A]">{formatNaira(balanceOverview.inPositions)}</p></CardContent></Card>
          <Card className="bg-white border-gray-200 shadow-sm"><CardContent className="p-6"><span className="text-sm text-gray-500">Pending</span><p className="text-xl font-bold font-mono mt-1 text-gray-400">{formatNaira(balanceOverview.pending)}</p></CardContent></Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {phaseBalances.map((pb) => {
            const phaseData = phases.find(p => p.name === pb.name)
            return (
              <Card key={pb.name} className="bg-white border-gray-200 card-hover shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm text-gray-900">{pb.name}</h3>
                    <Badge variant="outline" className={cn('text-[10px] px-1.5 border-0', pb.change >= 0 ? 'bg-[#00A88A]/10 text-[#00A88A]' : 'bg-[#E63950]/10 text-[#E63950]')}>
                      {pb.change >= 0 ? '+' : ''}{pb.change}%
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold font-mono text-gray-900">{formatNaira(pb.balance)}</p>
                  <p className="text-xs text-gray-400 mt-1">{pb.currency}</p>
                </CardContent>
              </Card>
            )
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
          <Tabs defaultValue="deposit">
            <TabsList className="bg-gray-100 border border-gray-200 mb-6">
              <TabsTrigger value="deposit" className="data-[state=active]:bg-[#00A88A] data-[state=active]:text-white"><ArrowDownLeft className="w-4 h-4 mr-1.5" /> Deposit</TabsTrigger>
              <TabsTrigger value="withdraw" className="data-[state=active]:bg-[#E63950] data-[state=active]:text-white"><ArrowUpRight className="w-4 h-4 mr-1.5" /> Withdraw</TabsTrigger>
              <TabsTrigger value="transfer" className="data-[state=active]:bg-[#E5940A] data-[state=active]:text-white"><ArrowLeftRight className="w-4 h-4 mr-1.5" /> Transfer</TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TabsContent value="deposit" className="mt-0">
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-lg text-gray-900">Deposit Funds</h3>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">Select Phase</label>
                      <Select value={depositPhase} onValueChange={setDepositPhase}>
                        <SelectTrigger className="bg-white border-gray-200 text-gray-900"><SelectValue /></SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
                          {phases.filter(p => p.status === 'active').map(p => <SelectItem key={p.id} value={p.name} className="text-gray-900 focus:bg-gray-50">{p.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">Amount (NGN)</label>
                      <Input type="number" placeholder="Enter amount" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} className="bg-white border-gray-200 text-gray-900 font-mono" />
                      <div className="flex gap-2 mt-2">
                        {[5000, 10000, 25000, 50000].map((amt) => (
                          <button key={amt} onClick={() => setDepositAmount(amt.toString())} className="px-3 py-1 rounded text-xs bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200 transition">₦{amt.toLocaleString()}</button>
                        ))}
                      </div>
                    </div>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">Payment Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        {paymentMethods.map((pm) => { const Icon = pm.icon; return (
                          <button key={pm.id} onClick={() => setDepositMethod(pm.id)} className={cn('flex items-center gap-2 p-3 rounded-lg border text-sm transition', depositMethod === pm.id ? 'border-[#00A88A]/30 bg-[#00A88A]/5 text-gray-900' : 'border-gray-200 bg-gray-50 text-gray-500 hover:text-gray-900 hover:bg-gray-100')}>
                            <Icon className="w-4 h-4" />{pm.label}
                          </button>
                        )})}
                      </div>
                    </div>
                    {depositMethod === 'bank' && (
                      <Card className="bg-gray-50 border-gray-200">
                        <CardContent className="p-4 space-y-2">
                          <p className="text-xs text-gray-400 mb-2">Bank Transfer Details</p>
                          <div className="flex justify-between text-sm"><span className="text-gray-500">Bank</span><span className="font-medium text-gray-900">Wema Bank</span></div>
                          <div className="flex justify-between text-sm"><span className="text-gray-500">Account Number</span><div className="flex items-center gap-1"><span className="font-mono font-medium text-gray-900">7825301056</span><button onClick={handleCopy} className="text-gray-400 hover:text-[#00A88A] transition">{copied ? <CheckCircle2 className="w-3.5 h-3.5 text-[#00A88A]" /> : <Copy className="w-3.5 h-3.5" />}</button></div></div>
                          <div className="flex justify-between text-sm"><span className="text-gray-500">Account Name</span><span className="font-medium text-gray-900">DWEX Technologies Ltd</span></div>
                        </CardContent>
                      </Card>
                    )}
                    <Button className="w-full bg-[#00A88A] hover:bg-[#008F74] text-white font-bold py-6 rounded-xl">Deposit {depositAmount ? `₦${parseInt(depositAmount).toLocaleString()}` : 'Funds'}</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="withdraw" className="mt-0">
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-lg text-gray-900">Withdraw Funds</h3>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">From Phase</label>
                      <Select value={withdrawPhase} onValueChange={setWithdrawPhase}><SelectTrigger className="bg-white border-gray-200 text-gray-900"><SelectValue /></SelectTrigger><SelectContent className="bg-white border-gray-200">
                        <SelectItem value="Deriv Phase" className="text-gray-900 focus:bg-gray-50">Deriv Phase (₦125,000)</SelectItem>
                        <SelectItem value="Wise Phase" className="text-gray-900 focus:bg-gray-50">Wise Phase (₦50,000)</SelectItem>
                        <SelectItem value="Eversend Phase" className="text-gray-900 focus:bg-gray-50">Eversend Phase (₦30,000)</SelectItem>
                      </SelectContent></Select>
                    </div>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">Amount (NGN)</label><Input type="number" placeholder="Enter amount" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="bg-white border-gray-200 text-gray-900 font-mono" /></div>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">Bank Account</label><Input placeholder="Enter account number" value={withdrawBank} onChange={(e) => setWithdrawBank(e.target.value)} className="bg-white border-gray-200 text-gray-900 font-mono" /></div>
                    <Card className="bg-gray-50 border-gray-200"><CardContent className="p-3 flex items-center justify-between text-sm"><span className="text-gray-500">Withdrawal Fee</span><span className="font-mono font-medium text-gray-900">₦100</span></CardContent></Card>
                    <Button className="w-full bg-[#E63950] hover:bg-[#c5303f] text-white font-bold py-6 rounded-xl">Withdraw {withdrawAmount ? `₦${parseInt(withdrawAmount).toLocaleString()}` : 'Funds'}</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transfer" className="mt-0">
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-lg text-gray-900">Transfer Between Phases</h3>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">From Phase</label>
                      <Select value={transferFrom} onValueChange={setTransferFrom}><SelectTrigger className="bg-white border-gray-200 text-gray-900"><SelectValue /></SelectTrigger><SelectContent className="bg-white border-gray-200">
                        <SelectItem value="Deriv Phase" className="text-gray-900 focus:bg-gray-50">Deriv Phase (₦125,000)</SelectItem>
                        <SelectItem value="Wise Phase" className="text-gray-900 focus:bg-gray-50">Wise Phase (₦50,000)</SelectItem>
                        <SelectItem value="Eversend Phase" className="text-gray-900 focus:bg-gray-50">Eversend Phase (₦30,000)</SelectItem>
                      </SelectContent></Select>
                    </div>
                    <div className="flex justify-center"><div className="w-10 h-10 rounded-full bg-[#E5940A]/10 flex items-center justify-center"><ArrowLeftRight className="w-5 h-5 text-[#E5940A]" /></div></div>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">To Phase</label>
                      <Select value={transferTo} onValueChange={setTransferTo}><SelectTrigger className="bg-white border-gray-200 text-gray-900"><SelectValue /></SelectTrigger><SelectContent className="bg-white border-gray-200">
                        <SelectItem value="Deriv Phase" className="text-gray-900 focus:bg-gray-50">Deriv Phase</SelectItem>
                        <SelectItem value="Wise Phase" className="text-gray-900 focus:bg-gray-50">Wise Phase</SelectItem>
                        <SelectItem value="Eversend Phase" className="text-gray-900 focus:bg-gray-50">Eversend Phase</SelectItem>
                      </SelectContent></Select>
                    </div>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">Amount (NGN)</label><Input type="number" placeholder="Enter amount" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} className="bg-white border-gray-200 text-gray-900 font-mono" /></div>
                    <Card className="bg-gray-50 border-gray-200"><CardContent className="p-3 flex items-center justify-between text-sm"><span className="text-gray-500">Transfer Fee</span><span className="font-mono font-medium text-[#00A88A]">Free</span></CardContent></Card>
                    <Button className="w-full bg-[#E5940A] hover:bg-[#c57f08] text-white font-bold py-6 rounded-xl">Transfer {transferAmount ? `₦${parseInt(transferAmount).toLocaleString()}` : 'Funds'}</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-xl font-bold mb-4 text-gray-900">Transaction History</h2>
          <Card className="bg-white border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Phase</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-400 font-medium">Amount</th>
                  <th className="text-right py-3 px-4 text-xs text-gray-400 font-medium">Status</th>
                </tr></thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-xs text-gray-500">{tx.date}</td>
                      <td className="py-3 px-4 font-medium text-xs text-gray-900">{tx.type}</td>
                      <td className="py-3 px-4 text-xs text-gray-500">{tx.phase}</td>
                      <td className={cn('py-3 px-4 text-right font-mono font-medium text-xs', tx.amount >= 0 ? 'text-[#00A88A]' : 'text-[#E63950]')}>
                        {tx.amount >= 0 ? '+' : ''}{formatNaira(tx.amount)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Badge variant="outline" className={cn('text-[10px] px-1.5 border-0',
                          tx.status === 'completed' ? 'bg-[#00A88A]/10 text-[#00A88A]' :
                          tx.status === 'pending' ? 'bg-[#E5940A]/10 text-[#E5940A]' :
                          'bg-[#E63950]/10 text-[#E63950]'
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
