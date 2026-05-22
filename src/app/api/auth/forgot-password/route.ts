import { db } from '@/lib/db'
import { hashPassword, verifyPassword, createSession, getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized } from '@/lib/api/response'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return error('Email is required')
    }

    // Check if user exists (but don't reveal existence to client)
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    // Always return the same response to prevent email enumeration
    // In the future, we'll send a reset email here
    if (user) {
      // TODO: Generate reset token and send email
      // For now, we just acknowledge the request
    }

    return success({
      message: 'If an account with that email exists, a reset link has been sent',
    })
  } catch (err) {
    console.error('Forgot password error:', err)
    return error('Internal server error', 500)
  }
}
