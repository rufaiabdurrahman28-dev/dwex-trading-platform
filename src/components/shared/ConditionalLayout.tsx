'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'

const HIDE_NAV_FOOTER = ['/login', '/signup']

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideLayout = HIDE_NAV_FOOTER.some((path) => pathname?.startsWith(path))

  if (hideLayout) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
