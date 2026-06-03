import { db } from '@/lib/db'
import { hashPassword, verifyPassword, createSession, getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized } from '@/lib/api/response'
import { applyRateLimit, RATE_LIMITS } from '@/lib/api/rate-limit'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // RATE LIMITING: Protect against brute force attacks
  const rateCheck = applyRateLimit(request, RATE_LIMITS.login)
  if (rateCheck.limited) {
    const retryMinutes = Math.ceil(rateCheck.retryAfterMs / 60000)
    return NextResponse.json(
      { error: `Too many login attempts. Please try again in ${retryMinutes} minute${retryMinutes > 1 ? 's' : ''}.` },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(rateCheck.retryAfterMs / 1000)),
          'X-RateLimit-Remaining': '0',
        },
      }
    )
  }

  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return error('Email and password are required')
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return error('Please enter a valid email address')
    }

    // Password length check (prevent excessively long inputs)
    if (password.length > 128) {
      return error('Invalid credentials')
    }

    // Find user by email
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
      // SECURITY: Don't reveal whether email exists — same error message
      return error('Invalid email or password', 401)
    }

    // Verify password
    const isValid = verifyPassword(password, user.passwordHash)
    if (!isValid) {
      return error('Invalid email or password', 401)
    }

    // Check account status
    if (user.accountStatus === 'banned') {
      return error('Your account has been banned. Contact support for assistance.', 403)
    }

    if (user.accountStatus === 'suspended') {
      return error('Your account has been suspended. Contact support for assistance.', 403)
    }

    // Create session token
    const token = await createSession(user.id)

    // Set cookie and return response
    const response = success({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        accountStatus: user.accountStatus,
      },
      token,
    })

    response.cookies.set('dwex_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 72 * 60 * 60, // 72 hours in seconds
      path: '/',
    })

    return response
  } catch (err) {
    console.error('Login error:', err)
    return error('Internal server error', 500)
  }
}
