import { createServerClient } from '@supabase/ssr'
import { NextResponse, NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/wallet', '/portfolio', '/settings', '/alerts', '/kyc', '/trade']

// Routes that are admin-only
const adminRoutes = ['/admin']

// Routes that logged-in users shouldn't access (redirect to wallet)
const authRoutes = ['/login', '/signup']

export async function middleware(req: NextRequest) {
  // Skip middleware if Supabase env vars aren't available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next()
  }

  let res = NextResponse.next()

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return req.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          req.cookies.set(name, value)
          res = NextResponse.next({
            request: { headers: req.headers },
          })
          res.cookies.set(name, value, options)
        })
      },
    },
  })

  const { data: { session } } = await supabase.auth.getSession()
  const pathname = req.nextUrl.pathname

  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // Redirect unauthenticated users to login for protected routes
  if (!session && isProtectedRoute) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // CRITICAL SECURITY: Admin route protection — check role, not just session
  if (isAdminRoute) {
    if (!session) {
      // Not logged in at all → redirect to login
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Check if user has admin role from user metadata
    const userRole = session.user?.user_metadata?.role
    if (userRole !== 'admin') {
      // Logged in but NOT admin → redirect to wallet with unauthorized message
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/wallet'
      redirectUrl.searchParams.set('error', 'unauthorized_access')
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Redirect authenticated users away from login/signup to wallet
  if (session && isAuthRoute) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/wallet'
    return NextResponse.redirect(redirectUrl)
  }

  // Add security headers to all responses
  const securityHeaders = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-XSS-Protection': '1; mode=block',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  }

  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.headers.set(key, value)
  })

  return res
}

export const config = {
  matcher: [
    '/wallet/:path*',
    '/portfolio/:path*',
    '/settings/:path*',
    '/alerts/:path*',
    '/kyc/:path*',
    '/trade/:path*',
    '/admin/:path*',
    '/login',
    '/signup',
  ],
}
