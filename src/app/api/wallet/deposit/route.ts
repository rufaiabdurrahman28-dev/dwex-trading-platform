import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const { userId, amount, phase, currency, paymentMethod } = await req.json()

    if (!userId || !amount || !phase) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (amount <= 0) {
      return NextResponse.json({ error: 'Amount must be greater than 0' }, { status: 400 })
    }

    // Find or create the user's wallet for this phase
    let wallet = await db.wallet.findUnique({
      where: {
        userId_phase_currency: {
          userId,
          phase,
          currency: currency || 'NGN',
        },
      },
    })

    if (!wallet) {
      // Create wallet if it doesn't exist
      wallet = await db.wallet.create({
        data: {
          userId,
          phase,
          currency: currency || 'NGN',
          balance: 0,
          locked: 0,
        },
      })
    }

    // Create deposit record
    const deposit = await db.deposit.create({
      data: {
        userId,
        amount,
        currency: currency || 'NGN',
        phase,
        status: 'pending',
        paymentRef: paymentMethod || 'bank_transfer',
      },
    })

    // For now, auto-confirm deposits (in production, you'd use Paystack webhook)
    // Add the amount to the wallet balance
    await db.wallet.update({
      where: { id: wallet.id },
      data: { balance: { increment: amount } },
    })

    // Update deposit status to confirmed
    await db.deposit.update({
      where: { id: deposit.id },
      data: { status: 'confirmed' },
    })

    // Fetch updated wallet
    const updatedWallet = await db.wallet.findUnique({
      where: { id: wallet.id },
    })

    return NextResponse.json({
      deposit,
      wallet: updatedWallet,
      message: 'Deposit successful!',
    })
  } catch (error: any) {
    console.error('[DWEX] Deposit error:', error)
    return NextResponse.json(
      { error: error.message || 'Deposit failed' },
      { status: 500 }
    )
  }
}
