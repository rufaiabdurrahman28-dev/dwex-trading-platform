import { db } from '@/lib/db'
import { hashPassword, verifyPassword, createSession, getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized } from '@/lib/api/response'
import { NextResponse } from 'next/server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, phone, password } = body

    // Validate required fields
    if (!fullName || !email || !phone || !password) {
      return error('All fields are required: fullName, email, phone, password')
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return error('Invalid email format')
    }

    // Validate password length
    if (password.length < 8) {
      return error('Password must be at least 8 characters')
    }

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return error('Email already registered', 409)
    }

    // Hash password
    const passwordHash = hashPassword(password)

    // Create user with default wallets, profile, and KYC in a transaction
    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        fullName,
        phone,
        role: 'trader',
        accountStatus: 'active',
        emailVerified: false,
        twoFactorEnabled: false,
        profile: {
          create: {},
        },
        kyc: {
          create: {},
        },
        wallets: {
          create: [
            { currency: 'NGN', balance: 0, locked: 0 },
            { currency: 'USD', balance: 0, locked: 0 },
          ],
        },
      },
    })

    // Create session token
    const token = await createSession(user.id)

    // Set cookie and return response
    const response = success({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      token,
    }, 201)

    response.cookies.set('dwex_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 72 * 60 * 60, // 72 hours in seconds
      path: '/',
    })

    return response
  } catch (err) {
    console.error('Signup error:', err)
    return error('Internal server error', 500)
  }
}
