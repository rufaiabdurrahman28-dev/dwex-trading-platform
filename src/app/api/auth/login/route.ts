import { db } from '@/lib/db'
import { hashPassword, verifyPassword, createSession, getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized } from '@/lib/api/response'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return error('Email and password are required')
    }

    // Find user by email
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
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
