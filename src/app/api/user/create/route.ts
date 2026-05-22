import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { userId, email, name, phone, country, role } = await req.json()

    if (!userId || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if user already exists
    const existing = await db.user.findUnique({ where: { id: userId } })
    if (existing) {
      return NextResponse.json({ user: existing, message: 'User already exists' })
    }

    // Create user in database
    const user = await db.user.create({
      data: {
        id: userId,
        email,
        name: name || email.split('@')[0],
        role: role || 'trader',
        kycStatus: 'pending',
        isActive: true,
      },
    })

    // Create default wallets for active phases
    const activePhases = ['Deriv Phase', 'Wise Phase', 'Eversend Phase']
    await Promise.all(
      activePhases.map(phase =>
        db.wallet.create({
          data: {
            userId,
            phase,
            currency: 'NGN',
            balance: 0,
            locked: 0,
          },
        }).catch(() => {
          // Wallet might already exist (unique constraint)
        })
      )
    )

    return NextResponse.json({ user, message: 'User created successfully' })
  } catch (error: any) {
    console.error('[DWEX] User creation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create user' },
      { status: 500 }
    )
  }
}
