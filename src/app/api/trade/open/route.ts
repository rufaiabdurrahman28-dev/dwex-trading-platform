import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized } from '@/lib/api/response'
import { allAssets } from '@/lib/assets'
import { getBrokerById } from '@/lib/trading-phases'

export async function POST(request: Request) {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  const body = await request.json()
  const { brokerId, symbol, direction, lotSize, stopLoss, takeProfit, leverage } = body

  // Validate required fields
  if (!brokerId) return error('Broker ID is required')
  if (!symbol) return error('Symbol is required')
  if (!direction) return error('Direction is required')
  if (!lotSize || lotSize <= 0) return error('Lot size must be greater than 0')

  // Validate direction
  if (direction !== 'buy' && direction !== 'sell') {
    return error('Direction must be "buy" or "sell"')
  }

  // ═══════════════════════════════════════════════════
  // DEPOSIT-BEFORE-TRADE GATE
  // Users must have at least one completed deposit before trading
  // ═══════════════════════════════════════════════════
  const hasDeposit = await db.transaction.findFirst({
    where: {
      userId: user.id,
      type: 'deposit',
      status: 'completed',
    },
    select: { id: true },
  })

  if (!hasDeposit) {
    return error(
      'Please make a deposit first before trading. Go to Wallet → Deposit to fund your account.',
      403
    )
  }

  // ═══════════════════════════════════════════════════
  // PHASE-SPECIFIC DEPOSIT CHECK
  // Users must have deposited for THIS specific broker phase
  // This ensures deposits are tied to the correct trading phase
  // ═══════════════════════════════════════════════════
  const hasPhaseDeposit = await db.transaction.findFirst({
    where: {
      userId: user.id,
      type: 'deposit',
      status: 'completed',
      metadata: { contains: `"brokerId":"${brokerId}"` },
    },
    select: { id: true },
  })

  if (!hasPhaseDeposit) {
    const brokerInfo = getBrokerById(brokerId)
    const brokerName = brokerInfo?.name || brokerId
    return error(
      `Please deposit funds into the ${brokerName} Phase before trading. Go to Wallet → Deposit and select the ${brokerName} Phase.`,
      403
    )
  }

  // Check broker connection
  const connection = await db.brokerConnection.findUnique({
    where: {
      userId_brokerId: {
        userId: user.id,
        brokerId,
      },
    },
  })

  if (!connection || connection.status !== 'connected') {
    return error('Broker is not connected. Please connect your broker first.')
  }

  // Check broker exists in phases
  const brokerInfo = getBrokerById(brokerId)
  if (!brokerInfo) {
    return error('Invalid broker')
  }

  // Validate symbol — asset symbol format uses '-' instead of '/' (e.g. 'BTC-USD')
  const normalizedSymbol = symbol.replace('/', '-')
  const asset = allAssets.find(
    a => a.symbol === symbol || a.symbol.replace('/', '-') === normalizedSymbol
  )

  if (!asset) {
    return error('Invalid trading symbol')
  }

  // Check if the asset is available in this broker's phase
  const assetPhaseName = `${brokerInfo.name} Phase`
  if (!asset.phases.includes(assetPhaseName as any) && !asset.phases.includes('Multi-Phase' as any)) {
    return error(`${symbol} is not available on ${brokerInfo.name}`)
  }

  // ═══════════════════════════════════════════════════
  // GET LIVE PRICE from Price Engine
  // Try async live price (works in both serverless & dev)
  // ═══════════════════════════════════════════════════
  let currentPrice: number | null = null

  try {
    const { getLivePriceAsync } = await import('@/lib/price-engine')
    const livePrice = await getLivePriceAsync(symbol)
    if (livePrice && livePrice > 0) {
      currentPrice = livePrice
    }
  } catch {
    // Price engine not available, will use fallback
  }

  // Fallback to static asset price
  if (!currentPrice || currentPrice <= 0) {
    currentPrice = asset.price
  }

  // ═══════════════════════════════════════════════════
  // LEVERAGE & MARGIN CALCULATION
  // Leverage is capped by the broker's max leverage
  // Margin = (lotSize * currentPrice) / leverage
  // ═══════════════════════════════════════════════════
  const requestedLeverage = leverage && typeof leverage === 'number' && leverage > 0
    ? leverage
    : brokerInfo.leverageMax

  // Cap leverage at broker's maximum
  const effectiveLeverage = Math.min(requestedLeverage, brokerInfo.leverageMax)

  // Calculate required margin
  const requiredMargin = (lotSize * currentPrice) / effectiveLeverage

  // Check user has sufficient USD wallet balance
  let usdWallet = await db.wallet.findUnique({
    where: {
      userId_currency: {
        userId: user.id,
        currency: 'USD',
      },
    },
  })

  if (!usdWallet) {
    // Create USD wallet for user if it doesn't exist
    usdWallet = await db.wallet.create({
      data: {
        userId: user.id,
        currency: 'USD',
        balance: 0,
        locked: 0,
      },
    })
  }

  const availableBalance = usdWallet.balance - usdWallet.locked
  if (availableBalance < requiredMargin) {
    return error(
      `Insufficient balance. Required margin: $${requiredMargin.toFixed(2)} (at ${effectiveLeverage}:1 leverage), Available: $${availableBalance.toFixed(2)}`
    )
  }

  // Lock the margin amount in USD wallet
  const updatedWallet = await db.wallet.update({
    where: { id: usdWallet.id },
    data: {
      locked: usdWallet.locked + requiredMargin,
    },
  })

  // Calculate commission based on broker's commission rate
  const commissionRate = brokerInfo.commission || 0.001
  const commission = requiredMargin * commissionRate

  // Create Position
  const position = await db.position.create({
    data: {
      userId: user.id,
      brokerId,
      symbol: asset.symbol,
      direction,
      lotSize,
      openPrice: currentPrice,
      stopLoss: stopLoss ?? null,
      takeProfit: takeProfit ?? null,
      pnl: 0,
      swap: 0,
      commission,
      margin: requiredMargin,
      leverage: effectiveLeverage,
      status: 'open',
      openedAt: new Date(),
    },
  })

  return success({
    position: {
      id: position.id,
      brokerId: position.brokerId,
      symbol: position.symbol,
      direction: position.direction,
      lotSize: position.lotSize,
      openPrice: position.openPrice,
      stopLoss: position.stopLoss,
      takeProfit: position.takeProfit,
      commission: position.commission,
      margin: position.margin,
      leverage: position.leverage,
      status: position.status,
      openedAt: position.openedAt,
    },
    wallet: {
      balance: updatedWallet.balance,
      locked: updatedWallet.locked,
      available: updatedWallet.balance - updatedWallet.locked,
    },
    margin: requiredMargin,
    leverage: effectiveLeverage,
    priceSource: 'live',
  })
}
