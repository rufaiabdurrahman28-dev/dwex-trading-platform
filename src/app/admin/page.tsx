'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  TrendingUp,
  DollarSign,
  Activity,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  Search,
  Eye,
  MoreHorizontal,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

/* ── Mock Data ── */
const overviewStats = [
  { label: 'Total Users', value: '12,847', change: '+5.2%', icon: Users, color: '#00D4AA' },
  { label: 'Active Traders', value: '3,241', change: '+8.1%', icon: TrendingUp, color: '#33DDBB' },
  { label: 'Total Volume', value: '$24.5M', change: '+12.3%', icon: DollarSign, color: '#F5A623' },
  { label: 'Total Deposits', value: '₦2.1B', change: '+7.8%', icon: Activity, color: '#00D4AA' },
]

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', kyc: 'verified', phase: 'Deriv + Wise', balance: '₦205,000', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', kyc: 'verified', phase: 'Deriv', balance: '₦75,000', status: 'active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', kyc: 'pending', phase: 'Wise', balance: '₦30,000', status: 'active' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', kyc: 'verified', phase: 'All Phases', balance: '₦450,000', status: 'active' },
  { id: 5, name: 'Charlie Lee', email: 'charlie@example.com', kyc: 'not_started', phase: 'Deriv', balance: '₦0', status: 'inactive' },
  { id: 6, name: 'Diana Ross', email: 'diana@example.com', kyc: 'verified', phase: 'Eversend', balance: '₦120,000', status: 'active' },
  { id: 7, name: 'Edward Kim', email: 'edward@example.com', kyc: 'rejected', phase: '-', balance: '₦0', status: 'suspended' },
  { id: 8, name: 'Fiona Chen', email: 'fiona@example.com', kyc: 'verified', phase: 'Deriv + Eversend', balance: '₦180,000', status: 'active' },
]

const brokerStatus = [
  { name: 'Deriv Phase', status: 'online', uptime: '99.9%', latency: '45ms', connections: 2841 },
  { name: 'Wise Phase', status: 'online', uptime: '99.8%', latency: '62ms', connections: 1205 },
  { name: 'Eversend Phase', status: 'degraded', uptime: '98.5%', latency: '180ms', connections: 432 },
  { name: 'OctaFX Phase', status: 'offline', uptime: '0%', latency: '-', connections: 0 },
]

const recentTransactions = [
  { id: 1, user: 'John Doe', type: 'Deposit', amount: '₦50,000', status: 'completed', time: '2 min ago' },
  { id: 2, user: 'Jane Smith', type: 'Withdrawal', amount: '₦20,000', status: 'pending', time: '5 min ago' },
  { id: 3, user: 'Alice Brown', type: 'Trade Profit', amount: '₦3,500', status: 'completed', time: '12 min ago' },
  { id: 4, user: 'Bob Wilson', type: 'Deposit', amount: '₦100,000', status: 'processing', time: '18 min ago' },
  { id: 5, user: 'Fiona Chen', type: 'Transfer', amount: '₦30,000', status: 'completed', time: '25 min ago' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
}

export default function AdminPage() {
  const [userSearch, setUserSearch] = useState('')

  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00D4AA]/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#00D4AA]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-slate-400 text-sm">System overview and management</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {overviewStats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div key={stat.label} variants={fadeUp} custom={i}>
                <Card className="bg-[#162D50] border-white/[0.06]">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                        <Icon className="w-4 h-4" style={{ color: stat.color }} />
                      </div>
                      <span className="text-xs text-slate-500">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-bold font-mono">{stat.value}</p>
                    <p className="text-xs text-[#00D4AA] font-mono mt-0.5">{stat.change}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Broker Status */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-lg font-bold mb-4">Broker Status</h2>
            <div className="space-y-3">
              {brokerStatus.map((broker) => (
                <Card key={broker.name} className="bg-[#162D50] border-white/[0.06]">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'w-2.5 h-2.5 rounded-full',
                          broker.status === 'online' ? 'bg-[#00D4AA] animate-pulse-green' :
                          broker.status === 'degraded' ? 'bg-[#F5A623] animate-pulse' :
                          'bg-[#FF4D6A]'
                        )} />
                        <span className="font-semibold text-sm">{broker.name}</span>
                      </div>
                      <Badge variant="outline" className={cn(
                        'text-[10px] px-1.5 border-0',
                        broker.status === 'online' ? 'bg-[#00D4AA]/10 text-[#00D4AA]' :
                        broker.status === 'degraded' ? 'bg-[#F5A623]/10 text-[#F5A623]' :
                        'bg-[#FF4D6A]/10 text-[#FF4D6A]'
                      )}>
                        {broker.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div><span className="text-slate-500">Uptime</span><p className="font-mono font-medium">{broker.uptime}</p></div>
                      <div><span className="text-slate-500">Latency</span><p className="font-mono font-medium">{broker.latency}</p></div>
                      <div><span className="text-slate-500">Users</span><p className="font-mono font-medium">{broker.connections.toLocaleString()}</p></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2">
            <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
            <Card className="bg-[#162D50] border-white/[0.06] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left py-3 px-4 text-xs text-slate-500 font-medium">User</th>
                      <th className="text-left py-3 px-4 text-xs text-slate-500 font-medium">Type</th>
                      <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">Amount</th>
                      <th className="text-center py-3 px-4 text-xs text-slate-500 font-medium">Status</th>
                      <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                        <td className="py-3 px-4 font-medium text-xs">{tx.user}</td>
                        <td className="py-3 px-4 text-xs text-slate-400">{tx.type}</td>
                        <td className="py-3 px-4 text-right font-mono text-xs font-medium">{tx.amount}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant="outline" className={cn(
                            'text-[10px] px-1.5 border-0',
                            tx.status === 'completed' ? 'bg-[#00D4AA]/10 text-[#00D4AA]' :
                            tx.status === 'pending' ? 'bg-[#F5A623]/10 text-[#F5A623]' :
                            'bg-white/[0.06] text-slate-400'
                          )}>
                            {tx.status === 'completed' && <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />}
                            {tx.status === 'pending' && <Clock className="w-2.5 h-2.5 mr-0.5" />}
                            {tx.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right text-xs text-slate-500">{tx.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Users Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Users</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="pl-10 bg-white/[0.06] border-white/[0.08] text-white text-sm"
              />
            </div>
          </div>
          <Card className="bg-[#162D50] border-white/[0.06] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-3 px-4 text-xs text-slate-500 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-xs text-slate-500 font-medium">Email</th>
                    <th className="text-center py-3 px-4 text-xs text-slate-500 font-medium">KYC</th>
                    <th className="text-left py-3 px-4 text-xs text-slate-500 font-medium">Phase</th>
                    <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">Balance</th>
                    <th className="text-center py-3 px-4 text-xs text-slate-500 font-medium">Status</th>
                    <th className="text-right py-3 px-4 text-xs text-slate-500 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-medium text-xs">{user.name}</td>
                      <td className="py-3 px-4 text-xs text-slate-400">{user.email}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="outline" className={cn(
                          'text-[10px] px-1.5 border-0',
                          user.kyc === 'verified' ? 'bg-[#00D4AA]/10 text-[#00D4AA]' :
                          user.kyc === 'pending' ? 'bg-[#F5A623]/10 text-[#F5A623]' :
                          user.kyc === 'rejected' ? 'bg-[#FF4D6A]/10 text-[#FF4D6A]' :
                          'bg-white/[0.06] text-slate-400'
                        )}>
                          {user.kyc === 'verified' && <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" />}
                          {user.kyc === 'pending' && <Clock className="w-2.5 h-2.5 mr-0.5" />}
                          {user.kyc === 'rejected' && <AlertCircle className="w-2.5 h-2.5 mr-0.5" />}
                          {user.kyc === 'not_started' ? 'Not Started' : user.kyc.charAt(0).toUpperCase() + user.kyc.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-400">{user.phase}</td>
                      <td className="py-3 px-4 text-right font-mono text-xs font-medium">{user.balance}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="outline" className={cn(
                          'text-[10px] px-1.5 border-0',
                          user.status === 'active' ? 'bg-[#00D4AA]/10 text-[#00D4AA]' :
                          user.status === 'suspended' ? 'bg-[#FF4D6A]/10 text-[#FF4D6A]' :
                          'bg-white/[0.06] text-slate-400'
                        )}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-white/[0.06]">
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                        </Button>
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
