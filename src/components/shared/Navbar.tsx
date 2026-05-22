'use client'

import { useState, useEffect, useRef } from 'react'
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
  LogOut,
  UserPlus,
  ChevronDown,
  LayoutDashboard,
  Shield,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { phases } from '@/lib/assets'
import { useAuth } from '@/lib/auth-context'

const navLinks = [
  { href: '/markets', label: 'Markets', icon: TrendingUp },
  { href: '/trade', label: 'Trade', icon: LayoutDashboard },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/portfolio', label: 'Portfolio', icon: PieChart },
]

const moreLinks = [
  { href: '/alerts', label: 'Price Alerts', icon: Bell },
  { href: '/kyc', label: 'KYC', icon: Shield },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/support', label: 'Support', icon: HelpCircle },
]

export function Navbar() {
  const pathname = usePathname()
  const { user, profile, signOut } = useAuth()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [showPhases, setShowPhases] = useState(false)
  const phasesRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)

  const handleSignOut = async () => {
    await signOut()
    setIsMobileOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  const prevPathname = useRef(pathname)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname
      queueMicrotask(() => {
        setIsMobileOpen(false)
        setShowMore(false)
        setShowPhases(false)
      })
    }
  }, [pathname])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (phasesRef.current && !phasesRef.current.contains(e.target as Node)) {
        setShowPhases(false)
      }
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMore(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const activePhases = phases.filter(p => p.status === 'active')
  const comingPhases = phases.filter(p => p.status === 'coming')

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm'
          : 'bg-white/80 backdrop-blur-md border-b border-gray-100'
      )}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[#00A88A]/20 group-hover:border-[#00A88A]/40 transition-colors">
              <Image
                src="/dwex-logo.jpg"
                alt="DWEX Logo"
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">DWEX</span>
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
                      ? 'bg-[#00A88A]/10 text-[#00A88A]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}

            {/* Phases Dropdown */}
            <div className="relative" ref={phasesRef}>
              <button
                onClick={() => { setShowPhases(!showPhases); setShowMore(false) }}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  pathname === '/brokers'
                    ? 'bg-[#00A88A]/10 text-[#00A88A]'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <Layers className="w-4 h-4" />
                Phases
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', showPhases && 'rotate-180')} />
              </button>
              {showPhases && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] bg-white border border-gray-200 rounded-xl shadow-xl shadow-gray-200/50 py-3 z-50">
                  {/* Header */}
                  <div className="px-4 pb-3 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900 text-sm">Trading Phases</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Each broker = 1 Phase. Trade across all of them.</p>
                  </div>
                  {/* Active phases */}
                  <div className="px-2 pt-2">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">Active Now</p>
                    {activePhases.map((phase) => (
                      <Link
                        key={phase.id}
                        href={`/brokers?phase=${phase.id}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition group"
                        onClick={() => setShowPhases(false)}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: phase.color }}>
                          {phase.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{phase.name}</p>
                          <p className="text-xs text-gray-500">{phase.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-mono font-semibold text-gray-700">{phase.assetCount}+</p>
                          <p className="text-[10px] text-gray-400">assets</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#00A88A] transition" />
                      </Link>
                    ))}
                  </div>
                  {/* Coming soon */}
                  <div className="px-2 pt-2 mt-1 border-t border-gray-100">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-1.5">Coming Soon</p>
                    <div className="grid grid-cols-2 gap-1">
                      {comingPhases.slice(0, 6).map((phase) => (
                        <div key={phase.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg">
                          <div className="w-5 h-5 rounded flex items-center justify-center text-white font-bold text-[8px]" style={{ backgroundColor: phase.color, opacity: 0.5 }}>
                            {phase.name.charAt(0)}
                          </div>
                          <span className="text-xs text-gray-400">{phase.name.replace(' Phase', '')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* View all */}
                  <div className="px-4 pt-2 mt-1 border-t border-gray-100">
                    <Link href="/brokers" className="flex items-center justify-center gap-1 text-sm text-[#00A88A] font-medium hover:text-[#008F74] transition" onClick={() => setShowPhases(false)}>
                      View All Phases
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* More dropdown */}
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => { setShowMore(!showMore); setShowPhases(false) }}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
              >
                More
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', showMore && 'rotate-180')} />
              </button>
              {showMore && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl shadow-gray-200/50 py-2 z-50">
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
                            ? 'bg-[#00A88A]/10 text-[#00A88A]'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
            {user ? (
              <>
                <span className="hidden sm:inline text-sm text-gray-600">{profile?.full_name || user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-[#E63950] transition px-3 py-2"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition px-3 py-2"
                >
                  <LogIn className="w-4 h-4" />
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#00A88A] hover:bg-[#008F74] text-white font-semibold text-sm px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-[#00A88A]/20"
                >
                  Start Trading
                </Link>
              </>
            )}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
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
                      ? 'bg-[#00A88A]/10 text-[#00A88A]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              )
            })}
            {/* Mobile Phases */}
            <div className="border-t border-gray-100 my-2" />
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1">Phases</p>
            {activePhases.map((phase) => (
              <Link
                key={phase.id}
                href={`/brokers?phase=${phase.id}`}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition"
              >
                <div className="w-7 h-7 rounded flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: phase.color }}>
                  {phase.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{phase.name}</p>
                  <p className="text-xs text-gray-500">{phase.assetCount}+ assets</p>
                </div>
              </Link>
            ))}
            <div className="border-t border-gray-100 my-2" />
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
                      ? 'bg-[#00A88A]/10 text-[#00A88A]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              )
            })}
            <div className="border-t border-gray-100 my-2" />
            <div className="flex flex-col gap-2 px-3 py-2">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg py-2.5 transition"
              >
                <LogIn className="w-4 h-4" />
                Log In
              </Link>
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 bg-[#00A88A] hover:bg-[#008F74] text-white font-semibold text-sm rounded-lg py-2.5 transition"
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
