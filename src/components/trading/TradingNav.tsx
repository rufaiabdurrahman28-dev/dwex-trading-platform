'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function TradingNav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  const links = [
    { href: '/dashboard', label: 'Markets' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/wallet', label: 'Wallet' },
    { href: '/brokers', label: 'Brokers' },
    { href: '/alerts', label: 'Alerts' },
    { href: '/support', label: 'Support' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/95 backdrop-blur-md border-b border-[#1E2D4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/dwex-logo.jpg"
              alt="DWEX"
              className="w-9 h-9 rounded-lg object-cover"
            />
            <span className="text-xl font-bold text-white tracking-tight">
              DWEX
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-[#00D4AA]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm font-medium text-gray-400 hover:text-white transition px-3 py-2"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-[#00D4AA] hover:bg-[#00B894] text-[#0A1628] font-semibold text-sm px-5 py-2 rounded-lg transition"
            >
              Start Trading
            </Link>

            {/* Hamburger menu - three lines */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#1E2D4A] py-4 space-y-2">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive(link.href)
                    ? 'bg-[#00D4AA]/10 text-[#00D4AA]'
                    : 'text-gray-400 hover:bg-[#1E2D4A]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/settings"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-[#1E2D4A]"
            >
              Settings
            </Link>
            <div className="border-t border-[#1E2D4A] pt-3 mt-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-gray-400 hover:text-white"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-[#00D4AA]"
              >
                Start Trading →
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
