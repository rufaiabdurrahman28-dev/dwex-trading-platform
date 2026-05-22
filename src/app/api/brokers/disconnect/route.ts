import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized, notFound } from '@/lib/api/response'

export async function POST(request: Request) {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  const body = await request.json()
  const { brokerId } = body

  if (!brokerId) {
    return error('Broker ID is required')
  }

  // Find the connection
  const connection = await db.brokerConnection.findUnique({
    where: {
      userId_brokerId: {
        userId: user.id,
        brokerId,
      },
    },
  })

  if (!connection) {
    return notFound('Broker connection not found')
  }

  if (connection.status === 'disconnected') {
    return error('Broker is already disconnected')
  }

  // Update connection status
  const updatedConnection = await db.brokerConnection.update({
    where: { id: connection.id },
    data: {
      status: 'disconnected',
      accessToken: null,
      refreshToken: null,
    },
  })

  // Close any open positions for that broker
  const openPositions = await db.position.findMany({
    where: {
      userId: user.id,
      brokerId,
      status: 'open',
    },
  })

  for (const position of openPositions) {
    // Get the current price for the position's symbol
    const symbolKey = position.symbol.replace('/', '-')
    const { allAssets } = await import('@/lib/assets')
    const asset = allAssets.find(a => a.symbol === position.symbol || a.symbol.replace('/', '-') === symbolKey)

    const closePrice = asset?.price ?? position.openPrice

    // Calculate PnL
    let pnl: number
    if (position.direction === 'buy') {
      pnl = (closePrice - position.openPrice) * position.lotSize
    } else {
      pnl = (position.openPrice - closePrice) * position.lotSize
    }

    await db.position.update({
      where: { id: position.id },
      data: {
        closePrice,
        pnl,
        status: 'closed',
        closedAt: new Date(),
      },
    })

    // Unlock the margin from wallet
    const requiredMargin = position.lotSize * position.openPrice * 0.01
    const usdWallet = await db.wallet.findUnique({
      where: {
        userId_currency: {
          userId: user.id,
          currency: 'USD',
        },
      },
    })

    if (usdWallet) {
      const newLocked = Math.max(0, usdWallet.locked - requiredMargin)
      const newBalance = usdWallet.balance + pnl
      await db.wallet.update({
        where: { id: usdWallet.id },
        data: {
          locked: newLocked,
          balance: newBalance,
        },
      })

      // Create transaction for PnL
      if (pnl !== 0) {
        await db.transaction.create({
          data: {
            userId: user.id,
            type: pnl > 0 ? 'trade_profit' : 'trade_loss',
            amount: Math.abs(pnl),
            currency: 'USD',
            status: 'completed',
            method: 'internal',
            description: `Position closed on disconnect: ${position.symbol} ${position.direction}`,
          },
        })
      }
    }
  }

  return success({
    message: 'Disconnected',
    connection: {
      id: updatedConnection.id,
      brokerId: updatedConnection.brokerId,
      brokerName: updatedConnection.brokerName,
      status: updatedConnection.status,
      closedPositionsCount: openPositions.length,
    },
  })
}
