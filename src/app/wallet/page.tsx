'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw' | 'transfer'>('deposit')
  const [depositMethod, setDepositMethod] = useState('paystack')
  const [amount, setAmount] = useState('')

  const nairaBalance = 250000
  const usdBalance = 161.29
  const btcBalance = 0.0025

  const transactions = [
    { type: 'deposit', method: 'Paystack', amount: '+₦50,000', time: '2 hours ago', status: 'completed' },
    { type: 'transfer', method: 'To @abdul', amount: '-₦5,000', time: '5 hours ago', status: 'completed' },
    { type: 'received', method: 'From @sadiq', amount: '+₦10,000', time: '1 day ago', status: 'completed' },
    { type: 'withdraw', method: 'GTBank', amount: '-₦20,000', time: '2 days ago', status: 'completed' },
    { type: 'deposit', method: 'BTC', amount: '+₦30,000', time: '3 days ago', status: 'completed' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="bg-[#0d0d15] border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition">← Back</Link>
            <span className="font-bold text-lg">Wallet</span>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#1a1a2e] rounded-xl p-4 border border-white/5 text-center">
            <p className="text-xs text-gray-500 mb-1">Naira</p>
            <p className="text-lg font-bold">₦{nairaBalance.toLocaleString()}</p>
          </div>
          <div className="bg-[#1a1a2e] rounded-xl p-4 border border-white/5 text-center">
            <p className="text-xs text-gray-500 mb-1">USD</p>
            <p className="text-lg font-bold">${usdBalance}</p>
          </div>
          <div className="bg-[#1a1a2e] rounded-xl p-4 border border-white/5 text-center">
            <p className="text-xs text-gray-500 mb-1">BTC</p>
            <p className="text-lg font-bold">{btcBalance}</p>
          </div>
        </div>

        <div className="flex rounded-xl overflow-hidden bg-[#1a1a2e] border border-white/5">
          {(['deposit', 'withdraw', 'transfer'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 font-semibold text-sm transition ${
                activeTab === tab ? 'bg-emerald-500 text-black' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'deposit' && (
          <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/5 space-y-4">
            <h3 className="font-semibold">Deposit to Your Wallet</h3>
            <div className="space-y-2">
              {[
                { id: 'paystack', label: 'Paystack (Card/Bank)', icon: '💳' },
                { id: 'bank', label: 'Bank Transfer', icon: '🏦' },
                { id: 'ussd', label: 'USSD Code', icon: '📱' },
                { id: 'crypto', label: 'Crypto (BTC/ETH/USDT)', icon: '₿' },
                { id: 'opay', label: 'OPay / PalmPay', icon: '📲' },
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setDepositMethod(method.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition ${
                    depositMethod === method.id ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <span className="text-xl">{method.icon}</span>
                  <span className="text-sm">{method.label}</span>
                </button>
              ))}
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Amount (₦)</label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <div className="flex gap-2">
              {['1000', '5000', '10000', '50000', '100000'].map(amt => (
                <button key={amt} onClick={() => setAmount(amt)} className="flex-1 py-2 text-xs bg-white/5 rounded hover:bg-white/10 transition">
                  ₦{parseInt(amt).toLocaleString()}
                </button>
              ))}
            </div>
            {depositMethod === 'bank' && (
              <div className="bg-[#0d0d15] rounded-lg p-4 text-sm space-y-2">
                <p className="font-semibold text-emerald-400">9mach Trade Bank Details</p>
                <p><span className="text-gray-500">Bank:</span> GTBank</p>
                <p><span className="text-gray-500">Account:</span> 9mach Trade Ltd</p>
                <p><span className="text-gray-500">Acct No:</span> 0123456789</p>
              </div>
            )}
            {depositMethod === 'crypto' && (
              <div className="bg-[#0d0d15] rounded-lg p-4 text-sm space-y-2">
                <p className="font-semibold text-emerald-400">USDT (TRC20) Address</p>
                <p className="font-mono text-xs break-all text-gray-300">TXrzKf2o4DqA7vV8kL3bN5mP9sR2wE6yU8iO1pQ3t</p>
                <button className="text-xs text-emerald-400">Copy Address</button>
              </div>
            )}
            {depositMethod === 'ussd' && (
              <div className="bg-[#0d0d15] rounded-lg p-4 text-sm space-y-2">
                <p className="font-semibold text-emerald-400">USSD Codes</p>
                <p><span className="text-gray-500">GTBank:</span> *737*Amount#</p>
                <p><span className="text-gray-500">Access:</span> *901*Amount#</p>
                <p><span className="text-gray-500">UBA:</span> *919*Amount#</p>
              </div>
            )}
            <button className="w-full bg-emerald-500 text-black font-bold py-4 rounded-xl hover:bg-emerald-600 transition">
              Deposit ₦{amount ? parseInt(amount).toLocaleString() : '0'}
            </button>
          </div>
        )}

        {activeTab === 'withdraw' && (
          <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/5 space-y-4">
            <h3 className="font-semibold">Withdraw to Bank</h3>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Bank</label>
              <select className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm">
                <option>GTBank</option><option>Access Bank</option><option>UBA</option><option>Zenith Bank</option><option>First Bank</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Account Number</label>
              <input type="text" placeholder="Enter account number" className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Amount (₦)</label>
              <input type="number" placeholder="Enter amount" className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50" />
            </div>
            <button className="w-full bg-red-500 text-white font-bold py-4 rounded-xl hover:bg-red-600 transition">Withdraw</button>
          </div>
        )}

        {activeTab === 'transfer' && (
          <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/5 space-y-4">
            <h3 className="font-semibold">Transfer to 9mach User</h3>
            <p className="text-xs text-emerald-400">✅ Zero fees — instant transfer!</p>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Recipient</label>
              <input type="text" placeholder="@username or 08012345678" className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Amount (₦)</label>
              <input type="number" placeholder="Enter amount" className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Note (optional)</label>
              <input type="text" placeholder="For BTC trading" className="w-full bg-[#0d0d15] border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50" />
            </div>
            <button className="w-full bg-emerald-500 text-black font-bold py-4 rounded-xl hover:bg-emerald-600 transition">Send ₦ Instantly</button>
          </div>
        )}

        <div className="bg-[#1a1a2e] rounded-xl p-5 border border-white/5">
          <h3 className="font-semibold mb-3">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    tx.type === 'deposit' || tx.type === 'received' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {tx.type === 'deposit' ? '↓' : tx.type === 'received' ? '↓' : tx.type === 'withdraw' ? '↑' : '→'}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.method}</p>
                    <p className="text-xs text-gray-500">{tx.time}</p>
                  </div>
                </div>
                <span className={`font-semibold text-sm ${tx.type === 'deposit' || tx.type === 'received' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
