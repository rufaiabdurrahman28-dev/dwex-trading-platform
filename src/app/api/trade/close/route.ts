import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized, notFound } from '@/lib/api/response'
import { allAssets } from '@/lib/assets'

export async function POST(request: Request) {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  const body = await request.json()
  const { positionId } = body

  if (!positionId) {
    return error('Position ID is required')
  }

  // Find position, verify it belongs to user and is open
  const position = await db.position.findFirst({
    where: {
      id: positionId,
      userId: user.id,
      status: 'open',
    },
  })

  if (!position) {
    return notFound('Open position not found')
  }

  // ═══════════════════════════════════════════════════
  // GET LIVE CLOSE PRICE from Price Engine
  // Try async live price first (works in serverless & dev)
  // ═══════════════════════════════════════════════════
  let closePrice: number | null = null

  try {
    const { getLivePriceAsync } = await import('@/lib/price-engine')
    const livePrice = await getLivePriceAsync(position.symbol)
    if (livePrice && livePrice > 0) {
      closePrice = livePrice
    }
  } catch {
    // Price engine not available, will use fallback
  }

  // Fallback to static asset price if live engine didn't work
  if (!closePrice || closePrice <= 0) {
    const normalizedSymbol = position.symbol.replace('/', '-')
    const asset = allAssets.find(
      a => a.symbol === position.symbol || a.symbol.replace('/', '-') === normalizedSymbol
    )

    if (!asset) {
      return error('Market data unavailable for this symbol')
    }

    closePrice = asset.price
  }

  // ═══════════════════════════════════════════════════
  // PnL CALCULATION
  // Buy: PnL = (closePrice - openPrice) * lotSize
  // Sell: PnL = (openPrice - closePrice) * lotSize
  // Deduct swap and commission from PnL
  // ═══════════════════════════════════════════════════
  let pnl: number
  if (position.direction === 'buy') {
    pnl = (closePrice - position.openPrice) * position.lotSize
  } else {
    pnl = (position.openPrice - closePrice) * position.lotSize
  }

  // Deduct swap and commission from PnL
  pnl = pnl - position.swap - position.commission

  // Update position with close data
  const updatedPosition = await db.position.update({
    where: { id: position.id },
    data: {
      closePrice,
      pnl,
      status: 'closed',
      closedAt: new Date(),
    },
  })

  // ═══════════════════════════════════════════════════
  // UNLOCK MARGIN & CREDIT/DEDUCT PnL
  // Use the stored margin from when the position was opened
  // This ensures the correct amount is unlocked regardless of leverage
  // ═══════════════════════════════════════════════════
  const lockedMargin = position.margin || (position.lotSize * position.openPrice * 0.01) // fallback for legacy positions

  const usdWallet = await db.wallet.findUnique({
    where: {
      userId_currency: {
        userId: user.id,
        currency: 'USD',
      },
    },
  })

  let updatedWallet = usdWallet

  if (usdWallet) {
    // Unlock the margin and add/subtract PnL to the balance
    // newLocked = current locked - margin that was reserved for this position
    // newBalance = current balance + pnl (profit adds, loss subtracts since pnl can be negative)
    //
    // IMPORTANT: This allows withdrawing MORE than deposited because:
    // - balance = deposits + trading_profits - trading_losses
    // - If a user profits, their balance exceeds deposits — they can withdraw the full amount
    const newLocked = Math.max(0, usdWallet.locked - lockedMargin)
    const newBalance = usdWallet.balance + pnl

    updatedWallet = await db.wallet.update({
      where: { id: usdWallet.id },
      data: {
        locked: newLocked,
        balance: newBalance,
      },
    })

    // Create transaction record for the profit/loss
    await db.transaction.create({
      data: {
        userId: user.id,
        type: pnl >= 0 ? 'trade_profit' : 'trade_loss',
        amount: Math.abs(pnl),
        currency: 'USD',
        status: 'completed',
        method: 'internal',
        description: `Closed ${position.direction} position: ${position.symbol} | PnL: $${pnl.toFixed(2)}`,
        metadata: JSON.stringify({
          positionId: position.id,
          symbol: position.symbol,
          direction: position.direction,
          openPrice: position.openPrice,
          closePrice,
          lotSize: position.lotSize,
          leverage: position.leverage,
          marginUnlocked: lockedMargin,
          pnl,
          brokerId: position.brokerId,
          priceSource: 'live',
        }),
      },
    })
  }

  return success({
    position: {
      id: updatedPosition.id,
      brokerId: updatedPosition.brokerId,
      symbol: updatedPosition.symbol,
      direction: updatedPosition.direction,
      lotSize: updatedPosition.lotSize,
      openPrice: updatedPosition.openPrice,
      closePrice: updatedPosition.closePrice,
      pnl: updatedPosition.pnl,
      swap: updatedPosition.swap,
      commission: updatedPosition.commission,
      margin: updatedPosition.margin,
      leverage: updatedPosition.leverage,
      status: updatedPosition.status,
      openedAt: updatedPosition.openedAt,
      closedAt: updatedPosition.closedAt,
    },
    wallet: updatedWallet
      ? {
          balance: updatedWallet.balance,
          locked: updatedWallet.locked,
          available: updatedWallet.balance - updatedWallet.locked,
        }
      : null,
    pnl,
    marginUnlocked: lockedMargin,
  })
}
