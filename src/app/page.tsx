'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  BarChart3,
  Wallet,
  Layers,
  ArrowRightLeft,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { phases } from '@/lib/assets'

/* ── Mock ticker data ── */
const tickerItems = [
  { symbol: 'BTC/USD', price: '67,245.30', change: '+2.14%', up: true },
  { symbol: 'ETH/USD', price: '3,521.80', change: '+1.87%', up: true },
  { symbol: 'EUR/USD', price: '1.0842', change: '-0.12%', up: false },
  { symbol: 'GBP/USD', price: '1.2654', change: '+0.08%', up: true },
  { symbol: 'XAU/USD', price: '2,341.50', change: '+0.45%', up: true },
  { symbol: 'AAPL', price: '189.72', change: '+1.23%', up: true },
  { symbol: 'TSLA', price: '248.50', change: '-0.87%', up: false },
  { symbol: 'USD/JPY', price: '154.32', change: '-0.34%', up: false },
  { symbol: 'S&P 500', price: '5,278.40', change: '+0.56%', up: true },
  { symbol: 'SOL/USD', price: '172.30', change: '+3.42%', up: true },
]

/* ── Features ── */
const features = [
  { icon: BarChart3, title: '1500+ Assets', desc: 'Trade forex, stocks, crypto, commodities, indices and ETFs from a single platform.' },
  { icon: TrendingUp, title: 'Live Charts', desc: 'Real-time price charts with advanced technical indicators and drawing tools.' },
  { icon: Wallet, title: 'Nigerian Wallet', desc: 'Deposit and withdraw in Naira ₦. Bank transfer, Paystack, USSD, and crypto.' },
  { icon: Layers, title: 'Broker Aggregator', desc: 'Connect 20+ brokers through a single interface. Trade across them seamlessly.' },
  { icon: ArrowRightLeft, title: 'Position Transfer', desc: 'Move open positions between brokers without closing and reopening trades.' },
  { icon: ShieldCheck, title: 'Two-Layer KYC', desc: 'Platform-level and broker-level verification for maximum security and compliance.' },
]

/* ── Stats ── */
const stats = [
  { value: '1,500+', label: 'Assets' },
  { value: '20+', label: 'Brokers' },
  { value: '50', label: 'Countries' },
  { value: '10+', label: 'Currencies' },
]

/* ── How it works steps ── */
const steps = [
  { step: '01', title: 'Create Account', desc: 'Sign up in minutes with just your email and phone number.' },
  { step: '02', title: 'Connect Broker', desc: 'Link your preferred broker accounts to unlock trading phases.' },
  { step: '03', title: 'Fund Wallet', desc: 'Deposit Naira ₦ via bank transfer, Paystack, USSD, or crypto.' },
  { step: '04', title: 'Start Trading', desc: 'Trade 1,500+ assets across all your connected brokers.' },
]

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* ── Hero Section ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16 bg-gradient-to-br from-gray-50 to-white">
        {/* Background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00A88A]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00A88A]/3 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00A88A]/10 border border-[#00A88A]/20 text-[#00A88A] text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-[#00A88A] animate-pulse" />
                Live Trading Active
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6 text-gray-900"
            >
              Trade Across Brokers,{' '}
              <span className="text-gradient-dwex">One Platform</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10"
            >
              Access <span className="text-gray-900 font-semibold">1,500+ assets</span> across{' '}
              <span className="text-gray-900 font-semibold">20+ brokers</span>. Deposit in Naira ₦,
              trade globally. Forex, Stocks, Crypto, Commodities, Indices & ETFs — all in one place.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-[#00A88A] hover:bg-[#008F74] text-white font-bold text-base px-8 py-6 rounded-xl transition-all hover:shadow-lg hover:shadow-[#00A88A]/20"
                >
                  Start Trading
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/markets">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-base px-8 py-6 rounded-xl"
                >
                  Explore Markets
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Logo watermark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.03, scale: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <Image src="/dwex-logo.jpg" alt="" width={600} height={600} className="rounded-3xl" />
          </motion.div>
        </div>
      </section>

      {/* ── Price Ticker ── */}
      <section className="relative py-4 border-y border-gray-200 bg-gray-50 overflow-hidden">
        <div className="animate-ticker flex whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="inline-flex items-center gap-3 px-6">
              <span className="text-sm font-medium text-gray-600">{item.symbol}</span>
              <span className="text-sm font-mono font-medium text-gray-900">{item.price}</span>
              <span className={`text-xs font-mono font-medium ${item.up ? 'text-[#00A88A]' : 'text-[#E63950]'}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trading Phases ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Trading <span className="text-gradient-dwex">Phases</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 text-lg max-w-xl mx-auto">
              Each connected broker creates a trading phase with unique assets and rates.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {phases.filter(p => p.status === 'active').map((phase, i) => (
              <motion.div key={phase.name} variants={fadeUp} custom={i}>
                <Card className="bg-white border-gray-200 card-hover rounded-2xl overflow-hidden shadow-sm">
                  <CardContent className="p-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${phase.color}15` }}
                    >
                      <Layers className="w-6 h-6" style={{ color: phase.color }} />
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-gray-900">{phase.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{phase.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-400">Assets</p>
                        <p className="text-lg font-bold font-mono text-gray-900">{phase.assetCount}+</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">RAWTIN Rate</p>
                        <p className="text-lg font-bold font-mono text-[#00A88A]">{phase.rawtin}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              Why <span className="text-gradient-dwex">DWEX</span>?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 text-lg max-w-xl mx-auto">
              Everything you need to trade globally, built for the Nigerian market.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feat, i) => {
              const Icon = feat.icon
              return (
                <motion.div key={feat.title} variants={fadeUp} custom={i}>
                  <Card className="bg-white border-gray-200 card-hover rounded-2xl h-full shadow-sm">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-[#00A88A]/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-[#00A88A]" />
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-gray-900">{feat.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                className="text-center p-6 rounded-2xl bg-white border border-gray-200 shadow-sm"
              >
                <p className="text-3xl sm:text-4xl font-extrabold font-mono text-[#00A88A] mb-1">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
              How It <span className="text-gradient-dwex">Works</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 text-lg max-w-xl mx-auto">
              Get started in four simple steps.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step, i) => (
              <motion.div key={step.step} variants={fadeUp} custom={i} className="relative">
                <Card className="bg-white border-gray-200 card-hover rounded-2xl h-full shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#00A88A]/10 border border-[#00A88A]/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold font-mono text-[#00A88A]">{step.step}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900">{step.title}</h3>
                    <p className="text-gray-500 text-sm">{step.desc}</p>
                  </CardContent>
                </Card>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-10">
                    <ChevronRight className="w-6 h-6 text-[#00A88A]/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00A88A]/10 to-[#00A88A]/5" />
            <div className="relative z-10 bg-gray-50 py-16 sm:py-20 px-6 sm:px-12 text-center border border-gray-200 rounded-3xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
                Ready to Start <span className="text-gradient-dwex">Trading</span>?
              </h2>
              <p className="text-gray-500 text-lg max-w-lg mx-auto mb-8">
                Join thousands of traders who are already trading across brokers on DWEX.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-[#00A88A] hover:bg-[#008F74] text-white font-bold text-base px-8 py-6 rounded-xl"
                  >
                    Create Free Account
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/support">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-base px-8 py-6 rounded-xl"
                  >
                    Need Help?
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
