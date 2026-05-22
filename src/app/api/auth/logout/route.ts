import { db } from '@/lib/db'
import { hashPassword, verifyPassword, createSession, getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized } from '@/lib/api/response'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    // Get token from cookie
    const cookieStore = await cookies()
    const token = cookieStore.get('dwex_session')?.value

    // Delete session from database
    if (token) {
      await db.session.deleteMany({
        where: { token },
      })
    }

    // Clear cookie and return response
    const response = success({ message: 'Logged out' })

    response.cookies.set('dwex_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })

    return response
  } catch (err) {
    console.error('Logout error:', err)
    return error('Internal server error', 500)
  }
}
