import { createServerClient } from '@supabase/ssr'
import { NextResponse, NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/wallet', '/portfolio', '/settings', '/alerts', '/kyc', '/trade']

// Routes that are admin-only
const adminRoutes = ['/admin']

// Routes that logged-in users shouldn't access (redirect to wallet)
const authRoutes = ['/login', '/signup']

// SECURITY: Known malicious user agents (scanners, bots, exploit tools)
const BLOCKED_USER_AGENTS = [
  'sqlmap', 'nikto', 'nmap', 'masscan', 'dirbuster', 'gobuster',
  'wfuzz', 'burpsuite', 'owasp zap', 'hydra', 'metasploit', 'w3af',
  'acunetix', 'nessus', 'openvas',
]

// SECURITY: Paths attackers commonly probe
const BLOCKED_PATHS = [
  '/.env', '/.git', '/wp-admin', '/wp-login', '/phpmyadmin',
  '/admin/config', '/api/keys', '/api/tokens', '/api/secrets',
  '/debug', '/console', '/actuator',
]

// SECURITY: SQL injection patterns in URL
const SQL_PATTERNS = [
  /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
  /union(\s|\+)+select/i,
  /insert(\s|\+)+into/i,
  /delete(\s|\+)+from/i,
  /drop(\s|\+)+table/i,
]

// SECURITY: XSS patterns in URL
const XSS_PATTERNS = [
  /<script[^>]*>/i,
  /javascript:/i,
  /on\w+\s*=/i,
  /eval\(/i,
]

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  const userAgent = (req.headers.get('user-agent') || '').toLowerCase()

  // ========================================
  // LAYER 0: Request-level security checks
  // Blocks malicious requests BEFORE they even reach auth
  // ========================================

  // Block known attack tools
  for (const blocked of BLOCKED_USER_AGENTS) {
    if (userAgent.includes(blocked)) {
      return new NextResponse('Forbidden', { status: 403 })
    }
  }

  // Block probes for sensitive paths
  for (const blockedPath of BLOCKED_PATHS) {
    if (pathname.toLowerCase().startsWith(blockedPath)) {
      return new NextResponse('Not Found', { status: 404 })
    }
  }

  // Block SQL injection in URL
  for (const pattern of SQL_PATTERNS) {
    if (pattern.test(pathname) || pattern.test(req.nextUrl.search)) {
      return new NextResponse('Bad Request', { status: 400 })
    }
  }

  // Block XSS in URL
  for (const pattern of XSS_PATTERNS) {
    if (pattern.test(pathname) || pattern.test(req.nextUrl.search)) {
      return new NextResponse('Bad Request', { status: 400 })
    }
  }

  // Block requests with no user agent (most bots/scanners)
  if (!userAgent || userAgent.length < 5) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // ========================================
  // LAYER 1: Authentication & Authorization
  // ========================================

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

  // ========================================
  // LAYER 2: Admin role verification
  // Even if auth is bypassed, role must be admin
  // ========================================
  if (isAdminRoute) {
    if (!session) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    const userRole = session.user?.user_metadata?.role
    if (userRole !== 'admin') {
      // Logged in but NOT admin — log this as unauthorized access attempt
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

  // ========================================
  // LAYER 3: Security headers on all responses
  // ========================================
  const securityHeaders: Record<string, string> = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-XSS-Protection': '1; mode=block',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://mfqxuddjomrobrcyczpf.supabase.co https://api.github.com; frame-ancestors 'none';",
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
    '/.env',
    '/.git/:path*',
    '/wp-admin/:path*',
    '/phpmyadmin/:path*',
    '/debug/:path*',
    '/console/:path*',
    '/actuator/:path*',
  ],
}
