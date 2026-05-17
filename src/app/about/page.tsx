'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Layers, Shield, Lock, Eye, Server, ArrowRight, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const howItWorks = [
  { icon: Layers, title: 'Aggregates Brokers', desc: 'DWEX connects to multiple brokers and consolidates their assets, pricing, and execution into a single interface.', color: '#00A88A' },
  { icon: Shield, title: 'Holds No Funds', desc: 'DWEX never holds client funds. All deposits are held by regulated brokers. We are a technology layer, not a custodian.', color: '#00A88A' },
  { icon: Globe, title: 'One Interface', desc: 'Trade across all your connected brokers from one dashboard. Transfer positions, manage risk, and track performance seamlessly.', color: '#E5940A' },
]

const team = [
  { name: 'Adebayo Okonkwo', role: 'CEO & Founder', initials: 'AO' },
  { name: 'Chidinma Okafor', role: 'CTO', initials: 'CO' },
  { name: 'Emeka Nwosu', role: 'Head of Trading', initials: 'EN' },
  { name: 'Fatima Abdullahi', role: 'Head of Compliance', initials: 'FA' },
]

const securityFeatures = [
  { icon: Lock, title: 'End-to-End Encryption', desc: 'All data is encrypted in transit and at rest using AES-256 encryption.' },
  { icon: Shield, title: 'Two-Layer KYC', desc: 'Platform-level and broker-level identity verification for maximum security.' },
  { icon: Eye, title: 'Real-Time Monitoring', desc: '24/7 monitoring of all transactions and account activities for fraud prevention.' },
  { icon: Server, title: 'Secure Infrastructure', desc: 'Hosted on enterprise-grade cloud infrastructure with 99.9% uptime SLA.' },
  { icon: Lock, title: 'Transaction PIN', desc: 'Optional transaction PIN required for withdrawals and high-value transfers.' },
  { icon: Shield, title: 'Regulated Brokers', desc: 'All connected brokers are regulated by their respective financial authorities.' },
]

const partners = ['Deriv','Wise','Eversend','OctaFX','XM','Exness','IC Markets','FBS','HFM','Pepperstone']

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }) }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-12 bg-white">
      <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0 pointer-events-none"><div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#00A88A]/5 rounded-full blur-[120px]" /></div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.h1 variants={fadeUp} custom={0} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900">About <span className="text-gradient-dwex">DWEX</span></motion.h1>
            <motion.p variants={fadeUp} custom={1} className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">The first broker aggregator platform built for the African market. Trade across brokers, deposit in Naira, trade globally.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto text-center">
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Our Mission</motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 text-lg leading-relaxed">DWEX was created to solve a fundamental problem: African traders are limited by single-broker access, fragmented platforms, and currency barriers. We aggregate multiple brokers into one interface, enabling traders to access the best prices, broadest asset selection, and most reliable execution — all while depositing and withdrawing in Naira.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">How DWEX Works</motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 max-w-xl mx-auto">Three core principles that define our platform.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorks.map((item, i) => { const Icon = item.icon; return (
              <motion.div key={item.title} variants={fadeUp} custom={i}>
                <Card className="bg-white border-gray-200 card-hover rounded-2xl h-full shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}><Icon className="w-7 h-7" style={{ color: item.color }} /></div>
                    <h3 className="text-lg font-bold mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )})}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Our Team</motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 max-w-xl mx-auto">Built by a team of finance and technology professionals from across Africa.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} variants={fadeUp} custom={i}>
                <Card className="bg-white border-gray-200 card-hover rounded-2xl shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#00A88A]/10 border border-[#00A88A]/20 flex items-center justify-center mx-auto mb-3"><span className="text-lg font-bold text-[#00A88A]">{member.initials}</span></div>
                    <h3 className="font-bold text-sm mb-1 text-gray-900">{member.name}</h3>
                    <p className="text-xs text-gray-400">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Security & <span className="text-gradient-dwex">Trust</span></motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 max-w-xl mx-auto">Your security is our top priority. Here&apos;s how we protect you.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feat, i) => { const Icon = feat.icon; return (
              <motion.div key={feat.title} variants={fadeUp} custom={i}>
                <Card className="bg-white border-gray-200 card-hover rounded-2xl h-full shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3"><div className="w-9 h-9 rounded-lg bg-[#00A88A]/10 flex items-center justify-center"><Icon className="w-4 h-4 text-[#00A88A]" /></div><h3 className="font-bold text-sm text-gray-900">{feat.title}</h3></div>
                    <p className="text-gray-500 text-xs leading-relaxed">{feat.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )})}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-10">
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Our Partners</motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 max-w-xl mx-auto">Connected to the world&apos;s leading brokers and financial platforms.</motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {partners.map((partner) => (
              <Card key={partner} className="bg-white border-gray-200 card-hover rounded-xl shadow-sm">
                <CardContent className="p-4 text-center">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mx-auto mb-2"><span className="text-xs font-bold text-gray-400">{partner.charAt(0)}</span></div>
                  <p className="text-xs font-medium text-gray-500">{partner}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-3xl overflow-hidden">
            <div className="bg-gray-50 border border-gray-200 rounded-3xl py-12 sm:py-16 px-6 sm:px-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Ready to Start Trading?</h2>
              <p className="text-gray-500 max-w-lg mx-auto mb-6">Join thousands of traders who are already trading across brokers on DWEX.</p>
              <Link href="/signup"><Button size="lg" className="bg-[#00A88A] hover:bg-[#008F74] text-white font-bold text-base px-8 py-6 rounded-xl">Create Free Account<ArrowRight className="w-5 h-5 ml-2" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
