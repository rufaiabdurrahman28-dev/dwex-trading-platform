'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  Mail,
} from 'lucide-react'

const footerSections = [
  {
    title: 'Markets',
    links: [
      { label: 'Forex', href: '/markets?tab=forex' },
      { label: 'Stocks', href: '/markets?tab=stocks' },
      { label: 'Crypto', href: '/markets?tab=crypto' },
      { label: 'Commodities', href: '/markets?tab=commodities' },
      { label: 'Indices', href: '/markets?tab=indices' },
      { label: 'ETFs', href: '/markets?tab=etfs' },
    ],
  },
  {
    title: 'Trading',
    links: [
      { label: 'Trade Now', href: '/trade' },
      { label: 'Deriv Phase', href: '/brokers?phase=deriv' },
      { label: 'Wise Phase', href: '/brokers?phase=wise' },
      { label: 'Eversend Phase', href: '/brokers?phase=eversend' },
      { label: 'Price Alerts', href: '/alerts' },
      { label: 'Portfolio', href: '/portfolio' },
    ],
  },
  {
    title: 'Wallet',
    links: [
      { label: 'Deposit', href: '/wallet?action=deposit' },
      { label: 'Withdraw', href: '/wallet?action=withdraw' },
      { label: 'Transfer', href: '/wallet?action=transfer' },
      { label: 'Transaction History', href: '/wallet' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About DWEX', href: '/about' },
      { label: 'How It Works', href: '/about#how-it-works' },
      { label: 'Security', href: '/about#security' },
      { label: 'Contact Support', href: '/support' },
      { label: 'FAQ', href: '/support#faq' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Log In', href: '/login' },
      { label: 'Create Account', href: '/signup' },
      { label: 'KYC Verification', href: '/kyc' },
      { label: 'Settings', href: '/settings' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/support' },
      { label: 'Privacy Policy', href: '/support' },
      { label: 'Risk Disclosure', href: '/support' },
      { label: 'KYC Policy', href: '/kyc' },
      { label: 'AML Policy', href: '/support' },
    ],
  },
]

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/dwex', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/dwex', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/@dwex', label: 'YouTube' },
  { icon: MessageCircle, href: 'https://t.me/dwex', label: 'Telegram' },
]

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 mb-10">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm text-gray-900 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-[#00A88A] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle section */}
        <div className="border-t border-gray-200 pt-8 pb-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#00A88A]/20">
              <Image
                src="/dwex-logo.jpg"
                alt="DWEX Logo"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div>
              <span className="font-bold text-lg text-gray-900">DWEX</span>
              <p className="text-xs text-gray-500">Trade Across Brokers, One Platform</p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#00A88A] hover:border-[#00A88A]/30 transition-all"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>

          {/* Contact */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              support@dwex.io
            </span>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DWEX. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 text-center sm:text-right max-w-xl">
            Trading involves significant risk of loss. DWEX is a broker aggregator and does not hold client funds.
            All trades are executed through connected brokers. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  )
}
