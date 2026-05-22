import { db } from '@/lib/db'
import { hashPassword, verifyPassword, createSession, getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized } from '@/lib/api/response'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // Get current user from cookie token
    const user = await getAuthUser()

    if (!user) {
      return unauthorized()
    }

    // Get KYC status
    const kyc = await db.kYC.findUnique({
      where: { userId: user.id },
      select: { status: true },
    })

    // Get wallet balances
    const wallets = await db.wallet.findMany({
      where: { userId: user.id },
      select: {
        currency: true,
        balance: true,
        locked: true,
      },
    })

    return success({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        country: user.country,
        role: user.role,
        accountStatus: user.accountStatus,
        emailVerified: user.emailVerified,
        twoFactorEnabled: user.twoFactorEnabled,
      },
      kyc: {
        status: kyc?.status || 'none',
      },
      wallets: wallets.map(w => ({
        currency: w.currency,
        balance: w.balance,
        locked: w.locked,
      })),
    })
  } catch (err) {
    console.error('Get current user error:', err)
    return error('Internal server error', 500)
  }
}
