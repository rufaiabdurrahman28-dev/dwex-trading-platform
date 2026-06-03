'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Users, TrendingUp, DollarSign, Activity, CheckCircle2, AlertCircle, Clock, Shield, Search, Eye, Lock, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'

interface AdminStats {
  totalUsers: number
  activeTraders: number
  totalVolume: number
  totalDeposits: number
}

interface AdminUser {
  id: string
  email: string
  full_name: string
  role: string
  kyc_status: string
  is_active: boolean
  created_at: string
}

interface BrokerStatus {
  name: string
  status: 'online' | 'degraded' | 'offline'
  uptime: string
  latency: string
  connections: number
}

interface Transaction {
  id: string
  user: string
  type: string
  amount: string
  status: string
  time: string
}

const brokerStatus: BrokerStatus[] = [
  { name: 'Deriv Phase', status: 'online', uptime: '99.9%', latency: '45ms', connections: 2841 },
  { name: 'Wise Phase', status: 'online', uptime: '99.8%', latency: '62ms', connections: 1205 },
  { name: 'Eversend Phase', status: 'degraded', uptime: '98.5%', latency: '180ms', connections: 432 },
  { name: 'OctaFX Phase', status: 'offline', uptime: '0%', latency: '-', connections: 0 },
]

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }) }

export default function AdminPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading } = useAuth()
  const [userSearch, setUserSearch] = useState('')
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  // SECURITY: Double-check admin role on client side
  useEffect(() => {
    if (!authLoading) {
      if (!user || !profile) {
        router.replace('/login')
        return
      }
      if (profile.role !== 'admin') {
        router.replace('/wallet')
        return
      }
      setIsAuthorized(true)
      setAuthChecked(true)
    }
  }, [authLoading, user, profile, router])

  // Fetch admin data from API
  useEffect(() => {
    if (!isAuthorized) return

    async function fetchAdminData() {
      try {
        // Fetch stats
        const statsRes = await fetch('/api/admin/stats')
        if (statsRes.status === 401 || statsRes.status === 403) {
          router.replace('/login')
          return
        }
        if (statsRes.ok) {
          const statsData = await statsRes.json()
          if (statsData.data?.stats) {
            const s = statsData.data.stats
            setStats({
              totalUsers: s.totalUsers || 0,
              activeTraders: s.activeUsers || 0,
              totalVolume: s.totalDeposits || 0,
              totalDeposits: s.totalWalletBalance || 0,
            })
          }
        }

        // Fetch users
        const usersRes = await fetch('/api/admin/users')
        if (usersRes.ok) {
          const usersData = await usersRes.json()
          if (usersData.data?.users) {
            setUsers(usersData.data.users)
          }
        }
      } catch (err) {
        console.error('[DWEX Admin] Failed to fetch data:', err)
      } finally {
        setDataLoading(false)
      }
    }

    fetchAdminData()
  }, [isAuthorized, router])

  // Don't render anything until auth is verified
  if (authLoading || !authChecked) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#00A88A] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Verifying access...</p>
        </div>
      </div>
    )
  }

  // Not authorized — show access denied
  if (!isAuthorized) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <Lock className="w-12 h-12 text-[#E63950]" />
          <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
          <p className="text-gray-500 text-sm">You don't have permission to access this page.</p>
          <Button onClick={() => router.replace('/wallet')} className="bg-[#00A88A] hover:bg-[#009077] text-white mt-2">
            Go to Wallet
          </Button>
        </div>
      </div>
    )
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount)
  }

  const overviewStats = stats ? [
    { label: 'Total Users', value: stats.totalUsers.toLocaleString(), change: '+5.2%', icon: Users, color: '#00A88A' },
    { label: 'Active Traders', value: stats.activeTraders.toLocaleString(), change: '+8.1%', icon: TrendingUp, color: '#00A88A' },
    { label: 'Total Volume', value: formatCurrency(stats.totalVolume), change: '+12.3%', icon: DollarSign, color: '#E5940A' },
    { label: 'Total Deposits', value: formatCurrency(stats.totalDeposits), change: '+7.8%', icon: Activity, color: '#00A88A' },
  ] : [
    { label: 'Total Users', value: '—', change: '—', icon: Users, color: '#00A88A' },
    { label: 'Active Traders', value: '—', change: '—', icon: TrendingUp, color: '#00A88A' },
    { label: 'Total Volume', value: '—', change: '—', icon: DollarSign, color: '#E5940A' },
    { label: 'Total Deposits', value: '—', change: '—', icon: Activity, color: '#00A88A' },
  ]

  const filteredUsers = users.filter((u) =>
    u.full_name?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email?.toLowerCase().includes(userSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen pt-20 pb-12 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00A88A]/10 flex items-center justify-center"><Shield className="w-5 h-5 text-[#00A88A]" /></div>
              <div><h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1><p className="text-gray-500 text-sm">System overview and management</p></div>
            </div>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4" /> Refresh
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {overviewStats.map((stat, i) => { const Icon = stat.icon; return (
            <motion.div key={stat.label} variants={fadeUp} custom={i}>
              <Card className="bg-white border-gray-200 shadow-sm"><CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}><Icon className="w-4 h-4" style={{ color: stat.color }} /></div><span className="text-xs text-gray-400">{stat.label}</span></div>
                <p className="text-2xl font-bold font-mono text-gray-900">{stat.value}</p>
                <p className="text-xs text-[#00A88A] font-mono mt-0.5">{stat.change}</p>
              </CardContent></Card>
            </motion.div>
          )})}
        </motion.div>

        {/* Broker Status & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-lg font-bold mb-4 text-gray-900">Broker Status</h2>
            <div className="space-y-3">
              {brokerStatus.map((broker) => (
                <Card key={broker.name} className="bg-white border-gray-200 shadow-sm"><CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2"><div className={cn('w-2.5 h-2.5 rounded-full', broker.status === 'online' ? 'bg-[#00A88A] animate-pulse' : broker.status === 'degraded' ? 'bg-[#E5940A] animate-pulse' : 'bg-[#E63950]')} /><span className="font-semibold text-sm text-gray-900">{broker.name}</span></div>
                    <Badge variant="outline" className={cn('text-[10px] px-1.5 border-0', broker.status === 'online' ? 'bg-[#00A88A]/10 text-[#00A88A]' : broker.status === 'degraded' ? 'bg-[#E5940A]/10 text-[#E5940A]' : 'bg-[#E63950]/10 text-[#E63950]')}>{broker.status}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs"><div><span className="text-gray-400">Uptime</span><p className="font-mono font-medium text-gray-900">{broker.uptime}</p></div><div><span className="text-gray-400">Latency</span><p className="font-mono font-medium text-gray-900">{broker.latency}</p></div><div><span className="text-gray-400">Users</span><p className="font-mono font-medium text-gray-900">{broker.connections.toLocaleString()}</p></div></div>
                </CardContent></Card>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Recent Activity</h2>
            <Card className="bg-white border-gray-200 overflow-hidden shadow-sm">
              <CardContent className="p-6 text-center text-gray-400">
                {dataLoading ? (
                  <div className="flex items-center justify-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Loading...</div>
                ) : transactions.length > 0 ? (
                  <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">User</th><th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Type</th><th className="text-right py-3 px-4 text-xs text-gray-400 font-medium">Amount</th><th className="text-center py-3 px-4 text-xs text-gray-400 font-medium">Status</th><th className="text-right py-3 px-4 text-xs text-gray-400 font-medium">Time</th></tr></thead>
                    <tbody>{transactions.map((tx) => (<tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-xs text-gray-900">{tx.user}</td>
                      <td className="py-3 px-4 text-xs text-gray-500">{tx.type}</td>
                      <td className="py-3 px-4 text-right font-mono text-xs font-medium text-gray-900">{tx.amount}</td>
                      <td className="py-3 px-4 text-center"><Badge variant="outline" className={cn('text-[10px] px-1.5 border-0', tx.status === 'completed' ? 'bg-[#00A88A]/10 text-[#00A88A]' : tx.status === 'pending' ? 'bg-[#E5940A]/10 text-[#E5940A]' : 'bg-gray-100 text-gray-500')}>{tx.status}</Badge></td>
                      <td className="py-3 px-4 text-right text-xs text-gray-400">{tx.time}</td>
                    </tr>))}</tbody>
                  </table></div>
                ) : (
                  <div className="py-8">
                    <Activity className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No transactions yet</p>
                    <p className="text-xs text-gray-300">Transactions will appear here once users start trading</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Users Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-gray-900">Users</h2>
            <div className="relative w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input placeholder="Search users..." value={userSearch} onChange={(e) => setUserSearch(e.target.value)} className="pl-10 bg-white border-gray-200 text-gray-900 text-sm" /></div>
          </div>
          <Card className="bg-white border-gray-200 overflow-hidden shadow-sm">
            {dataLoading ? (
              <CardContent className="p-6 text-center text-gray-400">
                <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2" /> Loading users...
              </CardContent>
            ) : filteredUsers.length > 0 ? (
              <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Name</th><th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Email</th><th className="text-center py-3 px-4 text-xs text-gray-400 font-medium">KYC</th><th className="text-left py-3 px-4 text-xs text-gray-400 font-medium">Role</th><th className="text-center py-3 px-4 text-xs text-gray-400 font-medium">Status</th><th className="text-right py-3 px-4 text-xs text-gray-400 font-medium">Joined</th><th className="text-right py-3 px-4 text-xs text-gray-400 font-medium">Actions</th></tr></thead>
                <tbody>{filteredUsers.map((u) => (<tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-xs text-gray-900">{u.full_name || '—'}</td>
                  <td className="py-3 px-4 text-xs text-gray-500">{u.email}</td>
                  <td className="py-3 px-4 text-center"><Badge variant="outline" className={cn('text-[10px] px-1.5 border-0', u.kyc_status === 'verified' ? 'bg-[#00A88A]/10 text-[#00A88A]' : u.kyc_status === 'pending' ? 'bg-[#E5940A]/10 text-[#E5940A]' : u.kyc_status === 'rejected' ? 'bg-[#E63950]/10 text-[#E63950]' : 'bg-gray-100 text-gray-500')}>{u.kyc_status === 'verified' && <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />}{u.kyc_status === 'pending' && <Clock className="w-2.5 h-2.5 mr-0.5" />}{u.kyc_status === 'rejected' && <AlertCircle className="w-2.5 h-2.5 mr-0.5" />}{u.kyc_status || 'none'}</Badge></td>
                  <td className="py-3 px-4 text-xs"><Badge variant="outline" className={cn('text-[10px] px-1.5 border-0', u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500')}>{u.role}</Badge></td>
                  <td className="py-3 px-4 text-center"><Badge variant="outline" className={cn('text-[10px] px-1.5 border-0', u.is_active ? 'bg-[#00A88A]/10 text-[#00A88A]' : 'bg-[#E63950]/10 text-[#E63950]')}>{u.is_active ? 'active' : 'inactive'}</Badge></td>
                  <td className="py-3 px-4 text-right text-xs text-gray-400">{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-right"><Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-gray-100"><Eye className="w-3.5 h-3.5 text-gray-400" /></Button></td>
                </tr>))}</tbody>
              </table></div>
            ) : (
              <CardContent className="p-6 text-center text-gray-400">
                <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No users found</p>
              </CardContent>
            )}
          </Card>
        </motion.div>

        {/* Defense in Depth — Security Layers */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-[#00A88A]" />
            <h2 className="text-lg font-bold text-gray-900">Defense in Depth</h2>
            <Badge className="bg-[#00A88A]/10 text-[#00A88A] border-0 text-[10px]">5 Layers Active</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            <Card className="bg-[#00A88A]/5 border-[#00A88A]/20 shadow-sm"><CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2"><div className="w-6 h-6 rounded-full bg-[#00A88A] text-white text-xs flex items-center justify-center font-bold">0</div><span className="text-xs font-semibold text-gray-900">Request Filter</span></div>
              <p className="text-sm font-semibold text-[#00A88A]">Active</p>
              <p className="text-[10px] text-gray-400">Blocks bots, SQLi, XSS, scanners before they reach auth</p>
            </CardContent></Card>
            <Card className="bg-[#00A88A]/5 border-[#00A88A]/20 shadow-sm"><CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2"><div className="w-6 h-6 rounded-full bg-[#00A88A] text-white text-xs flex items-center justify-center font-bold">1</div><span className="text-xs font-semibold text-gray-900">Auth Gate</span></div>
              <p className="text-sm font-semibold text-[#00A88A]">Active</p>
              <p className="text-[10px] text-gray-400">Session required via Supabase Auth + JWT validation</p>
            </CardContent></Card>
            <Card className="bg-[#00A88A]/5 border-[#00A88A]/20 shadow-sm"><CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2"><div className="w-6 h-6 rounded-full bg-[#00A88A] text-white text-xs flex items-center justify-center font-bold">2</div><span className="text-xs font-semibold text-gray-900">Role Check</span></div>
              <p className="text-sm font-semibold text-[#00A88A]">Active</p>
              <p className="text-[10px] text-gray-400">Admin role verified in middleware, client, AND API</p>
            </CardContent></Card>
            <Card className="bg-[#00A88A]/5 border-[#00A88A]/20 shadow-sm"><CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2"><div className="w-6 h-6 rounded-full bg-[#00A88A] text-white text-xs flex items-center justify-center font-bold">3</div><span className="text-xs font-semibold text-gray-900">Security Headers</span></div>
              <p className="text-sm font-semibold text-[#00A88A]">Active</p>
              <p className="text-[10px] text-gray-400">CSP, X-Frame-Options, nosniff, Referrer-Policy</p>
            </CardContent></Card>
            <Card className="bg-[#E5940A]/5 border-[#E5940A]/20 shadow-sm"><CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2"><div className="w-6 h-6 rounded-full bg-[#E5940A] text-white text-xs flex items-center justify-center font-bold">4</div><span className="text-xs font-semibold text-gray-900">Rate Limiting</span></div>
              <p className="text-sm font-semibold text-[#E5940A]">Active</p>
              <p className="text-[10px] text-gray-400">5 login/15min, 3 signup/hr, auto-block after limit</p>
            </CardContent></Card>
          </div>

          {/* Attack scenario table */}
          <Card className="mt-4 bg-white border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <h3 className="text-xs font-semibold text-gray-700">What happens if an attacker tries...</h3>
            </div>
            <div className="overflow-x-auto"><table className="w-full text-xs">
              <thead><tr className="border-b border-gray-200">
                <th className="text-left py-2.5 px-4 text-gray-400 font-medium">Attack</th>
                <th className="text-left py-2.5 px-4 text-gray-400 font-medium">Layer 0</th>
                <th className="text-left py-2.5 px-4 text-gray-400 font-medium">Layer 1</th>
                <th className="text-left py-2.5 px-4 text-gray-400 font-medium">Layer 2</th>
                <th className="text-left py-2.5 px-4 text-gray-400 font-medium">Layer 3</th>
                <th className="text-center py-2.5 px-4 text-gray-400 font-medium">Result</th>
              </tr></thead>
              <tbody>
                <tr className="border-b border-gray-100"><td className="py-2.5 px-4 font-medium text-gray-900">SQLi in URL</td><td className="py-2.5 px-4"><Badge className="bg-[#E63950]/10 text-[#E63950] border-0 text-[9px]">BLOCKED</Badge></td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-center"><Badge className="bg-[#00A88A]/10 text-[#00A88A] border-0 text-[9px]">400 Bad Request</Badge></td></tr>
                <tr className="border-b border-gray-100"><td className="py-2.5 px-4 font-medium text-gray-900">Visit /admin no auth</td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4"><Badge className="bg-[#E63950]/10 text-[#E63950] border-0 text-[9px]">BLOCKED</Badge></td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-center"><Badge className="bg-[#00A88A]/10 text-[#00A88A] border-0 text-[9px]">→ /login</Badge></td></tr>
                <tr className="border-b border-gray-100"><td className="py-2.5 px-4 font-medium text-gray-900">Trader visits /admin</td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-green-400">pass</td><td className="py-2.5 px-4"><Badge className="bg-[#E63950]/10 text-[#E63950] border-0 text-[9px]">BLOCKED</Badge></td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-center"><Badge className="bg-[#00A88A]/10 text-[#00A88A] border-0 text-[9px]">→ /wallet</Badge></td></tr>
                <tr className="border-b border-gray-100"><td className="py-2.5 px-4 font-medium text-gray-900">Brute force login</td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-green-400">pass</td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-green-400">pass</td><td className="py-2.5 px-4 text-center"><Badge className="bg-[#E5940A]/10 text-[#E5940A] border-0 text-[9px]">429 Rate Limited</Badge></td></tr>
                <tr className="border-b border-gray-100"><td className="py-2.5 px-4 font-medium text-gray-900">Bot scanner (sqlmap)</td><td className="py-2.5 px-4"><Badge className="bg-[#E63950]/10 text-[#E63950] border-0 text-[9px]">BLOCKED</Badge></td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-center"><Badge className="bg-[#00A88A]/10 text-[#00A88A] border-0 text-[9px]">403 Forbidden</Badge></td></tr>
                <tr><td className="py-2.5 px-4 font-medium text-gray-900">XSS in URL params</td><td className="py-2.5 px-4"><Badge className="bg-[#E63950]/10 text-[#E63950] border-0 text-[9px]">BLOCKED</Badge></td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-gray-300">—</td><td className="py-2.5 px-4 text-center"><Badge className="bg-[#00A88A]/10 text-[#00A88A] border-0 text-[9px]">400 Bad Request</Badge></td></tr>
              </tbody>
            </table></div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
