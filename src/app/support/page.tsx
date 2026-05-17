'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
  BookOpen,
  Wallet,
  Shield,
  Settings,
  TrendingUp,
  ChevronDown,
  Send,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

/* ── Mock FAQ Data ── */
const faqs = [
  {
    question: 'How do I deposit funds into my DWEX wallet?',
    answer: 'Navigate to the Wallet page, select the "Deposit" tab, choose your preferred trading phase, enter the amount, and select a payment method (Bank Transfer, Paystack, USSD, or Crypto). Follow the on-screen instructions to complete your deposit.',
  },
  {
    question: 'What is a Trading Phase?',
    answer: 'A Trading Phase is created when you connect a broker account to DWEX. Each phase gives you access to that broker\'s assets, pricing, and execution. You can have multiple phases active simultaneously and transfer positions between them.',
  },
  {
    question: 'How do I withdraw my funds?',
    answer: 'Go to the Wallet page, select the "Withdraw" tab, choose the phase to withdraw from, enter the amount and your bank account details. Withdrawals typically process within 24 hours. A small fee of ₦100 applies.',
  },
  {
    question: 'What is the RAWTIN rate?',
    answer: 'RAWTIN (Rate According to Window Tin) is the exchange rate used by DWEX for converting between Naira and other currencies. Each broker phase may have a slightly different RAWTIN rate based on their pricing.',
  },
  {
    question: 'How do I complete KYC verification?',
    answer: 'Navigate to the KYC page and complete the 4-step verification process: Personal Information, ID Verification, Selfie/Liveness Check, and Proof of Address. KYC is required to unlock full trading features and higher withdrawal limits.',
  },
  {
    question: 'Can I transfer positions between brokers?',
    answer: 'Yes! One of DWEX\'s key features is position transfer. You can move open positions between connected broker phases without closing and reopening the trade. Go to Portfolio and select the position you want to transfer.',
  },
  {
    question: 'What assets can I trade on DWEX?',
    answer: 'DWEX offers 1,500+ assets across Forex, Stocks, Crypto, Commodities, Indices, ETFs, and Synthetics. The exact assets available depend on which broker phases you have connected.',
  },
  {
    question: 'How secure is my account?',
    answer: 'DWEX uses two-layer security: platform-level security (2FA, encryption, secure sessions) and broker-level security. We also offer transaction PINs for withdrawals. Your funds are held with regulated brokers, not by DWEX directly.',
  },
  {
    question: 'What are the trading fees?',
    answer: 'DWEX charges no commission on trades. Spreads are determined by the connected broker. Deposits are free via bank transfer, and withdrawals incur a flat ₦100 fee. Internal transfers between phases are free.',
  },
  {
    question: 'How do I connect a new broker?',
    answer: 'Go to the Trading Phases page, find the broker you want to connect, and click "Connect". You\'ll be redirected to authorize the connection. Some brokers may require additional KYC verification.',
  },
]

const helpCategories = [
  { icon: BookOpen, title: 'Getting Started', desc: 'Account setup, first deposit, and basic navigation', color: '#00D4AA' },
  { icon: TrendingUp, title: 'Trading', desc: 'Placing orders, reading charts, and managing positions', color: '#33DDBB' },
  { icon: Wallet, title: 'Wallet', desc: 'Deposits, withdrawals, and transfers', color: '#F5A623' },
  { icon: Shield, title: 'Account & Security', desc: 'KYC, 2FA, password reset, and account protection', color: '#00D4AA' },
  { icon: Settings, title: 'Settings', desc: 'Preferences, notifications, and account management', color: '#94A3B8' },
]

export default function SupportPage() {
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactSubject, setContactSubject] = useState('')
  const [contactMessage, setContactMessage] = useState('')

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Help & Support</h1>
          <p className="text-slate-400">Find answers, get help, or contact our support team</p>
        </motion.div>

        {/* Help Categories */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {helpCategories.map((cat) => {
            const Icon = cat.icon
            return (
              <Card key={cat.title} className="bg-[#162D50] border-white/[0.06] card-hover cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${cat.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: cat.color }} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{cat.title}</h3>
                  <p className="text-xs text-slate-500">{cat.desc}</p>
                </CardContent>
              </Card>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* FAQ Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#00D4AA]" />
              Frequently Asked Questions
            </h2>
            <Card className="bg-[#162D50] border-white/[0.06] rounded-2xl">
              <CardContent className="p-4 sm:p-6">
                <Accordion type="single" collapsible className="space-y-1">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border-white/[0.06] px-2">
                      <AccordionTrigger className="text-sm font-medium text-left hover:text-[#00D4AA] hover:no-underline py-3">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-slate-400 leading-relaxed pb-3">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 space-y-6">
            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#00D4AA]" />
                Contact Us
              </h2>
              <Card className="bg-[#162D50] border-white/[0.06] rounded-2xl">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Name</label>
                    <Input placeholder="Your name" value={contactName} onChange={(e) => setContactName(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-slate-600" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Email</label>
                    <Input type="email" placeholder="you@example.com" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-slate-600" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Subject</label>
                    <Select value={contactSubject} onValueChange={setContactSubject}>
                      <SelectTrigger className="bg-white/[0.06] border-white/[0.08] text-white">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#162D50] border-white/[0.08]">
                        <SelectItem value="deposit" className="text-white focus:bg-white/[0.08]">Deposit Issue</SelectItem>
                        <SelectItem value="withdrawal" className="text-white focus:bg-white/[0.08]">Withdrawal Issue</SelectItem>
                        <SelectItem value="trading" className="text-white focus:bg-white/[0.08]">Trading Issue</SelectItem>
                        <SelectItem value="kyc" className="text-white focus:bg-white/[0.08]">KYC Verification</SelectItem>
                        <SelectItem value="account" className="text-white focus:bg-white/[0.08]">Account Issue</SelectItem>
                        <SelectItem value="other" className="text-white focus:bg-white/[0.08]">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Message</label>
                    <Textarea placeholder="Describe your issue..." value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-slate-600 min-h-[100px]" />
                  </div>
                  <Button className="w-full bg-[#00D4AA] hover:bg-[#00A888] text-[#0A1628] font-bold py-5 rounded-xl glow-dwex-strong">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Live Chat */}
            <Card className="bg-[#162D50] border-white/[0.06] rounded-2xl">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[#00D4AA]/10 flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-7 h-7 text-[#00D4AA]" />
                </div>
                <h3 className="font-bold mb-1">Live Chat</h3>
                <p className="text-xs text-slate-400 mb-4">Chat with our support team in real-time</p>
                <Button className="bg-[#00D4AA] hover:bg-[#00A888] text-[#0A1628] font-bold rounded-xl">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-[#162D50] border-white/[0.06] rounded-2xl">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-300">support@dwex.io</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-300">+234 800 DWEX HELP</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-300">t.me/dwexsupport</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
