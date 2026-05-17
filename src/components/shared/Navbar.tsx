'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Menu,
  X,
  TrendingUp,
  Wallet,
  PieChart,
  Bell,
  Settings,
  HelpCircle,
  LogIn,
  UserPlus,
  ChevronDown,
  LayoutDashboard,
  Shield,
  Layers,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/markets', label: 'Markets', icon: TrendingUp },
  { href: '/trade', label: 'Trade', icon: LayoutDashboard },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/portfolio', label: 'Portfolio', icon: PieChart },
  { href: '/brokers', label: 'Phases', icon: Layers },
]

const moreLinks = [
  { href: '/alerts', label: 'Price Alerts', icon: Bell },
  { href: '/kyc', label: 'KYC', icon: Shield },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/support', label: 'Support', icon: HelpCircle },
]

export function Navbar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change using a ref
  const prevPathname = useRef(pathname)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname
      // Use a microtask to avoid synchronous setState in effect
      queueMicrotask(() => {
        setIsMobileOpen(false)
        setShowMore(false)
      })
    }
  }, [pathname])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#0A1628]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20'
          : 'bg-[#0A1628]/80 backdrop-blur-md border-b border-white/[0.04]'
      )}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[#00D4AA]/20 group-hover:border-[#00D4AA]/40 transition-colors">
              <Image
                src="/dwex-logo.jpg"
                alt="DWEX Logo"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-xl font-bold tracking-tight">DWEX</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href || pathname?.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-[#00D4AA]/10 text-[#00D4AA]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
              >
                More
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', showMore && 'rotate-180')} />
              </button>
              {showMore && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#162D50] border border-white/[0.08] rounded-xl shadow-xl shadow-black/40 py-2 z-50">
                  {moreLinks.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          'flex items-center gap-2 px-4 py-2.5 text-sm transition-colors',
                          isActive
                            ? 'bg-[#00D4AA]/10 text-[#00D4AA]'
                            : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition px-3 py-2"
            >
              <LogIn className="w-4 h-4" />
              Log In
            </Link>
            <Link
              href="/signup"
              className="bg-[#00D4AA] hover:bg-[#00A888] text-[#0A1628] font-semibold text-sm px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-[#00D4AA]/20"
            >
              Start Trading
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileOpen && (
        <div className="lg:hidden bg-[#0D1B2E] border-t border-white/[0.06] max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href || pathname?.startsWith(link.href + '/')
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-[#00D4AA]/10 text-[#00D4AA]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              )
            })}
            <div className="border-t border-white/[0.06] my-2" />
            {moreLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-[#00D4AA]/10 text-[#00D4AA]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              )
            })}
            <div className="border-t border-white/[0.06] my-2" />
            <div className="flex flex-col gap-2 px-3 py-2">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white border border-white/[0.08] rounded-lg py-2.5 transition"
              >
                <LogIn className="w-4 h-4" />
                Log In
              </Link>
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 bg-[#00D4AA] hover:bg-[#00A888] text-[#0A1628] font-semibold text-sm rounded-lg py-2.5 transition"
              >
                <UserPlus className="w-4 h-4" />
                Start Trading
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
