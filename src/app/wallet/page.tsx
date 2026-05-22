'use client'

import { useState, useEffect } from 'react'
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
  Loader2,
  LogIn,
} from 'lucide-react'
import Link from 'next/link'
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
import { useAuth } from '@/lib/auth-context'

interface WalletInfo {
  id: string
  phase: string
  currency: string
  balance: number
  locked: number
}

interface Transaction {
  id: string
  date: string
  type: string
  phase: string
  amount: number
  status: string
}

const paymentMethods = [
  { id: 'bank', label: 'Bank Transfer', icon: Building2 },
  { id: 'paystack', label: 'Paystack', icon: CreditCard },
  { id: 'ussd', label: 'USSD', icon: Smartphone },
  { id: 'crypto', label: 'Crypto', icon: Bitcoin },
]

const formatNaira = (amount: number) => `₦${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default function WalletPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const [wallets, setWallets] = useState<WalletInfo[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loadingWallets, setLoadingWallets] = useState(true)

  // Deposit state
  const [depositPhase, setDepositPhase] = useState('Deriv Phase')
  const [depositAmount, setDepositAmount] = useState('')
  const [depositMethod, setDepositMethod] = useState('bank')
  const [depositLoading, setDepositLoading] = useState(false)
  const [depositMsg, setDepositMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Withdraw state
  const [withdrawPhase, setWithdrawPhase] = useState('Deriv Phase')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawBank, setWithdrawBank] = useState('')

  // Transfer state
  const [transferFrom, setTransferFrom] = useState('Deriv Phase')
  const [transferTo, setTransferTo] = useState('Wise Phase')
  const [transferAmount, setTransferAmount] = useState('')

  const [copied, setCopied] = useState(false)
  const handleCopy = () => { setCopied(true); setTimeout(() => setCopied(false), 2000) }

  // Fetch wallets from database
  useEffect(() => {
    if (user) {
      fetchWallets()
    } else {
      setLoadingWallets(false)
    }
  }, [user])

  const fetchWallets = async () => {
    try {
      const res = await fetch(`/api/user/profile?userId=${user!.id}`)
      if (res.ok) {
        const data = await res.json()
        if (data.profile?.wallets) {
          setWallets(data.profile.wallets)
        }
      }
    } catch (err) {
      console.error('Wallet fetch error:', err)
    } finally {
      setLoadingWallets(false)
    }
  }

  const handleDeposit = async () => {
    if (!user) return
    const amount = parseFloat(depositAmount)
    if (!amount || amount <= 0) {
      setDepositMsg({ type: 'error', text: 'Please enter a valid amount' })
      return
    }
    if (amount < 1000) {
      setDepositMsg({ type: 'error', text: 'Minimum deposit is ₦1,000' })
      return
    }

    setDepositLoading(true)
    setDepositMsg(null)

    try {
      const res = await fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          amount,
          phase: depositPhase,
          currency: 'NGN',
          paymentMethod: depositMethod,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setDepositMsg({ type: 'success', text: `₦${amount.toLocaleString()} deposited successfully to ${depositPhase}!` })
        setDepositAmount('')
        // Refresh wallets
        await fetchWallets()
      } else {
        setDepositMsg({ type: 'error', text: data.error || 'Deposit failed. Please try again.' })
      }
    } catch (err) {
      setDepositMsg({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setDepositLoading(false)
    }
  }

  // Calculate balances
  const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0)
  const totalLocked = wallets.reduce((sum, w) => sum + w.locked, 0)
  const availableBalance = totalBalance - totalLocked

  // If not logged in, show login prompt
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-white">
        <div className="max-w-md mx-auto px-4 text-center py-20">
          <div className="w-20 h-20 rounded-full bg-[#00A88A]/10 flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-10 h-10 text-[#00A88A]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Log In to Access Your Wallet</h1>
          <p className="text-gray-500 mb-8">You need to be logged in to view your wallet, deposit funds, and start trading.</p>
          <div className="flex flex-col gap-3">
            <Link href="/login">
              <Button className="w-full bg-[#00A88A] hover:bg-[#008F74] text-white font-bold py-6 rounded-xl">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 py-6 rounded-xl">Create Account</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (authLoading || loadingWallets) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#00A88A]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">Wallet</h1>
          <p className="text-gray-500">Manage your funds across all trading phases</p>
          {profile && <p className="text-sm text-gray-400 mt-1">Welcome, {profile.full_name}</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-gray-200 shadow-sm col-span-1 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#00A88A]/10 flex items-center justify-center"><WalletIcon className="w-5 h-5 text-[#00A88A]" /></div>
                <span className="text-sm text-gray-500">Total Balance</span>
              </div>
              <p className="text-3xl font-bold font-mono text-[#00A88A]">{formatNaira(totalBalance)}</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 shadow-sm"><CardContent className="p-6"><span className="text-sm text-gray-500">Available</span><p className="text-xl font-bold font-mono mt-1 text-gray-900">{formatNaira(availableBalance)}</p></CardContent></Card>
          <Card className="bg-white border-gray-200 shadow-sm"><CardContent className="p-6"><span className="text-sm text-gray-500">In Positions</span><p className="text-xl font-bold font-mono mt-1 text-[#E5940A]">{formatNaira(totalLocked)}</p></CardContent></Card>
          <Card className="bg-white border-gray-200 shadow-sm"><CardContent className="p-6"><span className="text-sm text-gray-500">Phases</span><p className="text-xl font-bold font-mono mt-1 text-gray-900">{wallets.length}</p></CardContent></Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {wallets.map((w) => {
            const phaseData = phases.find(p => p.name === w.phase)
            return (
              <Card key={w.id} className="bg-white border-gray-200 card-hover shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm text-gray-900">{w.phase}</h3>
                    <div className="w-6 h-6 rounded flex items-center justify-center text-white font-bold text-[10px]" style={{ backgroundColor: phaseData?.color || '#00A88A' }}>
                      {w.phase.charAt(0)}
                    </div>
                  </div>
                  <p className="text-2xl font-bold font-mono text-gray-900">{formatNaira(w.balance)}</p>
                  <p className="text-xs text-gray-400 mt-1">{w.currency}</p>
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

                    {depositMsg && (
                      <div className={cn('p-3 rounded-lg text-sm text-center', depositMsg.type === 'success' ? 'bg-[#00A88A]/10 border border-[#00A88A]/20 text-[#00A88A]' : 'bg-[#E63950]/10 border border-[#E63950]/20 text-[#E63950]')}>
                        {depositMsg.text}
                      </div>
                    )}

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
                        {[5000, 10000, 25000, 50000, 100000].map((amt) => (
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
                    <Button onClick={handleDeposit} disabled={depositLoading || !depositAmount} className="w-full bg-[#00A88A] hover:bg-[#008F74] text-white font-bold py-6 rounded-xl disabled:opacity-50">
                      {depositLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</> : `Deposit ${depositAmount ? `₦${parseFloat(depositAmount).toLocaleString()}` : 'Funds'}`}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="withdraw" className="mt-0">
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-lg text-gray-900">Withdraw Funds</h3>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">From Phase</label>
                      <Select value={withdrawPhase} onValueChange={setWithdrawPhase}><SelectTrigger className="bg-white border-gray-200 text-gray-900"><SelectValue /></SelectTrigger><SelectContent className="bg-white border-gray-200">
                        {wallets.map(w => <SelectItem key={w.id} value={w.phase} className="text-gray-900 focus:bg-gray-50">{w.phase} ({formatNaira(w.balance)})</SelectItem>)}
                      </SelectContent></Select>
                    </div>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">Amount (NGN)</label><Input type="number" placeholder="Enter amount" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="bg-white border-gray-200 text-gray-900 font-mono" /></div>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">Bank Account</label><Input placeholder="Enter account number" value={withdrawBank} onChange={(e) => setWithdrawBank(e.target.value)} className="bg-white border-gray-200 text-gray-900 font-mono" /></div>
                    <Card className="bg-gray-50 border-gray-200"><CardContent className="p-3 flex items-center justify-between text-sm"><span className="text-gray-500">Withdrawal Fee</span><span className="font-mono font-medium text-gray-900">₦100</span></CardContent></Card>
                    <Button className="w-full bg-[#E63950] hover:bg-[#c5303f] text-white font-bold py-6 rounded-xl">Withdraw {withdrawAmount ? `₦${parseFloat(withdrawAmount).toLocaleString()}` : 'Funds'}</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transfer" className="mt-0">
                <Card className="bg-white border-gray-200 shadow-sm">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-bold text-lg text-gray-900">Transfer Between Phases</h3>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">From Phase</label>
                      <Select value={transferFrom} onValueChange={setTransferFrom}><SelectTrigger className="bg-white border-gray-200 text-gray-900"><SelectValue /></SelectTrigger><SelectContent className="bg-white border-gray-200">
                        {wallets.map(w => <SelectItem key={w.id} value={w.phase} className="text-gray-900 focus:bg-gray-50">{w.phase} ({formatNaira(w.balance)})</SelectItem>)}
                      </SelectContent></Select>
                    </div>
                    <div className="flex justify-center"><div className="w-10 h-10 rounded-full bg-[#E5940A]/10 flex items-center justify-center"><ArrowLeftRight className="w-5 h-5 text-[#E5940A]" /></div></div>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">To Phase</label>
                      <Select value={transferTo} onValueChange={setTransferTo}><SelectTrigger className="bg-white border-gray-200 text-gray-900"><SelectValue /></SelectTrigger><SelectContent className="bg-white border-gray-200">
                        {wallets.map(w => <SelectItem key={w.id} value={w.phase} className="text-gray-900 focus:bg-gray-50">{w.phase}</SelectItem>)}
                      </SelectContent></Select>
                    </div>
                    <div><label className="text-xs text-gray-400 mb-1.5 block">Amount (NGN)</label><Input type="number" placeholder="Enter amount" value={transferAmount} onChange={(e) => setTransferAmount(e.target.value)} className="bg-white border-gray-200 text-gray-900 font-mono" /></div>
                    <Card className="bg-gray-50 border-gray-200"><CardContent className="p-3 flex items-center justify-between text-sm"><span className="text-gray-500">Transfer Fee</span><span className="font-mono font-medium text-[#00A88A]">Free</span></CardContent></Card>
                    <Button className="w-full bg-[#E5940A] hover:bg-[#c57f08] text-white font-bold py-6 rounded-xl">Transfer {transferAmount ? `₦${parseFloat(transferAmount).toLocaleString()}` : 'Funds'}</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
