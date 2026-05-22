import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      include: { wallets: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const profile = {
      id: user.id,
      email: user.email,
      full_name: user.name || '',
      role: user.role as 'admin' | 'trader' | 'user',
      phone: '',
      country: '',
      kyc_status: user.kycStatus as 'pending' | 'submitted' | 'verified' | 'rejected',
      is_active: user.isActive,
      created_at: user.createdAt.toISOString(),
      wallets: user.wallets.map(w => ({
        id: w.id,
        phase: w.phase,
        currency: w.currency,
        balance: w.balance,
        locked: w.locked,
      })),
    }

    return NextResponse.json({ profile })
  } catch (error: any) {
    console.error('[DWEX] Profile fetch error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}
